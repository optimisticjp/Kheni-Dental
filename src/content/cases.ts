/**
 * Before and after cases.
 *
 * Nothing renders here unless it is a real Kheni Dental case with written
 * patient consent and treating-doctor approval. No stock teeth, no generated
 * images, no borrowed cases, no invented case facts.
 *
 * The list is empty until the clinic supplies cases. The BeforeAfterSlider
 * component demonstrates its behaviour with a clearly non-clinical
 * illustration until then, and the archive is hidden from visitors.
 *
 * See docs/CLINIC-CONTENT-NEEDED.md for what each case needs.
 */

import type { Hue } from "@/content/site";

export type CaseCategory =
  | "Dental Implants"
  | "Full Mouth Rehabilitation"
  | "Smile Design"
  | "Crowns & Bridges"
  | "Braces & Aligners";

export type CaseResult = {
  id: string;
  category: CaseCategory;
  treatmentSlug: string;
  /** What the patient came in with, in their words where possible. */
  concern: string;
  /** One line on the outcome. No superlatives, no guarantees. */
  result: string;
  doctorSlug: string;
  branchSlug: string;
  beforeImage: string;
  afterImage: string;
  /** Alt text describing each photograph. */
  beforeAlt: string;
  afterAlt: string;
  /** When the "after" photograph was taken, e.g. "4 months after fitting". */
  afterTakenAt: string;
  /** Optional, only if the clinic tracks it: "3 visits over 5 months". */
  timeline?: string;
  hue: Hue;
  /** Written consent on file. The type only accepts true. */
  consentConfirmed: true;
};

/** TODO(clinic): add consented cases. Empty by design. */
export const caseResults: CaseResult[] = [];

export const caseDisclaimer =
  "Every mouth is different. These are individual results and are not a prediction of what treatment will achieve for you.";

/** The five areas the clinic can photograph results for. */
export const caseCategories: CaseCategory[] = [
  "Dental Implants",
  "Full Mouth Rehabilitation",
  "Smile Design",
  "Crowns & Bridges",
  "Braces & Aligners",
];
