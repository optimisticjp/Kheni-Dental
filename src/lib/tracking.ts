export type TrackingEventName =
  | "whatsapp_click"
  | "phone_click"
  | "appointment_start"
  | "appointment_submit"
  | "directions_click"
  | "doctor_profile_view"
  | "treatment_view"
  | "international_patient_contact"
  | "resource_download"
  | "review_click"
  | "problem_interaction"
  | "gallery_interaction"
  // Which of the two clinics a patient switched to in the locator. A branch
  // choice is a convenience preference, not health information.
  | "location_switch"
  // Implant experience. Section-level engagement only. The navigator event
  // never carries which situation was chosen, because that could describe the
  // visitor's own mouth. See TRACKING_PLAN.md.
  | "implant_navigator_interaction"
  | "implant_comparison_view"
  | "implant_section_navigation";

export type TrackingPayload = {
  event: TrackingEventName;
  placement?: string;
  interaction?: string;
  branch?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushTrackingEvent(payload: TrackingPayload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Keep marketing events generic. Do not send symptoms, diagnoses, form values,
  // medical history or other sensitive health information to analytics platforms.
  window.dataLayer.push(payload);
}
