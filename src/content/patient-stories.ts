/**
 * Patient testimonials and video stories.
 *
 * IMPORTANT: these are clinic testimonials, which are a different thing from
 * Google reviews. Google reviews are independent and live on Google; they are
 * handled per branch in `site.ts`. Nothing here may be invented: no made-up
 * patient names, no written-for-us quotes, no stock faces.
 *
 * Until the clinic supplies consented material, both arrays stay empty and the
 * UI renders finished placeholder tiles that say exactly what is needed.
 * See docs/CLINIC-CONTENT-NEEDED.md.
 */

export type PatientStory = {
  id: string;
  /** First name plus initial is usually the most a clinic should publish. */
  name: string;
  city?: string;
  country?: string;
  treatment: string;
  /** One or two lines for the card. */
  quote: string;
  /** Optional longer version for an expanded view. */
  fullQuote?: string;
  /** Path to a consented photo. Omit rather than substituting a stock image. */
  image?: string;
  doctorSlug?: string;
  branchSlug?: string;
  /** Written patient consent must be on file before anything renders. */
  consentConfirmed: true;
};

export type VideoStory = {
  id: string;
  patientName: string;
  treatment: string;
  language: "Gujarati" | "Hindi" | "English";
  /** Duration as displayed, e.g. "1:24". */
  duration?: string;
  thumbnail: string;
  /** YouTube or hosted URL. Opened on click; never autoplayed. */
  videoUrl: string;
  captionsAvailable: boolean;
  consentConfirmed: true;
};

/**
 * TODO(clinic): add consented written testimonials.
 * Needed per story: patient first name, city, treatment, the quote in their
 * own words, and written consent.
 */
export const patientStories: PatientStory[] = [];

/**
 * TODO(clinic): add consented video testimonials.
 * Needed per video: the file or YouTube link, patient first name, treatment,
 * spoken language, and written consent. Gujarati videos are the most useful
 * for Surat patients.
 */
export const videoStories: VideoStory[] = [];

/** How many placeholder tiles to show while the real material is pending. */
export const PENDING_STORY_TILES = 3;
export const PENDING_VIDEO_TILES = 3;

/** Languages we want represented once videos exist. */
export const videoLanguagePlan = ["Gujarati", "Hindi", "English"] as const;
