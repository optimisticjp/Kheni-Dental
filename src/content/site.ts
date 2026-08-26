export const site = {
  name: "Kheni Elite Dental & Implant Center",
  shortName: "Kheni Elite",
  tagline: "Precision dentistry. Confident smiles.",
  description:
    "Specialist-led dental, implant and restorative care in Surat with a premium patient experience for local, NRI and international patients.",
  city: "Surat",
  region: "Gujarat",
  country: "India",
  phoneDisplay: "+91 00000 00000",
  phoneHref: "+910000000000",
  whatsappNumber: "910000000000",
  email: "hello@example.com",
  address: "REPLACE WITH VERIFIED CLINIC ADDRESS, Surat, Gujarat, India",
  mapsUrl: "https://maps.google.com/",
  hours: "REPLACE WITH VERIFIED WORKING HOURS",
  instagram: "https://www.instagram.com/khenielite",
  reviewUrl: "https://www.google.com/maps",
  rating: "4.9",
  reviewCount: "1,700+",
  yearsExperience: "XX+",
  cases: "XX+",
  consultationMessage:
    "Hello Kheni Elite, I would like to book a dental consultation. Please share the available appointment options.",
} as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/doctors", label: "Doctors" },
  { href: "/international-patients", label: "International Patients" },
  { href: "/patient-resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  eyebrow: string;
  problem: string;
  intro: string;
  benefits: string[];
  process: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: "dental-implants-surat",
    title: "Dental Implants",
    short: "Replace missing teeth with a stable, natural-looking solution planned around your long-term oral health.",
    eyebrow: "Implant dentistry",
    problem: "Missing tooth or loose dentures",
    intro:
      "Dental implants can replace one tooth, several teeth or support a full-arch restoration. Every case starts with diagnosis and an individualized treatment plan.",
    benefits: ["Fixed tooth replacement", "Designed for function and appearance", "Treatment planned by appropriate specialists", "Long-term maintenance guidance"],
    process: [
      { title: "Consultation", copy: "We understand your goals, dental history and current concerns." },
      { title: "Diagnostics", copy: "Clinical examination and imaging are used when appropriate for planning." },
      { title: "Treatment plan", copy: "You receive a clear sequence, expected visits and aftercare guidance." },
      { title: "Treatment & review", copy: "Care is completed in planned stages with follow-up and maintenance." },
    ],
    faqs: [
      { question: "Are dental implants painful?", answer: "Comfort varies by case. Your dentist will discuss anaesthesia, the expected recovery and suitable pain-management options before treatment." },
      { question: "How long does implant treatment take?", answer: "Timelines depend on bone, healing, the number of implants and the final restoration. Your plan should be confirmed only after examination and diagnostics." },
      { question: "Can I get an implant if I have diabetes?", answer: "Some patients with diabetes can be candidates, but suitability depends on overall health, disease control and oral conditions. A dentist must assess your individual case." },
    ],
  },
  {
    slug: "full-mouth-rehabilitation",
    title: "Full Mouth Rehabilitation",
    short: "A coordinated plan for complex dental needs involving multiple teeth, bite, function and appearance.",
    eyebrow: "Comprehensive restorative care",
    problem: "Multiple damaged or missing teeth",
    intro: "Full mouth rehabilitation combines appropriate restorative, implant, periodontal and cosmetic procedures in a staged treatment plan.",
    benefits: ["One coordinated plan", "Function and aesthetics considered together", "Staged treatment sequence", "Long-term maintenance planning"],
    process: [
      { title: "Comprehensive assessment", copy: "Teeth, gums, bite and existing dental work are assessed." },
      { title: "Treatment design", copy: "The clinical team creates a phased plan based on priorities and feasibility." },
      { title: "Staged care", copy: "Treatment is sequenced to restore health, function and appearance." },
      { title: "Maintenance", copy: "Review intervals and home-care instructions are planned for long-term stability." },
    ],
    faqs: [
      { question: "Who needs full mouth rehabilitation?", answer: "It may be considered for people with extensive tooth wear, multiple missing teeth, failing dental work or several problems that need coordinated treatment." },
      { question: "Is everything done at once?", answer: "Not necessarily. Complex cases are commonly completed in stages depending on diagnosis, healing and the treatment plan." },
    ],
  },
  {
    slug: "root-canal-treatment-surat",
    title: "Root Canal Treatment",
    short: "Treatment designed to preserve a tooth when the pulp is inflamed or infected.",
    eyebrow: "Endodontic care",
    problem: "Persistent tooth pain or infection",
    intro: "Root canal treatment removes infected or inflamed tissue from inside a tooth, cleans and seals the canal system, and is often followed by an appropriate restoration.",
    benefits: ["Aims to save the natural tooth", "Addresses infection inside the tooth", "Planned restoration after treatment", "Follow-up guidance"],
    process: [
      { title: "Diagnosis", copy: "Symptoms, clinical findings and imaging are reviewed." },
      { title: "Root canal care", copy: "The canal system is cleaned, disinfected and sealed." },
      { title: "Restoration", copy: "A filling or crown may be recommended depending on the tooth." },
      { title: "Review", copy: "Healing and function are reassessed when indicated." },
    ],
    faqs: [
      { question: "Does root canal treatment hurt?", answer: "Local anaesthesia is typically used. Some soreness after treatment can occur, and your dentist will explain what to expect in your case." },
      { question: "Do I always need a crown after RCT?", answer: "It depends on the tooth and how much structure remains. Back teeth commonly need stronger coverage, but your dentist should advise after assessment." },
    ],
  },
  {
    slug: "crowns-and-bridges",
    title: "Crowns & Bridges",
    short: "Restorations designed to protect weakened teeth or replace selected missing teeth.",
    eyebrow: "Restorative dentistry",
    problem: "Broken, heavily filled or missing teeth",
    intro: "Crowns cover and protect selected teeth, while bridges can replace certain missing teeth by using neighbouring support. Material and design depend on the clinical situation.",
    benefits: ["Restore shape and function", "Multiple material options", "Designed around bite and appearance", "Can complement implant or root-canal care"],
    process: [
      { title: "Assessment", copy: "The tooth, gums, bite and available support are examined." },
      { title: "Preparation", copy: "The tooth or supporting teeth are prepared when appropriate." },
      { title: "Design", copy: "Measurements or digital scans guide the final restoration." },
      { title: "Fit & review", copy: "Fit, bite and appearance are checked before follow-up." },
    ],
    faqs: [
      { question: "Which crown material is best?", answer: "There is no single best material for every tooth. Location, bite, aesthetics and remaining tooth structure influence the choice." },
      { question: "Bridge or implant?", answer: "Both can be appropriate in different situations. Bone, adjacent teeth, treatment time, health and preferences should be assessed before deciding." },
    ],
  },
  {
    slug: "braces-clear-aligners",
    title: "Braces & Clear Aligners",
    short: "Orthodontic options for improving tooth alignment and bite under professional supervision.",
    eyebrow: "Orthodontics",
    problem: "Crooked, crowded or spaced teeth",
    intro: "Orthodontic treatment can use fixed braces or clear aligners depending on the type and complexity of tooth movement required.",
    benefits: ["Personalized alignment plan", "Braces and aligner options", "Bite and function considered", "Supervised progress reviews"],
    process: [
      { title: "Orthodontic assessment", copy: "Alignment, bite, jaw relationships and dental health are assessed." },
      { title: "Records & planning", copy: "Photos, scans and imaging may be used to plan movement." },
      { title: "Active treatment", copy: "Braces or aligners are monitored and adjusted throughout treatment." },
      { title: "Retention", copy: "Retainers help maintain the corrected position after active treatment." },
    ],
    faqs: [
      { question: "Are clear aligners suitable for everyone?", answer: "No. Suitability depends on the type of movement and case complexity. An orthodontic assessment is required." },
      { question: "How long does orthodontic treatment take?", answer: "Treatment duration varies widely by case and compliance. A personalized estimate can be given after evaluation." },
    ],
  },
  {
    slug: "cosmetic-smile-dentistry",
    title: "Cosmetic & Smile Dentistry",
    short: "Conservative and restorative options to improve the appearance of teeth while respecting oral health and function.",
    eyebrow: "Smile dentistry",
    problem: "Stained, chipped or uneven smile",
    intro: "Smile-focused treatment may include whitening, bonding, veneers, crowns or orthodontics depending on the underlying issue and the desired change.",
    benefits: ["Individualized smile planning", "Multiple conservative options", "Function considered alongside aesthetics", "Preview and planning where appropriate"],
    process: [
      { title: "Smile consultation", copy: "We discuss what you want to change and assess oral health." },
      { title: "Options", copy: "Suitable treatments and limitations are explained." },
      { title: "Planning", copy: "The sequence is designed around health, appearance and practicality." },
      { title: "Care", copy: "Treatment and maintenance guidance are provided." },
    ],
    faqs: [
      { question: "Do I need veneers for a smile makeover?", answer: "Not always. Some concerns may be addressed with whitening, bonding, orthodontics or other options. Treatment should be as conservative as practical." },
      { question: "How long do cosmetic results last?", answer: "Longevity depends on the treatment, oral habits, bite, maintenance and materials. Your dentist can discuss expected maintenance for your chosen option." },
    ],
  },
  {
    slug: "wisdom-tooth-oral-surgery",
    title: "Wisdom Tooth & Oral Surgery",
    short: "Assessment and surgical care for impacted wisdom teeth and selected oral surgical needs.",
    eyebrow: "Oral surgery",
    problem: "Wisdom tooth pain or swelling",
    intro: "Wisdom teeth may require monitoring or removal depending on position, symptoms, infection risk and effects on neighbouring structures.",
    benefits: ["Diagnosis before intervention", "Surgical planning when required", "Clear recovery instructions", "Follow-up support"],
    process: [
      { title: "Assessment", copy: "Symptoms, examination and relevant imaging are reviewed." },
      { title: "Plan", copy: "Need, complexity, anaesthesia and expected recovery are discussed." },
      { title: "Procedure", copy: "Surgery is performed according to the clinical plan." },
      { title: "Aftercare", copy: "Written instructions and follow-up guidance are provided." },
    ],
    faqs: [
      { question: "Does every wisdom tooth need removal?", answer: "No. Some can be monitored. Removal is considered when there are symptoms, disease or other clinical reasons." },
      { question: "How long is recovery?", answer: "Recovery varies by procedure complexity and individual healing. Your surgeon will provide specific instructions and expectations." },
    ],
  },
  {
    slug: "general-family-dentistry",
    title: "General & Family Dentistry",
    short: "Preventive, diagnostic and restorative care for everyday oral health needs.",
    eyebrow: "Everyday dental care",
    problem: "Routine dental care and prevention",
    intro: "Regular examinations, hygiene guidance and timely treatment help maintain oral health and identify problems before they become more complex.",
    benefits: ["Routine examinations", "Preventive guidance", "Restorative treatment", "Long-term oral health planning"],
    process: [
      { title: "Examination", copy: "Teeth, gums and oral tissues are assessed." },
      { title: "Prevention", copy: "Home care and professional cleaning needs are discussed." },
      { title: "Treatment", copy: "Any required restorative care is prioritized." },
      { title: "Recall", copy: "Review intervals are based on individual needs and risk." },
    ],
    faqs: [
      { question: "How often should I visit a dentist?", answer: "Recall intervals are individualized. Your dentist can recommend a schedule based on oral health, risk factors and treatment history." },
      { question: "What if I am anxious about dental treatment?", answer: "Tell the clinic before and during your visit. Clear explanations, breaks and appropriate comfort measures can help make care easier." },
    ],
  },
];

export const doctors = [
  {
    name: "Dr. Name Placeholder",
    credentials: "BDS, MDS · REPLACE WITH VERIFIED CREDENTIALS",
    specialty: "Implant & Restorative Dentistry",
    badges: ["Implant Dentistry", "Full Mouth Rehabilitation", "Advanced Restorative Care"],
    bio: "Replace with a verified professional biography, education, clinical focus, memberships and experience supplied by the doctor.",
  },
  {
    name: "Dr. Name Placeholder",
    credentials: "BDS, MDS · REPLACE WITH VERIFIED CREDENTIALS",
    specialty: "Specialist Dentistry",
    badges: ["Specialist Care", "Patient Education", "Comprehensive Planning"],
    bio: "Add only factual, clinician-approved credentials and experience. Do not publish unverified awards, case counts or superlative claims.",
  },
] as const;

export const problems = [
  { title: "Missing tooth", detail: "Explore implant, bridge and removable replacement options after clinical assessment.", href: "/treatments/dental-implants-surat" },
  { title: "Tooth pain", detail: "Pain can have several causes. Diagnosis may lead to restorative, root-canal, periodontal or other care.", href: "/treatments/root-canal-treatment-surat" },
  { title: "Broken tooth", detail: "Treatment may range from bonding and crowns to root-canal or replacement depending on remaining tooth structure.", href: "/treatments/crowns-and-bridges" },
  { title: "Bleeding gums", detail: "Bleeding can indicate gum inflammation and should be evaluated rather than ignored.", href: "/contact" },
  { title: "Crooked teeth", detail: "Braces or clear aligners may help depending on tooth movement and bite requirements.", href: "/treatments/braces-clear-aligners" },
  { title: "Wisdom tooth pain", detail: "An examination and imaging can determine whether monitoring or removal is appropriate.", href: "/treatments/wisdom-tooth-oral-surgery" },
  { title: "Stained or uneven smile", detail: "Whitening, bonding, veneers, crowns or orthodontics may be considered depending on the cause.", href: "/treatments/cosmetic-smile-dentistry" },
  { title: "Multiple dental problems", detail: "Complex needs can be coordinated through a staged full-mouth rehabilitation plan.", href: "/treatments/full-mouth-rehabilitation" },
] as const;

export const resources = [
  { title: "Your First Visit", description: "What to bring, what to expect and how your consultation is structured.", href: "/patient-resources#first-visit" },
  { title: "Dental Implant Guide", description: "A plain-language overview of assessment, treatment stages and aftercare.", href: "/patient-resources#implant-guide" },
  { title: "After Implant Surgery", description: "A placeholder for clinician-approved post-operative instructions.", href: "/patient-resources#after-implant" },
  { title: "After Root Canal", description: "A placeholder for clinician-approved care instructions and warning signs.", href: "/patient-resources#after-rct" },
  { title: "Wisdom Tooth Aftercare", description: "A placeholder for recovery instructions approved by the treating surgeon.", href: "/patient-resources#wisdom-tooth" },
  { title: "Oral Hygiene Guide", description: "Everyday brushing, interdental cleaning and maintenance guidance.", href: "/patient-resources#oral-hygiene" },
] as const;

export const homepageFaqs = [
  { question: "How do I know which dental treatment I need?", answer: "Start with the problem you are experiencing rather than choosing a procedure yourself. A dental examination and appropriate diagnostics help determine suitable options." },
  { question: "Can I contact the clinic on WhatsApp?", answer: "Yes. Use the WhatsApp button to request appointment options or general clinic information. Avoid sending sensitive medical information until the clinic confirms an appropriate private channel." },
  { question: "Do you support NRI and international patients?", answer: "The website is designed to support an international-patient pathway. The clinic should confirm the exact services it provides, such as remote coordination, appointment sequencing, travel guidance and follow-up." },
  { question: "Can treatment cost be confirmed online?", answer: "Exact treatment fees should usually be confirmed after diagnosis because complexity, materials, imaging and clinical needs can vary between patients." },
] as const;
