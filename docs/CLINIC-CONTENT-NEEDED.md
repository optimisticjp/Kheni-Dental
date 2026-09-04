# What the clinic still needs to send

The V4 site is designed so that every item below drops straight into an
existing slot. Nothing here is invented, guessed at, or filled in from
general dental knowledge. Until a line is confirmed, the site simply does
not make that claim: the slot shows an illustration or a colour field, or
the section is hidden.

Everything on the site today is either clinic-provided (doctors, clinics,
hours, phones, the 15 years) or independently verifiable (Google ratings and
review counts, checked 29 August 2026; the clinic's own YouTube Shorts).

---

## 1. Photography

The single biggest upgrade. Every photo slot is a `MediaFrame` with a
designed colour field and the monogram; a real photograph replaces it by
passing `src` and `alt`, with `objectPosition` for the crop. Slots are
art-directed for both a portrait and a wide crop, so one shot works on a
phone and a desktop.

### Doctor photos
- [ ] **Dr. Mayur Kheni**: portrait (4:5) and a wider working shot (16:10)
- [ ] Dr. Jinal Monapara: portrait and working shot
- [ ] Dr. Ishita Dobariya: portrait, ideally with a child patient (with consent)
- [ ] Dr. Parita Vastarpara: portrait and working shot

### Clinic photos, both branches
- [ ] Exterior, so patients recognise the door (Swastik Plaza and Hirabaug)
- [ ] Reception and waiting area
- [ ] Treatment rooms
- [ ] Implant room at Hirabaug
- [ ] Sterilisation area
- [ ] Patient consultation in progress (with consent)
- [ ] Team photo, everyone together

### Treatment photography (optional)
- [ ] One real photograph per treatment to replace the illustration on its
      poster and page: implants, root canal, braces, smile design, full
      mouth, crowns, kids, gums, wisdom tooth, check-up, fillings

## 2. Numbers

Only published once confirmed in writing. The site currently states none of
these and looks finished without them.

- [ ] Patients treated (approximate, honest)
- [ ] Implants placed
- [ ] Full mouth cases
- [ ] Root canals
- [ ] Smile design cases
- [ ] Children treated
- [ ] NRI and international patients, and which countries they come from

Already published and verified: 15 years, 4 dentists, 2 clinics, 4.9 on
Google across 1,963 reviews on two listings (Yogi Chowk 1,753, Hirabaug
210, checked 29 August 2026). Please re-check both listings before launch
and note the date.

## 3. Before and after cases

Each case needs, in writing, to be added to `src/content/cases.ts`:

- [ ] Before and after photographs, same angle and lighting
- [ ] Treatment (implants, full mouth, smile design, crowns, braces)
- [ ] Which doctor, which branch
- [ ] The patient's starting concern, in their words if possible
- [ ] One line on the result, no superlatives
- [ ] Number of visits and rough timeline, if tracked
- [ ] When the "after" photograph was taken
- [ ] **Written patient consent to publish**

The before/after slider is built and demonstrated with a plain illustration
until real cases arrive. No synthetic patient images will ever be used.

## 4. Videos

The homepage and reviews page already show real Shorts from the clinic's
YouTube channel. For patient testimonials the site can add:

- [ ] Patient video testimonials: YouTube link, patient first name, treatment,
      language, and **written consent**
- [ ] Doctor tip videos: link and topic
- [ ] Clinic tour or "a day at Kheni" video

Instagram (@khenielite) is linked but not embedded. Public Reels can be
linked if wanted.

## 5. Technology and implant systems

Nothing is published. No scanner, imaging system, guided surgery, immediate
loading or brand appears anywhere.

- [ ] Each machine: exact manufacturer and model, which clinic, a photograph,
      and what it lets the dentist see or do for the patient
- [ ] Implant systems: brand and system, which clinic, and permission to use
      the logo
- [ ] Any technique the clinic wants named (with the wording it is happy to
      stand behind)
- [ ] Implant warranty terms, if any, in writing

## 6. Doctors

- [ ] Any postgraduate training, fellowships or certifications, with the
      issuing body (nothing beyond B.D.S. is published today)
- [ ] Professional memberships
- [ ] State dental council registration numbers, if the clinic wants them shown
- [ ] Which days each doctor is at which clinic
- [ ] Languages each doctor consults in (site says Gujarati, Hindi, English)

## 7. NRI and international patients

The site says only what is confirmed: plan on WhatsApp before travelling,
consultations in three languages, staged treatment explained, follow-up by
WhatsApp. It does **not** claim airport pickup, hotels, visa letters, 24x7
support or countries served. To add any of these:

- [ ] Countries patients actually travel from
- [ ] Travel assistance actually provided (pickup, accommodation help, visa letter)
- [ ] Follow-up arrangements after the patient returns home
- [ ] A planning workflow the clinic follows (records requested, timelines)

## 8. Aftercare guides

Four guides are published (first visit, after a root canal, thinking about
implants, bringing a child in, plus the urgent-signs list). The rest are
listed in `src/content/patient-resources.ts` as pending and hidden from
visitors until the clinic supplies its own wording:

- [ ] After a tooth is removed
- [ ] After cleaning and scaling
- [ ] After a crown or bridge
- [ ] Cleaning around an implant, and implant maintenance intervals
- [ ] Brushing guide by age (Dr. Ishita)
- [ ] Cleaning with braces, aligner care, retainers
- [ ] Nervous patients: what the clinic offers
- [ ] Out-of-hours contact and what to do when the clinic is closed

## 9. Hours and availability

- [ ] Confirm Mon to Sat, 9:30 AM to 1:00 PM and 4:00 PM to 8:00 PM for both branches
- [ ] Sunday and public holiday arrangements
- [ ] Emergency contact

## 10. Prices

By the doctor's instruction, no prices, "starting from" figures, EMI or
"free consultation" appear on the site, and the build fails if one is
added. The FAQ answers "How is cost decided?" without numbers.

---

## Before launch

- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true`. Until then the site carries
      `<meta name="robots" content="noindex, nofollow">` and a robots.txt that
      names Googlebot, Bingbot and the rest individually. Both are needed:
      Cloudflare's managed robots.txt prepends its own `User-agent: *` group
      with `Allow: /`, which would otherwise win over ours.
- [ ] Set `NEXT_PUBLIC_ENABLE_SCHEMA=true`
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.khenidentalcare.com`
- [ ] In Cloudflare, turn on "Always Use HTTPS" so `http://` requests redirect
      to `https://` (the apex to www redirect already works and preserves
      paths and query strings; plain HTTP currently serves the site without
      redirecting)
- [ ] Re-check both Google review counts and update the verified date
