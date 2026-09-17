import { strict as assert } from 'node:assert'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import ts from 'typescript'

const repositoryRoot = new URL('..', import.meta.url).pathname
const sourceRoots = ['app', 'components', 'features', 'lib', 'runtime', 'public']
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.mdx'])
const forbiddenDash = String.fromCodePoint(0x2014)
const textNodeKinds = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.JsxText,
])

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function scriptKind(path: string): ts.ScriptKind {
  if (path.endsWith('.tsx') || path.endsWith('.jsx')) return ts.ScriptKind.TSX
  if (path.endsWith('.json')) return ts.ScriptKind.JSON
  return ts.ScriptKind.TS
}

const violations: string[] = []

for (const root of sourceRoots) {
  for (const path of walk(join(repositoryRoot, root))) {
    if (!sourceExtensions.has(extname(path))) continue

    const source = readFileSync(path, 'utf8')
    const displayPath = relative(repositoryRoot, path)

    if (path.endsWith('.html') || path.endsWith('.mdx')) {
      if (source.includes(forbiddenDash)) violations.push(displayPath)
      continue
    }

    const sourceFile = ts.createSourceFile(
      path,
      source,
      ts.ScriptTarget.Latest,
      true,
      scriptKind(path),
    )

    const visit = (node: ts.Node) => {
      if (textNodeKinds.has(node.kind)) {
        const value = source.slice(node.getStart(sourceFile), node.getEnd())
        if (value.includes(forbiddenDash)) {
          const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
          violations.push(`${displayPath}:${position.line + 1}`)
        }
      }
      ts.forEachChild(node, visit)
    }

    visit(sourceFile)
  }
}

assert.deepEqual(
  violations,
  [],
  `Public copy must use the standard hyphen instead of U+2014. Found: ${violations.join(', ')}`,
)

console.log('PASS public copy contains no U+2014 em dash')
