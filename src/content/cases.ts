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
  /**
   * What the patient came in with. Rendered as plain text, not as a quotation,
   * because it is usually a description written here rather than the patient's
   * own sentence, and a description in quote marks reads as a testimonial.
   */
  concern: string;
  /** One line on the outcome. No superlatives, no guarantees. */
  result: string;
  /**
   * Optional, both of them. The clinic's position is that it shows the work
   * was done rather than who did it, and several dentists here can do most of
   * this work. Naming one on a case nobody has attributed would be inventing
   * a fact, so an unattributed case simply omits the line.
   */
  doctorSlug?: string;
  branchSlug?: string;
  beforeImage: string;
  afterImage: string;
  /** Alt text describing each photograph. */
  beforeAlt: string;
  afterAlt: string;
  /**
   * When the "after" photograph was taken, e.g. "4 months after fitting".
   * Optional, because a guessed interval on a before and after is the single
   * easiest thing to mislead with. Omitted rather than estimated.
   */
  afterTakenAt?: string;
  /** Optional, only if the clinic tracks it: "3 visits over 5 months". */
  timeline?: string;
  hue: Hue;
  /** Written consent on file. The type only accepts true. */
  consentConfirmed: true;
};

/**
 * TODO(clinic): the first orthodontic case is ready to drop in as soon as the
 * clinic confirms which photograph is which.
 *
 * It arrived on 19 September 2026 as a single stacked image, consent
 * confirmed by the clinic, unattributed by choice. It is held back because
 * the two panels disagree with their label: the panel sent as the "after"
 * shows crowded, overlapping lower incisors and the one sent as the "before"
 * shows them evenly aligned. Alignment is the whole point of an orthodontic
 * case, so one reading has the pair inverted, and a before and after
 * published the wrong way round says the clinic made a patient's teeth
 * worse. Confirm, then fill this in.
 */
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
