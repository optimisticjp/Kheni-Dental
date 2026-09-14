import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Hue } from "@/content/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Whether type on this mood's fill is white (dark field) or ink. */
export const isDarkHue = (hue: Hue) => hue === "blue" || hue === "ink";

/**
 * A full colour field in a mood: background, type colour and the on-* class
 * that tunes highlights, eyebrows and muted text for that field.
 */
export function fieldClass(hue: Hue) {
  return `mood-${hue} bg-m-fill text-m-on ${isDarkHue(hue) ? "on-dark" : `on-${hue}`}`;
}

/** Just the mood, for a light section whose accents take the hue. */
export const moodClass = (hue: Hue) => `mood-${hue}`;
