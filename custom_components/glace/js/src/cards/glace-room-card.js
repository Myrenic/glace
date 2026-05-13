import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-room-card
 *
 * A glass summary card for a single room/area.
 * Shows room name, lights-on count, temperature, and a chevron.
 * Tapping opens the first active entity in a more-info dialog.
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
          -webkit-tap-highlight-color: transparent;
        }

        .card:hover {
          background: var(--glace-surface-hover);
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .top-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(137, 206, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-circle ha-icon {
          --mdc-icon-size: 18px;
          color: var(--glace-primary);
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
          color: var(--glace-on-surface-faint);
        }

        .stat.active {
          color: var(--glace-tertiary);
          font-weight: 500;
        }

        .chevron {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--glace-on-surface-dim);
        }

        .chevron ha-icon {
          --mdc-icon-size: 18px;
        }
      `,
    ];
  }

  _handleTap() {
    // Navigation is handled by the parent homepage card via @click
    // This method is kept for direct usage outside the homepage
  }

  render() {
    if (!this.room) return html``;

    const icon = this.room.icon || "mdi:door";
    const lightsText =
      this.room.lightsOn > 0
        ? `${this.room.lightsOn} Light${this.room.lightsOn !== 1 ? "s" : ""} On`
        : this.room.lightsTotal > 0
          ? "All Lights Off"
          : null;
    const mediaText =
      this.room.mediaActive > 0 ? "Media Playing" : null;

    return html`
      <div class="glass card" @click=${this._handleTap}>
        <div class="top">
          <div class="top-left">
            <div class="icon-circle">
              <ha-icon icon=${icon}></ha-icon>
            </div>
            <span class="room-name">${this.room.name}</span>
          </div>
          ${this.room.temperature
            ? html`<span class="temp">${this.room.temperature}</span>`
            : ""}
        </div>
        <div class="bottom">
          <div class="stats">
            ${lightsText
              ? html`<span class="stat ${this.room.lightsOn > 0 ? "active" : ""}">${lightsText}</span>`
              : ""}
            ${mediaText
              ? html`<span class="stat active">${mediaText}</span>`
              : ""}
            ${!lightsText && !mediaText
              ? html`<span class="stat">${this.room.entityCount} entities</span>`
              : ""}
          </div>
          <div class="chevron">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("glace-room-card", GlaceRoomCard);
