import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { MAX_MEDIA_DIMENSION } from '../lib/media/image'

const BLOG_IMAGES_ROOT = path.join(process.cwd(), 'public', 'images', 'blog')
const SOURCE_NAMES = ['cover.png', 'cover.jpg', 'cover.jpeg']

async function main() {
  const directories = await readdir(BLOG_IMAGES_ROOT, { withFileTypes: true })
  let sourceBytes = 0
  let outputBytes = 0
  let converted = 0

  for (const directory of directories) {
    if (!directory.isDirectory()) continue

    const articleDirectory = path.join(BLOG_IMAGES_ROOT, directory.name)
    const files = await readdir(articleDirectory)
    const sourceName = SOURCE_NAMES.find((candidate) => files.includes(candidate))
    if (!sourceName) continue

    const input = path.join(articleDirectory, sourceName)
    const output = path.join(articleDirectory, 'cover.webp')
    const before = await stat(input)

    await sharp(input)
      .rotate()
      .resize({
        width: MAX_MEDIA_DIMENSION,
        height: MAX_MEDIA_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 4, smartSubsample: true })
      .toFile(output)

    const after = await stat(output)
    sourceBytes += before.size
    outputBytes += after.size
    converted += 1
  }

  console.log(JSON.stringify({ converted, sourceBytes, outputBytes }, null, 2))
}

void main()
