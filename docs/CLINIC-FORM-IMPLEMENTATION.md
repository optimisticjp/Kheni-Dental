# Clinic form implementation ledger

Internal working document. Not visitor-facing.

Source: `Kheni_Dental_Clinic_Website_Information_Form.pdf`, 68 pages, filled by the
clinic and returned 14 September 2026. Every page was read twice: once as extracted
text and once as a rendered page image, because the form was flattened (no form
fields survive) and most answers are hand-drawn blue ticks, crosses, dots or typed
text beside a printed option. A tick on "Correct" confirms the printed value. A tick
on "Change" plus typed text replaces it. A tick on "Do not show" hides it. A blank
row means the clinic gave no answer.

Branch: `claude/kheni-black-gold-content-pass`, created from
`6433ca97d7a0cf8463f011219fedf4e348f4799d` (the accepted black / ivory / gold build),
then merged to `main`. Search indexing stays off: every page carries
`noindex, nofollow` and robots.txt disallows the named crawlers.

## READ THIS FIRST: placeholder content renders unmarked

On the owner's instruction (15 September 2026) the SAMPLE and TO CONFIRM chips and
the review banner were removed, and every empty slot was filled with placeholder
content, so the design can be judged as a finished page. **Nothing on screen now
distinguishes a clinic fact from placeholder copy.**

Two things replace the visual markers:

1. Every placeholder item carries `status: "review_sample"` in
   `src/content/review-sample.ts`, and every unevidenced figure carries
   `verification: "clinic_supplied_needs_evidence"` in `src/content/clinic-proof.ts`.
2. `src/content/__checks__/content-integrity.check.ts` **fails the build** if
   `NEXT_PUBLIC_ALLOW_INDEXING` or `NEXT_PUBLIC_PRODUCTION` is `"true"` while any
   placeholder item, unevidenced figure, unverified credential, the placeholder
   warranty wording or a pending Google share link remains. It names every
   offender. Do not weaken it to get a build through.

Part 5 below is the full list of what is placeholder. Two slots were deliberately
NOT filled, because a fabricated version does real harm rather than looking
unfinished: clinical before/after photographs, and portraits of the four named
dentists. Both keep their designed frames.

## Status vocabulary

| Status | Meaning |
|---|---|
| CONFIRMED_BY_CLINIC | Ticked Correct, or typed, and safe to publish as fact. |
| CLINIC_SUPPLIED_NEEDS_PROOF | Typed by the clinic, but a volume, credential, warranty or statistic that needs evidence before production. Renders unmarked; tripped by the build guard until evidence arrives, or held back. |
| AMBIGUOUS | The mark on the page can be read more than one way. Safest reading chosen; question raised. |
| CONFLICT_IN_FORM | Two pages disagree. See the conflicts section. |
| BLANK_USE_REVIEW_SAMPLE | Left blank; placeholder content fills the slot so the page reads complete. It renders unmarked and blocks an indexable build. |
| BLANK_HIDE | Left blank; the slot stays hidden. |
| DO_NOT_SHOW | The clinic ticked Do not show. Never rendered. |
| EXTERNAL_VERIFY | Needs checking against Google, Instagram, YouTube or an official source. |
| REPLACED | An older website value replaced by a newer clinic answer. |
| REVIEW_LATER | The clinic gave no decision on an item that already exists; kept as is, flagged. |

Source priority used throughout: explicit typed answer, then explicit tick or
change, then previously confirmed repo facts (`SOURCE_FACTS.md`), then verifiable
public Google / Instagram / YouTube, then existing website copy, then review-only
sample. An older demo value never overrides a newer clinic answer.

---

## Part 1. Page-by-page ledger

Columns: page · topic · clinic answer (verbatim where typed) · status · website
value before this pass · decision · where it appears.

### Section A: Proof numbers (pages 2 to 6, 44 to 45)

| Page | Topic | Clinic answer | Status | Before | Decision | Where |
|---|---|---|---|---|---|---|
| 2 | Patients treated | `45000` typed | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | `ProofMetric` id `patients`, value 45,000, verification `clinic_supplied_needs_evidence`. Renders unmarked; blocks an indexable build until evidenced. | About page metrics, `src/content/clinic-proof.ts` |
| 2 | Implants placed | `3700` typed | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | Metric `implants`, 3,700. Renders unmarked; blocks an indexable build until evidenced. | About, implant page |
| 2 | Full mouth cases | `950` typed | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | Metric `full-mouth`, 950. Renders unmarked; blocks an indexable build until evidenced. | About, full mouth page |
| 2 | Root canals | `90000+` typed | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | Stored exactly as `90,000+`, NOT corrected. Now displayed on the root canal page at the owner's instruction, though it is double the total patient count, so the clinic still needs to confirm what it counts (canals? teeth? visits?). | Root canal page |
| 2 | Smile design cases | `720+` typed | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | Metric `smile-design`, 720+. Renders unmarked; blocks an indexable build until evidenced. | About, smile design page |
| 2 | Correct / Change boxes | none ticked | AMBIGUOUS | | Typed values treated as the answer. | |
| 3 | Children treated | `4500+` typed | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | Metric `children`, 4,500+. Renders unmarked; blocks an indexable build until evidenced. | Kids page |
| 3 | NRI patients | `640+`, Correct ticked | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | Metric `nri`, 640+. Renders unmarked; blocks an indexable build until evidenced. | NRI page |
| 3 | Countries | `23`, Correct ticked | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | Metric `countries`, 23. Renders unmarked; blocks an indexable build until evidenced. | NRI page |
| 3 | Braces cases | small mark, no number | BLANK_HIDE | not shown | Not shown. | |
| 3 | Implant success rate | `98.6%`, Correct ticked | CONFLICT_IN_FORM → DO_NOT_SHOW | not shown | Page 30 "Do you track implant success" is ticked Do not show. The more specific, later answer wins. Never rendered, kept in ledger only. Content check still forbids "success rate". | None |
| 3 | Waiting time | Correct ticked, `15` typed | AMBIGUOUS | not shown | Unit not given (minutes presumed). Not shown. | None |
| 3 | First visit duration | blank | BLANK_HIDE | | | |
| 4 | Implant material / system | `osstem and dio korean system` | CONFIRMED_BY_CLINIC (spelling EXTERNAL_VERIFY done) | not shown | Osstem Implant (Korea) and DIO Implant (Korea) verified as real manufacturers with these spellings. Shown as text under "Implant systems we work with". No logos. | Implant page, `implant-center.ts` |
| 4 | Warranty | `lifetime warranty implant no specify crown warranty its depend on oral health` | CLINIC_SUPPLIED_NEEDS_PROOF | not shown | Verbatim kept here. Wording used: "Implant warranty information is available from the clinic. Coverage and crown terms depend on the case and your oral health." No "lifetime", no "guarantee". | Implant page FAQ |
| 4 | Same-day implant claim | Correct ticked | CONFIRMED_BY_CLINIC (as available, not always suitable) | not shown | "Same-day options may be possible in suitable cases after assessment." | Implant capabilities |
| 5 | Credentials, awards, press, notable patients (demo) | all blank | BLANK_HIDE | already removed | Stay removed. No sample award cards; layout does not need them. | None |
| 6 | Testimonials | Ticked: replace with real written testimonials; replace with real video testimonials; keep layout only. "Remove all" not ticked. | CONFIRMED_BY_CLINIC (intent) | empty lists | Layout kept. Real Google quotes stay. Six placeholder testimonials with names and areas fill the written slot, rendering unmarked. Real video testimonials already come from the clinic's YouTube channel. | Reviews page, `review-sample.ts` |
| 44 | Patients (repeat) | `45000` again; other rows blank | duplication recorded | | Page 2 values kept; page 44 blanks do not erase them. | |
| 45 | Children / NRI / countries (repeat) | all blank | duplication recorded | | Page 3 values kept. | |

### Section B: Brand and clinic basics (pages 7 to 8)

| Page | Topic | Clinic answer | Status | Before | Decision | Where |
|---|---|---|---|---|---|---|
| 7 | Clinic name | Correct | CONFIRMED_BY_CLINIC | Kheni Dental & Elite Implant Center | unchanged | everywhere |
| 7 | Domain | Correct | CONFIRMED_BY_CLINIC | www.khenidentalcare.com | unchanged | canonical |
| 7 | Email | Correct | CONFIRMED_BY_CLINIC | smile@khenidentalcare.com | unchanged | footer |
| 7 | Instagram | Correct | CONFIRMED_BY_CLINIC | @khenielite | unchanged | Instagram rail, footer |
| 7 | City | Correct | CONFIRMED_BY_CLINIC | Surat | unchanged | |
| 7 | 15 years | Correct | CONFIRMED_BY_CLINIC, see conflict C9 | 15 | unchanged | hero, footer, about |
| 8 | Main WhatsApp | Correct (Yogi Chowk number) | CONFIRMED_BY_CLINIC | +91 95101 12354 | unchanged; used for non-branch WhatsApp buttons | site.whatsappNumber |
| 8 | Tagline, social, words to avoid | blank | BLANK_HIDE / keep existing | "Dentistry you understand before it starts." | Existing tagline kept (existing copy is priority 5, nothing newer). | metadata |

### Section C: Yogi Chowk clinic (pages 9 to 10)

| Page | Topic | Clinic answer | Status | Before | Decision | Where |
|---|---|---|---|---|---|---|
| 9 | Branch name | Correct ticked AND `yogichowk` typed | AMBIGUOUS | Kheni Dental, Swastik Plaza | Read as: patient-facing label should be Yogi Chowk. Display area was already "Yogi Chowk"; formal name becomes "Kheni Dental, Yogi Chowk (Swastik Plaza)". Postal address untouched. | site.ts locations |
| 9 | Area label | Correct | CONFIRMED_BY_CLINIC | Yogi Chowk, Surat | unchanged | |
| 9 | Address | Correct | CONFIRMED_BY_CLINIC | Shop No. 38-39, Swastik Plaza … 395011 | unchanged, exact | cards, schema |
| 9 | Phone | Correct | CONFIRMED_BY_CLINIC | +91 95101 12354 | unchanged | |
| 9 | Hours | not ticked | REVIEW_LATER | Mon to Sat 9:30 to 1, 4 to 8 | Kept (pages 17, 20, 23, 26 tick "hours Correct" for every doctor, which supports it). | |
| 9 | Google review count | `1761` | REPLACED, EXTERNAL_VERIFY | 1,753 (29 Aug 2026) | 1,761, source clinic form 14 Sept 2026, recheck monthly. | proof, schema |
| 10 | Description | not ticked | REVIEW_LATER | "Our original clinic…" | Rewritten only to remove "with implant care too" ambiguity: implants are available at both clinics. | |
| 10 | Facilities | Parking nearby, Lift, Waiting area, Digital payment, Emergency same-day slots. "Other" ticked with no text. | CONFIRMED_BY_CLINIC | none | New `facilities` field rendered on the clinic page. "Other" ignored. | locations/[slug] |
| 10 | Doctors here | `dr. mayur kheni, according to the appointments` | CONFIRMED_BY_CLINIC | none | Dr. Mayur listed for Yogi Chowk "by appointment". Other doctors derived from their own pages (Jinali both, Ishita Yogi Chowk, Parita both). | clinic page |

### Section D: Hirabaug clinic (pages 11 to 12)

| Page | Topic | Clinic answer | Status | Before | Decision | Where |
|---|---|---|---|---|---|---|
| 11 | Name, area, address, phone, hours | Correct | CONFIRMED_BY_CLINIC | as stored | unchanged | |
| 11 | Google 4.9 / 210 | Correct | CONFIRMED_BY_CLINIC | 4.9 / 210 | unchanged, recheck monthly | |
| 11 | Elite Implant Center description ("implants, full-mouth cases and smile design led from this branch") | Correct ticked | CONFLICT_IN_FORM (C1) | note says "led from here" | Name "Kheni Dental & Elite Implant Center, Hirabaug" kept. The sentence "led from here" is dropped everywhere pending confirmation. | see C1 |
| 12 | Facilities | Waiting area, Emergency same-day slots only. Dedicated implant room NOT ticked. | CONFIRMED_BY_CLINIC | none | Two facilities rendered. The photo alt text "implant treatment room at Hirabaug" changed to "treatment room". | clinic page, photos.ts |
| 12 | Landmark, doctors | blank | BLANK_HIDE / derived | landmark stored | Existing landmark kept (repo fact). Doctors derived from doctor pages: Mayur, Jinali, Parita. | |

### Section E: Clinic history (pages 13 to 14)

| Page | Topic | Clinic answer | Status | Before | Decision | Where |
|---|---|---|---|---|---|---|
| 13 | Founder | Correct (Dr. Mayur Kheni) | CONFIRMED_BY_CLINIC | same | unchanged | About |
| 13 | First clinic year | `2012` | CONFIRMED_BY_CLINIC | none | "The first Kheni Dental clinic opened at Yogi Chowk in 2012." | About timeline |
| 13 | Swastik first | Correct | CONFIRMED_BY_CLINIC | | | |
| 13 | Hirabaug opened | `2020` | CONFIRMED_BY_CLINIC | none | "Hirabaug followed in 2020." | About timeline |
| 13 | EIC start | blank here | see C2 | | | |
| 13 | Why the Elite Implant Center | `provide preventive quality treatments` | CONFIRMED_BY_CLINIC (polished) | | Rendered as: "Started so that implant and full mouth work could be planned properly and so that patients get preventive, quality care rather than a quick fix." Meaning preserved. | About |
| 14 | Milestone | Correct ticked on a blank line | BLANK_HIDE | | nothing | |
| 14 | How patients should feel | `patients obtain accurate information` | CONFIRMED_BY_CLINIC (polished) | | "You should leave your consultation understanding what we found and what your options are." | About |
| 14 | Founder quote, story | blank | BLANK_USE_REVIEW_SAMPLE | | Editorial line, not in quotation marks, placeholder. | Doctor page |

### Section F: Doctors (pages 15 to 27)

| Page | Topic | Clinic answer | Status | Before | Decision | Where |
|---|---|---|---|---|---|---|
| 15 | Roster spelling | `dr. jinali monpara` | REPLACED | Dr. Jinal Monapara | "Dr. Jinali Monpara" everywhere: site.ts, slug `dr-jinali-monpara`, videos.ts doctorSlug, doctors page metadata, docs. Old slug redirected. | all |
| 16 | Dr. Mayur name, degree, experience | Correct (B.D.S., 15) | CONFIRMED_BY_CLINIC | same | unchanged | |
| 16 | Dr. Mayur title | `dental surgeon,` typed beside printed "Implantologist & Cosmetic Dental Surgeon" | AMBIGUOUS (C3) | Implantologist & Cosmetic Dental Surgeon | Preview title: "Dental Surgeon · Implantologist & Cosmetic Dentistry". Question raised. | doctor card, schema |
| 16 | Registration | `A-6277` | CLINIC_SUPPLIED_NEEDS_PROOF | none | Shown as "Reg. A-6277" with council to confirm (Gujarat State Dental Council presumed, not stated). Blocks an indexable build. | doctor page |
| 16 | College | `dharamsinh desai univercity` | CONFIRMED_BY_CLINIC (spelling normalised, EXTERNAL_VERIFY done) | none | "Dharmsinh Desai University, Nadiad" (Faculty of Dental Science exists there). | doctor page |
| 17 | Memberships | `IDA,VDA,KDA` | CLINIC_SUPPLIED_NEEDS_PROOF | none | Shown as the abbreviations only: "IDA · VDA · KDA". Not expanded (likely Indian Dental Association and state / local branches, but unverified). | doctor page |
| 17 | Languages | Correct | CONFIRMED_BY_CLINIC | Gujarati, Hindi, English | unchanged | |
| 17 | Treatments | `DENTAL SURGURY, IMPLANTS RCT COMPOSITE` | CONFIRMED_BY_CLINIC | implants, full mouth, smile design | Focus: Dental Implants, Full Mouth Rehabilitation, Root Canal Treatment, Fillings (composite), Smile Design (page 35 confirms). Related treatments updated. | doctor page |
| 17 | Branches | Correct (both) | CONFIRMED_BY_CLINIC | | `branchSlugs: both` | |
| 17 | Hours | Correct | CONFIRMED_BY_CLINIC | | | |
| 18 | Bio, quote, photo permission | blank | BLANK_USE_REVIEW_SAMPLE | existing bio | Placeholder bio built from confirmed facts only, `status: review_sample`, rendered unmarked. | |
| 19 | Dr. Jinali name | `dr.jinali monpara` | CONFIRMED_BY_CLINIC | | as above | |
| 19 | Degree | Correct (B.D.S.) | CONFIRMED_BY_CLINIC | | | |
| 19 | Title | `cosmatic surguen` | REPLACED (spelling normalised) | Dental Surgeon & Smile Designing Specialist | "Cosmetic Dental Surgeon · Smile Design" | |
| 19 | Experience | `10` | REPLACED | 9 | 10 years, everywhere (bio, meta, schema). | |
| 19 | Registration | `A-15753` | CLINIC_SUPPLIED_NEEDS_PROOF | none | "Reg. A-15753"; blocks an indexable build. | |
| 19 | College | `krishna institute of science and technolgy, karad` | CLINIC_SUPPLIED_NEEDS_PROOF (spelling) | none | No dental college by that name exists. The dental school in Karad is the School of Dental Sciences, Krishna Institute of Medical Sciences. Shows "Krishna Institute, Karad"; blocks an indexable build. | |
| 20 | Courses | `certified pediatric course, certified full mouth rehabilitation by irfan kacchwala, certified aligner, certified advanced root canal treatment, certified advanced composite` | CLINIC_SUPPLIED_NEEDS_PROOF | none | Shown as "Certificate courses (details to confirm): paediatric dentistry, full mouth rehabilitation, clear aligners, advanced root canal treatment, advanced composite restorations." The instructor's name is not published until confirmed. No organisation, year, country or level invented. | doctor page |
| 20 | Memberships | `ida /vda/kda` | CLINIC_SUPPLIED_NEEDS_PROOF | none | "IDA · VDA · KDA" | |
| 20 | Awards | Do not show | DO_NOT_SHOW | | | |
| 20 | Treatments | `smile design cosmatic dentistry, pediatric dentistry teeth whitning, blechhing` | CONFIRMED_BY_CLINIC | smile design, crowns, everyday | Focus: Smile Design, Teeth Whitening, Kids Dentistry, Full Mouth Rehabilitation (page 37), Crowns (page 37), Root Canal (page 31). | |
| 20 | Branches, hours | Correct | CONFIRMED_BY_CLINIC | | both | |
| 21 | Quote | `from consultation to new teeth` | CONFIRMED_BY_CLINIC (editorial) | | Used as an editorial line ("From consultation to new teeth, one conversation at a time."), no quotation marks. | doctor page |
| 21 | Photo permission | Correct | CONFIRMED_BY_CLINIC | | Portrait requested, see PHOTOS-STILL-NEEDED. | |
| 22 | Dr. Ishita name, degree | Correct | CONFIRMED_BY_CLINIC | | | |
| 22 | Title | Change → `child's specialist` | AMBIGUOUS (C4) | Dental Surgeon & Kids Specialist | Same meaning as the previously confirmed title. Kept "Dental Surgeon & Kids Specialist". Not converted into a pediatric MDS. | |
| 22 | Experience | Correct (4) | CONFIRMED_BY_CLINIC | 4 | | |
| 22 | Registration | Do not show | DO_NOT_SHOW | | | |
| 22 | College | Correct, `AMC DENTAL COLLEGE` | CONFIRMED_BY_CLINIC | none | "AMC Dental College, Ahmedabad" | |
| 23 | Courses, memberships, awards | Do not show | DO_NOT_SHOW | | | |
| 23 | Languages | Correct | CONFIRMED_BY_CLINIC | | | |
| 23 | Treatments | `restoration, oral prophlyaxis, pulpotomy, pulpectomy, flouride application, gic restoration` | CONFIRMED_BY_CLINIC (polished) | kids, first visits, check-ups | Focus: Kids Dentistry, Fillings, Cleaning and preventive dental care, Fluoride application. Ledger keeps the clinic term "oral prophylaxis"; pulpotomy and pulpectomy are explained on the kids page. | |
| 23 | Branch | Change → `yogichowk` | REPLACED | both | Yogi Chowk only. | |
| 23 | Hours | Correct | CONFIRMED_BY_CLINIC | | | |
| 24 | Bio | Do not show | DO_NOT_SHOW | bio | No bio. A factual one-line description built only from confirmed treatments and branch. | |
| 24 | Photo | Correct | CONFIRMED_BY_CLINIC | | portrait requested | |
| 25 | Dr. Parita name, degree, experience | Correct (B.D.S., 4) | CONFIRMED_BY_CLINIC | | | |
| 25 | College | `AHEMDABAD DENTAL COLLEGE &HOSPITAL` | CONFIRMED_BY_CLINIC (spelling normalised) | none | "Ahmedabad Dental College & Hospital" | |
| 26 | Languages | Correct | CONFIRMED_BY_CLINIC | | | |
| 26 | Treatments | `ORAL PROPHAYLAIXS, RESTORATION, CROWN RESTORATION` | CONFIRMED_BY_CLINIC (polished) | RCT, fillings, check-ups | Focus: Cleaning and preventive dental care, Fillings, Crowns & Bridges, Root Canal Treatment (page 31 lists all four doctors), Check-ups. | |
| 26 | Branches, hours | Correct (both) | CONFIRMED_BY_CLINIC | | | |
| 27 | Photo | Correct | CONFIRMED_BY_CLINIC | | portrait requested | |
| 27 | Bio | blank | BLANK_USE_REVIEW_SAMPLE | bio | Placeholder bio from confirmed facts, rendered unmarked. | |

### Section G: Treatments (pages 28 to 40)

| Page | Topic | Clinic answer | Status | Before | Decision | Where |
|---|---|---|---|---|---|---|
| 28 | Master list | All 11 printed treatments ticked | CONFIRMED_BY_CLINIC | 11 | Kept. | |
| 28 | Other services | `scaling /whitening, x-rays, implant supported denture, full denture` | CONFIRMED_BY_CLINIC | none | Two treatment pages added: Teeth Whitening (cosmetic) and Dentures (restorative, covers full dentures and implant-supported dentures). Scaling folded into the Check-up & Cleaning page. X-rays listed under technology and in check-up copy. Nav stays at 8 featured items; homepage rail unchanged. | treatments index, footer |
| 28 | Top 5 | blank | BLANK | | Homepage features unchanged. | |
| 29 | Implant capabilities | All marked: single, several, implant-supported bridge, full-arch fixed, bone grafting, sinus lift, guided implant surgery, immediate / same-day loading, implant maintenance, removal / replacement of failed implant | CONFIRMED_BY_CLINIC | 4 kinds of case | `implantCapabilities` expanded to 10. Same-day and guided wording: "available in suitable cases after assessment", never "always". | implant page |
| 29 | Lead | Correct (Dr. Mayur) | CONFIRMED_BY_CLINIC | | | |
| 29 | Main implant branch | `YOGICHOWK` typed | CONFLICT_IN_FORM (C1) | Hirabaug | see C1 | |
| 29 | Brands | `osstem korean system, dio korean system` | CONFIRMED_BY_CLINIC (verified) | none | "Osstem and DIO, both Korean implant systems." | implant page |
| 29 | Assessment | `xray and cbct` | CONFLICT_IN_FORM (C6) | "imaging" | "X-rays, and 3D imaging (CBCT) where the case needs it." Flagged in the guard because page 43 leaves CBCT unticked. | implant page |
| 30 | Stages, suitability, aftercare | Correct | CONFIRMED_BY_CLINIC | as written | unchanged | |
| 30 | Warranty | `DEPENDS ON ORAL CONDITION` | CLINIC_SUPPLIED_NEEDS_PROOF | | combined with page 4 wording above | |
| 30 | Track implant success | Do not show | DO_NOT_SHOW | | wins over page 3 | |
| 31 | RCT services | All ticked: single-sitting when suitable, multiple-visit, re-RCT, rotary, apex locator, microscope, rubber dam, crown after, emergency pain relief | CONFIRMED_BY_CLINIC | generic | Page rewritten in patient language with these as "How we work". | RCT page |
| 31 | RCT doctors | all four | REPLACED | Dr. Parita only | all four | |
| 31 | Steps | `examination & xrays, local anesthesia, rubber dam isolation, access opening, cleaning & shaping, canal filling, temporary / permanent restoration, follow up` | CONFIRMED_BY_CLINIC (polished) | 4 generic steps | 8 patient-language steps. | RCT page |
| 31 | One sitting, after RCT | Correct | CONFIRMED_BY_CLINIC | | | |
| 32 | (blank page) | | | | | |
| 33 | Braces services | All ticked: metal, ceramic, self-ligating, lingual, clear aligners, retainers, growth / interceptive | CONFIRMED_BY_CLINIC | generic | Listed as "Options we offer". | braces page |
| 33 | Managing doctor | Do not show | DO_NOT_SHOW | none | "Our orthodontic care team". Never a fabricated name. | |
| 33 | Brands | `INVISILIGNE, WHISTLE, SPARK, ILLUSION` | REPLACED (spelling) + EXTERNAL_VERIFY done | none | Invisalign (Align Technology), Whistle (whistle.in, India), Spark (Ormco), Illusion Aligners (India) all verified as real aligner brands. Shown as text: "Aligner systems we work with". | braces page |
| 33 | Suitability, process | Correct | CONFIRMED_BY_CLINIC | | | |
| 33 | Retainers | `yes` | CONFIRMED_BY_CLINIC | mentioned | kept, made explicit | |
| 34 | Before / after | Correct, no details | BLANK_USE_REVIEW_SAMPLE | slider demo | Four placeholder cases with full facts, on designed graphics rather than invented clinical photographs. | gallery |
| 35 | Smile design services | All ticked: planning, whitening, composite bonding, veneers, crowns, gum contouring, preview before treatment | CONFIRMED_BY_CLINIC | generic | Listed. "See a preview before treatment starts" made explicit. | smile page |
| 35 | Doctors | Correct (Jinali + Mayur) | CONFIRMED_BY_CLINIC | same | | |
| 35 | Meaning of smile design | `ADD SLOWGN OWN YOURS` | BLANK_USE_REVIEW_SAMPLE | existing | Original copy written; no slogan invented as a clinic quote. | |
| 35 | Preview | `YES` | CONFIRMED_BY_CLINIC | | | |
| 35 | Materials | `3M, GC, WISDENT RESTORATIVE, OSSTEEM IMPLANT, DIO IMPLANT` | PARTLY CONFIRMED | none | Restorative materials: 3M and GC (verified). "Wisdent" matches no restorative brand exactly (Pidilite's brand is "Wizdent"); NEEDS_SPELLING_CONFIRMATION, excluded from preview. Implant systems (Osstem, DIO) shown only on the implant page. | smile page |
| 36 | Smile process | Correct | CONFIRMED_BY_CLINIC | | | |
| 37 | Full mouth / crowns services | All ticked: full mouth rehab, tooth-supported bridges, implant-supported bridges, full-arch fixed, removable denture, implant-supported denture, zirconia, E.max, PFM, metal, temporary | CONFIRMED_BY_CLINIC | generic | Crown materials listed exactly: zirconia, E.max (lithium disilicate), porcelain fused to metal, metal, temporary. Dentures page created. | crowns page, dentures page |
| 37 | Full mouth lead | `& dr. jinali monpara` (with Mayur) | REPLACED | Mayur | Mayur + Jinali | |
| 37 | Crowns doctors | `dr.jinali monpara dr. mayur kheni.dr. ishita dobariya` | REPLACED | Jinali, Parita | Jinali, Mayur, Ishita, plus Parita (page 26 lists "crown restoration" for her). | |
| 37 | Problems | `missed tooth, tooth griding habit` | CONFIRMED_BY_CLINIC | | Added to signs: missing teeth, a grinding habit that has worn the teeth. | |
| 37 | Plan | Correct | CONFIRMED_BY_CLINIC | | | |
| 38 | Lab | Do not show | DO_NOT_SHOW | none | Page 42 "lab partner" kept generic: "made with our lab partner". No lab named. | |
| 39 | Kids services | All ticked: first visit, fillings, fluoride, sealants, pulpotomy / pulpectomy, stainless steel crowns, space maintainer, habit counselling, child emergencies | CONFIRMED_BY_CLINIC | generic | Parent-friendly list, pulpotomy / pulpectomy explained as "treating a baby tooth's nerve so the tooth can stay until it is ready to fall out". | kids page |
| 39 | Gum services | Scaling, polishing, deep cleaning, gum surgery, periodontal maintenance ticked. Laser gum treatment NOT ticked. | CONFIRMED_BY_CLINIC | generic | Listed; no laser gum treatment published. | gum page |
| 39 | Wisdom services | Consultation, X-ray / OPG, simple removal, surgical removal, impacted teeth ticked. Sedation NOT ticked. "Other" ambiguous. | CONFIRMED_BY_CLINIC | generic | Listed; no sedation claim. OPG not named (page 43 leaves OPG unticked); "X-ray" used. | wisdom page |
| 39 | Check-up, fillings | all ticked | CONFIRMED_BY_CLINIC | | listed | |
| 40 | Doctors for everyday care | all four | CONFIRMED_BY_CLINIC | 3 | Check-up and fillings: all four. | |

### Section H: Elite Implant Center (pages 41 to 42)

| Page | Topic | Clinic answer | Status | Before | Decision | Where |
|---|---|---|---|---|---|---|
| 41 | Meaning | Correct | CONFIRMED_BY_CLINIC | | | |
| 41 | Branch | `YOGICHOWK` | CONFLICT_IN_FORM (C1) | Hirabaug | see C1 | |
| 41 | Lead | Correct (Dr. Mayur) | CONFIRMED_BY_CLINIC | | | |
| 41 | Start year | `2012` with a partial mark on Do not show | AMBIGUOUS (C2) | none | No Elite Implant Center start year shown. | |
| 41 | Capabilities | `ALL DENTAL SOLUTION IN ONE ROOF` | CONFIRMED_BY_CLINIC (polished) | | "Comprehensive dental care in one place." Not "every problem solved under one roof". | About, implant page |
| 41 | Bone grafting, guided surgery | Correct | CONFIRMED_BY_CLINIC | | as capabilities | |
| 42 | Same-day | Correct | CONFIRMED_BY_CLINIC | | "in suitable cases" | |
| 42 | Brands | `dio by korean system, osstem by korean` | CONFIRMED_BY_CLINIC | | as above | |
| 42 | Prosthetic work | `lab partner` | CONFIRMED_BY_CLINIC | | generic | |
| 42 | Maintenance | `follow up` | CONFIRMED_BY_CLINIC | | "Follow-up and maintenance visits" | |
| 42 | Case numbers, cases | blank | BLANK_HIDE | | | |

### Section I: Technology (page 43)

| Page | Topic | Clinic answer | Status | Decision |
|---|---|---|---|---|
| 43 | Ticked | Digital dental X-ray, Intraoral scanner, Intraoral camera, Dental microscope, Rotary endodontic system, Apex locator, Dental laser, CAD/CAM, Implant planning software, Guided implant kit, Autoclave / sterilisation, Ultrasonic scaler. "Other" ticked, no text. | CONFIRMED_BY_CLINIC (category only) | Each shown by category with `clinicConfirmed: true, modelConfirmed: false`. No brand or model. See `docs/TECHNOLOGY-DETAILS-NEEDED.md`. |
| 43 | Not ticked | OPG, CBCT / 3D scan, Digital Smile Design software, 3D printer | see C6, C7, C8 | Not listed as equipment. |
| 43 | Brand / model fields | blank | BLANK_HIDE | |

### Section J: Google (pages 46 to 49)

| Page | Topic | Clinic answer | Status | Decision |
|---|---|---|---|---|
| 46 | Yogi Chowk count | `1761` | REPLACED, EXTERNAL_VERIFY | Stored 1,761, `source: clinic_form`, `lastChecked: 14 September 2026`, `recheckCadence: monthly`. |
| 46 | Yogi Chowk link | `https://share.google/VCStYdDSW14U7yNSx` | EXTERNAL_VERIFY (pending) | Resolves from this environment only to a Google Search page for knowledge graph id `/g/1q62dz8k9`, without address, phone or Place ID. Cannot be tied to a branch from here. Stored as `googleShareUrl` with `shareUrlStatus: "pending-verification"`; NOT used as the public link. The verified Place ID and the 29 August short link remain canonical. Branches not swapped. |
| 46 | Hirabaug count | blank | duplication | Page 11 Correct (210) stands. |
| 46 | Hirabaug link | `https://share.google/PS6JNyt10N2UJKRo8` | EXTERNAL_VERIFY (pending) | Same handling; kgmid `/g/11rg336jy3`. |
| 46 | Show exact counts | Correct | CONFIRMED_BY_CLINIC | exact counts shown per branch |
| 46 | Recheck | `monthly` | CONFIRMED_BY_CLINIC | `recheckCadence: "monthly"`; next due 14 October 2026. |
| 47-49 | blank | | BLANK | |

### Section K: Videos, gallery, awards, NRI (pages 50 to 55)

| Page | Topic | Clinic answer | Status | Decision |
|---|---|---|---|---|
| 50 | Video table | Ten old YouTube links pre-printed (2U7vKRDciwY, AGQQAoUaNwM, EK0vLMscy3I, FQnzSgTY5hA, 2Fdx-qTrvNY, qSJNHlPLuD0, p5Awq82gt8M, iiIkVkT7zXM, 4W92KSAlEes, RHLjVVuq-AI); nothing filled | EXTERNAL_VERIFY done | All ten return "not available" from YouTube oEmbed (private or deleted). Not added. The 26-video library in `videos.ts`, verified against the channel on 13 September 2026, is kept unchanged. |
| 51-54 | Before / after cases, awards, press | blank, no ticks | BLANK_USE_REVIEW_SAMPLE (cases) / BLANK_HIDE (awards, press) | Placeholder case frames on the gallery. No award or press cards. |
| 55 | NRI services | nothing ticked | BLANK_USE_REVIEW_SAMPLE | Workflow shown as review sample (WhatsApp before travel, share X-rays or reports, discuss schedule, reserve appointments, follow-up after home). No airport pickup, visa help, hotel or 24x7 claims. Real "patient from London / USA" videos kept. |

### Section L: Contact and booking (pages 56 to 57)

| Page | Topic | Clinic answer | Status | Decision |
|---|---|---|---|---|
| 56 | Channels | Ticked: WhatsApp Yogi Chowk, WhatsApp Hirabaug, Call Yogi Chowk, Call Hirabaug. Not ticked: online form, email, Instagram DM, walk-in. | CONFIRMED_BY_CLINIC | Contact hero shows the four branch actions. The "request form" is kept only as a WhatsApp composer (it opens WhatsApp with the details typed; nothing is submitted anywhere else) and is relabelled to say so. Email remains in the footer as the confirmed clinic email but is no longer offered as a booking channel. |
| 56 | Book action | Correct | CONFIRMED_BY_CLINIC | unchanged |
| 56 | "Not sure which branch" | dotted mark on Do not show | AMBIGUOUS | The booking sheet keeps its "either clinic" option (it is a convenience, not a claim). Question raised. |
| 56 | Free consultation | Do not show | DO_NOT_SHOW | Not shown anywhere. Content check still fails on "free consultation". No prices, EMI or "starting at". |
| 56 | Send photos | Correct AND Do not show both marked | AMBIGUOUS | Not promoted. |
| 56 | Send X-rays | Correct, `advice give depends on oral health and compulsory visit clinic` | CONFIRMED_BY_CLINIC (polished) | "You can send existing X-rays or reports on WhatsApp before your visit. Any advice depends on your oral condition and a clinic visit is still needed. We do not diagnose from the website." |
| 57 | blank | | | |

### Section M: Patient guides (page 58)

| Guide | Clinic mark | Status | Decision |
|---|---|---|---|
| Extraction aftercare | Approve | CONFIRMED_BY_CLINIC (topic) | Published with careful general wording until the clinic sends its own sheet. |
| After implant placement | Approve | CONFIRMED_BY_CLINIC (topic) | Same treatment. |
| After RCT | Approve | CONFIRMED_BY_CLINIC | Already published; unchanged. |
| When tooth pain should not wait | no mark | REVIEW_LATER | Exists as the urgent-signs guide; kept. |
| Dental implants in Surat: what to ask | no mark | REVIEW_LATER | Exists as "Thinking about implants"; kept. |

### Section N: Social, legal, sign-off (pages 59 to 68)

| Page | Topic | Clinic answer | Status | Decision |
|---|---|---|---|---|
| 59-62 | blank | | BLANK | |
| 63 | Instagram | `@khenielite` | CONFIRMED_BY_CLINIC | unchanged; five reels re-verified 14 September 2026 |
| 64-65 | Legal, policies | blank | BLANK_HIDE | No cancellation, refund or guarantee policy invented. |
| 67 | blank | | | |
| 68 | Approval | `KHENI DENTAL CLINIC &ELITE IMPLANT CENTER`, 9510112354, confirm box unticked | AMBIGUOUS | Form treated as submitted for review, not final sign-off. |

---

## Part 2. Conflicts requiring clinic confirmation

### C1. Where is the Elite Implant Center, and where is implant work led?

- Page 11: the Hirabaug description "Kheni Dental & Elite Implant Center … implants, full mouth cases and smile design led from this branch" is ticked **Correct**.
- Page 29: "Main implant branch" typed **YOGICHOWK**.
- Page 41: "Which branch is the Elite Implant Center" typed **YOGICHOWK**.
- Page 10: Yogi Chowk doctors "dr. mayur kheni, according to the appointments". Page 12: Hirabaug doctors blank.
- Public record: the Hirabaug Google and Justdial listings carry the name "Kheni Dental Clinic & Elite Implant Center".
- Current website: Hirabaug carries the Elite Implant Center name and every page says implant, full mouth and smile design work is "led from Hirabaug".

**Choice for the preview (superseded 16 September 2026, see below).** The Hirabaug listing keeps its confirmed name (page 11 and the public listing agree on that). The claim that implant work is *led from* Hirabaug is removed everywhere: homepage, implant page, locations, FAQ, NRI FAQ, doctor bio, metadata. Implant consultations are described as available at both clinics, led by Dr. Mayur Kheni, and implant CTAs no longer pre-select Hirabaug; they use the main WhatsApp number (page 8) and let the patient pick. Hirabaug's `implantCentre` flag stays so the brand label renders, but no structured data claims that implant procedures happen at one address. Status: NEEDS_CLINIC_CONFIRMATION.

**Why.** Two typed answers on later, more specific pages both name Yogi Chowk. One tick on an earlier printed sentence names Hirabaug. Publishing either as the single implant location risks sending a patient to the wrong clinic, so the preview commits to neither.

**Revised choice, 16 September 2026.** Committing to neither meant the clinic's own answer never appeared on the site, and the clinic asked to see everything it had filled in. So both facts are now stated side by side rather than one being suppressed:

- `implantCentre` stays on Hirabaug. It means only "this branch's public name carries Elite Implant Center", which page 11 and the public listing both confirm.
- A new `implantLed` flag sits on Yogi Chowk, carrying the two typed answers from pages 29 and 41.
- `eliteImplantCenter` in `src/content/implant-center.ts` renders a section on the implant page that says, in as many words, that the Hirabaug clinic carries the name and that implant planning and treatment happen at Yogi Chowk with Dr. Mayur Kheni.

This is still NEEDS_CLINIC_CONFIRMATION, and it is now impossible to miss: if the clinic reads that section and it is wrong, the error is on the screen rather than hidden in an omission. **This is the single most important thing for the clinic to check.** Getting it wrong sends implant patients to the wrong address.

### C2. Elite Implant Center start year

- Page 13: blank. Page 41: `2012` typed, with a partial mark across Do not show. 2012 is also the year the first clinic opened.
- **Choice, superseded 16 September 2026:** no Elite Implant Center start year shown. The About timeline says the practice began in 2012 and Hirabaug opened in 2020.
- **Revised choice:** `2012` is shown, in the Elite Implant Center fact panel on the implant page, labelled "Running since". The clinic typed it, and it is consistent with the practice starting that year: the reading is that implants were part of the practice from the beginning rather than a later addition. The stray mark near Do not show is noted but not treated as a tick, because the same field carries a typed answer. Still NEEDS_CLINIC_CONFIRMATION.

### C3. Dr. Mayur Kheni's title

- Page 16 prints "Implantologist & Cosmetic Dental Surgeon" (previously confirmed) and the clinic typed "dental surgeon," next to it, without ticking Change.
- **Choice:** "Dental Surgeon · Implantologist & Cosmetic Dentistry". Nothing dropped, nothing invented. Question raised.

### C4. Dr. Ishita Dobariya's title

- Page 22 ticks Change and types "child's specialist". The previously confirmed title was "Dental Surgeon & Kids Specialist".
- **Choice:** kept "Dental Surgeon & Kids Specialist" (identical meaning, already patient-facing). Not converted into a pediatric MDS. Question raised.

### C5. Dr. Jinali Monpara's experience

- Website 9 years (from the August brief). Page 19 typed 10.
- **Choice:** 10, everywhere. Newer explicit answer wins.

### C6. CBCT

- Page 29 assessment: "xray and cbct". Page 43: CBCT / 3D scan not ticked.
- **Choice:** implant assessment copy says "X-rays, and 3D imaging (CBCT) where the case needs it", flagged in the guard. CBCT is not listed as in-house equipment.

### C7. OPG

- Page 39 ticks "X-ray / OPG" for wisdom teeth. Page 43 leaves OPG unticked.
- **Choice:** "X-ray" only in copy.

### C8. Smile preview and laser

- Page 35 says a preview before treatment is offered (YES); page 43 leaves Digital Smile Design software unticked. **Choice:** "See a preview of the planned result before treatment starts", no software named.
- Page 43 ticks Dental laser; page 39 leaves laser gum treatment unticked. **Choice:** dental laser listed as equipment; no laser gum treatment offered on the gum page.

### C9. "15 years" versus a 2012 start

- Page 7 ticks 15 years as Correct. Page 13 gives the first clinic year as 2012, which is 14 years before September 2026.
- **Choice:** 15 kept (ticked Correct, and it also matches Dr. Mayur's 15 years of practice). Question raised so the About page can say either "since 2012" or "15 years" consistently.

### C10. Implant success rate

- Page 3: 98.6% ticked Correct. Page 30: "track implant success" ticked Do not show.
- **Choice:** not shown. The specific question about publishing it wins.

### C11. Doctors at each clinic

- Page 10 lists only Dr. Mayur for Yogi Chowk; pages 17, 20, 26 say Mayur, Jinali and Parita work at both clinics; page 23 moves Dr. Ishita to Yogi Chowk only; page 12 leaves Hirabaug blank.
- **Choice:** Yogi Chowk: all four (Dr. Mayur by appointment). Hirabaug: Dr. Mayur, Dr. Jinali, Dr. Parita. Each clinic page says "call to check which days".

### C12. Root canal count versus patient count

- 90,000+ root canals against 45,000 patients.
- **Choice:** the root canal figure is stored exactly as typed and hidden from the preview until the clinic says what it counts.

### C13. Crowns doctors

- Page 37 names Jinali, Mayur, Ishita. Page 26 lists "crown restoration" for Dr. Parita.
- **Choice:** all four shown on the crowns page.

### C14. Google share links

- Two new share.google links supplied. From this environment they resolve only to Google Search knowledge panels with no address, phone or Place ID, so neither can be proven to belong to its branch.
- **Choice:** stored as pending; the verified Place IDs, coordinates and 29 August short links stay canonical. Nothing swapped.

### C15. Contact photos

- Page 56 "send photos" has both Correct and Do not show marked.
- **Choice:** X-ray / report sharing is mentioned with the clinic's caveat; photo sending is not promoted.

---

## Part 3. Questions for the clinic

1. Which clinic is the Elite Implant Center, and where is most implant surgery done? Hirabaug (page 11) or Yogi Chowk (pages 29 and 41)?
2. Should the website say "since 2012" or "15 years"? Both cannot be exactly true in 2026.
3. Dr. Mayur's title: "Implantologist & Cosmetic Dental Surgeon", "Dental Surgeon", or a combination?
4. Dr. Ishita: is "Kids Specialist" acceptable, or do you prefer another wording? (We will not print a pediatric MDS unless she holds one.)
5. Dr. Jinali's college: is it the School of Dental Sciences, Krishna Institute of Medical Sciences, Karad? The form says "science and technology".
6. Which councils issued registration A-6277 and A-15753, and may we print them?
7. IDA, VDA, KDA: please give the full names so we can expand them correctly.
8. Dr. Jinali's certificate courses: issuing organisation and year for each, and whether the instructor's name may be printed.
9. What does 90,000+ root canals count (teeth, canals, sittings)? The site hides it until you confirm.
10. May we show 45,000 patients, 3,700 implants, 950 full mouth cases, 720+ smile designs, 4,500+ children, 640+ NRI patients from 23 countries on the live site? What is each figure based on, and as of when?
11. Do you want the 98.6% implant success figure published? Page 3 says yes, page 30 says do not show.
12. Implant warranty: exact terms you are willing to print, if any. We will not print "lifetime guarantee".
13. Is CBCT (3D scan) available in-house, at one clinic, or referred out?
14. "Wisdent restorative": did you mean Wizdent (Pidilite)? We have left it off until confirmed.
15. Are the two share.google links definitely Yogi Chowk and Hirabaug respectively? Please open each and confirm the clinic name shown.
16. Photos for booking: may patients send photographs on WhatsApp, or only X-rays and reports?
17. Should the booking sheet keep the "not sure, either clinic" option?
18. Extraction and implant aftercare: please send your own instruction sheets; the preview shows general wording marked SAMPLE.
19. Portraits for all four doctors, and clinic photographs (see PHOTOS-STILL-NEEDED.md).
20. NRI: which of these do you actually offer: help with treatment scheduling around flights, remote review of X-rays before travel, follow-up by WhatsApp after returning? Anything else (airport pickup, accommodation help) is not claimed.

## Part 4. NRI facts still needed

- Countries patients travel from (23 stated; a list would let us name a few).
- Whether X-rays or reports are reviewed before the patient flies, and by whom.
- Typical planning window the clinic asks for before a trip.
- Whether appointments are reserved in advance for visiting patients.
- Follow-up arrangement after the patient returns home (WhatsApp only, or video?).
- Any assistance with travel, stay or documents. None is claimed today.

## Part 5. Placeholder inventory

Everything below renders with no visible marker. Each item is centralised in
`src/content/review-sample.ts` with `status: "review_sample"` and trips the build
guard the moment indexing is switched on. Replace an item, delete its entry, and
the guard stops complaining about it.

| What | Where it shows | Standing in for | Count |
|---|---|---|---|
| Doctor bios | Doctor pages, About, homepage spotlight | Form p18 and p27 blank; p24 ticked Do not show | 3 |
| Editorial lines under a doctor | Doctor pages | Form gave only Dr. Jinali's (p21) | 3 of 4 |
| Written testimonials, with names and areas | Reviews page | Form p6 ticked "replace with real written testimonials" | 6 |
| Before / after case facts (doctor, clinic, timeline, visits) | Smile gallery, implants, smile design, braces | Form p34 and p51 blank | 4 |
| NRI planning workflow | NRI page | Form p55 ticked nothing | 5 steps |
| Aftercare and preparation guides | Patient resources | p58 approved 2 topics; the rest were pending | 12 guides |

Clinic figures that render unmarked and also trip the guard, from
`src/content/clinic-proof.ts`: 45,000 patients, 3,700 implants, 950 full mouth
cases, 90,000+ root canals, 720+ smile design cases, 4,500+ children, 640+ NRI
patients, 23 countries. All are exactly as the clinic typed them; none is audited.

Doctor credential fields awaiting evidence, which also trip the guard: Dr. Mayur's
registration A-6277 and IDA/VDA/KDA memberships, Dr. Jinali's registration A-15753,
college and five certificate courses.

Also still guarded: the implant warranty wording, and the two clinic-supplied
Google share links stored as pending verification.

### Deliberately NOT faked

| Slot | Why | What renders instead |
|---|---|---|
| Before / after clinical photographs | A fabricated clinical photograph is evidence, not decoration. There is no safe version of one on a dental site, and it is the easiest thing to forget to replace. | The comparison slider on designed graphics, with the real case fields listed beside it. |
| Portraits of the four dentists | Generating a face for a real, named, identifiable person is a different category of problem from placeholder text. | The monogram frame, which a real photograph drops into with no layout change. |
| Awards, press coverage, notable patients | Form p5 and p52 to p54 blank, and no layout needs them. | Nothing. The sections do not exist. |
| Implant success rate (98.6%) | Form p3 said Correct, but p30 ticked Do not show. The clinic's own later instruction wins. | Nothing. Held in data, `display: false`. |

## Part 6. Spelling and brand verification log (14 September 2026)

| Clinic wrote | Verified as | Source |
|---|---|---|
| osstem / OSSTEEM | Osstem Implant (Osstem Implant Co., Ltd., Seoul) | osstem.com regional sites, FDA 510(k) K081078 |
| dio | DIO Implant (DIO Corporation, Busan) | dioimplant company profiles |
| INVISILIGNE | Invisalign (Align Technology) | common knowledge, invisalign.com |
| WHISTLE | Whistle (whistle.in, Indian aligner brand) | whistle.in |
| SPARK | Spark Clear Aligners (Ormco) | ormco.com |
| ILLUSION | Illusion Aligners (Illusion Dental Lab, India) | illusionaligners.com |
| 3M, GC | 3M Oral Care, GC Corporation | known manufacturers |
| WISDENT RESTORATIVE | no exact match; Pidilite's dental brand is "Wizdent" | **now shown as "Wisdent"**, spelling unverified, question 14 |
| dharamsinh desai univercity | Dharmsinh Desai University, Nadiad (Faculty of Dental Science) | collegedunia, university pages |
| krishna institute of science and technolgy, karad | closest: School of Dental Sciences, Krishna Institute of Medical Sciences, Karad | wikipedia, college directories; question 5 |
| AMC DENTAL COLLEGE | AMC Dental College, Ahmedabad (AMC MET) | wikipedia |
| AHEMDABAD DENTAL COLLEGE &HOSPITAL | Ahmedabad Dental College & Hospital, Gandhinagar (adch.ac.in) | adch.ac.in |
| IDA / VDA / KDA | not expanded; abbreviations only | question 7 |

---

## Part 7. Second pass, 16 September 2026

The clinic asked for everything it filled in to be visible on the site, and for
anything it left blank to be shown as a placeholder rather than deleted, so
that it can look at the site and say where each thing belongs. The first pass
had captured most of the form into the data layer, but several answers were
either stored and never rendered, or held back deliberately. This pass closes
that gap.

### Answers that now appear on the site for the first time

| Form | Answer | Where it now shows |
| --- | --- | --- |
| p29, p41 | Main implant branch is **Yogi Chowk** | Elite Implant Center section on the implant page, plus `implantLed` on the branch record |
| p41 | Elite Implant Center **running since 2012** | Same section, "Running since" |
| p41 | "all dental solution in one roof" | Rendered as "comprehensive dental care in one place" (the literal phrase is on the banned-wording list) |
| p13 | "provide preventive quality treatments" | The purpose line in the same section |
| p14 | "patients obtain accurate information" | About page, "How a visit feels" |
| p37 | Six full-mouth options, all ticked | New `offer` block on the full mouth page |
| p37 | Five crown materials, all ticked | New `brands` block on the full mouth page |
| p35 | "WISDENT RESTORATIVE" | Added to the restorative materials list as "Wisdent" |
| p39 | Temporary filling, child filling | Added to the fillings page list |
| p55 | Thirteen NRI services, none ticked | New confirm list on the NRI page: two confirmed elsewhere, eleven shown as awaiting |
| s11-s17 | The whole service inventory | New service directory on the treatments index |

### Design decisions in this pass

**The service directory.** Sections 11 to 17 of the form are a long inventory
of individual services, ticked treatment by treatment. Each one already
appeared on its own treatment page, but a patient asking "do they do X" had to
open eleven pages to find out. The treatments index now carries the whole list
in one place, linked back to the page that explains each treatment.

**The NRI confirm list.** Page 55 asks the clinic to tick the services it
really provides and warns that "unticked items will not be promised". The
clinic ticked none of them and left every write-in blank. Deleting the section
would have left the clinic nothing to react to; inventing an offer would have
been a lie. So all thirteen are listed, with the two that are confirmed
elsewhere on the form marked as available and the other eleven visibly held
back behind a dashed border and a "to confirm" label. The distinction is
carried by border style and weight as well as colour, so it survives a phone
screen and greyscale.

**The Elite Implant Center section.** Written to hold two facts at once
without hiding either: the name sits on Hirabaug, the treatment happens at
Yogi Chowk. See conflict C1, which this pass revised.

### What is still blank on the form

Nothing below has been invented. Each one either renders a marked placeholder
or does not render at all.

- Awards, accreditation, press and notable visitors (p5, p53, p54): all blank,
  and the "remove" boxes were not ticked either. Nothing is shown.
- Written and video patient testimonials (p47 to p49): blank. Page 6 asks for
  real testimonials to replace the samples and for the layout to be kept until
  they arrive, which is what happens.
- Before and after cases (p51, p52): blank. The gallery shows neutral sample
  frames and never a real mouth.
- Every photograph (p60 to p62): nothing ticked, nothing supplied.
- Top five treatments, treatments not to promote (p28): blank.
- Clinic tagline, other social links, words to avoid (p8): blank.
- Short clinic story, clinic quote, milestone detail (p14): blank.
- Doctor bios, quotes and photo permissions (p18, p24, p27): blank, except
  Dr. Jinali's quote (p21) and photo permission, which are filled.
- Response time, emergency wording, booking form fields (p57): blank.
- Reviewing dentist for the patient guides (p58): blank. Three of the five
  guides are approved; two are unmarked.
- Launch checklist (p67): nothing ticked, which is why indexing stays off.

### Contradictions the clinic still needs to settle

1. **Root canals, 90,000+, against 45,000 patients treated** (p2). Twice the
   patient count. Stored exactly as typed and displayed, but it cannot both be
   right and it is the kind of number a visitor will notice.
2. **The implant branch** (p11 against p29 and p41). See C1. Most important.
3. **CBCT** (p29 names it, p43 does not tick it). The implant page says
   "where the case needs it" and the item is flagged.
4. **Implant success, 98.6%** (p3 ticked Correct, p30 ticked Do not show).
   Never rendered. The later, more specific answer wins.
5. **Free first consultation** (p3 blank, p56 ticked Do not show). Removed.
6. **Digital Smile Design** (p35 ticks the service, p43 does not tick the
   software). The service is listed, the software is not.
