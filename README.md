# Glace

An adaptive Home Assistant dashboard with an Apple liquid-glass visual system.

Glace automatically discovers your Home Assistant Areas and entities, then builds a phone-first homepage that shows only what matters right now — active lights with a quick "all off" action, playing media with inline controls, energy price alerts, and room summaries — hiding everything else until it becomes relevant.

## Features

- **Adaptive homepage** — sections appear and disappear based on live entity state
- **Area-aware rooms** — rooms are built automatically from HA Areas
- **Liquid-glass design** — translucent cards, backdrop blur, subtle shimmer, iOS-inspired navigation
- **Zero-config defaults** — works out of the box with sensible defaults from HA metadata
- **Customizable** — per-room overrides for favorites, ordering, visibility, quick actions
- **HACS installable** — install and update via HACS

## Installation

1. Install via [HACS](https://hacs.xyz/) — search for "Glace"
2. Restart Home Assistant
3. Add the Glace integration via **Settings → Devices & Services → Add Integration → Glace**
4. The Glace dashboard appears in the sidebar

## Requirements

- Home Assistant 2025.4.0 or newer
- HACS installed

## License

MIT
