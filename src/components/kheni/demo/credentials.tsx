import { GraduationCap, Users } from "lucide-react";

import { demoCredentialBySlug } from "@/content/demo";
import { cn } from "@/lib/utils";

/**
 * Invented qualifications and memberships, attached to real, named dentists.
 *
 * This is the single highest-risk item in the demo layer and the first thing
 * to replace: the four dentists at Kheni Dental hold B.D.S. degrees, and
 * nothing below is confirmed. It renders only while the demo flag is on, and
 * the build refuses to enable indexing while that is true.
 */
export function DoctorCredentials({ doctorSlug, className }: { doctorSlug: string; className?: string }) {
  const credential = demoCredentialBySlug[doctorSlug];
  if (!credential) return null;

  return (
    <div className={cn("rounded-[1.25rem] border border-line bg-white p-5", className)}>
      <p className="font-serif text-lg font-semibold text-ink">{credential.credentials}</p>

      <p className="t-eyebrow mt-4 flex items-center gap-1.5 text-h-text">
        <GraduationCap className="size-3.5" aria-hidden="true" />
        Qualifications
      </p>
      <ul className="mt-2 space-y-1.5">
        {credential.qualifications.map((item) => (
          <li key={item} className="flex gap-2 text-[.8125rem] leading-snug text-ink-soft">
            <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-h-fill" />
            {item}
          </li>
        ))}
      </ul>

      <p className="t-eyebrow mt-4 flex items-center gap-1.5 text-h-text">
        <Users className="size-3.5" aria-hidden="true" />
        Memberships
      </p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {credential.memberships.map((item) => (
          <li key={item} className="rounded-full bg-h-tint px-2.5 py-1 text-[.72rem] font-semibold text-h-text">{item}</li>
        ))}
      </ul>
    </div>
  );
}
