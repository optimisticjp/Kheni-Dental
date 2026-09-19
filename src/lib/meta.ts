/**
 * Supplied by the production deploy workflow only.
 *
 * It was hardcoded here at first, which meant every `claude/**` preview
 * build fired PageView and Contact at the clinic's live pixel. That is
 * worse than it sounds once ads are running: preview traffic lands in the
 * same conversion data and the same audiences the campaigns optimise
 * against, and there is no way to separate it out afterwards.
 *
 * Empty means the pixel does not load at all, which is what a preview
 * should do. It is not a secret either way; a pixel id is served in the
 * HTML of every page that uses it.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const META_CONTACT_EVENTS: ReadonlySet<string> = new Set([
  "whatsapp_click",
  "phone_click",
  "appointment_submit",
]);

export type MetaFbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: MetaFbq;
  disablePushState?: boolean;
};

declare global {
  interface Window {
    fbq?: MetaFbq;
    _fbq?: MetaFbq;
  }
}
