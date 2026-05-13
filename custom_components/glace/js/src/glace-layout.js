import { LitElement, html, css } from "lit";

/**
 * Custom Lovelace layout card for Glace.
 * Renders child cards inside a full-bleed liquid-glass container.
 */
class GlaceLayout extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _cards: { type: Array },
      _config: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 100vh;
        background: linear-gradient(
          160deg,
          #0a0e12 0%,
          #101820 25%,
          #0c1418 50%,
          #111a20 75%,
          #0a1015 100%
        );
        background-attachment: fixed;
        padding: 0;
        margin: 0;
        position: relative;
      }

      /* Subtle ambient glow spots */
      :host::before {
        content: "";
        position: fixed;
        top: -20%;
        right: -10%;
        width: 60%;
        height: 50%;
        background: radial-gradient(
          ellipse at center,
          rgba(137, 206, 255, 0.06) 0%,
          transparent 70%
        );
        pointer-events: none;
        z-index: 0;
      }

      :host::after {
        content: "";
        position: fixed;
        bottom: -10%;
        left: -15%;
        width: 50%;
        height: 45%;
        background: radial-gradient(
          ellipse at center,
          rgba(78, 222, 163, 0.04) 0%,
          transparent 70%
        );
        pointer-events: none;
        z-index: 0;
      }

      .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: 0 0 100px 0;
        position: relative;
        z-index: 1;
      }
    `;
  }

  setConfig(config) {
    this._config = config;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._cards) {
      this._cards.forEach((c) => {
        c.hass = hass;
      });
    }
  }

  get hass() {
    return this._hass;
  }

  async _buildCards() {
    if (!this._config || !this._config.cards) return;
    if (this._cards) return;

    const helpers = await window.loadCardHelpers?.();
    if (!helpers) return;

    this._cards = [];
    for (const cardConfig of this._config.cards) {
      const el = await helpers.createCardElement(cardConfig);
      el.hass = this._hass;
      this._cards.push(el);
    }
    this.requestUpdate();
  }

  updated() {
    this._buildCards();

    if (this._cards) {
      const container = this.shadowRoot?.querySelector(".layout");
      if (container && container.children.length === 0) {
        this._cards.forEach((c) => container.appendChild(c));
      }
    }
  }

  render() {
    return html`<div class="layout"></div>`;
  }
}

customElements.define("glace-layout", GlaceLayout);
