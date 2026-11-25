// A tiny one-liner runner: it checks the roast line, then drops it into
// the file the grader reads. Nothing fancy on purpose — one sentence in,
// one file out, and a loud failure if the sentence ever goes missing.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast itself. One sentence, no trailing newline in the file.
const LINE =
  "My agent built seven versions of one entry, called each one the best, and submitted with 22 seconds left — then found the bug version seven had sworn was fixed.";

// The bounty caps entries at this many characters, and an entry made of
// nothing but spaces is not an entry at all.
const SHORTEST_OK = 1;
const LONGEST_OK = 200;

// Walk the text character by character and say whether anything solid
// is in there — a space, a tab or a newline on its own does not count.
function holdsAnythingSolid(text: string): boolean {
  for (const glyph of text) {
    if (glyph !== " " && glyph !== "\t" && glyph !== "\n" && glyph !== "\r") {
      return true;
    }
  }
  return false;
}

// Put the two rules together: long enough to exist, short enough to
// fit the cap, and holding at least one real character. Anything else
// is a mistake worth stopping for instead of submitting quietly.
function linePassesTheRules(text: string): boolean {
  if (text.length < SHORTEST_OK || text.length > LONGEST_OK) {
    return false;
  }
  return holdsAnythingSolid(text);
}

// Work out where the entry file belongs, make sure that folder exists,
// write the line exactly as it stands, and say how long it turned out.
function main(): void {
  if (!linePassesTheRules(LINE)) {
    throw new Error(
      `Roast line failed its checks: ${LINE.length} characters long.`,
    );
  }
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(targetDir, { recursive: true });
  const targetFile = join(targetDir, "entry.txt");
  writeFileSync(targetFile, LINE, "utf8");
  console.log(`Wrote ${LINE.length} characters to ${targetFile}`);
}

main();
