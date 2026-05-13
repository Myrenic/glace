import { css } from "lit";

/**
 * Shared liquid-glass CSS used across all Glace cards.
 * Reads custom properties set by the Glace HA theme so cards
 * respect the user's theme even if they tweak token values.
 */
export const glassStyles = css`
  :host {
    --glace-surface: var(--glace-surface, rgba(255, 255, 255, 0.05));
    --glace-surface-hover: var(--glace-surface-hover, rgba(255, 255, 255, 0.10));
    --glace-surface-active: var(--glace-surface-active, rgba(255, 255, 255, 0.14));
    --glace-blur: var(--glace-blur, 20px);
    --glace-saturate: var(--glace-saturate, 180%);
    --glace-border: var(--glace-border, 1px solid rgba(255, 255, 255, 0.10));
    --glace-radius-sm: var(--glace-radius-sm, 12px);
    --glace-radius-md: var(--glace-radius-md, 16px);
    --glace-radius-lg: var(--glace-radius-lg, 24px);
    --glace-shadow: var(--glace-shadow, 0 8px 32px rgba(0, 0, 0, 0.37));
    --glace-transition: var(--glace-transition, all 300ms cubic-bezier(0.4, 0, 0.2, 1));
    --glace-shimmer-duration: var(--glace-shimmer-duration, 8s);
    --glace-primary: var(--glace-primary, #89ceff);
    --glace-secondary: var(--glace-secondary, #4edea3);
    --glace-tertiary: var(--glace-tertiary, #ffb95f);
    --glace-error: var(--glace-error, #ffb4ab);
    --glace-on-surface: var(--glace-on-surface, #e0e3e5);
    --glace-on-surface-dim: var(--glace-on-surface-dim, rgba(224, 227, 229, 0.7));
    --glace-on-surface-faint: var(--glace-on-surface-faint, rgba(224, 227, 229, 0.4));
    --glace-nav-height: var(--glace-nav-height, 80px);

    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI",
      Roboto, Helvetica, Arial, sans-serif;
    color: var(--glace-on-surface);
    -webkit-font-smoothing: antialiased;
  }

  /* ---- Glass card surface ---- */

  .glass {
    background: var(--glace-surface);
    backdrop-filter: blur(var(--glace-blur)) saturate(var(--glace-saturate));
    -webkit-backdrop-filter: blur(var(--glace-blur)) saturate(var(--glace-saturate));
    border: var(--glace-border);
    border-radius: var(--glace-radius-md);
    box-shadow: var(--glace-shadow);
    transition: var(--glace-transition);
    position: relative;
    overflow: hidden;
  }

  .glass:active {
    transform: scale(0.97);
    background: var(--glace-surface-active);
  }

  /* Shimmer overlay */
  .glass::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 200%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.04) 50%,
      transparent
    );
    animation: glace-shimmer var(--glace-shimmer-duration) infinite linear;
    pointer-events: none;
  }

  @keyframes glace-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* ---- Typography ---- */

  .headline-lg {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .headline-md {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.3;
  }

  .body-lg {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
  }

  .body-md {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  }

  .label-md {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.05em;
  }

  .label-sm {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
  }

  /* ---- Utility ---- */

  .dim { color: var(--glace-on-surface-dim); }
  .faint { color: var(--glace-on-surface-faint); }
  .primary { color: var(--glace-primary); }
  .secondary { color: var(--glace-secondary); }
  .tertiary { color: var(--glace-tertiary); }

  .icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.10);
    border: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--glace-transition);
    color: var(--glace-on-surface);
    padding: 0;
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  .icon-btn:active {
    transform: scale(0.9);
  }

  /* Toggle pill */
  .toggle {
    width: 44px;
    height: 24px;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: var(--glace-transition);
    border: none;
    padding: 0;
  }

  .toggle.on {
    background: var(--glace-secondary);
  }

  .toggle.off {
    background: rgba(255, 255, 255, 0.20);
  }

  .toggle .knob {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 3px;
    transition: var(--glace-transition);
  }

  .toggle.on .knob {
    left: 23px;
  }

  .toggle.off .knob {
    left: 3px;
    opacity: 0.6;
  }

  /* Section heading */
  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 12px 0;
    padding: 0;
    color: var(--glace-on-surface);
  }

  /* Hide when empty */
  .hidden {
    display: none !important;
  }
`;
