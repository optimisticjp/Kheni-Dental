/**
 * Video from the clinic's own YouTube channel.
 *
 * Every entry is a real, public video on "Kheni Dental & Elite Implant
 * Center" (https://www.youtube.com/channel/UCA4ralOJwb8mrttegjyZcEQ),
 * checked against the channel's Shorts and Videos tabs on 13 September
 * 2026. Titles are the clinic's own, trimmed of emoji and hashtags, or a
 * plain description of the topic where the clinic's title was only tags.
 *
 * Nothing is rehosted. The site shows YouTube's own poster frame and only
 * loads the player, on the privacy-enhanced domain, after a tap.
 *
 * Do not add a video that is not on the clinic's channel. Do not describe a
 * patient beyond what the clinic's own title says. Doctor names are only
 * attached where the clinic tagged the doctor in its own title.
 */

export type ClinicVideo = {
  /** YouTube video id. */
  id: string;
  title: string;
  kind: "education" | "patient" | "clinic";
  language: "English" | "Gujarati" | "Hindi";
  /** Shorts are 9:16; videos are 16:9. Decides the poster and the link. */
  format: "short" | "video";
  /** Optional treatment slug the video relates to. */
  treatmentSlug?: string;
  /** Only where the clinic tagged the doctor in its own title. */
  doctorSlug?: string;
};

export const youtubeChannelUrl = "https://www.youtube.com/channel/UCA4ralOJwb8mrttegjyZcEQ";

export const clinicVideos: ClinicVideo[] = [
  // Shorts
  { id: "dAIDO0JcosU", title: "Brushing during braces treatment", kind: "education", language: "English", format: "short", treatmentSlug: "braces-clear-aligners" },
  { id: "ifBJw4RQ1Tk", title: "શું તમારાં બાળકના દાંત સડી ગયા છે?", kind: "education", language: "Gujarati", format: "short", treatmentSlug: "kids-dentistry-surat" },
  { id: "ZNOLH08MzmA", title: "Happy patient: denture insertion", kind: "patient", language: "English", format: "short", treatmentSlug: "dental-implants-surat" },
  { id: "17PZgdSYDhI", title: "Electric toothbrush", kind: "education", language: "English", format: "short" },
  { id: "zhckIc961TQ", title: "બાળકોમાં દાંત આવવાના લક્ષણો અને તેનાથી રાહત", kind: "education", language: "Gujarati", format: "short", treatmentSlug: "kids-dentistry-surat" },
  { id: "7s16NAjttgs", title: "ગર્ભાવસ્થા દરમિયાન મોંની આરોગ્ય સંભાળ", kind: "education", language: "Gujarati", format: "short" },
  { id: "eex02jLikGk", title: "Happy patient from London", kind: "patient", language: "English", format: "short" },
  { id: "QBhNxSVO8JE", title: "The link between mouth and body", kind: "education", language: "English", format: "short" },
  { id: "0IL5cqTAJU0", title: "The best alternative for flossing is flossing", kind: "education", language: "English", format: "short" },
  { id: "OizBmbJSTx8", title: "Water flossers", kind: "education", language: "English", format: "short" },
  { id: "4vDOPUsq9rE", title: "Toothpicks are not ideal for cleaning teeth", kind: "education", language: "English", format: "short" },
  { id: "RNzkMMtnp54", title: "Patient reviews", kind: "patient", language: "English", format: "short" },
  { id: "arnvOxItYtg", title: "When the dentist brings out the injections", kind: "clinic", language: "English", format: "short" },
  { id: "JRav8XeIAE4", title: "Happy patient", kind: "patient", language: "English", format: "short" },
  { id: "dagT840ilgA", title: "Happy patient", kind: "patient", language: "English", format: "short" },
  { id: "cq-X6tNSLqs", title: "Brush before or after breakfast?", kind: "education", language: "English", format: "short" },
  // Longer videos
  { id: "YWrQsR2XtQA", title: "Inside Kheni Dental & Elite Implant Center", kind: "clinic", language: "English", format: "video" },
  { id: "HtryMP7Kpc8", title: "Tooth structure and types, with Dr. Jinal (દાંતની રચના અને તેના પ્રકાર)", kind: "education", language: "Gujarati", format: "video", doctorSlug: "dr-jinal-monapara" },
  { id: "8AO6uXi_kFQ", title: "Dental bridge or implant, with Dr. Jinal", kind: "education", language: "Gujarati", format: "video", doctorSlug: "dr-jinal-monapara", treatmentSlug: "dental-implants-surat" },
  { id: "7HeQlhNlrIQ", title: "Stains and home remedies, with Dr. Jinal", kind: "education", language: "Gujarati", format: "video", doctorSlug: "dr-jinal-monapara", treatmentSlug: "cosmetic-smile-dentistry" },
  { id: "yqLP35_2eBM", title: "દાંતના ડોક્ટરની મુલાકાત ક્યારે લેવી?", kind: "education", language: "Gujarati", format: "video", treatmentSlug: "dental-check-up-surat" },
  { id: "-TQkU4fT6yo", title: "દાંત સાફ કરાવવા જોઈએ કે ના જોઈએ?", kind: "education", language: "Gujarati", format: "video", treatmentSlug: "gum-care-surat" },
  { id: "rDWbpPf3tvU", title: "ફ્લોસિંગ શું છે? ફ્લોસિંગ કેવી રીતે કરવું?", kind: "education", language: "Gujarati", format: "video", treatmentSlug: "gum-care-surat" },
  { id: "Ptake9L3jpk", title: "बच्चों के दांतों में कैविटी को न करें इग्नोर", kind: "education", language: "Hindi", format: "video", treatmentSlug: "kids-dentistry-surat" },
  { id: "GqOmIac8fXs", title: "गर्भावस्था के दौरान दांत की तकलीफ से कैसे बचें", kind: "education", language: "Hindi", format: "video" },
  { id: "7n0mOTFirzI", title: "Our happy patient from the USA", kind: "patient", language: "English", format: "video" },
];

export const shortsOnly = clinicVideos.filter((v) => v.format === "short");
export const videosFor = (filter: Partial<Pick<ClinicVideo, "kind" | "treatmentSlug" | "doctorSlug" | "format">>, limit = 6) =>
  clinicVideos
    .filter((v) => (filter.kind ? v.kind === filter.kind : true))
    .filter((v) => (filter.format ? v.format === filter.format : true))
    .filter((v) => (filter.treatmentSlug ? v.treatmentSlug === filter.treatmentSlug : true))
    .filter((v) => (filter.doctorSlug ? v.doctorSlug === filter.doctorSlug : true))
    .slice(0, limit);

export const posterUrl = (v: ClinicVideo) => (v.format === "short" ? `https://i.ytimg.com/vi/${v.id}/oardefault.jpg` : `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`);
export const posterFallbackUrl = (v: ClinicVideo) => `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
export const watchUrl = (v: ClinicVideo) => (v.format === "short" ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`);
