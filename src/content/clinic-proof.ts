/**
 * Proof the clinic can show a patient in the first few seconds.
 *
 * HOW MISSING DATA WORKS
 * Every figure is either `verified` (a fact already confirmed in the
 * repository or by the clinic) or `pending` (the component renders finished,
 * with the value visibly marked as clinic data we are still waiting for).
 * Nothing is ever invented to look plausible. Turning a pending figure into a
 * real one is a one-line change:
 *
 *   { status: "pending", placeholder: "XX,XXX+" }
 *   ->
 *   { status: "verified", value: "25,000+" }
 *
 * Everything the clinic still owes us is listed in
 * docs/CLINIC-CONTENT-NEEDED.md.
 */

import { googleReputation } from "@/content/google-reputation";

export type ProofValue =
  | { status: "verified"; value: string }
  | { status: "pending"; placeholder: string };

export type ProofStat = {
  id: string;
  /** The number itself. */
  value: ProofValue;
  /** Plain label a patient understands at a glance. */
  label: string;
  /** Optional one-line qualifier. Keep it very short or omit it. */
  detail?: string;
};

export const verified = (value: string): ProofValue => ({ status: "verified", value });
export const pending = (placeholder: string): ProofValue => ({ status: "pending", placeholder });

/**
 * Headline stats. Indian dental sites that convert well lead with volume,
 * experience and reach, written in Indian digit grouping (1,00,000 not
 * 100,000). Only the first three are confirmed today.
 */
export const proofStats: ProofStat[] = [
  { id: "years", value: verified("15"), label: "Years in Surat", detail: "Since 2011" },
  { id: "doctors", value: verified("4"), label: "Dentists on the team" },
  { id: "clinics", value: verified("2"), label: "Clinics in Surat" },
  // The fourth slot used to hold a patient-count placeholder. The rating is a
  // real figure, checked on a date we can name, and it is the one number in
  // this row a patient can go and verify for themselves.
  ...(googleReputation.sharedRating
    ? [
        {
          id: "rating",
          value: verified(googleReputation.sharedRating),
          label: "Rating on Google",
          detail: `${googleReputation.combinedReviews} reviews, two clinics`,
        } satisfies ProofStat,
      ]
    : []),
  { id: "patients", value: pending("XX,XXX+"), label: "Patients treated" },
];

/** Treatment-volume counters. Used on the implant page and the proof band. */
export const treatmentStats: ProofStat[] = [
  { id: "implants", value: pending("X,XXX+"), label: "Implants placed" },
  { id: "full-mouth", value: pending("XXX+"), label: "Full mouth cases" },
  { id: "smile", value: pending("XXX+"), label: "Smile makeovers" },
  { id: "root-canals", value: pending("XX,XXX+"), label: "Root canals completed" },
];

/** Shown on the international page. */
export const nriStats: ProofStat[] = [
  { id: "countries", value: pending("XX+"), label: "Countries patients travel from" },
  { id: "nri-cases", value: pending("XXX+"), label: "NRI patients treated" },
];

export type Credential = {
  id: string;
  title: string;
  /** Who issued it. Omitted while pending. */
  issuer?: string;
  status: "verified" | "pending";
};

/**
 * Awards, certifications and professional memberships.
 * TODO(clinic): replace with the real list. Do not add anything the doctors
 * have not confirmed in writing.
 */
export const credentials: Credential[] = [
  { id: "cred-1", title: "Professional membership", status: "pending" },
  { id: "cred-2", title: "Implantology training", status: "pending" },
  { id: "cred-3", title: "Certification", status: "pending" },
  { id: "cred-4", title: "Award or recognition", status: "pending" },
];

/**
 * Languages the team consults in. Surat patients frequently prefer Gujarati,
 * and saying so plainly removes a real barrier.
 * TODO(clinic): confirm per doctor.
 */
export const languages = ["Gujarati", "Hindi", "English"] as const;

/**
 * Quick reassurance chips for the hero. Every one of these is already
 * confirmed in the repository. Do not add availability, waiting-time or
 * pricing promises here unless the clinic has confirmed them in writing.
 */
export const heroAssurances = [
  "Two clinics in Surat",
  "Gujarati, Hindi and English",
  "Implants, RCT, braces and kids dentistry",
] as const;
