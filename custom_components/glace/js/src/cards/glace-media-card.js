import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-media-card
 *
 * Shows a playing/paused media player with album art and controls.
 * Only rendered by the homepage when a media_player is active.
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
          padding: 16px;
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .artwork {
          width: 64px;
          height: 64px;
          border-radius: var(--glace-radius-sm);
          background: rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
          object-fit: cover;
          overflow: hidden;
        }

        .artwork img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist {
          font-size: 13px;
          color: var(--glace-on-surface-dim);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .source {
          font-size: 11px;
          color: var(--glace-on-surface-faint);
          margin-top: 2px;
        }

        .controls {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .controls .icon-btn {
          width: 36px;
          height: 36px;
        }

        .controls .play-btn {
          width: 42px;
          height: 42px;
          background: var(--glace-primary);
          color: #101415;
        }

        .controls .play-btn:hover {
          background: var(--glace-primary);
          opacity: 0.85;
        }

        .controls ha-icon {
          --mdc-icon-size: 20px;
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
            : html`<ha-icon icon="mdi:music" style="padding:18px; opacity:0.4;"></ha-icon>`}
        </div>
        <div class="info">
          <span class="title">${title}</span>
          ${artist ? html`<span class="artist">${artist}</span>` : ""}
          ${source ? html`<span class="source">${source}</span>` : ""}
        </div>
        <div class="controls">
          <button class="icon-btn" @click=${this._prev}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn play-btn" @click=${this._playPause}>
            <ha-icon icon=${isPlaying ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${this._next}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("glace-media-card", GlaceMediaCard);
