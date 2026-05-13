import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-light-summary
 *
 * Shows active lights with brightness and toggles.
 * Only rendered when there are lights on.
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
          padding: 16px 0 8px 0;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px 14px 16px;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .header-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 159, 10, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-icon ha-icon {
          --mdc-icon-size: 18px;
          color: var(--glace-orange);
        }

        .header-text {
          font-size: 15px;
          font-weight: 600;
        }

        .light-list {
          display: flex;
          flex-direction: column;
        }

        .light-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          gap: 12px;
        }

        .light-row:not(:last-child) {
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
        }

        .light-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
          flex: 1;
        }

        .light-name {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .light-area {
          font-size: 12px;
          color: var(--glace-text-secondary);
        }

        .light-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .brightness {
          font-size: 14px;
          font-weight: 500;
          color: var(--glace-text-secondary);
          min-width: 32px;
          text-align: right;
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
          <div class="header-icon">
            <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
          </div>
          <span class="header-text">${this.lights.length} Light${this.lights.length !== 1 ? "s" : ""} On</span>
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
                <div class="light-right">
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
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("glace-light-summary", GlaceLightSummary);
