import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-room-card
 *
 * A glass summary card for a single room/area.
 * Shows room name, lights-on count, temperature, and a chevron.
 */
class GlaceRoomCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      room: { type: Object },
    };
  }

  static get styles() {
    return [
      glassStyles,
      css`
        :host {
          display: block;
        }

        .card {
          padding: 20px;
          cursor: pointer;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .top-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .top-left ha-icon {
          --mdc-icon-size: 22px;
        }

        .room-name {
          font-size: 16px;
          font-weight: 600;
        }

        .temp {
          font-size: 14px;
          font-weight: 500;
          color: var(--glace-on-surface-dim);
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 12px;
        }

        .stats {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .stat {
          font-size: 12px;
          color: var(--glace-on-surface-dim);
        }

        .stat.active {
          color: var(--glace-on-surface);
        }
      `,
    ];
  }

  _navigate() {
    // Navigate to the room detail view
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: null },
    });
    // For now, fire a custom event; room drill-down navigation is
    // implemented in Phase 5.
    this.dispatchEvent(event);
  }

  render() {
    if (!this.room) return html``;

    const icon = this.room.icon || "mdi:door";
    const lightsText =
      this.room.lightsOn > 0
        ? `${this.room.lightsOn} Light${this.room.lightsOn !== 1 ? "s" : ""} On`
        : "All Lights Off";
    const mediaText =
      this.room.mediaActive > 0 ? "Media Playing" : null;

    return html`
      <div class="glass card" @click=${this._navigate}>
        <div class="top">
          <div class="top-left">
            <ha-icon icon=${icon}></ha-icon>
            <span class="room-name">${this.room.name}</span>
          </div>
          ${this.room.temperature
            ? html`<span class="temp">${this.room.temperature}</span>`
            : ""}
        </div>
        <div class="bottom">
          <div class="stats">
            <span class="stat ${this.room.lightsOn > 0 ? "active" : ""}">
              ${lightsText}
            </span>
            ${mediaText
              ? html`<span class="stat active">${mediaText}</span>`
              : ""}
          </div>
          <button class="icon-btn" @click=${this._navigate}>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("glace-room-card", GlaceRoomCard);
