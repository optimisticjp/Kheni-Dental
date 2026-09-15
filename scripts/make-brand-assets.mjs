/**
 * Build every brand asset from the clinic's original logo.
 *
 *   node scripts/make-brand-assets.mjs [path-to-logo.png]
 *
 * The clinic supplied one high-resolution PNG: charcoal linework and a rose
 * "K" swoosh on a transparent background, with the tooth interior open
 * rather than filled white. That last detail is why the artwork reverses
 * onto near-black cleanly instead of showing a knocked-out box.
 *
 * From it this writes:
 *   public/images/brand/kheni-logo-{ivory,ink}-{320,640}w.png   full lockup
 *   public/images/brand/kheni-mark-{ivory,ink}-{96,192}w.png    mark alone
 *   public/images/brand/kheni-icon-{192,512}.png                app icons
 *   src/app/icon.png, apple-icon.png, favicon.ico               browser icons
 *
 * Re-run it if the clinic sends revised artwork. Do not hand-edit the PNGs:
 * the box coordinates below are measured against this exact source file, so
 * a different file needs them re-measured (an ink-pixel bounding box, and
 * the widest empty column run splits the mark from the wordmark).
 */
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2] ? resolve(process.argv[2]) : `${ROOT}/assets/brand/kheni-logo-original.png`;
const OUT = `${ROOT}/public/images/brand`;
const APP = `${ROOT}/src/app`;
mkdirSync(OUT, { recursive: true });

// Boxes measured from the source (see probe-logo.mjs).
const FULL = { left: 138, top: 594, width: 2030, height: 442 };
const MARK = { left: 138, top: 614, width: 452, height: 421 };

const hex = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
const INK_DARK  = hex("#2f2d2a"); // charcoal for light surfaces, nudged to the site's warm ink
const ROSE_DARK = hex("#9c6a6b"); // the logo's own rose
const INK_LIGHT = hex("#fbfaf7"); // ivory, for dark surfaces
const ROSE_LIGHT= hex("#bc8384"); // the rose lifted so it holds up on near-black

/**
 * Recolour the two-tone artwork while keeping its alpha, which is where all
 * the anti-aliasing lives. Roseness separates the K swoosh (r well above g,b)
 * from the charcoal linework (r = g = b).
 */
async function recolour(box, inkRGB, roseRGB) {
  const { data, info } = await sharp(SRC).extract(box).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    if (a === 0) { out[i]=0; out[i+1]=0; out[i+2]=0; out[i+3]=0; continue; }
    const w = Math.max(0, Math.min(1, (r - (g + b) / 2) / 44));
    out[i]   = Math.round(inkRGB[0] * (1-w) + roseRGB[0] * w);
    out[i+1] = Math.round(inkRGB[1] * (1-w) + roseRGB[1] * w);
    out[i+2] = Math.round(inkRGB[2] * (1-w) + roseRGB[2] * w);
    out[i+3] = a;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}

const png = (p) => ({ compressionLevel: 9, palette: false, ...p });

async function emit(name, box, ink, rose, widths) {
  for (const w of widths) {
    const img = await recolour(box, ink, rose);
    const file = `${OUT}/${name}-${w}w.png`;
    await img.resize({ width: w, kernel: "lanczos3" }).png(png({})).toFile(file);
  }
}

// Full lockup, both tones.
await emit("kheni-logo-ivory", FULL, INK_LIGHT, ROSE_LIGHT, [320, 640]);
await emit("kheni-logo-ink",   FULL, INK_DARK,  ROSE_DARK,  [320, 640]);
// Mark alone, both tones.
await emit("kheni-mark-ivory", MARK, INK_LIGHT, ROSE_LIGHT, [96, 192]);
await emit("kheni-mark-ink",   MARK, INK_DARK,  ROSE_DARK,  [96, 192]);

/** App icon: the mark in ivory on the site's ink, full bleed so it reads at 16px. */
async function appIcon(size, scale, file) {
  const inner = Math.round(size * scale);
  const mark = await (await recolour(MARK, INK_LIGHT, ROSE_LIGHT))
    .resize({ width: inner, kernel: "lanczos3" }).png().toBuffer();
  const h = Math.round(inner / (MARK.width / MARK.height));
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 13, g: 13, b: 12, alpha: 1 } } })
    .composite([{ input: mark, left: Math.round((size - inner) / 2), top: Math.round((size - h) / 2) }])
    .png(png({})).toFile(file);
}
await appIcon(512, 0.88, `${APP}/icon.png`);
await appIcon(180, 0.74, `${APP}/apple-icon.png`);
await appIcon(512, 0.88, `${OUT}/kheni-icon-512.png`);
await appIcon(192, 0.88, `${OUT}/kheni-icon-192.png`);

/** favicon.ico as a PNG-in-ICO container: 16, 32 and 48, all modern browsers read it. */
const sizes = [16, 32, 48];
const buffers = [];
for (const s of sizes) {
  const inner = Math.round(s * 0.88);
  const mark = await (await recolour(MARK, INK_LIGHT, ROSE_LIGHT)).resize({ width: inner, kernel: "lanczos3" }).png().toBuffer();
  const h = Math.round(inner / (MARK.width / MARK.height));
  buffers.push(await sharp({ create: { width: s, height: s, channels: 4, background: { r: 13, g: 13, b: 12, alpha: 1 } } })
    .composite([{ input: mark, left: Math.round((s - inner) / 2), top: Math.round((s - h) / 2) }])
    .png().toBuffer());
}
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s === 256 ? 0 : s, 0); e.writeUInt8(s === 256 ? 0 : s, 1);
  e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buffers[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += buffers[i].length;
  return e;
});
writeFileSync(`${APP}/favicon.ico`, Buffer.concat([header, ...entries, ...buffers]));

console.log(`brand assets written from ${SRC}`);
