"use client";

import { useSyncExternalStore } from "react";

/**
 * Reduced-motion helper.
 *
 * Returns `true` when the user has requested reduced motion at the OS level
 * (`prefers-reduced-motion: reduce`). Use it to skip or shorten JS-driven
 * animations in Client Components.
 *
 * Implemented with `useSyncExternalStore` so it subscribes to the media query
 * without calling `setState` inside an effect. It returns `false` during SSR
 * and initial hydration (matching the server render), then reflects the real
 * value and stays in sync if the preference changes.
 *
 * Note: motion's own `useReducedMotion()` (from `motion/react`) is preferred
 * inside Motion components. This hook exists for non-Motion code — CSS-driven
 * transitions, conditional rendering, autoplay guards, etc. Purely CSS
 * animations are already handled by the global rule in `globals.css`.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
