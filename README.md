# Glace

An adaptive Home Assistant dashboard with an Apple liquid-glass visual system.

Glace automatically discovers your Home Assistant Areas and entities, then builds a phone-first homepage that shows only what matters right now — active lights with a quick "all off" action, playing media with inline controls, energy price alerts, and room summaries — hiding everything else until it becomes relevant.

## Features

- **Adaptive homepage** — sections appear and disappear based on live entity state
- **Area-aware rooms** — rooms are built automatically from HA Areas
- **Liquid-glass design** — translucent cards, backdrop blur, subtle shimmer, iOS-inspired navigation
- **Multi-page shell** — dedicated Home, Lighting, and Switches views with shared liquid-glass chrome
- **Zero-config defaults** — works out of the box with sensible defaults from HA metadata
- **Customizable** — simple global or per-page backgrounds plus room/entity exclusions through Glace options or `glace/config.yaml`
- **HACS installable** — install and update via HACS

## Installation

1. Install via [HACS](https://hacs.xyz/) — search for "Glace"
2. Restart Home Assistant
3. Add the Glace integration via **Settings → Devices & Services → Add Integration → Glace**
4. The Glace dashboard appears in the sidebar

## Requirements

- Home Assistant 2025.4.0 or newer
- HACS installed

## Background customization

Glace keeps working with no config, but you can now set a single dashboard background or override individual pages by editing `config/glace/config.yaml`.

```yaml
background:
  global:
    preset: aurora
  pages:
    rooms:
      image: /local/glace/rooms-wallpaper.jpg
    focus:
      css: >
        radial-gradient(circle at 18% 18%, rgba(255, 191, 117, 0.24), transparent 32%),
        radial-gradient(circle at 82% 18%, rgba(117, 196, 255, 0.18), transparent 32%),
        linear-gradient(160deg, #120d1e 0%, #131d31 52%, #06070c 100%)

pages:
  home:
    title: Home
  lighting:
    title: Lighting
    subtitle: Lights and scenes
  switches:
    title: Switches
    subtitle: Useful switches only
```

Supported background formats:

- `preset: obsidian | aurora | dawn | studio`
- `image: /local/...` with optional `overlay`, `position`, `size`, and `attachment`
- `css: "<full CSS background-image value>"`

You can also hide clutter through the Glace integration options:

- **Hidden rooms** — comma-separated room names or area IDs
- **Hidden entities** — comma-separated entity IDs

## License

MIT
