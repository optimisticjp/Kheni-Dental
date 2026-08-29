import { locations } from "@/content/site";
import { directionsUrl, placeUrl, placeUrlFromId, writeReviewUrl } from "@/lib/maps";

/**
 * Branch-data integrity, enforced at build time.
 *
 * The bug this exists to prevent: both branches' embedded maps resolved to
 * roughly the same part of Varachha, because the map was built from a
 * free-text address string rather than each branch's Place ID. Anything that
 * lets one branch's identity leak into another's URL is the same class of
 * fault, so it is checked rather than trusted.
 *
 * This module is imported by `src/app/layout.tsx`, so a violation fails
 * `npm run build` instead of reaching a patient.
 */

/** The two Place IDs, verified on 29 August 2026 against the short links the
 *  clinic supplied. Both resolved to their branch's own Google Feature ID:
 *    swastik-plaza -> 0x3be04f7a895dd675
 *    hirabaug      -> 0x3be04fa50081dcf3
 *  Changing one of these means re-verifying it, not editing it in place. */
const KNOWN_PLACE_IDS: Record<string, string> = {
  "swastik-plaza": "ChIJddZdiXpP4DsRvtrOvXjbQqA",
  hirabaug: "ChIJ89yBAKVP4DsR3TYY_211oRg",
};

function fail(message: string): never {
  throw new Error(`[branch-data] ${message}`);
}

export function assertBranchDataIntegrity(): void {
  const seenPlaceIds = new Set<string>();
  const seenShortUrls = new Set<string>();
  const seenPhones = new Set<string>();

  for (const location of locations) {
    const expected = KNOWN_PLACE_IDS[location.slug];
    if (!expected) fail(`unknown branch "${location.slug}" — add its verified Place ID to this check`);
    if (location.googlePlaceId !== expected) {
      fail(`${location.slug} Place ID changed to "${location.googlePlaceId}". Re-verify against Google before editing.`);
    }

    // Nothing may be shared between branches.
    if (seenPlaceIds.has(location.googlePlaceId)) fail(`two branches share Place ID ${location.googlePlaceId}`);
    if (seenShortUrls.has(location.googleShortUrl)) fail(`two branches share the Maps short link ${location.googleShortUrl}`);
    if (seenPhones.has(location.phoneHref)) fail(`two branches share the phone number ${location.phoneHref}`);
    seenPlaceIds.add(location.googlePlaceId);
    seenShortUrls.add(location.googleShortUrl);
    seenPhones.add(location.phoneHref);

    // Every derived URL must carry this branch's own ID and nobody else's.
    const derived = [placeUrlFromId(location), directionsUrl(location), writeReviewUrl(location)];
    for (const url of derived) {
      if (!url.includes(encodeURIComponent(location.googlePlaceId)) && !url.includes(location.googlePlaceId)) {
        fail(`${location.slug} derived a URL without its own Place ID: ${url}`);
      }
      for (const other of locations) {
        if (other.slug === location.slug) continue;
        if (url.includes(other.googlePlaceId)) fail(`${location.slug} URL contains ${other.slug}'s Place ID: ${url}`);
      }
    }

    if (!placeUrl(location).startsWith("https://maps.app.goo.gl/")) {
      fail(`${location.slug} profile link is not the clinic-supplied short link`);
    }

    // A branch that shows a rating must show its own review count and date.
    if (location.google.status === "verified") {
      if (!location.google.rating || !location.google.reviewCount || !location.google.verifiedOn) {
        fail(`${location.slug} is marked verified but is missing a rating, review count or verified date`);
      }
    }
  }
}

assertBranchDataIntegrity();
