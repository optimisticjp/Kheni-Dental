import { locations, type Location } from "@/content/site";

/**
 * Google reputation, derived from the per-branch data in `site.ts`.
 *
 * Both Surat clinics keep their own Google Business Profile with its own
 * rating and its own review count. Nothing here merges them into a single
 * identity: the combined figure exists only so the site can say how much
 * feedback there is in total, and every place it appears is labelled as the
 * sum of two separate listings.
 *
 * Rule that must survive future edits: a branch never displays a figure that
 * belongs to the other branch. If a branch's `google.status` is not
 * `verified`, its card renders a marked placeholder instead.
 */

export type VerifiedBranchReputation = {
  location: Location;
  rating: string;
  reviewCount: string;
  /** Review count as a number, for arithmetic only. Never rendered directly. */
  reviewCountValue: number;
  verifiedOn?: string;
};

const parseCount = (value: string) => Number(value.replace(/[^\d]/g, "")) || 0;

/** Indian digit grouping. 1963 -> "1,963", 175300 -> "1,75,300". */
export function formatIndian(value: number): string {
  const s = String(value);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  return `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${last3}`;
}

export const verifiedBranches: VerifiedBranchReputation[] = locations
  .filter((location) => location.google.status === "verified" && location.google.rating && location.google.reviewCount)
  .map((location) => ({
    location,
    rating: location.google.rating as string,
    reviewCount: location.google.reviewCount as string,
    reviewCountValue: parseCount(location.google.reviewCount as string),
    verifiedOn: location.google.verifiedOn,
  }));

const totalReviews = verifiedBranches.reduce((sum, branch) => sum + branch.reviewCountValue, 0);

/**
 * Every branch carries the same star rating today, so the site can state one
 * rating honestly. If the branches ever diverge this returns null and the
 * components fall back to showing each branch separately.
 */
const ratings = Array.from(new Set(verifiedBranches.map((branch) => branch.rating)));

export const googleReputation = {
  /** How many profiles the combined number is drawn from. */
  profileCount: verifiedBranches.length,
  /** Shared rating, or null when the branches no longer agree. */
  sharedRating: ratings.length === 1 ? ratings[0] : null,
  /** Exact combined review count, e.g. "1,963". Always shown with the label below. */
  combinedReviews: formatIndian(totalReviews),
  /**
   * The only sentence allowed to accompany the combined figure. It has to keep
   * saying that this is two separate listings added together.
   */
  combinedLabel: "Google reviews across our two clinic profiles",
  /** Short form for tight spaces. Still names both profiles. */
  combinedShort: "across two clinic profiles",
  verifiedOn: verifiedBranches[0]?.verifiedOn,
  allVerified: verifiedBranches.length === locations.length,
} as const;
