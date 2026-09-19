/**
 * The three marketing ids, and the one host they are allowed to fire on.
 *
 * WHY THESE ARE NOT ENVIRONMENT VARIABLES.
 *
 * They were, for about an hour, supplied by the production deploy workflow.
 * The deploy reported success and the tags were still missing: the shipped
 * client chunk contained
 *
 *     var e = {}.NEXT_PUBLIC_META_PIXEL_ID ?? ``
 *
 * `process.env` had been compiled to an empty object rather than the value
 * being inlined, so every id came out as "". The same build inlined them
 * correctly on a local machine, which is the worst kind of difference: the
 * check passes where you are looking and fails where it matters. It also
 * explains why GTM-MDNBGRX never loaded once in the container's life, and
 * why Google kept reporting "tag not detected".
 *
 * A GTM container id, a GA4 measurement id and a Meta Pixel id are all
 * served in the HTML of every page that uses them. There is no secret here
 * to protect, so there is nothing to buy by threading them through a build
 * step that has already dropped them once. They are constants.
 *
 * PREVIEW ISOLATION IS NOW A RUNTIME CHECK, which is stricter than the
 * build-time one it replaces. Nothing fires unless the page is actually on
 * the clinic's domain, so preview deploys, the workers.dev URLs and
 * localhost are all excluded by the same rule, and it cannot be defeated by
 * a bundler deciding not to inline something.
 */

export const GTM_ID = "GTM-MDNBGRX";
export const GA4_ID = "G-2WFM87BNQ1";
export const META_PIXEL_ID = "1055188140670527";

/** The only host the clinic's real properties should ever hear from. */
export const PRODUCTION_HOST = "www.khenidentalcare.com";

/**
 * Client-side only. On the server this returns false, because a prerendered
 * page is served to every host and cannot know which one it will land on.
 * Every caller therefore decides in the browser.
 */
export function trackingAllowedHere() {
  if (typeof window === "undefined") return false;
  return window.location.hostname === PRODUCTION_HOST;
}
