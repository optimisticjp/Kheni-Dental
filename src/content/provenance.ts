/**
 * Content provenance.
 *
 * Every fact the site renders falls into one of five buckets, and the bucket
 * decides how it is shown and whether the site may go live with it:
 *
 *   verified        checked against a public source (Google, Instagram,
 *                   YouTube, a manufacturer's own site). Publishable.
 *   clinic_supplied written or ticked by the clinic on its information form
 *                   and safe to state as the clinic's own description of
 *                   itself (a service offered, a college, a branch).
 *   needs_proof     supplied by the clinic but a volume, credential, warranty
 *                   or statistic that needs evidence first. Shown on the
 *                   review preview with a TO CONFIRM marker; blocks a build
 *                   that has indexing switched on.
 *   review_sample   written here so the preview reads complete. Marked
 *                   SAMPLE wherever it renders; blocks an indexable build.
 *   hidden          held in data for the ledger, never rendered.
 *
 * The page-by-page reasoning behind each value lives in
 * docs/CLINIC-FORM-IMPLEMENTATION.md.
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

/**
 * Whether review-only content is allowed to render at all. It is, on every
 * build that is not indexable. The integrity check turns the reverse into a
 * build failure, so this flag is a rendering convenience, not the guard.
 */
export const reviewPreview = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true";
