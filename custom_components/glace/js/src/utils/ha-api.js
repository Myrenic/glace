/**
 * Thin helpers around the HA frontend API surface.
 */

/** Call a Home Assistant service. */
export function callService(hass, domain, service, data = {}) {
  return hass.callService(domain, service, data);
}

/** Turn off all entities in a list. */
export function turnOffAll(hass, entityIds) {
  const grouped = {};
  for (const id of entityIds) {
    const domain = id.split(".")[0];
    if (!grouped[domain]) grouped[domain] = [];
    grouped[domain].push(id);
  }
  const promises = [];
  for (const [domain, ids] of Object.entries(grouped)) {
    for (const id of ids) {
      promises.push(hass.callService(domain, "turn_off", { entity_id: id }));
    }
  }
  return Promise.all(promises);
}

/** Toggle an entity. */
export function toggleEntity(hass, entityId) {
  const domain = entityId.split(".")[0];
  const supportsToggle = ["light", "switch", "fan", "input_boolean"];
  const service = supportsToggle.includes(domain) ? "toggle" : "turn_on";
  return hass.callService(domain, service, { entity_id: entityId });
}

/**
 * Fetch Glace backend configuration (areas, entities, devices)
 * via the custom websocket command.
 */
export function fetchGlaceConfig(hass) {
  return hass.callWS({ type: "glace/configuration/get" });
}

/** Get current greeting based on time of day. */
export function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return "Good Night";
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  if (h < 21) return "Good Evening";
  return "Good Night";
}

/** Format current time as HH:MM. */
export function getTimeString() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
