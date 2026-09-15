/**
 * PLACEHOLDER CONTENT. NOT FACTS ABOUT KHENI DENTAL.
 *
 * Everything in this file is written so the site reads as a finished page
 * while the clinic's real material is still coming. It renders with no
 * visible marker, by the owner's instruction, so the layout can be judged on
 * its own terms. That makes this file the only place the distinction is
 * recorded, so two things protect it:
 *
 *   1. Every item carries `status: "review_sample"`.
 *   2. `src/content/__checks__/content-integrity.check.ts` fails the build if
 *      NEXT_PUBLIC_ALLOW_INDEXING (or NEXT_PUBLIC_PRODUCTION) is "true" while
 *      anything here still exists. The site cannot be indexed until the
 *      clinic's own content has replaced it, item by item.
 *
 * Every entry is listed in docs/CLINIC-FORM-IMPLEMENTATION.md, Part 5, with
 * the clinic-form page it is standing in for.
 *
 * Rules that still hold, because breaking them causes real harm rather than
 * an unfinished-looking page:
 *   - No clinical photographs are invented. Before and after frames stay
 *     designed graphics, never a mouth.
 *   - No portrait is generated for a named dentist. The monogram frame holds
 *     the slot until a real photograph arrives.
 *   - No awards, press coverage, ratings or named institutions are invented.
 *   - Nothing here contradicts an answer the clinic actually gave, and
 *     anything the clinic ticked "Do not show" stays out.
 *
 * Replacing an item: the clinic sends the real one, it moves to its own
 * content file with the right provenance, and the entry here is deleted.
 */

import type { Hue } from "@/content/site";

export const SAMPLE = "review_sample" as const;

export type SampleBio = { doctorSlug: string; bio: string; status: typeof SAMPLE };

/**
 * Bios. The form left Dr. Mayur's and Dr. Parita's blank (p18, p27), gave no
 * bio for Dr. Jinali, and ticked "Do not show" for Dr. Ishita's (p24), whose
 * entry in site.ts is a factual description instead. These are written from
 * the degrees, years, treatments and branches the clinic did confirm.
 */
export const sampleBios: SampleBio[] = [
  {
    doctorSlug: "dr-mayur-kheni",
    status: SAMPLE,
    bio:
      "Dr. Mayur Kheni started Kheni Dental at Yogi Chowk in 2012 and has spent the fifteen years since on the work most dentists refer out: implants, full arches and mouths where several things have gone wrong at once. Patients usually reach him after living with something for years, a gap they stopped chewing on or a denture that never sat right. He takes the examination slowly, shows people what he is looking at, and will say when waiting is the better answer.",
  },
  {
    doctorSlug: "dr-jinali-monpara",
    status: SAMPLE,
    bio:
      "Dr. Jinali Monpara has ten years in practice and works across both clinics on smile design, whitening, crowns and full mouth cases, as well as seeing children. Most people come to her about one thing they keep noticing in photographs: a chipped edge, a shade that no longer matches, a tooth sitting slightly behind its neighbour. She is careful about scale, and will often talk a patient down to the smaller treatment when it gets them the same result.",
  },
  {
    doctorSlug: "dr-parita-vastarpara",
    status: SAMPLE,
    bio:
      "Dr. Parita Vastarpara is a dental surgeon with four years in practice, seeing patients at both clinics for the everyday work: cleaning and preventive care, fillings, crowns and root canal treatment. A good share of her day is people who have not been to a dentist in years and are braced for a lecture. They do not get one. She tells them what she can see, what needs doing now and what can safely wait.",
  },
];

export type EditorialLine = { doctorSlug: string; line: string; highlight: string; status: typeof SAMPLE | "clinic_supplied"; source?: string };

/**
 * Lines set large on doctor pages. Written in the site's voice, never
 * presented as something the dentist said. Dr. Jinali's comes from her own
 * words on form p21 ("from consultation to new teeth").
 */
export const editorialLines: EditorialLine[] = [
  { doctorSlug: "dr-mayur-kheni", line: "You should be able to explain your own treatment plan to someone at home.", highlight: "explain", status: SAMPLE },
  { doctorSlug: "dr-jinali-monpara", line: "From consultation to new teeth, one conversation at a time.", highlight: "new teeth", status: "clinic_supplied", source: "form p21" },
  { doctorSlug: "dr-ishita-dobariya", line: "A child who is not frightened this time sits down more easily next time.", highlight: "next time", status: SAMPLE },
  { doctorSlug: "dr-parita-vastarpara", line: "Most people are not avoiding the dentist. They are avoiding not knowing.", highlight: "not knowing", status: SAMPLE },
];

export type SampleTestimonial = {
  id: string;
  name: string;
  area: string;
  treatment: string;
  quote: string;
  status: typeof SAMPLE;
};

/**
 * Written testimonials. Form p6 ticked "replace with real written
 * testimonials", so the layout stays and these hold it. Written as a patient
 * would speak, with no claim the clinic has not made elsewhere: no promises
 * of painlessness, no guaranteed outcomes, no prices.
 *
 * These are invented people. They are replaced one card at a time as the
 * clinic sends real, consented testimonials.
 */
export const sampleTestimonials: SampleTestimonial[] = [
  {
    id: "sample-1",
    name: "Hiren P.",
    area: "Yogi Chowk",
    treatment: "Dental implant",
    status: SAMPLE,
    quote:
      "I had been chewing on one side for nearly three years and had convinced myself it was too late to do anything. Dr. Mayur took the X-ray and explained the bone situation before he suggested anything. The whole thing took a few months, but at every visit I knew what was happening next.",
  },
  {
    id: "sample-2",
    name: "Dipti S.",
    area: "Varachha",
    treatment: "Root canal treatment",
    status: SAMPLE,
    quote:
      "I came in at nine in the morning because the tooth had kept me up all night. They saw me the same day. It took two sittings rather than one, which they told me at the start, and the ache was gone after the first.",
  },
  {
    id: "sample-3",
    name: "Nilesh D.",
    area: "Nana Varachha",
    treatment: "Child's first visit",
    status: SAMPLE,
    quote:
      "My daughter is six and had a bad time at another clinic, so she would not open her mouth. Dr. Ishita let her sit in the chair and hold the little mirror and that was the whole first appointment. The second visit she let them count her teeth.",
  },
  {
    id: "sample-4",
    name: "Rakesh M.",
    area: "Hirabaug",
    treatment: "Full mouth rehabilitation",
    status: SAMPLE,
    quote:
      "There were about eight things wrong and I did not know where to begin. They put it in order, told me what had to be done first and what could wait a year, and I agreed to it one stage at a time. That is the part I appreciated.",
  },
  {
    id: "sample-5",
    name: "Ankita J.",
    area: "Katargam",
    treatment: "Smile design",
    status: SAMPLE,
    quote:
      "I went in asking for veneers on six teeth. Dr. Jinali showed me that two of them only needed a bit of bonding and reshaping, and talked me out of the rest. It cost me less and looks like my own teeth, which is what I actually wanted.",
  },
  {
    id: "sample-6",
    name: "Bhavesh T.",
    area: "London, UK",
    treatment: "Implants during a visit to Surat",
    status: SAMPLE,
    quote:
      "I messaged from London with my travel dates before booking flights. They were straight about what could be started on that trip and what would need a second one, so I planned around it instead of being surprised.",
  },
];

export type SampleCase = {
  id: string;
  category: string;
  treatment: string;
  concern: string;
  result: string;
  doctor: string;
  branch: string;
  timeline: string;
  visits: string;
  hue: Hue;
  status: typeof SAMPLE;
};

/**
 * Before and after cases. Form p34 and p51 were left blank.
 *
 * The case FACTS below are placeholder. The IMAGES are not faked: the slider
 * runs on designed graphics rather than an invented mouth, because a
 * fabricated clinical photograph is evidence, not decoration, and there is no
 * safe version of one. Real consented photographs drop into the same frames.
 */
export const sampleCases: SampleCase[] = [
  {
    id: "sample-case-1",
    category: "Dental Implants",
    treatment: "Single implant, lower right",
    concern: "One missing back tooth, chewing on the other side for two years",
    result: "Implant placed and a zirconia crown fitted once it had settled",
    doctor: "Dr. Mayur Kheni",
    branch: "Hirabaug",
    timeline: "5 months from placement to final crown",
    visits: "4 visits",
    hue: "gold",
    status: SAMPLE,
  },
  {
    id: "sample-case-2",
    category: "Smile Design",
    treatment: "Composite bonding and whitening, upper front teeth",
    concern: "A chipped front edge and a shade that no longer matched",
    result: "Edges rebuilt with composite after whitening, no crowns needed",
    doctor: "Dr. Jinali Monpara",
    branch: "Yogi Chowk",
    timeline: "3 weeks",
    visits: "3 visits",
    hue: "coral",
    status: SAMPLE,
  },
  {
    id: "sample-case-3",
    category: "Full Mouth Rehabilitation",
    treatment: "Staged rehabilitation, both arches",
    concern: "Several worn and broken teeth, and a bite that had changed",
    result: "Gum treatment first, then crowns and two implants, built in stages",
    doctor: "Dr. Mayur Kheni and Dr. Jinali Monpara",
    branch: "Hirabaug",
    timeline: "11 months",
    visits: "9 visits",
    hue: "navy",
    status: SAMPLE,
  },
  {
    id: "sample-case-4",
    category: "Braces & Aligners",
    treatment: "Clear aligners, upper and lower",
    concern: "Crowded lower front teeth and a gap that had opened up top",
    result: "Alignment completed, retainers fitted to hold the result",
    doctor: "Orthodontic care team",
    branch: "Yogi Chowk",
    timeline: "14 months",
    visits: "Reviews every 6 to 8 weeks",
    hue: "violet",
    status: SAMPLE,
  },
];

export type SampleStep = { title: string; copy: string };

/**
 * NRI planning workflow. Form p55 ticked nothing, so these are the steps the
 * clinic can confirm one by one. Deliberately nothing about airport pickup,
 * hotels, visa letters or round-the-clock support.
 */
export const sampleNriWorkflow: { status: typeof SAMPLE; steps: SampleStep[] } = {
  status: SAMPLE,
  steps: [
    { title: "Message us first", copy: "Send your travel dates and what you would like looked at on WhatsApp, before you book flights if you can." },
    { title: "Share X-rays or reports", copy: "If you have recent ones, send them so the dentist can see what is realistic. The plan is still confirmed by an examination here." },
    { title: "Discuss the schedule", copy: "What can be done on this trip, what needs healing time in between, and how many visits to expect." },
    { title: "Reserve your visits", copy: "Appointments are grouped around your arrival so you are not travelling back and forth across the city." },
    { title: "Follow-up at home", copy: "You leave with written instructions and a number. Questions after you fly back come by WhatsApp." },
  ],
};

export type SampleGuide = { id: string; status: typeof SAMPLE; points: string[] };

/**
 * Aftercare and preparation guides.
 *
 * Two topics were approved on form p58 (extraction, after implant placement)
 * and the rest were listed as pending in patient-resources.ts. All are filled
 * here with careful general wording so the resources page reads complete.
 * Every one is replaced by the clinic's own instruction sheet, which is what
 * the team actually hands a patient in the chair.
 */
export const sampleGuides: SampleGuide[] = [
  {
    id: "after-extraction",
    status: SAMPLE,
    points: [
      "Bite gently on the gauze for as long as you were told, then leave the area alone. No hard rinsing, no spitting, no straws and no smoking for the first day, because all four can disturb the clot that is doing the healing.",
      "Eat soft, cool food on the other side. Some swelling and discomfort over the first few days is expected. Take any medicine exactly as it was prescribed rather than waiting for the pain to build.",
      "Call the clinic if the bleeding does not settle, if the pain gets worse after the second day instead of easing, or if you notice a bad taste, a fever or swelling that is spreading.",
    ],
  },
  {
    id: "after-implant",
    status: SAMPLE,
    points: [
      "Expect swelling and soreness for a few days, often at its worst around day two. A cold compress against the outside of the face in the first day, and a soft diet, make the most difference.",
      "Keep the area clean exactly as you were shown, without brushing directly over the surgical site until the dentist tells you to start. Plaque around a healing implant is the thing to avoid.",
      "Do not chew hard food on that side while the implant is bonding with the bone, and keep every review appointment. The healing is checked at each one, and that is how a problem gets caught early.",
    ],
  },
  {
    id: "after-scaling",
    status: SAMPLE,
    points: [
      "Teeth often feel more sensitive to cold for a few days after a cleaning. That is the surface being exposed again rather than anything going wrong, and it usually settles within a week or two.",
      "Gums may be tender and may bleed a little when you brush for the first few days. Keep brushing gently rather than avoiding the area, because that is what settles it.",
      "A desensitising toothpaste helps if cold is bothering you. If sensitivity is still there after two weeks, tell us at your next visit so it can be looked at.",
    ],
  },
  {
    id: "after-crown",
    status: SAMPLE,
    points: [
      "A temporary crown is held on lightly so it can be removed later. Avoid sticky and very hard food on that side, and when you clean between the teeth, pull the floss out sideways rather than up.",
      "Some sensitivity to hot and cold after the final crown is fitted is common and usually fades. Gums around a new crown can be tender for a few days.",
      "If the bite feels high, if something catches when you close, or if a temporary comes off, call the clinic. An adjustment takes a few minutes and is much easier than living with it.",
    ],
  },
  {
    id: "implant-cleaning",
    status: SAMPLE,
    points: [
      "An implant cannot decay, but the gum and bone holding it can become inflamed, and that is what loses implants. Daily cleaning is the whole job.",
      "Brush twice a day, angled at the gum line around the implant, and clean between the teeth once a day. Interdental brushes usually reach around an implant better than floss does.",
      "A water flosser can help around bridges and full-arch work where a brush does not reach. Ask the team to show you on your own mouth rather than guessing from a video.",
    ],
  },
  {
    id: "implant-maintenance",
    status: SAMPLE,
    points: [
      "Plan on a review and professional clean every six months, or more often if your dentist advises it after looking at your gums.",
      "A maintenance visit checks the gum around each implant, how firmly everything is held, how the bite lands on it, and whether the cleaning routine is reaching everywhere.",
      "Tell the dentist if the gum bleeds around the implant, if food starts packing in a spot that used to be fine, or if anything feels loose. Early is the whole point.",
    ],
  },
  {
    id: "dental-anxiety",
    status: SAMPLE,
    points: [
      "Say it when you book. A nervous patient is common, and knowing in advance changes how the first appointment is run: a quieter slot, more time, and nothing started before you are ready.",
      "The first visit can be a conversation and an examination, with nothing treated at all. Plenty of people need to see the room and meet the dentist before they can agree to anything.",
      "Agree a signal before treatment starts, such as raising your hand, and it stops. Ask what each step will feel like beforehand, because most of the fear is not knowing what is coming.",
    ],
  },
  {
    id: "kids-brushing",
    status: SAMPLE,
    points: [
      "Start as soon as the first tooth appears, with a smear of fluoride toothpaste the size of a grain of rice. Under threes need it that small because they swallow most of it.",
      "From three to six, a pea-sized amount, and an adult still doing or finishing the brushing. Most children do not have the hand control to clean properly until around seven or eight.",
      "Brush last thing at night and one other time. Encourage spitting rather than rinsing with water, so a little fluoride stays on the teeth, and keep sweet things to mealtimes rather than through the day.",
    ],
  },
  {
    id: "braces-cleaning",
    status: SAMPLE,
    points: [
      "Braces trap food in places a normal brush misses. Brush after every meal, at an angle above and below each bracket rather than straight on, and take longer over it than you think you need.",
      "Keep an interdental brush and a small travel toothbrush in your bag. The spots that cause trouble are behind the wire and along the gum line, and they are where marks appear if they are missed.",
      "Avoid very hard and sticky food, which breaks brackets and costs you an extra appointment. If a bracket comes loose or a wire starts digging in, call rather than waiting for the next review.",
    ],
  },
  {
    id: "aligner-care",
    status: SAMPLE,
    points: [
      "Aligners only work while they are in. Aim for 20 to 22 hours a day, out for meals and drinks other than water, and back in straight afterwards.",
      "Rinse them in cool water and clean them gently. Hot water warps the plastic and ruins the fit, so no boiling and nothing left on a dashboard.",
      "If a tray is lost or cracked, go back to the previous one and call the clinic the same day. Do not skip ahead to the next tray on your own.",
    ],
  },
  {
    id: "retainer-care",
    status: SAMPLE,
    points: [
      "Retainers are not the end of treatment, they are what keeps it. Teeth drift back towards where they started for years afterwards, and a retainer is the only thing stopping that.",
      "Wear yours exactly as instructed, usually full time at first and then nights, often indefinitely. Clean it with cool water and a soft brush, and keep it in its case rather than a napkin.",
      "If it stops fitting, feels tight or breaks, call the clinic. A retainer that does not fit is teeth that have already moved, and it is much easier to deal with early.",
    ],
  },
  {
    id: "out-of-hours",
    status: SAMPLE,
    points: [
      "Both clinics are open Monday to Saturday, 9:30 AM to 1:00 PM and 4:00 PM to 8:00 PM. A message sent on WhatsApp outside those hours is answered when the clinic next opens.",
      "For pain overnight, take the painkiller you would normally take, keep the area clean, avoid very hot and very cold food, and sleep with your head slightly raised if the tooth is throbbing.",
      "Swelling that is spreading towards the eye or the neck, trouble swallowing or breathing, or a jaw you cannot open needs a hospital emergency department the same night, not a wait for the clinic to open.",
    ],
  },
];

/** Every placeholder collection, for the integrity guard. */
export const reviewSampleInventory = {
  sampleBios,
  editorialLines: editorialLines.filter((l) => l.status === SAMPLE),
  sampleTestimonials,
  sampleCases,
  sampleNriWorkflow,
  sampleGuides,
};

export const reviewSampleCount = Object.values(reviewSampleInventory).reduce((n, v) => n + (Array.isArray(v) ? v.length : 1), 0);
