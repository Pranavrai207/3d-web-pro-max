#!/usr/bin/env python3
"""
validate.py — Post-build HTML validator for ui-ux-pro-max projects.
Run this AFTER your agent generates code. Catches failures before deploy.

Usage:
  python3 validate.py index.html
  python3 validate.py *.html
  python3 validate.py --dir ./dist
  python3 validate.py --dir . --fix-report

Works with any model output (Gemini Flash, GPT-4, Claude, etc.)
"""

import sys
import os
import re
import json
import glob
from pathlib import Path

RED   = "\033[91m"
YEL   = "\033[93m"
GRN   = "\033[92m"
BLD   = "\033[1m"
RST   = "\033[0m"

# ─── Rule definitions ────────────────────────────────────────────────────────
# Each rule: (id, severity, description, check_fn)
# severity: "CRITICAL" | "WARNING" | "INFO"

def check_viewport(html, path):
    if 'name="viewport"' not in html:
        return "Missing <meta name='viewport'> — site will break on mobile"
    return None

def check_charset(html, path):
    if 'charset' not in html.lower():
        return "Missing <meta charset> — encoding issues possible"
    return None

def check_title(html, path):
    if not re.search(r'<title[^>]*>.+</title>', html, re.IGNORECASE):
        return "Missing or empty <title> tag"
    return None

def check_og_tags(html, path):
    missing = []
    for tag in ['og:title', 'og:description', 'og:type']:
        if tag not in html:
            missing.append(tag)
    if missing:
        return f"Missing OG meta tags: {', '.join(missing)}"
    return None

def check_favicon(html, path):
    if 'rel="shortcut icon"' not in html and 'rel="icon"' not in html:
        return "No favicon linked — tab shows blank icon"
    return None

def check_mobile_query(html, path):
    # Only check HTML files that have CSS in them or reference a stylesheet
    if '@media' not in html and '<style' in html:
        return "CSS present but no @media queries found — not responsive"
    return None

def check_hamburger_html(html, path):
    has_nav = bool(re.search(r'<nav', html, re.IGNORECASE))
    if not has_nav:
        return None
    has_hamburger = bool(re.search(r'hamburger|menu-toggle|nav-toggle|menuBtn', html, re.IGNORECASE))
    if not has_hamburger:
        return "Nav found but no hamburger button — nav will break on mobile"
    return None

def check_aria_expanded(html, path):
    has_hamburger = bool(re.search(r'hamburger|menu-toggle', html, re.IGNORECASE))
    if has_hamburger and 'aria-expanded' not in html:
        return "Hamburger found but no aria-expanded attribute — accessibility broken"
    return None

def check_clamp(html, path):
    # Look for hardcoded heading font sizes without clamp
    inline_fontsize = re.findall(r'style=["\'][^"\']*font-size\s*:\s*[\d]+(?:px|rem|em)', html)
    css_hardcoded = re.findall(r'h[1-6]\s*\{[^}]*font-size\s*:\s*(?!clamp)[\d]+(?:px|rem|em)', html)
    issues = inline_fontsize + css_hardcoded
    if issues:
        sample = issues[0][:60]
        return f"Hardcoded font-size without clamp() found: '{sample}...' — breaks on mobile"
    return None

def check_inline_layout_styles(html, path):
    # Detect layout-breaking inline styles
    bad_patterns = [
        r'style=["\'][^"\']*\bdisplay\s*:\s*flex',
        r'style=["\'][^"\']*\bdisplay\s*:\s*grid',
    ]
    for pat in bad_patterns:
        if re.search(pat, html):
            return "Inline style with display:flex/grid found — can't be overridden by media queries"
    return None

def check_img_alt(html, path):
    imgs = re.findall(r'<img[^>]+>', html, re.IGNORECASE)
    missing = [i for i in imgs if 'alt=' not in i]
    if missing:
        return f"{len(missing)} <img> tag(s) missing alt attribute — accessibility failure"
    return None

def check_cursor_pointer(html, path):
    has_cards = bool(re.search(r'class=["\'][^"\']*card', html, re.IGNORECASE))
    if has_cards and 'cursor' not in html and 'cursor:' not in html:
        return "Card elements found but no cursor:pointer in styles — UX issue"
    return None

def check_reduced_motion(html, path):
    has_animation = bool(re.search(r'animation|@keyframes|transition', html))
    if has_animation and 'prefers-reduced-motion' not in html:
        return "Animations present but no prefers-reduced-motion media query"
    return None

def check_no_console_errors_hint(html, path):
    # Look for null-unsafe DOM queries
    bad = re.findall(r'document\.querySelector\([^)]+\)\.(style|classList|addEventListener)', html)
    if bad:
        return f"{len(bad)} DOM query(ies) without null-check — will throw on pages where element is absent"
    return None

def check_passive_listeners(html, path):
    scroll_listeners = re.findall(r"addEventListener\(['\"]scroll", html)
    if scroll_listeners:
        passive_count = html.count('passive: true') + html.count("passive:true")
        if passive_count < len(scroll_listeners):
            return f"{len(scroll_listeners)} scroll listener(s) missing {{passive: true}} — janky scroll performance"
    return None

def check_vercel_spa(html, path):
    # Only relevant if this is index.html and spa-style links exist
    has_spa_links = bool(re.search(r'href=["\']\/\w+["\'](?!\w)', html))
    proj_dir = Path(path).parent
    has_vercel_json = (proj_dir / 'vercel.json').exists()
    if has_spa_links and not has_vercel_json:
        return "SPA-style routes found (/page) but no vercel.json — direct URL access will 404"
    return None

def check_aria_current(html, path):
    has_nav_links = bool(re.search(r'<nav[^>]*>.*?<a\s', html, re.DOTALL | re.IGNORECASE))
    if has_nav_links and 'aria-current' not in html:
        return "Nav links found but no aria-current='page' — active link not marked for screen readers"
    return None

# Rule registry: (id, severity, check_fn)
RULES = [
    ("R01", "CRITICAL", check_viewport),
    ("R02", "CRITICAL", check_charset),
    ("R03", "WARNING",  check_title),
    ("R04", "WARNING",  check_og_tags),
    ("R05", "WARNING",  check_favicon),
    ("R06", "CRITICAL", check_mobile_query),
    ("R07", "CRITICAL", check_hamburger_html),
    ("R08", "WARNING",  check_aria_expanded),
    ("R09", "CRITICAL", check_clamp),
    ("R10", "CRITICAL", check_inline_layout_styles),
    ("R11", "CRITICAL", check_img_alt),
    ("R12", "WARNING",  check_cursor_pointer),
    ("R13", "WARNING",  check_reduced_motion),
    ("R14", "WARNING",  check_no_console_errors_hint),
    ("R15", "WARNING",  check_passive_listeners),
    ("R16", "CRITICAL", check_vercel_spa),
    ("R17", "INFO",     check_aria_current),
]

# ─── Runner ──────────────────────────────────────────────────────────────────

def validate_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
    except Exception as e:
        return [], [f"Could not read file: {e}"]

    issues = []
    for rule_id, severity, check_fn in RULES:
        result = check_fn(html, filepath)
        if result:
            issues.append((rule_id, severity, result))
    return issues, []


def print_report(results):
    total_critical = 0
    total_warning = 0
    total_info = 0
    all_passed = True

    for filepath, issues, errors in results:
        fname = Path(filepath).name
        if issues or errors:
            all_passed = False
            print(f"\n{BLD}{'─'*60}{RST}")
            print(f"{BLD}  {fname}{RST}")
            print(f"{'─'*60}")
            for rule_id, severity, msg in issues:
                if severity == "CRITICAL":
                    total_critical += 1
                    icon = f"{RED}✗ CRITICAL{RST}"
                elif severity == "WARNING":
                    total_warning += 1
                    icon = f"{YEL}⚠ WARNING {RST}"
                else:
                    total_info += 1
                    icon = f"  INFO    "
                print(f"  [{rule_id}] {icon}  {msg}")
            for err in errors:
                print(f"  {RED}ERROR: {err}{RST}")
        else:
            print(f"\n  {GRN}✓ PASS{RST}  {Path(filepath).name} — no issues found")

    print(f"\n{'═'*60}")
    print(f"{BLD}  SUMMARY{RST}")
    print(f"{'═'*60}")
    print(f"  Files checked : {len(results)}")
    if total_critical:
        print(f"  {RED}Critical      : {total_critical}{RST}")
    if total_warning:
        print(f"  {YEL}Warnings      : {total_warning}{RST}")
    if total_info:
        print(f"    Info          : {total_info}")

    if total_critical == 0 and total_warning == 0:
        print(f"\n  {GRN}{BLD}All checks passed — safe to deploy ✓{RST}")
        return 0
    elif total_critical > 0:
        print(f"\n  {RED}{BLD}Fix CRITICAL issues before deploying.{RST}")
        return 2
    else:
        print(f"\n  {YEL}Warnings present — review before deploying.{RST}")
        return 1


def main():
    args = sys.argv[1:]

    if not args or '--help' in args or '-h' in args:
        print(__doc__)
        sys.exit(0)

    files = []

    if '--dir' in args:
        idx = args.index('--dir')
        d = args[idx + 1] if idx + 1 < len(args) else '.'
        files = glob.glob(os.path.join(d, '**', '*.html'), recursive=True)
        files += glob.glob(os.path.join(d, '**', '*.htm'), recursive=True)
    else:
        for a in args:
            if a.startswith('--'):
                continue
            files += glob.glob(a)

    if not files:
        print(f"{RED}No HTML files found.{RST}")
        sys.exit(1)

    files = sorted(set(files))
    results = []
    for f in files:
        issues, errors = validate_file(f)
        results.append((f, issues, errors))

    exit_code = print_report(results)
    sys.exit(exit_code)


if __name__ == '__main__':
    main()
