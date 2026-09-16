/**
 * Proof the clinic can show a patient in the first few seconds.
 *
 * Every number the site renders as a "proof" figure is a `ProofMetric` here.
 * No numbers live in JSX. Each metric says where it came from and how far it
 * has been verified:
 *
 *   verified_public                  checked against a public source.
 *   clinic_supplied                  the clinic's own description of itself.
 *   clinic_supplied_needs_evidence   a volume or statistic typed on the
 *                                    clinic form (14 September 2026) that
 *                                    needs evidence before production. It
 *                                    renders unmarked; the build refuses to
 *                                    go indexable while any is displayed.
 *   review_sample                    placeholder for layout only.
 *
 * Figures the clinic typed are stored exactly as typed, never "corrected".
 * Where the same figure was asked twice on the form and the later field was
 * blank, the earlier answer is kept (form p44, p45 duplicate p2, p3).
 */

import { googleReputation } from "@/content/google-reputation";
import { site } from "@/content/site";

export type ProofVerification = "verified_public" | "clinic_supplied" | "clinic_supplied_needs_evidence" | "review_sample";

export type ProofMetric = {
  id: string;
  /** The figure as it should read, digits grouped: "45,000". */
  value: string;
  /** "+" when the clinic wrote it; nothing otherwise. */
  suffix?: string;
  label: string;
  /** Optional second line. */
  detail?: string;
  source: string;
  verification: ProofVerification;
  /** When the figure was stated or checked. */
  asOf: string;
  /** What evidence would move it to verified, or why it is held back. */
  evidenceNote?: string;
  /** False keeps the figure in data for the ledger but off every page. */
  display: boolean;
  /**
   * Pages this metric belongs to. "home" is the headline band on the
   * homepage: every volume the clinic gave, in one place, because scattering
   * them one per inner page meant a visitor who never left the homepage saw
   * none of them.
   */
  placements: ("home" | "about" | "implants" | "kids" | "nri" | "full-mouth" | "smile" | "rct")[];
};

const form = "Clinic information form, 14 September 2026";

export const proofMetrics: ProofMetric[] = [
  { id: "years", value: String(site.yearsInSurat), label: "Years in Surat", source: "form p7 (Correct)", verification: "clinic_supplied", asOf: "2026-09-14", display: true, placements: ["about"] },
  { id: "doctors", value: String(site.doctorCount), label: "Dentists", source: "form p15-27", verification: "clinic_supplied", asOf: "2026-09-14", display: true, placements: ["about"] },
  { id: "clinics", value: String(site.clinicCount), label: "Clinics in Surat", source: "form p9-12", verification: "clinic_supplied", asOf: "2026-09-14", display: true, placements: ["about"] },
  ...(googleReputation.sharedRating
    ? [
        {
          id: "rating",
          value: googleReputation.sharedRating,
          label: "On Google",
          detail: `${googleReputation.combinedReviews} reviews, ${googleReputation.combinedShort}`,
          source: "Google listings via clinic form p46 and p11",
          verification: "clinic_supplied" as ProofVerification,
          asOf: "2026-09-14",
          evidenceNote: "Recheck monthly (form p46).",
          display: true,
          placements: ["about"] as ProofMetric["placements"],
        },
      ]
    : []),
  { id: "patients", value: "45,000", label: "Patients treated", source: `${form}, p2 (repeated p44)`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Basis and date needed before launch.", display: true, placements: ["home", "about"] },
  { id: "implants", value: "3,700", label: "Implants placed", source: `${form}, p2`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Basis and date needed before launch.", display: true, placements: ["home", "about", "implants"] },
  { id: "full-mouth", value: "950", label: "Full mouth cases", source: `${form}, p2`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Basis and date needed before launch.", display: true, placements: ["home", "about", "full-mouth"] },
  { id: "rct", value: "90,000", suffix: "+", label: "Root canals", source: `${form}, p2`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Stored exactly as typed. It is double the stated patient count, so the clinic still needs to confirm what is being counted (ledger C12).", display: true, placements: ["home", "rct"] },
  { id: "smile-design", value: "720", suffix: "+", label: "Smile design cases", source: `${form}, p2`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Basis and date needed before launch.", display: true, placements: ["home", "smile"] },
  { id: "children", value: "4,500", suffix: "+", label: "Children treated", source: `${form}, p3 (p45 blank)`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Basis and date needed before launch.", display: true, placements: ["home", "kids"] },
  { id: "nri", value: "640", suffix: "+", label: "NRI patients", source: `${form}, p3 (Correct)`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Basis and date needed before launch.", display: true, placements: ["home", "nri"] },
  { id: "countries", value: "23", label: "Countries", source: `${form}, p3 (Correct)`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "A list of countries would let the site name a few.", display: true, placements: ["home", "nri"] },
  { id: "implant-success", value: "98.6", suffix: "%", label: "Implant success", source: `${form}, p3`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Never rendered: p30 'track implant success' is ticked Do not show (ledger C10).", display: false, placements: ["implants"] },
];

/** Metrics for a page, displayable ones only. */
export const metricsFor = (placement: ProofMetric["placements"][number]) => proofMetrics.filter((m) => m.display && m.placements.includes(placement));

/** True when a metric still needs evidence before the site can go live. */
export const needsMarker = (m: ProofMetric) => m.verification === "clinic_supplied_needs_evidence" || m.verification === "review_sample";

/** Metrics that block an indexable build while displayed. */
export const unprovenDisplayedMetrics = proofMetrics.filter((m) => m.display && needsMarker(m));

/**
 * Backwards-compatible view used by the About page's first row: the four
 * settled facts. Kept so older imports still typecheck.
 */
export type ProofStat = { id: string; value: string; label: string; detail?: string };
export const proofStats: ProofStat[] = proofMetrics
  .filter((m) => m.display && m.verification !== "clinic_supplied_needs_evidence" && m.placements.includes("about"))
  .map(({ id, value, suffix, label, detail }) => ({ id, value: `${value}${suffix ?? ""}`, label, detail }));

/**
 * Languages the team consults in. Surat patients frequently prefer Gujarati,
 * and saying so plainly removes a real barrier. Confirmed for every doctor
 * on the form (p17, p20, p23, p26).
 */
export const languages = ["Gujarati", "Hindi", "English"] as const;

/** Reassurance chips. Every one of these is confirmed. */
export const heroAssurances = [
  "Two clinics in Surat",
  "Gujarati, Hindi and English",
  "Implants, root canals, braces and kids dentistry",
] as const;
