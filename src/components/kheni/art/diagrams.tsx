import { cn } from "@/lib/utils";

/**
 * Educational diagrams, drawn as original SVG with the labels in HTML.
 *
 * WHY THE LABELS ARE NOT INSIDE THE SVG
 * The previous implant diagram put 11px text inside a scaled SVG, which was
 * unreadable on a phone. Here the drawing carries numbered markers and the
 * names live in a real list beside it (desktop) or under it (mobile), in
 * normal-sized text a patient can read without zooming. Colour coding is
 * repeated as a swatch next to each name, so colour is never the only cue.
 *
 * Both diagrams answer one question: "what part of my tooth is being treated?"
 * They are schematic, not surgical.
 */

type Part = { n: number; name: string; note: string; swatch: string };

function Legend({ parts, className }: { parts: Part[]; className?: string }) {
  return (
    <ol className={cn("grid gap-2", className)}>
      {parts.map((part) => (
        <li key={part.n} className="flex items-start gap-3 rounded-xl bg-white/80 px-3 py-2.5 ring-1 ring-line">
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-[.72rem] font-bold text-ink"
            style={{ background: part.swatch }}
          >
            {part.n}
          </span>
          <span>
            <span className="block text-[.9375rem] font-semibold leading-tight">{part.name}</span>
            <span className="t-small block text-ink-soft">{part.note}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Marker({ x, y, n, swatch }: { x: number; y: number; n: number; swatch: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="13" fill={swatch} stroke="#ffffff" strokeWidth="3" />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" fontFamily="var(--font-inter), sans-serif">
        {n}
      </text>
    </g>
  );
}

const implantParts: Part[] = [
  { n: 1, name: "Crown", note: "The tooth you see and chew with", swatch: "var(--sky-soft)" },
  { n: 2, name: "Gum line", note: "Where the soft tissue meets the tooth", swatch: "var(--coral-soft)" },
  { n: 3, name: "Abutment", note: "The connector between crown and post", swatch: "var(--gold-soft)" },
  { n: 4, name: "Implant post", note: "Placed in the bone, it holds everything", swatch: "var(--cobalt-soft)" },
  { n: 5, name: "Jawbone", note: "Bonds with the post and carries the load", swatch: "var(--amber-soft)" },
];

export function ImplantDiagram({ className }: { className?: string }) {
  return (
    <figure className={cn("grid gap-5 md:grid-cols-[1fr_15rem] md:items-center lg:gap-8", className)}>
      <svg
        viewBox="0 0 320 360"
        role="img"
        aria-labelledby="implant-diagram-title implant-diagram-desc"
        className="mx-auto w-full max-w-[22rem] md:max-w-none"
        focusable="false"
      >
        <title id="implant-diagram-title">How an implant-supported tooth is put together</title>
        <desc id="implant-diagram-desc">
          A cross-section with five numbered parts: the crown on top, the gum line, the abutment connecting the
          crown to the post, the implant post placed in the jawbone, and the jawbone around it.
        </desc>
        <defs>
          <pattern id="bone-dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.4" fill="var(--amber)" opacity=".5" />
          </pattern>
        </defs>

        {/* bone */}
        <path d="M30 196c40-18 80-24 130-24s90 6 130 24v150H30z" fill="var(--amber-tint)" />
        <path d="M30 196c40-18 80-24 130-24s90 6 130 24v150H30z" fill="url(#bone-dots)" />
        {/* neighbouring teeth, faint */}
        <path d="M46 176c-2-30 6-56 22-56s24 26 22 56" fill="#ffffff" stroke="var(--line-strong)" strokeWidth="2" />
        <path d="M230 176c-2-30 6-56 22-56s24 26 22 56" fill="#ffffff" stroke="var(--line-strong)" strokeWidth="2" />
        {/* gum */}
        <path d="M30 186c40-18 80-24 130-24s90 6 130 24v22c-40-16-80-22-130-22s-90 6-130 22z" fill="var(--coral-soft)" />
        <path d="M30 186c40-18 80-24 130-24s90 6 130 24" stroke="var(--coral)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* implant post */}
        <path d="M138 206h44v96c0 16-10 26-22 30-12-4-22-14-22-30z" fill="var(--cobalt)" />
        {[222, 238, 254, 270, 286].map((y) => (
          <path key={y} d={`M141 ${y}h38`} stroke="#ffffff" strokeWidth="3" opacity=".85" />
        ))}
        {/* abutment */}
        <path d="M142 170h36l-4 38h-28z" fill="var(--gold)" />
        {/* crown */}
        <path d="M160 52c-34 0-52 22-48 60 2 20 10 40 20 60h56c10-20 18-40 20-60 4-38-14-60-48-60z" fill="#ffffff" stroke="var(--sky-text)" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M128 172c10 6 54 6 64 0" stroke="var(--sky-text)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M140 92q20 14 40 0" stroke="var(--sky-soft)" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* numbered markers */}
        <Marker x={230} y={96} n={1} swatch="var(--sky-soft)" />
        <Marker x={72} y={196} n={2} swatch="var(--coral-soft)" />
        <Marker x={214} y={190} n={3} swatch="var(--gold-soft)" />
        <Marker x={214} y={262} n={4} swatch="var(--cobalt-soft)" />
        <Marker x={80} y={300} n={5} swatch="var(--amber-soft)" />
      </svg>
      <Legend parts={implantParts} />
    </figure>
  );
}

const toothParts: Part[] = [
  { n: 1, name: "Enamel", note: "The hard outer shell", swatch: "var(--sky-soft)" },
  { n: 2, name: "Dentin", note: "The softer layer underneath", swatch: "var(--sunshine-soft)" },
  { n: 3, name: "Pulp", note: "Nerve and blood supply, in the centre", swatch: "var(--coral-soft)" },
  { n: 4, name: "Root canal", note: "The part cleaned and sealed in a root canal", swatch: "var(--teal-soft)" },
  { n: 5, name: "Gum and bone", note: "What holds the tooth in place", swatch: "var(--amber-soft)" },
];

export function ToothAnatomyDiagram({ className }: { className?: string }) {
  return (
    <figure className={cn("grid gap-5 md:grid-cols-[1fr_15rem] md:items-center lg:gap-8", className)}>
      <svg
        viewBox="0 0 320 360"
        role="img"
        aria-labelledby="tooth-diagram-title tooth-diagram-desc"
        className="mx-auto w-full max-w-[22rem] md:max-w-none"
        focusable="false"
      >
        <title id="tooth-diagram-title">Inside a tooth</title>
        <desc id="tooth-diagram-desc">
          A cross-section of a molar with five numbered parts: enamel on the outside, dentin beneath it, the pulp in
          the centre, the root canals running down the roots, and the gum and bone holding the tooth.
        </desc>
        <defs>
          <pattern id="bone-dots-2" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.4" fill="var(--amber)" opacity=".5" />
          </pattern>
        </defs>
        {/* bone and gum */}
        <path d="M20 206c40-16 90-22 140-22s100 6 140 22v150H20z" fill="var(--amber-tint)" />
        <path d="M20 206c40-16 90-22 140-22s100 6 140 22v150H20z" fill="url(#bone-dots-2)" />
        <path d="M20 196c40-16 90-22 140-22s100 6 140 22v22c-40-14-90-20-140-20s-100 6-140 20z" fill="var(--coral-soft)" />
        <path d="M20 196c40-16 90-22 140-22s100 6 140 22" stroke="var(--coral)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* enamel */}
        <path d="M160 44c-44 0-66 26-62 70 2 22 10 46 18 66l6 80c1 14 20 14 22 0l6-40 6 40c2 14 21 14 22 0l6-80c8-20 16-44 18-66 4-44-18-70-62-70z" fill="var(--sky-soft)" stroke="var(--sky-text)" strokeWidth="3" strokeLinejoin="round" />
        {/* dentin */}
        <path d="M160 66c-30 0-46 20-42 54 2 18 8 36 14 52l6 70c1 8 12 8 13 0l9-46 9 46c1 8 12 8 13 0l6-70c6-16 12-34 14-52 4-34-12-54-42-54z" fill="var(--sunshine-soft)" />
        {/* pulp */}
        <path d="M160 100c-14 0-22 10-20 26 1 8 5 16 8 22l4 20h16l4-20c3-6 7-14 8-22 2-16-6-26-20-26z" fill="var(--coral)" opacity=".85" />
        {/* root canals */}
        <path d="M148 168l-8 60M172 168l8 60" stroke="var(--teal)" strokeWidth="7" strokeLinecap="round" />
        <path d="M148 168l-8 60M172 168l8 60" stroke="var(--teal-text)" strokeWidth="2" strokeLinecap="round" opacity=".6" />

        <Marker x={236} y={88} n={1} swatch="var(--sky-soft)" />
        <Marker x={92} y={132} n={2} swatch="var(--sunshine-soft)" />
        <Marker x={218} y={140} n={3} swatch="var(--coral-soft)" />
        <Marker x={222} y={236} n={4} swatch="var(--teal-soft)" />
        <Marker x={62} y={288} n={5} swatch="var(--amber-soft)" />
      </svg>
      <Legend parts={toothParts} />
    </figure>
  );
}

/**
 * Surat on a globe, with a flight path arriving. Abstract on purpose: no
 * country list, no flags, nothing the clinic has not confirmed.
 */
export function GlobeSurat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" className={cn("block", className)} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="globe-clip">
          <circle cx="160" cy="170" r="120" />
        </clipPath>
      </defs>
      <circle cx="160" cy="170" r="120" fill="var(--cobalt-tint)" />
      <g clipPath="url(#globe-clip)" stroke="var(--cobalt-soft)" strokeWidth="2" fill="none">
        <ellipse cx="160" cy="170" rx="50" ry="120" />
        <ellipse cx="160" cy="170" rx="95" ry="120" />
        <path d="M40 130h240M40 210h240M30 170h260" />
      </g>
      {/* an abstract landmass, roughly the subcontinent */}
      <path
        d="M170 116c14 4 26 4 34 14 6 8 4 20 2 30-4 18-10 34-18 48-6 10-12 20-20 24-6-10-10-24-12-38-2-16-8-30-14-42-4-10-2-22 6-30 6-6 14-8 22-6z"
        fill="var(--mint-soft)"
        stroke="var(--mint-text)"
        strokeWidth="2"
        opacity=".9"
      />
      {/* flight path */}
      <path d="M30 70C80 40 120 60 150 118" stroke="var(--coral)" strokeWidth="3" strokeDasharray="6 8" fill="none" strokeLinecap="round" />
      <g transform="translate(24 62) rotate(28)">
        <path d="M0 6l24-6-6 8 6 8z" fill="var(--coral)" />
      </g>
      {/* Surat marker */}
      <g transform="translate(152 122)">
        <path d="M0-22c-9 0-16 7-16 16 0 12 16 30 16 30s16-18 16-30c0-9-7-16-16-16z" fill="var(--cobalt)" stroke="#ffffff" strokeWidth="3" />
        <circle cx="0" cy="-6" r="6" fill="#ffffff" />
      </g>
      <rect x="182" y="106" width="60" height="26" rx="13" fill="#ffffff" stroke="var(--line-strong)" />
      <text x="212" y="123" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" fontFamily="var(--font-inter), sans-serif">
        Surat
      </text>
      <path d="M262 236l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="var(--sunshine)" />
      <path d="M46 250l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="var(--sunshine)" />
    </svg>
  );
}
