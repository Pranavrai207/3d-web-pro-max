# 3D Web Pro Max

> **Build Awwwards-level 3D websites using AI — without breaking performance.**
> The 3D counterpart to `ui-ux-pro-max`, engineered for **Three.js, WebGL, R3F, and real GPU constraints.**

[![Scenes](https://img.shields.io/badge/Scenes-60-6C63FF?style=flat-square)](./data/scenes.csv)
[![Shaders](https://img.shields.io/badge/Shaders-50-FF2D7E?style=flat-square)](./data/shaders.csv)
[![Motion](https://img.shields.io/badge/Motion_Recipes-45-00F5FF?style=flat-square)](./data/motion.csv)
[![Palettes](https://img.shields.io/badge/Palettes-80-FFB347?style=flat-square)](./data/palettes-3d.csv)
[![Stacks](https://img.shields.io/badge/Stacks-15-4CAF50?style=flat-square)](./data/stacks.csv)
[![Total](https://img.shields.io/badge/Total_Entries-415+-white?style=flat-square)](#-whats-inside)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![Node](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square)](https://nodejs.org)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?style=flat-square)](https://python.org)

---

## 🚀 What This Actually Does

Most AI tools can design UI. **This one designs complete 3D web systems** — with performance budgets, shaders, motion orchestration, and GPU limits baked in.

Give it a prompt → get a **production-ready 3D design system**:

- 🎬 Scene archetype + alternates
- ⚙️ Full tech stack + install command
- ✨ Shader / GLSL effect pattern
- 🎭 Motion & animation recipe
- 🎨 3D-tuned color palette (emissive, fog, ambient + directional light values)
- 🔤 Typography pairing
- 📋 Page flow pattern
- ⚡ Critical performance rules
- 🚫 Anti-patterns to avoid
- ✅ Pre-delivery checklist

> **Runs in under 1 second. Fully offline. Zero hallucination.**

---

## 🧠 Why This Exists

Building 3D websites is hard:

- AI generates **bad Three.js code** — wrong draw calls, no disposal, broken on mobile
- Devs ignore **GPU memory limits** — sites crash on mid-range hardware
- Projects look great on dev machine, then **die on mobile**

This solves that by forcing AI to think like a **Senior Graphics Engineer**, not just a designer.

---

## 📦 What's Inside

| Category | Count | File |
|---|---|---|
| 🎬 3D Scene Archetypes | 60 | `data/scenes.csv` |
| ✨ GLSL Shader Patterns | 50 | `data/shaders.csv` |
| 🎭 Motion / Animation Recipes | 45 | `data/motion.csv` |
| 🎨 3D-Tuned Color Palettes | 80 | `data/palettes-3d.csv` |
| 🔤 Typography Systems | 40 | `data/typography-3d.csv` |
| ⚙️ Tech Stacks | 15 | `data/stacks.csv` |
| 🏢 Industry Niches | 25 | `data/niches.csv` |
| 📋 Page Flow Patterns | 20 | `data/page-flows.csv` |
| ⚡ Performance Rules | 30 | `data/perf-rules.csv` |
| 🧠 Decision Rules | 50 | `data/reasoning-3d.csv` |
| **Total** | **415+** | |

---

## ⚙️ Installation & CLI Setup

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Pranavrai207/3d-web-pro-max
cd 3d-web-pro-max/cli
```

### Step 2 — Install Dependencies

```bash
npm install
```

> No build step needed. The CLI is plain Node.js — zero external dependencies.

### Step 3 — Run the Installer

```bash
node index.js --all
```

That's it. The CLI detects your OS home directory and installs `SKILL.md` into every supported AI editor automatically.

---

## 🖥️ CLI Commands

| Command | What It Does |
|---|---|
| `node index.js --all` | Installs skill to all 14 supported AI editors |
| `node index.js --uninstall` | Removes skill from all supported editors |

### Global Install (optional)

Install once and run `3d-web-cli` from anywhere:

```bash
# From inside the cli/ folder
npm install -g .

# Now use globally from any directory
3d-web-cli --all
3d-web-cli --uninstall
```

---

## 🤖 Supported AI Editors (14 total)

The `--all` command installs to all of these in one shot:

| Editor | Install Path | File |
|---|---|---|
| **Claude Code** | `~/.claude/skills/3d-web-pro-max/` | `3d-web-pro-max.md` |
| **Cursor** | `~/.cursor/rules/` | `3d-web-pro-max.mdc` |
| **Windsurf** | `~/.windsurf/rules/` | `3d-web-pro-max.mdc` |
| **Antigravity** | `~/.antigravity/skills/` | `3d-web-pro-max.md` |
| **GitHub Copilot** | `~/.github/copilot-instructions/` | `3d-web-pro-max.md` |
| **Kiro** | `~/.kiro/rules/` | `3d-web-pro-max.md` |
| **Codex** | `~/.codex/skills/` | `3d-web-pro-max.md` |
| **Roo Code** | `~/.roo/rules/` | `3d-web-pro-max.mdc` |
| **Qoder** | `~/.qoder/rules/` | `3d-web-pro-max.md` |
| **Gemini** | `~/.gemini/skills/` | `3d-web-pro-max.md` |
| **Trae** | `~/.trae/rules/` | `3d-web-pro-max.mdc` |
| **OpenCode** | `~/.opencode/rules/` | `3d-web-pro-max.md` |
| **Continue** | `~/.continue/prompts/` | `3d-web-pro-max.md` |
| **Kilocode** | `~/.kilocode/rules/` | `3d-web-pro-max.md` |

> Cursor, Windsurf, Trae, and Roo Code get `.mdc` format. All others get `.md`.

---

## ✅ Verify the Install

After running `--all`, confirm the skill landed correctly:

```bash
# Claude Code
ls ~/.claude/skills/3d-web-pro-max/

# Antigravity
ls ~/.antigravity/skills/

# Cursor
ls ~/.cursor/rules/

# Find all installed copies
find ~ -name "3d-web-pro-max*" 2>/dev/null
```

You should see `3d-web-pro-max.md` (or `.mdc`) in each editor's folder.

---

## 🐍 Using the Python Search Engine

After install, your AI editor will automatically use the skill. You can also run the search engine directly for local design system generation:

```bash
# From repo root (not cli/)
cd 3d-web-pro-max

# Full 3D design system
python3 scripts/search.py "agency dark scroll immersive" --design-system -p "My Studio"

# Domain-specific searches
python3 scripts/search.py "particle neon" --domain scene -n 5
python3 scripts/search.py "fresnel glow hologram" --domain shader
python3 scripts/search.py "mobile gpu limits" --domain perf

# Save output to files (for big projects)
python3 scripts/search.py "luxury fashion editorial" --design-system --persist -p "Brand X"
```

**Python install (if needed):**

| Platform | Command |
|---|---|
| macOS | `brew install python3` |
| Ubuntu / Debian | `sudo apt update && sudo apt install python3` |
| Windows | `winget install Python.Python.3.12` |
| Arch Linux | `sudo pacman -S python` |

> Zero `pip` dependencies — pure Python stdlib.

---

## 🔍 Search CLI Reference

```
python3 scripts/search.py <query> [options]
```

| Flag | Description | Example |
|---|---|---|
| `--design-system` | Full 3D design system output | `--design-system` |
| `-p, --project` | Set project name in output | `-p "My Brand"` |
| `--domain` | Search one domain only | `--domain scene` |
| `-n, --count` | Number of results | `-n 5` |
| `--persist` | Save to `design-system/` folder | `--persist` |
| `--page` | Page-specific design system | `--page "hero"` |
| `-f, --format` | `ascii` or `markdown` output | `-f markdown` |

**Domains:**

| Domain | Use For |
|---|---|
| `scene` | 3D scene archetypes |
| `shader` | GLSL effects |
| `motion` | Animation recipes |
| `palette` | Color systems |
| `stack` | Tech stack selection |
| `perf` | GPU budget rules |
| `niche` | Industry patterns |
| `typography` | Font pairings |
| `flow` | Page structures |
| `reasoning` | Decision rules |

---

## 🧪 Example Output

```bash
python3 scripts/search.py "luxury fashion editorial dark cloth" --design-system -p "Maison Brand"
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  3D WEB PRO MAX — MAISON BRAND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCENE        → Cloth Simulation
STACK        → R3F + Drei + GSAP + Lenis
SHADER       → Iridescent Surface
MOTION       → ScrollTrigger + 3D text reveal
PALETTE      → Oil Slick (dark iridescent)
TYPOGRAPHY   → Cabinet Grotesk + Satoshi
PAGE FLOW    → Editorial scroll layout

PERFORMANCE RULES (5 critical):
  • dpr capped at 2 — no exceptions
  • Post-processing disabled on mobile
  • dispose() on all geo/mat/tex unmount
  • Particle count ≤ 2K mobile / 15K desktop
  • Draco + KTX2 compression on all GLTF

ANTI-PATTERNS:
  ✗ Unoptimized noise shaders on hero
  ✗ Shadow-casting on 4+ lights
  ✗ Heavy useFrame computation (>2ms)
```

---

## 🏗️ Project Structure

```
3d-web-pro-max/
├── cli/
│   ├── index.js              # CLI installer — node index.js --all
│   ├── package.json          # bin: "3d-web-cli"
│   └── templates/
│       └── SKILL.md          # Skill file copied to all editors on install
├── data/
│   ├── scenes.csv            # 60 scene archetypes
│   ├── shaders.csv           # 50 GLSL shader patterns
│   ├── motion.csv            # 45 animation recipes
│   ├── palettes-3d.csv       # 80 color palettes
│   ├── typography-3d.csv     # 40 font pairings
│   ├── stacks.csv            # 15 tech stacks
│   ├── niches.csv            # 25 industry patterns
│   ├── page-flows.csv        # 20 page flow patterns
│   ├── perf-rules.csv        # 30 performance rules
│   └── reasoning-3d.csv      # 50 decision rules
├── scripts/
│   └── search.py             # Deterministic design engine (Python stdlib)
├── SKILL.md                  # Agent instructions (root reference copy)
└── README.md
```

---

## ⚡ Mandatory Performance Rules

Enforced on every design system output:

**1 — Cap `pixelRatio` at 2**
```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// R3F: <Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
```

**2 — Disable post-processing on mobile**
```jsx
{!isMobile && <EffectComposer><Bloom intensity={0.5} /></EffectComposer>}
```

**3 — Always `dispose()` on unmount**
```js
useEffect(() => () => { geometry.dispose(); material.dispose(); texture.dispose() }, [])
```

**4 — Cap particles by device**
```js
const particleCount = isMobile ? 2000 : 15000
```

**5 — Never exceed 3 shadow-casting lights**

**6 — Compress all GLTF with Draco + KTX2**
```bash
npx gltf-transform optimize model.glb model-opt.glb --compress draco
```

**7 — Next.js: dynamic import for Canvas**
```jsx
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })
```

**8 — Keep `useFrame` under 2ms**
```jsx
useFrame((state, delta) => { mesh.current.rotation.y += 0.5 * delta })
```

**9 — Always provide a WebGL fallback**
```js
const supported = (() => { try { return !!document.createElement('canvas').getContext('webgl') } catch { return false } })()
```

**10 — Always use Lenis for smooth scroll**
```js
const lenis = new Lenis({ lerp: 0.08 })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((t) => lenis.raf(t * 1000))
```

---

## 🤝 Contributing

```bash
git checkout -b feat/your-feature

# Add data rows to CSVs, improve search.py, add editor support to cli/index.js

python3 scripts/search.py "test query" --design-system  # test search
node cli/index.js --all                                  # test CLI

git commit -m "feat: description"
git push -u origin feat/your-feature
gh pr create
```

---

## 🔗 Related

- [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — The 2D design intelligence counterpart

---

## 📜 License

MIT — open source, built for the community.

---

<p align="center">Built by <a href="https://github.com/Pranavrai207">Pranav Rai</a> · Star ⭐ if this saved your GPU memory</p>
