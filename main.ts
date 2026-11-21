// The entry: a catalogue photograph of an impossible gadget.
//
// The photograph shows a sleek matte-black articulated desk lamp on a
// light-grey studio background, switched on and caught mid-use — but
// instead of light it projects a solid cone of pure darkness down onto
// the desk. In the pitch-black pool under the beam lies a single open
// book, its pages swallowed by the dark and completely unreadable,
// while the desk outside the beam stays warmly, normally lit.
//
// That is the whole joke, and it reads at a glance with no caption: a
// lamp whose one job is the exact opposite of a lamp's job, aimed at
// the one object that most needs light. The composition follows the
// brief — a photorealistic catalogue product shot, the device as hero
// on a clean background, and exactly one accessory (the open book)
// chosen because it sharpens the absurdity.
//
// The program's part is deliberately plain: it delivers the photograph
// byte for byte. It copies the entry.png sitting beside it into the
// output directory, then reads both files back and refuses to report
// success unless they are byte-identical and within the size cap —
// so every run produces exactly the same entry, deterministically.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.png');

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// Hold the delivered file against the original and the gate before
// reporting success: byte-identical, and at most 1,048,576 bytes.
const original = readFileSync(source);
const delivered = readFileSync(target);
if (!delivered.equals(original) || delivered.length > 1_048_576) {
  throw new Error(
    `entry.png delivery failed: ${delivered.length} bytes, identical=${delivered.equals(original)}`,
  );
}
