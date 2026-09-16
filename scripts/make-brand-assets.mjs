/**
 * Build every brand asset from the clinic's original logo.
 *
 *   node scripts/make-brand-assets.mjs [path-to-logo.png]
 *
 * The clinic supplied one high-resolution PNG: charcoal linework (#363435)
 * and a dusty rose "K" swoosh (#9B6665) on a transparent background, with
 * the tooth interior open rather than filled white. That last detail is why
 * the artwork reverses onto near-black cleanly instead of showing a
 * knocked-out box, and it is why this is a recolour rather than a redraw.
 *
 * THE LOGO IS NEVER REDRAWN. Geometry, proportions, the tooth, the K and the
 * wording are the clinic's. All this does is repaint flat colour zones while
 * keeping the original alpha channel, which is where every anti-aliased edge
 * lives. Zones are found by measuring the artwork, not by tracing it:
 *
 *   x <= 589            the mark (tooth + K)
 *   x >= 635            the wordmark
 *   y 594..794          wordmark line 1, "KHENI DENTAL &"
 *   y 910..1035         wordmark line 2, "ELITE IMPLANT CENTER"
 *   r - (g+b)/2 > 22    a rose pixel rather than a charcoal one
 *
 * LIGHT TREATMENT, for ivory, white, sand and the five light fields
 *   charcoal linework, rose mark. The clinic's own artwork, untouched.
 *
 * DARK TREATMENT, for the black header, mobile menu and footer
 *   a straight reverse. The linework lifts to ivory so it reads on
 *   near-black, and the K keeps the clinic's own rose, lifted just enough to
 *   hold up against the dark. The wordmark is one colour throughout and no
 *   gold enters the mark: gold is the site's accent, and the logo stays the
 *   logo.
 *
 * Re-run this if the clinic sends revised artwork. Do not hand-edit the
 * PNGs: the coordinates below are measured against this exact source file,
 * so different artwork needs them re-measured (an ink-pixel bounding box,
 * the widest empty column run splits mark from wordmark, and the empty row
 * runs split the two lines of type).
 */
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2] ? resolve(process.argv[2]) : `${ROOT}/assets/brand/kheni-logo-original.png`;
const OUT = `${ROOT}/public/brand`;
const APP = `${ROOT}/src/app`;
mkdirSync(OUT, { recursive: true });

/** Measured zones in the source artwork. */
const FULL = { left: 138, top: 594, width: 2030, height: 442 };
const MARK = { left: 138, top: 614, width: 452, height: 421 };
/** Absolute y of the gap between the two lines of the wordmark. */
const LINE_SPLIT_Y = 852;
/** A pixel is "rose" when red runs this far ahead of green and blue. */
const ROSE_EDGE = 22;

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

/**
 * The clinic's own colours, unchanged. This is the supplied artwork.
 */
const LIGHT = {
  line: hex("#2a2320"),      // logo charcoal, warmed a touch to sit on ivory
  rose: hex("#9b6665"),      // the logo's own rose. Never repainted.
  line2: hex("#2a2320"),
};
/**
 * The reverse treatment, for the black header, menu and footer.
 *
 * The doctor asked for the original logo back, so this is a straight reverse
 * rather than a re-colour: the linework lifts to ivory so it reads on
 * near-black, and the K keeps the clinic's own rose, lifted just enough to
 * hold up against the dark. The wordmark is not split into two colours and
 * no gold is introduced into the mark. Gold is the site's accent; the logo
 * stays the logo.
 */
const DARK = {
  line: hex("#faf8f5"),      // ivory linework
  rose: hex("#bc8384"),      // the logo's rose, lifted to read on near-black
  word1: hex("#faf8f5"),     // KHENI DENTAL &
  word2: hex("#faf8f5"),     // ELITE IMPLANT CENTER, one colour with line 1
};

/**
 * Repaint the artwork zone by zone, keeping every original alpha value.
 * `mode` is "light" (clinic colours) or "dark" (reverse treatment).
 * `box` is the crop; `absTop` lets the row test work in source coordinates.
 */
async function recolour(box, mode) {
  const { data, info } = await sharp(SRC).extract(box).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  const markRight = 589 - box.left; // mark/wordmark boundary, in crop space
  for (let y = 0; y < info.height; y++) {
    const absY = box.top + y;
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      if (a === 0) { out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 0; continue; }
      const roseness = Math.max(0, Math.min(1, (r - (g + b) / 2) / ROSE_EDGE));
      const inMark = x <= markRight;
      let ink;
      if (mode === "light") {
        ink = LIGHT.line;
      } else if (inMark) {
        ink = DARK.line;
      } else {
        ink = absY < LINE_SPLIT_Y ? DARK.word1 : DARK.word2;
      }
      const rose = mode === "light" ? LIGHT.rose : DARK.rose;
      out[i] = Math.round(ink[0] * (1 - roseness) + rose[0] * roseness);
      out[i + 1] = Math.round(ink[1] * (1 - roseness) + rose[1] * roseness);
      out[i + 2] = Math.round(ink[2] * (1 - roseness) + rose[2] * roseness);
      out[i + 3] = a;
    }
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}

const pngOpts = { compressionLevel: 9, palette: false };

async function emit(name, box, mode, widths) {
  for (const w of widths) {
    const img = await recolour(box, mode);
    await img.resize({ width: w, kernel: "lanczos3" }).png(pngOpts).toFile(`${OUT}/${name}-${w}w.png`);
  }
}

await emit("kheni-logo-light", FULL, "light", [320, 640]);
await emit("kheni-logo-dark", FULL, "dark", [320, 640]);
await emit("kheni-mark-light", MARK, "light", [96, 192]);
await emit("kheni-mark-dark", MARK, "dark", [96, 192]);

/**
 * App icon: the mark in its dark treatment on the site's ink, full bleed so
 * it still reads at 16px. Scaled to fill most of the tile because a thin
 * line drawing shrinks badly; thickening the strokes was tried and collapsed
 * the shape, so scale does the work instead.
 */
async function appIcon(size, scale, file) {
  const inner = Math.round(size * scale);
  const mark = await (await recolour(MARK, "dark")).resize({ width: inner, kernel: "lanczos3" }).png().toBuffer();
  const h = Math.round(inner / (MARK.width / MARK.height));
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 11, g: 9, b: 8, alpha: 1 } } })
    .composite([{ input: mark, left: Math.round((size - inner) / 2), top: Math.round((size - h) / 2) }])
    .png(pngOpts)
    .toFile(file);
}
await appIcon(512, 0.88, `${APP}/icon.png`);
await appIcon(180, 0.74, `${APP}/apple-icon.png`);
await appIcon(512, 0.88, `${OUT}/kheni-icon-512.png`);
await appIcon(192, 0.88, `${OUT}/kheni-icon-192.png`);

/** favicon.ico as a PNG-in-ICO container: 16, 32 and 48, read by every modern browser. */
const sizes = [16, 32, 48];
const buffers = [];
for (const s of sizes) {
  const inner = Math.round(s * 0.88);
  const mark = await (await recolour(MARK, "dark")).resize({ width: inner, kernel: "lanczos3" }).png().toBuffer();
  const h = Math.round(inner / (MARK.width / MARK.height));
  buffers.push(
    await sharp({ create: { width: s, height: s, channels: 4, background: { r: 11, g: 9, b: 8, alpha: 1 } } })
      .composite([{ input: mark, left: Math.round((s - inner) / 2), top: Math.round((s - h) / 2) }])
      .png()
      .toBuffer(),
  );
}
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buffers[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buffers[i].length;
  return e;
});
writeFileSync(`${APP}/favicon.ico`, Buffer.concat([header, ...entries, ...buffers]));

console.log(`brand assets written from ${SRC}`);
