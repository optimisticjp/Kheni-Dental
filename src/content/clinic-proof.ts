/**
 * Proof the clinic can show a patient in the first few seconds.
 *
 * Every number the site renders as a "proof" figure is a `ProofMetric` here.
 * No numbers live in JSX. Each metric says where it came from and how far it
 * has been verified:
 *
 *   verified_public                  checked against a public source.
 *   clinic_supplied                  the clinic's own description of itself.
 *   clinic_supplied_needs_evidence   a volume or statistic that still needs
 *                                    evidence before production. It renders
 *                                    unmarked; the build refuses to go
 *                                    indexable while any is displayed.
 *                                    Only `implant-success` carries this
 *                                    now, and that one is never rendered.
 *   review_sample                    placeholder for layout only.
 *
 * The clinic approved its eight volume figures as final on 19 September
 * 2026, so they moved from `clinic_supplied_needs_evidence` to
 * `clinic_supplied`. That is what the status means: the clinic's own
 * description of itself, published on its authority. It is not an audit,
 * and nobody here has counted anything.
 *
 * Figures are stored as the clinic states them and are never adjusted here
 * to look better. Where the same figure was asked twice on the form and the
 * later field was blank, the earlier answer is kept (form p44, p45 duplicate
 * p2, p3). When the clinic corrects a figure it replaces the value, and the
 * figure it replaces is written into `source` so the change stays on the
 * record rather than disappearing.
 */

import { googleReputation } from "@/content/google-reputation";
import { site } from "@/content/site";

export type ProofVerification = "verified_public" | "clinic_supplied" | "clinic_supplied_needs_evidence" | "review_sample";

export type ProofMetric = {
  id: string;
  /** The figure as it should read, digits grouped: "45,000". */
  value: string;
  /**
   * "+" on every figure that counts work done and therefore only goes up.
   *
   * The clinic asked for this on 19 September 2026, and it is the honest
   * reading of a running total: the number was true when it was counted and
   * is true or larger now. Four figures deliberately do not take it, because
   * there "+" would be a different claim rather than a safer one: the
   * dentist count, the clinic count, the Google rating, and the years in
   * Surat. Kheni has exactly four dentists and exactly two clinics, and
   * "4+ dentists" beside a homepage that says "four dentists" is a
   * contradiction, not a rounding.
   */
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
  placements: ("home" | "about" | "doctors" | "implants" | "kids" | "nri" | "full-mouth" | "smile" | "rct")[];
};

const form = "Clinic information form, 14 September 2026";

export const proofMetrics: ProofMetric[] = [
  { id: "years", value: String(site.yearsInSurat), label: "Years in Surat", source: "form p7 (Correct)", verification: "clinic_supplied", asOf: "2026-09-14", display: true, placements: ["about", "doctors"] },
  { id: "doctors", value: String(site.doctorCount), label: "Dentists", source: "form p15-27", verification: "clinic_supplied", asOf: "2026-09-14", display: true, placements: ["about", "doctors"] },
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
  { id: "patients", value: "45,000", suffix: "+", label: "Patients treated", source: `${form}, p2 (repeated p44); approved as final by the clinic, 19 September 2026`, verification: "clinic_supplied", asOf: "2026-09-19", evidenceNote: "The clinic's own count, approved for publication 19 September 2026.", display: true, placements: ["home", "about", "doctors"] },
  { id: "implants", value: "2,500", suffix: "+", label: "Implants placed", source: `${form}, p2; corrected by the clinic 19 September 2026 (was 3,700)`, verification: "clinic_supplied", asOf: "2026-09-19", evidenceNote: "The clinic's own count, approved for publication 19 September 2026.", display: true, placements: ["home", "about", "implants"] },
  { id: "full-mouth", value: "550", suffix: "+", label: "Full mouth cases", source: `${form}, p2; corrected by the clinic 19 September 2026 (was 950)`, verification: "clinic_supplied", asOf: "2026-09-19", evidenceNote: "The clinic's own count, approved for publication 19 September 2026.", display: true, placements: ["home", "about", "full-mouth"] },
  { id: "rct", value: "90,000", suffix: "+", label: "Root canals", source: `${form}, p2; approved as final by the clinic, 19 September 2026`, verification: "clinic_supplied", asOf: "2026-09-19", evidenceNote: "The clinic's own count, approved for publication 19 September 2026. It is double the stated patient count; the clinic has confirmed the figure but has still not said what it counts (canals, teeth or sittings), so the site never explains it (ledger C12).", display: true, placements: ["home", "rct"] },
  { id: "smile-design", value: "720", suffix: "+", label: "Smile design cases", source: `${form}, p2; approved as final by the clinic, 19 September 2026`, verification: "clinic_supplied", asOf: "2026-09-19", evidenceNote: "The clinic's own count, approved for publication 19 September 2026.", display: true, placements: ["home", "smile"] },
  { id: "children", value: "4,500", suffix: "+", label: "Children treated", source: `${form}, p3 (p45 blank); approved as final by the clinic, 19 September 2026`, verification: "clinic_supplied", asOf: "2026-09-19", evidenceNote: "The clinic's own count, approved for publication 19 September 2026.", display: true, placements: ["home", "kids"] },
  { id: "nri", value: "640", suffix: "+", label: "NRI patients", source: `${form}, p3 (Correct); approved as final by the clinic, 19 September 2026`, verification: "clinic_supplied", asOf: "2026-09-19", evidenceNote: "The clinic's own count, approved for publication 19 September 2026.", display: true, placements: ["home", "nri"] },
  { id: "countries", value: "23", suffix: "+", label: "Countries", source: `${form}, p3 (Correct); approved as final by the clinic, 19 September 2026`, verification: "clinic_supplied", asOf: "2026-09-19", evidenceNote: "The clinic's own count, approved for publication 19 September 2026. A list of the countries would still let the site name a few.", display: true, placements: ["home", "nri"] },
  { id: "implant-success", value: "98.6", suffix: "%", label: "Implant success", source: `${form}, p3`, verification: "clinic_supplied_needs_evidence", asOf: "2026-09-14", evidenceNote: "Never rendered: p30 'track implant success' is ticked Do not show (ledger C10).", display: false, placements: ["implants"] },
];

/** Metrics for a page, displayable ones only. */
export const metricsFor = (placement: ProofMetric["placements"][number]) => proofMetrics.filter((m) => m.display && m.placements.includes(placement));

/** True when a metric still needs evidence before the site can go live. */
export const needsMarker = (m: ProofMetric) => m.verification === "clinic_supplied_needs_evidence" || m.verification === "review_sample";

/** Metrics that block an indexable build while displayed. */
export const unprovenDisplayedMetrics = proofMetrics.filter((m) => m.display && needsMarker(m));

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
