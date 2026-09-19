# Photographs still needed

Internal. Priority order. Every slot below already exists in the layout as a
`MediaFrame`; a real photograph drops in by adding `src`, `alt` and, where the crop
matters, `objectPosition` in `src/content/photos.ts`. Nothing on the site uses a
generated face, a stock patient or a borrowed clinical image.

What is on the site today and stays: the clinic's own logo (see below), five real
@khenielite Instagram stills (verified 14 September 2026), YouTube poster frames from
the clinic's own channel, object and interior photography that does not pretend to be
a person, monogram placeholders for the doctors, line diagrams, and the aerial map
frames.

## Logo

The clinic supplied its logo twice, and both files are kept:

| File | Supplied | What it is |
| --- | --- | --- |
| `assets/brand/kheni-logo-original.png` | 15 Sep 2026 | 2304 x 1629, transparent. The **geometry master**: high resolution with a real alpha channel. Accent is a dusty rose. |
| `assets/brand/kheni-logo-gold-original.png` | 18 Sep 2026 | 1491 x 1055, flattened on black. The **colour master**: gold accent with a gradient. |

They are the same drawing. Scaled and overlaid, the ink masks agree to within a
third of a percent on aspect ratio, and the gold occupies exactly the zone the rose
occupied. So the September 18 revision is a recolour, not a redraw, and the build
takes geometry and alpha from the first file and colour from the second. That is
also why the low-resolution second file costs nothing: it never carries an edge.

Every derived asset (both treatments, the mark on its own, the favicon, the app
icons and the social card) is built by `node scripts/make-brand-assets.mjs`.
If the clinic sends revised artwork, re-run that rather than editing the PNGs.

Still worth asking the clinic for, though nothing is blocked without them:

- [ ] A vector original (SVG, AI or EPS). The site uses PNG, which is fine at the
      sizes it renders, but a vector is what a printer or a signage company will ask
      for, and it would let the logo be recoloured in CSS.
- [ ] A square or stacked version of the lockup, if one exists. The supplied artwork
      is a wide horizontal lockup. One could be arranged here from the mark and the
      two lines of the wordmark, but rearranging a client's lockup without asking is
      not something to do quietly, so it has not been.
- [ ] Sign-off on the two website treatments. The clinic's artwork is gold on black
      and works as supplied on the dark header, menu and footer. On ivory it cannot
      be used as drawn: its lightest gold is 1.32:1 against ivory and disappears, and
      its charcoal wordmark reads 1.64:1 on the site's near-black. So the light
      lockup uses a deeper gold ramp and the dark one lifts the linework. Both are
      recorded in `docs/COLOUR-CONTRAST.md`. Worth showing the doctor side by side.

**Answered.** The earlier question about whether the rose in the mark was the
intended brand colour is settled: it is not. The 18 September artwork replaced it
with gold, which is the site's own accent, so the logo and the palette now agree.

## Priority list

1. ~~**Four doctor portraits.**~~ All four received 19 September 2026 and
   wired into `doctorPhotos`. Dr. Mayur and Dr. Jinali were identified by the
   name embroidered on the coat; Dr. Ishita and Dr. Parita were named by the
   clinic when it sent them, because neither coat carries a name.
2. ~~**Dr. Mayur Kheni working shot.**~~ Received 19 September 2026, cropped
   4:5 and now the About page hero.
3. **Yogi Chowk exterior**, so a first-time patient recognises the door at Swastik Plaza.
4. **Hirabaug exterior**, the entrance above Shiv Plywood on Varachha Main Road.
5. **Yogi Chowk reception and waiting area** (facilities ticked: waiting area, lift,
   digital payment).
6. **Hirabaug reception and waiting area.**
7. **One treatment room per clinic.** The Hirabaug alt text no longer calls it an
   "implant room" because page 12 did not tick "dedicated implant room".
8. **Sterilisation area**, pouches and autoclave (supports the technology section).
9. **Team photograph with all four dentists.** One arrived on 19 September
   2026 and is on the About page, but it is Dr. Mayur and Dr. Jinali with two
   of the clinic staff, so the caption says "the clinic team" rather than
   naming a line-up that is not all of them. Worth reshooting once all four
   dentists are in one frame.
10. **Consultation in progress** with a consenting patient, back of head or hands only
    if the patient prefers.
11. **Children's area or a child's visit** with parental consent (Dr. Ishita).
12. **Implant components or a guide** as objects on a tray (no patient).
13. **Aligner and retainer objects** for the braces page.
14. **A crown shade-matching moment** (hands and shade guide) for smile design.
15. **Consented before / after cases.** Same angle, same light, written consent, the
    treatment, the doctor, the clinic, and when the "after" was taken. Until these
    arrive the gallery shows neutral SAMPLE CASE frames, never a real mouth.

## Rules that continue

- Written consent on file for any patient who is identifiable.
- No stock people presented as staff or patients.
- No generated faces attached to a named dentist.
- Instagram stills only from @khenielite; each Reel is opened and checked before use.
- Alt text describes the picture, never sells.

---

## Exact sizes and formats

Every slot below is a real frame in the code, so these come from the aspect ratios
the site actually renders rather than a generic guess.

**Format.** Send the highest quality originals available. HEIC, RAW, PNG, whatever
the photographer hands over is fine; conversion happens here. The file that ends up
in the repo is always **JPEG, sRGB**, because `photoSrcSet` in
`src/components/kheni/media-frame.tsx` only builds responsive variants for `.jpg`.

**Sizes are minimums.** Larger is always fine. `scripts/resize-images.mjs` writes a
640w and a 1024w variant beside every file, so one file per slot is enough.

**Do not pre-crop.** Several slots crop the same file two or three ways, and the crop
point is set per photo in `src/content/photos.ts`.

### Doctor portraits: all four in, none outstanding

All four arrived on 19 September 2026, every one against the same wood
panel, which is what makes the roster read as one set.

| File | Source | Crop |
| --- | --- | --- |
| `dr-mayur-kheni.jpg` | 1333 x 2000 | off the bottom to 4:5 |
| `dr-jinali-monpara.jpg` | 1333 x 2000 | off the bottom to 4:5 |
| `dr-ishita-dobariya.jpg` | 1500 x 2000 | off the bottom to 4:5 |
| `dr-parita-vastarpara.jpg` | 1920 x 1280 | horizontal, centred on her |

`objectPosition` is per photograph, not shared, because the phone crop shows
only the middle half of the file and the four are framed slightly
differently. Dr. Ishita sits highest in her frame at 8%; the other three are
at 15%. Replacing a photograph means rechecking its percentage at 390px.

Permission: the clinic's form ticked photo permission only for Dr. Jinali
(p21), leaving pages 18, 24 and 27 blank. The clinic then sent all four
photographs itself, named, for publication, which is the practice supplying
them directly rather than the form being relied on.

These are cropped two ways: 4:5 on desktop and 16:10 on phones
(`doctor-spotlight.tsx`, `ratio="4 / 5" mobileRatio="16 / 10"`). A tight head and
shoulders survives the first and gets decapitated by the second. Shoot head and
mid-chest with real space left and right, eyes on the upper third. Same light, same
distance, same background for all four so the roster reads as one team.

Photo permission is ticked only for Dr. Jinali (form p21). Pages 18, 24 and 27 are
blank, so permission is still needed for the other three.

### Treatment photos, 6 missing. 2400 x 1600 (3:2)

Existing seven are 1536 x 1024. Each file is used twice: a 16:10 poster on the
treatments index and a 4:3 hero on its own page, 16:9 on phones.

| File | Subject |
| --- | --- |
| `root-canal-treatment-surat.jpg` | endodontic files or a rotary handpiece on a clean tray |
| `cosmetic-smile-dentistry.jpg` | shade guide and a hand, or veneer samples |
| `full-mouth-rehabilitation.jpg` | a full-arch model or a wax-up on a tray |
| `kids-dentistry-surat.jpg` | the child-height basin, small chair, or a reward jar |
| `teeth-whitening-surat.jpg` | whitening trays or the light unit |
| `dentures-surat.jpg` | a finished denture on a clean surface |

Objects and rooms only, no faces. Four of these currently borrow a real Instagram
frame and two fall back to an illustration, so nothing is blank today.

### Clinic interiors, 6 needed. 1600 x 1600 (1:1)

`hirabaug-1/2/3.jpg` (treatment room, sterilisation, reception) and
`swastik-plaza-1/2/3.jpg` (family treatment room, waiting area, child-height basin).
Square is unforgiving: shoot square-ish or centre the subject with room all round.

### Clinic exteriors, 2 needed. 2400 x 1600 (3:2)

`hirabaug-exterior.jpg` and `swastik-plaza-exterior.jpg`. Daylight, straight on,
signage legible, enough street that the building is placeable. A first-time patient
needs to recognise the door above Shiv Plywood, and the Swastik Plaza entrance.
No slot is wired for these yet; add the frames when the files arrive.

### Team photograph. 2400 x 1600 (3:2)

`team.jpg` arrived on 19 September 2026 and has its slot on the About page,
capped at `max-w-3xl` and landscape because at 4:5 the two people on the ends
get cropped out of their own picture. It shows Dr. Mayur, Dr. Jinali and two
of the clinic staff. Still worth a reshoot with all four dentists in frame.

### Before and after cases. 1600 x 1200 (4:3), two files per case

`case-01-before.jpg` / `case-01-after.jpg`. Same angle, same light, same distance.
Each case also needs the treatment, the treating doctor, the clinic, when the after
was taken, and written consent on file. The `CaseResult` type refuses a case without
`consentConfirmed: true`.

### Social preview image. 1200 x 630 (1.91:1)

**Fixed, and nothing is needed for now.** This used to be `og-default.jpg`, a stock
interior render with a blue chair in it, at 1536 x 1024 while `src/app/layout.tsx`
declared 1200 x 630, so WhatsApp and Twitter cropped or letterboxed it.

It is now `public/brand/og-card.jpg`, generated at the right size by
`scripts/make-brand-assets.mjs`: the dark lockup on the site's ink under the same
gold bloom the dark sections use. It lives under `brand/` rather than `images/`
because `scripts/resize-images.mjs` walks `images/` and would re-encode it.

This is the surface most patients meet first, because the site gets forwarded on
WhatsApp far more often than it gets found on Google. A card built on a real
photograph of a real reception would beat a logo on black, so it is worth
revisiting once the clinic's own photography arrives.

### Already covered, nothing needed

Instagram stills (five real @khenielite frames at 540 x 960 and 540 x 720), YouTube
poster frames from the clinic's own channel, the aerial map frames, and the logo.
