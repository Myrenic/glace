const DEFAULT_BACKGROUND = `
  radial-gradient(circle at 18% 18%, rgba(117, 192, 255, 0.18), transparent 38%),
  radial-gradient(circle at 84% 14%, rgba(188, 118, 255, 0.16), transparent 42%),
  radial-gradient(circle at 76% 72%, rgba(64, 218, 196, 0.13), transparent 34%),
  radial-gradient(circle at 24% 82%, rgba(255, 166, 117, 0.12), transparent 32%),
  linear-gradient(160deg, #06070b 0%, #0b1020 42%, #090e17 68%, #040507 100%)
`.trim();

const BACKGROUND_PRESETS = {
  obsidian: DEFAULT_BACKGROUND,
  aurora: `
    radial-gradient(circle at 12% 18%, rgba(107, 188, 255, 0.26), transparent 34%),
    radial-gradient(circle at 78% 14%, rgba(217, 134, 255, 0.22), transparent 36%),
    radial-gradient(circle at 70% 72%, rgba(44, 230, 192, 0.18), transparent 34%),
    radial-gradient(circle at 28% 78%, rgba(255, 173, 102, 0.14), transparent 30%),
    linear-gradient(160deg, #05070e 0%, #0a1226 38%, #0b1320 64%, #040507 100%)
  `.trim(),
  dawn: `
    radial-gradient(circle at 20% 18%, rgba(255, 201, 154, 0.24), transparent 34%),
    radial-gradient(circle at 82% 18%, rgba(255, 140, 184, 0.20), transparent 34%),
    radial-gradient(circle at 60% 76%, rgba(123, 202, 255, 0.18), transparent 30%),
    linear-gradient(155deg, #1a0f1a 0%, #291a2f 28%, #1a243a 60%, #0a0e16 100%)
  `.trim(),
  studio: `
    radial-gradient(circle at 22% 22%, rgba(255, 255, 255, 0.10), transparent 28%),
    radial-gradient(circle at 78% 24%, rgba(118, 154, 255, 0.14), transparent 30%),
    radial-gradient(circle at 70% 74%, rgba(135, 255, 225, 0.10), transparent 28%),
    linear-gradient(160deg, #08090d 0%, #10141b 40%, #0c1118 72%, #050608 100%)
  `.trim(),
};

const DEFAULT_PAGES = [
  {
    id: "home",
    path: "home",
    title: "Home",
    subtitle: "Adaptive overview",
    icon: "mdi:home-variant",
  },
  {
    id: "rooms",
    path: "rooms",
    title: "Rooms",
    subtitle: "Every area at a glance",
    icon: "mdi:floor-plan",
  },
  {
    id: "focus",
    path: "focus",
    title: "Focus",
    subtitle: "Live activity and energy",
    icon: "mdi:creation-outline",
  },
];

const DEFAULT_IMAGE_OVERLAY = `
  linear-gradient(180deg, rgba(3, 6, 12, 0.22) 0%, rgba(3, 6, 12, 0.44) 52%, rgba(3, 6, 12, 0.68) 100%)
`.trim();

function escapeUrl(url = "") {
  return String(url).replace(/"/g, '\\"');
}

function normalizePage(id, overrides = {}) {
  const fallback = DEFAULT_PAGES.find((page) => page.id === id) || {
    id,
    path: id,
    title: id,
    subtitle: "",
    icon: "mdi:view-grid-outline",
  };

  return {
    ...fallback,
    ...overrides,
    id,
    path: overrides.path || fallback.path || id,
  };
}

export function getGlacePages(userConfig = {}) {
  const configuredPages = userConfig.pages || {};

  return DEFAULT_PAGES
    .map((page) => normalizePage(page.id, configuredPages[page.id] || {}))
    .filter((page) => page.hidden !== true);
}

export function getPageMetadata(userConfig = {}, viewId = "home") {
  return (
    getGlacePages(userConfig).find((page) => page.id === viewId) ||
    normalizePage(viewId)
  );
}

function normalizeBackground(background) {
  if (!background) {
    return { kind: "preset", preset: "obsidian" };
  }

  if (typeof background === "string") {
    return { kind: "css", css: background };
  }

  if (background.css) {
    return { kind: "css", css: background.css };
  }

  if (background.image) {
    return {
      kind: "image",
      image: background.image,
      overlay: background.overlay || DEFAULT_IMAGE_OVERLAY,
      position: background.position || "center center",
      size: background.size || "cover",
      attachment: background.attachment || "fixed",
    };
  }

  return {
    kind: "preset",
    preset: background.preset || "obsidian",
  };
}

export function getBackgroundStyle(userConfig = {}, viewId = "home", inlineBackground) {
  const backgroundConfig =
    inlineBackground ||
    userConfig?.background?.pages?.[viewId] ||
    userConfig?.background?.global;

  const resolved = normalizeBackground(backgroundConfig);

  if (resolved.kind === "image") {
    return {
      backgroundImage: `${resolved.overlay}, url("${escapeUrl(resolved.image)}")`,
      backgroundSize: `cover, ${resolved.size}`,
      backgroundPosition: `center center, ${resolved.position}`,
      backgroundAttachment: `fixed, ${resolved.attachment}`,
    };
  }

  return {
    backgroundImage:
      resolved.kind === "css"
        ? resolved.css
        : BACKGROUND_PRESETS[resolved.preset] || DEFAULT_BACKGROUND,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
  };
}
