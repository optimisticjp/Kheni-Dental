/**
 * Shared Motion presets.
 *
 * Small, reusable variants and transitions so animated Client Components stay
 * consistent and subtle. Keep animations light: short durations, small
 * offsets, gentle easing. Motion should support the content, not perform.
 *
 * Import these into Client Components only (any file using them must be
 * `"use client"`). Server Components must not import Motion.
 *
 * Reduced motion: `motion/react`'s `useReducedMotion()` is the source of truth
 * inside Motion components — when it returns true, render the resting state
 * instead of animating. See `src/components/ui/fade-in.tsx` for the pattern.
 */
import type { Transition, Variants } from "motion/react";

/** Gentle "ease-out expo"-style curve used across the starter. */
export const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

/** Default transition for entrance animations. */
export const defaultTransition: Transition = {
  duration: 0.5,
  ease: easeOut,
};

/** Fade up: subtle opacity + small vertical rise. The house default. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

/** Plain fade with no movement. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Stagger container: children with `fadeInUp` animate in sequence.
 * Pair with `staggerItem` on each child.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Item variant for use inside a `staggerContainer`. */
export const staggerItem: Variants = fadeInUp;
