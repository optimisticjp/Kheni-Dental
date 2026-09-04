/**
 * Video from the clinic.
 *
 * Every entry here is a real, public YouTube Short published on the clinic's
 * own channel, "Kheni Dental & Elite Implant Center"
 * (https://www.youtube.com/channel/UCA4ralOJwb8mrttegjyZcEQ), discovered on
 * 3 September 2026. Titles are the clinic's own, lightly trimmed of emoji.
 *
 * Nothing is rehosted. The site shows YouTube's own poster frame and only
 * loads the player, on the privacy-enhanced domain, after a tap.
 *
 * Do not add a video that is not on the clinic's channel. Do not describe a
 * patient beyond what the clinic's own title says.
 */

export type ClinicVideo = {
  /** YouTube video id. */
  id: string;
  title: string;
  kind: "education" | "patient" | "clinic";
  language: "English" | "Gujarati";
  /** Optional treatment slug the video relates to. */
  treatmentSlug?: string;
};

export const youtubeChannelUrl = "https://www.youtube.com/channel/UCA4ralOJwb8mrttegjyZcEQ";

export const clinicVideos: ClinicVideo[] = [
  { id: "dAIDO0JcosU", title: "Brushing during braces treatment", kind: "education", language: "English", treatmentSlug: "braces-clear-aligners" },
  { id: "ifBJw4RQ1Tk", title: "શું તમારાં બાળકના દાંત સડી ગયા છે?", kind: "education", language: "Gujarati", treatmentSlug: "kids-dentistry-surat" },
  { id: "ZNOLH08MzmA", title: "Happy patient: denture insertion", kind: "patient", language: "English" },
  { id: "17PZgdSYDhI", title: "Electric toothbrush", kind: "education", language: "English" },
  { id: "zhckIc961TQ", title: "બાળકોમાં દાંત આવવાના લક્ષણો અને તેનાથી રાહત", kind: "education", language: "Gujarati", treatmentSlug: "kids-dentistry-surat" },
  { id: "7s16NAjttgs", title: "ગર્ભાવસ્થા દરમિયાન મોંની આરોગ્ય સંભાળ", kind: "education", language: "Gujarati" },
  { id: "eex02jLikGk", title: "Happy patient from London", kind: "patient", language: "English" },
  { id: "QBhNxSVO8JE", title: "The link between mouth and body", kind: "education", language: "English" },
  { id: "0IL5cqTAJU0", title: "The best alternative for flossing is flossing", kind: "education", language: "English" },
  { id: "OizBmbJSTx8", title: "Water flossers", kind: "education", language: "English" },
  { id: "4vDOPUsq9rE", title: "Toothpicks are not ideal for cleaning teeth", kind: "education", language: "English" },
  { id: "RNzkMMtnp54", title: "Patient reviews", kind: "patient", language: "English" },
];

export const posterUrl = (id: string) => `https://i.ytimg.com/vi/${id}/oardefault.jpg`;
export const posterFallbackUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
export const watchUrl = (id: string) => `https://www.youtube.com/shorts/${id}`;
