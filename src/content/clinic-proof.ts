/**
 * Proof the clinic can show a patient in the first few seconds.
 *
 * Only verified facts. A figure the clinic has not confirmed does not exist
 * on the site, in any form. What the clinic can still send is listed in
 * docs/CLINIC-CONTENT-NEEDED.md.
 */

import { googleReputation } from "@/content/google-reputation";
import { site } from "@/content/site";

export type ProofStat = {
  id: string;
  value: string;
  label: string;
  detail?: string;
};

export const proofStats: ProofStat[] = [
  { id: "years", value: String(site.yearsInSurat), label: "Years in Surat" },
  { id: "doctors", value: String(site.doctorCount), label: "Dentists" },
  { id: "clinics", value: String(site.clinicCount), label: "Clinics in Surat" },
  ...(googleReputation.sharedRating
    ? [
        {
          id: "rating",
          value: googleReputation.sharedRating,
          label: "On Google",
          detail: `${googleReputation.combinedReviews} reviews, ${googleReputation.combinedShort}`,
        } satisfies ProofStat,
      ]
    : []),
];

/**
 * Languages the team consults in. Surat patients frequently prefer Gujarati,
 * and saying so plainly removes a real barrier.
 */
export const languages = ["Gujarati", "Hindi", "English"] as const;

/** Reassurance chips. Every one of these is already confirmed. */
export const heroAssurances = [
  "Two clinics in Surat",
  "Gujarati, Hindi and English",
  "Implants, root canals, braces and kids dentistry",
] as const;
