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
 * A single value has to serve every frame a picture appears in. The doctor
 * portraits are the tightest case: one 2:3 source feeds a 16:10 frame on a
 * phone, a 4:3 card and a 4:5 frame on desktop. At 28% the phone crop
 * started at the eyebrows. 15% is the value that keeps the whole head in
 * all three, so that is what they use.
 *
 * Alt text describes what is in the picture, for someone who cannot see it.
 * It does not repeat the heading next to it and it does not sell.
 */

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position. Defaults to "center" where the crop is forgiving. */
  objectPosition?: string;
};

/** The homepage hero and the picture that appears when the site is shared. */
export const heroPhoto: Photo = {
  src: "/images/home/hero-dentist.jpg",
  alt: "A dentist seated beside a treatment chair, turning to a patient and pointing at a tablet as he explains something",
  // Four different frames across the two heroes, the widest being 16:9.
  // 18% keeps his head clear of the top edge in all of them.
  objectPosition: "center 18%",
};

export const ogImage = "/images/og-default.jpg";

/** Doctor portraits, keyed by slug. Frames are 4:5 and 1:1. */
export const doctorPhotos: Record<string, Photo> = {
  "dr-mayur-kheni": {
    src: "/images/doctors/dr-mayur-kheni.jpg",
    alt: "Dr. Mayur Kheni in a white clinical coat, standing in a treatment room",
    objectPosition: "center 15%",
  },
  "dr-jinal-monapara": {
    src: "/images/doctors/dr-jinal-monapara.jpg",
    alt: "Dr. Jinal Monapara in a white clinical coat, standing near a window",
    objectPosition: "center 15%",
  },
  "dr-ishita-dobariya": {
    src: "/images/doctors/dr-ishita-dobariya.jpg",
    alt: "Dr. Ishita Dobariya in a white clinical coat, in a bright treatment room",
    objectPosition: "center 15%",
  },
  "dr-parita-vastarpara": {
    src: "/images/doctors/dr-parita-vastarpara.jpg",
    alt: "Dr. Parita Vastarpara in a white clinical coat, in a bright treatment room",
    objectPosition: "center 15%",
  },
};

/**
 * Treatment photography, keyed by slug. Each one is used twice: the poster on
 * the treatments index at 16:10, and the hero of that treatment's own page at
 * 4:3. One file covers both.
 *
 * None of them is a mouth. They are the moment before or the moment after,
 * which is what a patient is actually deciding about.
 */
export const treatmentPhotos: Record<string, Photo> = {
  "dental-implants-surat": {
    src: "/images/treatments/dental-implants-surat.jpg",
    alt: "A single titanium dental implant and a white ceramic crown standing upright on a pale surface",
  },
  "root-canal-treatment-surat": {
    src: "/images/treatments/root-canal-treatment-surat.jpg",
    alt: "A woman asleep on her side in soft morning light, face relaxed",
    objectPosition: "center 40%",
  },
  "braces-clear-aligners": {
    src: "/images/treatments/braces-clear-aligners.jpg",
    alt: "A clear dental aligner held up to a window so light passes through it",
  },
  "cosmetic-smile-dentistry": {
    src: "/images/treatments/cosmetic-smile-dentistry.jpg",
    alt: "A woman caught mid laugh, head tilted back, eyes closed",
    objectPosition: "center 35%",
  },
  "full-mouth-rehabilitation": {
    src: "/images/treatments/full-mouth-rehabilitation.jpg",
    alt: "An older man at a kitchen counter biting into a whole apple in morning light",
    objectPosition: "center 38%",
  },
  "crowns-and-bridges": {
    src: "/images/treatments/crowns-and-bridges.jpg",
    alt: "Ceramic dental crowns arranged on a laboratory tray beside a shade guide",
  },
  "kids-dentistry-surat": {
    src: "/images/treatments/kids-dentistry-surat.jpg",
    alt: "A young boy in a dental chair holding a small round mirror up to his own face, laughing",
    objectPosition: "center 35%",
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
    { src: "/images/locations/hirabaug-1.jpg", alt: "The implant treatment room at Hirabaug: a blue and white chair, a wall screen and a tall window" },
    { src: "/images/locations/hirabaug-2.jpg", alt: "Sterilised instrument pouches lined up in a cabinet" },
    { src: "/images/locations/hirabaug-3.jpg", alt: "The reception counter with a small vase of marigolds" },
  ],
  "swastik-plaza": [
    { src: "/images/locations/swastik-plaza-1.jpg", alt: "A family treatment room at Yogi Chowk with a teal and white chair beside a window" },
    { src: "/images/locations/swastik-plaza-2.jpg", alt: "The waiting area at Yogi Chowk: teal chairs, a low table and a plant" },
    { src: "/images/locations/swastik-plaza-3.jpg", alt: "A child height hand basin with a step stool and a green towel" },
  ],
};

export const aboutPhoto: Photo = {
  src: "/images/about/team.jpg",
  alt: "Four dentists in white coats walking together along a bright clinic corridor, mid conversation",
  objectPosition: "center 40%",
};

export const internationalPhoto: Photo = {
  src: "/images/international/plan-your-visit.jpg",
  alt: "An open passport, a boarding pass and a phone laid out on a wooden table",
};

/**
 * Notable patient photography, keyed by the demo id.
 *
 * These belong to the demo layer: the people are fictional and so are the
 * quotes beside them. The pictures go with them when that layer is removed.
 */
export const notablePhotos: Record<string, Photo> = {
  n1: { src: "/images/notables/ravi-deshmukh.jpg", alt: "A singer at a studio microphone, headphones around his neck, mid note", objectPosition: "center 35%" },
  n2: { src: "/images/notables/kavya-trivedi.jpg", alt: "An actor in a makeup chair looking into a lit mirror", objectPosition: "center 35%" },
  n3: { src: "/images/notables/hardik-rathod.jpg", alt: "A cricketer in whites at practice nets, bat resting on his shoulder", objectPosition: "center 35%" },
  n4: { src: "/images/notables/meera-shah.jpg", alt: "A woman in a textile showroom resting one hand on a bolt of yellow silk", objectPosition: "center 35%" },
};
