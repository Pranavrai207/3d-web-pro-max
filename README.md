# 3D Web Pro Max

> **Next-level AI skill for building immersive 3D websites** — the 3D counterpart to [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), built for Three.js, React Three Fiber, GSAP, Lenis, Spline, and WebGL.

<div align="center">

[![Scenes](https://img.shields.io/badge/Scenes-60-6C63FF?style=flat-square)](data/scenes.csv)
[![Shaders](https://img.shields.io/badge/Shaders-50-FF2D7E?style=flat-square)](data/shaders.csv)
[![Motion](https://img.shields.io/badge/Motion_Recipes-45-00F5FF?style=flat-square)](data/motion.csv)
[![Palettes](https://img.shields.io/badge/Palettes-80-FFB347?style=flat-square)](data/palettes-3d.csv)
[![Stacks](https://img.shields.io/badge/Stacks-15-4CAF50?style=flat-square)](data/stacks.csv)
[![Niches](https://img.shields.io/badge/Niches-25-E91E8C?style=flat-square)](data/niches.csv)

</div>

---

## What's Inside

| Category | Count | File |
|---|---|---|
| 🎬 3D Scene Archetypes | 60 | `data/scenes.csv` |
| ✨ GLSL Shader Patterns | 50 | `data/shaders.csv` |
| 🎭 Motion / Animation Recipes | 45 | `data/motion.csv` |
| 🎨 Color Palettes (3D-tuned) | 80 | `data/palettes-3d.csv` |
| 🔤 Font Pairings | 40 | `data/typography-3d.csv` |
| ⚙️ Tech Stacks | 15 | `data/stacks.csv` |
| 🏢 Industry Niches | 25 | `data/niches.csv` |
| 📋 Page Flow Patterns | 20 | `data/page-flows.csv` |
| ⚡ Performance Rules | 30 | `data/perf-rules.csv` |
| 🧠 Decision Rules | 50 | `data/reasoning-3d.csv` |
| **Total** | **415+** | |

---

## Quick Start

```bash
# Clone
git clone https://github.com/yourusername/3d-web-pro-max
cd 3d-web-pro-max

# Run design system for your project
python3 scripts/search.py "agency dark scroll immersive" --design-system -p "My Studio"

# Search specific domain
python3 scripts/search.py "particle neon" --domain scene -n 5

# Search shaders
python3 scripts/search.py "fresnel glow hologram" --domain shader

# Search performance rules
python3 scripts/search.py "mobile gpu" --domain perf

# Persist design system to files
python3 scripts/search.py "luxury fashion editorial" --design-system --persist -p "Brand X"
```

---

## Install as Skill (Claude / Cursor / Antigravity)

### Option A: Clone into `skills/` folder

```bash
cd your-project
mkdir -p skills
git clone https://github.com/yourusername/3d-web-pro-max skills/3d-web-pro-max
```

Then reference in your AI tool:
```
/skills/3d-web-pro-max/SKILL.md
```

### Option B: Global install

```bash
git clone https://github.com/yourusername/3d-web-pro-max ~/.skills/3d-web-pro-max
```

---

## How It Works

The skill uses a **Python-based search engine** over structured CSV databases. When you (or Claude) run the design system command, it:

1. **Tokenizes** your query
2. **Scores** every row in all 10 CSV files using TF-weighted matching
3. **Applies reasoning rules** from `reasoning-3d.csv` for smart decisions
4. **Assembles a complete design system** — scene, stack, shader, motion, palette, typography, page flow, perf rules, and anti-patterns

All in < 1 second. No API calls. No internet. Pure local intelligence.

---

## Design System Output Example

```
python3 scripts/search.py "luxury fashion editorial dark cloth" --design-system -p "Maison Brand"
```

Returns:
- **Scene:** Cloth Simulation (cloth-simulation)
- **Stack:** R3F + Drei + GSAP + Lenis
- **Shader:** Iridescent Surface
- **Motion:** ScrollTrigger Pin + Scroll Text 3D
- **Palette:** Oil Slick (dark iridescent)
- **Typography:** Cabinet Grotesk + Satoshi
- **Page Flow:** Fashion Editorial Full
- **Perf Rules:** 5 critical rules for this scene
- **Anti-patterns:** loud neon, flashy without purpose

---

## Starter Templates

| Template | Stack | Scene |
|---|---|---|
| `templates/hero-floating-orb/` | R3F + Drei + react-spring | Glassmorphic orb + mouse parallax |
| `templates/particle-field/` | Vanilla Three.js + custom shader | GPU particle field |
| `templates/product-viewer/` | R3F + Drei | GLTF 360 viewer + annotations |
| `templates/holographic-hero/` | Vanilla Three.js | Hologram + scanlines + fresnel |

---

## CLI Reference

```bash
# Full design system
python3 scripts/search.py "<query>" --design-system [-p "Project"] [--persist] [--page "pagename"]

# Domain search
python3 scripts/search.py "<query>" --domain <domain> [-n <count>]

# JSON output (for programmatic use)
python3 scripts/search.py "<query>" --design-system --json

# All domains
python3 scripts/search.py "<query>"
```

**Available domains:** `scene` `shader` `motion` `palette` `stack` `perf` `niche` `typography` `flow` `reasoning`

---

## Supported Tech Stack

| Tech | Role |
|---|---|
| [Three.js](https://threejs.org) | WebGL renderer |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React + Three.js |
| [Drei](https://github.com/pmndrs/drei) | R3F helper components |
| [GSAP + ScrollTrigger](https://gsap.com) | Animation engine |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scroll |
| [Spline](https://spline.design) | No-code 3D |
| [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) | Bloom, DOF, Glitch |
| [Rapier](https://rapier.rs) | Physics engine |
| [WebXR API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) | VR/AR |

---

## License

MIT — built for personal use and open to the community.
