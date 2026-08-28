# Clinic content needed

Internal working document. Not visitor-facing and not linked from the website.

Everything below is already built into the website and is rendering as a marked
placeholder. Each item says exactly what format we need, so filling it in is a
one-line change in the relevant content file. Nothing here has been guessed or
approximated: if it is on this list, we are not publishing anything for it.

Priority order: **numbers → photos → cases → prices → technology**. Those five
do the most work for patient trust.

---

## 1. Numbers

File: `src/content/clinic-proof.ts`

| What we need | Format | Example |
|---|---|---|
| Patients treated | Approved lifetime figure, rounded | `25,000+` |
| Implants placed | Approved lifetime count | `4,000+` |
| Full mouth cases | Approved count | `250+` |
| Smile makeovers | Approved count | `600+` |
| Root canals completed | Approved count | `12,000+` |
| Countries patients travel from | Count | `18+` |
| NRI patients treated | Approved count | `400+` |

Please give figures you are comfortable defending publicly. Rounded is fine and
normal. If a figure is not tracked, say so and we will remove that tile rather
than estimate it.

---

## 2. Google reviews, per branch

File: `src/content/site.ts`

- **Yogi Chowk / Swastik Plaza** — currently showing 4.9 from 1,593 reviews,
  captured 27 August 2026. Please confirm this is still correct before launch.
- **Hirabaug** — we could not confirm a live Google rating or review count for
  this profile. The card is built and shows a marked placeholder. We need:
  - current star rating
  - current review count
  - confirmation the profile link is the right one

Hirabaug will never display Yogi Chowk's rating. Until you confirm the figure,
that card stays marked as pending.

---

## 3. Photography

File: replaced wherever `MediaFrame` currently renders.

**Doctors** (one portrait each, same framing for all four)
- Dr. Mayur Kheni
- Dr. Jinal Monapara
- Dr. Ishita Dobariya
- Dr. Parita Vastarpara

Portrait orientation, plain or clinic background, good even light. Until these
arrive each profile shows the doctor's initials, which looks intentional but is
clearly not a photograph.

**Each clinic** (both Yogi Chowk and Hirabaug)
- Exterior with signage
- Reception
- Waiting area
- Treatment room
- Implant suite
- Sterilisation area
- Technology / equipment
- The team together

Please avoid stock images. Phone photos in good daylight are better than
nothing and we can retouch.

---

## 4. Before and after cases

File: `src/content/cases.ts`

Per case we need:
- Before photograph
- After photograph, same angle and similar lighting
- Treatment category (implants, full mouth, smile design, crowns, braces)
- What the patient came in with, one line
- What the result was, one line
- Which doctor treated it
- Which clinic
- When the after photo was taken, e.g. `4 months after fitting`
- Number of visits and over what period, if you track it
- **Written patient consent**

Nothing publishes without consent on file. Three cases per category is plenty
to start.

---

## 5. Patient testimonials

File: `src/content/patient-stories.ts`

**Written**, per testimonial:
- Patient first name (and initial)
- City
- Treatment
- Their words, one or two sentences
- Written consent

**Video**, per video:
- The video file or a YouTube link
- Patient first name
- Treatment
- Spoken language (Gujarati is the most useful for Surat)
- Written consent

Gujarati videos are worth prioritising. Do not script these; unpolished is more
convincing than rehearsed.

---

## 6. Prices and EMI

File: `src/content/pricing.ts`

| Treatment | What we need |
|---|---|
| Dental implant | Starting price, and an upper figure if you want a range |
| Root canal treatment | Starting price |
| Crown | Starting price |
| Braces and aligners | Starting price |
| Smile design | Starting price |
| Consultation | Fee, or confirm if there is none |

**Finance**
- Do you offer EMI at all?
- If yes, is it no-cost EMI?
- Which finance partners?
- Lowest realistic monthly figure
- What the quoted price includes

Every price on the site currently shows as a masked placeholder. We will not
publish a figure you have not approved.

---

## 7. Technology and implant systems

File: `src/content/capabilities.ts`

**Equipment** — for each machine you want listed:
- Its name
- What it lets the dentist assess, in one line
- What the patient experiences
- A photograph of the actual machine in your clinic

**Implant systems** — which brands do you use, and at which branch?

**Surgical options** — please confirm each of these separately, because each
one is a clinical claim we cannot publish without you:
- Digital or guided implant planning
- Bone grafting or ridge augmentation
- Immediate loading
- Any implant warranty you offer

---

## 8. Doctor credentials

File: `src/content/site.ts`

Confirmed already: name, B.D.S., specialty, years in practice.

Still needed per doctor:
- Postgraduate training or fellowships
- Professional memberships
- Certifications
- Awards
- Languages each doctor consults in
- Which branch, and which days

---

## 9. Awards and certifications

File: `src/content/clinic-proof.ts`

Any awards, accreditations or recognitions, with the issuing body and year.
If there are none, tell us and we will remove the strip.

---

## 10. Branch operations

File: `src/content/site.ts`

- Confirm current opening hours for both clinics
- Confirm both numbers are active on WhatsApp
- Which doctors sit at which branch, and on which days
- Which treatments are available at which branch

---

## 11. NRI and international

File: `src/content/pricing.ts` and the international page

- Airport to clinic distance and travel time
- Do you help with accommodation? If so, how?
- Typical treatment time required for implants and full mouth cases
- Countries patients most often travel from

---

## What we will not publish without you

For the record, none of the following appears anywhere on the site because
none of it is confirmed: implant brand names, CBCT or any named scanner,
guided surgery, All-on-4 or All-on-X, immediate loading, same-day teeth,
sedation, bone grafting as a service, success rates, implant or patient
counts, warranties, EMI, free consultation, consultation duration, awards,
fellowships and memberships.
