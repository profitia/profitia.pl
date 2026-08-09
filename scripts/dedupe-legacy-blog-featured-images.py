#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path

from legacy_blog_image_deduper import dedupe_featured_images


REPO_ROOT = Path(__file__).resolve().parents[1]
DATASET_PATH = REPO_ROOT / 'db' / 'legacy-blog' / 'legacy-blog-articles.json'
ASSET_ROOT = REPO_ROOT / 'public' / 'images' / 'blog'


def main() -> None:
    articles = json.loads(DATASET_PATH.read_text(encoding='utf-8'))
    changed = dedupe_featured_images(articles, ASSET_ROOT)
    DATASET_PATH.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Deduplicated featured images in {len(changed)} article(s).')
    for slug in changed:
        print(f'- {slug}')


if __name__ == '__main__':
    main()