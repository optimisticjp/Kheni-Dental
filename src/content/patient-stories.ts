/**
 * Patient stories and video testimonials supplied by the clinic.
 *
 * These are different from Google reviews (independent, live on Google, per
 * branch in `site.ts`) and from the clinic's own YouTube Shorts (`videos.ts`).
 *
 * Nothing here may be invented: no made-up names, no written-for-us quotes,
 * no stock faces. Both lists stay empty until the clinic supplies consented
 * material, and the components that read them render nothing meanwhile.
 */

export type PatientStory = {
  id: string;
  /** First name plus initial is usually the most a clinic should publish. */
  name: string;
  city?: string;
  country?: string;
  treatment: string;
  /** In the patient's own words. */
  quote: string;
  doctorSlug?: string;
  branchSlug?: string;
  /** Written patient consent on file. */
  consentConfirmed: true;
};

export type VideoStory = {
  id: string;
  patientName: string;
  treatment: string;
  language: "Gujarati" | "Hindi" | "English";
  /** YouTube video id. Loaded only after a tap. */
  youtubeId: string;
  consentConfirmed: true;
};

/** TODO(clinic): consented written testimonials. Empty by design. */
export const patientStories: PatientStory[] = [];

/** TODO(clinic): consented video testimonials. Empty by design. */
export const videoStories: VideoStory[] = [];
