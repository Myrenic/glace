import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";
import {
  buildAreaMap,
  filterByDomain,
  getActiveLights,
  getActiveMedia,
} from "../utils/area-engine.js";
import {
  fetchGlaceConfig,
  getGreeting,
  getTimeString,
  turnOffAll,
} from "../utils/ha-api.js";

/**
 * glace-homepage-card
 *
 * Primary content card for the Glace dashboard pages.
 * - home: greeting, time, weather, and live-at-a-glance cards
 * - lighting: lights + scenes
 * - switches: useful switch controls
 */
class GlaceHomepageCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _glaceData: { type: Object },
      _time: { type: String },
      _selectedArea: { type: String },
      mode: { type: String },
    };
  }

  static get styles() {
    return [
      glassStyles,
      css`
        :host {
          display: block;
          padding: 0 20px;
        }

        .welcome {
          padding: 56px 0 8px 4px;
        }

        .welcome .greeting {
          font-size: 16px;
          font-weight: 400;
          color: var(--glace-text-secondary);
          margin: 0 0 2px 0;
        }

        .welcome .time {
          font-size: 54px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--glace-text-primary);
          margin: 0;
        }

        .section {
          margin-top: 24px;
          animation: glace-fade-in 0.5s var(--glace-ease) both;
        }

        .section:nth-child(2) { animation-delay: 0.05s; }
        .section:nth-child(3) { animation-delay: 0.1s; }
        .section:nth-child(4) { animation-delay: 0.15s; }
        .section:nth-child(5) { animation-delay: 0.2s; }

        .quick-actions {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .weather-card {
          padding: 18px 18px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .weather-main {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .weather-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(137, 206, 255, 0.12);
          color: var(--glace-blue);
          flex-shrink: 0;
        }

        .weather-icon ha-icon {
          --mdc-icon-size: 24px;
        }

        .weather-label {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .weather-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--glace-text-primary);
        }

        .weather-subtitle {
          font-size: 13px;
          color: var(--glace-text-secondary);
          text-transform: capitalize;
        }

        .weather-temp {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--glace-text-primary);
          text-align: right;
          white-space: nowrap;
        }

        .weather-meta {
          margin-top: 6px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .weather-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--glace-text-secondary);
          font-size: 12px;
          font-weight: 500;
        }

        .weather-chip ha-icon {
          --mdc-icon-size: 14px;
        }

        .room-detail {
          animation: glace-slide-up 0.35s var(--glace-ease) both;
        }

        @keyframes glace-slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .room-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 56px 0 20px 0;
        }

        .back-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--glace-text-primary);
          transition: transform 0.3s var(--glace-spring);
          padding: 0;
          flex-shrink: 0;
        }

        .back-btn:active {
          transform: scale(0.85);
        }

        .back-btn ha-icon {
          --mdc-icon-size: 20px;
        }

        .room-title {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .domain-section {
          margin-bottom: 20px;
          animation: glace-fade-in 0.4s var(--glace-ease) both;
        }

        .domain-section:nth-child(2) { animation-delay: 0.06s; }
        .domain-section:nth-child(3) { animation-delay: 0.12s; }
        .domain-section:nth-child(4) { animation-delay: 0.18s; }

        .domain-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 0 4px;
          gap: 8px;
        }

        .domain-label-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .domain-label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--glace-text-secondary);
        }

        .domain-count {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.48);
        }

        .domain-action {
          font-size: 13px;
          font-weight: 500;
          color: var(--glace-blue);
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px 10px;
          border-radius: 8px;
          transition: opacity 0.2s;
          white-space: nowrap;
        }

        .domain-action:active {
          opacity: 0.5;
        }

        .entity-list {
          display: flex;
          flex-direction: column;
        }

        .entity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          cursor: pointer;
          transition: background 0.15s;
          gap: 12px;
        }

        .entity-row:not(:last-child) {
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .entity-row:active {
          background: rgba(255, 255, 255, 0.06);
        }

        .entity-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .entity-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.06);
        }

        .entity-icon-wrap.active {
          background: rgba(255, 159, 10, 0.14);
        }

        .entity-icon-wrap ha-icon {
          --mdc-icon-size: 18px;
          color: var(--glace-text-secondary);
        }

        .entity-icon-wrap.active ha-icon {
          color: var(--glace-orange);
        }

        .entity-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .entity-name {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .entity-state-text {
          font-size: 12px;
          color: var(--glace-text-secondary);
        }

        .entity-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--glace-text-secondary);
          white-space: nowrap;
          margin-left: 4px;
        }

        .page-hero {
          padding: 4px 4px 8px;
        }

        .hero-kicker {
          margin: 0 0 10px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.58);
        }

        .hero-title {
          margin: 0;
          font-size: clamp(2rem, 9vw, 3.4rem);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .hero-copy {
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: 14px;
          line-height: 1.5;
          max-width: 34rem;
        }

        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
          gap: 10px;
          margin-top: 18px;
        }

        .metric {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.06);
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0.5px 0 rgba(255, 255, 255, 0.10);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .metric-value {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--glace-text-primary);
        }

        .metric-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.52);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .scene-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .scene-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--glace-text-primary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .scene-pill ha-icon {
          --mdc-icon-size: 16px;
          color: var(--glace-blue);
        }

        .ambient-empty {
          padding: 18px 18px 20px;
        }

        .ambient-empty h3 {
          margin: 0 0 4px;
          font-size: 16px;
          font-weight: 600;
        }

        .ambient-empty p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          line-height: 1.5;
        }
      `,
    ];
  }

  constructor() {
    super();
    this._glaceData = null;
    this._time = getTimeString();
    this._timer = null;
    this._selectedArea = null;
    this.mode = "home";
    this._onHashChange = this._onHashChange.bind(this);
  }

  setConfig(config) {
    this._config = config;
    this.mode = config.mode || "home";
  }

  connectedCallback() {
    super.connectedCallback();
    this._timer = setInterval(() => {
      this._time = getTimeString();
    }, 30_000);
    window.addEventListener("location-changed", this._onHashChange);
    window.addEventListener("popstate", this._onHashChange);
    this._onHashChange();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearInterval(this._timer);
    window.removeEventListener("location-changed", this._onHashChange);
    window.removeEventListener("popstate", this._onHashChange);
  }

  _onHashChange() {
    const hash = window.location.hash.substring(1);
    this._selectedArea = hash || null;
  }

  async _fetchData() {
    if (!this.hass) return;
    try {
      this._glaceData = await fetchGlaceConfig(this.hass);
    } catch (err) {
      console.error("Glace: failed to fetch configuration", err);
    }
  }

  willUpdate(changed) {
    if (changed.has("hass") && this.hass && !this._glaceData) {
      this._fetchData();
    }
  }

  _getAreaMap() {
    if (!this._glaceData || !this.hass) return {};
    return buildAreaMap(
      this._glaceData.areas,
      this._glaceData.entities,
      this._glaceData.devices,
      this.hass.states,
      this._glaceData.user_config
    );
  }

  _selectArea(areaId) {
    window.location.hash = areaId;
    this._selectedArea = areaId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  _goBack() {
    window.location.hash = "";
    this._selectedArea = null;
  }

  _handleAllLightsOff() {
    const lights = getActiveLights(this._getAreaMap());
    if (lights.length === 0) return;
    turnOffAll(
      this.hass,
      lights.map((light) => light.entity_id)
    );
  }

  _turnOffEntities(entities) {
    const activeIds = entities
      .filter((entity) => this._isActive(this.hass.states[entity.entity_id]?.state || entity.state))
      .map((entity) => entity.entity_id);
    if (activeIds.length === 0) return;
    turnOffAll(this.hass, activeIds);
  }

  _toggleEntity(entityId) {
    const domain = entityId.split(".")[0];
    const toggleable = ["light", "switch", "fan", "input_boolean", "cover"];
    if (toggleable.includes(domain)) {
      this.hass.callService(domain, "toggle", { entity_id: entityId });
    } else if (domain === "media_player") {
      this.hass.callService("media_player", "media_play_pause", {
        entity_id: entityId,
      });
    } else {
      this._fireMoreInfo(entityId);
    }
  }

  _activateScene(entityId) {
    this.hass.callService("scene", "turn_on", { entity_id: entityId });
  }

  _fireMoreInfo(entityId) {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  _groupByDomain(entities) {
    const domainOrder = [
      "light",
      "switch",
      "media_player",
      "climate",
      "fan",
      "cover",
      "sensor",
      "binary_sensor",
      "camera",
    ];
    const groups = {};
    for (const entity of entities) {
      if (!groups[entity.domain]) groups[entity.domain] = [];
      groups[entity.domain].push(entity);
    }
    const sorted = {};
    for (const domain of domainOrder) {
      if (groups[domain]) sorted[domain] = groups[domain];
    }
    for (const [domain, list] of Object.entries(groups)) {
      if (!sorted[domain]) sorted[domain] = list;
    }
    return sorted;
  }

  _getDomainEntities(domain) {
    return filterByDomain(this._getAreaMap(), domain);
  }

  _groupEntitiesByArea(entities) {
    const groups = new Map();

    for (const entity of entities) {
      const key = entity.area_id || entity.area_name || "ungrouped";
      if (!groups.has(key)) {
        groups.set(key, {
          id: entity.area_id || null,
          name: entity.area_name || "Unassigned",
          entities: [],
        });
      }
      groups.get(key).entities.push(entity);
    }

    return Array.from(groups.values())
      .map((group) => ({
        ...group,
        entities: group.entities.sort((left, right) =>
          (left.attributes?.friendly_name || left.name || left.entity_id).localeCompare(
            right.attributes?.friendly_name || right.name || right.entity_id
          )
        ),
      }))
      .sort((left, right) => left.name.localeCompare(right.name));
  }

  _getEnergyEntity() {
    if (!this.hass) return null;
    const candidates = [
      "sensor.electricity_price",
      "sensor.energy_price",
      "sensor.nordpool",
      "sensor.tibber_prices",
      "sensor.amber_general_price",
      "sensor.octopus_energy_electricity_current_rate",
    ];

    for (const entityId of candidates) {
      if (this.hass.states[entityId]) return this.hass.states[entityId];
    }

    for (const [entityId, state] of Object.entries(this.hass.states)) {
      if (
        entityId.startsWith("sensor.") &&
        (entityId.includes("price") || entityId.includes("tariff")) &&
        (entityId.includes("energy") || entityId.includes("electric"))
      ) {
        return state;
      }
    }

    return null;
  }

  _getWeatherState() {
    if (!this.hass) return null;
    const weatherEntry = Object.entries(this.hass.states).find(([entityId]) =>
      entityId.startsWith("weather.")
    );
    if (!weatherEntry) return null;
    const [entityId, state] = weatherEntry;
    return { entityId, state };
  }

  _getWeatherIcon(condition) {
    const icons = {
      clear_night: "mdi:weather-night",
      cloudy: "mdi:weather-cloudy",
      exceptional: "mdi:weather-lightning-rainy",
      fog: "mdi:weather-fog",
      hail: "mdi:weather-hail",
      lightning: "mdi:weather-lightning",
      lightning_rainy: "mdi:weather-lightning-rainy",
      partlycloudy: "mdi:weather-partly-cloudy",
      pouring: "mdi:weather-pouring",
      rainy: "mdi:weather-rainy",
      snowy: "mdi:weather-snowy",
      snowy_rainy: "mdi:weather-snowy-rainy",
      sunny: "mdi:weather-sunny",
      windy: "mdi:weather-windy",
      windy_variant: "mdi:weather-windy-variant",
    };
    return icons[condition] || "mdi:weather-partly-cloudy";
  }

  _getScenes() {
    if (!this.hass) return [];
    const excluded = new Set(this._glaceData?.user_config?.excluded_entities || []);
    return Object.entries(this.hass.states)
      .filter(
        ([entityId, state]) =>
          entityId.startsWith("scene.") &&
          !excluded.has(entityId) &&
          !this._glaceData?.entities?.[entityId]?.hidden &&
          !this._glaceData?.entities?.[entityId]?.disabled &&
          state.state !== "unavailable"
      )
      .map(([entityId, state]) => ({
        entity_id: entityId,
        name: state.attributes?.friendly_name || entityId,
        icon: state.attributes?.icon || "mdi:palette-outline",
      }))
      .sort((left, right) => left.name.localeCompare(right.name));
  }

  _isToggleable(domain) {
    return ["light", "switch", "fan", "input_boolean", "cover"].includes(domain);
  }

  _supportsTurnOff(domain) {
    return ["light", "switch", "fan", "input_boolean"].includes(domain);
  }

  _isActive(state) {
    return [
      "on",
      "playing",
      "paused",
      "heat",
      "cool",
      "heat_cool",
      "auto",
      "open",
      "cleaning",
    ].includes(state);
  }

  _getDomainIcon(domain) {
    const icons = {
      light: "mdi:lightbulb-group",
      switch: "mdi:toggle-switch",
      media_player: "mdi:cast",
      climate: "mdi:thermostat",
      fan: "mdi:fan",
      cover: "mdi:blinds",
      sensor: "mdi:eye",
      binary_sensor: "mdi:checkbox-marked-circle",
      camera: "mdi:cctv",
      vacuum: "mdi:robot-vacuum",
    };
    return icons[domain] || "mdi:puzzle";
  }

  _getEntityDisplayState(entity) {
    const state = this.hass.states[entity.entity_id];
    if (!state) return "unavailable";
    if (entity.domain === "light" && state.attributes?.brightness) {
      return `${Math.round((state.attributes.brightness / 255) * 100)}%`;
    }
    if (entity.domain === "climate" && state.attributes?.current_temperature) {
      return `${state.attributes.current_temperature}° → ${state.attributes.temperature || "?"}°`;
    }
    if (entity.domain === "sensor") {
      return `${state.state}${state.attributes?.unit_of_measurement ? ` ${state.attributes.unit_of_measurement}` : ""}`;
    }
    if (entity.domain === "media_player" && state.attributes?.media_title) {
      return state.attributes.media_title;
    }
    return state.state;
  }

  _supportsAreaDrilldown() {
    return this.mode === "home";
  }

  _renderPageHero({ kicker, title, copy, metrics = [] }) {
    return html`
      <section class="page-hero animate-in">
        <p class="hero-kicker">${kicker}</p>
        <h2 class="hero-title">${title}</h2>
        ${copy ? html`<p class="hero-copy">${copy}</p>` : ""}
        ${metrics.length
          ? html`
              <div class="hero-metrics">
                ${metrics.map(
                  (metric) => html`
                    <div class="metric">
                      <span class="metric-value">${metric.value}</span>
                      <span class="metric-label">${metric.label}</span>
                    </div>
                  `
                )}
              </div>
            `
          : ""}
      </section>
    `;
  }

  _renderEmptyState(title, copy) {
    return html`
      <div class="glass ambient-empty">
        <h3>${title}</h3>
        <p>${copy}</p>
      </div>
    `;
  }

  _renderWeatherCard() {
    const weather = this._getWeatherState();
    if (!weather) return html``;

    const { state } = weather;
    const condition = state.state || "unknown";
    const temperature = state.attributes?.temperature;
    const temperatureUnit = state.attributes?.temperature_unit || "°";
    const humidity = state.attributes?.humidity;
    const windSpeed = state.attributes?.wind_speed;
    const windUnit = state.attributes?.wind_speed_unit || "";
    const friendlyName = state.attributes?.friendly_name || "Weather";

    return html`
      <div class="glass weather-card">
        <div class="weather-main">
          <div class="weather-icon">
            <ha-icon icon=${this._getWeatherIcon(condition)}></ha-icon>
          </div>
          <div class="weather-label">
            <span class="weather-title">${friendlyName}</span>
            <span class="weather-subtitle">${condition.replace(/_/g, " ")}</span>
            <div class="weather-meta">
              ${humidity !== undefined
                ? html`
                    <span class="weather-chip">
                      <ha-icon icon="mdi:water-percent"></ha-icon>
                      ${humidity}%
                    </span>
                  `
                : ""}
              ${windSpeed !== undefined
                ? html`
                    <span class="weather-chip">
                      <ha-icon icon="mdi:weather-windy"></ha-icon>
                      ${windSpeed}${windUnit ? ` ${windUnit}` : ""}
                    </span>
                  `
                : ""}
            </div>
          </div>
        </div>
        <div class="weather-temp">
          ${temperature !== undefined ? `${temperature}${temperatureUnit}` : "--"}
        </div>
      </div>
    `;
  }

  _renderSceneGrid(scenes) {
    if (scenes.length === 0) {
      return this._renderEmptyState(
        "No scenes found",
        "Add Home Assistant scenes to get one-tap lighting presets here."
      );
    }

    return html`
      <div class="scene-grid">
        ${scenes.map(
          (scene) => html`
            <button
              class="scene-pill"
              @click=${() => this._activateScene(scene.entity_id)}
            >
              <ha-icon icon=${scene.icon}></ha-icon>
              <span>${scene.name}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  _renderGroupedEntities(title, groups, emptyTitle, emptyCopy) {
    if (groups.length === 0) {
      return this._renderEmptyState(emptyTitle, emptyCopy);
    }

    return html`
      <div class="section">
        <p class="section-label">${title}</p>
        ${groups.map((group) => {
          const activeEntities = group.entities.filter((entity) =>
            this._isActive(this.hass.states[entity.entity_id]?.state || entity.state)
          );
          const canTurnOff =
            activeEntities.length > 0 &&
            this._supportsTurnOff(activeEntities[0].domain);
          return html`
            <div class="domain-section">
              <div class="domain-header">
                <div class="domain-label-wrap">
                  <span class="domain-label">${group.name}</span>
                  <span class="domain-count">${group.entities.length}</span>
                </div>
                ${canTurnOff
                  ? html`
                      <button
                        class="domain-action"
                        @click=${() => this._turnOffEntities(activeEntities)}
                      >
                        All Off
                      </button>
                    `
                  : ""}
              </div>
              <div class="glass entity-list">
                ${group.entities.map((entity) => {
                  const isOn = this._isActive(
                    this.hass.states[entity.entity_id]?.state || entity.state
                  );
                  return html`
                    <div
                      class="entity-row"
                      @click=${() => this._fireMoreInfo(entity.entity_id)}
                    >
                      <div class="entity-left">
                        <div class="entity-icon-wrap ${isOn ? "active" : ""}">
                          <ha-icon
                            icon=${entity.attributes?.icon || this._getDomainIcon(entity.domain)}
                          ></ha-icon>
                        </div>
                        <div class="entity-info">
                          <span class="entity-name">
                            ${entity.attributes?.friendly_name || entity.name || entity.entity_id}
                          </span>
                          <span class="entity-state-text">
                            ${this._getEntityDisplayState(entity)}
                          </span>
                        </div>
                      </div>
                      ${this._isToggleable(entity.domain)
                        ? html`
                            <button
                              class="toggle ${isOn ? "on" : "off"}"
                              @click=${(event) => {
                                event.stopPropagation();
                                this._toggleEntity(entity.entity_id);
                              }}
                            >
                              <div class="knob"></div>
                            </button>
                          `
                        : html`
                            <span class="entity-value">
                              ${this._getEntityDisplayState(entity)}
                            </span>
                          `}
                    </div>
                  `;
                })}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    if (!this.hass) return html``;
    if (this._selectedArea && this._supportsAreaDrilldown()) {
      return this._renderRoomDetail();
    }
    if (this.mode === "lighting") return this._renderLightingPage();
    if (this.mode === "switches") return this._renderSwitchesPage();
    return this._renderOverview();
  }

  _renderOverview() {
    const areaMap = this._getAreaMap();
    const activeLights = getActiveLights(areaMap);
    const activeMedia = getActiveMedia(areaMap);
    const hasWeather = !!this._getWeatherState();
    const hasEnergy = !!this._getEnergyEntity();

    return html`
      <div class="welcome">
        <p class="greeting">${getGreeting()}</p>
        <p class="time">${this._time}</p>
      </div>

      ${hasWeather
        ? html`
            <div class="section">
              ${this._renderWeatherCard()}
            </div>
          `
        : ""}

      ${activeLights.length > 0
        ? html`
            <div class="quick-actions">
              <button class="pill accent" @click=${this._handleAllLightsOff}>
                <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
                Turn Off ${activeLights.length} Light${activeLights.length !== 1 ? "s" : ""}
              </button>
            </div>
          `
        : ""}

      ${activeLights.length > 0
        ? html`
            <div class="section">
              <glace-light-summary .hass=${this.hass} .lights=${activeLights}></glace-light-summary>
            </div>
          `
        : ""}

      ${activeMedia.length > 0
        ? html`
            <div class="section">
              <p class="section-label">Now playing</p>
              ${activeMedia.map(
                (media) => html`
                  <glace-media-card .hass=${this.hass} .entity=${media}></glace-media-card>
                `
              )}
            </div>
          `
        : ""}

      ${hasEnergy
        ? html`
            <div class="section">
              <p class="section-label">Energy</p>
              <glace-energy-card .hass=${this.hass}></glace-energy-card>
            </div>
          `
        : ""}

      ${!hasWeather && !hasEnergy && activeLights.length === 0 && activeMedia.length === 0
        ? this._renderEmptyState(
            "Nothing urgent right now",
            "Home stays intentionally quiet until weather, lights, media, or energy need attention."
          )
        : ""}
    `;
  }

  _renderLightingPage() {
    const areaMap = this._getAreaMap();
    const lights = this._getDomainEntities("light");
    const activeLights = getActiveLights(areaMap);
    const scenes = this._getScenes();

    return html`
      ${this._renderPageHero({
        kicker: "Controls",
        title: "Lighting",
        copy: "One place for your lights, quick off actions, and scene presets.",
        metrics: [
          { label: "Lights", value: lights.length },
          { label: "On", value: activeLights.length },
          { label: "Scenes", value: scenes.length },
        ],
      })}

      ${activeLights.length > 0
        ? html`
            <div class="quick-actions">
              <button class="pill accent" @click=${this._handleAllLightsOff}>
                <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
                Turn Off ${activeLights.length} Light${activeLights.length !== 1 ? "s" : ""}
              </button>
            </div>
          `
        : ""}

      <div class="section">
        <p class="section-label">Scenes</p>
        ${this._renderSceneGrid(scenes)}
      </div>

      ${activeLights.length > 0
        ? html`
            <div class="section">
              <p class="section-label">Active lights</p>
              <glace-light-summary .hass=${this.hass} .lights=${activeLights}></glace-light-summary>
            </div>
          `
        : ""}

      ${this._renderGroupedEntities(
        "All lights",
        this._groupEntitiesByArea(lights),
        "No lights available",
        "Glace did not find any light entities after applying your current exclusions."
      )}
    `;
  }

  _renderSwitchesPage() {
    const switches = this._getDomainEntities("switch");
    const activeSwitches = switches.filter((entity) =>
      this._isActive(this.hass.states[entity.entity_id]?.state || entity.state)
    );
    const switchGroups = this._groupEntitiesByArea(switches);

    return html`
      ${this._renderPageHero({
        kicker: "Controls",
        title: "Switches",
        copy: "A focused list of useful switches, grouped by room and stripped of the clutter.",
        metrics: [
          { label: "Switches", value: switches.length },
          { label: "On", value: activeSwitches.length },
          { label: "Rooms", value: switchGroups.length },
        ],
      })}

      ${activeSwitches.length > 0
        ? html`
            <div class="quick-actions">
              <button
                class="pill accent"
                @click=${() => this._turnOffEntities(activeSwitches)}
              >
                <ha-icon icon="mdi:power-plug-off-outline"></ha-icon>
                Turn Off ${activeSwitches.length} Switch${activeSwitches.length !== 1 ? "es" : ""}
              </button>
            </div>
          `
        : ""}

      ${this._renderGroupedEntities(
        "All switches",
        switchGroups,
        "No switches available",
        "No switch entities were found after applying the current room and entity exclusions."
      )}
    `;
  }

  _renderRoomDetail() {
    const areaMap = this._getAreaMap();
    const area = areaMap[this._selectedArea];
    if (!area) {
      return html`
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <span class="room-title">Not found</span>
        </div>
      `;
    }

    const groups = this._groupByDomain(area.entities);

    return html`
      <div class="room-detail">
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <span class="room-title">${area.name}</span>
        </div>

        ${Object.entries(groups).map(([domain, domainEntities]) => html`
          <div class="domain-section">
            <div class="domain-header">
              <div class="domain-label-wrap">
                <span class="domain-label">${domain.replace(/_/g, " ")}</span>
                <span class="domain-count">${domainEntities.length}</span>
              </div>
              ${this._supportsTurnOff(domain)
                ? html`
                    <button
                      class="domain-action"
                      @click=${() => this._turnOffEntities(domainEntities)}
                    >
                      All Off
                    </button>
                  `
                : ""}
            </div>
            <div class="glass entity-list">
              ${domainEntities.map((entity) => {
                const isOn = this._isActive(entity.state);
                return html`
                  <div class="entity-row" @click=${() => this._fireMoreInfo(entity.entity_id)}>
                    <div class="entity-left">
                      <div class="entity-icon-wrap ${isOn ? "active" : ""}">
                        <ha-icon
                          icon=${entity.attributes?.icon || this._getDomainIcon(domain)}
                        ></ha-icon>
                      </div>
                      <div class="entity-info">
                        <span class="entity-name">
                          ${entity.attributes?.friendly_name || entity.name || entity.entity_id}
                        </span>
                        <span class="entity-state-text">${this._getEntityDisplayState(entity)}</span>
                      </div>
                    </div>
                    ${this._isToggleable(domain)
                      ? html`
                          <button
                            class="toggle ${isOn ? "on" : "off"}"
                            @click=${(event) => {
                              event.stopPropagation();
                              this._toggleEntity(entity.entity_id);
                            }}
                          >
                            <div class="knob"></div>
                          </button>
                        `
                      : html`
                          <span class="entity-value">${this._getEntityDisplayState(entity)}</span>
                        `}
                  </div>
                `;
              })}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define("glace-homepage-card", GlaceHomepageCard);
