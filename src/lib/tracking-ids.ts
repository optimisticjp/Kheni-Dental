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
 * explains why the first container never loaded once in its life, and why
 * Google kept reporting "tag not detected".
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

/**
 * Tag Manager account "Kheni Dental" (6377727735), container khenidental.com.
 * This replaced GTM-MDNBGRX, which lived in an account belonging to the
 * agency rather than to the clinic and has been deleted. The container the
 * clinic owns is the one that should be on the clinic's website.
 */
export const GTM_ID = "GTM-MGBFWXLV";

export const GA4_ID = "G-2WFM87BNQ1";

/** Google Ads. Conversion labels live in `ADS_CONVERSION_LABELS` below. */
export const GOOGLE_ADS_ID = "AW-11301338948";

export const META_PIXEL_ID = "1055188140670527";

/**
 * Google Ads conversion labels, keyed by the site event that should count as
 * that conversion.
 *
 * EMPTY UNTIL THE CONVERSION ACTIONS EXIST. A label is the second half of a
 * send_to value, the part after the slash in `AW-11301338948/AbC-D_efGh`.
 * Google generates it when a conversion action is created in the Ads account,
 * so it cannot be guessed or written ahead of time.
 *
 * To turn a conversion on: create the action in Google Ads (Goals,
 * Conversions, New conversion action, Website, set up manually), copy the
 * label out of the tag it shows you, and add a line here. Nothing else needs
 * to change. Until then the events still reach GA4, and Google Ads can count
 * them by importing the GA4 key events instead.
 *
 * Keys are TrackingEventName values. Deliberately kept to contact and
 * appointment events: which treatment a visitor read is not sent to an
 * advertising platform. See the note in `tracking.ts`.
 */
export const ADS_CONVERSION_LABELS: Readonly<Record<string, string>> = {
  // appointment_submit: "paste-the-label-here",
  // whatsapp_click: "paste-the-label-here",
  // phone_click: "paste-the-label-here",
};

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
