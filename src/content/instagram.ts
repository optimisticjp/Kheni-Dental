/**
 * Instagram, @khenielite.
 *
 * Every entry is a real, public Reel on the clinic's own account
 * (https://www.instagram.com/khenielite). Nothing is rehosted and nothing
 * is embedded at page load: a card shows the clinic's own poster frame,
 * saved under public/images/instagram/, and opens the exact Reel on
 * Instagram when tapped.
 *
 * Why link out rather than embed: Instagram's embed loads its own script,
 * cookies and tracking into the page, and refuses some Reels outright
 * (one of the clinic's is marked "not embeddable"). A poster and an exact
 * link is faster on a phone, honest, and never silently empty.
 *
 * Rules that must survive edits:
 *   - Only content published by @khenielite. Never another account's media.
 *   - Titles describe what the clip shows. They never repeat a caption's
 *     claim and never name a person the clinic has not named.
 *   - No follower counts unless the clinic asks for them and they are checked.
 *   - `poster` is the clinic's own frame. If it is missing the card still
 *     renders on a colour field with the title, so Instagram is never gone.
 *
 * Inventory taken from the public profile on 13 September 2026. The
 * profile is public with several hundred posts; only Reels whose pages
 * were opened and checked are listed here. Add to this list as the clinic
 * posts, with the shortcode from the Reel's own URL.
 */

import type { Hue } from "@/content/site";

export type Reel = {
  id: string;
  /** The Instagram shortcode from the Reel's URL. */
  shortcode: string;
  /** Exact public URL of the Reel. */
  url: string;
  /** Short title, in the site's voice, describing what the clip shows. */
  title: string;
  /** One line of context. Optional. */
  summary?: string;
  category: "doctor" | "kids" | "clinic" | "implants" | "patient" | "education" | "smile";
  language: "Gujarati" | "Hindi" | "English" | "Mixed";
  /** Month the clinic posted it. */
  posted: string;
  doctorSlug?: string;
  treatmentSlug?: string;
  /** Local poster image path (public/). A -360w variant sits beside it. */
  poster?: string;
  posterAlt?: string;
  /** Where the subject sits in the 9:16 frame. */
  objectPosition?: string;
  hue: Hue;
  featured?: boolean;
  account: "khenielite";
};

export const instagramHandle = "@khenielite";
export const instagramUrl = "https://www.instagram.com/khenielite/";
export const instagramReelsUrl = "https://www.instagram.com/khenielite/reels/";

export const instagramReels: Reel[] = [
  {
    id: "kids-camp",
    shortcode: "DO0n03ykk5a",
    url: "https://www.instagram.com/reel/DO0n03ykk5a/",
    title: "Children's dental camp at Akshardham School",
    summary: "A Kheni dentist checking children's teeth at a school camp in Surat.",
    category: "kids",
    language: "English",
    posted: "September 2025",
    treatmentSlug: "kids-dentistry-surat",
    poster: "/images/instagram/DO0n03ykk5a.jpg",
    posterAlt: "A dentist in a white coat shines a small torch into a young girl's mouth at a school dental camp",
    objectPosition: "center 30%",
    hue: "amber",
    featured: true,
    account: "khenielite",
  },
  {
    id: "consultation-desk",
    shortcode: "C0BRyrdJCIu",
    url: "https://www.instagram.com/reel/C0BRyrdJCIu/",
    title: "At the consultation desk",
    summary: "How a visit starts: a conversation across the desk before anything else.",
    category: "clinic",
    language: "English",
    posted: "November 2023",
    poster: "/images/instagram/C0BRyrdJCIu.jpg",
    posterAlt: "A dentist in a white coat seated at a consultation desk, explaining something with her hands",
    objectPosition: "center 35%",
    hue: "coral",
    featured: true,
    account: "khenielite",
  },
  {
    id: "in-the-chair",
    shortcode: "C0DxQZ-JuO2",
    url: "https://www.instagram.com/reel/C0DxQZ-JuO2/",
    title: "Treatment in progress at Kheni",
    summary: "A close look at a dentist working, from the clinic's own camera.",
    category: "clinic",
    language: "English",
    posted: "November 2023",
    treatmentSlug: "dental-implants-surat",
    poster: "/images/instagram/C0DxQZ-JuO2.jpg",
    posterAlt: "A masked dentist leans in close over a patient, working under a bright light",
    objectPosition: "center 40%",
    hue: "sky",
    featured: true,
    account: "khenielite",
  },
  {
    id: "young-patient",
    shortcode: "C0eOsV5JDeO",
    url: "https://www.instagram.com/reel/C0eOsV5JDeO/",
    title: "A young patient in the chair",
    summary: "A child settled in the chair with a dentist beside him.",
    category: "kids",
    language: "English",
    posted: "December 2023",
    treatmentSlug: "kids-dentistry-surat",
    poster: "/images/instagram/C0eOsV5JDeO.jpg",
    posterAlt: "A dentist in a white coat rests a hand on the shoulder of a boy lying back in a dental chair",
    objectPosition: "center 40%",
    hue: "mint",
    featured: true,
    account: "khenielite",
  },
  {
    id: "close-work",
    shortcode: "C0GzY-xpoJE",
    url: "https://www.instagram.com/reel/C0GzY-xpoJE/",
    title: "Close work under the light",
    summary: "Inside a treatment room at Kheni Dental.",
    category: "clinic",
    language: "English",
    posted: "November 2023",
    poster: "/images/instagram/C0GzY-xpoJE.jpg",
    posterAlt: "A dentist in glasses and a mask bends over a patient with a mirror and probe in hand",
    objectPosition: "center 30%",
    hue: "sky",
    featured: true,
    account: "khenielite",
  },
];

export const featuredReels = (limit = 8) => {
  const featured = instagramReels.filter((r) => r.featured);
  return (featured.length ? featured : instagramReels).slice(0, limit);
};

export const reelsFor = (filter: Partial<Pick<Reel, "category" | "doctorSlug" | "treatmentSlug">>, limit = 3) =>
  instagramReels
    .filter((r) => (filter.category ? r.category === filter.category : true))
    .filter((r) => (filter.doctorSlug ? r.doctorSlug === filter.doctorSlug : true))
    .filter((r) => (filter.treatmentSlug ? r.treatmentSlug === filter.treatmentSlug : true))
    .slice(0, limit);

export const reelPosterSrcSet = (poster?: string) => (poster ? `${poster.replace(/\.jpg$/, "-360w.jpg")} 360w, ${poster} 540w` : undefined);
