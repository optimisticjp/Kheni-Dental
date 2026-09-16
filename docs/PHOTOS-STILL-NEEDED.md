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

The clinic supplied its logo on 15 September 2026. The original is kept at
`assets/brand/kheni-logo-original.png` and every derived asset (both tones, the mark
on its own, the favicon and app icons) is built from it by
`node scripts/make-brand-assets.mjs`. If the clinic ever sends revised artwork,
re-run that rather than editing the PNGs.

Still worth asking the clinic for, though nothing is blocked without them:

- [ ] A vector original (SVG, AI or EPS). The site uses PNG, which is fine at the
      sizes it renders, but a vector is what a printer or a signage company will ask
      for, and it would let the logo be recoloured in CSS.
- [ ] Confirmation that the rose in the mark is the intended brand colour. Since the
      September 2026 colour pass the whole site is built on it, so this is now a
      settled decision rather than an accident, but the clinic should still say so
      out loud.
- [ ] A square or stacked version of the lockup, if one exists. The supplied artwork
      is a wide horizontal lockup, which is why the social preview image
      (`public/images/og-default.jpg`) does not yet carry it.

## Priority list

1. **Four doctor portraits.** Dr. Mayur Kheni, Dr. Jinali Monpara, Dr. Ishita Dobariya,
   Dr. Parita Vastarpara. Photo permission is ticked Correct on pages 21, 24 and 27
   (page 18 blank for Dr. Mayur; please confirm). Head and shoulders, plain
   background, 4:5, at least 1600 px tall. Same light and distance for all four so the
   roster reads as one team.
2. **Dr. Mayur Kheni working shot** (16:10) for the principal-dentist spread.
3. **Yogi Chowk exterior**, so a first-time patient recognises the door at Swastik Plaza.
4. **Hirabaug exterior**, the entrance above Shiv Plywood on Varachha Main Road.
5. **Yogi Chowk reception and waiting area** (facilities ticked: waiting area, lift,
   digital payment).
6. **Hirabaug reception and waiting area.**
7. **One treatment room per clinic.** The Hirabaug alt text no longer calls it an
   "implant room" because page 12 did not tick "dedicated implant room".
8. **Sterilisation area**, pouches and autoclave (supports the technology section).
9. **Team photograph**, all four dentists and staff together.
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

### Doctor portraits, 4 needed, highest priority

`dr-mayur-kheni.jpg`, `dr-jinali-monpara.jpg`, `dr-ishita-dobariya.jpg`,
`dr-parita-vastarpara.jpg`. **2000 x 2500 (4:5).**

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

### Team photograph, 1. 2400 x 1600 (3:2)

`team.jpg`, all four dentists plus staff. Also needs a slot adding.

### Before and after cases. 1600 x 1200 (4:3), two files per case

`case-01-before.jpg` / `case-01-after.jpg`. Same angle, same light, same distance.
Each case also needs the treatment, the treating doctor, the clinic, when the after
was taken, and written consent on file. The `CaseResult` type refuses a case without
`consentConfirmed: true`.

### Social preview image. 1200 x 630 (1.91:1)

`og-default.jpg`. **There is a live mismatch here:** the file on disk is
1536 x 1024 (3:2) but `src/app/layout.tsx` declares 1200 x 630, so WhatsApp and
Twitter crop or letterbox it. Worth fixing with a proper card once a vector or
stacked lockup exists.

### Already covered, nothing needed

Instagram stills (five real @khenielite frames at 540 x 960 and 540 x 720), YouTube
poster frames from the clinic's own channel, the aerial map frames, and the logo.
