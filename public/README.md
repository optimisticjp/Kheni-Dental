# Public assets

## Photography

Live photography sits under `images/`, organised by where it appears:

- `images/treatments/` object photographs for seven treatments (an implant,
  an aligner, crowns, a toothbrush, chai, a mirror, a shade guide). The
  other four treatments borrow a real clinic frame from Instagram.
- `images/locations/` three interiors per clinic
- `images/international/` the NRI page
- `images/instagram/` the clinic's own poster frames for the @khenielite
  Reels listed in `src/content/instagram.ts`, saved at 540px with a 360px
  variant beside each
- `images/doctors/`, `images/home/`, `images/about/` are empty on purpose.
  They held generated placeholder faces, which have been removed. Real
  portraits and clinic photographs go here when the clinic sends them.
- `images/og-default.jpg` the picture shown when the site is shared

Every slot resolves through `src/content/photos.ts`, so replacing a picture
is one line there plus the file. Alt text and the crop position live in that
file too.

## Adding a photograph

1. Drop the file in under the right folder.
2. Run `node scripts/resize-images.mjs`. It writes the `-640w` and `-1024w`
   variants that `srcSet` depends on. (The Instagram folder is skipped; its
   posters keep their own `-360w` variant.)
3. Wire it in `src/content/photos.ts` with alt text and, if the crop matters,
   an `objectPosition`.

## Adding an Instagram Reel

1. Open the Reel on instagram.com and copy the shortcode from its URL.
2. Save the Reel's own cover frame as `images/instagram/<shortcode>.jpg`
   (540px wide) and `<shortcode>-360w.jpg`.
3. Add the entry to `src/content/instagram.ts`. The build refuses a
   shortcode that is not from @khenielite or a link that is not instagram.com.

## Still to come

- `images/cases/` before and after photography, only with written patient
  consent. Nothing renders until then.
- `brand/` approved logo files.
