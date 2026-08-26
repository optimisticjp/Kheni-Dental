"use client";

import { motion, useReducedMotion } from "motion/react";

import { defaultTransition } from "@/lib/motion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating. Useful for gentle sequencing. */
  delay?: number;
  /** Rise distance in px. Defaults to 12. */
  y?: number;
  /** Render tag. Defaults to `div`. */
  as?: "div" | "section" | "span" | "li";
};

/**
 * Small, isolated entrance animation: fade + subtle rise on mount.
 *
 * This is the ONLY place Motion runs on the starter homepage. Keeping the
 * animated surface tiny means the heavy `motion/react` runtime is only pulled
 * into a leaf Client Component, while the page around it stays Server-rendered.
 *
 * Respects reduced motion: when the user prefers reduced motion, it renders the
 * resting state immediately with no transform or transition.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 12,
  as = "div",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </MotionTag>
  );
}
