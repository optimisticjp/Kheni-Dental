/**
 * Build every brand asset from the clinic's logo.
 *
 *   node scripts/make-brand-assets.mjs
 *
 * TWO SOURCE FILES, ONE DRAWING
 * -----------------------------
 * The clinic has supplied its logo twice. Both files are the same drawing,
 * line for line, and both are kept:
 *
 *   assets/brand/kheni-logo-original.png       2304 x 1629, transparent
 *     The geometry master. High resolution with a real alpha channel, which
 *     is where every anti-aliased edge lives. The accent (the swoosh through
 *     the tooth and the K) is a dusty rose here.
 *
 *   assets/brand/kheni-logo-gold-original.png  1491 x 1055, flattened on black
 *     The colour master, supplied 18 September 2026. The accent is gold with
 *     a gradient, and the linework is charcoal. Lower resolution, no alpha,
 *     so it cannot carry the geometry.
 *
 * The two were checked against each other before this script was written:
 * scaled and overlaid, the ink masks agree to within a third of a percent on
 * aspect ratio, and the gold in the new file occupies exactly the zone the
 * rose occupies in the old. So the revision is a recolour, not a redraw.
 *
 * That is why this takes the shape it does: geometry and alpha come from the
 * transparent file, colour comes from the gold one. Nothing is traced and
 * nothing is redrawn. The tooth, the implant post, the K and the wording are
 * the clinic's.
 *
 * MEASURED ZONES, in geometry-master coordinates
 *   x <= 589            the mark (tooth + K)
 *   x >= 635            the wordmark
 *   y 594..794          wordmark line 1, "KHENI DENTAL &"
 *   y 910..1035         wordmark line 2, "ELITE IMPLANT CENTER"
 *   r - (g+b)/2 > 22    an accent pixel rather than a linework one
 *
 * The last test is the important one. It finds the rose in the geometry
 * master, and the rose is the gold: same pixels, different paint. So it is
 * the accent mask for both files and the gold ramp is laid straight into it.
 *
 * THE GOLD RAMP is measured out of the colour master at run time rather than
 * typed here, so another recolour from the clinic is picked up by re-running
 * this. It runs light at the top left to deep at the bottom right, which is
 * the axis the artwork itself uses.
 *
 * LIGHT TREATMENT, for ivory, white, sand and the five light fields
 *   Charcoal linework, gold accent. The gold is stepped down the ramp
 *   because the artwork's own gold was drawn for black: at 1.32:1 on ivory
 *   its lightest point would vanish. The stepped ramp holds at least 3:1 as
 *   a graphic on every light surface the site uses, sand and lavender
 *   included, and keeps the sheen and the direction of the original.
 *
 * DARK TREATMENT, for the black header, mobile menu and footer
 *   The artwork's gold ramp verbatim, because it was drawn for black and
 *   clears 5.97:1 at its deepest point on the site's ink. The linework
 *   lifts out of the artwork's charcoal, which reads 1.64:1 on ink and
 *   would be a smudge at header size. The tooth is held a step back from
 *   the wordmark so the gold still leads, the way it does in the artwork.
 *
 * Re-run this if the clinic sends revised artwork. Do not hand-edit the
 * PNGs. If the revision changes the drawing rather than the colour, the
 * coordinates below need re-measuring against it: an ink-pixel bounding box,
 * the widest empty column run splits mark from wordmark, and the empty row
 * runs split the two lines of type.
 */
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { readPalette } from "./lib/read-palette.mjs";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const { need } = readPalette();

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
/** Geometry and alpha. */
const SRC = process.argv[2] ? resolve(process.argv[2]) : `${ROOT}/assets/brand/kheni-logo-original.png`;
/** Colour. */
const COLOUR_SRC = process.argv[3] ? resolve(process.argv[3]) : `${ROOT}/assets/brand/kheni-logo-gold-original.png`;
const OUT = `${ROOT}/public/brand`;
const APP = `${ROOT}/src/app`;
mkdirSync(OUT, { recursive: true });

/** Measured zones in the geometry master. */
const FULL = { left: 138, top: 594, width: 2030, height: 442 };
const MARK = { left: 138, top: 614, width: 452, height: 421 };
/** Absolute y of the gap between the two lines of the wordmark. */
const LINE_SPLIT_Y = 852;
/** A pixel is "accent" when red runs this far ahead of green and blue. */
const ACCENT_EDGE = 22;

/** The accent's own zone in the colour master, for measuring the ramp. */
const COLOUR_MARK = { left: 87, top: 395, width: 296, height: 276 };

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * Read the gold ramp out of the colour master.
 *
 * Only pixels with real chroma and real coverage count, so anti-aliased
 * edges and the charcoal linework stay out of the sample. The ends of the
 * ramp are taken at the 4th and 96th percentile of luminance rather than the
 * extremes, because the extremes are single stray pixels. The axis weights
 * come from how fast luminance falls across the accent in x against y, which
 * is what makes the sheen run corner to corner rather than straight down.
 */
async function measureRamp() {
  const { data, info } = await sharp(COLOUR_SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = [];
  for (let y = COLOUR_MARK.top; y < COLOUR_MARK.top + COLOUR_MARK.height; y++) {
    for (let x = COLOUR_MARK.left; x < COLOUR_MARK.left + COLOUR_MARK.width; x++) {
      const i = (y * info.width + x) * 3;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const L = lum(r, g, b);
      if (r - b > 60 && L > 90) px.push({ x: x - COLOUR_MARK.left, y: y - COLOUR_MARK.top, r, g, b, L });
    }
  }
  if (px.length < 2000) throw new Error(`only ${px.length} accent pixels found in ${COLOUR_SRC}; re-measure COLOUR_MARK`);

  const byL = [...px].sort((a, b) => a.L - b.L);
  const at = (p) => {
    const s = byL[Math.floor(p * (byL.length - 1))];
    return [s.r, s.g, s.b];
  };
  const slope = (key) => {
    const mk = px.reduce((s, v) => s + v[key], 0) / px.length;
    const mL = px.reduce((s, v) => s + v.L, 0) / px.length;
    let num = 0, den = 0;
    for (const p of px) { num += (p[key] - mk) * (p.L - mL); den += (p[key] - mk) ** 2; }
    return Math.abs(num / den);
  };
  const wx = slope("x") * COLOUR_MARK.width;
  const wy = slope("y") * COLOUR_MARK.height;
  return { light: at(0.96), deep: at(0.04), axis: { x: wx / (wx + wy), y: wy / (wx + wy) } };
}

const ramp = await measureRamp();
const fmt = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
console.log(`gold ramp measured: ${fmt(ramp.light)} -> ${fmt(ramp.deep)}, axis ${ramp.axis.x.toFixed(2)}x + ${ramp.axis.y.toFixed(2)}y`);

/**
 * The light treatment, for ivory, white, sand and the five light fields.
 *
 * The artwork's gold was drawn for black and is far too light for ivory, so
 * the ramp is stepped down while its direction and its spread are kept. Both
 * ends were contrast-solved: the lighter end clears 3:1 on every light
 * surface the site uses, sand at 3.18:1 and lavender at 3.24:1 being the
 * tightest, and the deeper end sits at 5.28:1 on ivory.
 *
 * Those two values live in globals.css rather than here, so the palette has
 * one source of truth and scripts/contrast-report.mjs can hold them to the
 * same threshold as every other colour on the site.
 */
const LIGHT = {
  line: hex("#2a2320"),  // the artwork's charcoal, warmed to sit on ivory. 14.6:1, so nothing to solve
  goldLight: hex(need("--brand-logo-gold-light")),
  goldDeep: hex(need("--brand-logo-gold-deep")),
};

/**
 * The reverse treatment, for the black header, mobile menu and footer.
 *
 * The gold is the artwork's own ramp, untouched, because black is what it
 * was drawn for. The linework cannot be: the artwork's charcoal reads
 * 1.64:1 on the site's ink and disappears at the size the header renders
 * the logo. So it lifts, and the tooth lifts one step less than the
 * wordmark, which keeps the gold leading the way it does in the artwork
 * while the words stay readable.
 */
const DARK = {
  line: hex("#e9e3da"),        // the tooth and the implant post. 16.0:1 on ink
  word1: hex("#faf8f5"),       // KHENI DENTAL &. 18.8:1
  word2: hex("#faf8f5"),       // ELITE IMPLANT CENTER, one colour with line 1
  goldLight: ramp.light,
  goldDeep: ramp.deep,
};

/**
 * Repaint the artwork zone by zone, keeping every original alpha value.
 * `mode` is "light" or "dark". `box` is the crop.
 *
 * The gold is a gradient rather than a flat fill, and its position is worked
 * out in the mark's own coordinates rather than the crop's, so the sheen
 * falls in the same place whether the mark is cropped on its own or rendered
 * inside the full lockup.
 */
async function recolour(box, mode) {
  const { data, info } = await sharp(SRC).extract(box).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  const markRight = 589 - box.left; // mark/wordmark boundary, in crop space
  const paint = mode === "light" ? LIGHT : DARK;
  for (let y = 0; y < info.height; y++) {
    const absY = box.top + y;
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      if (a === 0) { out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 0; continue; }
      const accent = Math.max(0, Math.min(1, (r - (g + b) / 2) / ACCENT_EDGE));
      const inMark = x <= markRight;
      let ink;
      if (mode === "light") {
        ink = LIGHT.line;
      } else if (inMark) {
        ink = DARK.line;
      } else {
        ink = absY < LINE_SPLIT_Y ? DARK.word1 : DARK.word2;
      }
      // Position along the artwork's own sheen axis, in mark coordinates.
      const t = Math.max(0, Math.min(1,
        ramp.axis.x * ((box.left + x - MARK.left) / MARK.width) +
        ramp.axis.y * ((absY - MARK.top) / MARK.height)));
      const gold = mix(paint.goldLight, paint.goldDeep, t);
      out[i] = Math.round(ink[0] * (1 - accent) + gold[0] * accent);
      out[i + 1] = Math.round(ink[1] * (1 - accent) + gold[1] * accent);
      out[i + 2] = Math.round(ink[2] * (1 - accent) + gold[2] * accent);
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

/**
 * The social preview card, 1200 x 630.
 *
 * This is the brand surface most of the clinic's patients meet first,
 * because the site gets forwarded on WhatsApp far more often than it gets
 * found on Google. It used to be a stock interior render with a blue chair
 * in it, which is neither the clinic nor the palette, and the file was
 * 1536 x 1024 while the page declared 1200 x 630, so every platform cropped
 * or letterboxed it.
 *
 * So it is the logo instead: the dark lockup on the site's ink, under the
 * same warm gold bloom the dark sections use, with the site's gold underline
 * beneath it. No text is drawn, because the lockup already carries the
 * clinic's name and this build should not depend on a font being installed.
 * When the clinic's own photography arrives, a card built on a real
 * photograph of a real reception will beat this, and it is worth revisiting
 * then.
 */
async function socialCard(file) {
  const W = 1200, H = 630;
  const bg = Buffer.alloc(W * H * 3);
  // .bloom-gold, ported: radial-gradient(60% 50% at 70% 10%, gold .20, transparent 70%)
  const cx = 0.7 * W, cy = 0.1 * H, rx = 0.6 * W, ry = 0.5 * H;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const d = Math.hypot((x - cx) / rx, (y - cy) / ry);
      const a = d >= 0.7 ? 0 : 0.2 * (1 - d / 0.7);
      const i = (y * W + x) * 3;
      bg[i] = Math.round(11 * (1 - a) + 225 * a);
      bg[i + 1] = Math.round(9 * (1 - a) + 175 * a);
      bg[i + 2] = Math.round(8 * (1 - a) + 74 * a);
    }
  }
  const lockW = 760;
  const lock = await (await recolour(FULL, "dark")).resize({ width: lockW, kernel: "lanczos3" }).png().toBuffer();
  const lockH = Math.round(lockW / (FULL.width / FULL.height));
  const top = Math.round(H / 2 - lockH / 2 - 24);
  const rule = await sharp({ create: { width: 132, height: 3, channels: 4, background: { r: 225, g: 175, b: 74, alpha: 1 } } }).png().toBuffer();
  await sharp(bg, { raw: { width: W, height: H, channels: 3 } })
    .composite([
      { input: lock, left: Math.round((W - lockW) / 2), top },
      { input: rule, left: Math.round((W - 132) / 2), top: top + lockH + 54 },
    ])
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(file);
}
await socialCard(`${OUT}/og-card.jpg`);

/**
 * favicon.ico as a PNG-in-ICO container: 16, 32 and 48, read by every modern
 * browser.
 *
 * Full bleed rather than the app icons' 0.88. A browser tab is the smallest
 * the mark is ever asked to work, and at 16px the tooth's thin linework
 * dissolved into grey with any padding at all. Five scales were rendered and
 * compared at 10x: the shape only holds when it fills the tile. Nothing here
 * is sharpened, because unsharp masking put a halo on the 48 to buy very
 * little on the 16.
 */
const sizes = [16, 32, 48];
const buffers = [];
for (const s of sizes) {
  const inner = s;
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

console.log(`brand assets written: geometry from ${SRC}, colour from ${COLOUR_SRC}`);
