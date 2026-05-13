import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-light-summary
 *
 * Conditionally shown section listing active lights with toggles.
 * Only renders when there are lights to show.
 */
class GlaceLightSummary extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      lights: { type: Array },
    };
  }

  static get styles() {
    return [
      glassStyles,
      css`
        :host {
          display: block;
        }

        .container {
          padding: 16px;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-left ha-icon {
          color: var(--glace-tertiary);
          --mdc-icon-size: 22px;
        }

        .count {
          font-size: 14px;
          font-weight: 600;
          color: var(--glace-on-surface);
        }

        .light-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .light-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: var(--glace-radius-sm);
          background: rgba(255, 255, 255, 0.04);
          transition: var(--glace-transition);
        }

        .light-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
        }

        .light-name {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .light-area {
          font-size: 12px;
          color: var(--glace-on-surface-dim);
        }

        .brightness {
          font-size: 12px;
          color: var(--glace-on-surface-dim);
          margin-right: 12px;
        }
      `,
    ];
  }

  _toggle(entityId) {
    this.hass.callService("light", "toggle", { entity_id: entityId });
  }

  render() {
    if (!this.lights || this.lights.length === 0) return html``;

    return html`
      <div class="glass container">
        <div class="header">
          <div class="header-left">
            <ha-icon icon="mdi:lightbulb-group"></ha-icon>
            <span class="count">${this.lights.length} Light${this.lights.length !== 1 ? "s" : ""} On</span>
          </div>
        </div>
        <div class="light-list">
          ${this.lights.map(
            (light) => html`
              <div class="light-row">
                <div class="light-info">
                  <span class="light-name">
                    ${light.attributes?.friendly_name || light.name || light.entity_id}
                  </span>
                  <span class="light-area">${light.area_name}</span>
                </div>
                ${light.attributes?.brightness
                  ? html`<span class="brightness">
                      ${Math.round((light.attributes.brightness / 255) * 100)}%
                    </span>`
                  : ""}
                <button
                  class="toggle ${light.state === "on" ? "on" : "off"}"
                  @click=${() => this._toggle(light.entity_id)}
                >
                  <div class="knob"></div>
                </button>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("glace-light-summary", GlaceLightSummary);
