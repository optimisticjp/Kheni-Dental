import { Legend, Marker, type Part } from "@/components/kheni/art/diagrams";
import { cn } from "@/lib/utils";

/**
 * Labelled anatomy, one diagram per treatment.
 *
 * The clinic asked for the textbook cross-section a patient half remembers
 * from school, drawn in the site's own colours rather than pasted in from a
 * stock library. Same rules as the two originals in diagrams.tsx: numbered
 * markers on the drawing, names in an HTML list a phone can read, colour
 * repeated as a swatch so it is never the only cue, and a title and
 * description for a screen reader.
 *
 * They are schematic. Each answers one question a patient has on that page,
 * and none is a substitute for the examination.
 */

/* ── Shared geometry ─────────────────────────────────────────────────── */

/** The molar cross-section every panel starts from, centred on x=160. */
const ENAMEL = "M160 44c-44 0-66 26-62 70 2 22 10 46 18 66l6 80c1 14 20 14 22 0l6-40 6 40c2 14 21 14 22 0l6-80c8-20 16-44 18-66 4-44-18-70-62-70z";
const DENTIN = "M160 66c-30 0-46 20-42 54 2 18 8 36 14 52l6 70c1 8 12 8 13 0l9-46 9 46c1 8 12 8 13 0l6-70c6-16 12-34 14-52 4-34-12-54-42-54z";
const PULP = "M160 100c-14 0-22 10-20 26 1 8 5 16 8 22l4 20h16l4-20c3-6 7-14 8-22 2-16-6-26-20-26z";
const CANALS = "M148 168l-8 60M172 168l8 60";

function Ground({ y = 196, gum = "var(--coral-soft)", gumLine = "var(--coral)", bone = "var(--amber-tint)", boneId = "bone" }: { y?: number; gum?: string; gumLine?: string; bone?: string; boneId?: string }) {
  const d = `M20 ${y + 10}c40-16 90-22 140-22s100 6 140 22v150H20z`;
  const g = `M20 ${y}c40-16 90-22 140-22s100 6 140 22v22c-40-14-90-20-140-20s-100 6-140 20z`;
  const l = `M20 ${y}c40-16 90-22 140-22s100 6 140 22`;
  return (
    <>
      <defs>
        <pattern id={boneId} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.4" fill="var(--amber)" opacity=".5" />
        </pattern>
      </defs>
      <path d={d} fill={bone} />
      <path d={d} fill={`url(#${boneId})`} />
      <path d={g} fill={gum} />
      <path d={l} stroke={gumLine} strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  );
}

function Molar({ enamel = "var(--sky-soft)", enamelLine = "var(--sky-text)", dentin = "var(--gold-soft)", pulp = "var(--coral)", canals = "var(--teal)", transform }: { enamel?: string; enamelLine?: string; dentin?: string; pulp?: string; canals?: string; transform?: string }) {
  return (
    <g transform={transform}>
      <path d={ENAMEL} fill={enamel} stroke={enamelLine} strokeWidth="3" strokeLinejoin="round" />
      <path d={DENTIN} fill={dentin} />
      <path d={PULP} fill={pulp} opacity=".85" />
      <path d={CANALS} stroke={canals} strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

function Figure({ id, title, desc, parts, children, viewBox = "0 0 320 360", className, wide = false }: { id: string; title: string; desc: string; parts: Part[]; children: React.ReactNode; viewBox?: string; className?: string; wide?: boolean }) {
  return (
    <figure className={cn("grid gap-5 md:items-center lg:gap-8", wide ? "md:grid-cols-[1.4fr_15rem]" : "md:grid-cols-[1fr_15rem]", className)}>
      <svg viewBox={viewBox} role="img" aria-labelledby={`${id}-t ${id}-d`} className={cn("mx-auto w-full md:max-w-none", wide ? "max-w-[30rem]" : "max-w-[22rem]")} focusable="false">
        <title id={`${id}-t`}>{title}</title>
        <desc id={`${id}-d`}>{desc}</desc>
        {children}
      </svg>
      <Legend parts={parts} />
    </figure>
  );
}

/** Small caption printed under a stage in a three-panel diagram. */
function Stage({ x, y, n, label, swatch }: { x: number; y: number; n: number; label: string; swatch: string }) {
  return (
    <g>
      <Marker x={x} y={y} n={n} swatch={swatch} />
      <text x={x} y={y + 30} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-inter), sans-serif">
        {label}
      </text>
    </g>
  );
}

/* ── 1. The full cross-section ───────────────────────────────────────── */

const toothParts: Part[] = [
  { n: 1, name: "Enamel", note: "The hard shell. Nothing in the body is harder", swatch: "var(--sky-soft)" },
  { n: 2, name: "Dentin", note: "Softer, and it feels cold and sweet", swatch: "var(--gold-soft)" },
  { n: 3, name: "Pulp", note: "Nerve and blood supply, in the centre", swatch: "var(--coral-soft)" },
  { n: 4, name: "Gum", note: "The collar of tissue around the neck of the tooth", swatch: "var(--coral-tint)" },
  { n: 5, name: "Root canal", note: "The pulp continues down each root", swatch: "var(--teal-soft)" },
  { n: 6, name: "Cementum and ligament", note: "A thin layer and tiny fibres that tie root to bone", swatch: "var(--gold-soft)" },
  { n: 7, name: "Jawbone", note: "Holds the root and carries the load of chewing", swatch: "var(--amber-soft)" },
  { n: 8, name: "Nerve and blood vessels", note: "Enter through a small opening at the root tip", swatch: "var(--violet-soft)" },
];

export function ToothSectionDiagram({ className }: { className?: string }) {
  return (
    <Figure id="tooth-section" title="Inside a tooth, front to back" desc="A cross-section of a molar with eight numbered parts: enamel, dentin, pulp, gum, the root canals, the cementum and ligament around each root, the jawbone, and the nerve and blood vessels entering at the root tips." parts={toothParts} className={className}>
      <Ground boneId="bone-ts" />
      {/* ligament and cementum, a thin gold outline around the roots below the gum */}
      <path d="M128 214l6 80M192 214l-6 80M156 214l4 26M164 214l-4 26" stroke="var(--gold)" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      <Molar />
      {/* vessels entering the root tips */}
      <path d="M138 232c-4 12-6 26-4 40M182 232c4 12 6 26 4 40" stroke="var(--violet)" strokeWidth="2.5" strokeDasharray="3 4" fill="none" strokeLinecap="round" />
      <Marker x={238} y={82} n={1} swatch="var(--sky-soft)" />
      <Marker x={90} y={126} n={2} swatch="var(--gold-soft)" />
      <Marker x={222} y={136} n={3} swatch="var(--coral-soft)" />
      <Marker x={60} y={202} n={4} swatch="var(--coral-tint)" />
      <Marker x={224} y={228} n={5} swatch="var(--teal-soft)" />
      <Marker x={106} y={250} n={6} swatch="var(--gold-soft)" />
      <Marker x={62} y={314} n={7} swatch="var(--amber-soft)" />
      <Marker x={228} y={300} n={8} swatch="var(--violet-soft)" />
    </Figure>
  );
}

/* ── 2. How deep a cavity goes ───────────────────────────────────────── */

const cariesParts: Part[] = [
  { n: 1, name: "In the enamel", note: "No pain yet. A small filling, one visit", swatch: "var(--sky-soft)" },
  { n: 2, name: "Into the dentin", note: "Cold and sweet start to sting. Still a filling", swatch: "var(--gold-soft)" },
  { n: 3, name: "Reaching the pulp", note: "Aching, often at night. Now it is a root canal", swatch: "var(--coral-soft)" },
];

export function CariesDiagram({ className }: { className?: string }) {
  const decay = (d: string) => <path d={d} fill="var(--ink)" opacity=".55" />;
  return (
    <Figure id="caries" title="A cavity at three depths" desc="Three molars side by side. In the first, decay sits only in the enamel. In the second it has reached the dentin. In the third it has reached the pulp in the centre of the tooth." parts={cariesParts} viewBox="0 0 480 330" wide className={className}>
      <defs>
        <pattern id="bone-cd" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.4" fill="var(--amber)" opacity=".5" />
        </pattern>
      </defs>
      <path d="M0 210h480v120H0z" fill="var(--amber-tint)" />
      <path d="M0 210h480v120H0z" fill="url(#bone-cd)" />
      <path d="M0 190h480v24H0z" fill="var(--coral-soft)" />
      <path d="M0 190h480" stroke="var(--coral)" strokeWidth="3" />
      {[0, 160, 320].map((dx, i) => (
        <g key={dx} transform={`translate(${dx - 80} 50) scale(.72)`}>
          <Molar />
          {i === 0 && decay("M186 64c8 6 10 16 4 22-8 2-16-4-14-12 2-6 6-10 10-10z")}
          {i === 1 && decay("M184 62c12 10 16 30 4 44-14 4-28-6-26-22 2-12 12-22 22-22z")}
          {i === 2 && decay("M182 60c16 14 22 44 4 66-10 12-24 12-28-4-6-24 4-50 24-62z")}
        </g>
      ))}
      <Stage x={80} y={288} n={1} label="Enamel only" swatch="var(--sky-soft)" />
      <Stage x={240} y={288} n={2} label="Into dentin" swatch="var(--gold-soft)" />
      <Stage x={400} y={288} n={3} label="At the pulp" swatch="var(--coral-soft)" />
    </Figure>
  );
}

/* ── 3. Root canal, in three stages ──────────────────────────────────── */

const rctParts: Part[] = [
  { n: 1, name: "Infected pulp", note: "The nerve inside is inflamed. This is the ache", swatch: "var(--coral-soft)" },
  { n: 2, name: "Cleaned and shaped", note: "The pulp is removed and each canal is cleaned", swatch: "var(--teal-soft)" },
  { n: 3, name: "Sealed and crowned", note: "The canals are filled and the tooth is covered", swatch: "var(--sky-soft)" },
];

export function RootCanalStagesDiagram({ className }: { className?: string }) {
  return (
    <Figure id="rct-stages" title="A root canal, in three stages" desc="Three molars side by side. The first has an inflamed pulp shown in red. In the second the pulp chamber and canals are empty and clean. In the third the canals are filled and a crown covers the tooth." parts={rctParts} viewBox="0 0 480 330" wide className={className}>
      <defs>
        <pattern id="bone-rc" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.4" fill="var(--amber)" opacity=".5" />
        </pattern>
      </defs>
      <path d="M0 210h480v120H0z" fill="var(--amber-tint)" />
      <path d="M0 210h480v120H0z" fill="url(#bone-rc)" />
      <path d="M0 190h480v24H0z" fill="var(--coral-soft)" />
      <path d="M0 190h480" stroke="var(--coral)" strokeWidth="3" />
      {/* 1: inflamed */}
      <g transform="translate(-80 50) scale(.72)">
        <Molar pulp="var(--coral)" canals="var(--coral)" />
        <circle cx="160" cy="124" r="30" fill="var(--coral)" opacity=".25" />
        <path d="M120 160l-10 26M200 160l10 26" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" opacity=".6" />
      </g>
      {/* 2: cleaned */}
      <g transform="translate(80 50) scale(.72)">
        <Molar pulp="#ffffff" canals="#ffffff" />
        <path d={PULP} fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeDasharray="4 4" />
        <path d={CANALS} stroke="var(--teal)" strokeWidth="2.5" strokeDasharray="4 4" fill="none" strokeLinecap="round" />
      </g>
      {/* 3: sealed and crowned */}
      <g transform="translate(240 50) scale(.72)">
        <Molar pulp="var(--teal-soft)" canals="var(--teal-soft)" />
        <path d="M160 40c-40 0-62 22-60 60 1 14 6 30 12 46h96c6-16 11-32 12-46 2-38-20-60-60-60z" fill="var(--sky-soft)" stroke="var(--sky-text)" strokeWidth="3.5" strokeLinejoin="round" opacity=".95" />
        <path d="M112 146c14 6 82 6 96 0" stroke="var(--sky-text)" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
      <Stage x={80} y={288} n={1} label="Infected" swatch="var(--coral-soft)" />
      <Stage x={240} y={288} n={2} label="Cleaned" swatch="var(--teal-soft)" />
      <Stage x={400} y={288} n={3} label="Sealed" swatch="var(--sky-soft)" />
    </Figure>
  );
}

/* ── 4. Gums, in three stages ────────────────────────────────────────── */

const gumParts: Part[] = [
  { n: 1, name: "Healthy", note: "Pink, firm, sitting tight against the tooth", swatch: "var(--mint-soft)" },
  { n: 2, name: "Gingivitis", note: "Red and puffy. Bleeds when brushed. Reversible", swatch: "var(--coral-soft)" },
  { n: 3, name: "Periodontitis", note: "The gum pulls away and bone below is lost", swatch: "var(--amber-soft)" },
];

export function GumStagesDiagram({ className }: { className?: string }) {
  return (
    <Figure id="gum-stages" title="Gums, in three stages" desc="Three teeth side by side. The first has healthy pink gum fitting closely. The second has red, swollen gum with plaque at the gumline. The third shows gum that has pulled away into a pocket, with bone loss around the root." parts={gumParts} viewBox="0 0 480 330" wide className={className}>
      <defs>
        <pattern id="bone-gs" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.4" fill="var(--amber)" opacity=".5" />
        </pattern>
      </defs>
      {/* bone, stepping lower as the stages progress */}
      <path d="M0 212h160v118H0zM160 212h160v118H160zM320 250h160v80H320z" fill="var(--amber-tint)" />
      <path d="M0 212h160v118H0zM160 212h160v118H160zM320 250h160v80H320z" fill="url(#bone-gs)" />
      {/* gum bands */}
      <path d="M0 190h160v24H0z" fill="var(--mint-soft)" />
      <path d="M160 184c30-10 60-14 80-14s50 4 80 14v30H160z" fill="var(--coral)" opacity=".8" />
      <path d="M320 212h160v40H320z" fill="var(--coral-soft)" opacity=".8" />
      {/* teeth */}
      {[0, 160, 320].map((dx) => (
        <g key={dx} transform={`translate(${dx - 80} 50) scale(.72)`}>
          <Molar pulp="var(--coral-soft)" canals="var(--teal-soft)" />
        </g>
      ))}
      {/* plaque at the gumline in stage 2 */}
      <path d="M204 184q10-6 20 0M256 184q10-6 20 0" stroke="var(--gold)" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* the pocket in stage 3 */}
      <path d="M372 208c-4 14-4 30 0 42M428 208c4 14 4 30 0 42" stroke="var(--coral)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Stage x={80} y={288} n={1} label="Healthy" swatch="var(--mint-soft)" />
      <Stage x={240} y={288} n={2} label="Gingivitis" swatch="var(--coral-soft)" />
      <Stage x={400} y={296} n={3} label="Periodontitis" swatch="var(--amber-soft)" />
    </Figure>
  );
}

/* ── 5. A crown ──────────────────────────────────────────────────────── */

const crownParts: Part[] = [
  { n: 1, name: "The crown", note: "A cap shaped and shaded to match the tooth beside it", swatch: "var(--sky-soft)" },
  { n: 2, name: "The prepared tooth", note: "Trimmed to a small core so the crown can fit over it", swatch: "var(--gold-soft)" },
  { n: 3, name: "The root", note: "Left alone. The crown takes the chewing force instead", swatch: "var(--amber-soft)" },
];

export function CrownDiagram({ className }: { className?: string }) {
  return (
    <Figure id="crown" title="How a crown fits" desc="A molar trimmed to a small core below the gum line, with a crown drawn above it about to be seated." parts={crownParts} className={className}>
      <Ground boneId="bone-cr" />
      {/* prepared core and roots */}
      <path d="M128 130c-4 0-8 4-8 10v40c6 16 12 34 14 52l6 70c1 8 12 8 13 0l9-46 9 46c1 8 12 8 13 0l6-70c2-18 8-36 14-52v-40c0-6-4-10-8-10z" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={CANALS} stroke="var(--teal-soft)" strokeWidth="6" strokeLinecap="round" />
      {/* the crown, lifted */}
      <g transform="translate(0 -38)">
        <path d="M160 52c-36 0-56 22-52 58 2 14 8 28 14 40h76c6-12 12-26 14-40 4-36-16-58-52-58z" fill="#ffffff" stroke="var(--sky-text)" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M122 150c10 6 66 6 76 0" stroke="var(--sky-text)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M138 84q22 14 44 0" stroke="var(--sky-soft)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      {/* arrows showing it seating */}
      <path d="M100 124v18M220 124v18" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M94 136l6 8 6-8M214 136l6 8 6-8" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Marker x={244} y={72} n={1} swatch="var(--sky-soft)" />
      <Marker x={232} y={166} n={2} swatch="var(--gold-soft)" />
      <Marker x={80} y={292} n={3} swatch="var(--amber-soft)" />
    </Figure>
  );
}

/* ── 6. A bridge ─────────────────────────────────────────────────────── */

const bridgeParts: Part[] = [
  { n: 1, name: "Supporting teeth", note: "The teeth either side, crowned to carry the bridge", swatch: "var(--gold-soft)" },
  { n: 2, name: "The false tooth", note: "Fills the gap. Sits on the gum, not in the bone", swatch: "var(--sky-soft)" },
  { n: 3, name: "One piece", note: "All three are joined and cemented in together", swatch: "var(--gold-soft)" },
];

export function BridgeDiagram({ className }: { className?: string }) {
  const tooth = (x: number, prepared: boolean) => (
    <g transform={`translate(${x - 160} 0) scale(.62)`}>
      {prepared ? (
        <path d="M128 150c-4 0-8 4-8 10v30c6 16 12 34 14 52l6 70c1 8 12 8 13 0l9-46 9 46c1 8 12 8 13 0l6-70c2-18 8-36 14-52v-30c0-6-4-10-8-10z" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth="3" strokeLinejoin="round" />
      ) : (
        <Molar />
      )}
    </g>
  );
  return (
    <Figure id="bridge" title="How a bridge fills a gap" desc="Three connected crowns drawn above two trimmed supporting teeth with a gap between them. The outer two crowns fit over the supporting teeth; the middle one rests over the gap." parts={bridgeParts} viewBox="0 0 320 300" className={className}>
      <Ground y={186} boneId="bone-br" />
      {tooth(130, true)}
      {tooth(266, true)}
      {/* the bridge, one joined piece lifted above */}
      <g transform="translate(0 -46)">
        <path d="M96 118c0-30 14-46 34-46s34 16 34 46v34H96zM164 118c0-30 14-46 34-46s34 16 34 46v34h-68zM232 118c0-30 14-46 34-46s34 16 34 46v34h-68z" fill="#ffffff" stroke="var(--sky-text)" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M96 152h204" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
      </g>
      <path d="M130 116v14M266 116v14" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M124 124l6 8 6-8M260 124l6 8 6-8" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Marker x={130} y={206} n={1} swatch="var(--gold-soft)" />
      <Marker x={198} y={206} n={2} swatch="var(--sky-soft)" />
      <Marker x={286} y={96} n={3} swatch="var(--gold-soft)" />
    </Figure>
  );
}

/* ── 7. An impacted wisdom tooth ─────────────────────────────────────── */

const wisdomParts: Part[] = [
  { n: 1, name: "The tooth in front", note: "The second molar, fully through and doing its job", swatch: "var(--sky-soft)" },
  { n: 2, name: "The wisdom tooth", note: "Tilted forward and pressing on its neighbour", swatch: "var(--lavender-soft)" },
  { n: 3, name: "Gum flap", note: "Part covers the tooth. Food collects under it", swatch: "var(--coral-soft)" },
  { n: 4, name: "Pressure point", note: "Where the ache and the swelling usually come from", swatch: "var(--amber-soft)" },
];

export function WisdomImpactionDiagram({ className }: { className?: string }) {
  return (
    <Figure id="wisdom" title="A wisdom tooth with no room" desc="A side view of the back of the lower jaw. A second molar stands upright. Behind it a wisdom tooth lies tilted forward, its crown pressing against the second molar and partly covered by gum." parts={wisdomParts} viewBox="0 0 320 300" className={className}>
      <Ground y={176} boneId="bone-wi" />
      {/* second molar, upright */}
      <g transform="translate(-60 -12) scale(.7)">
        <Molar />
      </g>
      {/* wisdom tooth, tilted mesially (toward the front) */}
      <g transform="translate(150 60) rotate(-38 160 150) scale(.66)">
        <path d={ENAMEL} fill="var(--lavender-soft)" stroke="var(--lavender-text)" strokeWidth="3.5" strokeLinejoin="round" />
        <path d={DENTIN} fill="var(--gold-soft)" />
        <path d={PULP} fill="var(--coral-soft)" />
      </g>
      {/* the gum flap over it */}
      <path d="M194 176c20-14 46-14 70-4 6 3 6 12-2 14-24 4-46 6-70 2z" fill="var(--coral-soft)" stroke="var(--coral)" strokeWidth="2.5" />
      {/* the pressure point */}
      <circle cx="150" cy="150" r="14" fill="var(--amber)" opacity=".35" />
      <circle cx="150" cy="150" r="6" fill="var(--amber)" />
      <Marker x={118} y={34} n={1} swatch="var(--sky-soft)" />
      <Marker x={268} y={118} n={2} swatch="var(--lavender-soft)" />
      <Marker x={268} y={196} n={3} swatch="var(--coral-soft)" />
      <Marker x={112} y={162} n={4} swatch="var(--amber-soft)" />
    </Figure>
  );
}

/* ── 8. How teeth are moved ──────────────────────────────────────────── */

const alignerParts: Part[] = [
  { n: 1, name: "Before", note: "Crowded. Two front teeth overlap and one sits back", swatch: "var(--coral-soft)" },
  { n: 2, name: "The aligner", note: "A clear tray made to a shape slightly ahead of the teeth", swatch: "var(--violet-soft)" },
  { n: 3, name: "After", note: "Each tray nudges the teeth a fraction. Months of fractions", swatch: "var(--mint-soft)" },
];

function ArchTeeth({ y, offsets, fill, line }: { y: number; offsets: number[]; fill: string; line: string }) {
  // six upper front teeth seen from the front, offsets shift each one vertically to show crowding
  const xs = [70, 100, 130, 160, 190, 220];
  return (
    <g>
      {xs.map((x, i) => (
        <rect key={x} x={x - 13 + (i === 2 ? 4 : 0) + (i === 3 ? -4 : 0)} y={y + (offsets[i] ?? 0)} width="26" height={i === 2 || i === 3 ? 40 : 34} rx="9" fill={fill} stroke={line} strokeWidth="2.5" />
      ))}
    </g>
  );
}

export function AlignerMovementDiagram({ className }: { className?: string }) {
  return (
    <Figure id="aligner" title="How an aligner moves teeth" desc="Two rows of six front teeth. In the top row the teeth are crowded and overlapping. A clear tray is drawn over them. In the bottom row the same teeth sit evenly in a line." parts={alignerParts} viewBox="0 0 320 300" className={className}>
      {/* before */}
      <path d="M40 66h240" stroke="var(--coral-soft)" strokeWidth="14" strokeLinecap="round" />
      <ArchTeeth y={60} offsets={[8, 2, -6, -2, 6, 0]} fill="#ffffff" line="var(--coral)" />
      {/* the aligner: a translucent tray outline over the before row */}
      <path d="M52 56c30-12 76-16 108-16s78 4 108 16v58c-30 12-76 16-108 16s-78-4-108-16z" fill="var(--violet-soft)" opacity=".35" stroke="var(--violet)" strokeWidth="2.5" strokeDasharray="5 4" />
      {/* arrow */}
      <path d="M160 140v42" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M150 172l10 12 10-12" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* after */}
      <path d="M40 212h240" stroke="var(--mint-soft)" strokeWidth="14" strokeLinecap="round" />
      <ArchTeeth y={206} offsets={[0, 0, 0, 0, 0, 0]} fill="#ffffff" line="var(--mint-text)" />
      <Marker x={40} y={104} n={1} swatch="var(--coral-soft)" />
      <Marker x={280} y={40} n={2} swatch="var(--violet-soft)" />
      <Marker x={40} y={250} n={3} swatch="var(--mint-soft)" />
    </Figure>
  );
}

/* ── 9. A child's tooth ──────────────────────────────────────────────── */

const kidsParts: Part[] = [
  { n: 1, name: "Milk tooth", note: "Smaller, whiter, and thinner enamel that decays faster", swatch: "var(--mint-soft)" },
  { n: 2, name: "Its root", note: "Slowly dissolves as the adult tooth pushes up", swatch: "var(--gold-soft)" },
  { n: 3, name: "Adult tooth", note: "Already forming in the bone underneath, years early", swatch: "var(--sky-soft)" },
  { n: 4, name: "Why it matters", note: "Decay in the milk tooth can reach the one below", swatch: "var(--coral-soft)" },
];

export function KidsTeethDiagram({ className }: { className?: string }) {
  return (
    <Figure id="kids-teeth" title="A milk tooth and the adult tooth beneath it" desc="A cross-section showing a small milk tooth above the gum with short roots, and a larger adult tooth crown forming in the bone directly below it." parts={kidsParts} className={className}>
      <Ground y={150} boneId="bone-kd" />
      {/* the milk tooth, small, short roots */}
      <g transform="translate(46 -20) scale(.7)">
        <path d="M160 60c-36 0-52 22-48 58 2 16 8 34 14 48l4 30c1 10 14 10 15 0l4-22 5 22c1 10 14 10 15 0l4-30c6-14 12-32 14-48 4-36-12-58-48-58z" fill="var(--mint-soft)" stroke="var(--mint-text)" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M160 80c-24 0-36 16-32 42 1 12 6 26 10 38h44c4-12 9-26 10-38 4-26-8-42-32-42z" fill="var(--gold-soft)" />
        <path d="M160 104c-10 0-14 8-12 18l4 18h16l4-18c2-10-2-18-12-18z" fill="var(--coral)" opacity=".8" />
        {/* dissolving root ends, dotted */}
        <path d="M144 190l-3 16M176 190l3 16" stroke="var(--gold)" strokeWidth="4" strokeDasharray="3 4" strokeLinecap="round" />
      </g>
      {/* the adult tooth forming in the bone */}
      <g transform="translate(0 112) scale(.86)">
        <path d="M160 100c-44 0-64 26-60 70 2 18 8 34 14 48h92c6-14 12-30 14-48 4-44-16-70-60-70z" fill="var(--sky-soft)" stroke="var(--sky-text)" strokeWidth="3.5" strokeLinejoin="round" opacity=".95" />
        <path d="M160 120c-28 0-42 18-38 50 1 12 6 26 10 38h56c4-12 9-26 10-38 4-32-10-50-38-50z" fill="var(--gold-soft)" />
      </g>
      {/* arrow: the adult tooth pushing up */}
      <path d="M232 250v-44" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M224 214l8-10 8 10" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Marker x={228} y={58} n={1} swatch="var(--mint-soft)" />
      <Marker x={88} y={150} n={2} swatch="var(--gold-soft)" />
      <Marker x={92} y={270} n={3} swatch="var(--sky-soft)" />
      <Marker x={230} y={140} n={4} swatch="var(--coral-soft)" />
    </Figure>
  );
}

/* ── 10. The smile line ──────────────────────────────────────────────── */

const smileParts: Part[] = [
  { n: 1, name: "Central incisors", note: "The two front teeth. What everyone looks at first", swatch: "var(--sky-soft)" },
  { n: 2, name: "Laterals", note: "Slightly smaller, slightly back. Often the odd one out", swatch: "var(--gold-soft)" },
  { n: 3, name: "Canines", note: "The corners of the smile. They set its width", swatch: "var(--gold-soft)" },
  { n: 4, name: "Gum line", note: "Its evenness matters as much as the teeth", swatch: "var(--coral-soft)" },
  { n: 5, name: "Lip line", note: "How much shows when you smile decides what is worth changing", swatch: "var(--violet-soft)" },
];

export function SmileLineDiagram({ className }: { className?: string }) {
  const teeth = [
    { x: 46, w: 30, h: 44, f: "var(--gold-soft)" },
    { x: 80, w: 28, h: 48, f: "var(--gold-soft)" },
    { x: 112, w: 36, h: 56, f: "var(--sky-soft)" },
    { x: 152, w: 36, h: 56, f: "var(--sky-soft)" },
    { x: 192, w: 28, h: 48, f: "var(--gold-soft)" },
    { x: 224, w: 30, h: 44, f: "var(--gold-soft)" },
  ];
  return (
    <Figure id="smile-line" title="The six teeth in a smile" desc="A front view of the upper six front teeth beneath an even gum line, with the upper lip drawn above them as a curve." parts={smileParts} viewBox="0 0 320 260" className={className}>
      {/* lip line */}
      <path d="M20 60c40-30 100-44 140-44s100 14 140 44" stroke="var(--violet)" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* gum */}
      <path d="M30 96c40-20 90-28 130-28s90 8 130 28v30H30z" fill="var(--coral-soft)" />
      <path d="M30 96c40-20 90-28 130-28s90 8 130 28" stroke="var(--coral)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {teeth.map((t) => (
        <rect key={t.x} x={t.x} y={104} width={t.w} height={t.h} rx="10" fill="#ffffff" stroke="var(--sky-text)" strokeWidth="2.5" />
      ))}
      <Marker x={166} y={196} n={1} swatch="var(--sky-soft)" />
      <Marker x={94} y={196} n={2} swatch="var(--gold-soft)" />
      <Marker x={44} y={186} n={3} swatch="var(--gold-soft)" />
      <Marker x={286} y={100} n={4} swatch="var(--coral-soft)" />
      <Marker x={286} y={40} n={5} swatch="var(--violet-soft)" />
    </Figure>
  );
}

/* ── 11. A whole mouth, mapped ───────────────────────────────────────── */

const biteParts: Part[] = [
  { n: 1, name: "A missing tooth", note: "The neighbours tilt into the gap over time", swatch: "var(--coral-soft)" },
  { n: 2, name: "Worn edges", note: "From grinding. The bite gets shorter every year", swatch: "var(--amber-soft)" },
  { n: 3, name: "An old crown", note: "Loose, leaking, or the wrong shade", swatch: "var(--gold-soft)" },
  { n: 4, name: "A tilted tooth", note: "Drifted after the tooth beside it was lost", swatch: "var(--violet-soft)" },
  { n: 5, name: "Sound teeth", note: "Left alone. The plan works around them", swatch: "var(--mint-soft)" },
];

export function BiteMapDiagram({ className }: { className?: string }) {
  const upper = [56, 92, 128, 164, 200, 236];
  const lower = [56, 92, 128, 164, 200, 236];
  return (
    <Figure id="bite-map" title="A whole mouth, mapped" desc="Two rows of teeth, upper and lower, meeting in the middle. Five problems are marked: a missing tooth, worn edges, an old crown, a tilted tooth, and a sound tooth to be left alone." parts={biteParts} viewBox="0 0 320 300" className={className}>
      <path d="M30 70h260" stroke="var(--coral-soft)" strokeWidth="14" strokeLinecap="round" />
      <path d="M30 230h260" stroke="var(--coral-soft)" strokeWidth="14" strokeLinecap="round" />
      {/* upper */}
      {upper.map((x, i) => {
        if (i === 2) return <rect key={x} x={x - 14} y={72} width="28" height="54" rx="10" fill="var(--coral-tint)" stroke="var(--coral)" strokeWidth="2.5" strokeDasharray="5 4" />;
        if (i === 4) return <rect key={x} x={x - 14} y={72} width="28" height="54" rx="10" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth="2.5" />;
        return <rect key={x} x={x - 14} y={72} width="28" height={i === 1 ? 40 : 54} rx="10" fill="#ffffff" stroke={i === 1 ? "var(--amber)" : "var(--mint-text)"} strokeWidth="2.5" />;
      })}
      {/* worn edge hatch on tooth 1 */}
      <path d="M80 112l24 0" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
      {/* lower */}
      {lower.map((x, i) => {
        if (i === 3) return <rect key={x} x={x - 14} y={172} width="28" height="54" rx="10" fill="#ffffff" stroke="var(--violet)" strokeWidth="2.5" transform={`rotate(-14 ${x} 226)`} />;
        return <rect key={x} x={x - 14} y={172} width="28" height="54" rx="10" fill="#ffffff" stroke="var(--mint-text)" strokeWidth="2.5" />;
      })}
      <Marker x={128} y={44} n={1} swatch="var(--coral-soft)" />
      <Marker x={92} y={150} n={2} swatch="var(--amber-soft)" />
      <Marker x={200} y={44} n={3} swatch="var(--gold-soft)" />
      <Marker x={164} y={262} n={4} swatch="var(--violet-soft)" />
      <Marker x={236} y={262} n={5} swatch="var(--mint-soft)" />
    </Figure>
  );
}
