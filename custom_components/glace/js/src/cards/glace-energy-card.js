import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-energy-card
 *
 * Auto-discovers energy price sensors. Shows current rate
 * with high-price alert styling when threshold is exceeded.
 * Hides when no energy entity exists.
 */
class GlaceEnergyCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
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
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-wrap.high {
          background: rgba(255, 69, 58, 0.14);
        }

        .icon-wrap.high ha-icon {
          color: var(--glace-red);
        }

        .icon-wrap.normal {
          background: rgba(48, 209, 88, 0.12);
        }

        .icon-wrap.normal ha-icon {
          color: var(--glace-green);
        }

        .icon-wrap ha-icon {
          --mdc-icon-size: 20px;
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .title {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .subtitle {
          font-size: 13px;
          color: var(--glace-text-secondary);
        }

        .price {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-align: right;
          flex-shrink: 0;
        }

        .price.high {
          color: var(--glace-red);
        }

        .price.normal {
          color: var(--glace-text-primary);
        }

        .unit {
          font-size: 13px;
          font-weight: 400;
          color: var(--glace-text-secondary);
          margin-left: 2px;
        }
      `,
    ];
  }

  _findEnergyEntity() {
    if (!this.hass) return null;

    const candidates = [
      "sensor.electricity_price",
      "sensor.energy_price",
      "sensor.nordpool",
      "sensor.tibber_prices",
      "sensor.amber_general_price",
      "sensor.octopus_energy_electricity_current_rate",
    ];

    for (const id of candidates) {
      if (this.hass.states[id]) return this.hass.states[id];
    }

    for (const [id, state] of Object.entries(this.hass.states)) {
      if (
        id.startsWith("sensor.") &&
        (id.includes("price") || id.includes("tariff")) &&
        (id.includes("energy") || id.includes("electric"))
      ) {
        return state;
      }
    }

    return null;
  }

  render() {
    const entity = this._findEnergyEntity();
    if (!entity) return html``;

    const price = parseFloat(entity.state);
    if (isNaN(price)) return html``;

    const unit = entity.attributes?.unit_of_measurement || "";
    const friendlyName = entity.attributes?.friendly_name || "Energy Price";
    const threshold = entity.attributes?.glace_high_threshold || null;
    const isHigh = threshold ? price > threshold : false;

    return html`
      <div class="glass container">
        <div class="icon-wrap ${isHigh ? "high" : "normal"}">
          <ha-icon icon=${isHigh ? "mdi:flash-alert" : "mdi:flash"}></ha-icon>
        </div>
        <div class="info">
          <span class="title">${friendlyName}</span>
          <span class="subtitle">${isHigh ? "Price is high" : "Current rate"}</span>
        </div>
        <span class="price ${isHigh ? "high" : "normal"}">
          ${price}<span class="unit">${unit}</span>
        </span>
      </div>
    `;
  }
}

customElements.define("glace-energy-card", GlaceEnergyCard);
