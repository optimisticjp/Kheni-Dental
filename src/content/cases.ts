/**
 * Before and after case results.
 *
 * Nothing renders here unless it is a real Kheni Dental case with written
 * patient consent and treating-doctor approval. No stock teeth, no generated
 * images, no borrowed cases. While the list is empty the page shows finished
 * placeholder frames so the clinic can see exactly what to photograph.
 *
 * See docs/CLINIC-CONTENT-NEEDED.md for the shot list.
 */

export type CaseCategory =
  | "Dental Implants"
  | "Full Mouth Rehabilitation"
  | "Smile Design"
  | "Crowns & Veneers"
  | "Braces & Aligners";

export type CaseResult = {
  id: string;
  category: CaseCategory;
  /** What the patient came in with, in their words where possible. */
  startingConcern: string;
  /** One line on the outcome. No superlatives, no guarantees. */
  resultSummary: string;
  /** What was actually carried out, in plain words. Featured cases only. */
  whatWasDone?: string;
  /** Why this approach rather than another. Featured cases only. */
  whyThisApproach?: string;
  /** Ordered treatment stages, for a case worth telling as a story. */
  stages?: string[];
  /** Optional consented patient line. Never write this on their behalf. */
  patientComment?: string;
  /** Marks the one case that leads the gallery. At most one. */
  featured?: boolean;
  doctorSlug: string;
  branchSlug: string;
  beforeImage: string;
  afterImage: string;
  /** When the "after" photograph was taken, e.g. "4 months after fitting". */
  afterTakenAt: string;
  /** Optional, only if the clinic tracks it: "3 visits over 5 months". */
  timeline?: string;
  videoUrl?: string;
  consentConfirmed: true;
};

/** TODO(clinic): add consented cases. */
export const caseResults: CaseResult[] = [];

/** Filter chips shown above the gallery. Order is deliberate. */
export const caseCategories: CaseCategory[] = [
  "Dental Implants",
  "Full Mouth Rehabilitation",
  "Smile Design",
  "Crowns & Veneers",
  "Braces & Aligners",
];

export const caseDisclaimer =
  "Every mouth is different. These are individual results and are not a prediction of what treatment will achieve for you.";

/** Placeholder frames shown per category while cases are pending. */
export const PENDING_CASE_TILES = 3;
