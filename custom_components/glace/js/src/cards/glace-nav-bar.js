import { LitElement, html, css } from "lit";
import { glassStyles } from "../styles/glass.js";

/**
 * glace-nav-bar
 *
 * iOS-style frosted bottom navigation bar.
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
          background: rgba(0, 0, 0, 0.30);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
          border-radius: 16px 16px 0 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 20px;
          height: var(--glace-nav-height, 80px);
        }

        .tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--glace-transition);
          background: transparent;
          border: none;
          color: var(--glace-on-surface-dim);
        }

        .tab:active {
          transform: scale(0.9);
        }

        .tab.active {
          color: var(--glace-on-surface);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .tab ha-icon {
          --mdc-icon-size: 24px;
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
      { id: "home", icon: "mdi:home", path: "home" },
      { id: "rooms", icon: "mdi:door", path: "rooms" },
      { id: "settings", icon: "mdi:cog", path: "settings" },
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
            </button>
          `
        )}
      </nav>
    `;
  }
}

customElements.define("glace-nav-bar", GlaceNavBar);
