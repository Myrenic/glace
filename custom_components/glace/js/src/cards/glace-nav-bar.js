import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-nav-bar
 *
 * iOS-style frosted bottom tab bar.
 */
class GlaceNavBar extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      active: { type: String },
      tabs: { type: Array },
    };
  }

  static get styles() {
    return [
      glassStyles,
      css`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        nav {
          margin: 0 14px calc(10px + env(safe-area-inset-bottom, 0px));
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 48%, rgba(255, 255, 255, 0.04) 100%);
          backdrop-filter: blur(32px) saturate(1.65);
          -webkit-backdrop-filter: blur(32px) saturate(1.65);
          border: 1px solid rgba(255, 255, 255, 0.10);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 8px 12px;
          min-height: var(--glace-nav-height, 82px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 20px 60px rgba(2, 5, 12, 0.32);
        }

        .tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: transform 0.3s var(--glace-spring),
            background 0.2s var(--glace-ease);
          background: transparent;
          border: none;
          color: var(--glace-text-tertiary);
          min-width: 84px;
        }

        .tab:active {
          transform: scale(0.88);
        }

        .tab.active {
          color: var(--glace-text-primary);
          background: rgba(255, 255, 255, 0.12);
          border: 0.5px solid rgba(255, 255, 255, 0.10);
          box-shadow:
            inset 0 0.5px 0 0 rgba(255, 255, 255, 0.12),
            0 10px 24px rgba(4, 7, 18, 0.18);
        }

        .tab ha-icon {
          --mdc-icon-size: 24px;
        }

        .tab-label {
          font-size: 10px;
          font-weight: 500;
          margin-top: 3px;
          letter-spacing: 0.02em;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.active = "home";
    this.tabs = [];
  }

  setConfig(config) {
    if (config.active) this.active = config.active;
    if (config.tabs) this.tabs = config.tabs;
  }

  _navigate(path) {
    if (!path) return;
    window.history.pushState(null, "", `/glace-dashboard/${path}`);
    window.dispatchEvent(new Event("location-changed"));
  }

  render() {
    const tabs = this.tabs || [];
    if (tabs.length < 2) return html``;

    return html`
      <nav>
        ${tabs.map(
          (tab) => html`
            <button
              class="tab ${this.active === tab.id ? "active" : ""}"
              @click=${() => this._navigate(tab.path || tab.id)}
            >
              <ha-icon icon=${tab.icon}></ha-icon>
              <span class="tab-label">${tab.title || tab.label || tab.id}</span>
            </button>
          `
        )}
      </nav>
    `;
  }
}

customElements.define("glace-nav-bar", GlaceNavBar);
