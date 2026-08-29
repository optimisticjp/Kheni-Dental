import type { Location } from "@/content/site";

/**
 * Maps, split by job.
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
 * TWO PROVIDERS, ON PURPOSE
 *
 *   PICTURE   Bing's consumer map embed in aerial view, centred on the
 *             branch's own verified `coords`. Keyless, no billing account, no
 *             API key to leak or expire, and the view is placed by coordinate
 *             rather than by a search a provider might re-rank.
 *
 *   ACTIONS   Google Maps URLs API, built from `googlePlaceId`. Directions,
 *             the listing itself and the review composer all stay on Google,
 *             because that is where the clinic's reviews and turn-by-turn
 *             navigation actually live.
 *
 * Every function takes the whole `Location`, so there is no way to hand it a
 * name from one branch and an ID or a coordinate from another.
 */

const MAPS_URL_API = "https://www.google.com/maps";

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
 * The zoom the aerial view opens at, on Bing's 1-20 scale.
 *
 * Judged from real Surat imagery rather than picked. 17 shows about 400m and
 * the clinic block is too small to place; 19 is a rooftop with nothing around
 * it to navigate by. 18 shows roughly 200m: the junction, the building and
 * enough of the surrounding streets for a patient to recognise where they are
 * being asked to go.
 */
export const AERIAL_ZOOM = 18;

/**
 * The aerial photograph for this branch.
 *
 * Bing's consumer embed, documented at
 * https://learn.microsoft.com/en-us/bingmaps/articles/create-a-custom-map-url
 * (`cp` centre point, `lvl` 1-20 zoom, `sty` map view: `a` aerial, `h` aerial
 * with labels, `r` road). It needs no key, no account and no billing.
 *
 * WHY AERIAL AND NOT AERIAL-WITH-LABELS
 * `sty=h` was rendered at both clinics before choosing. Bing's label layer
 * puts other businesses' names across the imagery in its own type — at Yogi
 * Chowk that meant Vaghani Hospital, Jasoliya Orthopedic Hospital and Krishna
 * Jewellers set larger than anything of ours, and at Hirabaug, Sanskar
 * Children Hospital. A dental clinic's own page should not hand its map over
 * to a directory of nearby hospitals. Plain aerial keeps the photograph, and
 * the orientation labels do a better job underneath it as the branch name,
 * area and address the card already carries.
 *
 * WIDTH AND HEIGHT ARE NOT OPTIONAL
 * Bing sizes the map from `w` and `h`, not from the iframe it is rendered in.
 * Give it a size that does not match the frame and it draws the map at the
 * size it was told and leaves the rest of the frame white. So the frame is
 * measured and its real pixel size passed in; see `aerial-frame.tsx`.
 */
export function aerialEmbedSrc(location: Location, width: number, height: number): string {
  const { lat, lng } = location.coords;
  // Built by hand rather than with URLSearchParams, which would percent-encode
  // the tilde that separates Bing's latitude and longitude.
  return (
    "https://www.bing.com/maps/embed/?" +
    [
      `h=${Math.round(height)}`,
      `w=${Math.round(width)}`,
      `cp=${lat}~${lng}`,
      `lvl=${AERIAL_ZOOM}`,
      "typ=d",
      "sty=a",
      "src=SHELL",
      "FORM=MBEDV8",
    ].join("&")
  );
}
