import type { Location } from "@/content/site";

/**
 * Google Maps, derived from one identity per branch.
 *
 * WHY THIS FILE EXISTS
 * The embed used to be built from a free-text address string:
 *
 *     maps.google.com/maps?q=Kheni+Dental+Clinic,+Swastik+Plaza,+Yogi+Chowk...&output=embed
 *
 * That is a *search*, not a place. Google resolves it with ranking, so both
 * branches drifted to the same broad Varachha area instead of pinning the two
 * actual listings. The keyless endpoint cannot be fixed by passing
 * `place_id:` either: it has exactly one input slot and forwards the value as
 * literal search text (verified — it redirects to `/maps/embed?…!1splace_id:ChIJ…`,
 * the same `!1s` free-text parameter), so it searches for the string rather
 * than resolving the ID.
 *
 * So every URL here is built from `googlePlaceId`, which is the one piece of
 * identity a branch owns, and each helper takes the whole `Location` object.
 * There is no way to hand it a name from one branch and an ID from another.
 *
 *   LINKS   Google Maps URLs API. Keyless, documented, and verified to resolve
 *           to the exact Feature ID of each listing.
 *   EMBED   Google Maps Embed API with `place_id:`. Needs a key. Without one
 *           we render an exact-location panel instead of a wrong map, because
 *           a map pointing at the wrong place is worse than no map.
 */

const MAPS_URL_API = "https://www.google.com/maps";

/** Set to enable real embedded maps. Absent in preview; the UI copes. */
export const mapsEmbedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY ?? "";
export const hasMapsEmbedKey = mapsEmbedKey.length > 0;

/** The label Google shows while resolving the ID. Never the sole identifier. */
const placeLabel = (location: Location) => `${location.name}, ${location.areaLabel}`;

/**
 * The branch's listing on Google. Uses the exact short link the clinic
 * supplied, which was resolved and matched against this branch's Place ID.
 */
export function placeUrl(location: Location): string {
  return location.googleShortUrl;
}

/**
 * The same listing, built from the Place ID rather than a short link. Used
 * where we want the destination to be self-evidently this branch and not a
 * redirect somebody has to trust.
 */
export function placeUrlFromId(location: Location): string {
  const params = new URLSearchParams({
    api: "1",
    query: placeLabel(location),
    query_place_id: location.googlePlaceId,
  });
  return `${MAPS_URL_API}/search/?${params}`;
}

/** Turn-by-turn directions to this exact listing, from wherever the user is. */
export function directionsUrl(location: Location): string {
  const params = new URLSearchParams({
    api: "1",
    destination: placeLabel(location),
    destination_place_id: location.googlePlaceId,
  });
  return `${MAPS_URL_API}/dir/?${params}`;
}

/** Google's own review composer for this listing. */
export function writeReviewUrl(location: Location): string {
  return `https://search.google.com/local/writereview?placeid=${location.googlePlaceId}`;
}

/**
 * Embed source for this branch, or null when no key is configured.
 *
 * Returning null rather than a text-search fallback is deliberate: the whole
 * point of this module is that an inexact map is not acceptable.
 */
export function embedSrc(location: Location): string | null {
  if (!hasMapsEmbedKey) return null;
  const params = new URLSearchParams({
    key: mapsEmbedKey,
    q: `place_id:${location.googlePlaceId}`,
    zoom: "16",
  });
  return `https://www.google.com/maps/embed/v1/place?${params}`;
}
