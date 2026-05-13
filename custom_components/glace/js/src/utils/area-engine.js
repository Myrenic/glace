/**
 * Area engine — groups HA entities by area and provides ranked/filtered
 * views used by the homepage and room cards.
 */

/**
 * Resolve the effective area_id for an entity.
 * Entity-level area takes priority, then falls back to its device's area.
 */
function resolveArea(entityEntry, devices) {
  if (entityEntry.area_id) return entityEntry.area_id;
  if (entityEntry.device_id && devices[entityEntry.device_id]) {
    return devices[entityEntry.device_id].area_id || null;
  }
  return null;
}

/**
 * Build a map of areaId → { info, entities[] } from the raw registry data.
 */
export function buildAreaMap(areas, entities, devices, states, userConfig = {}) {
  const areaMap = {};

  for (const [areaId, areaInfo] of Object.entries(areas)) {
    areaMap[areaId] = {
      ...areaInfo,
      id: areaId,
      entities: [],
    };
  }

  const excluded = new Set(userConfig.excluded_entities || []);
  const excludedAreas = new Set(userConfig.excluded_areas || []);

  for (const [entityId, entry] of Object.entries(entities)) {
    if (entry.disabled || entry.hidden) continue;
    if (excluded.has(entityId)) continue;

    const areaId = resolveArea(entry, devices);
    if (!areaId || excludedAreas.has(areaId)) continue;
    if (!areaMap[areaId]) continue;

    const state = states[entityId];
    areaMap[areaId].entities.push({
      entity_id: entityId,
      ...entry,
      state: state ? state.state : "unavailable",
      attributes: state ? state.attributes : {},
    });
  }

  // Apply area ordering from user config
  const ordering = userConfig.area_order || [];
  if (ordering.length) {
    const sorted = {};
    for (const id of ordering) {
      if (areaMap[id]) sorted[id] = areaMap[id];
    }
    for (const [id, data] of Object.entries(areaMap)) {
      if (!sorted[id]) sorted[id] = data;
    }
    return sorted;
  }

  return areaMap;
}

/**
 * Filter entities by domain across all areas.
 */
export function filterByDomain(areaMap, domain) {
  const result = [];
  for (const area of Object.values(areaMap)) {
    for (const entity of area.entities) {
      if (entity.domain === domain) {
      result.push({ ...entity, area_id: area.id, area_name: area.name });
      }
    }
  }
  return result;
}

/**
 * Return entities of a domain that are in an "active" state.
 */
export function filterActive(areaMap, domain) {
  const activeStates = {
    light: ["on"],
    switch: ["on"],
    fan: ["on"],
    media_player: ["playing", "paused", "on", "buffering", "idle"],
    climate: ["heat", "cool", "heat_cool", "auto", "dry", "fan_only"],
    cover: ["open", "opening", "closing"],
    vacuum: ["cleaning", "returning"],
    binary_sensor: ["on"],
  };

  const validStates = activeStates[domain] || ["on"];
  return filterByDomain(areaMap, domain).filter((e) =>
    validStates.includes(e.state)
  );
}

/**
 * Get active lights — convenience wrapper.
 */
export function getActiveLights(areaMap) {
  return filterActive(areaMap, "light");
}

/**
 * Get playing/paused media players.
 */
export function getActiveMedia(areaMap) {
  return filterByDomain(areaMap, "media_player").filter((e) =>
    ["playing", "paused", "buffering"].includes(e.state)
  );
}

/**
 * Build a per-area summary suitable for room cards.
 */
export function buildRoomSummary(areaId, areaMap) {
  const area = areaMap[areaId];
  if (!area) return null;

  const lights = area.entities.filter((e) => e.domain === "light");
  const lightsOn = lights.filter((e) => e.state === "on");
  const media = area.entities.filter((e) => e.domain === "media_player");
  const mediaActive = media.filter((e) =>
    ["playing", "paused"].includes(e.state)
  );
  const climate = area.entities.filter((e) => e.domain === "climate");
  const sensors = area.entities.filter(
    (e) =>
      e.domain === "sensor" &&
      e.attributes &&
      e.attributes.device_class === "temperature"
  );

  const temperature =
    sensors.length > 0 && sensors[0].state !== "unavailable"
      ? `${sensors[0].state}${sensors[0].attributes.unit_of_measurement || "°"}`
      : null;

  return {
    id: areaId,
    name: area.name,
    icon: area.icon,
    lightsTotal: lights.length,
    lightsOn: lightsOn.length,
    mediaActive: mediaActive.length,
    temperature,
    entityCount: area.entities.length,
  };
}
