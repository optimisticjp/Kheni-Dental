export const site = {
  name: "Kheni Dental & Elite Implant Center",
  shortName: "Kheni Dental",
  domain: "https://www.khenidentalcare.com",
  email: "smile@khenidentalcare.com",
  city: "Surat",
  region: "Gujarat",
  country: "India",
  tagline: "Dentistry explained before it is done.",
  description:
    "Fifteen years of dental care in Surat, led by Dr. Mayur Kheni. Implants, root canals, braces, kids and everyday dentistry at two clinics in the city.",
  instagram: "https://www.instagram.com/khenielite",
  primaryPhoneDisplay: "+91 95101 12354",
  primaryPhoneHref: "+919510112354",
  whatsappNumber: "919510112354",
  yearsInSurat: 15,
  googleRating: "4.9",
  googleReviewCount: "1,593",
  googleReviewDisplay: "1,500+",
  googleReviewBranch: "Swastik Plaza",
  googleProfileUrl: "https://maps.app.goo.gl/iKskGAZuZL92Tm7G7",
  googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJddZdiXpP4DsRvtrOvXjbQqA",
  consultationMessage:
    "Hello Kheni Dental, I would like to book a consultation. Please let me know which days and times are open. Thank you.",
} as const;

/**
 * Primary navigation. Six choices, matching how Indian dental sites that
 * convert well prioritise: treatments, the flagship treatment, who treats you,
 * where to go, proof, and how to reach us. Treatments opens a menu of the
 * high-intent treatments rather than sending people to an index page first.
 */
export type NavItem = { href: string; label: string; hasMenu?: boolean; featured?: boolean };

export const primaryNav: NavItem[] = [
  { href: "/treatments", label: "Treatments", hasMenu: true },
  { href: "/treatments/dental-implants-surat", label: "Dental Implants", featured: true },
  { href: "/doctors", label: "Doctors" },
  { href: "/locations", label: "Our Clinics" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

/** Lower-priority pages. Shown quietly, never as equal-weight rows. */
export const secondaryNav: NavItem[] = [
  { href: "/about", label: "About the clinic" },
  { href: "/problems-we-treat", label: "Problems we treat" },
  { href: "/international-patients", label: "International & NRI" },
  { href: "/clinic-technology", label: "Our technology" },
  { href: "/smile-gallery", label: "Before & after" },
  { href: "/patient-resources", label: "Patient guides" },
];

/** Full list, used by the footer sitemap. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/treatments", label: "Treatments" },
  { href: "/doctors", label: "Doctors" },
  { href: "/locations", label: "Our Clinics" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/international-patients", label: "International & NRI" },
  { href: "/patient-resources", label: "Resources" },
] as const;

/** Treatments surfaced directly in the navigation menu, in patient language. */
export const featuredTreatmentSlugs = [
  "dental-implants-surat",
  "root-canal-treatment-surat",
  "crowns-and-bridges",
  "braces-clear-aligners",
  "cosmetic-smile-dentistry",
  "kids-dentistry-surat",
] as const;

export type Location = {
  slug: string;
  name: string;
  shortName: string;
  /** How patients recognise the area. Yogi Chowk, not the postal locality. */
  areaLabel: string;
  /** Full postal address. May still contain the official locality name. */
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  mapsUrl: string;
  /** Query used by the lazy Google Maps embed for this branch. */
  mapEmbedQuery: string;
  googleProfileUrl: string;
  googleWriteReviewUrl: string;
  googlePlaceId: string;
  /**
   * Google reputation is tracked per branch. `status` decides whether the
   * review card shows a real figure or a labelled placeholder, so one branch
   * can never silently borrow the other branch's rating.
   */
  google: {
    status: "verified" | "pending-verification";
    rating?: string;
    reviewCount?: string;
    verifiedOn?: string;
  };
  hours: string;
  hoursNote?: string;
  /** One short line a patient can act on. Not a paragraph. */
  note: string;
  /** True for the branch that carries the Elite Implant Center. */
  implantCentre?: boolean;
};

export const locations: Location[] = [
  {
    slug: "swastik-plaza",
    name: "Kheni Dental, Swastik Plaza",
    shortName: "Swastik Plaza",
    areaLabel: "Yogi Chowk, Surat",
    address:
      "Shop No. 38-39, Swastik Plaza, Yogi Chowk Ground, Chikuwadi, Nana Varachha, Surat, Gujarat 395011, India",
    phoneDisplay: "+91 95101 12354",
    phoneHref: "+919510112354",
    whatsappNumber: "919510112354",
    mapsUrl: "https://maps.app.goo.gl/iKskGAZuZL92Tm7G7",
    mapEmbedQuery: "Kheni+Dental+Clinic,+Swastik+Plaza,+Yogi+Chowk,+Nana+Varachha,+Surat,+Gujarat+395011",
    googleProfileUrl: "https://maps.app.goo.gl/iKskGAZuZL92Tm7G7",
    googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJddZdiXpP4DsRvtrOvXjbQqA",
    googlePlaceId: "ChIJddZdiXpP4DsRvtrOvXjbQqA",
    google: { status: "verified", rating: "4.9", reviewCount: "1,593", verifiedOn: "27 August 2026" },
    hours: "Mon-Sat 9:30 AM-1:00 PM and 4:00 PM-8:00 PM",
    hoursNote: "Clinic-provided hours. Call before travelling if your visit is time-sensitive.",
    note: "Our original clinic at Yogi Chowk, next to Apple Square. Family dentistry, root canals, braces and kids treatment, with implant care too.",
  },
  {
    slug: "hirabaug",
    name: "Kheni Dental & Elite Implant Center, Hirabaug",
    shortName: "Hirabaug",
    areaLabel: "Varachha Main Road, Surat",
    address:
      "2, Varachha Main Road, above Shiv Plywood, near New Shakti Vijay Society, opposite Surat Super Store, Hirabaug, Surat, Gujarat 395006, India",
    phoneDisplay: "+91 97379 97543",
    phoneHref: "+919737997543",
    whatsappNumber: "919737997543",
    mapsUrl: "https://maps.app.goo.gl/hkHmTr8ZxLYaH8Vc9",
    mapEmbedQuery: "Kheni+Dental+Elite+Implant+Center,+Varachha+Main+Road,+Hirabaug,+Surat,+Gujarat+395006",
    googleProfileUrl: "https://maps.app.goo.gl/hkHmTr8ZxLYaH8Vc9",
    googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ89yBAKVP4DsR3TYY_211oRg",
    googlePlaceId: "ChIJ89yBAKVP4DsR3TYY_211oRg",
    // Google did not surface a confirmable live rating for this profile during
    // the research pass. The card renders with a labelled placeholder rather
    // than reusing the Yogi Chowk figure. See docs/CLINIC-CONTENT-NEEDED.md.
    google: { status: "pending-verification" },
    hours: "Mon-Sat 9:30 AM-1:00 PM and 4:00 PM-8:00 PM",
    hoursNote: "Clinic-provided hours. Call before travelling if your visit is time-sensitive.",
    note: "Our Elite Implant Center on Varachha Main Road, above Shiv Plywood. Implants, full mouth cases and smile design are led from here.",
    implantCentre: true,
  },
];

// Real Google review excerpts captured during the August 2026 research pass.
// Never edit, paraphrase or add to these. Only the theme label is editorial.
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

export type Doctor = {
  slug: string;
  name: string;
  credentials: string;
  specialty: string;
  yearsExperience: number;
  badges: string[];
  bio: string;
  philosophy: string;
  approachHeading: string;
  metaDescription: string;
  relatedTreatmentSlugs: string[];
};

export const doctors: Doctor[] = [
  {
    slug: "dr-mayur-kheni",
    name: "Dr. Mayur Kheni",
    credentials: "B.D.S.",
    specialty: "Implantologist & Cosmetic Dental Surgeon",
    yearsExperience: 15,
    badges: ["Dental Implants", "Tooth Replacement", "Cosmetic Dentistry"],
    bio:
      "Dr. Mayur Kheni leads Kheni Dental. He works in implantology and cosmetic dental surgery, so people usually reach him about a gap they have stopped chewing on, a denture that keeps shifting, or older dental work that no longer holds up. He has been in practice for 15 years.",
    philosophy:
      "Nobody should agree to treatment they could not explain to someone else afterwards. If the reason is still fuzzy, the consultation is not finished.",
    approachHeading: "Decisions made after the explanation, not before.",
    metaDescription:
      "Dr. Mayur Kheni, B.D.S., leads Kheni Dental in Surat. Implantology and cosmetic dental surgery, with 15 years in practice. Ask about an appointment.",
    relatedTreatmentSlugs: ["dental-implants-surat", "cosmetic-smile-dentistry", "full-mouth-rehabilitation"],
  },
  {
    slug: "dr-jinal-monapara",
    name: "Dr. Jinal Monapara",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon & Smile Designing Specialist",
    yearsExperience: 9,
    badges: ["Smile Design", "Crowns & Bridges", "General Dentistry"],
    bio:
      "Dr. Jinal Monapara is a dental surgeon and smile designing specialist. Patients usually come to her about one thing they keep noticing in photographs, a chipped edge, a gap, a shade that no longer matches, and she talks through what can be changed and what is better left alone. She has 9 years in practice.",
    philosophy:
      "The right result is usually the smallest change that gets you what you came for. If you stop recognising yourself in the mirror, we have gone too far.",
    approachHeading: "The smallest change that does the job.",
    metaDescription:
      "Dr. Jinal Monapara, B.D.S., dental surgeon and smile designing specialist at Kheni Dental, Surat. Nine years in practice. Ask what your choices are.",
    relatedTreatmentSlugs: ["cosmetic-smile-dentistry", "crowns-and-bridges", "general-family-dentistry"],
  },
  {
    slug: "dr-ishita-dobariya",
    name: "Dr. Ishita Dobariya",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon & Kids Specialist",
    yearsExperience: 4,
    badges: ["Kids Dentistry", "First Dental Visits", "Family Dentistry"],
    bio:
      "Dr. Ishita Dobariya is a dental surgeon and the Kids Specialist at Kheni Dental. Most of her appointments are with children, including first visits and the child who has already decided they will not open their mouth. She works at a pace the child can manage, tells the parent what she is seeing as she goes, and has 4 years in practice.",
    philosophy:
      "A child who is not frightened this time will sit down more easily next time. That matters more to me than getting everything finished in one appointment.",
    approachHeading: "What a first visit should feel like.",
    metaDescription:
      "Dr. Ishita Dobariya, B.D.S., dental surgeon and Kids Specialist at Kheni Dental, Surat. Four years in practice, working mostly with children.",
    relatedTreatmentSlugs: ["kids-dentistry-surat", "general-family-dentistry"],
  },
  {
    slug: "dr-parita-vastarpara",
    name: "Dr. Parita Vastarpara",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon",
    yearsExperience: 4,
    badges: ["Everyday Dentistry", "Root Canal Treatment", "Preventive Checks"],
    bio:
      "Dr. Parita Vastarpara is a dental surgeon at Kheni Dental. She sees people for everyday dental needs, the check-up that is well overdue, a filling, a tooth that has started aching at night. Most of it is work that is easier done now than later, and she has four years of experience.",
    philosophy:
      "Most people are not avoiding the dentist so much as avoiding not knowing what is wrong. Once you hear it in plain words, the rest of the appointment gets much easier.",
    approachHeading: "Plain words before anything else happens.",
    metaDescription:
      "Dr. Parita Vastarpara, B.D.S., is a dental surgeon at Kheni Dental in Surat, with 4 years in practice covering everyday dentistry and check-ups.",
    relatedTreatmentSlugs: ["general-family-dentistry", "root-canal-treatment-surat", "crowns-and-bridges"],
  },
];

export type Treatment = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  problem: string;
  emotionalHeadline: string;
  short: string;
  intro: string;
  benefits: string[];
  aside: { title: string; copy: string };
  processHeading: string;
  process: { title: string; copy: string }[];
  ctaTitle: string;
  faqs: { question: string; answer: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: "dental-implants-surat",
    title: "Dental Implants",
    seoTitle: "Dental Implants in Surat",
    metaDescription:
      "Missing a tooth and chewing on one side? Learn how dental implants in Surat are assessed, staged and honestly compared with bridges and dentures.",
    eyebrow: "Implant dentistry in Surat",
    problem: "I only chew on one side now.",
    emotionalHeadline: "A tooth you do not have to think about.",
    short:
      "For a missing tooth or a denture that shifts, an implant can carry a fixed replacement, once an examination shows your bone and gums can support one.",
    intro:
      "A missing tooth changes how you eat before you notice it. You move food to the other side, you choose the softer thing on the menu, and after a while you stop noticing that you have changed the way you eat. A dental implant is a small post placed in the jawbone that holds a replacement tooth, so it is anchored in the bone instead of resting on the gum or clipping onto neighbouring teeth. Whether it suits you depends on your bone, your gums, your general health and what you want to be able to bite into again.",
    benefits: [
      "Chewing on both sides, not just one",
      "A replacement anchored in bone, not resting on gum",
      "Speaking and laughing without thinking about the gap",
      "Healthy neighbouring teeth left untouched where possible",
    ],
    aside: {
      title: "Why some people are told to wait",
      copy: "Uncontrolled gum disease, unmanaged diabetes, heavy smoking and thin bone can all change whether an implant is placed now, placed later or not placed at all. Those things are judged in the chair, not on a screen, so read this as the questions worth raising at the consultation.",
    },
    processHeading: "How an implant decision is actually made.",
    process: [
      {
        title: "Tell us what you avoid",
        copy: "We start with the practical things. Which side you chew on, which foods you have quietly dropped, and whether anything shifts when you talk.",
      },
      {
        title: "Examination and imaging",
        copy: "The dentist examines your gums, the bone under the gap, your bite and the teeth on either side. Imaging is used where it is needed, because the bone is what decides how much an implant can be asked to do.",
      },
      {
        title: "Implant, bridge or denture",
        copy: "You get a straight account of what each one involves, how long it takes and what it asks of the teeth around it. That includes the case for waiting, if waiting is the sensible thing this year.",
      },
      {
        title: "Placement, healing, final tooth",
        copy: "The implant is placed, then given time to bond with the bone before the final tooth is fitted on top. You will have the visit schedule, the healing expectations and the cleaning routine explained before the first appointment.",
      },
    ],
    ctaTitle: "Find out whether an implant suits your case.",
    faqs: [
      {
        question: "Will I be able to eat normally again?",
        answer: "That is what the treatment is aiming at, and most people find chewing gets easier once the final tooth is fitted. How close it feels to your own tooth depends on how many teeth are being replaced, the state of the teeth biting against it and how well the implant settles into the bone. There is also a healing stretch where you will be asked to stay on softer food. Your dentist will tell you what to expect at each stage.",
      },
      {
        question: "Is it very painful?",
        answer: "The placement is done under local anaesthesia, so you should not feel the procedure itself. Afterwards there is usually some soreness and swelling for a few days, and your dentist will explain what is normal for your case and how to manage it. If anything feels worse than you were told to expect, call the clinic instead of waiting it out.",
      },
      {
        question: "How long does the whole thing take?",
        answer: "Longer than most people expect, because the bone needs time to bond with the implant between the placement and the final tooth. In many cases that means several months with review visits in between, and some people need preparatory treatment first, such as gum care, or a bone graft to build up the ridge where the implant will sit. A realistic sequence can only be given to you after the examination, not before.",
      },
      {
        question: "Should I get an implant or a bridge?",
        answer: "Both can be a sound choice, and neither is automatically better. A bridge is usually quicker and leans on the teeth on either side for support, which means those teeth get prepared even when they are perfectly healthy. An implant stands on its own in the bone and leaves the neighbours alone, but it needs enough bone, settled gums and more time. Bring the question to the consultation, because the answer sits in what is beside the gap and underneath it.",
      },
    ],
  },
  {
    slug: "full-mouth-rehabilitation",
    title: "Full Mouth Rehabilitation",
    seoTitle: "Full Mouth Rehabilitation in Surat",
    metaDescription:
      "When several teeth need work, the order matters. Full mouth rehabilitation in Surat at Kheni Dental, planned in stages so you deal with one at a time.",
    eyebrow: "Full mouth rehabilitation",
    problem: "Too many teeth need work and I do not know where to start.",
    emotionalHeadline: "You do not have to fix everything at once.",
    short:
      "When several teeth need attention, we put the work in a sensible order so you deal with one stage at a time instead of everything at once.",
    intro:
      "Rarely is it just one thing that has gone wrong. A tooth broke, another was taken out years ago, an old crown has come loose and the bite has quietly changed along with all of it. Full mouth rehabilitation is the name for treating that as one connected problem instead of a queue of unrelated appointments. After an examination, your dentist works out what has to happen first, what can safely wait, and how the stages fit together.",
    benefits: [
      "One plan instead of scattered separate repairs",
      "You know what comes first and why",
      "Bite, gums and missing teeth reviewed together",
      "The whole sequence explained before work starts",
    ],
    aside: {
      title: "The order matters as much as the work",
      copy: "When several things are wrong at once, the sequence often decides the result more than any single procedure does, because gums and bite usually have to be settled before new teeth are built on top of them. Working out that order is the first real task of the consultation, and it needs someone looking in your mouth.",
    },
    processHeading: "How the order of work is decided.",
    process: [
      {
        title: "One long first visit",
        copy: "Instead of looking only at the tooth troubling you most, we go through every tooth, your gums, your bite and any older dental work still in place.",
      },
      {
        title: "Sorting urgent from later",
        copy: "Some things need attention soon, such as infection or a tooth that cannot be kept. Others can wait, and knowing which is which takes most of the weight off straight away.",
      },
      {
        title: "The sequence, written out",
        copy: "You get the stages in order, what each one involves and roughly how much time sits between them, so you can plan the rest of your life around them.",
      },
      {
        title: "Built stage by stage",
        copy: "Each phase is finished and checked before the next one starts, and the plan is adjusted if your mouth responds differently than expected. Once the work is done, we agree how often it should be reviewed.",
      },
    ],
    ctaTitle: "Bring the whole list to one appointment.",
    faqs: [
      {
        question: "How long does the whole treatment take?",
        answer: "Usually months rather than weeks, because healing between stages cannot be rushed. The number of teeth involved, the state of your gums and whether implants or gum treatment are part of the plan all change the timing. Your dentist can give you a realistic range once the examination and imaging are done, not before.",
      },
      {
        question: "Do I have to commit to all of it at the start?",
        answer: "No. What you agree to first is usually the part that protects your health, such as infection, loose teeth or gum problems. The rest can be discussed once that phase is behind you, and it is reasonable to ask how long a decision can wait.",
      },
      {
        question: "How do I know I really need this much work?",
        answer: "Ask your dentist to show you what they are seeing, tooth by tooth, and to explain what happens if a particular item is left alone. If you cannot follow the reasoning behind a plan, it is worth questioning. Taking a second opinion before a large course of treatment is a normal and sensible thing to do.",
      },
      {
        question: "Can I eat and go to work normally in between stages?",
        answer: "For most of the plan, yes, though some phases involve temporary teeth or a softer diet for a while. We try to sequence the work so you are not left without something to chew on. Tell us about travel, work or a family event in advance so the stages can be arranged around them.",
      },
    ],
  },
  {
    slug: "root-canal-treatment-surat",
    title: "Root Canal Treatment",
    seoTitle: "Root Canal Treatment in Surat",
    metaDescription:
      "Tooth pain that keeps you awake needs a cause, not a guess. Root canal treatment in Surat at Kheni Dental, aimed at keeping your own tooth where possible.",
    eyebrow: "Root canal care",
    problem: "This tooth keeps me up at night.",
    emotionalHeadline: "Ease the pain. Keep the tooth where we can.",
    short:
      "Settling the pain from an inflamed or infected tooth and, where the tooth can be saved, keeping it in your mouth rather than replacing it.",
    intro:
      "Tooth pain has a habit of arriving at night, when nothing else is going on to distract you. Not every ache needs a root canal, so the first job is working out what is actually causing it. If the soft tissue inside the tooth is inflamed or infected, root canal treatment cleans out that space, seals it and lets the tooth carry on doing its work. After an examination your dentist will tell you whether that is the right answer for your tooth.",
    benefits: [
      "Treats the infection causing the pain",
      "Keeps your own tooth where that is possible",
      "A straight answer about what went wrong",
      "Comfort planned around you before treatment starts",
    ],
    aside: {
      title: "Pain that stops is not proof",
      copy: "When the nerve inside a tooth dies, the ache can fade on its own while the infection quietly continues underneath. If a tooth hurt badly last week and feels fine now, it still deserves an examination rather than a wait.",
    },
    processHeading: "How a painful tooth is usually handled.",
    process: [
      {
        title: "Work out the cause",
        copy: "You tell us when it hurts, what sets it off and how long it has been going on. Examination and any imaging your dentist needs fill in the rest.",
      },
      {
        title: "Getting you comfortable",
        copy: "Anaesthesia is planned before treatment begins. Your dentist will also tell you what you are likely to feel during the appointment and in the days after.",
      },
      {
        title: "Cleaning and sealing",
        copy: "The space inside the tooth is cleaned, disinfected and sealed. This is often done over more than one appointment, and your dentist will say how many your tooth is likely to need.",
      },
      {
        title: "Protecting the tooth",
        copy: "A treated tooth usually needs a filling or a crown so it can take the pressure of chewing again. Healing and bite are checked at review.",
      },
    ],
    ctaTitle: "Call us before the next bad night.",
    faqs: [
      {
        question: "Will the root canal hurt?",
        answer: "Anaesthesia is used so the tooth and the area around it are numb while the work is done. Most people feel some tenderness for a few days afterwards, especially when biting on that side. Your dentist will explain what to expect for your tooth and what to do if the soreness does not settle.",
      },
      {
        question: "Can it be finished in one visit?",
        answer: "Often it takes more than one appointment. How many depends on the tooth, how many canals it has and how much infection is present, and your dentist can give you a realistic number after examining you. Please plan for more than a single sitting so the timing does not surprise you.",
      },
      {
        question: "Why not just take the tooth out?",
        answer: "Removing a tooth ends the pain too, but it leaves a gap that usually needs replacing later with a bridge or an implant. A natural tooth that can be saved keeps your bite the way it already is and means less dental work down the line. Whether yours can be saved depends on how much sound tooth is left and what the examination shows.",
      },
      {
        question: "How long will the tooth last afterwards?",
        answer: "A treated tooth that has been properly protected can serve you for many years, though nobody can put a figure on it. How you chew, the health of the gum around it, how much tooth structure remains and the covering placed on top all play a part. Regular check-ups help pick up a problem while it is still small.",
      },
    ],
  },
  {
    slug: "crowns-and-bridges",
    title: "Crowns & Bridges",
    seoTitle: "Dental Crowns & Bridges in Surat",
    metaDescription:
      "Chewing on one side because a tooth feels weak? Kheni Dental in Surat plans crowns and bridges around your bite so that tooth can take normal use again.",
    eyebrow: "Dental crowns and bridges",
    problem: "I am scared to bite down on that tooth.",
    emotionalHeadline: "Bite down without bracing yourself.",
    short:
      "For a tooth you have stopped trusting, a crown covers and strengthens what is left, and a bridge fills a gap so chewing feels ordinary again.",
    intro:
      "You already know which tooth it is. It is the one you steer hard food away from, the one that twinges on ice or a nut, the one that has been filled and refilled until there is not much of it left. A crown fits over what remains and holds it together so the tooth can take normal chewing force. A bridge does a related job across a gap, using the teeth on either side for support, and whether either suits you depends on how much sound tooth and healthy gum there is to work with.",
    benefits: [
      "Everyday chewing without guarding that tooth",
      "Cover and support for a heavily repaired tooth",
      "Shade and shape matched to neighbouring teeth",
      "A bite checked so nothing feels high",
    ],
    aside: {
      title: "A crown covers, it does not cure",
      copy: "Capping a tooth does not stop decay starting at the gum line, so a crowned tooth still needs brushing and cleaning between the teeth like any other. And whether a crack has already reached the nerve, which would change the plan, is something only an examination and imaging can tell you, not a web page.",
    },
    processHeading: "From assessment to the finished tooth.",
    process: [
      {
        title: "What the tooth can take",
        copy: "We check how much sound tooth is left, how the gum around it is doing and where your bite lands on it. Then we talk through whether a crown, a bridge or a smaller repair makes more sense for you.",
      },
      {
        title: "Getting the tooth ready",
        copy: "Where a crown suits, the tooth is shaped so the new cover can sit over it without feeling bulky. You are usually given a temporary to wear while the final one is being made.",
      },
      {
        title: "Measuring and matching",
        copy: "Records of your teeth guide how the crown is built for your bite, and the shade is picked against the teeth on either side so the repair sits quietly among them.",
      },
      {
        title: "Fitting and checking",
        copy: "Before anything is fixed in place we check the fit, the contact with the teeth beside it and how it feels when you close and move your jaw side to side. If something feels high, say so, that is easy to adjust.",
      },
    ],
    ctaTitle: "Let us look at the tooth you do not trust.",
    faqs: [
      {
        question: "Will it feel like my own tooth?",
        answer: "Most people stop noticing a well-fitted crown within a few days, though it can feel slightly different at first while your bite settles around it. Some sensitivity to hot and cold for a short period is common. If it still feels high or awkward after a week, come back and let us adjust it rather than putting up with it.",
      },
      {
        question: "How long will a crown or bridge last?",
        answer: "There is no honest single number. It depends on the tooth underneath, how heavy your bite is, whether you grind at night and how well the edges are kept clean. At your review the dentist can tell you what is most likely to shorten or extend the life of yours.",
      },
      {
        question: "Can I just have a filling instead?",
        answer: "Sometimes, yes, and we would say so. When enough strong tooth is left around it, a filling is the smaller and simpler repair. A crown tends to be discussed when so much of the tooth has been lost or cracked that a filling would risk breaking away along with it.",
      },
      {
        question: "Will a crown make the tooth as strong as it was?",
        answer: "A bridge uses the teeth on either side of the gap for support, so those teeth have to be prepared. An implant does not involve them, but it depends on the bone and gum at that site and takes longer overall. What the neighbouring teeth are already like often decides it, and your dentist will set out both options for your particular gap.",
      },
    ],
  },
  {
    slug: "cosmetic-smile-dentistry",
    title: "Smile Design & Cosmetic Dentistry",
    seoTitle: "Smile Designing in Surat | Cosmetic Dentistry",
    metaDescription:
      "Thinking about smile designing in Surat? Kheni Dental looks at what actually needs changing first, then explains the smallest option that gets you there.",
    eyebrow: "Smile designing",
    problem: "I have started smiling with my mouth closed.",
    emotionalHeadline: "Change what bothers you. Keep the rest.",
    short:
      "If your teeth look worn, uneven, stained or chipped, we work out what actually needs changing before suggesting whitening, bonding, veneers or crowns.",
    intro:
      "Ask anyone what bothers them about their smile and you usually get one or two very specific answers. A chipped edge, a gap that seems wider than it used to be, a tooth that sits back from the others, a colour that no longer matches. The useful first question is not which procedure to book, it is which of those things is genuinely bothering you and why the tooth looks that way. Some concerns are settled by whitening or a small reshape, others need the bite or the gums sorted out first, and that only becomes clear after an examination.",
    benefits: [
      "The smallest change that gets the result",
      "Healthy tooth structure kept wherever it can be",
      "Colour, shape and spacing judged together",
      "An honest answer if nothing needs doing",
    ],
    aside: {
      title: "Some cosmetic work cannot be undone",
      copy: "Whitening and bonding can usually be revisited later, but anything that reshapes a tooth removes enamel that does not grow back. That is a decision to make in the chair after an examination, not from a page like this one.",
    },
    processHeading: "How we work out what to change.",
    process: [
      {
        title: "Tell us what you notice",
        copy: "Bring a photo if it is easier to point at than describe. We want to hear what bothers you in your own words before any procedure gets named.",
      },
      {
        title: "Check the health first",
        copy: "Teeth, gums, bite and older fillings are examined, because cosmetic work placed over an untreated problem tends not to hold.",
      },
      {
        title: "Compare the real options",
        copy: "You hear what each option changes, how much tooth it uses up and what looking after it will involve. Where a lighter approach can do the job, we say so.",
      },
      {
        title: "Agree before anything starts",
        copy: "Nothing begins until you know the sequence, the number of visits and what the result can and cannot do.",
      },
    ],
    ctaTitle: "Start with a conversation, not a procedure.",
    faqs: [
      {
        question: "Will people be able to tell I have had work done?",
        answer: "That depends on how much is changed and how well the shape and colour sit with the rest of your face. Small corrections usually read as your own teeth looking tidier. If you want a big change in colour or length, people close to you will notice something, so it is worth saying up front how visible you want the result to be.",
      },
      {
        question: "Do I need veneers, or is there something smaller?",
        answer: "Often there is something smaller. Whitening, polishing an uneven edge, bonding a chip or closing a gap with alignment can handle a lot of what people come in worried about. Veneers and crowns are considered when the tooth itself is damaged, worn or too discoloured for a lighter approach, and your dentist will explain why one is being suggested over the other.",
      },
      {
        question: "Will whitening actually work on my teeth?",
        answer: "It depends on why the teeth look the way they do. Surface staining from tea, coffee, tobacco or paan behaves differently from colour that comes from inside the tooth after an old injury or treatment. Existing crowns, veneers and white fillings do not change colour with whitening, so they may need to be matched afterwards. An examination is the only way to know which of these applies to you.",
      },
      {
        question: "How long will the result hold up?",
        answer: "It varies with the option chosen, your bite, your habits and how the work is looked after at home. Edges can chip, whitening fades at different rates for different people, and grinding shortens the life of most cosmetic work. Ask specifically what the upkeep looks like for the option you are considering before you agree to it.",
      },
    ],
  },
  {
    slug: "kids-dentistry-surat",
    title: "Kids Dentistry",
    seoTitle: "Kids Dentist in Surat",
    metaDescription:
      "Kids dentist in Surat: children's dental visits paced around your child, with plain words for them and straight answers for you. Book at Kheni Dental.",
    eyebrow: "Kids dentist in Surat",
    problem: "My child is scared and I do not want to make it worse.",
    emotionalHeadline: "A first visit your child does not dread.",
    short:
      "A calmer first appointment, then check-ups that stay easy: children's dental care paced around what your child can manage, with straight answers for parents.",
    intro:
      "Most parents walk in a little tense, worried the visit will end in tears and put their child off dentists for years. That worry is fair, and it changes how we run children's appointments. Dr. Ishita Dobariya, our Kids Specialist, lets a child look around, ask what the little mirror is for and decide they are safe before anything gets checked. Whatever needs attention is explained to you in plain words first, so you are never guessing what is about to happen in the chair.",
    benefits: [
      "A pace set by your child, not the clock",
      "Explanations your child can actually follow",
      "Small problems spotted while they are still small",
      "Brushing and diet advice suited to their age",
    ],
    aside: {
      title: "What you say at home matters more",
      copy: "Children take more from the way a parent describes the visit than from anything they could read on this page, so it helps to keep it ordinary and avoid promising that nothing will be done. If your child has had a hard time at a dental visit before, tell us on the phone rather than in the waiting room, and the appointment can be planned around it.",
    },
    processHeading: "How a children's appointment usually goes.",
    process: [
      {
        title: "Before you arrive",
        copy: "Tell us on the phone if your child is anxious or has had a difficult visit somewhere else. We can look for a quieter slot and keep the first appointment short.",
      },
      {
        title: "Time to look around",
        copy: "Your child sits in the chair, sees the mirror and hears what each thing does before anyone counts a single tooth.",
      },
      {
        title: "The check itself",
        copy: "Teeth, gums and bite are checked at whatever pace your child allows. You can stay beside the chair and ask what we are looking at.",
      },
      {
        title: "What you hear next",
        copy: "If something needs treating, you hear what it is, what the choices are and what happens if you wait, before anything is booked.",
      },
    ],
    ctaTitle: "Tell us about your child before the visit.",
    faqs: [
      {
        question: "How old should my child be for the first visit?",
        answer: "Common professional guidance is to bring a child in once the first teeth appear, or around the first birthday. An early visit is mostly about you: feeding, brushing, thumb habits and what to watch for. Very little is done to the child at that age.",
      },
      {
        question: "What if my child cries or will not open their mouth?",
        answer: "It happens often, and nobody is going to be held down. Sometimes the first appointment ends with nothing more than sitting in the chair and having teeth counted, which is a fine result. A short second visit usually goes better because the room is no longer new.",
      },
      {
        question: "Do baby teeth with cavities really need treating? They fall out anyway.",
        answer: "Sometimes yes, sometimes no, and it depends on which tooth it is and how long before it is due to come out. Baby teeth hold space for the adult ones and can hurt or become infected in the meantime. Dr. Ishita will tell you after examining the tooth whether it is worth treating or watching.",
      },
      {
        question: "Will my child need an injection?",
        answer: "A check-up on its own does not involve one. If numbing is needed for a filling or an extraction, you will be told beforehand rather than your child finding out in the chair, and it will be described to them in words that suit their age. Some soreness afterwards is possible, and we will explain what to expect.",
      },
    ],
  },
  {
    slug: "gum-care-surat",
    title: "Gum Care",
    seoTitle: "Gum Treatment in Surat for Bleeding Gums",
    metaDescription:
      "Gums that bleed, swell or affect your breath are worth checking early. Kheni Dental in Surat examines the cause and explains the treatment it needs.",
    eyebrow: "Gum health",
    problem: "My gums bleed when I brush.",
    emotionalHeadline: "Gums that bleed are asking for attention.",
    short:
      "If your gums bleed, swell or your breath has changed, an examination can find the cause and set out what treatment and daily habits are needed.",
    intro:
      "It usually shows up in the sink, or when someone stands a little too close. Bleeding, swelling and breath that does not freshen after brushing tend to begin in the same place, at the line where gum meets tooth. How much treatment is needed depends on how long it has been going on and whether the bone holding the tooth has been affected, so an examination comes before anything is recommended.",
    benefits: [
      "An honest read on how far it has gone",
      "Deposits cleaned above and below the gum line",
      "A home routine matched to where you bleed",
      "Regular checks so it does not creep back",
    ],
    aside: {
      title: "Gums can stop bleeding without healing",
      copy: "Bleeding often eases off on its own for a while, and people who smoke may bleed very little even when the gums are not healthy. So the state of your gums is checked tooth by tooth during an examination, never judged from how they look or feel at home.",
    },
    processHeading: "What an examination of your gums involves.",
    process: [
      {
        title: "Check every tooth",
        copy: "We look at where the bleeding starts, how much deposit has built up and whether anything has begun to feel loose. Imaging is used where the bone underneath needs to be seen.",
      },
      {
        title: "Tell you what we found",
        copy: "You hear where the gums are healthy, where they are not and what is driving it, in words you can repeat to someone at home.",
      },
      {
        title: "Clean it properly",
        copy: "Treatment usually starts with removing deposits above and below the gum line. How many visits that takes depends on how much there is and how deep it sits.",
      },
      {
        title: "Watch how it settles",
        copy: "Gums need a few weeks to respond. We look again after that and adjust the daily routine or the treatment depending on what has changed.",
      },
    ],
    ctaTitle: "Tell us what your gums are doing.",
    faqs: [
      {
        question: "My gums only bleed sometimes. Is that still a problem?",
        answer: "It is worth mentioning, especially if it happens at the same spot every time. Healthy gums do not usually bleed from ordinary brushing. It may turn out to be something minor, but an examination is how you find out, rather than waiting to see whether it stops.",
      },
      {
        question: "Will a cleaning make my teeth sensitive or loose?",
        answer: "Teeth can feel different for a while afterwards, because the gum had been resting against hardened build-up instead of clean tooth. Sensitivity to cold in the first few days is common and usually settles. Tell your dentist if it does not, since there are ways to manage it.",
      },
      {
        question: "Can bad breath be coming from my gums?",
        answer: "Gums can be one of the causes, along with the tongue, a dry mouth, a decayed tooth or something further down. If brushing and mouthwash only help for an hour or two, the source is usually still there. An examination can tell you whether the gums are involved or whether to look elsewhere.",
      },
      {
        question: "Is gum disease reversible?",
        answer: "Inflammation that is limited to the gum can often settle once the deposits are removed and the daily routine changes. Once bone around the tooth has been lost, the aim shifts to stopping further loss and holding on to what is there. Your dentist will tell you which of those two situations you are in after examining you.",
      },
    ],
  },
  {
    slug: "braces-clear-aligners",
    title: "Braces & Clear Aligners",
    seoTitle: "Clear Aligners & Braces in Surat",
    metaDescription:
      "Clear aligners and braces in Surat. We check crowding, spacing and how your bite meets, then explain which option suits your case and how long it takes.",
    eyebrow: "Alignment and bite",
    problem: "My teeth are crowding and I do not want visible braces at work.",
    emotionalHeadline: "Straighten your teeth without announcing it.",
    short:
      "If crowding, gaps or a bite that does not meet properly bother you, alignment can be planned with braces or clear aligners, depending on what your case needs.",
    intro:
      "Adults who ask about aligners are rarely chasing a picture. They are tired of one tooth sitting in front of another, or of a bite that keeps wearing the same edges down. Braces and clear aligners both move teeth, but they do not suit every case equally, and which one fits yours depends on the movement your teeth need rather than on which appliance you would prefer to wear. An examination settles that question in a way a website cannot.",
    benefits: [
      "A less visible option where your case allows",
      "How your teeth meet, not just how they look",
      "An honest time estimate before you commit",
      "Straighter teeth are easier to keep clean",
    ],
    aside: {
      title: "Why a photo cannot answer this",
      copy: "People often send a picture of their front teeth and ask whether aligners will work for them. Front teeth are the easy part, because suitability rests on how your back teeth meet and how far the roots have to move, and that only shows up on examination.",
    },
    processHeading: "What happens before anything goes on your teeth.",
    process: [
      {
        title: "Start with your complaint",
        copy: "Tell us which tooth bothers you, and whether your bite has started to feel off when you close. That list shapes what the dentist looks for.",
      },
      {
        title: "Measure the movement",
        copy: "Photographs, models and measurements let the dentist work out which teeth have to move, how far, and in what order.",
      },
      {
        title: "Decide braces or aligners",
        copy: "Only now does the appliance question get answered, along with the likely length of treatment and what you will be asked to do every day.",
      },
      {
        title: "Wear it, then hold it",
        copy: "During treatment your teeth are checked and adjusted at set intervals. Once the movement is finished, retainers stop the teeth sliding back, and your dentist will explain how long you need to keep wearing them.",
      },
    ],
    ctaTitle: "Find out which option your case actually needs.",
    faqs: [
      {
        question: "Will anyone at work notice?",
        answer: "Clear aligners sit over the teeth and are far less obvious than metal braces, but they are not invisible and someone sitting close to you may spot them. They also come out for meals and photographs. If your case is better handled with braces, the dentist will go through the options and how visible each one is before you decide.",
      },
      {
        question: "How long will this actually take?",
        answer: "Usually longer than people hope. Tooth movement is counted in months rather than weeks, and the range is wide because it depends on how far the teeth have to travel, what your bite is doing, and how many hours a day removable aligners are genuinely worn. You should get an estimate for your own case at the planning stage, before you agree to anything.",
      },
      {
        question: "Am I too old for braces or aligners?",
        answer: "Adults have orthodontic treatment routinely, and teeth can be moved well beyond the teenage years. Gum health and the bone supporting your teeth matter more than your age, so those are checked before alignment is planned. If something needs attention there, it is treated first.",
      },
      {
        question: "Can I just order aligners online instead?",
        answer: "Aligners supplied without an in-person examination skip the parts that decide whether the plan is safe, such as gum health, root position and how your back teeth meet. Moving teeth without supervision can create problems that are harder to sort out than the original crowding. If the cost is what is holding you back, say so at the consultation and the dentist will tell you what is realistic.",
      },
    ],
  },
  {
    slug: "wisdom-tooth-oral-surgery",
    title: "Wisdom Tooth & Oral Surgery",
    seoTitle: "Wisdom Tooth Treatment in Surat",
    metaDescription:
      "Sore, swollen wisdom tooth? Kheni Dental in Surat examines the cause first, then explains whether removal is needed and what recovery actually involves.",
    eyebrow: "Wisdom tooth care",
    problem: "My wisdom tooth hurts and the jaw feels swollen.",
    emotionalHeadline: "Find out if it really has to come out.",
    short:
      "When a wisdom tooth causes pain or swelling, we look at the cause first, then explain whether removal, treatment or simply watching it makes sense.",
    intro:
      "Pain at the back of the jaw is hard to ignore and hard to describe. It can come from a wisdom tooth pressing on the tooth in front, from gum that keeps getting inflamed over a tooth that is only half through, from decay in a spot your brush never reaches, or from something that has nothing to do with the wisdom tooth at all. Those causes do not lead to the same answer, which is why an examination and imaging come before any talk of surgery. Some wisdom teeth are settled and can be left alone, and others cause trouble that keeps coming back until the tooth is out.",
    benefits: [
      "A clear answer on whether it stays",
      "The cause of the pain identified first",
      "You know what the first week involves",
      "Someone to call if healing feels off",
    ],
    aside: {
      title: "When wisdom tooth pain needs urgent care",
      copy: "Most wisdom tooth pain can be assessed at an ordinary appointment, but swelling that spreads towards the eye or neck, difficulty swallowing, or a jaw you cannot open properly are reasons to seek urgent care instead of waiting. No page can tell how far an infection has moved, so call the clinic and describe what you are seeing.",
    },
    processHeading: "Working out whether it needs to come out.",
    process: [
      {
        title: "Look at the whole area",
        copy: "We check the tooth, the gum around it and the teeth beside it, and use imaging to see the roots and how the tooth sits under the gum.",
      },
      {
        title: "Decide whether it comes out",
        copy: "If the tooth is well positioned and you can keep it clean, watching it may be the sensible choice. If it keeps getting infected, is harming the tooth in front or traps food where no brush reaches, we will say so and explain why.",
      },
      {
        title: "Plan the removal",
        copy: "Before you agree to a date, we go through the anaesthesia, roughly how long the appointment takes, and what makes your case straightforward or more involved.",
      },
      {
        title: "Get through the first week",
        copy: "You go home with written instructions on eating, cleaning, swelling and rest, and a number to call. Healing is checked when a review is needed.",
      },
    ],
    ctaTitle: "Get an answer before it flares up again.",
    faqs: [
      {
        question: "Does a wisdom tooth always have to be removed?",
        answer: "No. A wisdom tooth that has come through in a workable position, stays clean and is not harming its neighbour can often just be watched. Removal is discussed when there is repeated infection, decay, pressure on the tooth in front, or a position that makes cleaning impossible. That call is made after examining you, not from symptoms alone.",
      },
      {
        question: "How bad is the swelling afterwards, honestly?",
        answer: "Some swelling and stiffness over the first few days is normal, and for many people it peaks around the second day before it starts settling. How much you get depends on how deep the tooth sat and how much work the removal involved. Your dentist will tell you what to expect in your case and what would count as more than expected.",
      },
      {
        question: "Can I go back to work the next day?",
        answer: "Some people take the day of surgery and the day after quietly at home, and some need longer than that. Talking, chewing and bending over all feel different for a few days. It is better to plan a light couple of days than to assume you will be back to normal by morning.",
      },
      {
        question: "Is it safe to just take painkillers and wait?",
        answer: "Painkillers can quieten the symptom for a while, but they do not clear an infection or change where the tooth is sitting. Pain that keeps returning to the same spot usually means something has not resolved. Repeated self-medication also makes the picture harder to read by the time you are examined, so get a tooth that has flared up more than once looked at.",
      },
    ],
  },
  {
    slug: "general-family-dentistry",
    title: "General & Family Dentistry",
    seoTitle: "Family Dentist in Surat",
    metaDescription:
      "A family dentist in Surat for check-ups, cleaning and fillings, adults and children alike. If it has been a while since your last visit, that is fine.",
    eyebrow: "Everyday dentistry",
    problem: "It has been longer than I would like since my last check-up.",
    emotionalHeadline: "Small problems are easier to keep small.",
    short:
      "One clinic for the whole family, covering check-ups, cleaning, fillings and the everyday repairs that stop a small problem turning into a long appointment.",
    intro:
      "Plenty of people put off a check-up because nothing hurts, or because it has been so long that going back feels awkward. That gap is more common than you think, and it is not something you will be lectured about here. Most everyday dentistry is small work, a look, a clean, a filling before a tooth cracks, and small work usually stays small when it is caught early.",
    benefits: [
      "One clinic for every age at home",
      "Small repairs caught before they get bigger",
      "Records for the whole family in one place",
      "Honest answers about what can safely wait",
    ],
    aside: {
      title: "Feeling fine is not the same as fine",
      copy: "Decay between teeth, a cracked filling and early gum changes often cause nothing at all until they are well established, which is exactly why check-ups exist. How often you personally need one depends on what an examination actually finds, so the interval is set for you rather than by a rule.",
    },
    processHeading: "What a routine visit actually looks like.",
    process: [
      {
        title: "Say when you last came",
        copy: "Tell us roughly how long it has been and whether anything has been bothering you. There is no wrong answer, and it helps us know where to look first.",
      },
      {
        title: "A proper look",
        copy: "We check the teeth, gums and soft tissues, including the areas you cannot see in the mirror at home.",
      },
      {
        title: "What needs doing, in order",
        copy: "You will hear what needs attention now, what is worth watching, and what is fine as it is. If something can wait, we will say so.",
      },
      {
        title: "Agree the next visit",
        copy: "Before you leave, we settle on how long to leave it until the next check and what is worth changing at home in between.",
      },
    ],
    ctaTitle: "Book the check-up you keep putting off.",
    faqs: [
      {
        question: "I have not been to a dentist in years. Where do I even start?",
        answer: "This is one of the most common reasons people book, so you will not be the first that week. The first visit is mostly examination and conversation, so you leave knowing where you stand. If several things need attention, they can be sequenced over a few visits instead of being done all at once.",
      },
      {
        question: "Nothing hurts. Do I still need to come in?",
        answer: "Pain tends to be a late signal rather than an early one, so a check-up is still useful when everything feels normal. An examination can pick up decay between teeth, a cracked filling or early gum changes while they are still small. What is found is what decides whether anything needs doing at all.",
      },
      {
        question: "How often should we come for a check-up?",
        answer: "It varies from person to person. Some people are fine with a longer interval, others are seen more often because of gum health, previous treatment, diet or habits. Your dentist will suggest an interval after examining you rather than applying one rule to everybody.",
      },
      {
        question: "Can my children and I be seen at the same clinic?",
        answer: "Kheni Dental treats adults and children, and there are two clinics in Surat, Swastik Plaza and Hirabaug. Call the branch you plan to visit to check doctor availability for the day you want, especially if you are booking more than one person at a time.",
      },
    ],
  },
];

/**
 * "How can we help?" entry points.
 *
 * Nine things a patient can recognise about their own mouth in a second, in
 * the words they would actually use. This is the fastest route into the site
 * and deliberately carries no explanation: tapping one goes straight to the
 * relevant treatment.
 */
export const helpTopics = [
  { label: "Tooth pain", href: "/treatments/root-canal-treatment-surat/" },
  { label: "Missing tooth", href: "/treatments/dental-implants-surat/" },
  { label: "Loose denture", href: "/treatments/dental-implants-surat/" },
  { label: "Broken tooth", href: "/treatments/crowns-and-bridges/" },
  { label: "Yellow or stained teeth", href: "/treatments/cosmetic-smile-dentistry/" },
  { label: "Crooked teeth", href: "/treatments/braces-clear-aligners/" },
  { label: "Bleeding gums", href: "/treatments/gum-care-surat/" },
  { label: "My child's teeth", href: "/treatments/kids-dentistry-surat/" },
  { label: "Just a check-up", href: "/treatments/general-family-dentistry/" },
] as const;

export const problems = [
  {
    title: "I am missing a tooth",
    detail: "We look at the gap, the bone around it and the teeth on either side. Your dentist then explains which replacement options are realistic for your case, including implants.",
    href: "/treatments/dental-implants-surat",
  },
  {
    title: "A toothache is keeping me awake",
    detail: "Pain is the symptom, not the diagnosis. An examination and imaging show which tooth is involved and whether root canal treatment or something else is the right answer.",
    href: "/treatments/root-canal-treatment-surat",
  },
  {
    title: "My gums bleed when I brush",
    detail: "Bleeding is worth checking early rather than waiting to see if it settles. A gum examination shows how far the problem has gone and what will actually help.",
    href: "/treatments/gum-care-surat",
  },
  {
    title: "I hide my teeth in photos",
    detail: "Tell us what you notice first, whether that is colour, shape, spacing or a chipped edge. Some changes need very little, and we will say so before suggesting anything bigger.",
    href: "/treatments/cosmetic-smile-dentistry",
  },
  {
    title: "My child is scared of the dentist",
    detail: "The first visit is mostly about letting your child settle and get used to the chair. Nothing is done without explaining it to you first.",
    href: "/treatments/kids-dentistry-surat",
  },
  {
    title: "My teeth are crooked or spaced",
    detail: "An assessment of your bite comes before any talk of braces or aligners. What suits you depends on how the teeth need to move and how long that will realistically take.",
    href: "/treatments/braces-clear-aligners",
  },
  {
    title: "My wisdom tooth is swollen and sore",
    detail: "Not every wisdom tooth has to come out. Examination and imaging show whether the tooth can be watched or whether removal is the sensible step.",
    href: "/treatments/wisdom-tooth-oral-surgery",
  },
  {
    title: "Too many teeth need work",
    detail: "When several things need doing at once, the useful first step is putting them in order. Your dentist separates what is urgent from what can wait, then plans the rest in stages.",
    href: "/treatments/full-mouth-rehabilitation",
  },
] as const;

export const resources = [
  {
    title: "Your first visit",
    description: "What to bring, how much time to allow and the questions worth asking while you are still in the chair.",
    href: "/patient-resources#first-visit",
  },
  {
    title: "Thinking about implants",
    description: "A plain-language walk through assessment, planning, the stages of treatment and what looking after an implant involves.",
    href: "/patient-resources#implant-guide",
  },
  {
    title: "After a root canal",
    description: "How the tooth may feel over the next few days, what helps, and the signs that mean you should call the clinic.",
    href: "/patient-resources#root-canal-aftercare",
  },
  {
    title: "Bringing a child in",
    description: "Small things parents can do at home beforehand so the appointment feels less strange to a young child.",
    href: "/patient-resources#kids-visit",
  },
] as const;

export const homepageFaqs = [
  {
    question: "Do I need to know what treatment I want before I come in?",
    answer:
      "No. Most people arrive with a symptom, not a diagnosis. Tell us what you have noticed and where, and the examination will sort out the rest.",
  },
  {
    question: "What actually happens in the first appointment?",
    answer:
      "We talk about what is bothering you, then check your teeth, gums and bite. You leave knowing what was found, what your options are and what the next step would be.",
  },
  {
    question: "Which of the two clinics should I go to?",
    answer:
      "Either one. Swastik Plaza is at Yogi Chowk and Hirabaug is on Varachha Main Road. Call or WhatsApp us and we will tell you which is easier for you to reach.",
  },
  {
    question: "Can I message on WhatsApp instead of calling?",
    answer:
      "Yes. WhatsApp is fine for asking about appointment times or which clinic suits you. Please keep medical details for the consultation itself rather than the chat.",
  },
  {
    question: "I have put this off for years. Is it too late?",
    answer:
      "People come to us after long gaps more often than you would think, and nobody here will lecture you about it. We look at where things stand today and work out what to do first.",
  },
] as const;

export const tickerItems = [
  "15 years in Surat",
  "Two clinics, one practice",
  "Yogi Chowk and Varachha Main Road",
  "A team of four dentists",
  "Implant and full mouth care",
  "Kids and family dentistry",
  "Mon to Sat, morning and evening",
] as const;
