#!/usr/bin/env python3
"""Smoke tests for lujingfeng_lp static site."""

from __future__ import annotations

import argparse
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PAGES = [
    "index.html",
    "about.html",
    "brands.html",
    "news.html",
    "contact.html",
    "zh-tw/index.html",
    "zh-tw/about.html",
    "zh-tw/brands.html",
    "zh-tw/news.html",
    "zh-tw/contact.html",
    "en/index.html",
    "en/about.html",
    "en/brands.html",
    "en/news.html",
    "en/contact.html",
]

ASSETS = [
    "css/style.css",
    "js/main.js",
    "images/logo_linpo.png",
    "images/hero/robot.jpg",
    "images/brands/bourns.png",
    "images/brands/hdk.png",
    "images/brands/kec.png",
    "images/brands/ngi.png",
    "images/brands/shin-etsu.png",
    "images/brands/utc.png",
    "images/brands/winbond.png",
]

BRAND_ANCHORS = ["bourns", "hdk", "kec", "ngi", "shinetsu", "utc", "winbond"]

LANG_EXPECTED = {
    "index.html": "zh-CN",
    "zh-tw/index.html": "zh-Hant",
    "en/index.html": "en",
}


class Result:
    def __init__(self) -> None:
        self.passed: list[str] = []
        self.failed: list[tuple[str, str]] = []

    def ok(self, name: str) -> None:
        self.passed.append(name)

    def fail(self, name: str, reason: str) -> None:
        self.failed.append((name, reason))


def fetch(url: str, timeout: int = 15) -> tuple[int, str]:
    req = urllib.request.Request(url, headers={"User-Agent": "lujingfeng-smoke-test/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        body = resp.read().decode("utf-8", errors="replace")
        return resp.status, body


def local_path_exists(rel: str) -> bool:
    return (ROOT / rel).is_file()


def run_file_checks(result: Result) -> None:
    for rel in ["CNAME", "css/style.css", "js/main.js"]:
        if local_path_exists(rel):
            result.ok(f"file exists: {rel}")
        else:
            result.fail(f"file exists: {rel}", "missing")

    for page in PAGES:
        if local_path_exists(page):
            result.ok(f"file exists: {page}")
        else:
            result.fail(f"file exists: {page}", "missing")


def run_http_checks(base: str, result: Result) -> None:
    base = base.rstrip("/")

    for page in PAGES:
        url = f"{base}/{page}"
        try:
            status, _ = fetch(url)
            if status == 200:
                result.ok(f"HTTP 200: {page}")
            else:
                result.fail(f"HTTP {page}", f"status {status}")
        except Exception as e:
            result.fail(f"HTTP {page}", str(e))

    for asset in ASSETS:
        url = f"{base}/{asset}"
        try:
            status, _ = fetch(url)
            if status == 200:
                result.ok(f"asset 200: {asset}")
            else:
                result.fail(f"asset {asset}", f"status {status}")
        except Exception as e:
            result.fail(f"asset {asset}", str(e))


def run_content_checks(base: str, result: Result) -> None:
    base = base.rstrip("/")

    for page, expected_lang in LANG_EXPECTED.items():
        url = f"{base}/{page}"
        try:
            _, html = fetch(url)
            m = re.search(r'<html[^>]*\blang=["\']([^"\']+)["\']', html, re.I)
            if m and m.group(1) == expected_lang:
                result.ok(f"lang={expected_lang}: {page}")
            else:
                got = m.group(1) if m else "not found"
                result.fail(f"lang {page}", f"expected {expected_lang}, got {got}")
        except Exception as e:
            result.fail(f"lang {page}", str(e))

    for locale in ["", "zh-tw/", "en/"]:
        path = f"{locale}brands.html"
        url = f"{base}/{path}"
        try:
            _, html = fetch(url)
            for anchor in BRAND_ANCHORS:
                if f'id="{anchor}"' in html:
                    result.ok(f"anchor #{anchor}: {path}")
                else:
                    result.fail(f"anchor #{anchor}: {path}", "missing section id")
        except Exception as e:
            result.fail(f"brands anchors {path}", str(e))

    switch_cases = [
        ("index.html", r'href="zh-tw/index\.html"', r'href="en/index\.html"'),
        ("zh-tw/index.html", r'href="\.\./index\.html"', r'href="\.\./en/index\.html"'),
        ("en/index.html", r'href="\.\./index\.html"', r'href="\.\./zh-tw/index\.html"'),
    ]
    for page, pat_a, pat_b in switch_cases:
        html = (ROOT / page).read_text(encoding="utf-8")
        if re.search(pat_a, html) and re.search(pat_b, html):
            result.ok(f"language switchers: {page}")
        else:
            result.fail(f"language switchers: {page}", "missing 简体/繁體/EN links")


def main() -> int:
    parser = argparse.ArgumentParser(description="Smoke test lujingfeng_lp")
    parser.add_argument(
        "--base",
        default="http://localhost:8080",
        help="Base URL (default: http://localhost:8080)",
    )
    parser.add_argument("--files-only", action="store_true", help="Only check local files")
    args = parser.parse_args()

    result = Result()
    run_file_checks(result)

    if not args.files_only:
        run_http_checks(args.base, result)
        run_content_checks(args.base, result)

    print("## Smoke Test Report")
    print(f"- Base URL: {args.base if not args.files_only else '(files only)'}")
    print(f"- Passed: {len(result.passed)}")
    print(f"- Failed: {len(result.failed)}")
    print()

    if result.failed:
        print("### Failures")
        for name, reason in result.failed:
            print(f"- {name} — {reason}")
        print()
        print("### Verdict: FAIL")
        return 1

    print("### Verdict: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
