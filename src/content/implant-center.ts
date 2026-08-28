/**
 * Content for the flagship Elite Implant Center experience at
 * /treatments/dental-implants-surat/.
 *
 * Everything a visitor reads on that page is declared here so the page
 * components stay presentational. Clinic facts live in `site.ts`; this file
 * holds the implant-specific editorial layer built on top of them.
 *
 * VERIFICATION RULE
 * Only publish a technology, implant system, surgical technique, timeline,
 * price or financing option that is confirmed in repository content or in a
 * clinic-provided source. The optional modules below (`technologies`,
 * `caseStudies`) are deliberately empty: the clinic has not supplied verified
 * equipment details or consented before/after cases yet. The page hides those
 * sections while the arrays are empty, so nothing has to be redesigned when
 * real data arrives. Never fill them with placeholder or illustrative content.
 */

export type StartingPoint = {
  /** Stable id used for anchors and for coarse, non-medical analytics. */
  id: "one-tooth" | "several-teeth" | "denture" | "unsure";
  label: string;
  /** Short line shown on the closed panel. */
  teaser: string;
  /** Opening paragraph once the panel is selected. */
  summary: string;
  /** Questions a person in this situation often wants answered. */
  questions: string[];
  /** Options that are usually worth discussing. Never a recommendation. */
  options: string[];
  /** What a dentist would need to look at before anything is decided. */
  examined: string[];
  ctaLabel: string;
  whatsappMessage: string;
};

export type ComparisonRow = {
  label: string;
  implant: string;
  bridge: string;
  denture: string;
};

export type Stage = {
  title: string;
  copy: string;
};

export type FactorGroup = {
  title: string;
  copy: string;
  factors: { title: string; copy: string }[];
};

/**
 * Verified technology entry. Empty until the clinic confirms what it is
 * comfortable publishing. `assessmentValue` is required on purpose: a
 * technology is only worth listing if it answers "what does this help the
 * dentist understand?".
 */
export type ImplantTechnology = {
  name: string;
  assessmentValue: string;
  patientExperience: string;
  imageRole?: string;
  /** Where the fact came from. Required so nothing unverified slips in. */
  verifiedBy: string;
};

/**
 * Consented case study. Empty until real cases exist with written patient
 * permission and treating-doctor approval.
 */
export type ImplantCase = {
  id: string;
  ageRange?: string;
  startingConcern: string;
  category: string;
  doctorSlug: string;
  beforeImage: string;
  afterImage: string;
  afterTakenAt: string;
  stages: string[];
  context: string;
  consentConfirmed: true;
};

export const implantHero = {
  eyebrow: "Elite Implant Center · Surat",
  /** Kept from the existing treatment content. It is one of the strongest lines on the site. */
  headline: "A tooth you do not have to think about.",
  standfirst:
    "A missing tooth changes how you eat before you notice it. You move food to the other side, you pick the softer thing on the menu, and after a while the new habit stops feeling like one. An implant is a small post placed in the jawbone that holds a replacement tooth, so it is anchored in bone instead of resting on the gum or clipping onto the teeth beside it.",
  qualifier:
    "Whether one suits you depends on your bone, your gums, your general health and what you want to be able to bite into again. That is settled in the chair, not on a website.",
  primaryCta: "Book an implant consultation",
  secondaryCta: "Ask about implants on WhatsApp",
  whatsappMessage:
    "Hello Kheni Dental, I would like to ask about dental implants and how to arrange a consultation. Thank you.",
} as const;

export const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "your-situation", label: "Your situation" },
  { id: "options", label: "Options" },
  { id: "planning", label: "Planning" },
  { id: "dr-mayur", label: "Dr. Mayur" },
  { id: "clinics", label: "Clinics" },
  { id: "questions", label: "Questions" },
] as const;

export const startingPoints: StartingPoint[] = [
  {
    id: "one-tooth",
    label: "One missing tooth",
    teaser: "A single gap, and you have started chewing around it.",
    summary:
      "One gap is the situation most people arrive with. It often feels manageable, which is why it gets left. The questions worth asking are about the teeth on either side and the bone underneath, because those are what decide the sensible options.",
    questions: [
      "Do I have to replace it at all, or can I leave the gap?",
      "Will the teeth beside it move if I wait?",
      "Is an implant better than a bridge in my case?",
      "How long would the whole thing take?",
    ],
    options: [
      "An implant, which stands on its own in the bone and leaves the neighbouring teeth alone",
      "A bridge, which is usually quicker and takes support from the teeth on either side",
      "Leaving the gap for now, with a clear reason and a date to review it",
    ],
    examined: [
      "The bone under the gap and whether it can support an implant",
      "The health of the gums around the site",
      "The condition of the teeth on either side, and whether they already need work",
      "Your bite, and whether the opposing tooth has started to drift",
    ],
    ctaLabel: "Ask about one missing tooth",
    whatsappMessage:
      "Hello Kheni Dental, I am looking into options for one missing tooth and would like to understand whether an implant may suit my situation.",
  },
  {
    id: "several-teeth",
    label: "Several missing teeth",
    teaser: "More than one gap, or gaps on both sides.",
    summary:
      "When several teeth are missing, the question stops being about one space and becomes about how your bite works as a whole. Where the gaps sit matters as much as how many there are, because chewing has to be shared out across what is left.",
    questions: [
      "Do I need an implant for every missing tooth?",
      "Can some gaps be treated now and others later?",
      "What is realistic to do in stages?",
      "Will this change how my bite feels?",
    ],
    options: [
      "Implants placed where they do the most work for your bite, rather than one per gap by default",
      "A combination approach, where implants and other restorations are used together",
      "A staged plan that treats the most urgent area first and reviews the rest",
    ],
    examined: [
      "How many teeth are missing and where they sit in the arch",
      "The bone available at each site",
      "Whether the remaining teeth are sound enough to be part of the plan",
      "How your bite has adapted so far",
    ],
    ctaLabel: "Ask about several missing teeth",
    whatsappMessage:
      "Hello Kheni Dental, I have more than one missing tooth and would like to understand what options are worth discussing.",
  },
  {
    id: "denture",
    label: "A denture that moves",
    teaser: "It slips when you eat or talk, and you have stopped trusting it.",
    summary:
      "A denture that shifts is usually a support problem rather than a fitting problem, and people often put up with it far longer than they need to. What can be done depends on how much bone is left underneath and how the denture is currently held.",
    questions: [
      "Can my existing denture be made more stable?",
      "Would implants help, and how many would be involved?",
      "Is there enough bone left after wearing a denture for years?",
      "Would I still take something out at night?",
    ],
    options: [
      "Implants used to give a denture more support so it moves less",
      "A fixed replacement, where the examination shows the bone can carry one",
      "Reviewing and remaking the existing denture, if that is the more sensible first step",
    ],
    examined: [
      "How much bone remains in the ridge under the denture",
      "The condition of the gum tissue that has been carrying the load",
      "How the current denture sits and where it loses grip",
      "Your bite and how the upper and lower jaws meet",
    ],
    ctaLabel: "Ask about a denture that moves",
    whatsappMessage:
      "Hello Kheni Dental, my denture moves when I eat and I would like to understand what options are worth discussing.",
  },
  {
    id: "unsure",
    label: "I am not sure what I need",
    teaser: "Something is wrong, but you do not have a name for it.",
    summary:
      "Not knowing is a normal place to start, and it is a perfectly good reason to book. You do not need to arrive with a diagnosis or a treatment in mind. Describing what changed and when is enough for the dentist to work from.",
    questions: [
      "Is this urgent, or can it wait?",
      "What would you actually check?",
      "Am I going to be talked into something?",
      "What does the first appointment involve?",
    ],
    options: [
      "An examination first, with the findings explained before any treatment is discussed",
      "A written or spoken summary of what was found and what the choices are",
      "Time to think, including the option of doing nothing for now",
    ],
    examined: [
      "The tooth or area you are concerned about",
      "The gums and the bone supporting your teeth",
      "Your bite and how the teeth meet",
      "Anything you have noticed that you did not think was related",
    ],
    ctaLabel: "Ask a general implant question",
    whatsappMessage:
      "Hello Kheni Dental, I am not sure what I need yet and would like to ask a general question about tooth replacement options.",
  },
];

export const comparison = {
  eyebrow: "Three ways a gap gets filled",
  title: "Three ways a missing tooth may be replaced.",
  copy: "None of these is automatically the right answer. They ask different things of your mouth, your time and the teeth you still have. This is here so you recognise the words when a dentist uses them.",
  columns: ["Implant", "Bridge", "Denture"] as const,
  rows: [
    {
      label: "How it stays in place",
      implant: "A post placed in the jawbone holds the replacement tooth.",
      bridge: "The teeth on either side of the gap carry it.",
      denture: "It rests on the gum and ridge, sometimes with clasps on other teeth.",
    },
    {
      label: "Removable",
      implant: "No. It stays in the mouth.",
      bridge: "No. It is fixed onto the prepared teeth.",
      denture: "Yes. It comes out for cleaning.",
    },
    {
      label: "Neighbouring teeth",
      implant: "Usually left alone, which is often the reason it is considered.",
      bridge: "The teeth on either side are prepared, including healthy ones.",
      denture: "May clip onto other teeth depending on the design.",
    },
    {
      label: "Surgery involved",
      implant: "Yes. The post is placed in the bone under local anaesthesia.",
      bridge: "Not usually, though the supporting teeth are reshaped.",
      denture: "Not usually, unless the mouth needs preparing first.",
    },
    {
      label: "Checked before it is offered",
      implant: "Bone volume, gum health, bite and general health.",
      bridge: "Whether the neighbouring teeth are strong enough to take the load.",
      denture: "The shape and condition of the ridge and the remaining teeth.",
    },
    {
      label: "Cleaning it",
      implant: "Brushing and cleaning between, with a routine the dentist shows you.",
      bridge: "Cleaning under the bridge matters and needs a specific technique.",
      denture: "Taken out and cleaned, with the mouth cleaned separately.",
    },
    {
      label: "How it is usually staged",
      implant: "Placement, then healing time, then the final tooth on top.",
      bridge: "Preparation and fitting across a smaller number of visits.",
      denture: "Impressions, fitting and adjustments as it settles.",
    },
  ] satisfies ComparisonRow[],
  note: "The right choice depends on the condition of the surrounding teeth, gums, bone and bite, on your general health, and on what matters most to you. Two people with the same gap are often given different advice for good reasons.",
} as const;

export const decisionStages: Stage[] = [
  {
    title: "Tell us what you avoid",
    copy: "We start with the practical things. Which side you chew on, which foods you have quietly dropped, and whether anything shifts when you talk. That is more useful than a list of symptoms.",
  },
  {
    title: "Examination",
    copy: "The dentist examines your gums, the bone under the gap, your bite and the teeth on either side. This is where most of the answer comes from.",
  },
  {
    title: "Imaging where it is needed",
    copy: "Imaging is used when there is a question it can answer, usually about the bone. It is not routine, and if it is suggested for your case you should ask what it will show.",
  },
  {
    title: "Compare the options",
    copy: "You get a straight account of what an implant, a bridge and a denture would each involve for you, how long each takes and what it asks of the teeth around it. That includes the case for waiting, if waiting is sensible this year.",
  },
  {
    title: "Agree the plan and the stages",
    copy: "Once you know the options, the plan is written out in stages so you can see what happens when. Nothing is booked until you have had the chance to ask what you still do not understand.",
  },
];

export const consultation = {
  eyebrow: "The first appointment",
  title: "You do not come in to agree to an implant.",
  standfirst:
    "You come in to find out whether one makes sense. A consultation is an examination and a conversation, and it is a normal outcome to leave with a plan to think about, or with the advice that an implant is not the right answer for you.",
  steps: [
    {
      title: "A conversation",
      copy: "What you have noticed, how long it has been going on, and what you would like to be able to do again.",
    },
    {
      title: "An examination",
      copy: "The gums, the bone, the bite and the teeth around the space are checked properly.",
    },
    {
      title: "Imaging if it is needed",
      copy: "Only where it answers a question about your case, most often about the bone.",
    },
    {
      title: "The options, in plain words",
      copy: "What each choice involves for you specifically, including doing nothing for now.",
    },
    {
      title: "Timing",
      copy: "How the treatment would be staged and roughly what has to happen between stages.",
    },
    {
      title: "Cost, once a case can be planned",
      copy: "Discussed after the examination, when there is an actual plan to put a figure against.",
    },
    {
      title: "Your decision",
      copy: "Taken in your own time. You are not asked to commit in the chair.",
    },
  ] satisfies Stage[],
} as const;

export const planFactors: FactorGroup = {
  title: "Why two people missing the same tooth get different plans.",
  copy: "The gap is the part you can see. Most of what decides the plan is around it and underneath it, which is why a photograph or a description over the phone is not enough to go on.",
  factors: [
    {
      title: "Gum health",
      copy: "Gum disease that is still active changes what can be placed and when. Settling it usually comes first.",
    },
    {
      title: "Bone support",
      copy: "An implant needs enough bone to hold it. How much is there, and its shape, is what imaging is usually for.",
    },
    {
      title: "General health",
      copy: "Conditions that affect healing, and the medicines you take for them, are part of the assessment. Bring your list.",
    },
    {
      title: "Smoking",
      copy: "Smoking affects healing in the gums and around an implant. It is discussed openly, not used as a lecture.",
    },
    {
      title: "Your bite",
      copy: "How your teeth meet decides how much load a replacement will carry, and grinding changes that further.",
    },
    {
      title: "Where the gaps are",
      copy: "A gap at the back does a different job from one at the front, so the same number of missing teeth can need different plans.",
    },
    {
      title: "The neighbouring teeth",
      copy: "If the teeth beside the space already need treatment, that can change which option makes sense.",
    },
  ],
};

export const timelineFactors: FactorGroup = {
  title: "What changes the timeline",
  copy: "Implant treatment takes longer than most people expect, because the bone needs time to bond with the post before the final tooth goes on.",
  factors: [
    { title: "How many implants", copy: "Replacing one tooth and rebuilding a section of the mouth are different pieces of work." },
    { title: "Healing", copy: "The bond between bone and implant is a biological process and it is not hurried." },
    { title: "Preparatory treatment", copy: "Gum care or other dental work sometimes has to happen first." },
    { title: "The final restoration", copy: "Making and fitting the tooth on top takes its own set of visits." },
    { title: "How you respond", copy: "People heal at different rates, and the review visits are there to check." },
  ],
};

export const costFactors: FactorGroup = {
  title: "Why we cannot give one implant price from a photograph",
  copy: "A number quoted before an examination is a guess, and a guess is not much use to you. What we can do is be clear about what moves it, and give you the full plan with the stages once the case has actually been looked at.",
  factors: [
    { title: "How many teeth", copy: "The number being replaced, and whether they are next to each other." },
    { title: "Complexity", copy: "Some cases are straightforward and some need more planning and more stages." },
    { title: "Diagnostics and planning", copy: "What is needed to assess the bone and plan the case properly." },
    { title: "The restoration", copy: "The design and material choices for the tooth that goes on top." },
    { title: "Additional treatment", copy: "Anything that is clinically needed first, which is identified at the examination." },
  ],
};

export const costClosing =
  "After the dentist has examined the case, ask for the complete plan and what each stage includes. If any part of it is unclear, that is a fair thing to ask again about.";

/**
 * Verified technology only. Empty by design.
 * TODO(clinic): populate once the clinic confirms in writing which equipment
 * and planning methods it is comfortable publishing, plus what each one helps
 * the dentist assess. The section renders automatically once this is non-empty.
 */
export const technologies: ImplantTechnology[] = [];

/**
 * Consented before/after cases only. Empty by design.
 * TODO(clinic): populate only with cases that have written patient consent and
 * treating-doctor approval, along with real images. The section and its
 * disclaimer render automatically once this is non-empty.
 */
export const caseStudies: ImplantCase[] = [];

export const caseDisclaimer =
  "These images show one patient's result. Dental outcomes and treatment needs vary from person to person.";

export const internationalModule = {
  eyebrow: "Coming to Surat",
  title: "If your time in Surat is limited, start the conversation before the trip.",
  copy: "Implant treatment is staged, and the bone needs healing time between the placement and the final tooth. That does not always fit into one visit. Tell us your dates and what you want looked at, and the clinic can say what is realistic to plan and what would need a second trip.",
  points: [
    "Write in before you book flights, not after",
    "Say how long you will be in Surat and when",
    "Ask what could be started on this visit and what would wait",
  ],
  primaryCta: "Plan a Surat visit",
  secondaryCta: "Ask an NRI question on WhatsApp",
  whatsappMessage:
    "Hello Kheni Dental, I live abroad and would like to ask about planning implant treatment around a visit to Surat. Thank you.",
} as const;

export const finalCta = {
  eyebrow: "No pressure",
  title: "You do not have to decide on an implant today.",
  copy: "The first job is to understand what is missing, what the bone and gums can support, and what the alternatives are. Once you have that, the decision is a much smaller one.",
  primaryCta: "Book a consultation",
  secondaryCta: "Ask on WhatsApp",
} as const;

/**
 * Implant FAQs for the flagship page. The first four are the existing verified
 * answers from `site.ts`; the rest were added for this page and follow the same
 * rule: general information, no personal candidacy verdicts, no absolute claims.
 */
export const implantFaqs = [
  {
    question: "Will I be able to eat normally again?",
    answer:
      "That is what the treatment is aiming at, and most people find chewing gets easier once the final tooth is fitted. How close it feels to your own tooth depends on how many teeth are being replaced, the state of the teeth biting against it and how well the implant settles into the bone. There is also a healing stretch where you will be asked to stay on softer food. Your dentist will tell you what to expect at each stage.",
  },
  {
    question: "Is it very painful?",
    answer:
      "The placement is done under local anaesthesia, so you should not feel the procedure itself. Afterwards there is usually some soreness and swelling for a few days, and your dentist will explain what is normal for your case and how to manage it. If anything feels worse than you were told to expect, call the clinic instead of waiting it out.",
  },
  {
    question: "How long does the whole thing take?",
    answer:
      "Longer than most people expect, because the bone needs time to bond with the implant between the placement and the final tooth. In many cases that means several months with review visits in between, and some people need preparatory treatment first, such as gum care, or work to build up the ridge where the implant will sit. A realistic sequence can only be given to you after the examination, not before.",
  },
  {
    question: "Should I get an implant or a bridge?",
    answer:
      "Both can be a sound choice, and neither is automatically better. A bridge is usually quicker and leans on the teeth on either side for support, which means those teeth get prepared even when they are perfectly healthy. An implant stands on its own in the bone and leaves the neighbours alone, but it needs enough bone, settled gums and more time. Bring the question to the consultation, because the answer sits in what is beside the gap and underneath it.",
  },
  {
    question: "Do I always need to replace a missing tooth?",
    answer:
      "Not always, and a dentist who says otherwise without looking is not being straight with you. It depends on which tooth it is, what it was doing for your bite, and whether the teeth around it have started to move. There are cases where the sensible advice is to monitor the space rather than treat it. Ask what would happen if you left it, and ask what would make that answer change.",
  },
  {
    question: "The tooth has been missing for years. Is it too late?",
    answer:
      "Not necessarily, though time does change the picture. Bone that is no longer supporting a tooth tends to reduce over the years, and the teeth around the space may have drifted or tilted. Both of those affect what is possible and can add stages to the plan. It is still worth having it looked at, because the only way to know what you are working with is to examine the site.",
  },
  {
    question: "I have been told I do not have enough bone. What now?",
    answer:
      "That is a common finding and it does not automatically rule anything out. Depending on the site, the options may include building up the area before an implant is placed, choosing a different position, or looking at another way of replacing the tooth altogether. It is a conversation worth having in person, with imaging where it is needed, rather than a yes or no from a website.",
  },
  {
    question: "Can I have an implant if I smoke?",
    answer:
      "Smoking is taken into account because it affects healing in the gums and around an implant, and your dentist will be honest with you about what that means for your case. It is discussed as a clinical factor, not as a lecture. For some people it changes the timing, for others it changes the recommendation. Say how much you smoke and be straightforward about it, because the plan is better when it is based on the real situation.",
  },
  {
    question: "How do I clean around an implant?",
    answer:
      "Much like a natural tooth, with brushing and cleaning between, though the technique around the implant matters and the tools may be slightly different. The gum around an implant can become inflamed if plaque builds up there, which is why the cleaning routine and the review visits are part of the treatment rather than an optional extra. You will be shown what to do before the treatment finishes.",
  },
  {
    question: "Can I travel during implant treatment?",
    answer:
      "Usually yes, but the timing needs planning rather than improvising. Treatment is staged, and some appointments have to fall within a certain window while others are more flexible. If you know you will be away, or you live abroad and visit Surat occasionally, say so at the consultation so the stages can be arranged around your travel instead of against it.",
  },
] as const;
