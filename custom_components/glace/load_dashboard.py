"""Register the Glace dashboard panel."""

import logging

from homeassistant.components.lovelace.dashboard import LovelaceYAML

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


def load_dashboard(hass, config_entry):
    """Register a YAML-mode Lovelace dashboard for Glace."""
    sidepanel_title = config_entry.options.get("sidepanel_title", "Glace")
    sidepanel_icon = config_entry.options.get("sidepanel_icon", "mdi:ice-cream")

    dashboard_url = "glace-dashboard"
    dashboard_config = {
        "mode": "yaml",
        "icon": sidepanel_icon,
        "title": sidepanel_title,
        "filename": "custom_components/glace/lovelace/ui-lovelace.yaml",
        "show_in_sidebar": True,
        "require_admin": False,
    }

    try:
        from homeassistant.components.lovelace import _register_panel

        hass.data["lovelace"].dashboards[dashboard_url] = LovelaceYAML(
            hass, dashboard_url, dashboard_config
        )
        _register_panel(hass, dashboard_url, "yaml", dashboard_config, False)
    except Exception:
        _LOGGER.exception("Failed to register Glace dashboard panel")
