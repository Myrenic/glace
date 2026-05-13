import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-room-card
 *
 * A liquid-glass room summary card. Shows room name, active states,
 * temperature, and a chevron. Parent handles navigation on click.
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
          padding: 18px 20px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .card:hover {
          background: var(--glace-glass-bg-hover);
        }

        /* Room icon — frosted circle */
        .room-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .room-icon ha-icon {
          --mdc-icon-size: 20px;
          color: var(--glace-text-secondary);
        }

        .room-icon.has-active ha-icon {
          color: var(--glace-blue);
        }

        .room-icon.has-active {
          background: rgba(10, 132, 255, 0.12);
          border-color: rgba(10, 132, 255, 0.15);
        }

        /* Room info — name + stats */
        .room-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .room-name {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .room-status {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-item {
          font-size: 13px;
          color: var(--glace-text-secondary);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-item.active {
          color: var(--glace-orange);
          font-weight: 500;
        }

        .status-item ha-icon {
          --mdc-icon-size: 13px;
        }

        /* Right side — temp + chevron */
        .room-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .temp {
          font-size: 15px;
          font-weight: 500;
          color: var(--glace-text-secondary);
        }

        .chevron {
          color: var(--glace-text-tertiary);
        }

        .chevron ha-icon {
          --mdc-icon-size: 16px;
        }
      `,
    ];
  }

  _handleTap() {
    // Navigation handled by parent homepage card via @click
  }

  render() {
    if (!this.room) return html``;

    const icon = this.room.icon || "mdi:door";
    const hasActive = this.room.lightsOn > 0 || this.room.mediaActive > 0;

    return html`
      <div class="glass card" @click=${this._handleTap}>
        <div class="room-icon ${hasActive ? "has-active" : ""}">
          <ha-icon icon=${icon}></ha-icon>
        </div>
        <div class="room-info">
          <span class="room-name">${this.room.name}</span>
          <div class="room-status">
            ${this.room.lightsOn > 0 ? html`
              <span class="status-item active">
                <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                ${this.room.lightsOn}
              </span>
            ` : ""}
            ${this.room.mediaActive > 0 ? html`
              <span class="status-item active">
                <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                Playing
              </span>
            ` : ""}
            ${!hasActive ? html`
              <span class="status-item">${this.room.entityCount} devices</span>
            ` : ""}
          </div>
        </div>
        <div class="room-right">
          ${this.room.temperature
            ? html`<span class="temp">${this.room.temperature}</span>`
            : ""}
          <span class="chevron">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </span>
        </div>
      </div>
    `;
  }
}

customElements.define("glace-room-card", GlaceRoomCard);
