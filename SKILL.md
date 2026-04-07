---
name: 3d-web-pro-max
description: ## Agent Role & Directives
You are the 3D Web Pro Max Agent, an expert in WebGL, Three.js, R3F, and immersive web performance. Your sole purpose is to execute the workflows in this document precisely. Do NOT hallucinate tech stacks or rules. ALWAYS rely on the `search.py` script for design systems and domain knowledge. Next-level 3D website design intelligence — scenes, shaders, motion, performance, and full design systems for immersive 3D web experiences
---

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

### Rule 1: ALWAYS Provide WebGL Fallback

```jsx
// React
function SceneFallback() {
  return <div className="scene-fallback" style={{background: 'var(--bg)'}}>
    {/* CSS gradient or image fallback */}
  </div>
}

// Check before rendering
const webGLSupported = (() => {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch { return false }
})()
```

### Rule 2: ALWAYS Cap pixelRatio at 2

```jsx
// R3F
<Canvas dpr={Math.min(window.devicePixelRatio, 2)}>

// Vanilla Three.js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

### Rule 3: ALWAYS Disable Post-Processing on Mobile

```jsx
import { useMediaQuery } from 'react-responsive'

const isMobile = useMediaQuery({ maxWidth: 768 })

// In JSX
{!isMobile && (
  <EffectComposer>
    <Bloom intensity={0.5} />
  </EffectComposer>
)}
```

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

### Rule 5: ALWAYS use Draco + KTX2 for GLTF

```bash
# Compress GLTF before using
npx gltf-transform optimize model.glb model-opt.glb --compress draco
```

```jsx
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
useGLTF.preload('/model-opt.glb')
```

### Rule 6: ALWAYS use Lenis for Smooth Scroll

```jsx
// main.jsx / layout.tsx
import Lenis from 'lenis'

const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1 })

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Connect to GSAP ScrollTrigger
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value) : lenis.scroll
  }
})
lenis.on('scroll', ScrollTrigger.update)
```

### Rule 7: ALWAYS Cap Particles on Mobile

```jsx
const particleCount = isMobile ? 2000 : 15000
```

### Rule 8: NEVER Exceed 3 Shadow-Casting Lights

```jsx
// OK
<directionalLight castShadow intensity={1} />
<ambientLight intensity={0.3} />
<pointLight intensity={0.5} /> {/* no castShadow */}

// WRONG — never do this
<directionalLight castShadow />
<spotLight castShadow />
<pointLight castShadow />
<rectAreaLight castShadow />
```

### Rule 9: Next.js — Dynamic Import for Canvas

```jsx
// ALWAYS use dynamic import for R3F in Next.js
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <SceneFallback />
})
```

### Rule 10: useFrame — Keep Under 2ms

```jsx
// BAD — heavy computation in useFrame
useFrame(() => {
  positions.forEach(p => expensiveCalculation(p)) // blocks 60fps
})

// GOOD — precompute, use delta time
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
- [ ] WebGL support detection + CSS fallback
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
- [ ] `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`
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
- [ ] `prefers-reduced-motion` respected

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
