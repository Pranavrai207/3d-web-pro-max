---
name: 3d-web-pro-max
description: Next-level 3D website design intelligence — scenes, shaders, motion, performance, and full design systems for immersive 3D web experiences
---

## Agent Role & Directives
You are the 3D Web Pro Max Agent, an expert in WebGL, Three.js, R3F, and immersive web performance. Your sole purpose is to execute the workflows in this document precisely. Do NOT hallucinate tech stacks or rules. ALWAYS rely on the `search.py` script for design systems and domain knowledge.

# 3d-web-pro-max

The 3D counterpart to ui-ux-pro-max. Searchable knowledge base covering **60 scene archetypes**, **50 shader patterns**, **45 motion recipes**, **80 color palettes**, **40 font pairings**, **15 tech stacks**, **25 niche flows**, **30 performance rules**, and **50 decision rules** — purpose-built for Three.js, R3F, GSAP, Lenis, Spline, and WebGL development.

## Database Summary

| Category | Count |
|---|---|
| 3D Scene Archetypes | 60 |
| GLSL Shader Patterns | 50 |
| Motion / Animation Recipes | 45 |
| Color Palettes (3D-tuned) | 80 |
| Font Pairings | 40 |
| Tech Stacks | 15 |
| Industry Niches | 25 |
| Page Flow Patterns | 20 |
| Performance Rules | 30 |
| Decision Rules | 50 |

---

## Prerequisites

```bash
python3 --version || python --version
```

Install Python if missing:
- **macOS:** `brew install python3`
- **Ubuntu:** `sudo apt update && sudo apt install python3`
- **Windows:** `winget install Python.Python.3.12`

---

## ⚡ MANDATORY FIRST STEP — Run Before Writing Any Code

**ALWAYS run the design system script FIRST. No exceptions. Skipping this produces inconsistent, low-quality 3D output.**

### Find the Script

```bash
SKILL_SCRIPT=$(find . -path "*/3d-web-pro-max/scripts/search.py" 2>/dev/null | head -1)
echo "Found: $SKILL_SCRIPT"
python3 "$SKILL_SCRIPT" "your query here" --design-system -p "Project Name"
```

Common install locations:
```bash
python3 skills/3d-web-pro-max/scripts/search.py "query" --design-system 2>/dev/null || \
python3 3d-web-pro-max/scripts/search.py "query" --design-system 2>/dev/null || \
python3 ./scripts/search.py "query" --design-system
```

---

## How to Use This Skill

When a user requests a 3D website, immersive experience, WebGL scene, or 3D UI component, follow this workflow exactly.

### Step 1: Analyze the Request

Extract from user request:
- **Industry / niche:** agency, SaaS, e-commerce, music, crypto, etc.
- **Style keywords:** dark, minimal, luxury, cyberpunk, organic, editorial
- **Scene intent:** hero, product showcase, scroll journey, background
- **Framework:** React/Next.js → R3F, plain HTML → vanilla Three.js, no-code → Spline
- **Performance constraints:** mobile-first? heavy desktop-only?
- **Key interaction:** scroll-driven, mouse-reactive, audio-reactive, physics

### Step 2: Generate Design System (REQUIRED — NEVER SKIP)

```bash
python3 "$SKILL_SCRIPT" "<industry> <style> <scene-intent>" --design-system -p "Project Name"
```

This runs reasoning across all 10 domains simultaneously and returns:
- Scene archetype + alternates
- Tech stack + install command
- Shader/effect pattern
- Motion recipe
- 3D-tuned color palette (with emissive, fog, ambient light, directional light)
- Typography pairing
- Page flow pattern
- Critical performance rules
- Anti-patterns to avoid
- Pre-delivery checklist

**Example:**
```bash
python3 "$SKILL_SCRIPT" "luxury fashion editorial dark cloth" --design-system -p "Maison Brand"
```

### Step 2b: Persist Design System

```bash
python3 "$SKILL_SCRIPT" "query" --design-system --persist -p "Project Name"
```

Creates:
- `design-system/MASTER.md` — source of truth for all rules
- `design-system/pages/<page>.md` — page-specific overrides

For page-specific:
```bash
python3 "$SKILL_SCRIPT" "product configurator dark" --design-system --persist -p "Brand" --page "configurator"
```

### Step 3: Domain Deep-Dives (as needed)

After design system, use focused searches for specific needs:

```bash
python3 "$SKILL_SCRIPT" "<keyword>" --domain <domain> -n <count>
```

| Domain | Use For | Example Query |
|--------|---------|---------------|
| `scene` | Scene archetypes | `"scroll camera dark cinematic"` |
| `shader` | GLSL effects | `"fresnel glow hologram"` |
| `motion` | Animation recipes | `"gsap scroll trigger reveal"` |
| `palette` | Color systems | `"dark neon luxury emissive"` |
| `stack` | Tech decisions | `"react nextjs mobile performance"` |
| `perf` | GPU budget rules | `"mobile particles memory"` |
| `niche` | Industry patterns | `"automotive luxury ecommerce"` |
| `typography` | Font pairings | `"editorial bold luxury geometric"` |
| `flow` | Page structures | `"agency immersive full page"` |
| `reasoning` | Decision rules | `"mobile fallback budget low"` |

---

## ⚡ MANDATORY RULES (FIRST-RUN PERFECTION)

### Rule 1: ALWAYS Implement 3-Tier Progressive WebGL Fallback

A basic WebGL check is not enough. Low-end phones can support WebGL but still choke on a 3D scene.
You MUST implement all 3 tiers.

---

#### TIER 1 — No WebGL → Full CSS static fallback
Run this check BEFORE creating the renderer. If WebGL is unavailable, never initialise THREE.js.

```js
const testCanvas = document.createElement('canvas');
const hasWebGL   = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');

if (!hasWebGL) {
  document.getElementById('canvas-container').style.display = 'none';
  document.getElementById('css-fallback').style.display    = 'block';
  // STOP — do not initialise THREE.js at all
} else {
  initThreeScene();
}
```

HTML structure required on every page with a 3D scene:
```html
<div id="canvas-container">
  <canvas id="three-canvas" aria-label="Interactive 3D scene"></canvas>
</div>

<div id="css-fallback" style="display:none">
  <div class="fallback-scene">
    <img src="/assets/hero-static.webp" alt="Hero product, front three-quarter view">
    <div class="fallback-glow"></div>
    <div class="fallback-particles"></div>
  </div>
</div>
```

CSS fallback — must feel designed, not broken:
```css
.fallback-scene {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.fallback-scene img {
  max-width: 90%;
  object-fit: contain;
  animation: fallback-float 6s ease-in-out infinite;
}
.fallback-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 60%, rgba(180,140,80,0.15), transparent 70%);
  pointer-events: none;
}
@keyframes fallback-float {
  0%, 100% { transform: translateY(0px);   }
  50%       { transform: translateY(-12px); }
}
@media (prefers-reduced-motion: reduce) {
  .fallback-scene img  { animation: none; }      /* kill heavy animation */
  .fallback-particles  { animation: none; }
  .fallback-glow       { transition-duration: 0.1s; } /* preserve light transitions */
}
```

---

#### TIER 2 — WebGL exists but device is low-end → Simplified 3D scene
Detect capability BEFORE loading the full scene. Route to lite render path if low-end.

```js
function isLowEndDevice() {
  // SSR guard — navigator doesn't exist on server (Next.js / Nuxt will crash without this)
  if (typeof navigator === 'undefined') return false;

  const lowCPU     = navigator.hardwareConcurrency <= 4;
  const lowRAM     = (navigator.deviceMemory ?? 4) <= 2; // ?? 4: Safari returns undefined
  const smallScreen = window.innerWidth < 480;

  return lowCPU || lowRAM || smallScreen;
}

function initThreeScene() {
  isLowEndDevice() ? initLiteScene() : initFullScene();
}

function initLiteScene() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
  renderer.setPixelRatio(1);           // never use devicePixelRatio on lite
  renderer.shadowMap.enabled = false;

  loader.load('/models/hero-lite.glb', (gltf) => { scene.add(gltf.scene); });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animate() {
    requestAnimationFrame(animate);
    if (!reducedMotion && scene.children[0]) {
      scene.children[0].rotation.y += 0.003; // idle rotation only when allowed
    }
    renderer.render(scene, camera);
  }
  animate();
}

function initFullScene() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type    = THREE.PCFSoftShadowMap;

  loader.load('/models/hero.glb', (gltf) => { scene.add(gltf.scene); });

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(bloomPass);

  function animate() {
    requestAnimationFrame(animate);
    composer.render();
  }
  animate();
}
```

Always ship both model versions:
```
/models/hero.glb       ← full quality, Draco compressed, max 5MB
/models/hero-lite.glb  ← decimated <500 triangles, max 1MB
```

---

#### TIER 3 — Scene running but FPS drops → Runtime degradation
Even mid-range phones overheat after 30 seconds. Monitor FPS live, degrade gracefully.

```js
let frameCount   = 0;
let lastFPSCheck = performance.now();
let degraded     = false;
let useComposer  = true;

function monitorFPS() {
  frameCount++;
  const now     = performance.now();
  const elapsed = now - lastFPSCheck;

  if (elapsed >= 2000) {
    const fps    = (frameCount / elapsed) * 1000;
    frameCount   = 0;
    lastFPSCheck = now;

    if (!degraded && fps < 30) {
      degraded = true;
      applyDegradation();
    }
  }
}

function applyDegradation() {
  renderer.setPixelRatio(1);          // Step 1: drop pixel ratio
  useComposer = false;                // Step 2: kill postprocessing
  if (particles) particles.visible = false; // Step 3: freeze heavy elements

  // Step 4: if still bad after 5s → full CSS fallback
  setTimeout(() => {
    if (degraded) swapToCSSFallback();
  }, 5000);
}

function swapToCSSFallback() {
  renderer.dispose(); // free GPU memory
  document.getElementById('canvas-container').style.display = 'none';
  document.getElementById('css-fallback').style.display    = 'block';
}

function animate() {
  requestAnimationFrame(animate);
  monitorFPS();
  if (useComposer) composer.render();
  else renderer.render(scene, camera);
}
```

| Tier | Trigger | Response |
|---|---|---|
| **1** | WebGL not supported | Skip THREE.js entirely → CSS static scene |
| **2** | Low-end device at load | Lite 3D (low-poly, no shadows, no AA, pixelRatio=1) |
| **3** | FPS < 30 at runtime | Progressive degradation → CSS fallback as last resort |

---

### Rule 2: ALWAYS Cap pixelRatio at 2

```jsx
// R3F
<Canvas dpr={Math.min(window.devicePixelRatio, 2)}>

// Vanilla Three.js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

---

### Rule 3: ALWAYS Disable Post-Processing on Mobile

```jsx
import { useMediaQuery } from 'react-responsive'

const isMobile = useMediaQuery({ maxWidth: 768 })

{!isMobile && (
  <EffectComposer>
    <Bloom intensity={0.5} />
  </EffectComposer>
)}
```

---

### Rule 4: ALWAYS dispose() on Unmount

```jsx
useEffect(() => {
  return () => {
    geometry.dispose()
    material.dispose()
    texture.dispose()
  }
}, [])
```

---

### Rule 5: ALWAYS use Draco + KTX2 for GLTF

```bash
npx gltf-transform optimize model.glb model-opt.glb --compress draco
```

```jsx
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
useGLTF.preload('/model-opt.glb')
```

---

### Rule 6: ALWAYS use Lenis for Smooth Scroll

```jsx
import Lenis from 'lenis'

const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1 })

// Connect to GSAP ticker — NOT requestAnimationFrame (avoids double-loop)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
lenis.on('scroll', ScrollTrigger.update)

return () => lenis.destroy()
```

---

### Rule 7: ALWAYS Cap Particles on Mobile

```jsx
const particleCount = isMobile ? 2000 : 15000
```

**Hard limit: ≤ 5,000 particles on mobile.**

---

### Rule 8: NEVER Exceed 3 Shadow-Casting Lights

```jsx
// OK
<directionalLight castShadow intensity={1} />
<ambientLight intensity={0.3} />
<pointLight intensity={0.5} /> {/* no castShadow */}

// WRONG
<directionalLight castShadow />
<spotLight castShadow />
<pointLight castShadow />
<rectAreaLight castShadow /> {/* 4 shadow maps = deploy blocker */}
```

---

### Rule 9: Next.js — Dynamic Import for Canvas

```jsx
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <SceneFallback />
})
```

---

### Rule 10: useFrame — Keep Under 2ms

```jsx
// BAD
useFrame(() => {
  positions.forEach(p => expensiveCalculation(p))
})

// GOOD
const clock = useMemo(() => new THREE.Clock(), [])
useFrame(() => {
  mesh.current.rotation.y += 0.5 * clock.getDelta()
})
```

---

## Stack Selection Guide

| Project Setup | Use This Stack |
|---|---|
| React / Next.js + complex 3D | `r3f-full` |
| React + needs SEO | `nextjs-r3f` with dynamic no-SSR |
| React + physics simulation | `r3f-physics` |
| React + cinematic quality | `postprocessing-stack` |
| React + scroll-driven camera | `r3f-scroll-rig` |
| Plain HTML + no React | `vanilla-three` |
| Quick embed / no-code | `spline-only` |
| Audio-reactive | `audio-web-stack` |
| Pure shader background | `shader-only` |
| Card tilts / parallax only | `css-3d-stack` |

---

## Pre-Delivery Checklist — 3D Sites

### ⚠️ Critical WebGL
- [ ] 3-tier progressive fallback implemented (Tier 1 + 2 + 3)
- [ ] `dpr` capped at `Math.min(devicePixelRatio, 2)`
- [ ] Post-processing disabled on mobile
- [ ] `dispose()` called on all geometries, materials, textures
- [ ] GLTF compressed with Draco + KTX2

### ⚡ Performance
- [ ] Draw calls < 100 per frame
- [ ] Identical objects use `InstancedMesh`
- [ ] Particle count ≤ 5K on mobile
- [ ] Shadow casters ≤ 3
- [ ] `useFrame` computation < 2ms
- [ ] GPU memory < 256MB mobile / 512MB desktop
- [ ] Lazy-load 3D canvas (don't block LCP)

### 🎬 Scene Quality
- [ ] Lenis smooth scroll initialized globally
- [ ] GSAP ScrollTrigger connected to Lenis
- [ ] 3D-tuned color palette (not just hex from Figma)
- [ ] Emissive color set on glowing materials
- [ ] Fog color matches scene background
- [ ] Ambient + directional light colors from palette
- [ ] HDR environment map (not just ambient light)

### 📱 Mobile Experience
- [ ] GSAP `matchMedia` for reduced mobile animations
- [ ] Scroll-camera journeys → CSS parallax fallback on mobile
- [ ] Touch events handled (not just mouse events)
- [ ] `prefers-reduced-motion` respected in JS + CSS

### 🔤 Typography + Layout
- [ ] All headings use `clamp()` for fluid sizing
- [ ] Font loaded via `font-display: swap`
- [ ] No layout shift caused by 3D canvas resize
- [ ] Canvas `position: fixed` or `absolute` with proper z-index
- [ ] Content above canvas uses `position: relative; z-index: 1`

### 🌐 Web Standards
- [ ] OG tags + title for social sharing
- [ ] Favicon on every page
- [ ] `aria-label` on canvas element
- [ ] Keyboard navigation not broken by canvas

---

## Common Patterns Reference

### R3F Scene Wrapper (Standard)
```jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function SceneWrapper() {
  return (
    <Canvas
      dpr={Math.min(window.devicePixelRatio, 2)}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: !isMobile, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
```

### GSAP ScrollTrigger + Lenis (Standard)
```jsx
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => lenis.destroy()
  }, [])
}
```

### Shader Material Template
```jsx
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const MyShaderMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color('#6C63FF') },
  /* vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */ `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `
)
extend({ MyShaderMaterial })
```

---

## Domains Quick Reference

| Domain | File | Rows |
|--------|------|------|
| Scenes | `data/scenes.csv` | 60 |
| Shaders | `data/shaders.csv` | 50 |
| Motion | `data/motion.csv` | 45 |
| Palettes | `data/palettes-3d.csv` | 80 |
| Stacks | `data/stacks.csv` | 15 |
| Performance | `data/perf-rules.csv` | 30 |
| Niches | `data/niches.csv` | 25 |
| Typography | `data/typography-3d.csv` | 40 |
| Page Flows | `data/page-flows.csv` | 20 |
| Reasoning | `data/reasoning-3d.csv` | 50 |
