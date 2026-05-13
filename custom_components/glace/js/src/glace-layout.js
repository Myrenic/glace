import { LitElement, html, css } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { fetchGlaceUserConfig } from "./utils/ha-api.js";
import {
  getBackgroundStyle,
  getGlacePages,
  getPageMetadata,
} from "./utils/dashboard-config.js";

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
      _userConfig: { type: Object },
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
        overflow: hidden;
        color: rgba(255, 255, 255, 0.94);
      }

      .shell {
        position: relative;
        min-height: 100vh;
        min-height: 100dvh;
      }

      .backdrop,
      .backdrop-glow,
      .backdrop-noise,
      .backdrop-vignette {
        position: fixed;
        inset: 0;
        pointer-events: none;
      }

      .backdrop {
        background-repeat: no-repeat;
        filter: saturate(1.08) contrast(1.04);
        transform: scale(1.04);
      }

      .backdrop-glow {
        background:
          radial-gradient(circle at 15% 18%, rgba(255, 255, 255, 0.08), transparent 26%),
          radial-gradient(circle at 84% 12%, rgba(118, 188, 255, 0.10), transparent 28%),
          radial-gradient(circle at 70% 80%, rgba(44, 230, 192, 0.08), transparent 24%);
        mix-blend-mode: screen;
        opacity: 0.8;
      }

      .backdrop-noise {
        opacity: 0.08;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
        background-size: 3px 3px, 3px 3px;
        mix-blend-mode: soft-light;
      }

      .backdrop-vignette {
        background:
          radial-gradient(circle at center, transparent 0%, rgba(1, 4, 9, 0.08) 52%, rgba(1, 4, 9, 0.44) 100%),
          linear-gradient(180deg, rgba(1, 4, 9, 0.08) 0%, rgba(1, 4, 9, 0.28) 100%);
      }

      .layout-wrapper {
        display: flex;
        flex-direction: column;
        gap: 18px;
        min-height: 100vh;
        min-height: 100dvh;
        padding:
          calc(24px + env(safe-area-inset-top, 0px))
          16px
          calc(118px + env(safe-area-inset-bottom, 0px))
          16px;
        position: relative;
        z-index: 1;
      }

      .page-chrome {
        padding: 18px 20px;
        border-radius: 28px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.07) 48%, rgba(255, 255, 255, 0.03) 100%);
        backdrop-filter: blur(28px) saturate(1.5);
        -webkit-backdrop-filter: blur(28px) saturate(1.5);
        border: 1px solid rgba(255, 255, 255, 0.10);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          0 24px 80px rgba(3, 5, 14, 0.28);
      }

      .page-chip {
        width: fit-content;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.72);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .page-chip ha-icon {
        --mdc-icon-size: 14px;
      }

      .page-title {
        margin: 14px 0 4px;
        font-size: clamp(2rem, 6vw, 3.35rem);
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 0.98;
      }

      .page-subtitle {
        margin: 0;
        max-width: 40rem;
        color: rgba(255, 255, 255, 0.62);
        font-size: 14px;
        line-height: 1.5;
      }

      .cards-slot {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `;
  }

  constructor() {
    super();
    this._userConfig = null;
  }

  setConfig(config) {
    this._config = config;
    this._cards = undefined;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._cards) {
      this._cards.forEach((c) => {
        c.hass = hass;
      });
    }
    if (!this._userConfig && hass) {
      this._loadUserConfig();
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

  async _loadUserConfig() {
    try {
      this._userConfig = await fetchGlaceUserConfig(this._hass);
    } catch (err) {
      console.error("Glace: failed to load user config", err);
      this._userConfig = {};
    }
  }

  _getViewId() {
    return this._config?.path || "home";
  }

  _getPageMeta() {
    const viewId = this._getViewId();
    const configPage = getPageMetadata(this._userConfig || {}, viewId);

    return {
      ...configPage,
      title: configPage.title || this._config?.title || viewId,
      subtitle: configPage.subtitle,
      icon: this._config?.icon || configPage.icon,
    };
  }

  updated() {
    this._buildCards();

    if (this._cards) {
      const container = this.shadowRoot?.querySelector(".cards-slot");
      const needsReplace =
        container &&
        (container.childElementCount !== this._cards.length ||
          this._cards.some((card, index) => container.children[index] !== card));

      if (needsReplace) {
        container.replaceChildren(...this._cards);
      }
    }
  }

  render() {
    const page = this._getPageMeta();
    const tabs = getGlacePages(this._userConfig || {});
    const backdropStyle = getBackgroundStyle(
      this._userConfig || {},
      page.id,
      this._config?.background
    );

    return html`
      <div class="shell">
        <div class="backdrop" style=${styleMap(backdropStyle)}></div>
        <div class="backdrop-glow"></div>
        <div class="backdrop-noise"></div>
        <div class="backdrop-vignette"></div>

        <div class="layout-wrapper">
          <header class="page-chrome">
            <div class="page-chip">
              <ha-icon icon=${page.icon}></ha-icon>
              <span>Glace</span>
            </div>
            <h1 class="page-title">${page.title}</h1>
            ${page.subtitle
              ? html`<p class="page-subtitle">${page.subtitle}</p>`
              : ""}
          </header>

          <div class="cards-slot"></div>
        </div>

        <glace-nav-bar .active=${page.id} .tabs=${tabs}></glace-nav-bar>
      </div>
    `;
  }
}

customElements.define("glace-layout", GlaceLayout);
