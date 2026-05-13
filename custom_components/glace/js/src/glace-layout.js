import { LitElement, html, css } from "lit";

/**
 * Custom Lovelace layout card for Glace.
 * Provides an iOS-like dark wallpaper background with mesh gradients
 * that give the glass cards rich content to blur against.
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
        min-height: 100dvh;
        margin: 0;
        padding: 0;
        position: relative;

        /* Rich dark wallpaper with mesh gradient layers */
        background:
          /* Warm accent top-right */
          radial-gradient(
            ellipse 60% 50% at 85% 15%,
            rgba(100, 60, 180, 0.18) 0%,
            transparent 70%
          ),
          /* Cool accent bottom-left */
          radial-gradient(
            ellipse 55% 45% at 15% 80%,
            rgba(10, 80, 160, 0.16) 0%,
            transparent 70%
          ),
          /* Warm glow center */
          radial-gradient(
            ellipse 40% 35% at 50% 40%,
            rgba(80, 40, 120, 0.10) 0%,
            transparent 70%
          ),
          /* Teal accent */
          radial-gradient(
            ellipse 30% 40% at 70% 65%,
            rgba(20, 100, 130, 0.09) 0%,
            transparent 70%
          ),
          /* Base gradient */
          linear-gradient(
            170deg,
            #0c0c14 0%,
            #0e1018 20%,
            #0a0e16 40%,
            #0c0f1a 60%,
            #08090f 80%,
            #060608 100%
          );
        background-attachment: fixed;
      }

      .layout-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-height: 100dvh;
        padding: 0 0 var(--glace-nav-height, 82px) 0;
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
      const container = this.shadowRoot?.querySelector(".layout-wrapper");
      if (container && container.children.length === 0) {
        this._cards.forEach((c) => container.appendChild(c));
      }
    }
  }

  render() {
    return html`<div class="layout-wrapper"></div>`;
  }
}

customElements.define("glace-layout", GlaceLayout);
