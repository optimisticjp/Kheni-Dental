/**
 * ────────────────────────────────────────────────────────────────────────────
 *  DEMO CONTENT LAYER. EVERY FACT BELOW IS INVENTED.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * The clinic asked to see the look and feel of the marketing patterns the
 * verified site deliberately leaves out: volume counters, superlative
 * headlines, award rows, a testimonial wall, video testimonials, a press
 * strip, a claim marquee and so on. None of it is confirmed. All of it is
 * placeholder, written to be replaced.
 *
 * Rates are the exception: the doctor's standing instruction is that no
 * treatment prices are published, and that holds here too. There are no
 * rupee figures, ranges, EMI lines or estimates anywhere in this layer.
 *
 * Rules for this file:
 *
 *  1. Nothing here is true. Patient names, cities, quotes, counts, awards,
 *     publications and credentials are all fabricated for layout.
 *  2. It only renders while `demoContentActive` is true, which is the default
 *     for review builds and is switched off with NEXT_PUBLIC_DEMO_CONTENT=false.
 *  3. `src/content/__checks__/content-integrity.check.ts` fails the build if
 *     this layer is active while NEXT_PUBLIC_ALLOW_INDEXING is true, so an
 *     invented claim can never reach a search engine.
 *  4. Replace, do not extend. When the clinic sends real figures, real
 *     testimonials and real credentials, they go into the verified content
 *     files and this directory is deleted.
 *
 * The highest-risk items, to swap first:
 *   - `demoCredentials`: invented qualifications attached to real, named
 *     dentists. Must be replaced or removed before anything goes public.
 *   - `demoAwards` and `demoPress`: fictional bodies and mastheads.
 */

import type { Hue } from "@/content/site";

/** Demo content renders unless it is explicitly switched off. */
export const demoContentActive = process.env.NEXT_PUBLIC_DEMO_CONTENT !== "false";

/** One line the layout can show so nobody mistakes the demo layer for fact. */
export const demoNotice =
  "Sample content: figures, names, quotes, awards and credentials on this preview are placeholders for layout review and are not the clinic's real information.";

/* ── 1. Volume counters ─────────────────────────────────────────────────── */

export type DemoStat = {
  id: string;
  /** The number the counter animates to. */
  value: number;
  /** Rendered after the number, e.g. "+" or "k". */
  suffix?: string;
  prefix?: string;
  label: string;
  detail: string;
  hue: Hue;
};

export const demoStats: DemoStat[] = [
  { id: "patients", value: 32400, suffix: "+", label: "Patients treated", detail: "Since the day we opened on Yogi Chowk", hue: "cobalt" },
  { id: "implants", value: 9600, suffix: "+", label: "Implants placed", detail: "One gap to a whole arch", hue: "sunshine" },
  { id: "rehab", value: 1250, suffix: "+", label: "Full mouth rebuilds", detail: "Staged over months, never rushed", hue: "coral" },
  { id: "rct", value: 18700, suffix: "+", label: "Root canals", detail: "Most of them finished in one sitting", hue: "teal" },
  { id: "smiles", value: 2800, suffix: "+", label: "Smiles designed", detail: "Previewed on screen before we started", hue: "violet" },
  { id: "kids", value: 7100, suffix: "+", label: "Children treated", detail: "Most of them left holding a sticker", hue: "mint" },
  { id: "nri", value: 640, suffix: "+", label: "NRI patients", detail: "Fitted around a trip home", hue: "green" },
  { id: "countries", value: 23, label: "Countries", detail: "Passports through the door", hue: "lavender" },
];

/** The tight four-up band used under the hero. */
export const demoHeroStats = demoStats.slice(0, 4);

/* ── 2. Marquee claim strip ─────────────────────────────────────────────── */

/** Read in fragments as it slides past, so each one has to land on its own. */
export const demoMarqueeClaims = [
  "Rated #1 in Surat",
  "Root canals you could sleep through",
  "9,600 implants and counting",
  "Two clinics, one standard, since 2011",
  "A tooth by evening on selected cases",
  "98.6% still holding",
  "Sterilised to theatre grade",
  "Patients fly in from 23 countries",
  "Award winning full mouth work",
  "See your smile before we touch it",
];

/* ── 3. Superlative marketing copy ──────────────────────────────────────── */

export const demoSuperHero = {
  badge: "Rated #1 in Surat, four years running",
  title: "The best dentist in Surat is the one you stop dreading.",
  highlight: "stop dreading",
  copy:
    "Thirty two thousand people have sat in these chairs since 2011. Most of them walked in nervous. Very few walked out that way. Implants, root canals and full mouth work, done gently enough that people keep asking when we are going to start.",
  points: [
    "9,600 implants placed. 98.6% still doing their job.",
    "Numb before you notice. The injection is the part we practised hardest.",
    "Walk in with a gap, walk out with a tooth. Selected cases, same day.",
    "Swiss titanium, guaranteed for life. The crown on top, ten years.",
  ],
  primaryCta: "Your first visit is on us",
  secondaryCta: "See what changed for them",
};

export const demoPromises = [
  { id: "p1", value: "By six", title: "A tooth the same day", copy: "Come in at nine with a gap. Leave in the evening with a fixed temporary tooth. Not every case allows it, and we will tell you straight if yours does not." },
  { id: "p2", value: "Zero", title: "Things you will feel", copy: "Numbing gel before the needle, and a needle most people never notice. The usual complaint is that we finished before they were ready." },
  { id: "p3", value: "98.6%", title: "Still holding", copy: "Of the 9,600 implants placed here since 2011, that is how many are still doing the job they went in for." },
  { id: "p4", value: "For life", title: "On the titanium", copy: "The Swiss fixture is guaranteed for as long as you have it. The crown that sits on top, ten years." },
];

/* ── 4. Credentials and awards ──────────────────────────────────────────── */

export type DemoCredential = { doctorSlug: string; credentials: string; qualifications: string[]; memberships: string[] };

export const demoCredentials: DemoCredential[] = [
  {
    doctorSlug: "dr-mayur-kheni",
    credentials: "B.D.S., M.D.S. (Oral Implantology), F.I.C.O.I.",
    qualifications: [
      "M.D.S. in Oral Implantology, Government Dental College, Ahmedabad",
      "Fellowship, International Congress of Oral Implantologists",
      "Advanced certification in All-on-4 and guided implant surgery, Lisbon",
      "Certified provider, Nobel Biocare and Straumann implant systems",
    ],
    memberships: ["Indian Dental Association", "Indian Society of Oral Implantologists", "Academy of Osseointegration"],
  },
  {
    doctorSlug: "dr-jinal-monapara",
    credentials: "B.D.S., M.D.S. (Prosthodontics)",
    qualifications: [
      "M.D.S. in Prosthodontics and Crown & Bridge, Surat",
      "Certified Digital Smile Design practitioner",
      "Advanced veneer aesthetics programme, Bengaluru",
    ],
    memberships: ["Indian Prosthodontic Society", "Indian Dental Association"],
  },
  {
    doctorSlug: "dr-ishita-dobariya",
    credentials: "B.D.S., M.D.S. (Pedodontics)",
    qualifications: [
      "M.D.S. in Pedodontics and Preventive Dentistry",
      "Certified in behaviour management and paediatric sedation",
      "Special care dentistry workshop, Mumbai",
    ],
    memberships: ["Indian Society of Pedodontics and Preventive Dentistry"],
  },
  {
    doctorSlug: "dr-parita-vastarpara",
    credentials: "B.D.S., M.D.S. (Conservative Dentistry & Endodontics)",
    qualifications: [
      "M.D.S. in Conservative Dentistry and Endodontics",
      "Certified in single visit endodontics and rotary systems",
      "Microscope enhanced endodontics training, Pune",
    ],
    memberships: ["Indian Endodontic Society", "Indian Dental Association"],
  },
];

export const demoCredentialBySlug = Object.fromEntries(demoCredentials.map((c) => [c.doctorSlug, c]));

export type DemoAward = { id: string; year: string; title: string; body: string; hue: Hue };

export const demoAwards: DemoAward[] = [
  { id: "a1", year: "2025", title: "Implant Centre of the Year, West Zone", body: "Bharat Dental Excellence Awards", hue: "sunshine" },
  { id: "a2", year: "2024", title: "Surat's Best Multi-Speciality Dental Clinic", body: "Diamond City Healthcare Honours", hue: "coral" },
  { id: "a3", year: "2024", title: "Clinical Excellence, Full Mouth Rehabilitation", body: "South Gujarat Dental Congress", hue: "cobalt" },
  { id: "a4", year: "2023", title: "Patient Choice, Dentistry", body: "Gujarat Wellness Monthly readers' poll", hue: "teal" },
  { id: "a5", year: "2022", title: "Young Implantologist of the Year", body: "Bharat Society of Oral Implantology", hue: "violet" },
];

export const demoAccreditations = [
  "ISO 9001:2015 clinical protocol",
  "NABH entry level accredited",
  "Nobel Biocare certified centre",
  "Invisalign Platinum provider",
  "Green OT sterilisation certified",
];

/* ── 5. Press and celebrity proof ───────────────────────────────────────── */

export type DemoPress = { id: string; outlet: string; quote: string; date: string };

/** Fictional mastheads. No real publication has covered this clinic. */
export const demoPress: DemoPress[] = [
  { id: "pr1", outlet: "Diamond City Review", quote: "Where Surat sends the cases nobody else will take.", date: "March 2025" },
  { id: "pr2", outlet: "Gujarat Wellness Monthly", quote: "They explain first and treat second. You can feel it in the waiting room.", date: "November 2024" },
  { id: "pr3", outlet: "Surat Health Today", quote: "Fifteen years in, still the benchmark for full mouth work in South Gujarat.", date: "August 2024" },
  { id: "pr4", outlet: "Clinical Dentistry India", quote: "Textbook staging on a case most clinics would have rushed.", date: "February 2024" },
  { id: "pr5", outlet: "The Tapi Business Post", quote: "Surat's quietest export: dental tourism that actually delivers.", date: "June 2023" },
];

export type DemoNotable = { id: string; name: string; role: string; quote: string; hue: Hue };

/** Fictional public figures. Nobody real has endorsed this clinic. */
export const demoNotables: DemoNotable[] = [
  { id: "n1", name: "Ravi Deshmukh", role: "Playback singer", quote: "I sing for a living. They handled my mouth like the instrument it is.", hue: "coral" },
  { id: "n2", name: "Kavya Trivedi", role: "Gujarati television actor", quote: "Six veneers, and nobody at the studio could tell what changed. That was the whole point.", hue: "violet" },
  { id: "n3", name: "Hardik Rathod", role: "Ranji Trophy cricketer", quote: "Wisdom tooth out on Friday. Back in the nets on Monday. No drama.", hue: "cobalt" },
  { id: "n4", name: "Meera Shah", role: "Textile entrepreneur", quote: "They built a full mouth around my travel calendar, not the other way round.", hue: "sunshine" },
];

/* ── 6. Testimonial wall ────────────────────────────────────────────────── */

export type DemoTestimonial = {
  id: string;
  name: string;
  city: string;
  country?: string;
  treatment: string;
  treatmentSlug: string;
  rating: 5 | 4;
  quote: string;
  date: string;
  branchSlug: string;
  hue: Hue;
  /** Marks the two or three that carry the wall visually. */
  featured?: boolean;
};

export const demoTestimonials: DemoTestimonial[] = [
  { id: "t1", name: "Nirav P.", city: "Yogi Chowk, Surat", treatment: "Dental implants", treatmentSlug: "dental-implants-surat", rating: 5, quote: "Four years I chewed on one side without thinking about it. Dr. Mayur put the scan on the screen, showed me what he could fix and what he could not, and did not once try to sell me the extra. Two implants later I eat like I forgot how to favour a side.", date: "July 2026", branchSlug: "hirabaug", hue: "cobalt", featured: true },
  { id: "t2", name: "Reshma D.", city: "Adajan, Surat", treatment: "Root canal", treatmentSlug: "root-canal-treatment-surat", rating: 5, quote: "Two nights of no sleep, and I turned up at nine in the evening expecting to be sent home. Root canal done in one sitting, back in my own bed by eleven, and I slept. My father, my sister and my neighbour have all been since.", date: "June 2026", branchSlug: "swastik-plaza", hue: "teal" },
  { id: "t3", name: "Dhruv M.", city: "London", country: "United Kingdom", treatment: "Full mouth rehabilitation", treatmentSlug: "full-mouth-rehabilitation", rating: 5, quote: "I get three weeks in Surat a year and I was not going to spend them in a waiting room. They sent the full schedule before I booked flights, stuck to it, and finished a day early. My London quote was six times higher and half as clear.", date: "May 2026", branchSlug: "hirabaug", hue: "sunshine", featured: true },
  { id: "t4", name: "Aarti S.", city: "Vesu, Surat", treatment: "Clear aligners", treatmentSlug: "braces-clear-aligners", rating: 5, quote: "Thirty two years old and still covering my mouth in photographs. Fourteen months of aligners, and the only person at work who noticed was the one I told. I have a lot of photos from this year.", date: "May 2026", branchSlug: "swastik-plaza", hue: "violet" },
  { id: "t5", name: "Bhavesh K.", city: "Katargam, Surat", treatment: "Smile design", treatmentSlug: "cosmetic-smile-dentistry", rating: 5, quote: "They showed me the result on a screen before anything touched my teeth. I said make the front two slightly less perfect and they did. My daughter's wedding album came back exactly the way I had pictured it.", date: "April 2026", branchSlug: "hirabaug", hue: "coral", featured: true },
  { id: "t6", name: "Nidhi J.", city: "Piplod, Surat", treatment: "Kids dentistry", treatmentSlug: "kids-dentistry-surat", rating: 5, quote: "My six year old screamed the building down at the last place. Dr. Ishita spent the entire first visit letting him hold the little mirror and look at her teeth instead. Second visit he sat through a filling without a sound. That is not luck.", date: "April 2026", branchSlug: "swastik-plaza", hue: "mint" },
  { id: "t7", name: "Sanjay T.", city: "Toronto", country: "Canada", treatment: "Dental implants", treatmentSlug: "dental-implants-surat", rating: 5, quote: "Four implants in ten days, all of it agreed over WhatsApp before I got on the plane. They booked the hotel two minutes' walk away. Six months on my reviews are still happening over a video call from my kitchen.", date: "March 2026", branchSlug: "hirabaug", hue: "green" },
  { id: "t8", name: "Priya V.", city: "Pal, Surat", treatment: "Gum treatment", treatmentSlug: "gum-care-surat", rating: 5, quote: "Blood in the sink every single morning for years, and I had decided that was just my mouth. Three visits later it stopped and has not come back. Nobody had ever told me it was not normal.", date: "March 2026", branchSlug: "swastik-plaza", hue: "lavender" },
  { id: "t9", name: "Imran Q.", city: "Rander, Surat", treatment: "Wisdom tooth removal", treatmentSlug: "wisdom-tooth-oral-surgery", rating: 4, quote: "Impacted lower wisdom tooth, out in twenty minutes. They warned me about two days of swelling and I got exactly two days of swelling. I would rather be told the truth than be told it is nothing.", date: "February 2026", branchSlug: "hirabaug", hue: "amber" },
  { id: "t10", name: "Falguni R.", city: "Varachha, Surat", treatment: "Crowns and bridges", treatmentSlug: "crowns-and-bridges", rating: 5, quote: "A bridge from twelve years ago had given up. They rebuilt the whole thing and matched the shade so closely that I have genuinely lost track of which teeth are mine.", date: "February 2026", branchSlug: "swastik-plaza", hue: "sky" },
  { id: "t11", name: "Jignesh B.", city: "Dubai", country: "United Arab Emirates", treatment: "Smile design", treatmentSlug: "cosmetic-smile-dentistry", rating: 5, quote: "Eight veneers across two trips. The trial smile is what convinced me: you wear the result on your own face for a week before anything becomes permanent. No dentist in Dubai offered me that.", date: "January 2026", branchSlug: "hirabaug", hue: "coral" },
  { id: "t12", name: "Kinjal A.", city: "Althan, Surat", treatment: "Check-up and cleaning", treatmentSlug: "dental-check-up-surat", rating: 5, quote: "I went in braced for the usual list of things that urgently need doing. I got a cleaning, a written plan, and a dentist saying nothing else needs touching right now. I nearly asked her to repeat it.", date: "January 2026", branchSlug: "swastik-plaza", hue: "teal" },
  { id: "t13", name: "Ramesh G.", city: "Udhna, Surat", treatment: "Dentures on implants", treatmentSlug: "dental-implants-surat", rating: 5, quote: "Seventy one, and my lower denture had never once stayed where I put it. Four implants and now it clicks in and stays. Last week I ate a whole apple standing up in the kitchen. First time since 2019.", date: "December 2025", branchSlug: "hirabaug", hue: "cobalt" },
  { id: "t14", name: "Shweta N.", city: "Melbourne", country: "Australia", treatment: "Root canal and crown", treatmentSlug: "root-canal-treatment-surat", rating: 5, quote: "Third day of a family visit and a tooth went. They saw me the same evening, had the crown fitted before my flight, and emailed the records to my dentist here without me asking twice.", date: "December 2025", branchSlug: "swastik-plaza", hue: "sunshine" },
  { id: "t15", name: "Manish L.", city: "Bhatar, Surat", treatment: "Full mouth rehabilitation", treatmentSlug: "full-mouth-rehabilitation", rating: 5, quote: "Years of grinding had worn everything down to flat little squares. Eighteen months, staged properly, nothing hurried. My bite feels like it did before I started clenching my way through my thirties.", date: "November 2025", branchSlug: "hirabaug", hue: "violet" },
  { id: "t16", name: "Hetal P.", city: "Nairobi", country: "Kenya", treatment: "Braces", treatmentSlug: "braces-clear-aligners", rating: 5, quote: "My daughter's braces, run across two countries. Adjustments here whenever we visited, photographs over WhatsApp in between. I expected it to fall apart and it never did.", date: "October 2025", branchSlug: "swastik-plaza", hue: "mint" },
];

export const demoRatingSummary = { average: "4.9", total: 1284, breakdown: [{ stars: 5, count: 1189 }, { stars: 4, count: 71 }, { stars: 3, count: 15 }, { stars: 2, count: 5 }, { stars: 1, count: 4 }] };

/* ── 7. Video testimonial wall ──────────────────────────────────────────── */

export type DemoVideoStory = {
  id: string;
  /** A real video id from the clinic's own channel, used only so a poster loads. The caption is invented. */
  youtubeId: string;
  name: string;
  place: string;
  treatment: string;
  quote: string;
  language: "Gujarati" | "Hindi" | "English";
  hue: Hue;
};

export const demoVideoStories: DemoVideoStory[] = [
  { id: "v1", youtubeId: "ZNOLH08MzmA", name: "Ramesh G.", place: "Udhna, Surat", treatment: "Implant supported denture", quote: "It clicks in and it stays put.", language: "Gujarati", hue: "cobalt" },
  { id: "v2", youtubeId: "eex02jLikGk", name: "Dhruv M.", place: "London, UK", treatment: "Full mouth rebuild", quote: "They built it around a three week trip.", language: "English", hue: "sunshine" },
  { id: "v3", youtubeId: "RNzkMMtnp54", name: "Aarti S.", place: "Vesu, Surat", treatment: "Clear aligners", quote: "Fourteen months, and nobody noticed.", language: "English", hue: "violet" },
  { id: "v4", youtubeId: "0IL5cqTAJU0", name: "Bhavesh K.", place: "Katargam, Surat", treatment: "Smile design", quote: "What I saw on the screen is what I got.", language: "Gujarati", hue: "coral" },
  { id: "v5", youtubeId: "QBhNxSVO8JE", name: "Sanjay T.", place: "Toronto, Canada", treatment: "Four implants", quote: "Ten days. Start to finish.", language: "English", hue: "green" },
  { id: "v6", youtubeId: "17PZgdSYDhI", name: "Nidhi J.", place: "Piplod, Surat", treatment: "Kids dentistry", quote: "He sat through the whole thing.", language: "Gujarati", hue: "mint" },
  { id: "v7", youtubeId: "7s16NAjttgs", name: "Priya V.", place: "Pal, Surat", treatment: "Gum treatment", quote: "The bleeding just stopped.", language: "Gujarati", hue: "lavender" },
  { id: "v8", youtubeId: "OizBmbJSTx8", name: "Jignesh B.", place: "Dubai, UAE", treatment: "Eight veneers", quote: "The trial smile is what sold me.", language: "English", hue: "teal" },
];

/* ── 8. Result gallery ──────────────────────────────────────────────────── */

export type DemoResult = { id: string; label?: string; hue: Hue; tone: [string, string] };

/** An unlabelled grid, exactly as the reference clinics publish it. */
export const demoResultDump: DemoResult[] = [
  { id: "r1", hue: "cobalt", tone: ["#e7edfb", "#c3d2f2"] },
  { id: "r2", hue: "coral", tone: ["#fdeae6", "#f6c4b8"] },
  { id: "r3", hue: "sunshine", tone: ["#fff3d6", "#ffdf94"] },
  { id: "r4", hue: "teal", tone: ["#e2f4f2", "#b6e2dc"] },
  { id: "r5", hue: "violet", tone: ["#efe9fb", "#d3c3f2"] },
  { id: "r6", hue: "mint", tone: ["#e5f6ec", "#bee6cf"] },
  { id: "r7", hue: "amber", tone: ["#fdefdd", "#f7d5a4"] },
  { id: "r8", hue: "sky", tone: ["#e5f1fb", "#bcdaf3"] },
  { id: "r9", hue: "lavender", tone: ["#f0ecfa", "#d6cbf0"] },
  { id: "r10", hue: "green", tone: ["#e8f5e3", "#c6e5ba"] },
  { id: "r11", hue: "navy", tone: ["#e6e9f2", "#c0c8dc"] },
  { id: "r12", hue: "gold", tone: ["#f8f0dc", "#e8d5a2"] },
];

/** The labelled pairs used by the before/after wall. */
export type DemoCase = { id: string; label: string; detail: string; hue: Hue; before: [string, string]; after: [string, string] };

export const demoCases: DemoCase[] = [
  { id: "c1", label: "A gap right at the front", detail: "One implant, one zirconia crown, four months", hue: "cobalt", before: ["#e9edf6", "#c2ccdf"], after: ["#eef4ff", "#ffe08a"] },
  { id: "c2", label: "Worn flat and gone yellow", detail: "Ten veneers, upper arch, three weeks", hue: "coral", before: ["#f4ece7", "#d8c4b6"], after: ["#fff4ee", "#ffd9c6"] },
  { id: "c3", label: "Lower teeth stacked on each other", detail: "Clear aligners, fourteen months", hue: "violet", before: ["#eeecf3", "#cbc3dd"], after: ["#f5f0ff", "#d9c8ff"] },
  { id: "c4", label: "A denture that would not sit still", detail: "Four implants and a fixed bridge, six months", hue: "sunshine", before: ["#f2f0e9", "#d5cfbb"], after: ["#fff8e6", "#ffe39c"] },
];

/* ── 9. Horizontal accordion (problems) ────────────────────────────────── */

export type DemoPanel = { id: string; label: string; heading: string; copy: string; href: string; hue: Hue; stat: string };

export const demoProblemPanels: DemoPanel[] = [
  { id: "pain", label: "Tooth pain", heading: "A tooth that has started keeping you awake", copy: "Night pain usually means the nerve is involved. A single sitting root canal settles it, and you keep the tooth.", href: "/treatments/root-canal-treatment-surat/", hue: "teal", stat: "18,700+ treated" },
  { id: "gap", label: "Missing tooth", heading: "A gap you have been chewing around", copy: "An implant replaces the root as well as the tooth, so the teeth beside it are left alone.", href: "/treatments/dental-implants-surat/", hue: "cobalt", stat: "9,600+ placed" },
  { id: "crooked", label: "Crooked teeth", heading: "Teeth that never quite lined up", copy: "Braces or clear aligners, chosen around how much movement you need and how visible you want it to be.", href: "/treatments/braces-clear-aligners/", hue: "violet", stat: "2,100+ cases" },
  { id: "smile", label: "Smile appearance", heading: "The thing you notice in every photo", copy: "A digital preview first. You see the result on your own face before anything permanent happens.", href: "/treatments/cosmetic-smile-dentistry/", hue: "coral", stat: "2,800+ designs" },
  { id: "child", label: "Your child", heading: "A child who will not open their mouth", copy: "First visits are for getting comfortable. Treatment happens at the pace the child can manage.", href: "/treatments/kids-dentistry-surat/", hue: "mint", stat: "7,100+ children" },
  { id: "gums", label: "Bleeding gums", heading: "Blood in the sink every morning", copy: "Gums that bleed are inflamed, not fragile. Cleaning below the gumline is what stops it.", href: "/treatments/gum-care-surat/", hue: "green", stat: "6,400+ courses" },
  { id: "wisdom", label: "Wisdom tooth", heading: "Swelling right at the back", copy: "If it is impacted and keeps flaring up, taking it out is usually simpler than managing it.", href: "/treatments/wisdom-tooth-oral-surgery/", hue: "lavender", stat: "3,900+ removals" },
  { id: "broken", label: "Broken tooth", heading: "A chip, a crack or a filling that fell out", copy: "A crown holds a weakened tooth together. Done early it saves the tooth, done late it may not.", href: "/treatments/crowns-and-bridges/", hue: "amber", stat: "11,200+ crowns" },
  { id: "denture", label: "Loose denture", heading: "A denture that moves when you eat", copy: "Implants give a denture something to hold on to, so it stops lifting at the wrong moment.", href: "/treatments/dental-implants-surat/", hue: "sky", stat: "1,450+ stabilised" },
  { id: "stain", label: "Stained teeth", heading: "Tea, tobacco and years", copy: "Cleaning removes what sits on the surface. Whitening changes what is underneath. They are different jobs.", href: "/treatments/cosmetic-smile-dentistry/", hue: "gold", stat: "5,600+ cleanings" },
  { id: "bad-breath", label: "Bad breath", heading: "Something you have stopped mentioning", copy: "Nine times in ten it starts at the gumline, and nine times in ten it is fixable in a couple of visits.", href: "/treatments/gum-care-surat/", hue: "green", stat: "Same week appointments" },
  { id: "grinding", label: "Grinding", heading: "Waking with a sore jaw", copy: "Grinding wears teeth flat over years. A night guard costs less than rebuilding what it takes off.", href: "/treatments/full-mouth-rehabilitation/", hue: "navy", stat: "1,250+ rehabilitations" },
  { id: "checkup", label: "Check-up", heading: "Overdue, and you know it", copy: "An examination, X-rays where needed and a written plan. No obligation to start anything.", href: "/treatments/dental-check-up-surat/", hue: "sky", stat: "32,400+ examinations" },
  { id: "nri", label: "Visiting Surat", heading: "Treatment planned around your trip", copy: "Send dates and photos before you fly. You land with a schedule, not a queue.", href: "/international-patients/", hue: "coral", stat: "23 countries" },
];

/* ── 10. Rotated quote tab ──────────────────────────────────────────────── */

export const demoQuoteTab = {
  label: "Ask a dentist",
  title: "Send us a photo",
  copy: "Photograph the tooth that is bothering you and send it across. A dentist will tell you what it looks like and what usually comes next. One working day, no appointment, no charge.",
  cta: "Send a photo on WhatsApp",
  message: "Hello Kheni Dental, I would like to ask a dentist about a tooth. Here is a photo of what is bothering me:",
};

/* ── 11. Icon service grid ──────────────────────────────────────────────── */

export type DemoService = { id: string; label: string; slug: string; hue: Hue; glyph: string };

export const demoServiceTiles: DemoService[] = [
  { id: "s1", label: "Dental Implants", slug: "dental-implants-surat", hue: "cobalt", glyph: "implant" },
  { id: "s2", label: "Root Canal", slug: "root-canal-treatment-surat", hue: "teal", glyph: "canal" },
  { id: "s3", label: "Braces", slug: "braces-clear-aligners", hue: "violet", glyph: "braces" },
  { id: "s4", label: "Smile Design", slug: "cosmetic-smile-dentistry", hue: "coral", glyph: "smile" },
  { id: "s5", label: "Full Mouth", slug: "full-mouth-rehabilitation", hue: "sunshine", glyph: "arch" },
  { id: "s6", label: "Crowns", slug: "crowns-and-bridges", hue: "amber", glyph: "crown" },
  { id: "s7", label: "Kids Dentistry", slug: "kids-dentistry-surat", hue: "mint", glyph: "kid" },
  { id: "s8", label: "Gum Care", slug: "gum-care-surat", hue: "green", glyph: "gum" },
  { id: "s9", label: "Wisdom Tooth", slug: "wisdom-tooth-oral-surgery", hue: "lavender", glyph: "wisdom" },
  { id: "s10", label: "Check-up", slug: "dental-check-up-surat", hue: "sky", glyph: "check" },
  { id: "s11", label: "Fillings", slug: "tooth-fillings-surat", hue: "navy", glyph: "filling" },
  { id: "s12", label: "Whitening", slug: "cosmetic-smile-dentistry", hue: "gold", glyph: "sparkle" },
];
