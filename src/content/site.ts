/**
 * Business facts and visitor-facing content for Kheni Dental & Elite Implant
 * Center, Surat. Everything factual on the site is read from here.
 *
 * RULES THAT MUST SURVIVE EDITS
 *   - Facts come from the clinic. Nothing numeric is invented.
 *   - No prices anywhere on the site. This is the doctor's instruction.
 *   - No "painless", "guaranteed", "best", "No. 1", "world-class".
 *   - No em dashes in visitor-facing copy.
 *   - The current doctor roster only. Old flyers are not a source.
 */

import type { ContentStatus } from "@/content/provenance";

export const site = {
  name: "Kheni Dental & Elite Implant Center",
  shortName: "Kheni Dental",
  /** Canonical origin. The apex domain redirects here permanently. */
  domain: "https://www.khenidentalcare.com",
  email: "smile@khenidentalcare.com",
  city: "Surat",
  region: "Gujarat",
  country: "India",
  tagline: "Every smile starts with a straight answer.",
  description:
    "Dentist in Surat since 2012. Implants, root canals, braces, kids dentistry and smile design at Yogi Chowk and Hirabaug, led by Dr. Mayur Kheni. You get the findings, the options and the estimate before anything starts.",
  instagram: "https://www.instagram.com/khenielite",
  instagramHandle: "@khenielite",
  primaryPhoneDisplay: "+91 95101 12354",
  primaryPhoneHref: "+919510112354",
  whatsappNumber: "919510112354",
  yearsInSurat: 15,
  /** Form p13: first clinic (Yogi Chowk) 2012, Hirabaug 2020. See ledger conflict C9 on "15 years". */
  founded: 2012,
  hirabaugOpened: 2020,
  doctorCount: 4,
  clinicCount: 2,
  consultationMessage:
    "Hello Kheni Dental, I would like to book an appointment. Please let me know which days and times are open. Thank you.",
} as const;

/** Clinic-provided schedule. Both clinics. Do not add Sunday hours. */
export const clinicHours = {
  days: "Monday to Saturday",
  morning: "9:30 AM to 1:00 PM",
  evening: "4:00 PM to 8:00 PM",
  closed: "Sunday",
  compact: "Mon to Sat · 9:30 AM to 1 PM · 4 PM to 8 PM",
} as const;

export type NavItem = { href: string; label: string; hasMenu?: boolean; accent?: boolean };

/** Header and mobile menu. Short on purpose. */
export const primaryNav: NavItem[] = [
  { href: "/treatments/", label: "Treatments", hasMenu: true },
  { href: "/treatments/dental-implants-surat/", label: "Dental Implants", accent: true },
  { href: "/doctors/", label: "Doctors" },
  { href: "/locations/", label: "Clinics" },
  { href: "/reviews/", label: "Reviews" },
  { href: "/international-patients/", label: "NRI & International" },
];

/** Quieter destinations. Shown small in the menu and the footer. */
export const secondaryNav: NavItem[] = [
  { href: "/problems-we-treat/", label: "What brings you in?" },
  { href: "/smile-gallery/", label: "Before & after" },
  { href: "/patient-resources/", label: "Patient resources" },
  { href: "/technology/", label: "Clinic technology" },
  { href: "/about/", label: "About Kheni Dental" },
  { href: "/contact/", label: "Contact" },
];

/** Footer sitemap. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/treatments/", label: "Treatments" },
  { href: "/doctors/", label: "Doctors" },
  { href: "/locations/", label: "Clinics" },
  { href: "/reviews/", label: "Reviews" },
  { href: "/international-patients/", label: "NRI & International" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Treatments surfaced in the header menu, in patient language. */
export const featuredTreatmentSlugs = [
  "dental-implants-surat",
  "root-canal-treatment-surat",
  "braces-clear-aligners",
  "cosmetic-smile-dentistry",
  "kids-dentistry-surat",
  "full-mouth-rehabilitation",
  "crowns-and-bridges",
  "gum-care-surat",
] as const;

export type Location = {
  slug: string;
  name: string;
  shortName: string;
  /** How patients recognise the area. Yogi Chowk, not the postal locality. */
  areaLabel: string;
  /** The one or two words a Surat patient would actually use for this clinic. */
  displayArea: string;
  /** Full postal address. */
  address: string;
  /** The address in three short lines for cards. */
  addressLines: [string, string, string];
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  /**
   * The branch's identity on Google, and the only map input this codebase
   * stores. Every Maps URL is derived from it in `src/lib/maps.ts`, so a
   * branch cannot inherit another branch's map.
   */
  googlePlaceId: string;
  /** The exact short link the clinic supplied on 29 August 2026, resolved against the Place ID. */
  googleShortUrl: string;
  /**
   * A newer share link from the clinic form (p46). From this environment it
   * resolves only to a Google Search knowledge panel with no address, phone
   * or Place ID, so it cannot yet be tied to a branch. Stored, not linked.
   */
  googleShareUrl?: { url: string; status: "pending-verification" | "verified"; note: string };
  /**
   * The listing's own pin. This is what the aerial map is centred on and
   * where its marker is drawn. Verified per branch in
   * `src/content/__checks__/branch-data.check.ts`; re-verify rather than edit.
   */
  coords: { lat: number; lng: number };
  /** Google reputation, per branch. Never borrowed from the other branch. */
  google: {
    status: "verified" | "pending-verification";
    rating?: string;
    reviewCount?: string;
    /** Date the figures were last confirmed, in the form used on the page. */
    verifiedOn?: string;
    /** Who supplied the current figure. */
    source?: "google_listing" | "clinic_form";
    /** How often the clinic wants the count rechecked (form p46: monthly). */
    recheckCadence?: "monthly";
    /** ISO date of the last check, for the recheck reminder. */
    lastChecked?: string;
  };
  hours: string;
  hoursNote?: string;
  /** One short line a patient can act on. */
  note: string;
  /** Landmark a rickshaw driver would know. */
  landmark: string;
  /** Facilities the clinic ticked on the form (p10, p12). Nothing else. */
  facilities: string[];
  /**
   * True for the branch whose public NAME carries "Elite Implant Center".
   * Confirmed Correct on form p11. This is a name, not a claim about where
   * implant treatment happens: see `implantLed`.
   */
  implantCentre?: boolean;
  /**
   * True for the branch where implant work is actually led. The clinic
   * answered "YOGICHOWK" twice, on p29 ("which branch is the main implant
   * branch") and again on p41 ("which branch is it based at"), while keeping
   * the Hirabaug branch name. Both answers are kept rather than one being
   * quietly dropped, and the site says where treatment happens rather than
   * letting the signage imply it. Ledger conflict C1.
   */
  implantLed?: boolean;
  /** Branch accent hue, from the treatment hue set. */
  hue: "gold" | "teal";
};

export const locations: Location[] = [
  {
    slug: "swastik-plaza",
    name: "Kheni Dental, Yogi Chowk",
    shortName: "Swastik Plaza",
    areaLabel: "Yogi Chowk, Surat",
    displayArea: "Yogi Chowk",
    address:
      "Shop No. 38-39, Swastik Plaza, Yogi Chowk Ground, Chikuwadi, Nana Varachha, Surat, Gujarat 395011, India",
    addressLines: ["Shop No. 38-39, Swastik Plaza", "Yogi Chowk Ground, Chikuwadi, Nana Varachha", "Surat, Gujarat 395011"],
    phoneDisplay: "+91 95101 12354",
    phoneHref: "+919510112354",
    whatsappNumber: "919510112354",
    googlePlaceId: "ChIJddZdiXpP4DsRvtrOvXjbQqA",
    googleShortUrl: "https://maps.app.goo.gl/WN2nDHXVK8RajDvE6",
    googleShareUrl: { url: "https://share.google/VCStYdDSW14U7yNSx", status: "pending-verification", note: "Form p46. Resolves to Google Search kgmid /g/1q62dz8k9; branch not provable from here." },
    coords: { lat: 21.2147921, lng: 72.8881639 },
    google: { status: "verified", rating: "4.9", reviewCount: "1,761", verifiedOn: "14 September 2026", source: "clinic_form", recheckCadence: "monthly", lastChecked: "2026-09-14" },
    hours: "Mon to Sat, 9:30 AM to 1:00 PM and 4:00 PM to 8:00 PM",
    hoursNote: "Clinic-provided hours. Call before travelling if your visit is time-sensitive.",
    note: "Our first clinic, open since 2012. Family dentistry, root canals, braces, children's dentistry, and where implant treatment is planned and placed.",
    landmark: "Yogi Chowk Ground, next to Apple Square",
    facilities: ["Parking nearby", "Lift", "Waiting area", "Digital payment", "Emergency same-day slots"],
    implantLed: true,
    hue: "teal",
  },
  {
    slug: "hirabaug",
    name: "Kheni Dental & Elite Implant Center, Hirabaug",
    shortName: "Hirabaug",
    areaLabel: "Varachha Main Road, Surat",
    displayArea: "Hirabaug",
    address:
      "2, Varachha Main Road, above Shiv Plywood, near New Shakti Vijay Society, opposite Surat Super Store, Hirabaug, Surat, Gujarat 395006, India",
    addressLines: ["2, Varachha Main Road, above Shiv Plywood", "Near New Shakti Vijay Society, opp. Surat Super Store", "Hirabaug, Surat, Gujarat 395006"],
    phoneDisplay: "+91 97379 97543",
    phoneHref: "+919737997543",
    whatsappNumber: "919737997543",
    googlePlaceId: "ChIJ89yBAKVP4DsR3TYY_211oRg",
    googleShortUrl: "https://maps.app.goo.gl/7TipkWprNZv2qEQk9",
    googleShareUrl: { url: "https://share.google/PS6JNyt10N2UJKRo8", status: "pending-verification", note: "Form p46. Resolves to Google Search kgmid /g/11rg336jy3; branch not provable from here." },
    coords: { lat: 21.2127579, lng: 72.8584163 },
    google: { status: "verified", rating: "4.9", reviewCount: "210", verifiedOn: "14 September 2026", source: "clinic_form", recheckCadence: "monthly", lastChecked: "2026-09-14" },
    hours: "Mon to Sat, 9:30 AM to 1:00 PM and 4:00 PM to 8:00 PM",
    hoursNote: "Clinic-provided hours. Call before travelling if your visit is time-sensitive.",
    note: "Our Varachha Main Road clinic, open since 2020, which carries the Elite Implant Center name. Everyday dentistry and implant consultations.",
    landmark: "Above Shiv Plywood, opposite Surat Super Store",
    facilities: ["Waiting area", "Emergency same-day slots"],
    implantCentre: true,
    hue: "gold",
    // Implant treatment itself is led from Yogi Chowk (form p29, p41).
  },
];

/**
 * Real Google review excerpts captured during the August 2026 research pass.
 * Never edit, paraphrase or add to these. Only the theme label is editorial.
 */
export const reviewHighlights = [
  {
    theme: "At ease",
    quote: "The doctor and staff were super helpful, and the environment was comfortable.",
    source: "Google review",
  },
  {
    theme: "Would recommend",
    quote: "Highly recommend for top quality dental care👍😃 Amazing service👍",
    source: "Google review",
  },
  {
    theme: "The doctors",
    quote: "Amazing work Good Co operation Good behavior and service of doctors",
    source: "Google review",
  },
] as const;

/* ── Colour language ────────────────────────────────────────────────────
   Each treatment owns one hue. The hue drives its poster, its icon, its
   chips and the tint of its page, so a patient learns to recognise it
   without the whole site becoming a rainbow. Values live in globals.css. */
export type Hue = "gold" | "navy" | "teal" | "amber" | "coral" | "violet" | "mint" | "green" | "lavender" | "sky" | "gold" | "gold";

export type DoctorBranch = "swastik-plaza" | "hirabaug";

export type Doctor = {
  slug: string;
  name: string;
  /** "Dr. Mayur", for buttons and headings that need a short form. */
  shortName: string;
  credentials: string;
  /** Patient-facing title, as the clinic gave it (see the ledger for wording decisions). */
  specialty: string;
  yearsExperience: number;
  /** What patients most often come to this doctor for. Confirmed areas only. */
  focus: string[];
  /**
   * A bio the clinic wrote, or a factual one-liner. A doctor whose form page
   * left the bio blank gets a SAMPLE bio from `review-sample.ts` instead.
   */
  bio?: string;
  /** Where this doctor sees patients. From the form; "both" unless the clinic said otherwise. */
  branchSlugs: DoctorBranch[];
  /** e.g. "by appointment" at a branch. */
  availabilityNote?: string;
  /** Dental college, spelling normalised against the institution's own name. */
  college?: { name: string; status: ContentStatus };
  /** Council registration number. Council itself not yet stated by the clinic. */
  registration?: { number: string; status: ContentStatus };
  /** Professional memberships, abbreviations exactly as given. Not expanded. */
  memberships?: { items: string[]; status: ContentStatus };
  /** Certificate courses, topics only. No issuing body, year or level invented. */
  courses?: { items: string[]; status: ContentStatus };
  metaDescription: string;
  relatedTreatmentSlugs: string[];
  hue: Hue;
  /** True for the principal dentist. */
  principal?: boolean;
};

export const doctors: Doctor[] = [
  {
    slug: "dr-mayur-kheni",
    name: "Dr. Mayur Kheni",
    shortName: "Dr. Mayur",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon · Implantologist & Cosmetic Dentistry",
    yearsExperience: 15,
    focus: ["Dental Implants", "Full Mouth Rehabilitation", "Root Canal Treatment", "Smile Design"],
    branchSlugs: ["swastik-plaza", "hirabaug"],
    availabilityNote: "At Yogi Chowk by appointment.",
    college: { name: "Dharmsinh Desai University, Nadiad", status: "clinic_supplied" },
    registration: { number: "A-6277", status: "needs_proof" },
    memberships: { items: ["IDA", "VDA", "KDA"], status: "needs_proof" },
    metaDescription:
      "Dr. Mayur Kheni, B.D.S., Dental Surgeon, Implantologist and Cosmetic Dentistry, founder of Kheni Dental & Elite Implant Center in Surat. 15 years in practice. Book an appointment.",
    relatedTreatmentSlugs: ["dental-implants-surat", "full-mouth-rehabilitation", "root-canal-treatment-surat", "cosmetic-smile-dentistry"],
    hue: "gold",
    principal: true,
  },
  {
    slug: "dr-jinali-monpara",
    name: "Dr. Jinali Monpara",
    shortName: "Dr. Jinali",
    credentials: "B.D.S.",
    specialty: "Cosmetic Dental Surgeon · Smile Design",
    yearsExperience: 10,
    focus: ["Smile Design", "Teeth Whitening", "Full Mouth Rehabilitation", "Kids Dentistry"],
    branchSlugs: ["swastik-plaza", "hirabaug"],
    college: { name: "Krishna Institute, Karad", status: "needs_proof" },
    registration: { number: "A-15753", status: "needs_proof" },
    memberships: { items: ["IDA", "VDA", "KDA"], status: "needs_proof" },
    courses: {
      items: ["Paediatric dentistry", "Full mouth rehabilitation", "Clear aligners", "Advanced root canal treatment", "Advanced composite restorations"],
      status: "needs_proof",
    },
    metaDescription:
      "Dr. Jinali Monpara, B.D.S., Cosmetic Dental Surgeon at Kheni Dental, Surat. Ten years in practice across smile design, whitening, full mouth rehabilitation and children's dentistry. Book an appointment.",
    relatedTreatmentSlugs: ["cosmetic-smile-dentistry", "teeth-whitening-surat", "full-mouth-rehabilitation", "crowns-and-bridges", "kids-dentistry-surat", "root-canal-treatment-surat"],
    hue: "coral",
  },
  {
    slug: "dr-ishita-dobariya",
    name: "Dr. Ishita Dobariya",
    shortName: "Dr. Ishita",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon & Kids Specialist",
    yearsExperience: 4,
    focus: ["Kids Dentistry", "Fillings", "Cleaning and preventive care", "Fluoride application"],
    // The clinic ticked "Do not show" for a bio (form p24). This is a
    // description of her work from confirmed answers, not a biography.
    bio: "Dr. Ishita Dobariya sees children and families at our Yogi Chowk clinic: first visits, fillings, cleaning and preventive dental care, fluoride application, and treating a baby tooth's nerve when it is needed. Four years in practice.",
    branchSlugs: ["swastik-plaza"],
    college: { name: "AMC Dental College, Ahmedabad", status: "clinic_supplied" },
    metaDescription:
      "Dr. Ishita Dobariya, B.D.S., Dental Surgeon & Kids Specialist at Kheni Dental, Yogi Chowk, Surat. Four years in practice, working mostly with children.",
    relatedTreatmentSlugs: ["kids-dentistry-surat", "tooth-fillings-surat", "dental-check-up-surat", "crowns-and-bridges"],
    hue: "mint",
  },
  {
    slug: "dr-parita-vastarpara",
    name: "Dr. Parita Vastarpara",
    shortName: "Dr. Parita",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon",
    yearsExperience: 4,
    focus: ["Cleaning and preventive care", "Fillings", "Crowns & Bridges", "Root Canal Treatment"],
    branchSlugs: ["swastik-plaza", "hirabaug"],
    college: { name: "Ahmedabad Dental College & Hospital", status: "clinic_supplied" },
    metaDescription:
      "Dr. Parita Vastarpara, B.D.S., Dental Surgeon at Kheni Dental in Surat. Four years in practice covering cleaning, fillings, crowns and root canal treatment at both clinics.",
    relatedTreatmentSlugs: ["dental-check-up-surat", "tooth-fillings-surat", "crowns-and-bridges", "root-canal-treatment-surat"],
    hue: "teal",
  },
];

export type TreatmentCategory = "restorative" | "everyday" | "cosmetic" | "kids" | "surgical";

export type Treatment = {
  slug: string;
  /** Patient-facing name. Used everywhere. */
  title: string;
  /** Shorter form for chips and the dock. */
  shortTitle: string;
  seoTitle: string;
  metaDescription: string;
  hue: Hue;
  category: TreatmentCategory;
  /** The sentence a patient arrives with, in their own words. */
  concern: string;
  /** The page headline. Warm, direct, no promises. */
  headline: string;
  /** One sentence for cards. */
  short: string;
  /** Two or three sentences. What it is and when it is used. */
  intro: string;
  /** "You might need this if" signs. Patient language. */
  signs: string[];
  /** What happens at a visit. Three or four steps. */
  visit: { title: string; copy: string }[];
  /** What to expect after. Honest, short. */
  expect: string[];
  worthKnowing: { title: string; copy: string };
  /**
   * Section headlines for this treatment's page, so the page does not fall
   * back on "What X is, in plain words" eleven times over. `highlight` may
   * name one phrase or two; both are set in the hue.
   */
  plainTitle: { title: string; highlight: string | string[] };
  visitTitle: { title: string; highlight: string | string[] };
  /** One Kheni line set large on the page. Brand voice, never a claim. */
  note: { line: string; highlight: string };
  doctorSlugs: string[];
  /**
   * What the team does not have a named doctor for (form p33: braces doctor
   * "Do not show"). Shown instead of the doctor cards. Never a made-up name.
   */
  teamLabel?: string;
  /** Services the clinic ticked on the form, in patient language. */
  offer?: { title: string; items: string[]; note?: string };
  /** Brands or systems the clinic named and whose spelling was verified. Text only. */
  brands?: { title: string; items: string[]; note?: string };
  ctaTitle: string;
  whatsappMessage: string;
  faqs: { question: string; answer: string }[];
  /** Shown in the homepage poster grid. Six at most. */
  featured?: boolean;
};

export const treatments: Treatment[] = [
  {
    slug: "dental-implants-surat",
    title: "Dental Implants",
    shortTitle: "Implants",
    seoTitle: "Dental Implants in Surat | Elite Implant Center",
    metaDescription:
      "Dental implants in Surat at Kheni Dental & Elite Implant Center. Single, multiple and full-arch implants, bone grafting and implant-supported dentures, planned by Dr. Mayur Kheni after examination and imaging.",
    hue: "gold",
    category: "restorative",
    concern: "I only chew on one side now.",
    headline: "A fixed tooth for the gap you have been working around.",
    short: "A small post placed in the jawbone that holds a fixed replacement tooth, for a missing tooth or a denture that moves.",
    intro:
      "A missing tooth changes how you eat before you notice it. You move food to the other side and pick the softer thing on the menu. An implant is a small post placed in the jawbone that holds a replacement tooth, so it is anchored in bone rather than resting on the gum or clipping onto the teeth beside it. Whether one suits you depends on your bone, your gums and your general health, which is checked before anything is recommended.",
    signs: [
      "One or more teeth missing",
      "A denture that slips when you eat or talk",
      "A bridge that has loosened or failed",
      "You chew on one side to avoid a gap",
    ],
    visit: [
      { title: "Consultation", copy: "You tell us which side you chew on and what you have stopped eating. The dentist examines the gap, the gums and the teeth on either side." },
      { title: "Examination and imaging", copy: "Bone cannot be judged by looking, so implant planning starts with X-rays and, where the case needs it, 3D imaging. The dentist decides what is appropriate for you." },
      { title: "Your treatment plan", copy: "Implant, bridge or denture, explained plainly with the stages, the visits and the time between them. Waiting is discussed too, if waiting is sensible." },
      { title: "Implant treatment", copy: "The implant is placed under local anaesthesia and given time to bond with the bone." },
      { title: "Final tooth and follow-up", copy: "The final crown or set of teeth is fitted once the implant has settled, and you are shown how to clean around it." },
    ],
    expect: [
      "Some soreness and swelling for a few days after placement",
      "Softer food while the implant heals",
      "Several months between placement and the final tooth in many cases",
      "Review visits to check healing",
    ],
    worthKnowing: {
      title: "Why some people are told to wait",
      copy: "Active gum disease, unmanaged diabetes, heavy smoking and thin bone can all change whether an implant is placed now, later, or not at all. These are judged in the chair, so bring them up at the consultation.",
    },
    plainTitle: { title: "A tooth with its own root.", highlight: "its own root" },
    visitTitle: { title: "Five stages, with a pause between each one.", highlight: "a pause" },
    note: { line: "The gap you stopped noticing is the one your other teeth noticed.", highlight: "other teeth" },
    doctorSlugs: ["dr-mayur-kheni"],
    ctaTitle: "Find out if an implant suits your case.",
    whatsappMessage: "Hello Kheni Dental, I would like to ask about dental implants and book a consultation. Thank you.",
    featured: true,
    faqs: [
      {
        question: "Will I be able to eat normally again?",
        answer: "That is the aim, and most people find chewing gets easier once the final tooth is fitted. How close it feels to your own tooth depends on how many teeth are replaced, the teeth biting against it and how well the implant settles. There is a healing stretch on softer food first. Your dentist will tell you what to expect at each stage.",
      },
      {
        question: "Does it hurt?",
        answer: "The implant is placed under local anaesthesia, so you should not feel the procedure itself. Some soreness and swelling for a few days afterwards is normal. Your dentist will explain what is expected for your case and what to do if it feels worse than that.",
      },
      {
        question: "How long does the whole thing take?",
        answer: "Longer than most people expect, because the bone needs time to bond with the implant before the final tooth goes on. In many cases that means a few months with review visits in between. Some people need gum treatment or bone preparation first. A realistic timeline comes after the examination, not before.",
      },
      {
        question: "Implant or bridge?",
        answer: "Both can be sound choices. A bridge is usually quicker and uses the teeth on either side for support, which means those teeth are prepared even if they are healthy. An implant stands on its own in the bone and leaves the neighbours alone, but it needs enough bone, settled gums and more time. The answer sits in what is beside the gap and underneath it.",
      },
      {
        question: "How is the cost decided?",
        answer: "It depends on how many teeth are involved, the condition of the bone, whether any preparation is needed first and the final tooth that goes on top. After the examination you get the full plan, stage by stage, with the estimate for each stage, before any treatment starts.",
      },
    ],
  },
  {
    slug: "root-canal-treatment-surat",
    title: "Root Canal Treatment",
    shortTitle: "Root Canal",
    seoTitle: "Root Canal Treatment in Surat",
    metaDescription:
      "Root canal treatment in Surat at Kheni Dental. For tooth pain from an infected or inflamed tooth, aimed at settling the pain and keeping your own tooth where possible.",
    hue: "sky",
    category: "restorative",
    concern: "This tooth keeps me up at night.",
    headline: "Settle the pain. Keep the tooth where we can.",
    short: "Cleans out an infected or inflamed tooth from the inside and seals it, so the pain settles and your own tooth stays.",
    intro:
      "Tooth pain has a habit of arriving at night. Not every ache needs a root canal, so the first job is finding the cause. If the soft tissue inside the tooth is inflamed or infected, root canal treatment cleans that space, seals it and lets the tooth carry on working. A crown or filling usually protects it afterwards.",
    signs: [
      "Throbbing pain that wakes you at night",
      "A tooth that hurts when you bite",
      "Sensitivity to hot or cold that lingers",
      "Swelling or a small bump on the gum near a tooth",
    ],
    visit: [
      { title: "Examination and X-ray", copy: "You tell us when it hurts and what sets it off. The dentist examines the tooth and takes an X-ray to see the roots." },
      { title: "Numb the tooth", copy: "Local anaesthesia before anything starts. You are told what you are likely to feel during and after." },
      { title: "Keep it clean and dry", copy: "A small rubber sheet isolates the tooth so saliva stays out while the inside is worked on." },
      { title: "Open, clean and shape", copy: "A small opening is made, the infected tissue removed and each canal cleaned and shaped, usually with a rotary system and an electronic length measurement." },
      { title: "Fill the canals", copy: "The cleaned canals are sealed so bacteria cannot get back in." },
      { title: "Rebuild and follow up", copy: "A temporary or permanent filling closes the tooth, a crown is planned where it is needed, and you are reviewed." },
    ],
    expect: [
      "Tenderness when biting for some days",
      "Chew on the other side until it settles",
      "A follow-up to fit the crown or filling",
      "Call if pain gets worse instead of easing",
    ],
    worthKnowing: {
      title: "Pain that stops is not proof",
      copy: "When the nerve inside a tooth dies, the ache can fade while the infection continues underneath. A tooth that hurt badly last week and feels fine now still deserves an examination.",
    },
    plainTitle: { title: "The tooth stays. The ache does not.", highlight: "The ache does not" },
    visitTitle: { title: "Numb first. Then the actual work.", highlight: "Numb first" },
    offer: {
      title: "How we work",
      items: [
        "Single-sitting root canal when the tooth is suitable",
        "Treatment over more than one visit when it is not",
        "Re-treatment of a root canal done earlier",
        "Rotary instruments and an electronic apex locator",
        "Magnification with a dental microscope",
        "A rubber sheet to keep the tooth dry while it is worked on",
        "A crown planned after treatment where the tooth needs it",
        "Emergency appointments for tooth pain",
      ],
    },
    note: { line: "Nobody remembers the root canal. They remember the night before it.", highlight: "the night before" },
    doctorSlugs: ["dr-mayur-kheni", "dr-jinali-monpara", "dr-ishita-dobariya", "dr-parita-vastarpara"],
    ctaTitle: "Call us before the next bad night.",
    whatsappMessage: "Hello Kheni Dental, I have tooth pain and would like to book an appointment. Thank you.",
    featured: true,
    faqs: [
      {
        question: "Will the root canal hurt?",
        answer: "Anaesthesia is used so the tooth and the area around it are numb while the work is done. Most people feel some tenderness for a few days afterwards, especially when biting on that side. Your dentist will explain what to expect and what to do if the soreness does not settle.",
      },
      {
        question: "Can it be finished in one visit?",
        answer: "Often it takes more than one. How many depends on the tooth, how many canals it has and how much infection is present. Your dentist can give you a realistic number after examining you.",
      },
      {
        question: "Why not just take the tooth out?",
        answer: "Removing a tooth ends the pain too, but it leaves a gap that usually needs replacing later with a bridge or an implant. A natural tooth that can be saved keeps your bite the way it is. Whether yours can be saved depends on how much sound tooth is left.",
      },
      {
        question: "How is the cost decided?",
        answer: "By which tooth it is, how many canals it has, how much infection there is and what the tooth needs afterwards, such as a filling or a crown. The dentist explains the plan and the estimate after examining the tooth.",
      },
    ],
  },
  {
    slug: "braces-clear-aligners",
    title: "Braces & Aligners",
    shortTitle: "Braces",
    seoTitle: "Braces & Clear Aligners in Surat",
    metaDescription:
      "Braces and clear aligners in Surat at Kheni Dental. Crowding, gaps and bites that do not meet, assessed first so you know which option suits your case and how long it takes.",
    hue: "violet",
    category: "cosmetic",
    concern: "My teeth are crowded and I do not want visible braces at work.",
    headline: "Straighter teeth, and a say in who notices.",
    short: "Moves crowded, gapped or uneven teeth into place with braces or clear aligners, depending on the movement your teeth need.",
    intro:
      "Adults who ask about aligners are rarely chasing a picture. They are tired of one tooth sitting in front of another, or a bite that keeps wearing the same edges. Braces and clear aligners both move teeth, but they do not suit every case equally. Which one fits yours depends on how far the teeth have to move, not on which you would rather wear.",
    signs: [
      "Crowded or overlapping teeth",
      "Gaps you would like closed",
      "Upper and lower teeth that do not meet properly",
      "Teeth that have shifted since earlier braces",
    ],
    visit: [
      { title: "Start with your complaint", copy: "Which tooth bothers you, and whether your bite has started to feel off when you close." },
      { title: "Measure the movement", copy: "Photographs, models and measurements show which teeth have to move, how far and in what order." },
      { title: "Braces or aligners", copy: "Only now does the appliance question get answered, along with the likely length of treatment and what you will do every day." },
      { title: "Wear it, then hold it", copy: "Teeth are checked and adjusted at set intervals. Retainers stop them sliding back afterwards." },
    ],
    expect: [
      "Months rather than weeks of treatment",
      "Some pressure for a few days after each adjustment",
      "Aligners out for meals and photographs",
      "Retainers after treatment, for as long as your dentist advises",
    ],
    worthKnowing: {
      title: "Why a photo cannot answer this",
      copy: "People often send a picture of their front teeth and ask whether aligners will work. Suitability rests on how the back teeth meet and how far roots have to move, and that only shows up on examination.",
    },
    plainTitle: { title: "Two ways to move a tooth.", highlight: "move a tooth" },
    visitTitle: { title: "Measure first. Choose second.", highlight: "Choose second" },
    note: { line: "Teeth move a millimetre at a time. That is why it works.", highlight: "a millimetre at a time" },
    doctorSlugs: [],
    teamLabel: "Our orthodontic care team",
    offer: {
      title: "Options we offer",
      items: [
        "Metal braces",
        "Ceramic (tooth-coloured) braces",
        "Self-ligating braces",
        "Lingual braces, fitted behind the teeth",
        "Clear aligners",
        "Early treatment for growing children, where it helps",
        "Retainers after treatment, so the result holds",
      ],
    },
    brands: {
      title: "Aligner systems we work with",
      items: ["Invisalign", "Spark", "Illusion Aligners", "Whistle"],
      note: "Which system suits you depends on the movement your teeth need, not on the name.",
    },
    ctaTitle: "See which one your teeth actually need.",
    whatsappMessage: "Hello Kheni Dental, I would like to ask about braces or clear aligners and book a consultation. Thank you.",
    featured: true,
    faqs: [
      {
        question: "Will anyone at work notice?",
        answer: "Clear aligners sit over the teeth and are far less obvious than metal braces, but they are not invisible. They also come out for meals. If your case is better handled with braces, the dentist will go through how visible each option is before you decide.",
      },
      {
        question: "How long will it take?",
        answer: "Usually longer than people hope. Tooth movement is counted in months, and the range is wide because it depends on how far the teeth have to travel and how many hours a day removable aligners are actually worn. You get an estimate for your own case at the planning stage.",
      },
      {
        question: "Am I too old for braces?",
        answer: "Adults have orthodontic treatment routinely. Gum health and the bone supporting your teeth matter more than age, so those are checked before alignment is planned.",
      },
      {
        question: "How is the cost decided?",
        answer: "By the type of appliance, how much movement is needed and how long treatment is likely to run. The dentist explains the plan and the estimate after the assessment.",
      },
    ],
  },
  {
    slug: "cosmetic-smile-dentistry",
    title: "Smile Design",
    shortTitle: "Smile Design",
    seoTitle: "Smile Design & Cosmetic Dentistry in Surat",
    metaDescription:
      "Smile design in Surat at Kheni Dental. Chipped, worn, stained or uneven teeth assessed first, then the smallest option that gets the result: whitening, bonding, veneers or crowns.",
    hue: "coral",
    category: "cosmetic",
    concern: "I have started smiling with my mouth closed.",
    headline: "Change what bothers you. Keep the rest.",
    short: "Improves the colour, shape or spacing of your front teeth, starting with the smallest change that gets the result.",
    intro:
      "Ask anyone what bothers them about their smile and you get one or two specific answers. A chipped edge, a gap that seems wider, a tooth that sits back, a colour that no longer matches. The first question is not which procedure to book, it is which of those things is genuinely bothering you and why the tooth looks that way. Some concerns are settled by whitening or a small reshape. Others need the bite or the gums sorted first.",
    signs: [
      "A chipped or worn front tooth",
      "Teeth that look yellow or stained",
      "A gap or an uneven edge you notice in photos",
      "An old filling or crown that no longer matches",
    ],
    visit: [
      { title: "Tell us what you notice", copy: "Bring a photo if it is easier to point at than describe. We want your words before any procedure gets named." },
      { title: "Check the health first", copy: "Teeth, gums, bite and older fillings are examined, because cosmetic work placed over an untreated problem does not hold." },
      { title: "Compare the real options", copy: "What each option changes, how much tooth it uses and what looking after it involves. Where a lighter approach does the job, we say so." },
      { title: "Agree before anything starts", copy: "Nothing begins until you know the sequence, the number of visits and what the result can and cannot do." },
    ],
    expect: [
      "Whitening and bonding can usually be revisited later",
      "Reshaping removes enamel that does not grow back",
      "Some sensitivity after whitening for a short time",
      "Upkeep that depends on the option chosen",
    ],
    worthKnowing: {
      title: "Some cosmetic work cannot be undone",
      copy: "Anything that reshapes a tooth removes enamel permanently. That is a decision to make in the chair after an examination, not from a page.",
    },
    plainTitle: { title: "Usually it is one tooth. Sometimes two.", highlight: "one tooth" },
    visitTitle: { title: "See it before you agree to it.", highlight: "before you agree" },
    note: { line: "A good smile design is the one nobody can point to.", highlight: "nobody can point to" },
    offer: {
      title: "What smile design can include",
      items: [
        "A plan for the whole smile before any single tooth is touched",
        "A preview of the planned result before treatment starts",
        "Teeth whitening",
        "Composite bonding for chips, edges and small gaps",
        "Veneers",
        "Crowns where a tooth is too damaged for anything lighter",
        "Gum contouring where the gum line is uneven",
      ],
    },
    brands: {
      title: "Restorative materials we use",
      items: ["3M", "GC", "Wisdent"],
      note: "Named on request. The material for your tooth is chosen with you at the planning visit.",
    },
    doctorSlugs: ["dr-jinali-monpara", "dr-mayur-kheni"],
    ctaTitle: "Start with a conversation, not a procedure.",
    whatsappMessage: "Hello Kheni Dental, I would like to ask about smile design and book a consultation. Thank you.",
    featured: true,
    faqs: [
      {
        question: "Will people be able to tell?",
        answer: "That depends on how much is changed and how well the shape and colour sit with your face. Small corrections usually read as your own teeth looking tidier. Say up front how visible you want the result to be.",
      },
      {
        question: "Do I need veneers, or is there something smaller?",
        answer: "Often there is something smaller. Whitening, polishing an uneven edge, bonding a chip or closing a gap with alignment handle a lot of what people come in worried about. Veneers and crowns are considered when the tooth itself is damaged, worn or too discoloured for a lighter approach.",
      },
      {
        question: "Will whitening work on my teeth?",
        answer: "It depends on why the teeth look the way they do. Surface staining from tea, coffee, tobacco or paan behaves differently from colour that comes from inside the tooth. Existing crowns, veneers and white fillings do not change colour with whitening. An examination is the only way to know.",
      },
      {
        question: "How is the cost decided?",
        answer: "By which option suits your teeth and how many teeth are involved. After the examination the dentist explains the choices and the estimate for each before anything starts.",
      },
    ],
  },
  {
    slug: "full-mouth-rehabilitation",
    title: "Full Mouth Rehabilitation",
    shortTitle: "Full Mouth",
    seoTitle: "Full Mouth Rehabilitation in Surat",
    metaDescription:
      "Full mouth rehabilitation in Surat at Kheni Dental & Elite Implant Center. When several teeth need work, the order matters. Planned in stages by Dr. Mayur Kheni and Dr. Jinali Monpara.",
    hue: "navy",
    category: "restorative",
    concern: "Too many teeth need work and I do not know where to start.",
    headline: "You do not have to fix everything at once.",
    short: "When several teeth need attention, one plan puts the work in a sensible order so you deal with one stage at a time.",
    intro:
      "Rarely is it just one thing. A tooth broke, another was taken out years ago, an old crown has come loose and the bite has quietly changed with all of it. Full mouth rehabilitation treats that as one connected problem instead of a queue of unrelated appointments. After an examination, your dentist works out what has to happen first, what can wait, and how the stages fit together.",
    signs: [
      "Several missing, broken or worn teeth",
      "A grinding habit that has worn the teeth down",
      "Old dental work failing in more than one place",
      "A bite that has changed or collapsed",
      "Dentures you no longer trust",
    ],
    visit: [
      { title: "One long first visit", copy: "Every tooth, your gums, your bite and any older dental work are looked at together, with imaging where needed." },
      { title: "Urgent from later", copy: "Infection or a tooth that cannot be kept comes first. Knowing what can wait takes most of the weight off straight away." },
      { title: "The sequence, written out", copy: "You get the stages in order, what each involves and roughly how much time sits between them." },
      { title: "Built stage by stage", copy: "Each phase is finished and checked before the next starts, and the plan adjusts if your mouth responds differently." },
    ],
    expect: [
      "Months rather than weeks, because healing cannot be rushed",
      "Temporary teeth or a softer diet during some phases",
      "The freedom to agree to one stage at a time",
      "A review schedule once the work is done",
    ],
    worthKnowing: {
      title: "The order matters as much as the work",
      copy: "Gums and bite usually have to be settled before new teeth are built on top of them. Working out that order is the first real task of the consultation.",
    },
    plainTitle: { title: "One plan instead of a queue of appointments.", highlight: "One plan" },
    visitTitle: { title: "Urgent first. The rest in order.", highlight: "in order" },
    note: { line: "Bring the whole list. We will put it in order.", highlight: "in order" },
    doctorSlugs: ["dr-mayur-kheni", "dr-jinali-monpara"],
    /** Every option ticked on form p37. Patient wording, no promises. */
    offer: {
      title: "Ways a full mouth is rebuilt",
      items: [
        "Full mouth rehabilitation planned as one sequence",
        "Bridges carried by your own teeth",
        "Bridges carried by implants",
        "A fixed set of teeth for a whole jaw",
        "A removable denture",
        "A denture that clips onto implants",
      ],
      note: "Most plans use more than one of these. Which combination suits you is worked out from your bite, your gums and the bone underneath.",
    },
    /** Crown materials ticked on form p37. Names only, no grading. */
    brands: {
      title: "Crown materials we work with",
      items: ["Zirconia", "E.max (lithium disilicate)", "Porcelain fused to metal", "Metal", "Temporary"],
      note: "Each material suits a different job. Where the tooth sits, how hard you bite on it and how visible it is decide which one is used.",
    },
    ctaTitle: "Bring the whole list to one appointment.",
    whatsappMessage: "Hello Kheni Dental, several of my teeth need work and I would like to book a consultation to plan it. Thank you.",
    featured: true,
    faqs: [
      {
        question: "Do I have to commit to all of it at the start?",
        answer: "No. What you agree to first is usually the part that protects your health, such as infection, loose teeth or gum problems. The rest can be discussed once that phase is behind you.",
      },
      {
        question: "How do I know I really need this much work?",
        answer: "Ask the dentist to show you what they are seeing, tooth by tooth, and what happens if a particular item is left alone. Taking a second opinion before a large course of treatment is normal and sensible.",
      },
      {
        question: "Can I eat and work normally between stages?",
        answer: "For most of the plan, yes, though some phases involve temporary teeth or a softer diet. Tell us about travel, work or a family event in advance so stages can be arranged around them.",
      },
      {
        question: "How is the cost decided?",
        answer: "By the number of teeth involved, which treatments the plan needs and how many stages it runs to. You get the full plan with an estimate for each stage before treatment starts, and you can agree to it one stage at a time.",
      },
    ],
  },
  {
    slug: "crowns-and-bridges",
    title: "Crowns & Bridges",
    shortTitle: "Crowns",
    seoTitle: "Dental Crowns & Bridges in Surat",
    metaDescription:
      "Crowns and bridges in Surat at Kheni Dental. A crown strengthens a weak or broken tooth; a bridge fills a gap. Both planned around your bite.",
    hue: "amber",
    category: "restorative",
    concern: "I am scared to bite down on that tooth.",
    headline: "Bite down without bracing yourself.",
    short: "A crown covers and strengthens a weak or broken tooth. A bridge fills a gap using the teeth on either side.",
    intro:
      "You already know which tooth it is. The one you steer hard food away from, the one that twinges on ice, the one that has been filled and refilled until not much is left. A crown fits over what remains so the tooth can take normal chewing force again. A bridge does a related job across a gap, using the teeth on either side for support.",
    signs: [
      "A tooth that has cracked or broken",
      "A large old filling that keeps failing",
      "A tooth after root canal treatment",
      "A gap where a bridge could fit",
    ],
    visit: [
      { title: "What the tooth can take", copy: "How much sound tooth is left, how the gum is doing and where your bite lands on it. Then crown, bridge or a smaller repair." },
      { title: "Getting the tooth ready", copy: "The tooth is shaped so the new cover sits over it without feeling bulky. A temporary is fitted while the final one is made." },
      { title: "Measuring and matching", copy: "Records of your teeth guide how the crown is built, and the shade is picked against the teeth on either side." },
      { title: "Fitting and checking", copy: "Fit, contact with neighbouring teeth and your bite are checked before anything is fixed in place." },
    ],
    expect: [
      "A temporary crown for a short while",
      "Slight sensitivity to hot and cold at first",
      "A quick adjustment if the bite feels high",
      "Cleaning at the gum line like any other tooth",
    ],
    worthKnowing: {
      title: "A crown covers, it does not cure",
      copy: "A crowned tooth still needs brushing and cleaning between the teeth. Whether a crack has already reached the nerve is something only an examination and imaging can tell.",
    },
    plainTitle: { title: "A cap for a tooth that has had enough.", highlight: "had enough" },
    visitTitle: { title: "Two visits, and a tooth you can trust again.", highlight: "trust again" },
    note: { line: "You already know which tooth it is.", highlight: "which tooth" },
    offer: {
      title: "Crown and bridge options",
      items: [
        "Zirconia crowns",
        "E.max (lithium disilicate) crowns",
        "Porcelain fused to metal crowns",
        "Metal crowns for back teeth",
        "Temporary crowns while the final one is made",
        "Bridges supported by your own teeth",
        "Bridges supported by implants",
      ],
      note: "Which material suits a tooth depends on where it is, how hard you bite on it and how visible it is.",
    },
    doctorSlugs: ["dr-jinali-monpara", "dr-mayur-kheni", "dr-ishita-dobariya", "dr-parita-vastarpara"],
    featured: true,
    ctaTitle: "Let us look at the tooth you do not trust.",
    whatsappMessage: "Hello Kheni Dental, I would like to ask about a crown or bridge and book an appointment. Thank you.",
    faqs: [
      {
        question: "Will it feel like my own tooth?",
        answer: "Most people stop noticing a well-fitted crown within a few days. Some sensitivity to hot and cold for a short period is common. If it still feels high after a week, come back and let us adjust it.",
      },
      {
        question: "Can I just have a filling instead?",
        answer: "Sometimes, yes, and we would say so. When enough strong tooth is left, a filling is the smaller repair. A crown is discussed when so much of the tooth has been lost or cracked that a filling would risk breaking away with it.",
      },
      {
        question: "How is the cost decided?",
        answer: "By the material chosen, the number of teeth involved and whether the tooth needs any treatment first. The dentist explains the options and the estimate after examining the tooth.",
      },
    ],
  },
  {
    slug: "kids-dentistry-surat",
    title: "Kids Dentistry",
    shortTitle: "Kids",
    seoTitle: "Kids Dentist in Surat",
    metaDescription:
      "Kids dentist in Surat. Children's dental visits at Kheni Dental paced around your child, with Dr. Ishita Dobariya, our Kids Specialist. Plain words for them, straight answers for you.",
    hue: "mint",
    category: "kids",
    concern: "My child is scared and I do not want to make it worse.",
    headline: "A first visit your child will not dread.",
    short: "Children's check-ups and treatment paced around what your child can manage, with straight answers for parents.",
    intro:
      "Most parents walk in a little tense, worried the visit will end in tears and put their child off dentists for years. That worry changes how we run children's appointments. Dr. Ishita Dobariya, our Kids Specialist, lets a child look around, ask what the little mirror is for and decide they are safe before anything is checked. Whatever needs attention is explained to you in plain words first.",
    signs: [
      "A first dental visit",
      "A child who is anxious after a bad experience elsewhere",
      "A cavity, a wobbly tooth or a knocked tooth",
      "Advice on brushing, thumb habits or diet",
    ],
    visit: [
      { title: "Before you arrive", copy: "Tell us on the phone if your child is anxious. We can look for a quieter slot and keep the first visit short." },
      { title: "Time to look around", copy: "Your child sits in the chair, sees the mirror and hears what each thing does before anyone counts a tooth." },
      { title: "The check itself", copy: "Teeth, gums and bite are checked at whatever pace your child allows. You stay beside the chair." },
      { title: "What you hear next", copy: "If something needs treating, you hear what it is, what the choices are and what happens if you wait." },
    ],
    expect: [
      "A first visit that may be nothing more than sitting in the chair",
      "A second short visit that usually goes better",
      "Numbing explained to your child in their own words if it is needed",
      "Brushing and diet advice suited to their age",
    ],
    worthKnowing: {
      title: "What you say at home matters more",
      copy: "Keep the build-up short and ordinary, and avoid promising that nothing will be done. If your child has had a hard time at a dental visit before, tell us on the phone rather than in the waiting room.",
    },
    plainTitle: { title: "The first visit is mostly looking around.", highlight: "looking around" },
    visitTitle: { title: "At the child's pace, not the clock's.", highlight: "the child's pace" },
    note: { line: "First we make friends with the chair.", highlight: "make friends" },
    offer: {
      title: "What we do for children",
      items: [
        "First dental visits",
        "Fillings in baby and adult teeth",
        "Fluoride application to strengthen enamel",
        "Sealants on the grooves of back teeth",
        "Treating a baby tooth's nerve (pulpotomy or pulpectomy) so the tooth can stay until it is ready to fall out",
        "Stainless steel crowns for badly decayed baby teeth",
        "Space maintainers when a baby tooth is lost early",
        "Advice on thumb sucking and other habits",
        "Emergency visits for a knocked or aching tooth",
      ],
    },
    doctorSlugs: ["dr-ishita-dobariya"],
    ctaTitle: "Tell us about your child before the visit.",
    whatsappMessage: "Hello Kheni Dental, I would like to book a visit for my child. Thank you.",
    featured: true,
    faqs: [
      {
        question: "How old should my child be for the first visit?",
        answer: "Common professional guidance is to bring a child in once the first teeth appear, or around the first birthday. An early visit is mostly about you: feeding, brushing, thumb habits and what to watch for.",
      },
      {
        question: "What if my child cries or will not open their mouth?",
        answer: "It happens often, and nobody is held down. Sometimes the first appointment ends with nothing more than sitting in the chair. A short second visit usually goes better because the room is no longer new.",
      },
      {
        question: "Do baby teeth with cavities really need treating?",
        answer: "Sometimes yes, sometimes no. It depends on which tooth it is and how long before it is due to come out. Baby teeth hold space for the adult ones and can hurt or become infected in the meantime. Dr. Ishita will tell you after examining the tooth.",
      },
    ],
  },
  {
    slug: "gum-care-surat",
    title: "Gum Care",
    shortTitle: "Gums",
    seoTitle: "Gum Treatment in Surat for Bleeding Gums",
    metaDescription:
      "Gum care in Surat at Kheni Dental. Gums that bleed, swell or affect your breath are checked early, cleaned properly and given a daily routine that works.",
    hue: "green",
    category: "everyday",
    concern: "My gums bleed when I brush.",
    headline: "Gums that bleed are asking for attention.",
    short: "Finds out why your gums bleed or swell, cleans away what is causing it and sets a daily routine that keeps it away.",
    intro:
      "It usually shows up in the sink, or when someone stands a little too close. Bleeding, swelling and breath that does not freshen after brushing tend to start in the same place: the line where gum meets tooth. How much treatment is needed depends on how long it has been going on and whether the bone holding the tooth has been affected.",
    signs: [
      "Blood when you brush or floss",
      "Red, swollen or tender gums",
      "Bad breath that brushing does not fix",
      "Gums pulling back or teeth feeling loose",
    ],
    visit: [
      { title: "Check every tooth", copy: "Where the bleeding starts, how much deposit has built up and whether anything feels loose. Imaging where the bone needs to be seen." },
      { title: "Tell you what we found", copy: "Where the gums are healthy, where they are not, and what is driving it." },
      { title: "Clean it properly", copy: "Deposits are removed above and below the gum line. How many visits depends on how much there is." },
      { title: "Watch how it settles", copy: "Gums need a few weeks to respond. We look again and adjust the routine." },
    ],
    expect: [
      "Some sensitivity to cold for a few days after cleaning",
      "Gums that feel different once the build-up is gone",
      "A brushing and cleaning routine matched to where you bleed",
      "Regular checks so it does not creep back",
    ],
    worthKnowing: {
      title: "Gums can stop bleeding without healing",
      copy: "Bleeding often eases off for a while, and people who smoke may bleed very little even when the gums are not healthy. Gum health is checked tooth by tooth, never judged from how it feels at home.",
    },
    plainTitle: { title: "It starts where the gum meets the tooth.", highlight: "where the gum meets the tooth" },
    visitTitle: { title: "Clean below the gumline, where a brush cannot reach.", highlight: "below the gumline" },
    note: { line: "Pink in the sink is common. It is not normal.", highlight: "not normal" },
    offer: {
      title: "Gum care we offer",
      items: [
        "Scaling to remove hardened deposits",
        "Polishing",
        "Deep cleaning below the gum line",
        "Gum surgery where cleaning alone is not enough",
        "Regular maintenance visits once the gums have settled",
      ],
    },
    doctorSlugs: [],
    ctaTitle: "Tell us what your gums are doing.",
    whatsappMessage: "Hello Kheni Dental, my gums have been bleeding and I would like to book a check. Thank you.",
    faqs: [
      {
        question: "My gums only bleed sometimes. Is that still a problem?",
        answer: "It is worth mentioning, especially if it happens at the same spot every time. Healthy gums do not usually bleed from ordinary brushing.",
      },
      {
        question: "Is gum disease reversible?",
        answer: "Inflammation limited to the gum can often settle once deposits are removed and the daily routine changes. Once bone around the tooth has been lost, the aim shifts to stopping further loss. Your dentist will tell you which situation you are in.",
      },
      {
        question: "Can bad breath come from my gums?",
        answer: "Gums can be one cause, along with the tongue, a dry mouth or a decayed tooth. If brushing and mouthwash only help for an hour or two, the source is usually still there.",
      },
    ],
  },
  {
    slug: "wisdom-tooth-oral-surgery",
    title: "Wisdom Tooth",
    shortTitle: "Wisdom Tooth",
    seoTitle: "Wisdom Tooth Treatment & Removal in Surat",
    metaDescription:
      "Wisdom tooth pain or swelling? Kheni Dental in Surat examines the cause first, then explains whether removal, treatment or simply watching it makes sense.",
    hue: "lavender",
    category: "surgical",
    concern: "My wisdom tooth hurts and the jaw feels swollen.",
    headline: "Find out if it really has to come out.",
    short: "Looks at the cause of wisdom tooth pain first, then explains whether removal, treatment or watching it makes sense.",
    intro:
      "Pain at the back of the jaw is hard to ignore and hard to describe. It can come from a wisdom tooth pressing on the tooth in front, from gum that keeps getting inflamed over a tooth that is only half through, or from decay in a spot your brush never reaches. Those causes do not lead to the same answer, which is why examination and imaging come before any talk of removal.",
    signs: [
      "Pain or swelling at the back of the jaw",
      "Gum that keeps getting sore over a half-erupted tooth",
      "Food trapping behind the last tooth",
      "A wisdom tooth pushing on the tooth in front",
    ],
    visit: [
      { title: "Look at the whole area", copy: "The tooth, the gum around it and the teeth beside it, with imaging to see the roots and how the tooth sits." },
      { title: "Decide whether it comes out", copy: "A well-positioned tooth you can keep clean may just be watched. One that keeps getting infected is discussed for removal, with the reason explained." },
      { title: "Plan the removal", copy: "Anaesthesia, roughly how long the appointment takes and what makes your case straightforward or more involved." },
      { title: "Get through the first week", copy: "Written instructions on eating, cleaning, swelling and rest, and a number to call." },
    ],
    expect: [
      "Swelling and stiffness for a few days, often peaking around day two",
      "A couple of quiet days rather than back to normal by morning",
      "Softer food while the area heals",
      "A review if one is needed",
    ],
    worthKnowing: {
      title: "When it needs urgent care",
      copy: "Swelling that spreads towards the eye or neck, difficulty swallowing, or a jaw you cannot open properly are reasons to seek urgent care rather than wait. Call the clinic and describe what you are seeing.",
    },
    plainTitle: { title: "A tooth that arrived late and out of room.", highlight: "out of room" },
    visitTitle: { title: "An answer first. Removal only if it is the answer.", highlight: "An answer first" },
    note: { line: "Not every wisdom tooth needs to leave. Some only need watching.", highlight: "watching" },
    offer: {
      title: "What we do",
      items: [
        "Consultation and X-ray to see how the tooth sits",
        "Simple removal of a tooth that has come through",
        "Surgical removal where the tooth is partly covered",
        "Removal of impacted wisdom teeth",
        "Local anaesthesia for all of the above",
      ],
    },
    doctorSlugs: [],
    ctaTitle: "Get an answer before it flares up again.",
    whatsappMessage: "Hello Kheni Dental, my wisdom tooth is troubling me and I would like to book an appointment. Thank you.",
    faqs: [
      {
        question: "Does a wisdom tooth always have to be removed?",
        answer: "No. A wisdom tooth that has come through in a workable position, stays clean and is not harming its neighbour can often just be watched. Removal is discussed when there is repeated infection, decay, pressure on the tooth in front, or a position that makes cleaning impossible.",
      },
      {
        question: "Can I go back to work the next day?",
        answer: "Some people take the day of surgery and the day after quietly at home, and some need longer. Talking, chewing and bending over all feel different for a few days. Plan a light couple of days.",
      },
      {
        question: "Is it safe to just take painkillers and wait?",
        answer: "Painkillers quieten the symptom for a while, but they do not clear an infection or change where the tooth is sitting. Pain that keeps returning to the same spot usually means something has not resolved.",
      },
    ],
  },
  {
    slug: "dental-check-up-surat",
    title: "Dental Check-up",
    shortTitle: "Check-up",
    seoTitle: "Dental Check-up & Cleaning in Surat",
    metaDescription:
      "Dental check-up in Surat at Kheni Dental. A proper look at your teeth and gums, cleaning where needed, and a straight answer about what needs doing and what can wait.",
    hue: "navy",
    category: "everyday",
    concern: "It has been longer than I would like since my last check-up.",
    headline: "Small problems are easier to keep small.",
    short: "A proper look at your teeth and gums, cleaning where it is needed, and a plain answer about what needs doing and what can wait.",
    intro:
      "Plenty of people put off a check-up because nothing hurts, or because it has been so long that going back feels awkward. That gap is more common than you think, and nobody here will lecture you about it. Most of what a check-up finds is small work, and small work stays small when it is caught early.",
    signs: [
      "It has been more than a year since your last visit",
      "You want to be seen before something starts hurting",
      "You would like your teeth cleaned",
      "The whole family needs a dentist in one place",
    ],
    visit: [
      { title: "Say when you last came", copy: "Roughly how long it has been and whether anything has been bothering you. There is no wrong answer." },
      { title: "A proper look", copy: "Teeth, gums and the soft tissues, including the areas you cannot see in the mirror at home." },
      { title: "Cleaning where needed", copy: "Build-up is removed and your teeth polished, with a routine to keep them that way." },
      { title: "What needs doing, in order", copy: "What needs attention now, what is worth watching, and what is fine as it is." },
    ],
    expect: [
      "A visit that is mostly examination and conversation",
      "Some sensitivity for a day or two after cleaning",
      "A next-visit interval set for you, not by a rule",
      "Small repairs sequenced over a few visits if needed",
    ],
    worthKnowing: {
      title: "Feeling fine is not the same as fine",
      copy: "Decay between teeth, a cracked filling and early gum changes often cause nothing at all until they are well established. That is exactly why check-ups exist.",
    },
    plainTitle: { title: "A proper look, and a plain list.", highlight: "plain list" },
    visitTitle: { title: "Say how long it has been. Then we start.", highlight: "Then we start" },
    note: { line: "Nobody here counts the years since your last visit.", highlight: "counts the years" },
    offer: {
      title: "A check-up can include",
      items: [
        "Examination of teeth, gums and soft tissues",
        "Digital X-rays where something needs to be seen",
        "Scaling and polishing (teeth cleaning)",
        "A written note of what needs doing and what can wait",
        "Advice on brushing, cleaning between teeth and diet",
      ],
    },
    doctorSlugs: ["dr-mayur-kheni", "dr-jinali-monpara", "dr-ishita-dobariya", "dr-parita-vastarpara"],
    ctaTitle: "Book the check-up you keep putting off.",
    whatsappMessage: "Hello Kheni Dental, I would like to book a dental check-up. Thank you.",
    faqs: [
      {
        question: "I have not been to a dentist in years. Where do I start?",
        answer: "This is one of the most common reasons people book. The first visit is mostly examination and conversation, so you leave knowing where you stand. If several things need attention, they are sequenced over a few visits.",
      },
      {
        question: "Nothing hurts. Do I still need to come in?",
        answer: "Pain tends to be a late signal. A check-up picks up decay between teeth, a cracked filling or early gum changes while they are still small.",
      },
      {
        question: "Can my children and I be seen at the same clinic?",
        answer: "Yes. Kheni Dental treats adults and children at both clinics. Call the branch you plan to visit to check doctor availability if you are booking more than one person.",
      },
    ],
  },
  {
    slug: "tooth-fillings-surat",
    title: "Fillings",
    shortTitle: "Fillings",
    seoTitle: "Tooth Fillings in Surat",
    metaDescription:
      "Tooth fillings in Surat at Kheni Dental. A cavity or a chipped tooth repaired before it grows into a bigger problem, with the shade matched to your own tooth.",
    hue: "sky",
    category: "everyday",
    concern: "There is a hole in my tooth and food keeps getting stuck.",
    headline: "Fix the small hole before it becomes a big one.",
    short: "Repairs a cavity or a small chip with a filling matched to your tooth, before it grows into something bigger.",
    intro:
      "A cavity rarely announces itself. Food starts catching in one spot, or cold water finds a tooth it never used to bother. A filling removes the decayed part and rebuilds the tooth so it can be cleaned and chewed on normally. Caught early, it is a short appointment. Left alone, the same tooth may end up needing a root canal or a crown.",
    signs: [
      "Food getting stuck in one place",
      "A dark spot or a visible hole",
      "A tooth that is sensitive to sweet or cold",
      "A small chip or a filling that has come out",
    ],
    visit: [
      { title: "Find the cavity", copy: "The tooth is examined and imaging used where decay between teeth needs to be seen." },
      { title: "Numb the area", copy: "Local anaesthesia if the cavity is deep enough to need it. You are told beforehand." },
      { title: "Remove and rebuild", copy: "The decayed part is removed and the tooth rebuilt with a filling shaped to your bite." },
      { title: "Check the bite", copy: "You close your teeth and move your jaw so nothing feels high before you leave." },
    ],
    expect: [
      "Numbness for a few hours if anaesthesia was used",
      "Mild sensitivity for a few days",
      "A quick adjustment if the bite feels high",
      "Normal brushing and cleaning from that evening",
    ],
    worthKnowing: {
      title: "A filling that keeps failing is telling you something",
      copy: "When a large filling breaks again and again, it may be that not enough sound tooth is left to hold it. That is when a crown gets discussed, and the dentist will say so plainly.",
    },
    plainTitle: { title: "Decay goes deeper than it looks.", highlight: "deeper than it looks" },
    visitTitle: { title: "One visit, if we catch it in time.", highlight: "in time" },
    note: { line: "Cold water found the tooth before you did.", highlight: "before you did" },
    offer: {
      title: "Fillings we place",
      items: [
        "Tooth-coloured composite fillings",
        "Glass ionomer fillings where they suit the tooth",
        "Temporary fillings, where a tooth needs settling first",
        "Fillings in children's teeth",
        "Replacing an old filling that has cracked or fallen out",
        "Repairing a small chip on a front tooth",
      ],
    },
    doctorSlugs: ["dr-mayur-kheni", "dr-jinali-monpara", "dr-ishita-dobariya", "dr-parita-vastarpara"],
    ctaTitle: "Get the small hole looked at this week.",
    whatsappMessage: "Hello Kheni Dental, I think I need a filling and would like to book an appointment. Thank you.",
    faqs: [
      {
        question: "Will the filling be visible?",
        answer: "Tooth-coloured fillings are matched to the shade of your own tooth, so on a front tooth they are hard to spot. Your dentist will discuss the material that suits the tooth and the bite.",
      },
      {
        question: "How long does a filling take?",
        answer: "A single small filling is usually done in one visit. Several fillings, or a deep one, may be spread over more than one appointment so each is done properly.",
      },
      {
        question: "How is the cost decided?",
        answer: "By the size of the cavity, the material used and how many teeth need attention. The dentist tells you the estimate after examining the tooth.",
      },
    ],
  },
  {
    slug: "teeth-whitening-surat",
    title: "Teeth Whitening",
    shortTitle: "Whitening",
    seoTitle: "Teeth Whitening in Surat",
    metaDescription:
      "Teeth whitening in Surat at Kheni Dental. The cause of the colour is checked first, because staining from tea and tobacco behaves differently from colour that comes from inside the tooth.",
    hue: "amber",
    category: "cosmetic",
    concern: "My teeth look yellow in every photo.",
    headline: "A brighter smile, once we know what dimmed it.",
    short: "Lightens teeth that have darkened or stained, after checking that whitening is the right answer for the colour you have.",
    intro:
      "Tea, coffee, tobacco and paan leave one kind of stain. Age, an old injury or a root canal leave another. Whitening works well on the first kind and hardly at all on the second, and it does nothing to crowns, veneers or white fillings, which stay the shade they were made. So the visit starts with the question of why the teeth look the way they do. If whitening is the answer, it is a short and reversible treatment.",
    signs: [
      "Teeth that look yellow or dull in photographs",
      "Staining from tea, coffee, tobacco or paan",
      "A wedding or an occasion coming up",
      "One tooth darker than the rest",
    ],
    visit: [
      { title: "Find the cause", copy: "The dentist looks at the colour, checks for decay and old fillings, and notes anything that whitening would not change." },
      { title: "Clean first", copy: "Surface deposits come off with a cleaning so the whitening reaches the enamel." },
      { title: "Whiten", copy: "A whitening gel is applied to the teeth in the clinic, or you are given a home kit with custom trays, depending on what suits you." },
      { title: "Check the shade", copy: "The new shade is compared with the starting one, and you hear how to keep it." },
    ],
    expect: [
      "Some sensitivity to cold for a day or two",
      "Crowns, veneers and fillings stay their original shade",
      "Colour that settles slightly in the first week",
      "Touch-ups later if tea, coffee or tobacco bring the stain back",
    ],
    worthKnowing: {
      title: "A darker single tooth is a different question",
      copy: "One tooth that has gone dark on its own often has a reason inside it, such as an old injury or a root canal. That needs an examination before any whitening, and may need a different treatment.",
    },
    plainTitle: { title: "Stain on the surface, or colour from inside?", highlight: "from inside" },
    visitTitle: { title: "Cause first. Then the gel.", highlight: "Cause first" },
    note: { line: "White is not one colour. It is the one that suits your face.", highlight: "suits your face" },
    doctorSlugs: ["dr-jinali-monpara"],
    offer: {
      title: "Whitening we offer",
      items: ["In-clinic whitening", "Take-home whitening with custom trays", "Cleaning and polishing beforehand", "Advice on what will and will not change colour"],
    },
    ctaTitle: "Find out if whitening will work on your teeth.",
    whatsappMessage: "Hello Kheni Dental, I would like to ask about teeth whitening and book an appointment. Thank you.",
    faqs: [
      {
        question: "How white will my teeth get?",
        answer: "It depends on the starting colour and the cause. Surface staining usually lightens well. Colour from inside the tooth changes less. The dentist will tell you what is realistic after looking, and will not promise a shade.",
      },
      {
        question: "Is whitening safe for the enamel?",
        answer: "Done under a dentist's supervision with the right concentration and time, whitening is a routine treatment. Sensitivity for a day or two is the common side effect. Whitening on top of untreated decay or gum disease is not, which is why the examination comes first.",
      },
      {
        question: "How long does it last?",
        answer: "Months to a couple of years, depending on how much tea, coffee, tobacco or paan comes into contact with the teeth afterwards. Touch-ups are simpler than the first treatment.",
      },
      {
        question: "How is the cost decided?",
        answer: "By whether the whitening is done in the clinic, at home, or both, and whether a cleaning is needed first. The dentist explains the plan and the estimate after the examination.",
      },
    ],
  },
  {
    slug: "dentures-surat",
    title: "Dentures",
    shortTitle: "Dentures",
    seoTitle: "Dentures & Implant-Supported Dentures in Surat",
    metaDescription:
      "Full dentures and implant-supported dentures in Surat at Kheni Dental & Elite Implant Center. For people who have lost most or all of their teeth, or whose denture no longer stays put.",
    hue: "navy",
    category: "restorative",
    concern: "My denture moves when I eat.",
    headline: "Teeth you can trust at the dinner table.",
    short: "Replaces a full set of teeth with a removable denture, or one held steady by implants so it stops moving when you eat.",
    intro:
      "A denture that slips changes what you order, how you laugh and who you eat with. Some people have worn one for years and stopped expecting better. A well-made full denture fits the shape of your gums today, not the shape they had a decade ago. Where the bone allows, a few implants can hold a denture in place so it clicks on and stays put, which is a different experience altogether.",
    signs: [
      "Most or all teeth missing in one jaw or both",
      "A denture that slips when you eat or talk",
      "Sore spots under an old denture",
      "You avoid eating in company",
    ],
    visit: [
      { title: "Look at what is there", copy: "The gums, the ridge of bone, any remaining teeth and your existing denture, with an X-ray where the bone needs to be seen." },
      { title: "Choose the type", copy: "A conventional full denture, or one supported by implants. The bone, your health and what you want from it decide, and both are explained." },
      { title: "Make it fit", copy: "Impressions or a scan, a trial fitting to check the bite and the look, then the final denture." },
      { title: "Adjust and review", copy: "New dentures need small adjustments in the first weeks. Sore spots are eased at a review, not put up with." },
    ],
    expect: [
      "A few weeks to get used to speaking and eating",
      "Small adjustments in the early visits",
      "Cleaning the denture and the gums every day",
      "For implant-supported dentures, healing time before the denture is fixed to the implants",
    ],
    worthKnowing: {
      title: "The ridge keeps changing",
      copy: "Bone under a denture slowly reduces over the years, which is why an old denture loosens. Implants can slow that change where they are placed. Either way, a denture needs checking, and sometimes relining, every few years.",
    },
    plainTitle: { title: "A full set, made for the mouth you have now.", highlight: "have now" },
    visitTitle: { title: "Fit it. Try it. Then fix it in.", highlight: "Try it" },
    note: { line: "Nobody should have to choose their food by what will not move a denture.", highlight: "will not move" },
    doctorSlugs: ["dr-mayur-kheni", "dr-jinali-monpara"],
    offer: {
      title: "Denture options",
      items: [
        "Full dentures for the upper jaw, the lower jaw, or both",
        "Implant-supported dentures that clip onto implants",
        "Fixed full-arch teeth on implants, where the bone allows",
        "Relining or remaking an existing denture",
      ],
      note: "Implant-supported options are planned with our implant team after an examination and imaging.",
    },
    ctaTitle: "Ask about a denture that stays put.",
    whatsappMessage: "Hello Kheni Dental, my denture moves when I eat and I would like to ask about my options. Thank you.",
    faqs: [
      {
        question: "Can my old denture be made to fit better?",
        answer: "Sometimes, by relining it to the current shape of the gums. Often, when the denture is worn or the ridge has changed a lot, a new one fits better. The dentist will say which after looking at it in your mouth.",
      },
      {
        question: "How many implants does a denture need?",
        answer: "Fewer than people expect. A lower denture is often held by two implants, an upper one by more, and a fixed full-arch replacement by more again. The number depends on the bone and what the denture has to do. It is decided after imaging.",
      },
      {
        question: "Do I take an implant-supported denture out?",
        answer: "A denture that clips onto implants comes out for cleaning and goes back in. A fixed full-arch replacement stays in and is cleaned in the mouth like teeth. Which suits you is part of the planning conversation.",
      },
      {
        question: "How is the cost decided?",
        answer: "By the type of denture, whether implants are involved and how many, and whether any teeth need removing first. You get the plan and the estimate for each stage before treatment starts.",
      },
    ],
  },
];

export const treatmentBySlug = (slug: string) => treatments.find((t) => t.slug === slug);

export const doctorBySlug = (slug: string) => doctors.find((d) => d.slug === slug);

/**
 * "What brings you in today?"
 *
 * Nine things a patient can recognise about their own mouth in a second, in
 * the words they would actually use. Tapping one goes straight to the
 * relevant treatment. It never diagnoses; it only points.
 */
export type Concern = {
  id: string;
  label: string;
  /** One short reassuring line. */
  sub: string;
  href: string;
  hue: Hue;
  /** Illustration key, resolved by the concern icon component. */
  icon: "pain" | "gap" | "crooked" | "smile" | "child" | "gums" | "wisdom" | "broken" | "checkup";
};

export const concerns: Concern[] = [
  { id: "pain", label: "Tooth pain", sub: "It throbs at night, or catches on anything cold", href: "/treatments/root-canal-treatment-surat/", hue: "sky", icon: "pain" },
  { id: "gap", label: "A missing tooth", sub: "A gap you have learned to chew around", href: "/treatments/dental-implants-surat/", hue: "gold", icon: "gap" },
  { id: "crooked", label: "Crooked teeth", sub: "Crowded, gappy, or a bite that never sat right", href: "/treatments/braces-clear-aligners/", hue: "violet", icon: "crooked" },
  { id: "smile", label: "How my smile looks", sub: "You have started smiling with your mouth closed", href: "/treatments/cosmetic-smile-dentistry/", hue: "coral", icon: "smile" },
  { id: "child", label: "My child's teeth", sub: "A first visit, a cavity, or a child who is frightened", href: "/treatments/kids-dentistry-surat/", hue: "mint", icon: "child" },
  { id: "gums", label: "Bleeding gums", sub: "Pink in the sink every time you brush", href: "/treatments/gum-care-surat/", hue: "green", icon: "gums" },
  { id: "wisdom", label: "Wisdom tooth", sub: "That ache right at the back that will not settle", href: "/treatments/wisdom-tooth-oral-surgery/", hue: "lavender", icon: "wisdom" },
  { id: "broken", label: "A broken tooth", sub: "A chip, a crack, or a filling that fell out", href: "/treatments/crowns-and-bridges/", hue: "amber", icon: "broken" },
  { id: "checkup", label: "Just a check-up", sub: "It has been a while. You will not get a lecture", href: "/treatments/dental-check-up-surat/", hue: "navy", icon: "checkup" },
];

/**
 * Smile Notes.
 *
 * Short Kheni lines set between sections. They are brand voice, never
 * patient quotes, and never claims. One highlighted word each.
 */
export type SmileNote = { line: string; highlight: string; hue: Hue };

export const smileNotes: SmileNote[] = [
  { line: "Come in with a worry. Leave with a plan.", highlight: "a plan", hue: "gold" },
  { line: "We ask more questions than you are expecting.", highlight: "more questions", hue: "coral" },
  { line: "Two clinics in Surat. The same care at both.", highlight: "the same care", hue: "teal" },
  { line: "Your smile is personal. The plan should be too.", highlight: "personal", hue: "violet" },
  { line: "No treatment begins before you understand why.", highlight: "why", hue: "green" },
  { line: "A missing tooth changes more than your smile.", highlight: "more", hue: "gold" },
  { line: "The right treatment is often the smaller one.", highlight: "smaller", hue: "amber" },
  { line: "Chew on both sides again.", highlight: "both sides", hue: "gold" },
  { line: "Pain is information. We start there.", highlight: "information", hue: "teal" },
  { line: "A tooth saved beats a tooth replaced.", highlight: "saved", hue: "mint" },
  { line: "Ask the question you think is silly. It never is.", highlight: "never is", hue: "lavender" },
  { line: "Smile in photos again. That is the whole point.", highlight: "in photos", hue: "sky" },
];

export const resources = [
  {
    title: "Your first visit",
    description: "What to bring, how long to allow, and the questions worth asking while you are still in the chair.",
    href: "/patient-resources/#first-visit",
  },
  {
    title: "Thinking about implants",
    description: "What gets checked, what the stages actually involve, and how long the waiting between them really is.",
    href: "/patient-resources/#implant-care",
  },
  {
    title: "After a root canal",
    description: "How the tooth will feel over the next few days, what helps, and the signs that mean you should ring us.",
    href: "/patient-resources/#aftercare",
  },
  {
    title: "Bringing a child in",
    description: "What to say at home beforehand, and the words to avoid, so the chair feels less strange when they get here.",
    href: "/patient-resources/#kids",
  },
] as const;

export const homepageFaqs = [
  {
    question: "It has been years since I saw a dentist. Will I get a lecture?",
    answer:
      "No. People put off the dentist for all sorts of reasons and we have heard most of them. You will get an examination, a plain account of what we found, and a plan that starts with whatever matters most. Where the news is not good, we will say so kindly and then tell you what can be done.",
  },
  {
    question: "Is it going to hurt?",
    answer:
      "Anything uncomfortable is done under local anaesthesia, so the tooth and the area around it are numb while we work. We will tell you what you are likely to feel before it happens rather than after. Say at the start that you are nervous and the pace changes: more breaks, more warning, more explaining.",
  },
  {
    question: "Do I need to know which treatment I need?",
    answer:
      "No. Most people arrive with a symptom, not a diagnosis. Tell us what you noticed and where, and the examination sorts out the rest. You do not need the right word for it.",
  },
  {
    question: "How is the cost worked out?",
    answer:
      "By what the examination finds, which is why there are no prices on this site. Once the dentist has looked, you get the plan and the estimate for each stage before anything starts. For longer treatments you agree to one stage, see how it goes, and decide the next.",
  },
  {
    question: "How long will my treatment take?",
    answer:
      "A check-up or a filling is usually one visit. Root canals often take more than one. Braces, implants and full mouth work run over months, because bone and gums heal on their own schedule and no dentist can hurry them. You get a realistic timeline after the examination, not before it.",
  },
  {
    question: "Which Kheni clinic should I visit?",
    answer:
      "Whichever is easier to reach. Our first clinic is at Swastik Plaza, Yogi Chowk, and the second is at Hirabaug on Varachha Main Road. Implant treatment is planned and placed at Yogi Chowk. If you are not sure, message us and we will pick one for you.",
  },
  {
    question: "Do you treat children?",
    answer:
      "Yes. Dr. Ishita Dobariya sees our youngest patients and paces a visit around what the child can actually manage that day. Tell us on the phone if your child is frightened, and we will plan the appointment around that rather than around the clock.",
  },
  {
    question: "What should I bring to my first visit?",
    answer:
      "The names of any medicines you take, any old X-rays or reports you still have, and a rough idea of when the problem started. That is enough. If you have none of it, come anyway.",
  },
  {
    question: "How do I book?",
    answer:
      "Tap Book Appointment and choose WhatsApp or a call, or ring the clinic you want to visit. There is no long form to fill in. A one line message with what is bothering you is plenty to start.",
  },
  {
    question: "Can NRIs and international patients plan before travelling?",
    answer:
      "Yes, and it is worth doing. Send your travel dates and what you would like looked at before you book flights. We will tell you honestly what fits into the trip and what would need a second one, so you are not booking a return ticket you did not plan for.",
  },
] as const;
