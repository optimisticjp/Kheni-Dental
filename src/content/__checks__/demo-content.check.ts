import { demoContentActive } from "@/content/demo";

/**
 * Invented content must never be indexable.
 *
 * The site currently carries demo patient testimonials, demo case results and
 * demo volume figures so it can be designed and reviewed as a finished thing.
 * None of it describes a real patient. That is fine while the site is closed
 * to search engines and being worked on, and it is not fine the moment the
 * site is opened to them: this is a real dental practice, and invented patient
 * quotes on an indexed medical site mislead people making a health decision.
 *
 * The realistic failure is not malice, it is forgetting. Someone sets
 * NEXT_PUBLIC_ALLOW_INDEXING=true on launch day and nobody remembers that the
 * testimonials were placeholders. So the two flags are checked against each
 * other here, and the build refuses rather than trusting anyone to remember.
 *
 * Imported by `src/app/layout.tsx`, so it runs on every build.
 *
 * To launch: replace the demo entries with real, consented content, then set
 * NEXT_PUBLIC_DEMO_CONTENT=false. See src/content/demo/README.md.
 */
export function assertDemoContentIsNotIndexable(): void {
  const indexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  if (demoContentActive && indexingAllowed) {
    throw new Error(
      [
        "",
        "  Refusing to build an indexable site that carries invented content.",
        "",
        "  NEXT_PUBLIC_ALLOW_INDEXING is true, and NEXT_PUBLIC_DEMO_CONTENT is",
        "  not false, so the patient testimonials, case results and volume",
        "  figures in src/content/demo/ would go live and be indexed. None of",
        "  them describes a real Kheni Dental patient.",
        "",
        "  Before launch:",
        "    1. Move real, consented content into src/content/patient-stories.ts,",
        "       src/content/cases.ts and src/content/clinic-proof.ts",
        "    2. Delete what is left in src/content/demo/",
        "    3. Set NEXT_PUBLIC_DEMO_CONTENT=false",
        "",
        "  See src/content/demo/README.md.",
        "",
      ].join("\n"),
    );
  }
}

assertDemoContentIsNotIndexable();
