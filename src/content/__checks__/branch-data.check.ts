import { locations } from "@/content/site";
import { aerialEmbedSrc, directionsUrl, placeUrl, placeUrlFromId, writeReviewUrl } from "@/lib/maps";

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

/** The pins the embedded map is drawn on, verified on 29 August 2026.
 *
 *  Taken from the `!8m2!3d<lat>!4d<lng>` place parameters of the canonical
 *  Google URL each clinic-supplied short link redirects to — not the
 *  `@lat,lng,zoom` camera in the same URL, which sits 3km west of the
 *  Hirabaug clinic. Cross-checked against OpenStreetMap, which independently
 *  places "Swastik plaza, Saavaliya circle, Yogi chowk" 33m from the first
 *  pin, and puts the second on the Varachha Main Road corridor 410m from
 *  "Hirabaug Health center".
 *
 *  Changing one of these means re-verifying it, not editing it in place. */
const KNOWN_COORDS: Record<string, { lat: number; lng: number }> = {
  "swastik-plaza": { lat: 21.2147921, lng: 72.8881639 },
  hirabaug: { lat: 21.2127579, lng: 72.8584163 },
};

/** Surat, generously bounded. A coordinate outside this is a typo or a swap. */
const SURAT_BOUNDS = { minLat: 21.0, maxLat: 21.4, minLng: 72.6, maxLng: 73.1 };

/** Metres between two points, near enough at city scale. */
function metresBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6_371_000;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

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

    // The map is drawn from coordinates now, so they are checked like an ID.
    const pin = KNOWN_COORDS[location.slug];
    if (!pin) fail(`unknown branch "${location.slug}" — add its verified coordinates to this check`);
    if (location.coords.lat !== pin.lat || location.coords.lng !== pin.lng) {
      fail(
        `${location.slug} coordinates changed to ${location.coords.lat},${location.coords.lng}. ` +
          `Re-verify against the Google listing before editing.`,
      );
    }
    const { lat, lng } = location.coords;
    if (lat < SURAT_BOUNDS.minLat || lat > SURAT_BOUNDS.maxLat || lng < SURAT_BOUNDS.minLng || lng > SURAT_BOUNDS.maxLng) {
      fail(`${location.slug} coordinates ${lat},${lng} are not in Surat — likely swapped or mistyped`);
    }

    // The aerial view must be centred on this branch's own pin. The marker is
    // drawn in the DOM at the centre of the frame, so a wrong centre here is a
    // marker pointing at the wrong building rather than a merely odd map.
    const embed = aerialEmbedSrc(location, 356, 270);
    if (!embed.includes(`cp=${lat}~${lng}`)) {
      fail(`${location.slug} aerial view is not centred on its own coordinates: ${embed}`);
    }
    if (!embed.includes("sty=a")) {
      fail(`${location.slug} aerial view is not in aerial style: ${embed}`);
    }
    for (const other of locations) {
      if (other.slug === location.slug) continue;
      if (embed.includes(`${other.coords.lat}`)) fail(`${location.slug} aerial view contains ${other.slug}'s latitude`);
      // Two clinics 3km apart must never resolve to overlapping map views.
      if (metresBetween(location.coords, other.coords) < 200) {
        fail(`${location.slug} and ${other.slug} are pinned within 200m of each other — one has inherited the other's map`);
      }
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
