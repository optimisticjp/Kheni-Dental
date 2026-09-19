export { META_PIXEL_ID } from "@/lib/tracking-ids";

/**
 * Which site events Meta hears about, and as which standard event.
 *
 * Standard events are what Meta's campaign optimisation can actually bid
 * towards. A custom event is only usable as an audience, so an appointment
 * request has to be `Lead` for a leads campaign to learn from it.
 *
 * `appointment_submit` is a real request: the visitor filled in their name,
 * number, clinic and preferred time. `Lead` is the honest label for that.
 * `whatsapp_click` and `phone_click` are intent, not a submitted request, so
 * they stay `Contact`.
 *
 * NOTHING ELSE IS SENT, AND NO PARAMETERS GO WITH IT. Which treatment page
 * someone read, which concern they picked and which doctor they looked at
 * all stay out of Meta, because those infer a health condition about a named
 * person. They are in GA4, which is the clinic's own analytics, and that is
 * where they belong. Do not add ViewContent with a treatment name here.
 */
export const META_STANDARD_EVENTS: Readonly<Record<string, string>> = {
  appointment_submit: "Lead",
  whatsapp_click: "Contact",
  phone_click: "Contact",
};

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
