/**
 * Video from the clinic's own YouTube channel.
 *
 * Every entry is a real, public video on "Kheni Dental & Elite Implant
 * Center" (https://www.youtube.com/channel/UCA4ralOJwb8mrttegjyZcEQ),
 * checked against the channel's Shorts and Videos tabs on 13 September
 * 2026. The ten older links printed on page 50 of the clinic form were all
 * unavailable on 14 September 2026 and are not listed. Titles are the clinic's own, trimmed of emoji and hashtags, or a
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
  { id: "HtryMP7Kpc8", title: "Tooth structure and types, with Dr. Jinali (દાંતની રચના અને તેના પ્રકાર)", kind: "education", language: "Gujarati", format: "video", doctorSlug: "dr-jinali-monpara" },
  { id: "8AO6uXi_kFQ", title: "Dental bridge or implant, with Dr. Jinali", kind: "education", language: "Gujarati", format: "video", doctorSlug: "dr-jinali-monpara", treatmentSlug: "dental-implants-surat" },
  { id: "7HeQlhNlrIQ", title: "Stains and home remedies, with Dr. Jinali", kind: "education", language: "Gujarati", format: "video", doctorSlug: "dr-jinali-monpara", treatmentSlug: "cosmetic-smile-dentistry" },
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

/**
 * Poster candidates for one video, best first. The card walks down this list
 * as each one fails to load.
 *
 * YouTube names its thumbnails, and not every name exists for every video:
 *
 *   oardefault     the tall 9:16 crop, made only for Shorts, and only for
 *                  some of them. Ten of our sixteen Shorts return 404 for
 *                  it. When it does exist it is 1080 x 1920 and it is the
 *                  right shape for a 9:16 card, so it is worth asking for.
 *   maxresdefault  1280 x 720, generated when the source was 720p or above.
 *                  Present for all twenty-six of ours, checked one by one.
 *   hqdefault      480 x 360. YouTube makes this for everything, so it is
 *                  the floor. Soft at card size, which is why it is last.
 *
 * A Short's 16:9 thumbnail is the vertical frame pillarboxed, so `object-cover`
 * in a 9:16 card crops the bars off and lands on the right picture. The
 * fallback is a real fallback, not a compromise.
 *
 * This used to be two functions feeding a `<picture>` with one `<source>`.
 * That does not work: `<picture>` picks a source by `type` and `media`, and
 * once it has picked one a 404 is just a broken image. The `<img>` inside is
 * the final candidate, not an error handler. So ten Shorts rendered as broken
 * image boxes. Walking this list on the img's `error` event is the fix.
 */
export const posterCandidates = (v: ClinicVideo): string[] => {
  const thumb = (name: string) => `https://i.ytimg.com/vi/${v.id}/${name}.jpg`;
  return v.format === "short"
    ? [thumb("oardefault"), thumb("maxresdefault"), thumb("hqdefault")]
    : [thumb("maxresdefault"), thumb("hqdefault")];
};
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
export const watchUrl = (v: ClinicVideo) => (v.format === "short" ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`);
