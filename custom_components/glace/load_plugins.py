"""Load Glace frontend resources."""

import logging

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig

from .const import VERSION

_LOGGER = logging.getLogger(__name__)


async def load_plugins(hass, name):
    """Serve the compiled Glace JS bundle."""
    add_extra_js_url(hass, f"/glace/js/glace-dashboard.js?v={VERSION}")

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                "/glace/js",
                hass.config.path(f"custom_components/{name}/js/dist"),
                True,
            )
        ]
    )
