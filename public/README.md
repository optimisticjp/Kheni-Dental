# Public assets

## Photography

Live photography sits under `images/`, organised by where it appears:

- `images/home/` the homepage hero
- `images/doctors/` the four dentists
- `images/treatments/` one per treatment, used by both the poster and the page hero
- `images/locations/` three interiors per clinic
- `images/about/` the team
- `images/notables/` demo layer only, goes when that layer goes
- `images/international/` the NRI page
- `images/og-default.jpg` the picture shown when the site is shared

Every slot resolves through `src/content/photos.ts`, so replacing a picture is
one line there plus the file. Alt text and the crop position live in that file
too.

## Replacing a photograph

1. Drop the new file in with the same name.
2. Run `node scripts/resize-images.mjs`. It rewrites the `-640w` and `-1024w`
   variants that `srcSet` depends on, and re-encodes the original. Skipping
   this leaves the old crop being served at small sizes.
3. Check the crop. `objectPosition` in `photos.ts` decides which part of the
   picture survives, and one value has to work in every frame the picture
   appears in.

## Still to come

- `images/cases/` before and after photography, only with written patient
  consent. The gallery renders drawn frames until then.
- `brand/` approved logo files.
