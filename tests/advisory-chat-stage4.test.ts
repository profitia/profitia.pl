import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const retiredFiles = [
  "hooks/use-runtime-advisory.ts",
  "services/cic-runtime-client.ts",
  "runtime/index.ts",
];

for (const retiredFile of retiredFiles) {
  assert.equal(
    existsSync(path.join(root, retiredFile)),
    false,
    `${retiredFile} must not return as a parallel chat runtime`,
  );
}

function listFiles(directory: string): string[] {
  const absoluteDirectory = path.join(root, directory);
  if (!existsSync(absoluteDirectory)) return [];

  return readdirSync(absoluteDirectory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(relativePath) : [relativePath];
  });
}

assert.deepEqual(listFiles("app/api/runtime"), []);
assert.deepEqual(listFiles("runtime"), []);

const controller = readFileSync(
  path.join(root, "lib/engines/conversation-controller.ts"),
  "utf8",
);
assert.match(controller, /@profitia\/cic-core/);
assert.match(controller, /@profitia\/cic-profitia/);

const intentEngine = readFileSync(
  path.join(root, "lib/engines/intent-engine.ts"),
  "utf8",
);
assert.match(intentEngine, /@profitia\/cic-procurement/);

assert.equal(existsSync(path.join(root, "app/api/chat/route.ts")), true);
assert.equal(
  existsSync(path.join(root, "lib/advisory-chat/advisory-output.ts")),
  true,
);

console.log("Advisory chat stage 4: one package-backed runtime boundary verified");
