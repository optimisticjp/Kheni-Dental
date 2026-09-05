import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

// Widths each slot actually renders at, on a 2x phone and on desktop.
//   tiles / rows / thumbnails  ~150-400 CSS px  -> 640 covers 2x
//   posters, clinic squares    ~400-700 CSS px  -> 1024
//   heroes                     full width       -> keep the original
const WIDTHS = [640, 1024];
const root = "public/images";

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith(".jpg") && !/-\d+w\.jpg$/.test(e.name)) yield p;
  }
}

let before = 0, made = 0;
for await (const file of walk(root)) {
  before += (await stat(file)).size;
  // Every variant is always written, even when the source is already narrower
  // than the target. `withoutEnlargement` means it is just a re-encode at the
  // source width, and it keeps the srcset in media-frame.tsx dumb: it can name
  // -640w and -1024w for any photo without checking whether they exist. The
  // portraits are 1024px wide, and skipping their -1024w variant is exactly
  // what put 404s in the console the first time round.
  for (const w of WIDTHS) {
    const out = file.replace(/\.jpg$/, `-${w}w.jpg`);
    await sharp(file).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
    made++;
  }
  // Re-encode the original at a sane quality too; ChatGPT output is not optimised.
  const buf = await sharp(file).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  if (buf.length < (await stat(file)).size) await sharp(buf).toFile(file);
}
console.log(`made ${made} variants; originals were ${(before / 1024 / 1024).toFixed(1)} MB`);
