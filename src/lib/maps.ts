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
 *   PICTURE   OpenStreetMap's embed, centred and marked on the branch's own
 *             verified `coords`. Keyless, no billing account, no API key to
 *             leak or expire, and the marker is placed by coordinate rather
 *             than by a search Google might re-rank.
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
 * How wide a view the map opens on, in metres.
 *
 * 460m is chosen, not default: OpenStreetMap's embed fits the box to the
 * frame and snaps to whole zoom levels, and this lands on zoom 16 in a phone
 * frame. That is the level where road names become legible, so the marker
 * arrives already surrounded by the junction a patient would navigate by
 * rather than floating on unlabelled grey.
 */
const MAP_SPAN_M = 460;

/** Metres per degree of latitude. Near enough constant everywhere. */
const M_PER_DEG_LAT = 110_574;
/** Metres per degree of longitude at the equator, narrowing towards the poles. */
const M_PER_DEG_LNG_EQUATOR = 111_320;

/**
 * The embedded map for this branch: OpenStreetMap, centred on the branch's
 * verified coordinates with a marker on the same point.
 *
 * The bounding box is built around those coordinates rather than passed as a
 * centre and a zoom, because that is the only input `export/embed.html`
 * takes. It is deliberately landscape (16:9) so a wide frame does not have to
 * zoom out to fit a square box. The marker sits at the exact centre of the
 * box either way, so however the frame's own aspect nudges the fit, the pin
 * is in the middle of the first paint.
 */
export function osmEmbedSrc(location: Location): string {
  const { lat, lng } = location.coords;

  const halfLat = MAP_SPAN_M * (9 / 16) * 0.5 / M_PER_DEG_LAT;
  const halfLng = (MAP_SPAN_M * 0.5) / (M_PER_DEG_LNG_EQUATOR * Math.cos((lat * Math.PI) / 180));

  const round = (n: number) => n.toFixed(6);
  const bbox = [round(lng - halfLng), round(lat - halfLat), round(lng + halfLng), round(lat + halfLat)].join(",");

  const params = new URLSearchParams({
    bbox,
    layer: "mapnik",
    marker: `${lat},${lng}`,
  });
  return `https://www.openstreetmap.org/export/embed.html?${params}`;
}
