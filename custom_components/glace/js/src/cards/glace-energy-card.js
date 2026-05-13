import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-energy-card
 *
 * Shows an energy price alert when prices are high.
 * Auto-discovers sensor.electricity_price or similar entities.
 * Hides itself when there is nothing noteworthy to show.
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
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-wrap.high {
          background: rgba(255, 180, 171, 0.18);
          color: var(--glace-error);
        }

        .icon-wrap.normal {
          background: rgba(78, 222, 163, 0.14);
          color: var(--glace-secondary);
        }

        .icon-wrap ha-icon {
          --mdc-icon-size: 22px;
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
        }

        .subtitle {
          font-size: 13px;
          color: var(--glace-on-surface-dim);
        }

        .price {
          font-size: 18px;
          font-weight: 700;
          text-align: right;
        }
      `,
    ];
  }

  _findEnergyEntity() {
    if (!this.hass) return null;

    // Look for common energy price entity patterns
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

    // Fallback: search for entities with 'price' and 'energy' in the id
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
    if (!entity) return html``; // No energy entity → hide

    const price = parseFloat(entity.state);
    if (isNaN(price)) return html``;

    const unit = entity.attributes?.unit_of_measurement || "";
    const friendlyName = entity.attributes?.friendly_name || "Energy Price";

    // Determine threshold — user can override via HA customize
    const threshold = entity.attributes?.glace_high_threshold || null;
    const isHigh = threshold ? price > threshold : false;

    // Only show when price is high or always show with neutral style
    return html`
      <div class="glass container">
        <div class="icon-wrap ${isHigh ? "high" : "normal"}">
          <ha-icon icon=${isHigh ? "mdi:flash-alert" : "mdi:flash"}></ha-icon>
        </div>
        <div class="info">
          <span class="title">${friendlyName}</span>
          <span class="subtitle">${isHigh ? "Price is high" : "Current rate"}</span>
        </div>
        <span class="price ${isHigh ? "tertiary" : ""}">${price} ${unit}</span>
      </div>
    `;
  }
}

customElements.define("glace-energy-card", GlaceEnergyCard);
