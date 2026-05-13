import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-media-card
 *
 * Shows a playing/paused media player with album art and transport controls.
 * Only rendered when a media_player is active.
 */
class GlaceMediaCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      entity: { type: Object },
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
          gap: 14px;
          align-items: center;
        }

        .artwork {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .artwork img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .artwork ha-icon {
          --mdc-icon-size: 24px;
          color: var(--glace-text-tertiary);
        }

        .info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .title {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist {
          font-size: 13px;
          color: var(--glace-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .source {
          font-size: 11px;
          color: var(--glace-text-tertiary);
          margin-top: 1px;
        }

        .controls {
          display: flex;
          gap: 4px;
          align-items: center;
          flex-shrink: 0;
        }

        .ctrl-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--glace-text-primary);
          padding: 0;
          transition: transform 0.3s var(--glace-spring);
        }

        .ctrl-btn:active {
          transform: scale(0.85);
        }

        .ctrl-btn ha-icon {
          --mdc-icon-size: 18px;
        }

        .play-btn {
          width: 40px;
          height: 40px;
          background: var(--glace-blue);
          border-color: rgba(10, 132, 255, 0.3);
          box-shadow: 0 2px 12px rgba(10, 132, 255, 0.25);
        }

        .play-btn ha-icon {
          --mdc-icon-size: 20px;
          color: #fff;
        }
      `,
    ];
  }

  _playPause() {
    this.hass.callService("media_player", "media_play_pause", {
      entity_id: this.entity.entity_id,
    });
  }

  _prev() {
    this.hass.callService("media_player", "media_previous_track", {
      entity_id: this.entity.entity_id,
    });
  }

  _next() {
    this.hass.callService("media_player", "media_next_track", {
      entity_id: this.entity.entity_id,
    });
  }

  render() {
    if (!this.entity || !this.hass) return html``;

    const state = this.hass.states[this.entity.entity_id];
    if (!state) return html``;

    const attrs = state.attributes || {};
    const title = attrs.media_title || attrs.friendly_name || this.entity.entity_id;
    const artist = attrs.media_artist || "";
    const artwork = attrs.entity_picture
      ? this.hass.hassUrl(attrs.entity_picture)
      : null;
    const source = attrs.source || attrs.app_name || "";
    const isPlaying = state.state === "playing";

    return html`
      <div class="glass container">
        <div class="artwork">
          ${artwork
            ? html`<img src=${artwork} alt="" />`
            : html`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="info">
          <span class="title">${title}</span>
          ${artist ? html`<span class="artist">${artist}</span>` : ""}
          ${source ? html`<span class="source">${source}</span>` : ""}
        </div>
        <div class="controls">
          <button class="ctrl-btn" @click=${this._prev}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="ctrl-btn play-btn" @click=${this._playPause}>
            <ha-icon icon=${isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button class="ctrl-btn" @click=${this._next}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("glace-media-card", GlaceMediaCard);
