# What the clinic still needs to send

Everything below renders on the site the moment it arrives. Nothing here is
invented, guessed at, or filled in from general dental knowledge, and until a
line is confirmed the site simply does not make that claim.

## How to see the gaps

The site hides its own to-do notes from patients. To see them, build with:

    NEXT_PUBLIC_SHOW_CONTENT_GAPS=true

That turns on the "to confirm" tags, the placeholder figures, the equipment
and implant-system grids, the price table, and the before/after archive
shape. Leave it off — the default — and the site reads as finished.

---

## 1. Photography (the single biggest lever)

The site has no photographs. Every image slot is currently an editorial plate
with the brand monogram on it. Dropping real photos in is a data change: pass
`src` and `alt` to `MediaFrame`.

Shot list, in priority order:

- [ ] **Dr. Mayur Kheni**, portrait, working and posed
- [ ] The other three dentists, same treatment
- [ ] **Clinic exterior** at both branches, so patients recognise the door
- [ ] Reception and waiting area, both branches
- [ ] Treatment room, both branches
- [ ] The implant suite at Hirabaug
- [ ] The team together
- [ ] Equipment, once the machines are named (see 3)

## 2. Numbers we can publish

- [ ] Patients treated, approximate and honest
- [ ] Implants placed
- [ ] Full mouth cases
- [ ] Smile makeovers
- [ ] Root canals completed
- [ ] Countries NRI patients travel from
- [ ] NRI patients treated

Already published and verified: 15 years, 4 dentists, 2 clinics, 4.9 across
1,963 Google reviews (checked 29 August 2026).

## 3. Equipment and implant systems

Nothing is published here. No scanner, imaging system, CBCT, guided surgery,
All-on-4, immediate loading or implant brand appears anywhere on the site.

- [ ] Each machine: exact name, what it lets the dentist see, photograph
- [ ] Which implant systems you place, at which branch, with brand names
- [ ] Digital implant planning: do you, and what does it involve
- [ ] Bone procedures: which ones
- [ ] Immediate loading: do you offer it, and in which cases
- [ ] Implant warranty: exact terms, in writing

## 4. Credentials

- [ ] Professional memberships, per doctor
- [ ] Implantology training, with issuing body
- [ ] Certifications
- [ ] Awards or recognition

## 5. Prices

The site currently says cost depends on the case and invites a call, which is
honest. It will show a table instead once these exist.

- [ ] Dental implant, from and to
- [ ] Root canal treatment, from
- [ ] Crown, from
- [ ] Braces and aligners, from and to
- [ ] Full mouth rehabilitation, from
- [ ] Cleaning and scaling, from
- [ ] **EMI**: do you offer it, through whom, and on what terms. Nothing about
      finance is published until this is answered.

## 6. Before and after cases

Each case needs, in writing:

- [ ] Before and after photographs
- [ ] The patient's own words about the starting concern
- [ ] What was done
- [ ] Which doctor, which branch
- [ ] How long after treatment the "after" photo was taken
- [ ] Number of visits
- [ ] **Written patient consent to publish**

## 7. Patient stories

- [ ] Video stories, with consent
- [ ] Written testimonials, with consent and real first names

## 8. NRI and international

- [ ] Which countries patients actually travel from
- [ ] Airport pickup: do you arrange it
- [ ] Accommodation help: do you arrange it
- [ ] Visa letters: do you provide them
- [ ] Translation: which languages beyond Gujarati, Hindi and English

## 9. Aftercare guides

Twelve guides are still to be written, and they must come from the clinic's
own aftercare wording. Aftercare on the site that contradicts what a patient
was told in the chair is worse than no page at all.

## 10. Hours and availability

- [ ] Confirm Mon-Sat 9:30-13:00 and 16:00-20:00 for both branches
- [ ] Sunday and holiday arrangements
- [ ] Emergency and out-of-hours contact

---

## Before launch

- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true` (robots.txt currently blocks all)
- [ ] Set `NEXT_PUBLIC_ENABLE_SCHEMA=true`
- [ ] Point khenidentalcare.com at the Cloudflare Worker. It currently
      resolves to AWS addresses and does not serve the site.
