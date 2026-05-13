import { LitElement, html, css } from "lit";

/**
 * Custom Lovelace layout card for Glace.
 * Renders child cards inside a full-bleed dark container with proper spacing.
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
        background: var(--primary-background-color, #101415);
        padding: 0;
        margin: 0;
      }

      .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: 0 0 100px 0;
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
