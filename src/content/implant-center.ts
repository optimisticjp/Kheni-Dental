/**
 * Content for the Elite Implant Center page at /treatments/dental-implants-surat/.
 *
 * Facts about the clinic live in `site.ts`; this is the implant-specific
 * editorial layer. Nothing here names a technique, a brand, a scan, a
 * timeline in days, a warranty or a price. None is confirmed.
 */

export type StartingPoint = {
  id: "one-tooth" | "several-teeth" | "denture" | "unsure";
  label: string;
  teaser: string;
  summary: string;
  questions: string[];
  options: string[];
  ctaLabel: string;
  whatsappMessage: string;
};

export const implantHero = {
  eyebrow: "Elite Implant Center · Hirabaug, Surat",
  headline: "A fixed tooth for the gap you have been working around.",
  standfirst:
    "An implant is a small post placed in the jawbone that holds a replacement tooth. It is anchored in bone rather than resting on the gum or clipping onto the teeth beside it. Single tooth, several teeth, a full arch, or support for a loose denture.",
  whatsappMessage:
    "Hello Kheni Dental, I would like to ask about dental implants and arrange a consultation at the Elite Implant Center. Thank you.",
} as const;

/** The process the doctor asked for. Accurate, no promises about days. */
export const implantProcess = {
  eyebrow: "How it works",
  title: "From your first visit to your final tooth.",
  copy: "Five stages. You know what each one involves before it starts, and you can stop and think between any two.",
  steps: [
    { title: "Consultation", copy: "You tell us which side you chew on and what you have stopped eating. The dentist examines the gap, the gums and the teeth on either side." },
    { title: "Examination and imaging", copy: "Bone cannot be judged by looking, so implant planning usually needs imaging. The dentist decides what is appropriate for your case." },
    { title: "Your treatment plan", copy: "Implant, bridge or denture, explained plainly with the stages, the visits and the time between them." },
    { title: "Implant treatment", copy: "The implant is placed under local anaesthesia and given time to bond with the bone." },
    { title: "Final tooth and follow-up", copy: "The final crown or set of teeth is fitted once the implant has settled, and you are shown how to clean around it." },
  ],
} as const;

export const startingPoints: StartingPoint[] = [
  {
    id: "one-tooth",
    label: "One missing tooth",
    teaser: "A single gap you have started chewing around.",
    summary:
      "One gap is the situation most people arrive with. It often feels manageable, which is why it gets left. The questions worth asking are about the teeth on either side and the bone underneath, because those decide the sensible options.",
    questions: ["Do I have to replace it at all?", "Will the teeth beside it move if I wait?", "Is an implant better than a bridge in my case?"],
    options: ["An implant, standing on its own in the bone", "A bridge, supported by the teeth on either side", "Leaving the gap for now, with a date to review it"],
    ctaLabel: "Ask about one missing tooth",
    whatsappMessage: "Hello Kheni Dental, I am looking into options for one missing tooth and would like to understand whether an implant may suit me.",
  },
  {
    id: "several-teeth",
    label: "Several missing teeth",
    teaser: "More than one gap, or gaps on both sides.",
    summary:
      "When several teeth are missing, the question stops being about one space and becomes about how your bite works as a whole. Where the gaps sit matters as much as how many there are.",
    questions: ["Do I need an implant for every missing tooth?", "Can some gaps be treated now and others later?", "Will this change how my bite feels?"],
    options: ["Implants positioned where they do the most work for your bite", "Implants and other restorations used together", "A staged plan that treats the most urgent area first"],
    ctaLabel: "Ask about several missing teeth",
    whatsappMessage: "Hello Kheni Dental, I have more than one missing tooth and would like to understand what options are worth discussing.",
  },
  {
    id: "denture",
    label: "A denture that moves",
    teaser: "It slips when you eat or talk.",
    summary:
      "A denture that moves becomes hard to trust, and people put up with it far longer than they need to. What can be done depends on how it fits, on the tissues and bone underneath, and on how your bite meets.",
    questions: ["Can my existing denture be made more stable?", "Would implants help, and how many?", "Is there enough bone left after years of a denture?"],
    options: ["Implants used to give a denture more support", "A fixed replacement, where the bone can carry one", "Remaking the existing denture, if that is the sensible first step"],
    ctaLabel: "Ask about a denture that moves",
    whatsappMessage: "Hello Kheni Dental, my denture moves when I eat and I would like to understand what options are worth discussing.",
  },
  {
    id: "unsure",
    label: "Not sure what I need",
    teaser: "Something is wrong, but you do not have a name for it.",
    summary:
      "Not knowing is a normal place to start, and a perfectly good reason to book. You do not need to arrive with a diagnosis. Describing what changed and when is enough for the dentist to work from.",
    questions: ["Is this urgent, or can it wait?", "What would you actually check?", "What does the first appointment involve?"],
    options: ["An examination first, with the findings explained before anything is discussed", "A plain summary of what was found and what the choices are", "Time to think, including doing nothing for now"],
    ctaLabel: "Ask a general question",
    whatsappMessage: "Hello Kheni Dental, I am not sure what I need yet and would like to ask a general question about tooth replacement.",
  },
];

export const comparison = {
  title: "Implant, bridge or denture?",
  copy: "None of these is automatically the right answer. This is here so you recognise the words when a dentist uses them.",
  columns: ["Implant", "Bridge", "Denture"] as const,
  rows: [
    { label: "How it stays in place", implant: "A post in the jawbone holds the tooth.", bridge: "The teeth on either side carry it.", denture: "Rests on the gum, sometimes with clasps." },
    { label: "Removable", implant: "No.", bridge: "No.", denture: "Yes, it comes out for cleaning." },
    { label: "Neighbouring teeth", implant: "Usually left alone.", bridge: "Prepared, including healthy ones.", denture: "May clip onto other teeth." },
    { label: "Surgery", implant: "Yes, under local anaesthesia.", bridge: "Not usually.", denture: "Not usually." },
    { label: "Checked first", implant: "Bone, gums, bite, general health.", bridge: "Strength of the neighbouring teeth.", denture: "Shape of the ridge and remaining teeth." },
    { label: "Staging", implant: "Placement, healing, then the final tooth.", bridge: "Preparation and fitting over fewer visits.", denture: "Impressions, fitting, adjustments." },
  ],
  note: "The right choice depends on the surrounding teeth, gums, bone and bite, on your general health, and on what matters most to you.",
} as const;

export const planFactors = {
  title: "Why two people missing the same tooth get different plans",
  copy: "The gap is the part you can see. Most of what decides the plan is around it and underneath it.",
  factors: [
    { title: "Gum health", copy: "Active gum disease changes what can be placed and when. Settling it usually comes first." },
    { title: "Bone support", copy: "An implant needs enough bone to hold it. How much there is, and its shape, is assessed with imaging." },
    { title: "General health", copy: "Conditions that affect healing, and the medicines you take, are part of the assessment." },
    { title: "Smoking", copy: "It affects healing in the gums and around an implant. Discussed openly, not as a lecture." },
    { title: "Your bite", copy: "How your teeth meet decides how much load a replacement carries." },
    { title: "Where the gap is", copy: "A gap at the back does a different job from one at the front." },
  ],
} as const;

export const implantFaqs = [
  {
    question: "Do I always need to replace a missing tooth?",
    answer:
      "Not always. It depends on which tooth it is, what it was doing for your bite, and whether the teeth around it have started to move. There are cases where the sensible advice is to monitor the space. Ask what would happen if you left it.",
  },
  {
    question: "The tooth has been missing for years. Is it too late?",
    answer:
      "Not necessarily, though time changes the picture. Bone that no longer supports a tooth tends to reduce over the years, and neighbouring teeth may have drifted. Both affect what is possible and can add stages to the plan. It is still worth having it looked at.",
  },
  {
    question: "I have been told I do not have enough bone. What now?",
    answer:
      "That is a common finding and does not automatically rule anything out. Depending on the site, the options may include building up the area first, choosing a different position, or another way of replacing the tooth. It is a conversation to have in person, with imaging.",
  },
  {
    question: "Can I have an implant if I smoke?",
    answer:
      "Smoking is taken into account because it affects healing. For some people it changes the timing, for others the recommendation. Be straightforward about how much you smoke so the plan is based on the real situation.",
  },
  {
    question: "How do I clean around an implant?",
    answer:
      "Much like a natural tooth, with brushing and cleaning between, though the technique around the implant matters. The gum around an implant can become inflamed if plaque builds up, which is why the cleaning routine and review visits are part of the treatment.",
  },
  {
    question: "Can I travel during implant treatment?",
    answer:
      "Usually yes, with planning. Treatment is staged and some appointments must fall within a certain window. If you live abroad and visit Surat occasionally, say so at the consultation so the stages are arranged around your travel.",
  },
  {
    question: "How is the cost of an implant decided?",
    answer:
      "By how many teeth are involved, the condition of the bone, whether any preparation is needed first and the final tooth on top. After the examination you get the full plan with the estimate for each stage, before treatment starts.",
  },
] as const;
