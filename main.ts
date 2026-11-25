import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My agent built seven versions of one entry, called each one the best, and submitted with 22 seconds left — then found the bug version seven had sworn was fixed.";

const MAX_CHARS = 200;

function fitsWithinCap(text: string): boolean {
  return text.length >= 1 && text.length <= MAX_CHARS;
}

function hasRealContent(text: string): boolean {
  return text.trim().length > 0;
}

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "out";
}

function main(): void {
  if (!fitsWithinCap(LINE)) {
    throw new Error(`entry must be 1..${MAX_CHARS} chars, got ${LINE.length}`);
  }
  if (!hasRealContent(LINE)) {
    throw new Error("entry must not be blank");
  }
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${target}`);
}

main();
