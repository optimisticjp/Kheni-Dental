/**
 * Photography, in one place.
 *
 * Every image slot on the site resolves through here, so a replacement is a
 * one-line edit rather than a hunt through nine page files. Each entry
 * carries its own alt text and, where the crop matters, an object position.
 *
 * WHAT IS AND IS NOT HERE
 * Only two kinds of picture are wired in:
 *   1. Object and interior photography (an implant, an aligner, a tray of
 *      crowns, a treatment room). Nothing in them is a person.
 *   2. The clinic's own Instagram frames, listed in `instagram.ts`, which
 *      are the only real people on the site today.
 *
 * No generated face is attached to a named dentist, and no generated
 * "patient" appears anywhere. A doctor without a real portrait renders as a
 * designed colour field with their initials, and the layout is built to
 * look finished that way. When the clinic's photographs arrive, add the
 * file under public/images/, fill the slot below, and run
 * `node scripts/resize-images.mjs`.
 */

import { instagramReels } from "@/content/instagram";

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position. Defaults to "center" where the crop is forgiving. */
  objectPosition?: string;
  /** Where the picture came from, so nobody wonders. */
  source?: "clinic" | "instagram" | "object";
};

/** The picture shown when the site is shared. Reception, nobody in frame. */
export const ogImage = "/images/og-default.jpg";

/**
 * Doctor portraits, keyed by slug. Empty until the clinic sends real
 * photographs. Portrait 4:5, head and shoulders, plain background.
 */
export const doctorPhotos: Record<string, Photo> = {};

/**
 * Treatment photography, keyed by slug. Objects only. Treatments without an
 * object photograph borrow a real Instagram frame of the clinic at work
 * (see `treatmentVisual` below) or fall back to their illustration.
 */
export const treatmentPhotos: Record<string, Photo> = {
  "dental-implants-surat": {
    src: "/images/treatments/dental-implants-surat.jpg",
    alt: "A single titanium dental implant and a white ceramic crown standing upright on a pale surface",
    source: "object",
  },
  "braces-clear-aligners": {
    src: "/images/treatments/braces-clear-aligners.jpg",
    alt: "A clear dental aligner held up to a window so light passes through it",
    source: "object",
  },
  "crowns-and-bridges": {
    src: "/images/treatments/crowns-and-bridges.jpg",
    alt: "Ceramic dental crowns arranged on a laboratory tray beside a shade guide",
    source: "object",
  },
  "gum-care-surat": {
    src: "/images/treatments/gum-care-surat.jpg",
    alt: "A soft bristled toothbrush head against a fresh green leaf in morning light",
    source: "object",
  },
  "wisdom-tooth-oral-surgery": {
    src: "/images/treatments/wisdom-tooth-oral-surgery.jpg",
    alt: "A cup of chai and a folded blanket on a sofa arm in afternoon light",
    source: "object",
  },
  "dental-check-up-surat": {
    src: "/images/treatments/dental-check-up-surat.jpg",
    alt: "A dental mirror and probe laid on a folded white cloth on a tray, seen from above",
    source: "object",
  },
  "tooth-fillings-surat": {
    src: "/images/treatments/tooth-fillings-surat.jpg",
    alt: "A tooth coloured shade guide fanned out from white to warm ivory",
    source: "object",
  },
};

/** A real Instagram frame for treatments that have no object photograph. */
const reelFrames: Record<string, string> = {
  "kids-dentistry-surat": "young-patient",
  "root-canal-treatment-surat": "close-work",
  "full-mouth-rehabilitation": "in-the-chair",
  "cosmetic-smile-dentistry": "consultation-desk",
};

/** The best real picture for a treatment: object photo, else a clinic frame, else none. */
export function treatmentVisual(slug: string): Photo | undefined {
  const photo = treatmentPhotos[slug];
  if (photo) return photo;
  const reel = instagramReels.find((r) => r.id === reelFrames[slug]);
  if (reel?.poster) return { src: reel.poster, alt: reel.posterAlt ?? reel.title, objectPosition: reel.objectPosition, source: "instagram" };
  return undefined;
}

/** Clinic interiors, keyed by branch slug. Three each, all square frames. */
export const locationPhotos: Record<string, Photo[]> = {
  hirabaug: [
    { src: "/images/locations/hirabaug-1.jpg", alt: "The implant treatment room at Hirabaug: a blue and white chair, a wall screen and a tall window", source: "object" },
    { src: "/images/locations/hirabaug-2.jpg", alt: "Sterilised instrument pouches lined up in a cabinet", source: "object" },
    { src: "/images/locations/hirabaug-3.jpg", alt: "The reception counter with a small vase of marigolds", source: "object" },
  ],
  "swastik-plaza": [
    { src: "/images/locations/swastik-plaza-1.jpg", alt: "A family treatment room at Yogi Chowk with a teal and white chair beside a window", source: "object" },
    { src: "/images/locations/swastik-plaza-2.jpg", alt: "The waiting area at Yogi Chowk: teal chairs, a low table and a plant", source: "object" },
    { src: "/images/locations/swastik-plaza-3.jpg", alt: "A child height hand basin with a step stool and a green towel", source: "object" },
  ],
};

export const internationalPhoto: Photo = {
  src: "/images/international/plan-your-visit.jpg",
  alt: "An open passport, a boarding pass and a phone laid out on a wooden table",
  source: "object",
};

/** A real clinic frame by reel id, for pages that want one specific picture. */
export function reelPhoto(reelId: string): Photo | undefined {
  const reel = instagramReels.find((r) => r.id === reelId);
  return reel?.poster ? { src: reel.poster, alt: reel.posterAlt ?? reel.title, objectPosition: reel.objectPosition, source: "instagram" } : undefined;
}
