import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";
import {
  buildAreaMap,
  getActiveLights,
  getActiveMedia,
  buildRoomSummary,
} from "../utils/area-engine.js";
import { fetchGlaceConfig, getGreeting, getTimeString } from "../utils/ha-api.js";

/**
 * glace-homepage-card
 *
 * The main adaptive homepage. Uses hash-based routing:
 * - No hash → overview with room cards and active sections
 * - #areaId → full room detail view for that area
 */
class GlaceHomepageCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _glaceData: { type: Object },
      _time: { type: String },
      _selectedArea: { type: String },
    };
  }

  static get styles() {
    return [
      glassStyles,
      css`
        :host {
          display: block;
          padding: 16px 20px;
        }

        /* ---- Welcome header ---- */
        .welcome {
          padding: 16px 0 8px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .welcome .greeting {
          font-size: 20px;
          font-weight: 400;
          color: var(--glace-on-surface-dim);
          margin: 0 0 4px 0;
        }

        .welcome .time {
          font-size: 48px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--glace-on-surface);
        }

        .section {
          margin-top: 20px;
        }

        .rooms-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ---- Quick action bar ---- */
        .quick-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .quick-action {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: var(--glace-radius-sm);
          background: var(--glace-surface);
          backdrop-filter: blur(var(--glace-blur));
          border: var(--glace-border);
          color: var(--glace-on-surface);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--glace-transition);
          white-space: nowrap;
        }

        .quick-action:active {
          transform: scale(0.95);
          background: var(--glace-surface-active);
        }

        .quick-action ha-icon {
          --mdc-icon-size: 18px;
        }

        /* ---- Room detail view ---- */
        .room-detail {
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .room-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0 16px 0;
        }

        .back-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--glace-on-surface);
          transition: var(--glace-transition);
          padding: 0;
          flex-shrink: 0;
        }

        .back-btn:active {
          transform: scale(0.9);
        }

        .back-btn ha-icon {
          --mdc-icon-size: 20px;
        }

        .room-title {
          font-size: 24px;
          font-weight: 600;
        }

        .domain-section {
          margin-bottom: 16px;
        }

        .domain-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 0 4px;
        }

        .domain-title {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--glace-on-surface-dim);
        }

        .domain-action {
          font-size: 12px;
          color: var(--glace-primary);
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px 8px;
          border-radius: 8px;
          transition: var(--glace-transition);
        }

        .domain-action:active {
          opacity: 0.7;
        }

        .entity-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .entity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: var(--glace-radius-sm);
          background: rgba(255, 255, 255, 0.04);
          transition: var(--glace-transition);
          cursor: pointer;
        }

        .entity-row:active {
          background: rgba(255, 255, 255, 0.08);
        }

        .entity-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .entity-icon {
          --mdc-icon-size: 20px;
          color: var(--glace-on-surface-dim);
          flex-shrink: 0;
        }

        .entity-icon.active {
          color: var(--glace-tertiary);
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .entity-state-text {
          font-size: 12px;
          color: var(--glace-on-surface-dim);
        }

        .entity-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--glace-on-surface-dim);
          white-space: nowrap;
          margin-left: 8px;
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
    this._onHashChange = this._onHashChange.bind(this);
  }

  setConfig(config) {
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._timer = setInterval(() => { this._time = getTimeString(); }, 30_000);
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

  // ---- Navigation ----

  _selectArea(areaId) {
    window.location.hash = areaId;
    this._selectedArea = areaId;
    window.scrollTo(0, 0);
  }

  _goBack() {
    window.location.hash = "";
    this._selectedArea = null;
  }

  // ---- Service calls ----

  _handleAllLightsOff() {
    const areaMap = this._getAreaMap();
    const lights = getActiveLights(areaMap);
    for (const light of lights) {
      this.hass.callService("light", "turn_off", { entity_id: light.entity_id });
    }
  }

  _toggleEntity(entityId) {
    const domain = entityId.split(".")[0];
    const toggleable = ["light", "switch", "fan", "input_boolean", "cover"];
    if (toggleable.includes(domain)) {
      this.hass.callService(domain, "toggle", { entity_id: entityId });
    } else if (domain === "media_player") {
      this.hass.callService("media_player", "media_play_pause", { entity_id: entityId });
    } else if (domain === "climate") {
      // Open more-info for complex entities
      this._fireMoreInfo(entityId);
    } else {
      this._fireMoreInfo(entityId);
    }
  }

  _turnOffDomain(areaId, domain) {
    this.hass.callService(domain, "turn_off", {}, { area_id: [areaId] });
  }

  _turnOnDomain(areaId, domain) {
    this.hass.callService(domain, "turn_on", {}, { area_id: [areaId] });
  }

  _fireMoreInfo(entityId) {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true, composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  // ---- Entity helpers ----

  _getAreaEntities(areaId) {
    const areaMap = this._getAreaMap();
    const area = areaMap[areaId];
    if (!area) return [];
    return area.entities;
  }

  _groupByDomain(entities) {
    const domainOrder = ["light", "switch", "media_player", "climate", "fan", "cover", "sensor", "binary_sensor", "camera"];
    const groups = {};
    for (const e of entities) {
      if (!groups[e.domain]) groups[e.domain] = [];
      groups[e.domain].push(e);
    }
    const sorted = {};
    for (const d of domainOrder) {
      if (groups[d]) sorted[d] = groups[d];
    }
    for (const [d, list] of Object.entries(groups)) {
      if (!sorted[d]) sorted[d] = list;
    }
    return sorted;
  }

  _isToggleable(domain) {
    return ["light", "switch", "fan", "input_boolean", "cover"].includes(domain);
  }

  _isActive(state) {
    return ["on", "playing", "paused", "heat", "cool", "heat_cool", "auto", "open", "cleaning"].includes(state);
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
      return `${state.state}${state.attributes?.unit_of_measurement ? " " + state.attributes.unit_of_measurement : ""}`;
    }
    if (entity.domain === "media_player" && state.attributes?.media_title) {
      return state.attributes.media_title;
    }
    return state.state;
  }

  // ---- Render ----

  render() {
    if (!this.hass) return html``;
    if (this._selectedArea) return this._renderRoomDetail();
    return this._renderOverview();
  }

  _renderOverview() {
    const areaMap = this._getAreaMap();
    const activeLights = getActiveLights(areaMap);
    const activeMedia = getActiveMedia(areaMap);
    const areaIds = Object.keys(areaMap);
    const roomSummaries = areaIds.map((id) => buildRoomSummary(id, areaMap)).filter(Boolean);

    return html`
      <div class="welcome">
        <div>
          <p class="greeting">${getGreeting()}</p>
          <p class="time">${this._time}</p>
        </div>
      </div>

      ${activeLights.length > 0 ? html`
        <div class="quick-actions">
          <button class="quick-action" @click=${this._handleAllLightsOff}>
            <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
            All Lights Off (${activeLights.length})
          </button>
        </div>
      ` : ""}

      ${activeLights.length > 0 ? html`
        <div class="section">
          <glace-light-summary .hass=${this.hass} .lights=${activeLights}></glace-light-summary>
        </div>
      ` : ""}

      ${activeMedia.length > 0 ? html`
        <div class="section">
          ${activeMedia.map((m) => html`
            <glace-media-card .hass=${this.hass} .entity=${m}></glace-media-card>
          `)}
        </div>
      ` : ""}

      <div class="section">
        <glace-energy-card .hass=${this.hass}></glace-energy-card>
      </div>

      ${roomSummaries.length > 0 ? html`
        <div class="section">
          <h3 class="section-title">Rooms</h3>
          <div class="rooms-grid">
            ${roomSummaries.map((room) => html`
              <glace-room-card
                .hass=${this.hass}
                .room=${room}
                @click=${() => this._selectArea(room.id)}
              ></glace-room-card>
            `)}
          </div>
        </div>
      ` : ""}
    `;
  }

  _renderRoomDetail() {
    const areaMap = this._getAreaMap();
    const area = areaMap[this._selectedArea];
    if (!area) {
      return html`
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <span class="room-title">Room not found</span>
        </div>
      `;
    }

    const entities = area.entities;
    const groups = this._groupByDomain(entities);
    const areaName = area.name;
    const areaIcon = area.icon || "mdi:door";

    return html`
      <div class="room-detail">
        <div class="room-header">
          <button class="back-btn" @click=${this._goBack}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <span class="room-title">${areaName}</span>
        </div>

        ${Object.entries(groups).map(([domain, domainEntities]) => html`
          <div class="domain-section">
            <div class="domain-header">
              <span class="domain-title">${domain.replace(/_/g, " ")}</span>
              ${this._isToggleable(domain) ? html`
                <button class="domain-action" @click=${() => this._turnOffDomain(this._selectedArea, domain)}>
                  All Off
                </button>
              ` : ""}
            </div>
            <div class="glass entity-list">
              ${domainEntities.map((entity) => {
                const isOn = this._isActive(entity.state);
                return html`
                  <div class="entity-row" @click=${() => this._toggleEntity(entity.entity_id)}>
                    <div class="entity-left">
                      <ha-icon
                        class="entity-icon ${isOn ? "active" : ""}"
                        icon=${entity.attributes?.icon || this._getDomainIcon(domain)}
                      ></ha-icon>
                      <div class="entity-info">
                        <span class="entity-name">
                          ${entity.attributes?.friendly_name || entity.name || entity.entity_id}
                        </span>
                        <span class="entity-state-text">${entity.state}</span>
                      </div>
                    </div>
                    <span class="entity-value">${this._getEntityDisplayState(entity)}</span>
                    ${this._isToggleable(domain) ? html`
                      <button
                        class="toggle ${isOn ? "on" : "off"}"
                        @click=${(e) => { e.stopPropagation(); this._toggleEntity(entity.entity_id); }}
                      >
                        <div class="knob"></div>
                      </button>
                    ` : ""}
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
