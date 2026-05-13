"""Config flow for Glace."""

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback


SIDEPANEL_TITLE = "sidepanel_title"
SIDEPANEL_ICON = "sidepanel_icon"
EXCLUDED_AREAS = "excluded_areas"
EXCLUDED_ENTITIES = "excluded_entities"


@config_entries.HANDLERS.register("glace")
class GlaceConfigFlow(config_entries.ConfigFlow):
    """Handle a config flow for Glace."""

    async def async_step_user(self, user_input=None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        return self.async_create_entry(title="Glace", data={})

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return GlaceOptionsFlow(config_entry)


class GlaceOptionsFlow(config_entries.OptionsFlowWithConfigEntry):
    """Handle Glace options."""

    def __init__(self, config_entry):
        self.config_entry = config_entry

    async def async_step_init(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        schema = {
            vol.Optional(
                SIDEPANEL_TITLE,
                default=self.config_entry.options.get("sidepanel_title", "Glace"),
            ): str,
            vol.Optional(
                SIDEPANEL_ICON,
                default=self.config_entry.options.get(
                    "sidepanel_icon", "mdi:ice-cream"
                ),
            ): str,
            vol.Optional(
                EXCLUDED_AREAS,
                default=self.config_entry.options.get(EXCLUDED_AREAS, ""),
            ): str,
            vol.Optional(
                EXCLUDED_ENTITIES,
                default=self.config_entry.options.get(EXCLUDED_ENTITIES, ""),
            ): str,
        }

        return self.async_show_form(step_id="init", data_schema=vol.Schema(schema))
