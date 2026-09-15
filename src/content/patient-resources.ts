/**
 * Patient resources.
 *
 * Built as a clinic service rather than an SEO blog: the things a patient
 * needs the day before an appointment, the evening after one, or at eleven
 * at night when something does not feel right.
 *
 * TWO KINDS OF ENTRY
 *   published                          written and reviewed in this
 *                                      repository. Safe to show.
 *   published + source: review_sample  careful general wording holding the
 *                                      slot until the clinic sends the
 *                                      instruction sheet its team actually
 *                                      hands a patient in the chair. Listed
 *                                      in docs/CLINIC-FORM-IMPLEMENTATION.md
 *                                      and blocks an indexable build.
 *
 * Aftercare is the one place where general wording and the clinic's own
 * wording can genuinely differ, so every sample guide is replaced before
 * launch rather than left to stand.
 */

import { sampleGuides } from "@/content/review-sample";
import type { Hue } from "@/content/site";

export type Guide = {
  id: string;
  title: string;
  /** One line describing what the guide answers. */
  summary: string;
  /**
   * Set where the content is placeholder wording rather than the clinic's
   * own sheet. Blocks an indexable build until it is replaced.
   */
  source?: "review_sample";
} & (
  | { status: "published"; points: string[] }
  | { status: "pending"; needs: string }
);

export type ResourceCategory = {
  id: string;
  label: string;
  intro: string;
  hue: Hue;
  guides: Guide[];
};

/** Points for a guide whose wording is still placeholder. */
const samplePoints = (id: string) => sampleGuides.find((g) => g.id === id)?.points ?? [];

export const resourceCategories: ResourceCategory[] = [
  {
    id: "first-visit",
    label: "Before your visit",
    intro: "What to bring, what will happen, and how to make it easier if you are dreading it.",
    hue: "sky",
    guides: [
      {
        id: "first-visit-guide",
        title: "Before your first appointment",
        summary: "What to bring and the three details that speed up a diagnosis.",
        status: "published",
        points: [
          "Bring the names of any medicines you take, including anything for blood pressure, diabetes or blood thinning, and old X-rays or reports if you still have them.",
          "Say when the problem started, what makes it worse and whether it disturbs your sleep. Those three details narrow down the cause faster than anything else.",
          "Before you leave, ask what needs attention now, what can safely wait and what the alternatives are. Write the answers down while they are fresh.",
        ],
      },
      {
        id: "dental-anxiety",
        title: "If you are nervous about coming in",
        summary: "For patients who have been putting this off, sometimes for years.",
        status: "published",
        source: "review_sample",
        points: samplePoints("dental-anxiety"),
      },
    ],
  },
  {
    id: "aftercare",
    label: "After treatment",
    intro: "What to expect over the next few days, what helps, and when to pick up the phone.",
    hue: "teal",
    guides: [
      {
        id: "root-canal-aftercare",
        title: "After a root canal",
        summary: "How the tooth may feel, and the signs that mean you should call.",
        status: "published",
        points: [
          "The tooth can stay tender to bite on for some days, especially if it was painful before treatment. Chew on the other side until it settles and follow the instructions you were given.",
          "A treated tooth is not finished until it is properly rebuilt. Ask what your tooth needs next, whether that is a filling or a crown, and by when it should be done.",
          "Call the clinic if the pain is getting worse instead of easing, if the gum or face swells, or if anything feels different from what was explained to you.",
        ],
      },
      {
        id: "after-extraction",
        title: "After a tooth is removed",
        summary: "The first twenty-four hours, and what to avoid.",
        status: "published",
        source: "review_sample",
        points: samplePoints("after-extraction"),
      },
      {
        id: "after-scaling",
        title: "After cleaning and scaling",
        summary: "Why teeth can feel sensitive afterwards and how long it lasts.",
        status: "published",
        source: "review_sample",
        points: samplePoints("after-scaling"),
      },
      {
        id: "after-crown",
        title: "After a crown or bridge",
        summary: "Living with a temporary, and what to do if something feels high.",
        status: "published",
        source: "review_sample",
        points: samplePoints("after-crown"),
      },
    ],
  },
  {
    id: "implant-care",
    label: "Implant care",
    intro: "Implants do not decay, but the gum and bone holding them still need looking after.",
    hue: "gold",
    guides: [
      {
        id: "implant-guide",
        title: "Thinking about implants",
        summary: "The questions worth asking before you agree to anything.",
        status: "published",
        points: [
          "An implant has two halves: the part placed in the bone and the tooth fitted on top. Ask about both, and check that any two plans you compare cover the same stages.",
          "Ask how much time is expected between stages and what you will be wearing while you wait. That is the part most people want to know and least often think to ask.",
          "Ask what affects how long an implant lasts in your case. Bone, gum health, bite, smoking and grinding all play a part, and so does the cleaning routine you keep up at home.",
        ],
      },
      {
        id: "after-implant",
        title: "After implant placement",
        summary: "The first days after surgery, and what to avoid.",
        status: "published",
        source: "review_sample",
        points: samplePoints("after-implant"),
      },
      {
        id: "implant-cleaning",
        title: "Cleaning around an implant",
        summary: "The daily routine, and the tools that make it easier.",
        status: "published",
        source: "review_sample",
        points: samplePoints("implant-cleaning"),
      },
      {
        id: "implant-maintenance",
        title: "Long-term implant maintenance",
        summary: "How often to come back, and what gets checked.",
        status: "published",
        source: "review_sample",
        points: samplePoints("implant-maintenance"),
      },
    ],
  },
  {
    id: "kids",
    label: "Kids",
    intro: "First visits, brushing battles, and getting a child to sit down without a fight.",
    hue: "mint",
    guides: [
      {
        id: "kids-visit",
        title: "Bringing a child in",
        summary: "Small things at home that change how the appointment goes.",
        status: "published",
        points: [
          "Keep the build-up short and ordinary. Avoid words like injection, drill or pain, even in reassurance. Children latch on to the word and not the reassurance around it.",
          "Ask for a time when your child is usually rested and fed rather than the end of a long school day. A tired child finds everything harder.",
          "Tell the team beforehand if your child is frightened or had a rough time at another clinic. Knowing that in advance changes how the first few minutes are handled.",
        ],
      },
      {
        id: "kids-brushing",
        title: "Brushing guide by age",
        summary: "How much help a child needs, and until when.",
        status: "published",
        source: "review_sample",
        points: samplePoints("kids-brushing"),
      },
    ],
  },
  {
    id: "orthodontics",
    label: "Braces & aligners",
    intro: "Keeping teeth clean while they are moving, and keeping them where they end up.",
    hue: "violet",
    guides: [
      {
        id: "braces-cleaning",
        title: "Cleaning with braces on",
        summary: "The bits people miss, and what to keep in your bag.",
        status: "published",
        source: "review_sample",
        points: samplePoints("braces-cleaning"),
      },
      {
        id: "aligner-care",
        title: "Looking after aligners",
        summary: "Wear time, cleaning, and what to do if you lose one.",
        status: "published",
        source: "review_sample",
        points: samplePoints("aligner-care"),
      },
      {
        id: "retainer-care",
        title: "Retainers",
        summary: "The part that decides whether the result holds.",
        status: "published",
        source: "review_sample",
        points: samplePoints("retainer-care"),
      },
    ],
  },
  {
    id: "emergencies",
    label: "Dental emergencies",
    intro: "What counts as urgent, and what to do first.",
    hue: "coral",
    guides: [
      {
        id: "urgent-signs",
        title: "When to call the clinic straight away",
        summary: "Signs that should not wait for the next routine visit.",
        status: "published",
        points: [
          "Pain that is getting worse instead of easing, especially if it wakes you at night.",
          "Swelling of the gum, cheek or face, or swelling that is spreading towards the eye or neck.",
          "Bleeding that does not settle, a tooth that has been knocked out or loosened, or anything that feels different from what was explained to you.",
        ],
      },
      {
        id: "out-of-hours",
        title: "When the clinic is closed",
        summary: "Out-of-hours contact and what to do meanwhile.",
        status: "published",
        source: "review_sample",
        points: samplePoints("out-of-hours"),
      },
    ],
  },
];

/** Emergency triage lines, reused verbatim from the reviewed guide above. */
export const urgentSigns = [
  "Pain that is getting worse instead of easing",
  "Swelling of the gum, cheek or face",
  "Bleeding that does not settle",
  "A tooth knocked out or loosened",
] as const;
