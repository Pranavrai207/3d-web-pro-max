# AGENT_RULES.md — Non-negotiable rules for every site build
# Read this FIRST. Every rule here is a deploy-blocker if missed.
# This file is intentionally SHORT so any model can hold it in context.

---

## STOP. Before writing a single line of HTML/CSS/JS, confirm:

1. Did you run `python3 scripts/search.py "<query>" --design-system -p "<ProjectName>"`?
   → If no: STOP. Run it first. The design system output is your contract.
   → If yes: paste the OUTPUT at the top of your working context.

---

## THE 10 RULES THAT KILL PROJECTS

### R1 — VIEWPORT (CRITICAL)
Every HTML page MUST have:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Missing this = site unusable on every phone.

### R2 — FLUID FONTS (CRITICAL)
Never hardcode heading font sizes. Always:
```css
h1 { font-size: clamp(2rem, 8vw, 6rem); }
h2 { font-size: clamp(1.6rem, 5vw, 4rem); }
h3 { font-size: clamp(1.3rem, 3vw, 2.5rem); }
```
`font-size: 4rem` on an h1 = broken on mobile. No exceptions.

### R3 — NO INLINE LAYOUT STYLES (CRITICAL)
`style="display:flex"` or `style="font-size:3rem"` CANNOT be overridden by media queries.
Only allowed inline: `text-align`, `margin-bottom`, `max-width + margin:auto`, `opacity`.

### R4 — HAMBURGER JS (CRITICAL)
If there's a hamburger button, it MUST toggle the nav AND update `aria-expanded`.
```js
const burger = document.getElementById('hamburger');
const nav = document.getElementById('nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}
```
No hamburger JS = nav invisible on mobile.

### R5 — MOBILE GRID COLLAPSE (CRITICAL)
Every grid/flex layout MUST collapse to 1 column on mobile:
```css
.cards { display: grid; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 768px) { .cards { grid-template-columns: 1fr; } }
```

### R6 — NULL-SAFE DOM QUERIES (CRITICAL)
NEVER: `document.querySelector('.hero').style.opacity = 1`
ALWAYS: `const el = document.querySelector('.hero'); if (el) el.style.opacity = 1`
Single-page JS runs on ALL pages. Elements won't exist on every page.

### R7 — VERCEL SPA ROUTING (CRITICAL — React/Vue/SPA only)
If your nav links are `/models`, `/tech`, etc. (no .html), you MUST have vercel.json:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
Without this: every direct URL = 404.

### R8 — IMAGE ALT TEXT (CRITICAL)
Every `<img>` needs a descriptive `alt`. Not `alt=""` unless purely decorative.
```html
<img src="hero.jpg" alt="Lamborghini Revuelto in yellow, front three-quarter view">
```

### R9 — PASSIVE SCROLL LISTENERS (WARNING)
```js
// WRONG:
window.addEventListener('scroll', handler)
// RIGHT:
window.addEventListener('scroll', handler, { passive: true })
```
Missing passive = browser warns + jank on mobile.

### R10 — CONSISTENT NAV + FOOTER ACROSS ALL PAGES (CRITICAL)
Copy-paste the EXACT SAME nav and footer HTML to every .html file.
Only change `aria-current="page"` for the active link.
Inner pages with a stripped footer = unprofessional and broken UX.

---

## BEFORE YOU HAND OFF — RUN THIS

```bash
python3 validate.py --dir ./dist
# OR if dist doesn't exist:
python3 validate.py *.html
```

Exit code 0 = safe to deploy.
Exit code 1 = warnings, review first.
Exit code 2 = CRITICAL failures. FIX BEFORE DEPLOY.

---

## GEMINI FLASH SPECIFIC NOTES

When using Gemini Flash (not Claude Sonnet/Opus), the model is more likely to:
- Skip `clamp()` and use hardcoded rem/px
- Generate hamburger HTML without JS
- Miss `aria-expanded` on toggles
- Omit `{ passive: true }` on scroll listeners
- Forget OG meta tags on inner pages

Run `validate.py` after EVERY generation pass, not just the final one.

---

## QUICK CHEAT SHEET

| What you're building | Mandatory checks |
|---|---|
| Any HTML page | R1, R2, R3, R8, R10 |
| Page with nav | R4, R5, R10 |
| Page with JS | R6, R9 |
| React/Vue/SPA on Vercel | R7 |
| Animations present | Add `prefers-reduced-motion` |
| Forms present | Per-field validation + loading state |
