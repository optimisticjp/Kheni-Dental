/**
 * Content provenance.
 *
 * Every fact the site renders falls into one of five buckets. Since the
 * September 2026 review pass the bucket no longer changes how an item LOOKS,
 * because the owner asked for the markers to come off so the design could be
 * judged on its own. It still decides whether the site may go live:
 *
 *   verified        checked against a public source (Google, Instagram,
 *                   YouTube, a manufacturer's own site). Publishable.
 *   clinic_supplied written or ticked by the clinic on its information form
 *                   and safe to state as the clinic's own description of
 *                   itself (a service offered, a college, a branch).
 *   needs_proof     supplied by the clinic but a volume, credential, warranty
 *                   or statistic that needs evidence first.
 *   review_sample   written in this repository so the page reads complete.
 *                   Not a fact about Kheni Dental.
 *   hidden          held in data for the ledger, never rendered.
 *
 * The last two block an indexable build. That check lives in
 * `src/content/__checks__/content-integrity.check.ts` and is now the only
 * thing standing between placeholder content and a live site, because
 * nothing on the page says which is which. The page-by-page reasoning behind
 * each value is in docs/CLINIC-FORM-IMPLEMENTATION.md.
 */

export type ContentStatus = "verified" | "clinic_supplied" | "needs_proof" | "review_sample" | "hidden";

export type Provenance = {
  status: ContentStatus;
  /** Where the value came from: "form p29", "Google listing", "SOURCE_FACTS.md". */
  source?: string;
  /** ISO-ish date the value was last confirmed or checked. */
  lastChecked?: string;
  /** What would upgrade the status, e.g. "written warranty terms". */
  evidence?: string;
};

/** True for content that may not appear on an indexable build. */
export const blocksIndexing = (status: ContentStatus) => status === "needs_proof" || status === "review_sample";
