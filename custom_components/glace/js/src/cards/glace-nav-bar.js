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
          background: rgba(20, 20, 28, 0.65);
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border-top: 0.5px solid rgba(255, 255, 255, 0.10);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 24px;
          height: var(--glace-nav-height, 82px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
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
        }

        .tab:active {
          transform: scale(0.88);
        }

        .tab.active {
          color: var(--glace-text-primary);
          background: rgba(255, 255, 255, 0.10);
          border: 0.5px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.10);
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
  }

  setConfig(config) {
    if (config.active) this.active = config.active;
  }

  _navigate(path) {
    window.history.pushState(null, "", `/glace-dashboard/${path}`);
    window.dispatchEvent(new Event("location-changed"));
  }

  render() {
    const tabs = [
      { id: "home", icon: "mdi:home", label: "Home", path: "home" },
      { id: "rooms", icon: "mdi:door", label: "Rooms", path: "rooms" },
      { id: "settings", icon: "mdi:cog", label: "Settings", path: "settings" },
    ];

    return html`
      <nav>
        ${tabs.map(
          (tab) => html`
            <button
              class="tab ${this.active === tab.id ? "active" : ""}"
              @click=${() => this._navigate(tab.path)}
            >
              <ha-icon icon=${tab.icon}></ha-icon>
              <span class="tab-label">${tab.label}</span>
            </button>
          `
        )}
      </nav>
    `;
  }
}

customElements.define("glace-nav-bar", GlaceNavBar);
