import { css } from "lit";

/**
 * Shared liquid-glass design system for Glace.
 * Inspired by iOS 26 liquid glass and nikdelvin/liquid-glass SVG displacement.
 * Uses heavy backdrop-filter, edge highlights, and depth layering.
 */
export const glassStyles = css`
  :host {
    /* ── iOS System Colors ── */
    --glace-blue: #0a84ff;
    --glace-green: #30d158;
    --glace-orange: #ff9f0a;
    --glace-red: #ff453a;
    --glace-teal: #64d2ff;
    --glace-purple: #bf5af2;
    --glace-yellow: #ffd60a;
    --glace-indigo: #5e5ce6;

    /* ── Glass Surface Tokens ── */
    --glace-glass-bg: rgba(255, 255, 255, 0.07);
    --glace-glass-bg-hover: rgba(255, 255, 255, 0.11);
    --glace-glass-bg-active: rgba(255, 255, 255, 0.15);
    --glace-glass-blur: 40px;
    --glace-glass-saturate: 1.8;
    --glace-glass-brightness: 1.12;
    --glace-glass-radius: 20px;
    --glace-glass-radius-sm: 14px;
    --glace-glass-radius-xs: 10px;

    /* ── Text ── */
    --glace-text-primary: rgba(255, 255, 255, 0.92);
    --glace-text-secondary: rgba(255, 255, 255, 0.55);
    --glace-text-tertiary: rgba(255, 255, 255, 0.30);

    /* ── Elevation ── */
    --glace-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
    --glace-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10), 0 1px 4px rgba(0, 0, 0, 0.06);
    --glace-shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.14), 0 2px 10px rgba(0, 0, 0, 0.08);

    /* ── Motion ── */
    --glace-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --glace-ease: cubic-bezier(0.4, 0, 0.2, 1);

    /* ── Nav ── */
    --glace-nav-height: 82px;

    font-family: -apple-system, "SF Pro Display", "SF Pro Text",
      BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif;
    color: var(--glace-text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ═══════════════════════════════════════════
     Glass Surface — the core liquid-glass card
     ═══════════════════════════════════════════ */

  .glass {
    background: var(--glace-glass-bg);
    backdrop-filter: blur(var(--glace-glass-blur))
      saturate(var(--glace-glass-saturate))
      brightness(var(--glace-glass-brightness));
    -webkit-backdrop-filter: blur(var(--glace-glass-blur))
      saturate(var(--glace-glass-saturate))
      brightness(var(--glace-glass-brightness));
    border: 0.5px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--glace-glass-radius);
    box-shadow:
      inset 0 0.5px 0 0 rgba(255, 255, 255, 0.20),
      inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.05),
      var(--glace-shadow-md);
    position: relative;
    overflow: hidden;
    transition: transform 0.35s var(--glace-spring),
      background 0.2s var(--glace-ease),
      box-shadow 0.3s var(--glace-ease);
  }

  /* Top specular highlight — key liquid glass effect */
  .glass::before {
    content: "";
    position: absolute;
    top: 0;
    left: 8%;
    right: 8%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.35) 20%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.35) 80%,
      transparent
    );
    pointer-events: none;
    z-index: 2;
    border-radius: 1px;
  }

  .glass:active {
    transform: scale(0.975);
    background: var(--glace-glass-bg-active);
  }

  /* Subtle variant — less prominent glass */
  .glass-subtle {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(24px) saturate(1.4);
    -webkit-backdrop-filter: blur(24px) saturate(1.4);
    border: 0.5px solid rgba(255, 255, 255, 0.10);
    border-radius: var(--glace-glass-radius-sm);
    box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.12),
      var(--glace-shadow-sm);
    position: relative;
    overflow: hidden;
    transition: transform 0.35s var(--glace-spring),
      background 0.2s var(--glace-ease);
  }

  .glass-subtle::before {
    content: "";
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 0.5px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2) 30%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.2) 70%,
      transparent
    );
    pointer-events: none;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════
     Typography — SF Pro inspired scale
     ═══════════════════════════════════════════ */

  .text-title {
    font-size: 34px;
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.02em;
  }

  .text-headline {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.27;
    letter-spacing: -0.01em;
  }

  .text-body {
    font-size: 17px;
    font-weight: 400;
    line-height: 1.41;
    letter-spacing: -0.01em;
  }

  .text-callout {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.38;
  }

  .text-subhead {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.33;
    letter-spacing: -0.01em;
  }

  .text-footnote {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.38;
  }

  .text-caption {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.33;
  }

  .text-caption2 {
    font-size: 11px;
    font-weight: 400;
    line-height: 1.27;
  }

  .weight-bold { font-weight: 700; }
  .weight-semibold { font-weight: 600; }
  .weight-medium { font-weight: 500; }
  .weight-regular { font-weight: 400; }
  .weight-light { font-weight: 300; }

  /* ═══════════════════════════════════════════
     Color Utility
     ═══════════════════════════════════════════ */

  .color-secondary { color: var(--glace-text-secondary); }
  .color-tertiary { color: var(--glace-text-tertiary); }
  .color-blue { color: var(--glace-blue); }
  .color-green { color: var(--glace-green); }
  .color-orange { color: var(--glace-orange); }
  .color-red { color: var(--glace-red); }
  .color-teal { color: var(--glace-teal); }

  /* ═══════════════════════════════════════════
     Icon Button — frosted circle
     ═══════════════════════════════════════════ */

  .icon-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    border: 0.5px solid rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.15),
      var(--glace-shadow-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s var(--glace-spring),
      background 0.2s var(--glace-ease);
    color: var(--glace-text-primary);
    padding: 0;
  }

  .icon-btn:active {
    transform: scale(0.88);
    background: rgba(255, 255, 255, 0.18);
  }

  /* ═══════════════════════════════════════════
     iOS Toggle Switch
     ═══════════════════════════════════════════ */

  .toggle {
    width: 51px;
    height: 31px;
    border-radius: 15.5px;
    position: relative;
    cursor: pointer;
    border: none;
    padding: 0;
    flex-shrink: 0;
    transition: background 0.3s var(--glace-ease);
  }

  .toggle.on {
    background: var(--glace-green);
    box-shadow: 0 0 8px rgba(48, 209, 88, 0.3);
  }

  .toggle.off {
    background: rgba(255, 255, 255, 0.16);
    box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.10);
  }

  .toggle .knob {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15),
      0 0 1px rgba(0, 0, 0, 0.1);
    transition: left 0.25s var(--glace-spring);
  }

  .toggle.on .knob {
    left: 22px;
  }

  .toggle.off .knob {
    left: 2px;
  }

  /* ═══════════════════════════════════════════
     Pill / Chip — frosted compact button
     ═══════════════════════════════════════════ */

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    border: 0.5px solid rgba(255, 255, 255, 0.14);
    box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.12);
    color: var(--glace-text-primary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.3s var(--glace-spring),
      background 0.2s var(--glace-ease);
    white-space: nowrap;
  }

  .pill:active {
    transform: scale(0.94);
    background: rgba(255, 255, 255, 0.14);
  }

  .pill ha-icon {
    --mdc-icon-size: 16px;
  }

  .pill.accent {
    background: rgba(10, 132, 255, 0.18);
    border-color: rgba(10, 132, 255, 0.25);
    color: var(--glace-blue);
  }

  .pill.danger {
    background: rgba(255, 69, 58, 0.15);
    border-color: rgba(255, 69, 58, 0.20);
    color: var(--glace-red);
  }

  /* ═══════════════════════════════════════════
     Section Heading
     ═══════════════════════════════════════════ */

  .section-label {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--glace-text-secondary);
    margin: 0 0 10px 4px;
    padding: 0;
  }

  /* ═══════════════════════════════════════════
     Animations
     ═══════════════════════════════════════════ */

  @keyframes glace-fade-in {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes glace-slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: glace-fade-in 0.4s var(--glace-ease) both;
  }

  /* ═══════════════════════════════════════════
     Utility
     ═══════════════════════════════════════════ */

  .hidden {
    display: none !important;
  }

  .separator {
    height: 0.5px;
    background: rgba(255, 255, 255, 0.08);
    margin: 0;
  }
`;
