/**
 * Review-only sample content.
 *
 * Everything in this file exists so the clinic can review a complete-looking
 * preview. None of it is a fact about Kheni Dental. Each item renders with a
 * SAMPLE marker, and `src/content/__checks__/content-integrity.check.ts`
 * fails the build if any of it is still present when
 * NEXT_PUBLIC_ALLOW_INDEXING is "true".
 *
 * Rules:
 *   - No fabricated identifiable people. Patients are "Sample patient".
 *   - No clinical photographs. Case frames are neutral graphics.
 *   - Sample copy about a doctor uses only facts the clinic confirmed
 *     (degree, years, treatments, branch). No personal stories.
 *   - Editorial lines are never presented as literal doctor speech.
 *
 * Replacing a sample: the clinic sends the real item, it moves to its own
 * content file with the right provenance, and the entry here is deleted.
 */

import type { Hue } from "@/content/site";

export const SAMPLE = "review_sample" as const;

export type SampleBio = { doctorSlug: string; bio: string; status: typeof SAMPLE };

/** Bios the form left blank (pages 18 and 27). Built from confirmed facts only. */
export const sampleBios: SampleBio[] = [
  {
    doctorSlug: "dr-mayur-kheni",
    status: SAMPLE,
    bio:
      "Dr. Mayur Kheni founded Kheni Dental in 2012 and leads its implant and full mouth work across both clinics. Fifteen years in practice, a B.D.S. from Dharmsinh Desai University, and a way of explaining a treatment plan that patients can repeat at home.",
  },
  {
    doctorSlug: "dr-jinali-monpara",
    status: SAMPLE,
    bio:
      "Dr. Jinali Monpara is a cosmetic dental surgeon with ten years in practice. She works on smile design, teeth whitening, full mouth rehabilitation and children's dentistry at both clinics, and prefers the smallest change that gets a patient what they came for.",
  },
  {
    doctorSlug: "dr-parita-vastarpara",
    status: SAMPLE,
    bio:
      "Dr. Parita Vastarpara is a dental surgeon with four years in practice, seeing patients at both clinics for cleaning and preventive care, fillings, crowns and root canal treatment. Most of her day is the everyday dentistry that is easier done now than later.",
  },
];

export type EditorialLine = { doctorSlug: string; line: string; highlight: string; status: typeof SAMPLE | "clinic_supplied"; source?: string };

/**
 * Lines set large on doctor pages. Not quotations. Dr. Jinali's is built
 * from her own words on page 21 ("from consultation to new teeth"); the
 * rest are editorial samples.
 */
export const editorialLines: EditorialLine[] = [
  { doctorSlug: "dr-mayur-kheni", line: "You should be able to explain your own treatment plan to someone at home.", highlight: "explain", status: SAMPLE },
  { doctorSlug: "dr-jinali-monpara", line: "From consultation to new teeth, one conversation at a time.", highlight: "new teeth", status: "clinic_supplied", source: "form p21" },
  { doctorSlug: "dr-ishita-dobariya", line: "A child who is not frightened this time sits down more easily next time.", highlight: "next time", status: SAMPLE },
  { doctorSlug: "dr-parita-vastarpara", line: "Most people are not avoiding the dentist. They are avoiding not knowing.", highlight: "not knowing", status: SAMPLE },
];

export type SampleTestimonial = {
  id: string;
  /** Always "Sample patient". Never a real or plausible name. */
  name: "Sample patient";
  treatment: string;
  quote: string;
  status: typeof SAMPLE;
};

/**
 * Written testimonial layout, page 6: "replace with real written
 * testimonials". These hold the slot until real, consented ones arrive.
 */
export const sampleTestimonials: SampleTestimonial[] = [
  { id: "sample-1", name: "Sample patient", treatment: "Dental implant", status: SAMPLE, quote: "Sample text. A short paragraph in the patient's own words about what they came in with and how the visits went. Replaced by a real, consented testimonial." },
  { id: "sample-2", name: "Sample patient", treatment: "Root canal treatment", status: SAMPLE, quote: "Sample text. Two or three sentences, roughly this long, so the card holds its shape. Replaced by a real, consented testimonial." },
  { id: "sample-3", name: "Sample patient", treatment: "Child's first visit", status: SAMPLE, quote: "Sample text. A parent describing a first visit. Replaced by a real, consented testimonial." },
];

export type SampleCase = {
  id: string;
  category: string;
  treatment: string;
  concern: string;
  result: string;
  doctorLabel: "Treating dentist";
  branchLabel: "Clinic";
  timeline: string;
  visits: string;
  hue: Hue;
  status: typeof SAMPLE;
};

/**
 * Neutral case frames for the gallery layout (page 34 and 51 left blank).
 * The slider shows plain graphics, never a mouth. Each card lists the fields
 * a real case will carry.
 */
export const sampleCases: SampleCase[] = [
  { id: "sample-case-1", category: "Sample case", treatment: "Single implant", concern: "Sample: one missing back tooth", result: "Sample: fixed crown on an implant", doctorLabel: "Treating dentist", branchLabel: "Clinic", timeline: "Sample: 5 months", visits: "Sample: 4 visits", hue: "gold", status: SAMPLE },
  { id: "sample-case-2", category: "Sample case", treatment: "Smile design", concern: "Sample: chipped and uneven front teeth", result: "Sample: bonding and whitening", doctorLabel: "Treating dentist", branchLabel: "Clinic", timeline: "Sample: 3 weeks", visits: "Sample: 3 visits", hue: "coral", status: SAMPLE },
];

export type SampleStep = { title: string; copy: string };

/**
 * NRI planning workflow. Page 55 ticked nothing, so this is a sample of the
 * steps the clinic can confirm, one by one. Nothing about airports, hotels,
 * visas or round-the-clock support.
 */
export const sampleNriWorkflow: { status: typeof SAMPLE; steps: SampleStep[] } = {
  status: SAMPLE,
  steps: [
    { title: "Message us first", copy: "Send your dates and what you would like looked at on WhatsApp." },
    { title: "Share X-rays or reports", copy: "If you have recent ones, send them so the dentist can see what is realistic. Advice still depends on an examination here." },
    { title: "Discuss the schedule", copy: "What can be done on this trip, what needs healing time, and how many visits to expect." },
    { title: "Reserve your visits", copy: "Visits are grouped around your arrival so you are not travelling back and forth." },
    { title: "Follow-up at home", copy: "Questions after the trip come by WhatsApp." },
  ],
};

export type SampleGuide = { id: string; status: typeof SAMPLE; points: string[]; note: string };

/**
 * Aftercare guides the clinic approved as topics on page 58 but for which it
 * has not yet sent its own instruction sheet. General, conservative wording.
 */
export const sampleGuides: SampleGuide[] = [
  {
    id: "after-extraction",
    status: SAMPLE,
    note: "Sample wording. The clinic's own extraction sheet replaces this.",
    points: [
      "Bite gently on the gauze for the time you were told, and leave the area alone afterwards: no rinsing hard, no spitting, no straws and no smoking for the first day.",
      "Eat soft, cool food on the other side. Some swelling and discomfort for a few days is expected; take any medicine exactly as prescribed.",
      "Call the clinic if bleeding does not settle, if pain gets worse after the second day, or if you notice a bad taste or fever.",
    ],
  },
  {
    id: "after-implant",
    status: SAMPLE,
    note: "Sample wording. The clinic's own implant aftercare sheet replaces this.",
    points: [
      "Expect some swelling and soreness for a few days. Cold compresses on the outside of the face and a soft diet help in the first days.",
      "Keep the area clean as you were shown, without brushing directly over the surgical site until the dentist says so.",
      "Do not chew hard food on the implant while it is healing, and keep every review appointment so the healing can be checked.",
    ],
  },
];

/** Every sample collection, for the integrity guard. */
export const reviewSampleInventory = {
  sampleBios,
  editorialLines: editorialLines.filter((l) => l.status === SAMPLE),
  sampleTestimonials,
  sampleCases,
  sampleNriWorkflow,
  sampleGuides,
};

export const reviewSampleCount = Object.values(reviewSampleInventory).reduce((n, v) => n + (Array.isArray(v) ? v.length : 1), 0);
