export const site = {
  name: "Kheni Dental & Elite Implant Center",
  shortName: "Kheni Dental",
  domain: "https://www.khenidentalcare.com",
  email: "smile@khenidentalcare.com",
  city: "Surat",
  region: "Gujarat",
  country: "India",
  tagline: "Care you can understand. Smiles you can feel confident about.",
  description:
    "Dental, implant, cosmetic and family care in Surat with a patient-first approach, two clinic locations and 15 years of experience led by Dr. Mayur Kheni.",
  instagram: "https://www.instagram.com/khenielite",
  primaryPhoneDisplay: "+91 95101 12354",
  primaryPhoneHref: "+919510112354",
  whatsappNumber: "919510112354",
  yearsInSurat: 15,
  googleRating: "4.9",
  googleReviewCount: "1,593",
  googleReviewDisplay: "1,500+",
  googleProfileUrl: "https://maps.app.goo.gl/iKskGAZuZL92Tm7G7",
  googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJddZdiXpP4DsRvtrOvXjbQqA",
  consultationMessage:
    "Hello Kheni Dental, I would like to book a dental consultation. Please share the available appointment options.",
} as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/doctors", label: "Doctors" },
  { href: "/locations", label: "Locations" },
  { href: "/international-patients", label: "International Patients" },
  { href: "/reviews", label: "Reviews" },
  { href: "/patient-resources", label: "Resources" },
] as const;

export type Location = {
  slug: string;
  name: string;
  shortName: string;
  areaLabel: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  mapsUrl: string;
  googleProfileUrl: string;
  googleWriteReviewUrl: string;
  googlePlaceId: string;
  rating?: string;
  reviewCount?: string;
  reviewSource?: string;
  hours: string;
  hoursNote?: string;
  note: string;
};

export const locations: Location[] = [
  {
    slug: "swastik-plaza",
    name: "Kheni Dental, Swastik Plaza",
    shortName: "Swastik Plaza",
    areaLabel: "Nana Varachha, Surat",
    address:
      "Shop No. 38-39, Swastik Plaza, Yogi Chowk Ground, Chikuwadi, Nana Varachha, Surat, Gujarat 395011, India",
    phoneDisplay: "+91 95101 12354",
    phoneHref: "+919510112354",
    whatsappNumber: "919510112354",
    mapsUrl: "https://maps.app.goo.gl/iKskGAZuZL92Tm7G7",
    googleProfileUrl: "https://maps.app.goo.gl/iKskGAZuZL92Tm7G7",
    googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJddZdiXpP4DsRvtrOvXjbQqA",
    googlePlaceId: "ChIJddZdiXpP4DsRvtrOvXjbQqA",
    rating: "4.9",
    reviewCount: "1,593",
    reviewSource: "Google",
    hours: "Mon-Sat 9:30 AM-1:00 PM and 4:00 PM-8:00 PM",
    hoursNote: "Clinic-provided hours. Call before travelling if your visit is time-sensitive.",
    note: "The long-standing Kheni Dental clinic at Swastik Plaza, serving families across Surat.",
  },
  {
    slug: "hirabaug",
    name: "Kheni Dental & Elite Implant Center, Hirabaug",
    shortName: "Hirabaug",
    areaLabel: "Varachha Main Road, Surat",
    address:
      "2, Varachha Main Road, above Shiv Plywood, near New Shakti Vijay Society, opposite Surat Super Store, Hirabaug, Surat, Gujarat 395006, India",
    phoneDisplay: "+91 97379 97543",
    phoneHref: "+919737997543",
    whatsappNumber: "919737997543",
    mapsUrl: "https://maps.app.goo.gl/hkHmTr8ZxLYaH8Vc9",
    googleProfileUrl: "https://maps.app.goo.gl/hkHmTr8ZxLYaH8Vc9",
    googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ89yBAKVP4DsR3TYY_211oRg",
    googlePlaceId: "ChIJ89yBAKVP4DsR3TYY_211oRg",
    hours: "Mon-Sat 9:30 AM-1:00 PM and 4:00 PM-8:00 PM",
    hoursNote: "Clinic-provided hours. Call before travelling if your visit is time-sensitive.",
    note: "The Elite Implant Center location on Varachha Main Road, with direct access from Hirabaug.",
  },
];

export const reviewHighlights = [
  {
    theme: "Comfort",
    quote: "The doctor and staff were super helpful, and the environment was comfortable.",
    source: "Google review",
  },
  {
    theme: "Service",
    quote: "Highly recommend for top quality dental care👍😃 Amazing service👍",
    source: "Google review",
  },
  {
    theme: "Team",
    quote: "Amazing work Good Co operation Good behavior and service of doctors",
    source: "Google review",
  },
] as const;

export type Doctor = {
  slug: string;
  name: string;
  credentials: string;
  specialty: string;
  yearsExperience: number;
  badges: string[];
  bio: string;
  philosophy: string;
  relatedTreatmentSlugs: string[];
};

export const doctors: Doctor[] = [
  {
    slug: "dr-mayur-kheni",
    name: "Dr. Mayur Kheni",
    credentials: "B.D.S.",
    specialty: "Implantologist & Cosmetic Dental Surgeon",
    yearsExperience: 15,
    badges: ["Dental Implants", "Cosmetic Dentistry", "Restorative Care"],
    bio:
      "Dr. Mayur Kheni leads Kheni Dental with 15 years of clinical experience. His listed areas of focus include implantology, cosmetic dental surgery and restorative care.",
    philosophy:
      "Patients should understand what is happening, why a treatment is being suggested and what the next step looks like before they decide.",
    relatedTreatmentSlugs: ["dental-implants-surat", "cosmetic-smile-dentistry", "full-mouth-rehabilitation"],
  },
  {
    slug: "dr-jinal-monapara",
    name: "Dr. Jinal Monapara",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon & Smile Designing Specialist",
    yearsExperience: 9,
    badges: ["Smile Designing", "Cosmetic Care", "General Dentistry"],
    bio:
      "Dr. Jinal Monapara has 9 years of experience as a dental surgeon and smile designing specialist, with a focus on helping patients understand aesthetic options without losing sight of oral health and function.",
    philosophy:
      "A smile plan should feel personal. The goal is to understand what the patient wants to change and choose an approach that respects oral health and function.",
    relatedTreatmentSlugs: ["cosmetic-smile-dentistry", "crowns-and-bridges", "general-family-dentistry"],
  },
  {
    slug: "dr-ishita-dobariya",
    name: "Dr. Ishita Dobariya",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon & Kids Specialist",
    yearsExperience: 4,
    badges: ["Kids Dental Care", "Family Dentistry", "Preventive Care"],
    bio:
      "Dr. Ishita Dobariya has 4 years of experience. The clinic has asked that her profile identify her as a Kids Specialist alongside her B.D.S. and Dental Surgeon credentials.",
    philosophy:
      "For children, a calm first experience matters. Explanations should be simple, parents should know what to expect and care should move at a pace the child can manage.",
    relatedTreatmentSlugs: ["kids-dentistry-surat", "general-family-dentistry"],
  },
  {
    slug: "dr-parita-vastarpara",
    name: "Dr. Parita Vastarpara",
    credentials: "B.D.S.",
    specialty: "Dental Surgeon",
    yearsExperience: 4,
    badges: ["Dental Care", "Patient Education", "Preventive Dentistry"],
    bio:
      "Dr. Parita Vastarpara has 4 years of experience as a dental surgeon, with a patient-first approach to everyday dental care and prevention.",
    philosophy:
      "Good dental care starts with listening carefully, explaining options in plain language and helping patients feel comfortable asking questions.",
    relatedTreatmentSlugs: ["general-family-dentistry", "root-canal-treatment-surat", "crowns-and-bridges"],
  },
];

export type Treatment = {
  slug: string;
  title: string;
  seoTitle: string;
  eyebrow: string;
  problem: string;
  emotionalHeadline: string;
  short: string;
  intro: string;
  benefits: string[];
  process: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: "dental-implants-surat",
    title: "Dental Implants",
    seoTitle: "Dental Implants in Surat",
    eyebrow: "Implant dentistry",
    problem: "I have a missing tooth or loose dentures",
    emotionalHeadline: "Eat comfortably. Smile confidently. Feel like yourself again.",
    short:
      "Implant-based options for replacing missing teeth, planned around your oral health, bite and long-term care.",
    intro:
      "Missing teeth can change the way you eat, speak and smile. Dental implants may replace one tooth, several teeth or support a larger restoration. The right option depends on examination, imaging, bone, gums, health and your goals.",
    benefits: [
      "Fixed tooth-replacement options where suitable",
      "Planning that considers function and appearance",
      "Clear treatment stages before you begin",
      "Follow-up and maintenance guidance",
    ],
    process: [
      { title: "Talk about what is bothering you", copy: "We start with how missing teeth are affecting daily life and what you hope to improve." },
      { title: "Examination and planning", copy: "Clinical examination and appropriate imaging help the dentist assess suitability and options." },
      { title: "A plan you can understand", copy: "You receive a clear sequence of treatment, visits, recovery expectations and alternatives." },
      { title: "Treatment and follow-up", copy: "Care is completed in planned stages with review and maintenance advice." },
    ],
    faqs: [
      { question: "Are dental implants painful?", answer: "Local anaesthesia is commonly used during implant procedures. Recovery varies by case, and your dentist should explain expected discomfort and appropriate aftercare before treatment." },
      { question: "How long does implant treatment take?", answer: "Timelines depend on the number of implants, bone, healing and the type of final teeth. A useful estimate can only be given after assessment." },
      { question: "Can everyone get dental implants?", answer: "No. Suitability depends on oral health, bone, medical factors, habits and treatment goals. An examination is needed before deciding." },
    ],
  },
  {
    slug: "full-mouth-rehabilitation",
    title: "Full Mouth Rehabilitation",
    seoTitle: "Full Mouth Rehabilitation in Surat",
    eyebrow: "Complex restorative care",
    problem: "Several teeth are damaged, worn or missing",
    emotionalHeadline: "When eating, smiling and everyday comfort all need attention, start with one clear plan.",
    short:
      "Coordinated treatment planning for people with several dental problems affecting function, comfort and appearance.",
    intro:
      "Complex dental problems can feel overwhelming when several teeth need attention at once. Full mouth rehabilitation brings the priorities into one staged plan that may combine restorative, implant, gum and cosmetic care where appropriate.",
    benefits: ["One coordinated treatment plan", "Function and appearance considered together", "Care sequenced in manageable stages", "Maintenance planned from the start"],
    process: [
      { title: "Comprehensive assessment", copy: "Teeth, gums, bite, existing dental work and your main concerns are reviewed." },
      { title: "Priorities first", copy: "Urgent health and comfort needs are separated from longer-term restorative goals." },
      { title: "Staged treatment", copy: "Care is sequenced so each phase supports the next." },
      { title: "Long-term maintenance", copy: "Review intervals and home-care guidance help protect the work completed." },
    ],
    faqs: [
      { question: "Who may need full mouth rehabilitation?", answer: "It may be considered when multiple teeth are worn, broken, missing or affected by failing dental work. The exact combination of treatment is individual." },
      { question: "Is everything done at once?", answer: "Not usually. Complex care is often divided into stages based on diagnosis, priorities, healing and practical considerations." },
    ],
  },
  {
    slug: "root-canal-treatment-surat",
    title: "Root Canal Treatment",
    seoTitle: "Root Canal Treatment in Surat",
    eyebrow: "Tooth-saving care",
    problem: "My tooth will not stop hurting",
    emotionalHeadline: "Tooth pain should not control your day.",
    short:
      "Assessment and root canal care for teeth where the pulp is inflamed or infected, with a focus on preserving the natural tooth where possible.",
    intro:
      "Tooth pain can have several causes, so diagnosis comes first. When the tissue inside a tooth is inflamed or infected, root canal treatment may be used to clean and seal the inside of the tooth so it can be restored and kept in function.",
    benefits: ["Aims to preserve the natural tooth", "Addresses infection inside the tooth", "Clear restoration plan after treatment", "Practical aftercare guidance"],
    process: [
      { title: "Find the cause", copy: "Symptoms, examination and imaging are used to understand why the tooth hurts." },
      { title: "Root canal care", copy: "The canal system is cleaned, disinfected and sealed under appropriate anaesthesia." },
      { title: "Protect the tooth", copy: "A filling or crown may be recommended depending on the tooth and remaining structure." },
      { title: "Review", copy: "Healing, comfort and function are checked when indicated." },
    ],
    faqs: [
      { question: "Does root canal treatment hurt?", answer: "Local anaesthesia is normally used. Some soreness can occur afterwards. The dentist should explain what to expect for your tooth." },
      { question: "Will I need a crown after root canal treatment?", answer: "It depends on the tooth and how much structure remains. Back teeth often need stronger coverage, but the decision should be made after assessment." },
    ],
  },
  {
    slug: "crowns-and-bridges",
    title: "Crowns & Bridges",
    seoTitle: "Dental Crowns & Bridges in Surat",
    eyebrow: "Restorative dentistry",
    problem: "A tooth is broken, weak or missing",
    emotionalHeadline: "Make everyday biting and smiling feel normal again.",
    short: "Restorations designed to protect selected weakened teeth or replace certain missing teeth.",
    intro:
      "A damaged or heavily restored tooth may need additional protection, while some missing teeth can be replaced with a bridge. Material and design depend on the tooth, bite, surrounding teeth and appearance goals.",
    benefits: ["Restore shape and everyday function", "Material choices explained clearly", "Bite and appearance considered together", "Can complement root canal or implant care"],
    process: [
      { title: "Assessment", copy: "The tooth, gums, bite and available support are examined." },
      { title: "Preparation", copy: "The tooth or supporting teeth are prepared when appropriate." },
      { title: "Design", copy: "Measurements or scans guide the restoration." },
      { title: "Fit and review", copy: "Fit, bite, appearance and care instructions are checked." },
    ],
    faqs: [
      { question: "Which crown material is best?", answer: "There is no single material that is best for every tooth. Location, bite, appearance and remaining tooth structure influence the choice." },
      { question: "Should I choose a bridge or an implant?", answer: "Both can be suitable in different situations. Bone, neighbouring teeth, health, time and preferences should be assessed before deciding." },
    ],
  },
  {
    slug: "cosmetic-smile-dentistry",
    title: "Smile Design & Cosmetic Dentistry",
    seoTitle: "Smile Design & Cosmetic Dentistry in Surat",
    eyebrow: "Smile care",
    problem: "I do not feel confident about my smile",
    emotionalHeadline: "A smile that still feels like you.",
    short:
      "Personalised cosmetic and restorative options for concerns such as colour, shape, spacing, chips or an uneven smile.",
    intro:
      "People notice different things about their smile. The first step is understanding what you want to change and whether the concern is best addressed with whitening, bonding, alignment, veneers, crowns or another option.",
    benefits: ["Goals discussed before procedures", "Conservative options considered where suitable", "Health and function remain part of the plan", "Treatment limitations explained before you decide"],
    process: [
      { title: "Tell us what you notice", copy: "The consultation starts with what you would like to change, not a predetermined procedure." },
      { title: "Assess oral health", copy: "Teeth, gums, bite and existing restorations are checked before cosmetic planning." },
      { title: "Compare options", copy: "Appropriate choices, trade-offs and maintenance are explained." },
      { title: "Plan and review", copy: "Treatment is completed in a sequence that respects function and appearance." },
    ],
    faqs: [
      { question: "Do I need veneers for a smile makeover?", answer: "Not necessarily. Whitening, bonding, orthodontics or other options may be more appropriate depending on the concern. Treatment should be as conservative as practical." },
      { question: "How long do cosmetic results last?", answer: "Longevity depends on the procedure, bite, habits, materials and maintenance. Your dentist can explain expected upkeep for the option being considered." },
    ],
  },
  {
    slug: "kids-dentistry-surat",
    title: "Kids Dentistry",
    seoTitle: "Kids Dentist in Surat",
    eyebrow: "Children's dental care",
    problem: "My child is worried about the dentist",
    emotionalHeadline: "Little smiles deserve a gentle start.",
    short:
      "Comfort-focused dental visits for children, with simple explanations for young patients and clear guidance for parents.",
    intro:
      "A child's early dental experiences can shape how they feel about care for years. Visits should be calm, age-appropriate and focused on prevention, comfort and helping parents understand what comes next.",
    benefits: ["Child-friendly communication", "Preventive guidance for parents", "Assessment of common childhood dental concerns", "A pace that respects the child's comfort"],
    process: [
      { title: "A calm introduction", copy: "The child gets time to settle in and understand the visit in simple language." },
      { title: "Gentle examination", copy: "Teeth and gums are checked while parents can ask questions." },
      { title: "Explain the options", copy: "Any treatment need is discussed with the parent before proceeding." },
      { title: "Build healthy habits", copy: "Home-care and future review guidance are kept practical and age-appropriate." },
    ],
    faqs: [
      { question: "When should a child first see a dentist?", answer: "Professional guidance commonly recommends an early dental visit after the first teeth appear. The clinic can advise based on your child's age and concerns." },
      { question: "What if my child is scared?", answer: "Tell the dental team before the visit. Familiarisation, simple language, breaks and a gradual approach can make the experience easier." },
    ],
  },
  {
    slug: "gum-care-surat",
    title: "Gum Care",
    seoTitle: "Gum Treatment in Surat",
    eyebrow: "Periodontal care",
    problem: "My gums bleed or feel swollen",
    emotionalHeadline: "Healthy gums make everything else easier to protect.",
    short:
      "Assessment and treatment planning for bleeding, swollen or unhealthy gums and periodontal concerns.",
    intro:
      "Bleeding gums are common, but they should not be ignored. Gum inflammation can have different causes and severity, so the right first step is an examination rather than self-treatment.",
    benefits: ["Identify the cause of bleeding or swelling", "Personalised cleaning and home-care guidance", "Periodontal treatment where indicated", "Maintenance planning to reduce recurrence"],
    process: [
      { title: "Gum assessment", copy: "The gums, plaque, deposits and supporting tissues are evaluated." },
      { title: "Explain what is happening", copy: "The dentist discusses the findings and what can be improved at home and professionally." },
      { title: "Treat as needed", copy: "Professional cleaning or periodontal treatment is selected based on severity." },
      { title: "Maintain", copy: "Review intervals and daily-care instructions are planned around individual risk." },
    ],
    faqs: [
      { question: "Is bleeding while brushing normal?", answer: "Regular bleeding can be a sign of gum inflammation and is worth assessing, especially if it persists." },
      { question: "Can gum disease be treated?", answer: "Many gum problems can be managed, but treatment depends on severity and the supporting tissues involved. Early assessment is useful." },
    ],
  },
  {
    slug: "braces-clear-aligners",
    title: "Braces & Clear Aligners",
    seoTitle: "Braces & Clear Aligners in Surat",
    eyebrow: "Teeth alignment",
    problem: "My teeth feel crowded, crooked or spaced",
    emotionalHeadline: "A straighter smile starts with the right plan, not the right-looking appliance.",
    short:
      "Professionally supervised options for tooth alignment and bite concerns using braces or clear aligners where suitable.",
    intro:
      "Braces and clear aligners can both move teeth, but suitability depends on the type of movement, bite and case complexity. The best starting point is an orthodontic assessment rather than choosing a product first.",
    benefits: ["Assessment before appliance choice", "Bite and function considered", "Progress reviewed during treatment", "Retention planned after alignment"],
    process: [
      { title: "Alignment assessment", copy: "Teeth, bite and jaw relationships are examined." },
      { title: "Records and planning", copy: "Photos, scans and imaging may be used to plan movement." },
      { title: "Active treatment", copy: "Braces or aligners are reviewed and adjusted throughout treatment." },
      { title: "Retention", copy: "Retainers help maintain the result after active tooth movement." },
    ],
    faqs: [
      { question: "Are clear aligners suitable for everyone?", answer: "No. Suitability depends on the movement required and case complexity. An assessment is needed before choosing aligners." },
      { question: "How long does treatment take?", answer: "Duration varies significantly by case and compliance. A personalised estimate can be given after planning." },
    ],
  },
  {
    slug: "wisdom-tooth-oral-surgery",
    title: "Wisdom Tooth & Oral Surgery",
    seoTitle: "Wisdom Tooth Removal in Surat",
    eyebrow: "Oral surgery",
    problem: "My wisdom tooth is painful or swollen",
    emotionalHeadline: "Get answers for the pain, then decide what needs to happen next.",
    short:
      "Assessment and surgical care for impacted or problematic wisdom teeth and selected oral surgical needs.",
    intro:
      "Not every wisdom tooth needs removal. Pain, swelling, infection, position and the effect on nearby teeth all matter. Examination and imaging help determine whether monitoring or surgery is appropriate.",
    benefits: ["Diagnosis before intervention", "Surgical planning where needed", "Recovery instructions explained clearly", "Follow-up support"],
    process: [
      { title: "Assessment", copy: "Symptoms, examination and relevant imaging are reviewed." },
      { title: "Discuss the need", copy: "The dentist explains whether removal is recommended and why." },
      { title: "Procedure", copy: "Surgery is performed according to the clinical plan with appropriate anaesthesia." },
      { title: "Recovery", copy: "Written aftercare and follow-up guidance help you know what is normal and when to contact the clinic." },
    ],
    faqs: [
      { question: "Does every wisdom tooth need to be removed?", answer: "No. Some can be monitored. Removal is considered when there are symptoms, disease or other clinical reasons." },
      { question: "How long does recovery take?", answer: "Recovery varies with procedure complexity and individual healing. Your dentist should give instructions specific to your case." },
    ],
  },
  {
    slug: "general-family-dentistry",
    title: "General & Family Dentistry",
    seoTitle: "Family Dentist in Surat",
    eyebrow: "Everyday dental care",
    problem: "I want to keep small problems from becoming bigger ones",
    emotionalHeadline: "Routine care should feel simple, clear and easy to keep up with.",
    short:
      "Preventive, diagnostic and restorative care for everyday dental needs across different ages.",
    intro:
      "Regular dental care is about more than fixing problems. Examinations, cleaning guidance and timely treatment can help identify concerns early and make long-term oral care easier to manage.",
    benefits: ["Routine dental examinations", "Preventive and home-care guidance", "Restorative treatment when required", "Review intervals based on individual needs"],
    process: [
      { title: "Listen first", copy: "The visit starts with your concerns, history and what has changed since the last check-up." },
      { title: "Examination", copy: "Teeth, gums and oral tissues are assessed." },
      { title: "Prioritise", copy: "Any treatment need is explained in order of urgency and importance." },
      { title: "Keep it manageable", copy: "Review timing and home care are planned around your needs." },
    ],
    faqs: [
      { question: "How often should I visit a dentist?", answer: "Recall intervals are individual. Your dentist can suggest a schedule based on oral health, risk factors and previous treatment." },
      { question: "What if I am anxious about dental treatment?", answer: "Tell the clinic before and during the visit. Clear explanations, breaks and appropriate comfort measures can make care easier." },
    ],
  },
];

export const problems = [
  { title: "I have a missing tooth", detail: "Explore fixed and removable replacement options after a dental assessment.", href: "/treatments/dental-implants-surat" },
  { title: "My tooth will not stop hurting", detail: "Tooth pain can have several causes. Diagnosis comes before deciding on root canal or another treatment.", href: "/treatments/root-canal-treatment-surat" },
  { title: "My gums bleed", detail: "Persistent bleeding can point to gum inflammation and deserves an assessment rather than being ignored.", href: "/treatments/gum-care-surat" },
  { title: "I do not like my smile", detail: "Colour, shape, spacing and alignment concerns can have different solutions. Start by explaining what you want to change.", href: "/treatments/cosmetic-smile-dentistry" },
  { title: "My child is nervous about the dentist", detail: "A calm, age-appropriate visit can help children feel safer while parents understand the care plan.", href: "/treatments/kids-dentistry-surat" },
  { title: "My teeth are crooked or crowded", detail: "Braces or clear aligners may be considered depending on movement, bite and case complexity.", href: "/treatments/braces-clear-aligners" },
  { title: "My wisdom tooth is painful", detail: "Examination and imaging can help determine whether the tooth should be monitored or removed.", href: "/treatments/wisdom-tooth-oral-surgery" },
  { title: "Several teeth need work", detail: "Complex needs can be organised into a staged treatment plan rather than handled as disconnected procedures.", href: "/treatments/full-mouth-rehabilitation" },
] as const;

export const resources = [
  { title: "Your First Visit", description: "What to bring, what happens during a consultation and how to prepare useful questions.", href: "/patient-resources#first-visit" },
  { title: "Dental Implant Guide", description: "A plain-language overview of assessment, planning, treatment stages and maintenance.", href: "/patient-resources#implant-guide" },
  { title: "After Root Canal Treatment", description: "General aftercare points and signs that should prompt a call to your dentist.", href: "/patient-resources#root-canal-aftercare" },
  { title: "Kids Dental Visit", description: "Simple ways parents can prepare a child for a calmer first or follow-up dental visit.", href: "/patient-resources#kids-visit" },
] as const;

export const homepageFaqs = [
  {
    question: "How do I know which dental treatment I need?",
    answer:
      "Start with the problem you are experiencing rather than choosing a procedure yourself. A dental examination and appropriate diagnostics help determine suitable options.",
  },
  {
    question: "Can I speak to the clinic on WhatsApp before booking?",
    answer:
      "Yes. Use the WhatsApp button to ask about appointment options or which branch may be convenient. Avoid sending sensitive medical information through general marketing forms.",
  },
  {
    question: "Which Kheni Dental branch should I visit?",
    answer:
      "Kheni Dental currently operates at Swastik Plaza and Hirabaug in Surat. Call or WhatsApp if you are unsure which clinic is more convenient for the doctor or treatment you need.",
  },
  {
    question: "Do you help NRI or international patients plan visits?",
    answer:
      "Yes. International and NRI patients can start with a dedicated enquiry. Share your travel window first so the clinic can explain what can realistically be assessed or planned during your stay.",
  },
] as const;
