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
 * The main adaptive homepage. Queries HA areas/entities, then renders
 * only the sections that have active/relevant content.
 */
class GlaceHomepageCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _glaceData: { type: Object },
      _time: { type: String },
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

        .welcome .weather {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .welcome .temp {
          font-size: 24px;
          font-weight: 600;
        }

        .section {
          margin-top: 24px;
        }

        .rooms-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Quick action bar */
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
      `,
    ];
  }

  constructor() {
    super();
    this._glaceData = null;
    this._time = getTimeString();
    this._timer = null;
  }

  setConfig(config) {
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._timer = setInterval(() => {
      this._time = getTimeString();
    }, 30_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearInterval(this._timer);
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

  _handleAllLightsOff() {
    const areaMap = this._getAreaMap();
    const lights = getActiveLights(areaMap);
    for (const light of lights) {
      this.hass.callService("light", "turn_off", {
        entity_id: light.entity_id,
      });
    }
  }

  render() {
    if (!this.hass) return html``;

    const areaMap = this._getAreaMap();
    const activeLights = getActiveLights(areaMap);
    const activeMedia = getActiveMedia(areaMap);
    const areaIds = Object.keys(areaMap);
    const roomSummaries = areaIds
      .map((id) => buildRoomSummary(id, areaMap))
      .filter(Boolean);

    return html`
      <!-- Welcome -->
      <div class="welcome">
        <div>
          <p class="greeting">${getGreeting()}</p>
          <p class="time">${this._time}</p>
        </div>
      </div>

      <!-- Quick actions -->
      ${activeLights.length > 0
        ? html`
            <div class="quick-actions">
              <button
                class="quick-action"
                @click=${this._handleAllLightsOff}
              >
                <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
                All Lights Off (${activeLights.length})
              </button>
            </div>
          `
        : ""}

      <!-- Active lights section -->
      ${activeLights.length > 0
        ? html`
            <div class="section">
              <glace-light-summary
                .hass=${this.hass}
                .lights=${activeLights}
              ></glace-light-summary>
            </div>
          `
        : ""}

      <!-- Active media section -->
      ${activeMedia.length > 0
        ? html`
            <div class="section">
              ${activeMedia.map(
                (m) => html`
                  <glace-media-card
                    .hass=${this.hass}
                    .entity=${m}
                  ></glace-media-card>
                `
              )}
            </div>
          `
        : ""}

      <!-- Energy section -->
      <div class="section">
        <glace-energy-card .hass=${this.hass}></glace-energy-card>
      </div>

      <!-- Rooms -->
      ${roomSummaries.length > 0
        ? html`
            <div class="section">
              <h3 class="section-title">Rooms</h3>
              <div class="rooms-grid">
                ${roomSummaries.map(
                  (room) => html`
                    <glace-room-card
                      .hass=${this.hass}
                      .room=${room}
                    ></glace-room-card>
                  `
                )}
              </div>
            </div>
          `
        : ""}
    `;
  }
}

customElements.define("glace-homepage-card", GlaceHomepageCard);
