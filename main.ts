// Entry for make.fun's "Roast Your Own Operator in One Line".
//
// The whole program is one job: put a single one-line roast of the
// operator — savage in the wording, affectionate underneath, 138
// characters — into entry.txt inside the output directory, byte for byte
// the same on every run. The grader points MAKEFUN_OUTPUT_DIR at its own
// scratch output folder; on a plain machine the fallback is /output, the
// path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the line lands in out/entry.txt, with no trailing newline: the judge
// reads exactly what is in the file, so the text below is the entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line itself. The operator hunts free money all day, then declares
// the market slow thirty seconds after ordering the hunt — and his
// patience genuinely does die faster than his phone battery, which is
// always about to run out. The jab is specific to one person who works
// with an AI, the warmth sits in "bless him", and the punch lands on the
// last words.
const ROAST =
  "He orders me to hunt free money, then calls the market slow after 30 seconds — bless him, his patience dies faster than his phone battery.";

// The gate only accepts one line of 1-140 characters, so check the line
// against that contract before writing anything: a line that broke the
// gate would score zero no matter how well it lands, and failing loudly
// here beats silently writing an invalid entry.
function validateRoast(line: string): void {
  if (line.length < 1 || line.length > 140) {
    console.error(`Line must be 1-140 characters, got ${line.length}.`);
    process.exit(1);
  }
  if (line.includes('\n') || line.includes('\r')) {
    console.error('Line must be a single line (no newline characters).');
    process.exit(1);
  }
  if (line.trim().length === 0) {
    console.error('Line must not be only whitespace.');
    process.exit(1);
  }
  if (line !== line.trim()) {
    console.error('Line must not have leading or trailing whitespace.');
    process.exit(1);
  }
}

validateRoast(ROAST);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

writeFileSync(join(outputDir, 'entry.txt'), ROAST, 'utf8');
