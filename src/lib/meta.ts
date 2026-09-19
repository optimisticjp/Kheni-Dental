export const META_PIXEL_ID = "1055188140670527";

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
