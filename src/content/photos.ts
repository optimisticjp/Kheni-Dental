/**
 * Photography, in one place.
 *
 * Every image slot on the site resolves through here, so a replacement is a
 * one-line edit rather than a hunt through nine page files. Each entry
 * carries its own alt text and, where the crop matters, an object position.
 *
 * `objectPosition` is the important field. Sources are 3:2 or 2:3 and the
 * frames they land in are 16:10, 4:3, 4:5, 1:1 and more, so the browser
 * always throws away a third of the picture. Left at "center" a portrait
 * loses the top of the head. The percentages below keep the subject where
 * it belongs at every breakpoint.
 *
 * WHAT IS AND IS NOT HERE
 * Only two kinds of picture are wired in: object and interior photography
 * (an implant, an aligner, a tray of crowns, a treatment room), and the
 * clinic's own Instagram frames listed in `instagram.ts`, which are the only
 * real people on the site today. No generated face is attached to a named
 * dentist and no generated "patient" appears anywhere.
 *
 * Alt text describes what is in the picture, for someone who cannot see it.
 * It does not repeat the heading next to it and it does not sell.
 */

import { instagramReels } from "@/content/instagram";

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position. Defaults to "center" where the crop is forgiving. */
  objectPosition?: string;
};

export const ogImage = "/brand/og-card.jpg";

/**
 * Doctor portraits, keyed by slug. Empty until the clinic sends real
 * photographs: no generated face is ever attached to a named dentist. A
 * doctor without a portrait renders as a designed monogram field, and the
 * layouts are built to look finished that way. Portrait 4:5, head and
 * shoulders, plain background. Add the file under public/images/doctors/,
 * fill the slot, and run `node scripts/resize-images.mjs`.
 */
export const doctorPhotos: Record<string, Photo> = {};

/**
 * Treatment photography, keyed by slug. Each one is used twice: the poster on
 * the treatments index at 16:10, and the hero of that treatment's own page at
 * 4:3. One file covers both.
 *
 * Objects only. Treatments without an object photograph borrow a real
 * Instagram frame of the clinic at work (see `treatmentVisual`) or fall
 * back to their illustration.
 */
export const treatmentPhotos: Record<string, Photo> = {
  "dental-implants-surat": {
    src: "/images/treatments/dental-implants-surat.jpg",
    alt: "A single titanium dental implant and a white ceramic crown standing upright on a pale surface",
  },
  "braces-clear-aligners": {
    src: "/images/treatments/braces-clear-aligners.jpg",
    alt: "A clear dental aligner held up to a window so light passes through it",
  },
  "crowns-and-bridges": {
    src: "/images/treatments/crowns-and-bridges.jpg",
    alt: "Ceramic dental crowns arranged on a laboratory tray beside a shade guide",
  },
  "gum-care-surat": {
    src: "/images/treatments/gum-care-surat.jpg",
    alt: "A soft bristled toothbrush head against a fresh green leaf in morning light",
  },
  "wisdom-tooth-oral-surgery": {
    src: "/images/treatments/wisdom-tooth-oral-surgery.jpg",
    alt: "A cup of chai and a folded blanket on a sofa arm in afternoon light",
  },
  "dental-check-up-surat": {
    src: "/images/treatments/dental-check-up-surat.jpg",
    alt: "A dental mirror and probe laid on a folded white cloth on a tray, seen from above",
  },
  "tooth-fillings-surat": {
    src: "/images/treatments/tooth-fillings-surat.jpg",
    alt: "A tooth coloured shade guide fanned out from white to warm ivory",
  },
};

/** Clinic interiors, keyed by branch slug. Three each, all square frames. */
export const locationPhotos: Record<string, Photo[]> = {
  hirabaug: [
    { src: "/images/locations/hirabaug-1.jpg", alt: "A treatment room at Hirabaug: a blue and white chair, a wall screen and a tall window" },
    { src: "/images/locations/hirabaug-2.jpg", alt: "Sterilised instrument pouches lined up in a cabinet" },
    { src: "/images/locations/hirabaug-3.jpg", alt: "The reception counter with a small vase of marigolds" },
  ],
  "swastik-plaza": [
    { src: "/images/locations/swastik-plaza-1.jpg", alt: "A family treatment room at Yogi Chowk with a teal and white chair beside a window" },
    { src: "/images/locations/swastik-plaza-2.jpg", alt: "The waiting area at Yogi Chowk: teal chairs, a low table and a plant" },
    { src: "/images/locations/swastik-plaza-3.jpg", alt: "A child height hand basin with a step stool and a green towel" },
  ],
};

export const internationalPhoto: Photo = {
  src: "/images/international/plan-your-visit.jpg",
  alt: "An open passport, a boarding pass and a phone laid out on a wooden table",
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
  if (reel?.poster) return { src: reel.poster, alt: reel.posterAlt ?? reel.title, objectPosition: reel.objectPosition };
  return undefined;
}

/** The clinic's own frame of a doctor at the consultation desk, for the About page. */
export const aboutPhoto: Photo | undefined = (() => {
  const reel = instagramReels.find((r) => r.id === "consultation-desk");
  return reel?.poster ? { src: reel.poster, alt: reel.posterAlt ?? reel.title, objectPosition: reel.objectPosition } : undefined;
})();
