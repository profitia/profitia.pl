from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Any

from lxml import etree, html


def _element_html(node: html.HtmlElement) -> str:
    return etree.tostring(node, encoding='unicode', method='html', with_tail=False)


def _content_html(blocks: list[html.HtmlElement]) -> str:
    return '\n\n'.join(_element_html(block).strip() for block in blocks if _element_html(block).strip())


def _local_asset_path(asset_root: Path, local_url: str | None) -> Path | None:
    prefix = '/images/blog/'
    if not local_url or not local_url.startswith(prefix):
        return None
    return asset_root / local_url.removeprefix(prefix)


def _file_hash(path: Path | None) -> str | None:
    if path is None or not path.exists() or not path.is_file():
        return None
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(65536), b''):
            digest.update(chunk)
    return digest.hexdigest()


def _is_duplicate_featured_image(asset_root: Path, cover_image: str | None, body_image: str | None) -> bool:
    if not cover_image or not body_image:
        return False
    if cover_image == body_image:
        return True
    cover_hash = _file_hash(_local_asset_path(asset_root, cover_image))
    body_hash = _file_hash(_local_asset_path(asset_root, body_image))
    return bool(cover_hash and body_hash and cover_hash == body_hash)


def _removal_target(image: html.HtmlElement) -> html.HtmlElement:
    parent = image.getparent()
    if parent is None or parent.tag != 'figure':
        return image

    children = [child for child in parent if isinstance(child.tag, str)]
    image_children = [child for child in children if child.tag == 'img']
    if len(image_children) == 1 and all(child.tag in {'img', 'figcaption'} for child in children):
        return parent
    return image


def _prune_empty_parent(node: html.HtmlElement, root: html.HtmlElement) -> None:
    parent = node.getparent()
    if parent is None:
        return

    parent.remove(node)

    while parent is not None and parent is not root:
        if parent.tag not in {'p', 'div'}:
            break
        if parent.text_content().strip():
            break
        if any(isinstance(child.tag, str) for child in parent):
            break
        grandparent = parent.getparent()
        if grandparent is None:
            break
        grandparent.remove(parent)
        parent = grandparent


def _drop_first_matching_inline_path(inline_paths: list[str], duplicate_path: str) -> list[str]:
    removed = False
    cleaned: list[str] = []
    for path in inline_paths:
        if not removed and path == duplicate_path:
            removed = True
            continue
        cleaned.append(path)
    return cleaned


def dedupe_article_featured_image(article: dict[str, Any], asset_root: Path) -> bool:
    cover_image = article.get('coverImage')
    content = article.get('content')
    if not cover_image or not content:
        return False

    root = html.fragment_fromstring(f'<div>{content}</div>', create_parent=True)
    images = root.xpath('.//img')
    if not images:
        return False

    first_image = images[0]
    first_src = first_image.get('src')
    if not _is_duplicate_featured_image(asset_root, cover_image, first_src):
        return False

    target = _removal_target(first_image)
    _prune_empty_parent(target, root)

    article['content'] = _content_html([child for child in root if isinstance(child.tag, str)])
    inline_paths = article.get('inlineImagePaths') or []
    if first_src:
        article['inlineImagePaths'] = _drop_first_matching_inline_path(list(inline_paths), first_src)
    return True


def dedupe_featured_images(articles: list[dict[str, Any]], asset_root: Path) -> list[str]:
    changed: list[str] = []
    for article in articles:
        if dedupe_article_featured_image(article, asset_root):
            changed.append(article['slug'])
    return changed