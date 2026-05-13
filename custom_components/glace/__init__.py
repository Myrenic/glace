"""Glace — adaptive liquid-glass dashboard for Home Assistant."""

import logging
import os
from collections import OrderedDict
from typing import Any, Mapping

import voluptuous as vol
import yaml

from homeassistant.components import websocket_api
from homeassistant.config import ConfigType
from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er

from .const import DOMAIN, VERSION
from .load_dashboard import load_dashboard
from .load_plugins import load_plugins

_LOGGER = logging.getLogger(__name__)
EXCLUDED_AREAS = "excluded_areas"
EXCLUDED_ENTITIES = "excluded_entities"


def _parse_option_list(value: Any) -> list[str]:
    """Parse a comma/newline-separated options value into a clean string list."""
    if isinstance(value, list):
        raw_items = value
    elif isinstance(value, str):
        raw_items = value.replace("\n", ",").split(",")
    else:
        return []

    values: list[str] = []
    seen: set[str] = set()
    for item in raw_items:
        normalized = str(item).strip()
        if not normalized or normalized in seen:
            continue
        values.append(normalized)
        seen.add(normalized)
    return values


def _resolve_excluded_areas(
    area_registry: ar.AreaRegistry, configured_values: list[str]
) -> list[str]:
    """Resolve configured area names or ids into canonical area ids."""
    lookup: dict[str, str] = {}
    for area in area_registry.async_list_areas():
        lookup[area.id.casefold()] = area.id
        lookup[area.name.casefold()] = area.id
        for alias in getattr(area, "aliases", []) or []:
            lookup[str(alias).casefold()] = area.id

    resolved: list[str] = []
    seen: set[str] = set()
    for value in configured_values:
        area_id = lookup.get(value.casefold(), value)
        if area_id in seen:
            continue
        resolved.append(area_id)
        seen.add(area_id)
    return resolved


def _merge_user_config(
    hass: HomeAssistant, area_registry: ar.AreaRegistry | None = None
) -> dict[str, Any]:
    """Merge file-backed config with options-flow exclusions."""
    merged: dict[str, Any] = dict(hass.data[DOMAIN].get("config", {}) or {})
    options = hass.data[DOMAIN].get("options", {}) or {}

    configured_entities = _parse_option_list(options.get(EXCLUDED_ENTITIES))
    if configured_entities:
        merged[EXCLUDED_ENTITIES] = [
            *dict.fromkeys(
                [*(merged.get(EXCLUDED_ENTITIES) or []), *configured_entities]
            )
        ]

    configured_areas = _parse_option_list(options.get(EXCLUDED_AREAS))
    if configured_areas:
        resolved_areas = (
            _resolve_excluded_areas(area_registry, configured_areas)
            if area_registry is not None
            else configured_areas
        )
        merged[EXCLUDED_AREAS] = [
            *dict.fromkeys([*(merged.get(EXCLUDED_AREAS) or []), *resolved_areas])
        ]

    return merged


def _read_yaml(path: str):
    """Read and parse a YAML file (runs in executor)."""
    with open(path, encoding="utf-8") as fh:
        return yaml.safe_load(fh)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Glace integration."""
    hass.data[DOMAIN] = {
        "config": {},
        "options": {},
    }

    websocket_api.async_register_command(hass, ws_get_configuration)
    websocket_api.async_register_command(hass, ws_get_glace_config)
    websocket_api.async_register_command(hass, ws_save_glace_config)

    await load_plugins(hass, DOMAIN)

    # Register Glace theme (non-blocking)
    theme_path = os.path.join(os.path.dirname(__file__), "themes", "glace.yaml")
    if await hass.async_add_executor_job(os.path.exists, theme_path):
        try:
            theme_data = await hass.async_add_executor_job(_read_yaml, theme_path)
            if theme_data:
                hass.data.setdefault("frontend_themes", {}).update(theme_data)
        except Exception:
            _LOGGER.exception("Failed to load Glace theme")

    return True


async def async_setup_entry(hass, config_entry):
    """Set up Glace from a config entry."""
    load_dashboard(hass, config_entry)
    hass.data[DOMAIN]["options"] = dict(config_entry.options)
    config_entry.async_on_unload(config_entry.add_update_listener(_async_reload_entry))

    # Load user overrides from glace/config.yaml if present
    config_path = hass.config.path("glace/config.yaml")
    if await hass.async_add_executor_job(os.path.exists, config_path):
        try:
            data = await hass.async_add_executor_job(_read_yaml, config_path)
            if data:
                hass.data[DOMAIN]["config"] = data
        except Exception:
            _LOGGER.warning("Failed to load Glace user config from %s", config_path)

    return True


async def async_unload_entry(hass, config_entry):
    """Unload a Glace config entry."""
    return True


async def _async_reload_entry(hass: HomeAssistant, config_entry) -> None:
    """Reload Glace when options change."""
    await hass.config_entries.async_reload(config_entry.entry_id)


# ---------------------------------------------------------------------------
# WebSocket: serve area / entity / device data to the frontend cards
# ---------------------------------------------------------------------------


@websocket_api.async_response
@websocket_api.websocket_command(
    {vol.Required("type"): "glace/configuration/get"}
)
async def ws_get_configuration(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: Mapping[str, Any],
) -> None:
    """Return areas, devices, and entities for the Glace frontend."""
    area_registry = ar.async_get(hass)
    entity_registry = er.async_get(hass)
    device_registry = dr.async_get(hass)
    user_config = _merge_user_config(hass, area_registry)

    areas_out = OrderedDict()
    for area in area_registry.async_list_areas():
        areas_out[area.id] = {
            "name": area.name,
            "icon": getattr(area, "icon", None),
            "picture": getattr(area, "picture", None),
            "aliases": list(area.aliases) if getattr(area, "aliases", None) else [],
        }

    entities_out = OrderedDict()
    for entry in entity_registry.entities.values():
        entities_out[entry.entity_id] = {
            "area_id": entry.area_id,
            "device_id": entry.device_id,
            "name": entry.name or entry.original_name,
            "platform": entry.platform,
            "domain": entry.domain,
            "disabled": entry.disabled_by is not None,
            "hidden": entry.hidden_by is not None,
            "icon": entry.icon or entry.original_icon,
        }

    devices_out = OrderedDict()
    for device in device_registry.devices.values():
        devices_out[device.id] = {
            "area_id": device.area_id,
            "name": device.name,
            "name_by_user": device.name_by_user,
            "model": device.model,
            "manufacturer": device.manufacturer,
        }

    connection.send_result(
        msg["id"],
        {
            "areas": areas_out,
            "entities": entities_out,
            "devices": devices_out,
            "installed_version": VERSION,
            "user_config": user_config,
        },
    )


@websocket_api.async_response
@websocket_api.websocket_command(
    {vol.Required("type"): "glace/config/get"}
)
async def ws_get_glace_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: Mapping[str, Any],
) -> None:
    """Return the current Glace user config."""
    area_registry = ar.async_get(hass)
    connection.send_result(
        msg["id"],
        _merge_user_config(hass, area_registry),
    )


@websocket_api.async_response
@websocket_api.websocket_command(
    {
        vol.Required("type"): "glace/config/save",
        vol.Required("config"): dict,
    }
)
async def ws_save_glace_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: Mapping[str, Any],
) -> None:
    """Save Glace user config to disk."""
    config_dir = hass.config.path("glace")
    await hass.async_add_executor_job(os.makedirs, config_dir, 0o755, True)

    config_path = os.path.join(config_dir, "config.yaml")
    new_config = msg["config"]

    def _write():
        with open(config_path, "w", encoding="utf-8") as f:
            yaml.safe_dump(dict(new_config), f, default_flow_style=False)

    await hass.async_add_executor_job(_write)
    hass.data[DOMAIN]["config"] = new_config
    connection.send_result(msg["id"], {"success": True})
