#!/usr/bin/env python3
"""
3D Web Pro Max — Search Engine
Searchable knowledge base for 3D website design and development.
Usage: python3 search.py "query" [options]
"""

import csv
import json
import math
import os
import sys
import argparse
from pathlib import Path
from typing import Optional

# ─── Paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent.resolve()
DATA_DIR = SCRIPT_DIR.parent / "data"

FILES = {
    "scene":      DATA_DIR / "scenes.csv",
    "shader":     DATA_DIR / "shaders.csv",
    "motion":     DATA_DIR / "motion.csv",
    "palette":    DATA_DIR / "palettes-3d.csv",
    "stack":      DATA_DIR / "stacks.csv",
    "perf":       DATA_DIR / "perf-rules.csv",
    "niche":      DATA_DIR / "niches.csv",
    "reasoning":  DATA_DIR / "reasoning-3d.csv",
    "typography": DATA_DIR / "typography-3d.csv",
    "flow":       DATA_DIR / "page-flows.csv",
}

# ─── Helpers ──────────────────────────────────────────────────────────────────

def load_csv(path: Path) -> list[dict]:
    if not path.exists():
        print(f"[WARN] CSV not found: {path}", file=sys.stderr)
        return []
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def score_row(row: dict, query_tokens: list[str]) -> float:
    """Score a CSV row against query tokens using TF-style matching."""
    text = " ".join(str(v) for v in row.values()).lower()
    score = 0.0
    for token in query_tokens:
        count = text.count(token)
        if count > 0:
            score += 1.0 + math.log(count + 1)
    return score


def search_domain(domain: str, query: str, n: int = 5) -> list[dict]:
    path = FILES.get(domain)
    if path is None:
        return []
    rows = load_csv(path)
    tokens = query.lower().split()
    scored = [(score_row(r, tokens), r) for r in rows]
    scored.sort(key=lambda x: x[0], reverse=True)
    return [r for score, r in scored if score > 0][:n]


def search_all(query: str, n: int = 3) -> dict[str, list[dict]]:
    return {domain: search_domain(domain, query, n) for domain in FILES}

# ─── Design System Generator ─────────────────────────────────────────────────

def generate_design_system(query: str, project_name: str = "Project", page: Optional[str] = None) -> dict:
    tokens = query.lower().split()

    scenes     = search_domain("scene",      query, 3)
    shaders    = search_domain("shader",     query, 3)
    motions    = search_domain("motion",     query, 4)
    palettes   = search_domain("palette",    query, 2)
    stacks     = search_domain("stack",      query, 2)
    typo       = search_domain("typography", query, 2)
    niches     = search_domain("niche",      query, 2)
    flows      = search_domain("flow",       query, 1)
    perf_rules = search_domain("perf",       query, 5)
    reasoning  = search_domain("reasoning",  query, 5)

    # Primary picks
    primary_scene   = scenes[0]   if scenes   else {}
    primary_shader  = shaders[0]  if shaders  else {}
    primary_motion  = motions[0]  if motions  else {}
    primary_palette = palettes[0] if palettes else {}
    primary_stack   = stacks[0]   if stacks   else {}
    primary_typo    = typo[0]     if typo     else {}
    primary_niche   = niches[0]   if niches   else {}
    primary_flow    = flows[0]    if flows    else {}

    ds = {
        "project": project_name,
        "query":   query,
        "page":    page,

        "scene": {
            "primary":   primary_scene.get("name", "—"),
            "id":        primary_scene.get("scene_id", "—"),
            "stack":     primary_scene.get("primary_stack", "—"),
            "perf_cost": primary_scene.get("perf_cost", "—"),
            "mood":      primary_scene.get("mood", "—"),
            "alternates": [s.get("name") for s in scenes[1:]],
        },

        "stack": {
            "primary":     primary_stack.get("name", "—"),
            "core_libs":   primary_stack.get("core_libs", "—"),
            "install_cmd": primary_stack.get("install_cmd", "—"),
            "pros":        primary_stack.get("pros", "—"),
            "mobile":      primary_stack.get("mobile_support", "—"),
        },

        "shader": {
            "primary":   primary_shader.get("name", "—"),
            "type":      primary_shader.get("type", "—"),
            "technique": primary_shader.get("technique", "—"),
            "alternates": [s.get("name") for s in shaders[1:]],
        },

        "motion": {
            "primary":    primary_motion.get("name", "—"),
            "library":    primary_motion.get("library", "—"),
            "ease":       primary_motion.get("ease", "—"),
            "additional": [m.get("name") for m in motions[1:]],
        },

        "palette": {
            "name":              primary_palette.get("name", "—"),
            "background":        primary_palette.get("background", "—"),
            "primary_color":     primary_palette.get("primary", "—"),
            "secondary_color":   primary_palette.get("secondary", "—"),
            "accent":            primary_palette.get("accent", "—"),
            "emissive":          primary_palette.get("emissive", "—"),
            "fog_color":         primary_palette.get("fog_color", "—"),
            "ambient_light":     primary_palette.get("ambient_light", "—"),
            "directional_light": primary_palette.get("directional_light", "—"),
        },

        "typography": {
            "heading_font": primary_typo.get("heading_font", "—"),
            "body_font":    primary_typo.get("body_font", "—"),
            "style":        primary_typo.get("style", "—"),
            "google_url":   primary_typo.get("google_fonts_url", "—"),
        },

        "page_flow": {
            "name":             primary_flow.get("name", "—"),
            "sections_order":   primary_flow.get("sections_order", "—"),
            "3d_density":       primary_flow.get("3d_density", "—"),
            "must_have":        primary_flow.get("must_have", "—"),
        },

        "niche": {
            "industry":            primary_niche.get("industry", "—"),
            "recommended_scenes":  primary_niche.get("recommended_scenes", "—"),
            "must_have_features":  primary_niche.get("must_have_features", "—"),
        },

        "performance_rules": [
            {
                "rule":     r.get("rule", "—"),
                "severity": r.get("severity", "—"),
                "how":      r.get("how_to_fix", "—"),
            }
            for r in perf_rules
        ],

        "reasoning_applied": [
            r.get("result", "—") for r in reasoning
        ],

        "anti_patterns": [
            primary_scene.get("anti_patterns", ""),
            primary_niche.get("avoid", ""),
            primary_flow.get("avoid", ""),
        ],

        "checklist": [
            "WebGL fallback for non-WebGL devices",
            "Mobile particle count capped at 5K",
            "Draco + KTX2 compression on all GLTF/textures",
            "Post-processing disabled on mobile",
            "Shadow casters ≤ 3",
            "pixelRatio capped at 2",
            "dispose() called on unmount (geometry/material/texture)",
            "Lenis smooth scroll initialized globally",
            "useFrame computation < 2ms",
            "GSAP matchMedia for mobile animation differences",
        ],
    }

    return ds


def print_design_system(ds: dict):
    sep = "═" * 70

    print(f"\n{sep}")
    print(f"  3D WEB PRO MAX — Design System")
    print(f"  Project: {ds['project']}")
    if ds.get("page"):
        print(f"  Page: {ds['page']}")
    print(f"  Query: \"{ds['query']}\"")
    print(sep)

    print("\n🎬  SCENE")
    print(f"  Primary:    {ds['scene']['primary']} ({ds['scene']['id']})")
    print(f"  Stack:      {ds['scene']['stack']}")
    print(f"  Perf Cost:  {ds['scene']['perf_cost']}")
    print(f"  Mood:       {ds['scene']['mood']}")
    if ds['scene']['alternates']:
        print(f"  Alternates: {', '.join(filter(None, ds['scene']['alternates']))}")

    print("\n⚙️   TECH STACK")
    print(f"  Name:       {ds['stack']['primary']}")
    print(f"  Core Libs:  {ds['stack']['core_libs']}")
    print(f"  Mobile:     {ds['stack']['mobile']}")
    print(f"  Install:    {ds['stack']['install_cmd']}")

    print("\n✨  SHADER / EFFECT")
    print(f"  Primary:    {ds['shader']['primary']} ({ds['shader']['type']})")
    print(f"  Technique:  {ds['shader']['technique']}")
    if ds['shader']['alternates']:
        print(f"  Alternates: {', '.join(filter(None, ds['shader']['alternates']))}")

    print("\n🎭  MOTION / ANIMATION")
    print(f"  Primary:    {ds['motion']['primary']}")
    print(f"  Library:    {ds['motion']['library']}")
    print(f"  Ease:       {ds['motion']['ease']}")
    if ds['motion']['additional']:
        print(f"  Additional: {', '.join(filter(None, ds['motion']['additional']))}")

    print("\n🎨  COLOR PALETTE — 3D Tuned")
    p = ds['palette']
    print(f"  Name:              {p['name']}")
    print(f"  Background:        {p['background']}")
    print(f"  Primary Color:     {p['primary_color']}")
    print(f"  Accent:            {p['accent']}")
    print(f"  Emissive:          {p['emissive']}")
    print(f"  Fog Color:         {p['fog_color']}")
    print(f"  Ambient Light:     {p['ambient_light']}")
    print(f"  Directional Light: {p['directional_light']}")

    print("\n🔤  TYPOGRAPHY")
    t = ds['typography']
    print(f"  Heading: {t['heading_font']}")
    print(f"  Body:    {t['body_font']}")
    print(f"  Style:   {t['style']}")
    print(f"  Source:  {t['google_url']}")

    print("\n📋  PAGE FLOW")
    f = ds['page_flow']
    print(f"  Pattern:    {f['name']}")
    print(f"  3D Density: {f['3d_density']}")
    print(f"  Sections:   {f['sections_order']}")
    print(f"  Must Have:  {f['must_have']}")

    print("\n⚡  PERFORMANCE RULES (Critical)")
    for rule in ds['performance_rules']:
        sev = rule['severity'].upper()
        print(f"  [{sev}] {rule['rule']}")
        print(f"         → {rule['how']}")

    print("\n❌  ANTI-PATTERNS TO AVOID")
    for ap in ds['anti_patterns']:
        if ap and ap.strip():
            print(f"  • {ap}")

    print("\n✅  PRE-DELIVERY CHECKLIST")
    for item in ds['checklist']:
        print(f"  [ ] {item}")

    print(f"\n{sep}\n")


# ─── Domain Search Printer ────────────────────────────────────────────────────

def print_results(domain: str, results: list[dict], query: str):
    print(f"\n{'─'*60}")
    print(f"  3D Web Pro Max | Domain: {domain.upper()} | Query: \"{query}\"")
    print(f"{'─'*60}")
    if not results:
        print("  No results found.")
        return
    for i, row in enumerate(results, 1):
        print(f"\n  [{i}] ", end="")
        # Print a smart summary based on domain
        if domain == "scene":
            print(f"{row.get('name','?')} ({row.get('scene_id','?')})")
            print(f"      Stack:     {row.get('primary_stack','—')}")
            print(f"      Use Case:  {row.get('use_case','—')}")
            print(f"      Mood:      {row.get('mood','—')}")
            print(f"      Perf Cost: {row.get('perf_cost','—')}")
        elif domain == "shader":
            print(f"{row.get('name','?')} ({row.get('shader_id','?')})")
            print(f"      Type:      {row.get('type','—')}")
            print(f"      Technique: {row.get('technique','—')}")
            print(f"      Hint:      {row.get('glsl_snippet_hint','—')}")
        elif domain == "motion":
            print(f"{row.get('name','?')} ({row.get('motion_id','?')})")
            print(f"      Library:   {row.get('library','—')}")
            print(f"      Ease:      {row.get('ease','—')}")
            print(f"      Use Case:  {row.get('use_case','—')}")
        elif domain == "palette":
            print(f"{row.get('name','?')} ({row.get('palette_id','?')})")
            print(f"      BG:        {row.get('background','—')}")
            print(f"      Primary:   {row.get('primary','—')}")
            print(f"      Accent:    {row.get('accent','—')}")
            print(f"      Emissive:  {row.get('emissive','—')}")
        elif domain == "stack":
            print(f"{row.get('name','?')} ({row.get('stack_id','?')})")
            print(f"      Core:      {row.get('core_libs','—')}")
            print(f"      Install:   {row.get('install_cmd','—')}")
            print(f"      Mobile:    {row.get('mobile_support','—')}")
        elif domain == "perf":
            print(f"{row.get('rule','?')}")
            print(f"      Category:  {row.get('category','—')}")
            print(f"      Severity:  {row.get('severity','—')}")
            print(f"      Fix:       {row.get('how_to_fix','—')}")
        elif domain == "niche":
            print(f"{row.get('industry','?')} — {row.get('sub_niche','?')}")
            print(f"      Scenes:    {row.get('recommended_scenes','—')}")
            print(f"      Stack:     {row.get('primary_stack','—')}")
            print(f"      Must Have: {row.get('must_have_features','—')}")
        elif domain == "typography":
            print(f"{row.get('pairing_id','?')}: {row.get('heading_font','?')} + {row.get('body_font','?')}")
            print(f"      Style:     {row.get('style','—')}")
            print(f"      Mood:      {row.get('mood','—')}")
            print(f"      Source:    {row.get('google_fonts_url','—')}")
        elif domain == "flow":
            print(f"{row.get('name','?')} ({row.get('flow_id','?')})")
            print(f"      Industry:  {row.get('industry','—')}")
            print(f"      Sections:  {row.get('sections_order','—')}")
            print(f"      3D Density:{row.get('3d_density','—')}")
        elif domain == "reasoning":
            print(f"Rule: {row.get('rule_id','?')}")
            print(f"      IF:        {row.get('condition','—')}")
            print(f"      THEN:      {row.get('result','—')}")
        else:
            for k, v in row.items():
                print(f"      {k}: {v}")
    print()


# ─── Persist Design System ────────────────────────────────────────────────────

def persist_design_system(ds: dict, page: Optional[str] = None):
    output_dir = Path("design-system")
    pages_dir  = output_dir / "pages"
    output_dir.mkdir(exist_ok=True)
    pages_dir.mkdir(exist_ok=True)

    master_path = output_dir / "MASTER.md"
    content = render_markdown(ds)

    if page:
        page_path = pages_dir / f"{page.lower().replace(' ','-')}.md"
        page_path.write_text(content, encoding="utf-8")
        print(f"[SAVED] Page override → {page_path}")
    else:
        master_path.write_text(content, encoding="utf-8")
        print(f"[SAVED] Master → {master_path}")


def render_markdown(ds: dict) -> str:
    lines = [
        f"# 3D Web Pro Max — Design System",
        f"**Project:** {ds['project']}",
        f"**Query:** {ds['query']}",
        "",
        "## 🎬 Scene",
        f"- **Primary:** {ds['scene']['primary']} (`{ds['scene']['id']}`)",
        f"- **Stack:** {ds['scene']['stack']}",
        f"- **Perf Cost:** {ds['scene']['perf_cost']}",
        f"- **Mood:** {ds['scene']['mood']}",
        f"- **Alternates:** {', '.join(filter(None, ds['scene']['alternates']))}",
        "",
        "## ⚙️ Tech Stack",
        f"- **Name:** {ds['stack']['primary']}",
        f"- **Core Libs:** {ds['stack']['core_libs']}",
        f"- **Install:** `{ds['stack']['install_cmd']}`",
        f"- **Mobile:** {ds['stack']['mobile']}",
        "",
        "## ✨ Shader / Effect",
        f"- **Primary:** {ds['shader']['primary']} ({ds['shader']['type']})",
        f"- **Technique:** {ds['shader']['technique']}",
        "",
        "## 🎭 Motion",
        f"- **Primary:** {ds['motion']['primary']}",
        f"- **Library:** {ds['motion']['library']}",
        f"- **Ease:** {ds['motion']['ease']}",
        "",
        "## 🎨 Color Palette",
        f"| Token | Value |",
        f"|-------|-------|",
        f"| Background | `{ds['palette']['background']}` |",
        f"| Primary | `{ds['palette']['primary_color']}` |",
        f"| Accent | `{ds['palette']['accent']}` |",
        f"| Emissive | `{ds['palette']['emissive']}` |",
        f"| Fog | `{ds['palette']['fog_color']}` |",
        f"| Ambient Light | `{ds['palette']['ambient_light']}` |",
        f"| Directional Light | `{ds['palette']['directional_light']}` |",
        "",
        "## 🔤 Typography",
        f"- **Heading:** {ds['typography']['heading_font']}",
        f"- **Body:** {ds['typography']['body_font']}",
        f"- **Style:** {ds['typography']['style']}",
        "",
        "## 📋 Page Flow",
        f"- **Pattern:** {ds['page_flow']['name']}",
        f"- **3D Density:** {ds['page_flow']['3d_density']}",
        f"- **Sections:** {ds['page_flow']['sections_order']}",
        f"- **Must Have:** {ds['page_flow']['must_have']}",
        "",
        "## ⚡ Performance Rules",
    ]
    for rule in ds['performance_rules']:
        lines.append(f"- **[{rule['severity'].upper()}]** {rule['rule']}")
        lines.append(f"  - Fix: {rule['how']}")
    lines += [
        "",
        "## ❌ Anti-Patterns",
    ]
    for ap in ds['anti_patterns']:
        if ap and ap.strip():
            lines.append(f"- {ap}")
    lines += [
        "",
        "## ✅ Pre-Delivery Checklist",
    ]
    for item in ds['checklist']:
        lines.append(f"- [ ] {item}")

    return "\n".join(lines)


# ─── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="3D Web Pro Max — Knowledge Base Search Engine",
        formatter_class=argparse.RawTextHelpFormatter,
        epilog="""
Examples:
  python3 search.py "agency dark scroll journey" --design-system -p "Studio X"
  python3 search.py "particle neon crypto" --domain scene -n 5
  python3 search.py "mobile performance" --domain perf
  python3 search.py "luxury fashion" --design-system --persist -p "Brand"
  python3 search.py "gsap scroll" --domain motion -n 8
        """
    )

    parser.add_argument("query",              help="Search query (natural language or keywords)")
    parser.add_argument("--design-system",    action="store_true", help="Generate full design system")
    parser.add_argument("--domain",           choices=list(FILES.keys()), help="Search a specific domain")
    parser.add_argument("-n",                 type=int, default=5, help="Max results per domain (default 5)")
    parser.add_argument("-p", "--project",    default="Project", help="Project name for design system")
    parser.add_argument("--persist",          action="store_true", help="Save design system to design-system/")
    parser.add_argument("--page",             help="Page name for page-specific override")
    parser.add_argument("--json",             action="store_true", help="Output as JSON")

    args = parser.parse_args()

    if args.design_system:
        ds = generate_design_system(args.query, args.project, args.page)
        if args.json:
            print(json.dumps(ds, indent=2))
        else:
            print_design_system(ds)
        if args.persist:
            persist_design_system(ds, args.page)

    elif args.domain:
        results = search_domain(args.domain, args.query, args.n)
        if args.json:
            print(json.dumps(results, indent=2))
        else:
            print_results(args.domain, results, args.query)

    else:
        # Search all domains
        print(f"\n{'═'*60}")
        print(f"  3D Web Pro Max | Global Search: \"{args.query}\"")
        print(f"{'═'*60}")
        for domain in FILES:
            results = search_domain(domain, args.query, min(args.n, 2))
            if results:
                print_results(domain, results, args.query)


if __name__ == "__main__":
    main()
