import type { CaseResult } from "@/content/cases";
import type { PatientStory, VideoStory } from "@/content/patient-stories";

/**
 * INVENTED CONTENT. NOT REAL PATIENTS.
 *
 * Nothing in this file describes a real Kheni Dental patient, case, quote or
 * outcome. It exists so the site can be judged as a finished thing rather than
 * a set of empty frames, and it is meant to be replaced before launch.
 *
 * `src/content/__checks__/demo-content.check.ts` fails the build if this is
 * still active when indexing is switched on. See ./README.md.
 */

/** Whether invented content is mixed into the site. On by default. */
export const demoContentActive = process.env.NEXT_PUBLIC_DEMO_CONTENT !== "false";

/**
 * Written testimonials.
 *
 * Voice rules followed here, because the point of demo copy is to show how
 * real testimonials will read: first name and initial only, the concern before
 * the treatment, plain words a Surat patient would actually use, and no
 * superlatives or outcome guarantees. Length varies, because real ones do.
 */
export const demoPatientStories: PatientStory[] = [
  {
    id: "demo-story-1",
    name: "Rakesh P.",
    city: "Surat",
    treatment: "Dental implant",
    quote:
      "I had lost a back tooth two years ago and kept putting it off because I thought it would be painful. Dr. Mayur showed me the scan and explained why the bone was still fine. It took three visits.",
    doctorSlug: "dr-mayur-kheni",
    branchSlug: "hirabaug",
    consentConfirmed: true,
  },
  {
    id: "demo-story-2",
    name: "Nilam S.",
    city: "Surat",
    treatment: "Root canal treatment",
    quote:
      "I came in at night with pain I could not sleep through. They saw me the next morning and finished the root canal in two sittings. No pain after the first day.",
    doctorSlug: "dr-jinal-monapara",
    branchSlug: "swastik-plaza",
    consentConfirmed: true,
  },
  {
    id: "demo-story-3",
    name: "Hitesh M.",
    city: "Surat",
    treatment: "Full mouth rehabilitation",
    quote:
      "My denture had been slipping for years and I had stopped eating in front of people. This took eight months and I understood every stage before it happened. I eat normally now.",
    fullQuote:
      "My denture had been slipping for years and I had stopped eating in front of people. I went to two other places first and both of them quoted me a number on the first day without looking properly. Dr. Mayur did the imaging first and told me honestly that one side would need more work. It took eight months and I understood every stage before it happened. I eat normally now.",
    doctorSlug: "dr-mayur-kheni",
    branchSlug: "hirabaug",
    consentConfirmed: true,
  },
  {
    id: "demo-story-4",
    name: "Priya D.",
    city: "Surat",
    treatment: "Braces",
    quote:
      "I am 29 and I was worried braces would look odd at work. Dr. Parita talked me through the options and the time each one takes. Eighteen months and I stopped noticing them after the first month.",
    doctorSlug: "dr-parita-vastarpara",
    branchSlug: "swastik-plaza",
    consentConfirmed: true,
  },
  {
    id: "demo-story-5",
    name: "Ashwin K.",
    city: "Surat",
    treatment: "Kids dentistry",
    quote:
      "My daughter is six and she was terrified. Dr. Ishita let her sit in the chair and hold the mirror for the first ten minutes without doing anything. She asks to go back now.",
    doctorSlug: "dr-ishita-dobariya",
    branchSlug: "swastik-plaza",
    consentConfirmed: true,
  },
  {
    id: "demo-story-6",
    name: "Bhavna T.",
    city: "London",
    country: "United Kingdom",
    treatment: "Crowns",
    quote:
      "I am home in Surat for three weeks every year. I sent photos before I flew and they had a plan ready. Two crowns done in that trip and the follow-up was over WhatsApp once I was back.",
    doctorSlug: "dr-mayur-kheni",
    branchSlug: "hirabaug",
    consentConfirmed: true,
  },
  {
    id: "demo-story-7",
    name: "Jignesh V.",
    city: "Surat",
    treatment: "Smile design",
    quote:
      "I only wanted the front four fixed. They did not try to sell me anything more than that, which is why I stayed.",
    doctorSlug: "dr-mayur-kheni",
    branchSlug: "hirabaug",
    consentConfirmed: true,
  },
  {
    id: "demo-story-8",
    name: "Sunita R.",
    city: "Surat",
    treatment: "Gum treatment",
    quote:
      "My gums had been bleeding for a long time and I assumed it was normal. It was not. Three cleaning sessions and it stopped.",
    doctorSlug: "dr-jinal-monapara",
    branchSlug: "swastik-plaza",
    consentConfirmed: true,
  },
];

/**
 * Video stories.
 *
 * `thumbnail` and `videoUrl` stay empty. Invented copy is one thing; a fake
 * video of a patient who does not exist is another, and the tile renders as a
 * plate until the clinic films one.
 */
export const demoVideoStories: VideoStory[] = [
  {
    id: "demo-video-1",
    patientName: "Hitesh M.",
    treatment: "Full mouth rehabilitation",
    language: "Gujarati",
    duration: "2:10",
    thumbnail: "",
    videoUrl: "",
    captionsAvailable: true,
    consentConfirmed: true,
  },
  {
    id: "demo-video-2",
    patientName: "Bhavna T.",
    treatment: "Crowns during a visit home",
    language: "English",
    duration: "1:38",
    thumbnail: "",
    videoUrl: "",
    captionsAvailable: true,
    consentConfirmed: true,
  },
];

/**
 * Before and after cases.
 *
 * `beforeImage` and `afterImage` are intentionally empty strings: invented
 * copy is one thing, invented clinical photographs are another, and no
 * generated or borrowed mouth will ever be published here. The frames stay as
 * plates until the clinic's own photographs arrive.
 */
export const demoCases: CaseResult[] = [
  {
    id: "demo-case-1",
    category: "Full Mouth Rehabilitation",
    startingConcern: "A denture that had stopped staying put, and years of avoiding meals out.",
    resultSummary: "A fixed set supported by implants, planned over eight months in stages.",
    whatWasDone:
      "Imaging first to see what bone was there, then implants placed on both sides in separate sittings, healing time between each, and the final fixed teeth fitted once everything had settled.",
    whyThisApproach:
      "A new denture would have been faster and cheaper, and it would have moved again within a year. The bone on the lower left needed building up before anything could be placed there, so the case was staged rather than rushed.",
    stages: [
      "Examination and imaging",
      "Bone preparation, lower left",
      "Implants placed, right side",
      "Implants placed, left side",
      "Healing and review",
      "Fixed teeth fitted",
    ],
    patientComment: "I eat normally now. That is the whole thing for me.",
    featured: true,
    doctorSlug: "dr-mayur-kheni",
    branchSlug: "hirabaug",
    beforeImage: "",
    afterImage: "",
    afterTakenAt: "6 months after fitting",
    timeline: "9 visits over 8 months",
    consentConfirmed: true,
  },
  {
    id: "demo-case-2",
    category: "Dental Implants",
    startingConcern: "One missing back tooth, left for two years.",
    resultSummary: "A single implant, without touching the teeth on either side.",
    doctorSlug: "dr-mayur-kheni",
    branchSlug: "hirabaug",
    beforeImage: "",
    afterImage: "",
    afterTakenAt: "4 months after fitting",
    timeline: "3 visits over 4 months",
    consentConfirmed: true,
  },
  {
    id: "demo-case-3",
    category: "Smile Design",
    startingConcern: "Front teeth worn down and uneven after years of grinding.",
    resultSummary: "The front six reshaped, matched to the patient's own shade.",
    doctorSlug: "dr-mayur-kheni",
    branchSlug: "hirabaug",
    beforeImage: "",
    afterImage: "",
    afterTakenAt: "3 months after fitting",
    consentConfirmed: true,
  },
  {
    id: "demo-case-4",
    category: "Crowns & Veneers",
    startingConcern: "A cracked front tooth after a fall.",
    resultSummary: "A single crown, shade-matched to the tooth beside it.",
    doctorSlug: "dr-jinal-monapara",
    branchSlug: "swastik-plaza",
    beforeImage: "",
    afterImage: "",
    afterTakenAt: "2 months after fitting",
    consentConfirmed: true,
  },
  {
    id: "demo-case-5",
    category: "Braces & Aligners",
    startingConcern: "Crowded lower front teeth in an adult patient.",
    resultSummary: "Aligned over eighteen months, with a retainer after.",
    doctorSlug: "dr-parita-vastarpara",
    branchSlug: "swastik-plaza",
    beforeImage: "",
    afterImage: "",
    afterTakenAt: "At debond",
    timeline: "18 months",
    consentConfirmed: true,
  },
  {
    id: "demo-case-6",
    category: "Dental Implants",
    startingConcern: "Three missing teeth on one side, making chewing one-sided.",
    resultSummary: "Two implants carrying a fixed bridge across the gap.",
    doctorSlug: "dr-mayur-kheni",
    branchSlug: "hirabaug",
    beforeImage: "",
    afterImage: "",
    afterTakenAt: "5 months after fitting",
    timeline: "4 visits over 5 months",
    consentConfirmed: true,
  },
];

/** Invented volume figures, in the Indian grouping a Surat patient reads. */
export const demoStats = {
  patients: "32,000+",
  implants: "4,200+",
  fullMouth: "310+",
  smileMakeovers: "540+",
  rootCanals: "11,000+",
  nriCountries: "14+",
  nriPatients: "600+",
} as const;

/** Invented credentials. Plausible for a practice of this age and size. */
export const demoCredentials = [
  { id: "demo-cred-1", title: "Member, Indian Dental Association", issuer: "IDA" },
  { id: "demo-cred-2", title: "Certified in Oral Implantology", issuer: "ICOI" },
  { id: "demo-cred-3", title: "Advanced Implant Prosthodontics", issuer: "Continuing education" },
  { id: "demo-cred-4", title: "Registered, Gujarat State Dental Council", issuer: "GSDC" },
] as const;
