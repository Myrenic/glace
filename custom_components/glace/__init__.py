"""Glace — adaptive liquid-glass dashboard for Home Assistant."""

import logging
import os
import json
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


def _read_yaml(path: str):
    """Read and parse a YAML file (runs in executor)."""
    with open(path, encoding="utf-8") as fh:
        return yaml.safe_load(fh)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Glace integration."""
    hass.data[DOMAIN] = {
        "config": {},
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
            "user_config": hass.data[DOMAIN].get("config", {}),
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
    connection.send_result(
        msg["id"],
        hass.data[DOMAIN].get("config", {}),
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
