# Demo content

Everything in this folder is **invented**. It exists so the site can be
designed and reviewed as a finished thing instead of a set of empty frames,
and it is meant to be deleted or replaced before launch.

None of it describes a real Kheni Dental patient, case or outcome.

## How it is kept off a live site

`NEXT_PUBLIC_DEMO_CONTENT` controls it. It defaults to **on**, because the
whole point is to see the site full.

`src/content/__checks__/demo-content.check.ts` runs at build time and **fails
the build** if demo content is active while `NEXT_PUBLIC_ALLOW_INDEXING=true`.
It is not possible to launch an indexable site carrying invented patient
testimonials by forgetting a flag.

## How to replace it

Each file here mirrors a real content type. Move an entry into the real file
(`src/content/patient-stories.ts`, `src/content/cases.ts`,
`src/content/clinic-proof.ts`) with the real details and consent recorded, and
delete it from here. When the folder is empty, set
`NEXT_PUBLIC_DEMO_CONTENT=false` and the guard stops complaining.
