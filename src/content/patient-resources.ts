/**
 * Patient resources.
 *
 * Built as a clinic service rather than an SEO blog: the things a patient
 * actually needs the day before an appointment, the evening after one, or at
 * eleven at night when something does not feel right.
 *
 * TWO KINDS OF ENTRY
 *   published  written and already reviewed in this repository. Safe to show.
 *   pending    the structure exists and the title is right, but the content is
 *              the clinic's own aftercare instruction and must come from the
 *              doctors. Nothing clinical is written on their behalf.
 *
 * Do not fill a pending guide in from general dental knowledge. Aftercare that
 * contradicts what a patient was told in the chair is worse than no page.
 */

export type Guide = {
  id: string;
  title: string;
  /** One line describing what the guide answers. Safe to write for any guide. */
  summary: string;
} & (
  | { status: "published"; points: string[] }
  | { status: "pending"; needs: string }
);

export type ResourceCategory = {
  id: string;
  label: string;
  /** What this whole group is for, in the patient's terms. */
  intro: string;
  guides: Guide[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    id: "first-visit",
    label: "Your first visit",
    intro: "What to bring, what will happen, and how to make it easier if you are dreading it.",
    guides: [
      {
        id: "first-visit",
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
        status: "pending",
        needs: "How the team actually handles a nervous adult: what you offer, what a patient can ask for, and what a first appointment looks like when someone is frightened.",
      },
    ],
  },
  {
    id: "aftercare",
    label: "After your treatment",
    intro: "What to expect over the next few days, what helps, and when to pick up the phone.",
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
        status: "pending",
        needs: "Your own post-extraction instruction sheet, exactly as the team gives it in the chair.",
      },
      {
        id: "after-scaling",
        title: "After cleaning and scaling",
        summary: "Why teeth can feel sensitive afterwards and how long it lasts.",
        status: "pending",
        needs: "Your standard post-scaling advice, including anything you recommend for sensitivity.",
      },
      {
        id: "after-crown",
        title: "After a crown or bridge",
        summary: "Living with a temporary, and what to do if something feels high.",
        status: "pending",
        needs: "What you tell patients about temporary crowns, biting, and when to come back for an adjustment.",
      },
      {
        id: "after-braces",
        title: "After a braces adjustment",
        summary: "The days when everything feels tight.",
        status: "pending",
        needs: "Your post-adjustment advice, plus what to do about a loose bracket or a poking wire.",
      },
      {
        id: "kids-aftercare",
        title: "Kids: after a treatment",
        summary: "What a parent should watch for, and what is normal.",
        status: "pending",
        needs: "Dr. Ishita's aftercare advice for parents, including numbness and biting the lip or cheek.",
      },
    ],
  },
  {
    id: "implant-care",
    label: "Living with implants",
    intro: "Implants do not decay, but the gum and bone holding them still need looking after.",
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
        id: "implant-cleaning",
        title: "Cleaning around an implant",
        summary: "The daily routine, and the tools that make it easier.",
        status: "pending",
        needs: "The cleaning routine and any interdental aids your implant patients are sent home with.",
      },
      {
        id: "implant-maintenance",
        title: "Long-term implant maintenance",
        summary: "How often to come back, and what gets checked.",
        status: "pending",
        needs: "Your recall interval for implant patients and what a maintenance visit covers.",
      },
    ],
  },
  {
    id: "kids",
    label: "For parents",
    intro: "First visits, brushing battles, and getting a child to sit down without a fight.",
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
        status: "pending",
        needs: "Dr. Ishita's age-by-age brushing guidance, including toothpaste amount and supervision.",
      },
    ],
  },
  {
    id: "orthodontics",
    label: "Braces and aligners",
    intro: "Keeping teeth clean while they are moving, and keeping them where they end up.",
    guides: [
      {
        id: "braces-cleaning",
        title: "Cleaning with braces on",
        summary: "The bits people miss, and what to keep in your bag.",
        status: "pending",
        needs: "Your cleaning instructions for fixed braces and what you recommend patients carry.",
      },
      {
        id: "aligner-care",
        title: "Looking after aligners",
        summary: "Wear time, cleaning, and what to do if you lose one.",
        status: "pending",
        needs: "Your aligner wear-time instruction and what a patient should do about a lost or cracked tray.",
      },
      {
        id: "retainer-care",
        title: "Retainers",
        summary: "The part that decides whether the result holds.",
        status: "pending",
        needs: "Your retainer protocol: how long, how often, and what happens if someone stops wearing one.",
      },
    ],
  },
];

/**
 * Emergency triage. These lines are reused verbatim from aftercare guidance
 * already reviewed in this repository, so nothing new is being asserted.
 * The clinic still needs to confirm out-of-hours arrangements.
 */
export const urgentSigns = [
  "Pain that is getting worse instead of easing",
  "Swelling of the gum, cheek or face",
  "Anything that feels different from what was explained to you",
  "Bleeding that does not settle",
] as const;

export const emergencyPending =
  "Out-of-hours contact and what to do when the clinic is closed";
