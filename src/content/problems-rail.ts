import { doctors, treatments } from "@/content/site";

/**
 * The editorial layer for the "Problems we treat" rail.
 *
 * The rail is the site's signature interaction, so its content is written for
 * recognition rather than completeness: the patient should find themselves in
 * one line before they read anything clinical. Structure per panel:
 *
 *   question   the patient's own words, in the form they would say it
 *   body       one sentence about what actually happens at the clinic
 *   doctor     who leads that work, when it is clearly one person
 *   shot       the photograph the clinic still owes us for this panel
 *
 * Everything else (title, link, meta) comes from the real treatment dataset in
 * site.ts, so a treatment can never drift out of sync with its own page.
 */

export type RailEntry = {
  slug: string;
  /** Short label for the collapsed panel and the mobile selector. */
  label: string;
  question: string;
  body: string;
  doctorSlug?: string;
  shot: string;
  cta: string;
};

const entries: RailEntry[] = [
  {
    slug: "dental-implants-surat",
    label: "Dental Implants",
    question: "Missing a tooth, or a denture that will not stay put?",
    body: "Fixed replacements planned at the Elite Implant Center, after the bone and the teeth on either side have been assessed.",
    doctorSlug: "dr-mayur-kheni",
    shot: "Implant consultation, Hirabaug",
    cta: "Explore implants",
  },
  {
    slug: "root-canal-treatment-surat",
    label: "Root Canal Treatment",
    question: "Tooth pain that will not settle?",
    body: "Treatment aimed at clearing the infection and keeping your own tooth, once imaging shows which tooth is involved.",
    doctorSlug: "dr-parita-vastarpara",
    shot: "Treatment room, Yogi Chowk",
    cta: "About root canals",
  },
  {
    slug: "cosmetic-smile-dentistry",
    label: "Smile Design",
    question: "Smiling with your mouth closed in photos?",
    body: "Tell us what you notice first. Some of it needs very little, and we will say so before suggesting anything bigger.",
    doctorSlug: "dr-jinal-monapara",
    shot: "Smile design consultation",
    cta: "See smile design",
  },
  {
    slug: "braces-clear-aligners",
    label: "Braces & Aligners",
    question: "Teeth crowding, or a gap that bothers you?",
    body: "Your bite is assessed before any talk of braces or aligners, because how the teeth need to move decides what suits you.",
    shot: "Aligner fitting appointment",
    cta: "Braces and aligners",
  },
  {
    slug: "full-mouth-rehabilitation",
    label: "Full Mouth Rehab",
    question: "Several teeth need work and you do not know where to start?",
    body: "The first useful step is putting them in order. What is urgent gets separated from what can wait, then the rest is staged.",
    doctorSlug: "dr-mayur-kheni",
    shot: "Full mouth case planning",
    cta: "Full mouth care",
  },
  {
    slug: "crowns-and-bridges",
    label: "Crowns & Bridges",
    question: "Afraid to bite down on one side?",
    body: "A tooth that has been through a lot often needs covering rather than filling. We check what is left before deciding.",
    shot: "Crown fitting, close up",
    cta: "Crowns and bridges",
  },
  {
    slug: "kids-dentistry-surat",
    label: "Kids Dentistry",
    question: "Worried about your child's first visit?",
    body: "The first appointment is mostly about letting your child settle in the chair. Nothing happens without explaining it to you first.",
    doctorSlug: "dr-ishita-dobariya",
    shot: "Child patient with Dr. Ishita",
    cta: "Kids dentistry",
  },
  {
    slug: "gum-care-surat",
    label: "Gum Care",
    question: "Gums bleeding when you brush?",
    body: "Worth checking early rather than waiting to see if it settles. An examination shows how far it has gone and what will help.",
    shot: "Gum examination",
    cta: "Gum treatment",
  },
  {
    slug: "wisdom-tooth-oral-surgery",
    label: "Wisdom Tooth",
    question: "Wisdom tooth sore, jaw feeling swollen?",
    body: "Not every wisdom tooth has to come out. Examination and imaging show whether it can be watched or should be removed.",
    shot: "Surgical suite, Hirabaug",
    cta: "Wisdom tooth care",
  },
  {
    slug: "general-family-dentistry",
    label: "Check-ups & Fillings",
    question: "Longer than you would like since the last check-up?",
    body: "People come to us after long gaps more often than you would think. We look at where things stand today and what to do first.",
    shot: "Reception and waiting area",
    cta: "Everyday dentistry",
  },
];

export type RailPanel = RailEntry & {
  title: string;
  href: string;
  doctorName?: string;
};

/** Rail panels, joined to the real treatment records. */
export const railPanels: RailPanel[] = entries.flatMap((entry) => {
  const treatment = treatments.find((item) => item.slug === entry.slug);
  if (!treatment) return [];
  const doctor = entry.doctorSlug ? doctors.find((item) => item.slug === entry.doctorSlug) : undefined;
  return [
    {
      ...entry,
      title: treatment.title,
      href: `/treatments/${treatment.slug}/`,
      doctorName: doctor?.name,
    },
  ];
});

/**
 * Treatment areas patients ask for by name that are not yet confirmed as
 * separate services at Kheni. Rendered as marked pending chips under the rail
 * so the doctors can simply tell us which of these to publish.
 * TODO(clinic): confirm each, then promote it to a full rail panel.
 */
export const pendingTreatmentAreas = [
  "Teeth Whitening",
  "Cleaning & Scaling",
  "Dentures",
  "Tooth Extraction",
] as const;
