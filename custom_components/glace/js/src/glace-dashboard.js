/**
 * Glace Dashboard — entry point.
 * Registers all custom elements with the browser.
 */
import "./glace-layout.js";
import "./cards/glace-homepage-card.js";
import "./cards/glace-room-card.js";
import "./cards/glace-room-view-card.js";
import "./cards/glace-light-summary.js";
import "./cards/glace-media-card.js";
import "./cards/glace-energy-card.js";
import "./cards/glace-nav-bar.js";

const VERSION = "0.1.0";

console.info(
  `%c GLACE %c v${VERSION} `,
  "color: #89ceff; font-weight: bold; background: #101415; padding: 4px 8px; border-radius: 4px 0 0 4px;",
  "color: #e0e3e5; background: #272a2c; padding: 4px 8px; border-radius: 0 4px 4px 0;"
);
