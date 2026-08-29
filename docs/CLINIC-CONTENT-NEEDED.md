# What we need from the clinic

Internal working document. Not visitor-facing and not linked from the website.

Everything on this list is **already built and already rendering** on the site as
a clearly marked placeholder. Nothing here has been guessed, rounded up or
approximated: if it appears below, we are publishing nothing for it.

Each item says the exact format we need, so filling one in is usually a
one-line change in a content file.

---

## Priority order

| # | What | Why it is first |
|---|---|---|
| 1 | **Photographs** | The single biggest visual gap. Every dashed frame on the site is a photo we do not have. |
| 2 | **Numbers** | Patients treated, implants placed, cases. Indian patients weigh these before anything else. |
| 3 | **Before & after cases** | The strongest proof a dental clinic can show, and we have none. |
| 4 | **Video testimonials** | Gujarati especially. More persuasive than any written copy we can produce. |
| 5 | **Prices and EMI** | The first question most patients ask and the one the site currently cannot answer. |
| 6 | **Technology and implant systems** | Turns the implant page from good to credible. |

---

## 1. Google reviews — ✅ COMPLETE

Both branches are now verified and live on the site.

| Branch | Rating | Reviews | Checked |
|---|---|---|---|
| Swastik Plaza, Yogi Chowk | 4.9 | 1,753 | 29 August 2026 |
| Hirabaug, Varachha Main Road | 4.9 | 210 | 29 August 2026 |

The site also shows a combined **1,963**, always labelled as the total across
two separate Google listings, never as one profile.

**Nothing needed from you.** Just tell us when the counts move enough to be
worth refreshing, or if either Google listing is ever merged or renamed.

---

## 2. Photographs

This is the biggest single thing you can send us. Phone photos in good daylight
are genuinely fine; we can retouch. Please avoid stock images entirely.

### Doctors — one portrait each

- Dr. Mayur Kheni
- Dr. Jinal Monapara
- Dr. Ishita Dobariya
- Dr. Parita Vastarpara

Portrait orientation, same framing for all four, plain or clinic background,
even light. Until these arrive each profile shows the doctor's initials.

### Each clinic — both Yogi Chowk and Hirabaug separately

1. Exterior with signage
2. Reception
3. Waiting area
4. Treatment room
5. Implant suite
6. Sterilisation area
7. Technology and equipment
8. The team together

Branch pages show these labelled per clinic, so we need both sets. A patient
should see the clinic they are actually walking into.

### Treatment photography — one per problem area

The "Problems we treat" section on the homepage has a photo slot per treatment:

Dental implants · Root canal · Smile design · Braces and aligners · Full mouth
rehab · Crowns and bridges · Kids dentistry · Gum care · Wisdom tooth ·
Check-ups and fillings

Real appointments, real clinic, patient consent where a face is visible.

---

## 3. Numbers

File: `src/content/clinic-proof.ts`

| What we need | Format | Example |
|---|---|---|
| Patients treated | Approved lifetime figure | `25,000+` |
| Implants placed | Approved lifetime count | `4,000+` |
| Full mouth cases | Approved count | `250+` |
| Smile makeovers | Approved count | `600+` |
| Root canals completed | Approved count | `12,000+` |
| Countries patients travel from | Count | `18+` |
| NRI patients treated | Approved count | `400+` |

Give us figures you are comfortable defending publicly. Rounded is normal and
expected. **If a figure is not tracked, say so and we will remove that tile
rather than estimate it.**

Indian digit grouping is fine and preferred: `1,75,000` reads better to a Surat
patient than `175,000`.

---

## 4. Before and after cases

File: `src/content/cases.ts`

The gallery now leads with **one featured case told as a story**, with the rest
behind it as an archive. So we need slightly more for the featured one.

**Every case:**

- Before photograph
- After photograph, same angle and similar lighting
- Category: implants, full mouth, smile design, crowns, or braces
- What the patient came in with, in their words if possible
- What the result was, one line
- Which doctor treated it
- Which clinic
- When the after photo was taken, e.g. `4 months after fitting`
- Number of visits and over what period, if you track it
- **Written patient consent**

**The featured case only, additionally:**

- What was actually done, in plain words
- The treatment stages in order (three to five is ideal)
- Why this approach was chosen over the alternatives
- Optionally, one sentence from the patient — in their words, never ours

Pick a case you are proud of and that a typical patient would recognise
themselves in. One strong case told properly beats twenty pairs of photographs.

Nothing publishes without consent on file.

---

## 5. Patient testimonials

File: `src/content/patient-stories.ts`

**Video** — the higher priority of the two:

- The video file or a YouTube link
- Patient first name
- Treatment
- Spoken language (Gujarati is the most useful for Surat)
- **Written consent**

Do not script these. Unpolished is more convincing than rehearsed.

**Written**:

- Patient first name and initial
- City
- Treatment
- Their words, one or two sentences
- **Written consent**

---

## 6. Prices and EMI

File: `src/content/pricing.ts`

| Treatment | What we need |
|---|---|
| Dental implant | Starting price, plus an upper figure if you want a range |
| Root canal treatment | Starting price |
| Crown | Starting price |
| Braces and aligners | Starting price |
| Smile design | Starting price |
| Consultation | Fee, or confirm there is none |

**Finance**

- Do you offer EMI at all?
- If yes, is it no-cost EMI?
- Which finance partners?
- Lowest realistic monthly figure
- What a quoted price includes

Every price on the site is a masked placeholder today. We will not publish a
figure you have not approved.

---

## 7. Technology and implant systems

File: `src/content/capabilities.ts`

**Equipment** — per machine you want listed:

- Its name
- What it lets the dentist assess or plan, in one line
- What the patient experiences
- A photograph of the actual machine in your clinic

**Implant systems** — which brands do you use, and at which branch? The site has
four logo plates waiting. This is the single most useful thing an implant
patient can compare between clinics.

**Surgical options** — please confirm each separately, because each one is a
clinical claim we cannot publish without you:

- Digital or guided implant planning
- Bone grafting or ridge augmentation
- Immediate loading
- Any implant warranty you offer

---

## 8. Doctor credentials

File: `src/content/site.ts`

Already confirmed and live: name, B.D.S., specialty, years in practice.

Still needed, per doctor:

- Postgraduate training or fellowships
- Professional memberships
- Certifications
- Awards
- Languages each doctor consults in
- **Which branch, and which days**

The branch-and-days one matters more than it looks: patients ask it constantly
and the site currently cannot answer it.

---

## 9. Awards and certifications

File: `src/content/clinic-proof.ts`

Any awards, accreditations or recognitions, with the issuing body and year.
If there are none, tell us and we will remove the strip rather than leave it
looking unfinished.

---

## 10. Branch operations

File: `src/content/site.ts`

- Confirm current opening hours for both clinics
- Confirm both numbers are active on WhatsApp
- Which doctors sit at which branch, on which days
- Which treatments are available at which branch
- Out-of-hours contact, and what a patient should do when the clinic is closed

---

## 11. NRI and international

File: `src/content/pricing.ts` and `/international-patients`

- Which countries patients most often travel from (six chips are waiting)
- How many NRI patients you have treated
- Airport to clinic distance and travel time
- Do you help arrange accommodation? If so, how?
- Do you provide visa or travel documentation letters?
- What support exists between appointments
- Typical treatment time for implants and full mouth cases

Everything in the "Practical support" block is currently marked unconfirmed,
because promising travel help you do not actually provide would be the worst
kind of thing to get wrong.

---

## 12. Treatment areas to confirm

The homepage rail shows these four as "also asked for", pending your word:

- Teeth Whitening
- Cleaning & Scaling
- Dentures
- Tooth Extraction

Tell us which of these you want published as their own treatment and we will
promote them to full panels with their own page.

---

## 13. Patient resource instructions

File: `src/content/patient-resources.ts`

Four guides are written and live. The rest need **your own aftercare wording**,
exactly as the team gives it in the chair. We have deliberately not written
these from general dental knowledge, because aftercare on the website that
contradicts what a patient was told in person is worse than no page at all.

Needed:

- If you are nervous about coming in
- After a tooth is removed
- After cleaning and scaling
- After a crown or bridge
- After a braces adjustment
- Kids: after a treatment
- Cleaning around an implant
- Long-term implant maintenance
- Brushing guide by age
- Cleaning with braces on
- Looking after aligners
- Retainers

Sending us the printed sheets you already hand out would cover most of this in
one go.

---

## 14. Social and video

Instagram: [@khenielite](https://www.instagram.com/khenielite)

If you want a "from the clinic" section, we need a handful of links or files:
doctor explaining a treatment, a patient testimonial, a before and after reel,
a clinic tour, kids dentistry, implant education.

---

## What we will not publish without you

For the record, none of the following appears anywhere on the site, because
none of it is confirmed: implant brand names, CBCT or any named scanner,
guided surgery, All-on-4 or All-on-X, immediate loading, same-day teeth,
sedation, bone grafting as a service, success rates, implant counts, patient
counts, case counts, warranties, EMI terms, free consultation, consultation
duration, awards, fellowships, memberships, doctor schedules, travel support,
or any country list.
