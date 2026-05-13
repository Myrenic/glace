import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-room-view-card
 *
 * Full room detail / drill-down view.
 * Groups the area's entities by domain and renders controls.
 */
class GlaceRoomViewCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  static get styles() {
    return [
      glassStyles,
      css`
        :host {
          display: block;
          padding: 20px;
        }

        .room-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .room-header ha-icon {
          --mdc-icon-size: 28px;
        }

        .room-header .name {
          font-size: 24px;
          font-weight: 600;
        }

        .domain-section {
          margin-bottom: 16px;
        }

        .domain-title {
          font-size: 14px;
          font-weight: 600;
          text-transform: capitalize;
          color: var(--glace-on-surface-dim);
          margin-bottom: 8px;
        }

        .entity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: var(--glace-radius-sm);
          background: rgba(255, 255, 255, 0.04);
          margin-bottom: 6px;
          transition: var(--glace-transition);
        }

        .entity-name {
          font-size: 14px;
          font-weight: 500;
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .entity-state {
          font-size: 13px;
          color: var(--glace-on-surface-dim);
          margin-right: 12px;
        }
      `,
    ];
  }

  setConfig(config) {
    this._config = config;
  }

  _getEntities() {
    if (!this.hass || !this._config?.area_id) return [];

    const areaId = this._config.area_id;
    const result = [];

    for (const [entityId, state] of Object.entries(this.hass.states)) {
      const entityReg = this.hass.entities?.[entityId];
      if (!entityReg) continue;

      const effectiveArea =
        entityReg.area_id ||
        (entityReg.device_id && this.hass.devices?.[entityReg.device_id]?.area_id);

      if (effectiveArea === areaId) {
        result.push({
          entity_id: entityId,
          domain: entityId.split(".")[0],
          name:
            state.attributes?.friendly_name || entityReg.name || entityId,
          state: state.state,
          attributes: state.attributes || {},
        });
      }
    }

    return result;
  }

  _groupByDomain(entities) {
    const groups = {};
    const domainOrder = [
      "light",
      "switch",
      "media_player",
      "climate",
      "fan",
      "cover",
      "sensor",
      "binary_sensor",
    ];

    for (const entity of entities) {
      if (!groups[entity.domain]) groups[entity.domain] = [];
      groups[entity.domain].push(entity);
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

  _toggleEntity(entityId) {
    const domain = entityId.split(".")[0];
    const toggleable = ["light", "switch", "fan", "input_boolean"];
    if (toggleable.includes(domain)) {
      this.hass.callService(domain, "toggle", { entity_id: entityId });
    }
  }

  _isToggleable(domain) {
    return ["light", "switch", "fan", "input_boolean", "cover"].includes(domain);
  }

  render() {
    if (!this.hass || !this._config?.area_id) {
      return html`<p class="dim">No area configured.</p>`;
    }

    const entities = this._getEntities();
    const groups = this._groupByDomain(entities);
    const areaName = this._config.area_name || this._config.area_id;
    const areaIcon = this._config.area_icon || "mdi:door";

    return html`
      <div class="room-header">
        <ha-icon icon=${areaIcon}></ha-icon>
        <span class="name">${areaName}</span>
      </div>

      ${Object.entries(groups).map(
        ([domain, domainEntities]) => html`
          <div class="domain-section">
            <div class="domain-title">${domain.replace("_", " ")}</div>
            ${domainEntities.map(
              (entity) => html`
                <div class="entity-row">
                  <span class="entity-name">${entity.name}</span>
                  <span class="entity-state">${entity.state}</span>
                  ${this._isToggleable(domain)
                    ? html`
                        <button
                          class="toggle ${entity.state === "on" ? "on" : "off"}"
                          @click=${() => this._toggleEntity(entity.entity_id)}
                        >
                          <div class="knob"></div>
                        </button>
                      `
                    : ""}
                </div>
              `
            )}
          </div>
        `
      )}
    `;
  }
}

customElements.define("glace-room-view-card", GlaceRoomViewCard);
