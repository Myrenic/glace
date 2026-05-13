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
 * Adaptive iOS-native homepage. Hash-based routing:
 * - No hash → overview with rooms + active sections
 * - #areaId → room detail with domain-grouped entities
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
          padding: 0 20px;
        }

        /* ── Welcome Header ── */
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

        /* ── Section Spacing ── */
        .section {
          margin-top: 24px;
          animation: glace-fade-in 0.5s var(--glace-ease) both;
        }

        .section:nth-child(2) { animation-delay: 0.05s; }
        .section:nth-child(3) { animation-delay: 0.1s; }
        .section:nth-child(4) { animation-delay: 0.15s; }
        .section:nth-child(5) { animation-delay: 0.2s; }

        /* ── Quick Actions ── */
        .quick-actions {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        /* ── Rooms Grid ── */
        .rooms-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ── Room Detail View ── */
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

        /* ── Domain Sections ── */
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
        }

        .domain-label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--glace-text-secondary);
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
        }

        .domain-action:active {
          opacity: 0.5;
        }

        /* ── Entity List (glass container) ── */
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

  // ── Navigation ──

  _selectArea(areaId) {
    window.location.hash = areaId;
    this._selectedArea = areaId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  _goBack() {
    window.location.hash = "";
    this._selectedArea = null;
  }

  // ── Service calls ──

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
    } else {
      this._fireMoreInfo(entityId);
    }
  }

  _turnOffDomain(areaId, domain) {
    this.hass.callService(domain, "turn_off", {}, { area_id: [areaId] });
  }

  _fireMoreInfo(entityId) {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true, composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  // ── Entity helpers ──

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

  // ── Render ──

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
        <p class="greeting">${getGreeting()}</p>
        <p class="time">${this._time}</p>
      </div>

      ${activeLights.length > 0 ? html`
        <div class="quick-actions">
          <button class="pill accent" @click=${this._handleAllLightsOff}>
            <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
            Turn Off ${activeLights.length} Light${activeLights.length !== 1 ? "s" : ""}
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
          <p class="section-label">Rooms</p>
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
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <span class="room-title">Not found</span>
        </div>
      `;
    }

    const entities = area.entities;
    const groups = this._groupByDomain(entities);

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
              <span class="domain-label">${domain.replace(/_/g, " ")}</span>
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
                    ${this._isToggleable(domain) ? html`
                      <button
                        class="toggle ${isOn ? "on" : "off"}"
                        @click=${(e) => { e.stopPropagation(); this._toggleEntity(entity.entity_id); }}
                      >
                        <div class="knob"></div>
                      </button>
                    ` : html`
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
