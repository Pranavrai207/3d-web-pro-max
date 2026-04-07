# 3D Web Pro Max

> **Build Awwwards-level 3D websites using AI — without breaking performance.**
> The 3D counterpart to `ui-ux-pro-max`, engineered for **Three.js, WebGL, and real GPU constraints.**

---

<div align="center">

[![Scenes](https://img.shields.io/badge/Scenes-60-6C63FF?style=flat-square)](data/scenes.csv)
[![Shaders](https://img.shields.io/badge/Shaders-50-FF2D7E?style=flat-square)](data/shaders.csv)
[![Motion](https://img.shields.io/badge/Motion_Recipes-45-00F5FF?style=flat-square)](data/motion.csv)
[![Palettes](https://img.shields.io/badge/Palettes-80-FFB347?style=flat-square)](data/palettes-3d.csv)
[![Stacks](https://img.shields.io/badge/Stacks-15-4CAF50?style=flat-square)](data/stacks.csv)
[![Niches](https://img.shields.io/badge/Niches-25-E91E8C?style=flat-square)](data/niches.csv)

</div>

---

## 🚀 What This Actually Does

Most AI tools can design UI.

This one:

> **Designs complete 3D web systems — with performance, shaders, motion, and GPU limits in mind.**

Give it a prompt → get a **production-ready 3D design system**:

* Scene
* Shader
* Motion system
* Tech stack
* Color + typography
* Page flow
* Performance rules
* Anti-patterns

All generated locally. No API. No hallucination.

---

## 🧠 Why This Exists

Building 3D websites is hard.

* AI generates **bad Three.js code**
* Devs ignore **GPU limits**
* Projects crash on **mobile devices**

This solves that.

> It forces AI to think like a **Senior Graphics Engineer**, not just a designer.

---

## 📦 What's Inside

| Category                      | Count    | File                     |
| ----------------------------- | -------- | ------------------------ |
| 🎬 3D Scene Archetypes        | 60       | `data/scenes.csv`        |
| ✨ GLSL Shader Patterns        | 50       | `data/shaders.csv`       |
| 🎭 Motion / Animation Recipes | 45       | `data/motion.csv`        |
| 🎨 3D-Tuned Color Systems     | 80       | `data/palettes-3d.csv`   |
| 🔤 Typography Systems         | 40       | `data/typography-3d.csv` |
| ⚙️ Tech Stacks                | 15       | `data/stacks.csv`        |
| 🏢 Industry Niches            | 25       | `data/niches.csv`        |
| 📋 Page Flow Patterns         | 20       | `data/page-flows.csv`    |
| ⚡ Performance Rules           | 30       | `data/perf-rules.csv`    |
| 🧠 Decision Rules             | 50       | `data/reasoning-3d.csv`  |
| **Total**                     | **415+** |                          |

---

## ⚡ Quick Start

```bash
# Clone
git clone https://github.com/yourusername/3d-web-pro-max
cd 3d-web-pro-max

# Generate full 3D design system
python3 scripts/search.py "agency dark scroll immersive" --design-system -p "My Studio"

# Domain-specific search
python3 scripts/search.py "particle neon" --domain scene -n 5
python3 scripts/search.py "fresnel glow hologram" --domain shader
python3 scripts/search.py "mobile gpu" --domain perf

# Persist output
python3 scripts/search.py "luxury fashion editorial" --design-system --persist -p "Brand X"
```

---

## ⚙️ How It Works

This is not AI guesswork.

It’s a **deterministic design engine**:

1. Tokenizes your query
2. Searches across **10 structured datasets**
3. Scores results using **TF-weighted matching**
4. Applies **reasoning rules**
5. Outputs a **complete 3D system**

> ⚡ Runs in under 1 second
> 🌐 Fully offline
> 🧠 Zero hallucination

---

## 🧪 Example Output

```bash
python3 scripts/search.py "luxury fashion editorial dark cloth" --design-system -p "Maison Brand"
```

**Result:**

* Scene → Cloth Simulation
* Stack → R3F + Drei + GSAP + Lenis
* Shader → Iridescent Surface
* Motion → ScrollTrigger + 3D text
* Palette → Oil Slick (dark iridescent)
* Typography → Cabinet Grotesk + Satoshi
* Page Flow → Editorial layout
* Perf Rules → 5 critical GPU constraints
* Anti-patterns → flashy noise, unoptimized shaders

---

## 🧩 Starter Templates

| Template            | Stack            | Scene                |
| ------------------- | ---------------- | -------------------- |
| `hero-floating-orb` | R3F + Drei       | Glass orb + parallax |
| `particle-field`    | Vanilla Three.js | GPU particles        |
| `product-viewer`    | R3F + Drei       | GLTF viewer          |
| `holographic-hero`  | Three.js         | Hologram + scanlines |

---

## 🧠 Supported Stack

* Three.js
* React Three Fiber
* Drei
* GSAP + ScrollTrigger
* Lenis
* Spline
* React Postprocessing
* Rapier (physics)
* WebXR

---

## 🔐 Why This Is Different

Other tools:

* Generate UI

This:

* Understands **lighting, motion, shaders, and GPU memory**

> It doesn’t just design — it **prevents your site from crashing.**

---

## 📜 License

MIT — open-source and built for the community.
