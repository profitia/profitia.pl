#!/usr/bin/env python3

import argparse
import json
import mimetypes
import os
import re
import subprocess
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse

from lxml import etree, html

from legacy_blog_image_deduper import dedupe_featured_images


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = REPO_ROOT / 'db' / 'legacy-blog' / 'legacy-blog-articles.json'
DEFAULT_REPORT = REPO_ROOT / 'db' / 'legacy-blog' / 'legacy-blog-report.json'
DEFAULT_ASSET_ROOT = REPO_ROOT / 'public' / 'images' / 'blog'

STOP_HEADINGS = {
    'kontakt',
    'przydatne linki',
    'o profitia',
}
REMOVE_TEXT = {
    'powrót',
    'zapisz się na profinewsletter',
    'używamy ciasteczek',
}
BLOCK_TAGS = {
    'p',
    'h2',
    'h3',
    'h4',
    'ul',
    'ol',
    'blockquote',
    'table',
    'pre',
    'hr',
    'iframe',
    'img',
    'figure',
}


@dataclass(frozen=True)
class SourceEntry:
    url: str

    @property
    def slug(self) -> str:
        return self.url.rstrip('/').split('/')[-1]


SOURCES = [
    SourceEntry('https://profitia.pl/webinary-zakupower/w1/sprzedaj-zakupy-w-organizacji-praktyczne-tricki-ekspertow'),
    SourceEntry('https://profitia.pl/best-value-procurement'),
    SourceEntry('https://profitia.pl/blog-profitia/jak-cio-moze-zwiekszyc-efektywnosc-operacyjna-poprzez-digitalizacje-zakupow'),
    SourceEntry('https://profitia.pl/blog-profitia/wojna-celna-z-perspektywy-organizacji-zakupowych'),
    SourceEntry('https://profitia.pl/blog-profitia/nowe-egzaminy-cips-qualifications'),
    SourceEntry('https://profitia.pl/webinary-zakupower/w3/how-to-attract-and-keep-the-best-people-in-procurement'),
    SourceEntry('https://profitia.pl/blog-profitia/cips-global-state-of-procurement-supply-2025-spokoj-i-rozwaga-posrod-chaosu'),
    SourceEntry('https://profitia.pl/blog-profitia/mapa-technologiczna-zakupow-jak-z-wielu-platform-stworzyc-wlasny-ekosystem'),
    SourceEntry('https://profitia.pl/blog-profitia/case-study-jak-lipco-foods-wykorzystalo-spendguru-by-zwiekszyc-kontrole-nad-kosztami-i-wzmocnic-pozycje-negocjacyjna'),
    SourceEntry('https://profitia.pl/blog-profitia/do-rozwoju-potrzebna-jest-drabina'),
    SourceEntry('https://profitia.pl/blog-profitia/jak-sprzedac-zakupy-wewnatrz-organizacji-marketing-zakupowy-w-praktyce'),
    SourceEntry('https://profitia.pl/blog-profitia/wdrozenie-ai-w-zakupach-dlaczego-co-i-kiedy'),
    SourceEntry('https://profitia.pl/blog-profitia/cena-to-opinia-koszt-to-fakt'),
    SourceEntry('https://profitia.pl/blog-profitia/analiza-finansowa-dostawcow'),
    SourceEntry('https://profitia.pl/blog-profitia/dzien-z-zycia-kupca-kiedy-stala-cena-przegrywa-z-faktami'),
    SourceEntry('https://profitia.pl/blog-profitia/rola-predykcji-cen-w-zakupach'),
    SourceEntry('https://profitia.pl/blog-profitia/przelamujac-status-quo-rola-lidera-transformacji-w-nowoczesnej-organizacji-zakupowej'),
    SourceEntry('https://profitia.pl/blog-profitia/nowa-kategoria-bez-paniki-oto-twoj-poradnik-survivalowy'),
    SourceEntry('https://profitia.pl/blog-profitia/kryzys-jako-przewaga-jak-zakupy-moga-wykorzystac-czasy-geopolitycznych-wstrzasow'),
    SourceEntry('https://profitia.pl/blog-profitia/kto-sie-nie-rozwija-ten-sie-zwija-czyli-o-trendach-z-zakupowego-rynku-pracy'),
    SourceEntry('https://profitia.pl/blog-profitia/it-governance-w-zakupach-czy-naprawde-masz-wplyw-na-decyzje-o-it'),
    SourceEntry('https://profitia.pl/blog-profitia/dzien-z-zycia-kupca-kiedy-prognoza-ceny-nie-wystarcza'),
]


def fetch_text(url: str) -> str:
    result = subprocess.run(
        ['curl', '-Lks', url],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0 or not result.stdout.strip():
        raise RuntimeError(f'Failed to fetch {url}: exit={result.returncode}')
    return result.stdout


def fetch_binary(url: str) -> bytes:
    result = subprocess.run(
        ['curl', '-Lks', url],
        capture_output=True,
        check=False,
    )
    if result.returncode != 0 or not result.stdout:
        raise RuntimeError(f'Failed to download {url}: exit={result.returncode}')
    return result.stdout


def normalise_text(value: str) -> str:
    return re.sub(r'\s+', ' ', value).strip()


def node_text(node: html.HtmlElement) -> str:
    return normalise_text(' '.join(part.strip() for part in node.itertext() if part.strip()))


def is_removable_text(value: str) -> bool:
    return normalise_text(value).lower() in REMOVE_TEXT


def is_stop_heading(node: html.HtmlElement) -> bool:
    return node.tag in {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'} and node_text(node).lower() in STOP_HEADINGS


def should_skip_node(node: html.HtmlElement) -> bool:
    text = node_text(node)
    if not text and node.tag not in {'img', 'iframe', 'hr'}:
        return True
    if is_removable_text(text):
        return True
    classes = node.get('class', '')
    if 'ba-author' in classes or 'pagination' in classes:
        return True
    return False


def extract_blocks(body: html.HtmlElement) -> list[html.HtmlElement]:
    blocks: list[html.HtmlElement] = []
    stopped = False

    def walk(node: html.HtmlElement) -> None:
        nonlocal stopped
        if stopped or not isinstance(node.tag, str):
            return
        if is_stop_heading(node):
            stopped = True
            return
        if node.tag in BLOCK_TAGS:
            if should_skip_node(node):
                return
            blocks.append(node)
            return
        for child in node:
            if isinstance(child.tag, str):
                walk(child)
            if stopped:
                return

    walk(body)
    return blocks


def element_html(node: html.HtmlElement) -> str:
    return etree.tostring(node, encoding='unicode', method='html', with_tail=False)


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def extension_for(url: str, content: bytes) -> str:
    path = urlparse(url).path
    ext = Path(path).suffix.lower()
    if ext in {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'}:
        return ext
    guessed = mimetypes.guess_extension(mimetypes.guess_type(path)[0] or '')
    if guessed:
        return guessed
    if content.startswith(b'\x89PNG'):
        return '.png'
    if content[:3] == b'GIF':
        return '.gif'
    if content[:2] == b'\xff\xd8':
        return '.jpg'
    return '.bin'


def download_asset(url: str, target: Path) -> None:
    content = fetch_binary(url)
    ensure_dir(target.parent)
    target.write_bytes(content)


def get_cover_url(doc: html.HtmlElement, source_url: str) -> str | None:
    meta = doc.xpath("//meta[@property='og:image']/@content")
    if meta:
        return urljoin(source_url, meta[0])
    return None


def resolve_img_src(node: html.HtmlElement, source_url: str) -> str | None:
    for attr in ('src', 'data-src', 'data-lazy-src'):
        value = node.get(attr)
        if value:
            return urljoin(source_url, value)
    srcset = node.get('srcset') or node.get('data-srcset')
    if srcset:
        first = srcset.split(',')[0].strip().split(' ')[0]
        if first:
            return urljoin(source_url, first)
    return None


def download_and_rewrite_links(blocks: list[html.HtmlElement], source_url: str) -> None:
    for block in blocks:
        for link in block.xpath('.//a[@href]'):
            href = link.get('href')
            if href:
                link.set('href', urljoin(source_url, href))


def download_and_rewrite_images(blocks: list[html.HtmlElement], cover_url: str | None, slug: str, asset_root: Path, source_url: str) -> tuple[str | None, list[str], list[str]]:
    asset_dir = asset_root / slug
    inline_urls: list[str] = []
    errors: list[str] = []
    seen: dict[str, str] = {}

    if cover_url:
        try:
            content = fetch_binary(cover_url)
            ext = extension_for(cover_url, content)
            cover_path = asset_dir / f'cover{ext}'
            ensure_dir(cover_path.parent)
            cover_path.write_bytes(content)
            local_cover = f'/images/blog/{slug}/{cover_path.name}'
            seen[cover_url] = local_cover
        except Exception as exc:
            local_cover = None
            errors.append(f'cover:{cover_url}:{exc}')
    else:
        local_cover = None

    image_index = 1
    for block in blocks:
        for image in block.xpath('.//img | self::img'):
            src = resolve_img_src(image, source_url)
            if not src:
                continue
            if src in seen:
                image.set('src', seen[src])
                inline_urls.append(seen[src])
                continue
            try:
                content = fetch_binary(src)
                ext = extension_for(src, content)
                file_name = f'image-{image_index:02d}{ext}'
                image_index += 1
                target = asset_dir / file_name
                ensure_dir(target.parent)
                target.write_bytes(content)
                local_url = f'/images/blog/{slug}/{file_name}'
                seen[src] = local_url
                image.set('src', local_url)
                for attr in ('data-src', 'data-lazy-src', 'srcset', 'data-srcset'):
                    if image.get(attr):
                        image.attrib.pop(attr)
                inline_urls.append(local_url)
            except Exception as exc:
                errors.append(f'inline:{src}:{exc}')
    return local_cover, inline_urls, errors


def extract_subtitle(blocks: list[html.HtmlElement]) -> tuple[str | None, list[html.HtmlElement]]:
    if not blocks:
        return None, blocks
    first = blocks[0]
    if first.tag in {'h2', 'h3', 'h4'}:
        subtitle = node_text(first)
        if 1 < len(subtitle) <= 240:
            return subtitle, blocks[1:]
    return None, blocks


def content_html(blocks: Iterable[html.HtmlElement]) -> str:
    return '\n\n'.join(element_html(block).strip() for block in blocks if element_html(block).strip())


def detect_status(content: str, publication_date: str | None, asset_errors: list[str], title: str) -> str:
    lower = normalise_text(content).lower()
    if lower == 'click here and start typing':
        return 'MIGRATED_WITH_SOURCE_LIMITATION'
    if not publication_date:
        return 'PUBLICATION_DATE_NOT_VERIFIED'
    if asset_errors:
        return 'MIGRATED_WITH_SOURCE_LIMITATION'
    if title:
        'sourceUrl': entry.url,
        'slug': entry.slug,
        'title': title,
        'subtitle': subtitle,
        'excerpt': excerpt,
        'content': content,
        'published': True,
        'publishedAt': publication_date,
        'metaTitle': None,
        'metaDescription': None,
        'category': None,
        'readingTime': None,
        'coverImage': local_cover,
        'featured': False,
        'authorName': None,
        'authorRole': None,
        'authorBio': None,
        'relatedSlugs': [],
        'status': status,
        'imagesDownloaded': len(set(([local_cover] if local_cover else []) + inline_urls)),
        'inlineImagePaths': inline_urls,
        'assetErrors': asset_errors,
        'contentVerified1to1': False,
    }


def write_json(path: Path, data: object) -> None:
    ensure_dir(path.parent)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Migrate legacy Profitia blog content.')
    parser.add_argument('--limit', type=int, default=None)
    parser.add_argument('--slug', action='append', default=[])
    parser.add_argument('--output', default=str(DEFAULT_OUTPUT))
    parser.add_argument('--report', default=str(DEFAULT_REPORT))
    parser.add_argument('--asset-root', default=str(DEFAULT_ASSET_ROOT))
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    selected = SOURCES
    if args.slug:
        wanted = set(args.slug)
        selected = [entry for entry in SOURCES if entry.slug in wanted]
    if args.limit is not None:
        selected = selected[: args.limit]

    migrated = [migrate_entry(entry, Path(args.asset_root)) for entry in selected]
    dedupe_featured_images(migrated, Path(args.asset_root))
    report = [
        {
            'sourceUrl': item['sourceUrl'],
            'newUrl': f"/blog/{item['slug']}",
            'originalDate': item['publishedAt'] or 'PUBLICATION_DATE_NOT_VERIFIED',
            'imagesDownloaded': item['imagesDownloaded'],
            'contentVerified1to1': item['contentVerified1to1'],
            'status': item['status'],
            'assetErrors': item['assetErrors'],
        }
        for item in migrated
    ]
    write_json(Path(args.output), migrated)
    write_json(Path(args.report), report)
    print(f'Wrote {len(migrated)} records to {args.output}')
    print(f'Wrote report to {args.report}')


if __name__ == '__main__':
    main()