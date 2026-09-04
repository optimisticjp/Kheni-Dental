import { cn } from "@/lib/utils";

/**
 * Original treatment illustrations.
 *
 * Each treatment gets one simple, recognisable drawing in its own hue,
 * composed from a small set of shapes so the whole set reads as one hand.
 * Colours come from the surrounding `.hue-*` class, never from the drawing,
 * so a treatment can change colour in site.ts without touching this file.
 *
 * These are placeholders with a job: every poster is built so a real
 * clinic photograph drops into the same frame later (see MediaFrame).
 */

const MOLAR =
  "M100 44c-27 0-42 18-40 46 2 24 12 48 20 68 4 12 14 12 17-2l3-22 3 22c3 14 13 14 17 2 8-20 18-44 20-68 2-28-13-46-40-46z";
const INCISOR = "M100 46c-19 0-28 14-26 48l8 70c2 10 34 10 36 0l8-70c2-34-7-48-26-48z";

function Tooth({ d = MOLAR, fill = "#ffffff", stroke = "var(--h-text)", ...rest }: React.SVGProps<SVGPathElement> & { d?: string }) {
  return <path d={d} fill={fill} stroke={stroke} strokeWidth="4" strokeLinejoin="round" {...rest} />;
}

function Sparkle({ x: xIn, y: yIn, s = 10, fill = "var(--sunshine)" }: { x: number | string; y: number | string; s?: number; fill?: string }) {
  const x = Number(xIn);
  const y = Number(yIn);
  return <path d={`M${x} ${y - s}l${s * 0.3} ${s * 0.7} ${s * 0.7} ${s * 0.3}-${s * 0.7} ${s * 0.3}-${s * 0.3} ${s * 0.7}-${s * 0.3}-${s * 0.7}-${s * 0.7}-${s * 0.3} ${s * 0.7}-${s * 0.3}z`} fill={fill} />;
}

/** Soft background blob so every poster has depth without a photograph. */
function Field() {
  return (
    <>
      <circle cx="140" cy="60" r="70" fill="var(--h-soft)" opacity=".7" />
      <circle cx="52" cy="150" r="54" fill="var(--h-fill)" opacity=".18" />
    </>
  );
}

const drawings: Record<string, React.ReactNode> = {
  "dental-implants-surat": (
    <>
      <Field />
      {/* post in the bone */}
      <rect x="86" y="112" width="28" height="60" rx="6" fill="var(--h-fill)" />
      {[124, 136, 148, 160].map((y) => (
        <path key={y} d={`M88 ${y}h24`} stroke="#ffffff" strokeWidth="3" opacity=".8" />
      ))}
      <rect x="90" y="98" width="20" height="16" rx="3" fill="var(--gold)" />
      {/* crown */}
      <path d="M100 30c-24 0-36 14-34 40 1 10 6 22 12 30h44c6-8 11-20 12-30 2-26-10-40-34-40z" fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M78 100c8 6 36 6 44 0" stroke="var(--h-text)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <Sparkle x="146" y="44" s={9} />
    </>
  ),
  "root-canal-treatment-surat": (
    <>
      <Field />
      <Tooth />
      {/* pulp and canals, highlighted */}
      <path d="M100 76c-10 0-16 8-14 20 1 8 4 14 6 18l4 30c1 5 7 5 8 0l4-30c2-4 5-10 6-18 2-12-4-20-14-20z" fill="var(--h-fill)" opacity=".9" />
      <path d="M92 118l-6 34M108 118l6 34" stroke="var(--h-text)" strokeWidth="4" strokeLinecap="round" />
      <Sparkle x="150" y="56" s={9} />
    </>
  ),
  "braces-clear-aligners": (
    <>
      <Field />
      <g transform="translate(-6 0)">
        <path d={INCISOR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform="translate(-44 4) scale(.82)" />
        <path d={INCISOR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform="translate(4 -6) scale(.9)" />
        <path d={INCISOR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform="translate(56 4) scale(.82)" />
      </g>
      <path d="M40 110C70 118 130 118 160 110" stroke="var(--h-fill)" strokeWidth="6" strokeLinecap="round" fill="none" />
      {[62, 96, 130].map((x) => (
        <rect key={x} x={x - 8} y="104" width="16" height="14" rx="4" fill="var(--h-fill)" stroke="#ffffff" strokeWidth="2" />
      ))}
      <Sparkle x="156" y="52" s={9} />
    </>
  ),
  "cosmetic-smile-dentistry": (
    <>
      <Field />
      <path d="M36 92c18 40 46 60 64 60s46-20 64-60c-20 10-42 14-64 14s-44-4-64-14z" fill="var(--h-fill)" />
      <path d="M52 100c14 6 32 8 48 8s34-2 48-8c-12 14-30 22-48 22s-36-8-48-22z" fill="#ffffff" />
      <path d="M36 92c20-4 42-6 64-6s44 2 64 6" stroke="var(--h-text)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <Sparkle x="152" y="66" s={12} />
      <Sparkle x="44" y="62" s={7} />
    </>
  ),
  "full-mouth-rehabilitation": (
    <>
      <Field />
      <path d="M40 150c0-50 27-84 60-84s60 34 60 84" stroke="var(--h-fill)" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".35" />
      {[
        [48, 128, 0.7],
        [64, 100, 0.75],
        [84, 82, 0.8],
        [108, 82, 0.8],
        [128, 100, 0.75],
        [144, 128, 0.7],
      ].map(([x, y, s], i) => (
        <path key={i} d={INCISOR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform={`translate(${x - 100 * s + 8} ${y - 100 * s + 20}) scale(${s})`} />
      ))}
      <Sparkle x="100" y="150" s={9} />
    </>
  ),
  "crowns-and-bridges": (
    <>
      <Field />
      <Tooth stroke="var(--h-text)" />
      <path d="M62 84c8-18 22-28 38-28s30 10 38 28c-8-6-24-9-38-9s-30 3-38 9z" fill="var(--h-fill)" stroke="var(--h-text)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M78 72l6-14M122 72l-6-14M100 66V52" stroke="var(--h-text)" strokeWidth="3" strokeLinecap="round" />
      <Sparkle x="150" y="52" s={9} />
    </>
  ),
  "kids-dentistry-surat": (
    <>
      <Field />
      <path d={MOLAR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform="translate(14 14) scale(.86)" />
      <circle cx="90" cy="92" r="4" fill="var(--ink)" />
      <circle cx="118" cy="92" r="4" fill="var(--ink)" />
      <path d="M92 110c6 6 18 6 24 0" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="80" cy="104" r="5" fill="var(--coral-soft)" />
      <circle cx="128" cy="104" r="5" fill="var(--coral-soft)" />
      <Sparkle x="150" y="50" s={12} />
      <Sparkle x="48" y="66" s={8} />
    </>
  ),
  "gum-care-surat": (
    <>
      <Field />
      <path d="M20 120c26-24 50-24 80 0s54 24 80 0v70H20z" fill="var(--coral-soft)" />
      <path d={INCISOR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform="translate(-30 18) scale(.7)" />
      <path d={INCISOR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform="translate(28 6) scale(.78)" />
      <path d={INCISOR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform="translate(86 18) scale(.7)" />
      <path d="M20 120c26-24 50-24 80 0s54 24 80 0" stroke="var(--h-fill)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <Sparkle x="150" y="56" s={9} />
    </>
  ),
  "wisdom-tooth-oral-surgery": (
    <>
      <Field />
      <path d={MOLAR} fill="#ffffff" stroke="var(--h-text)" strokeWidth="4" transform="translate(-12 16) scale(.8)" />
      <path d={MOLAR} fill="var(--h-soft)" stroke="var(--h-text)" strokeWidth="4" transform="rotate(-28 150 120) translate(66 34) scale(.72)" />
      <path d="M140 66l10-14M148 76l16-6" stroke="var(--h-fill)" strokeWidth="4" strokeLinecap="round" />
      <Sparkle x="50" y="54" s={8} />
    </>
  ),
  "dental-check-up-surat": (
    <>
      <Field />
      <Tooth />
      <circle cx="136" cy="80" r="30" fill="var(--h-tint)" stroke="var(--h-text)" strokeWidth="4" />
      <path d="M156 102l18 18" stroke="var(--h-text)" strokeWidth="6" strokeLinecap="round" />
      <path d="M122 80h28M136 66v28" stroke="var(--h-fill)" strokeWidth="4" strokeLinecap="round" />
      <Sparkle x="44" y="60" s={8} />
    </>
  ),
  "tooth-fillings-surat": (
    <>
      <Field />
      <Tooth />
      <circle cx="108" cy="80" r="14" fill="var(--h-fill)" />
      <path d="M100 80l6 6 10-12" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Sparkle x="150" y="56" s={9} />
    </>
  ),
};

export function TreatmentArt({ slug, className, title }: { slug: string; className?: string; title?: string }) {
  const drawing = drawings[slug] ?? drawings["dental-check-up-surat"];
  return (
    <svg viewBox="0 0 200 200" className={cn("block", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} focusable="false">
      {title && <title>{title}</title>}
      {drawing}
    </svg>
  );
}

/** Small line glyphs for the concern finder. Drawn on a 24-unit grid. */
export function ConcernGlyph({ icon, className }: { icon: string; className?: string }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const tooth = "M12 3.5c-3 0-5 2-4.7 5.5.2 2.6 1.4 5 2.4 7.4.5 1.3 1.6 1.3 1.9-.2l.4-2.4.4 2.4c.3 1.5 1.4 1.5 1.9.2 1-2.4 2.2-4.8 2.4-7.4C17 5.5 15 3.5 12 3.5z";
  const glyphs: Record<string, React.ReactNode> = {
    pain: (
      <>
        <path d={tooth} {...stroke} />
        <path d="M19 4l1.5-1.5M20.5 8H22M18 7.5L19 9" {...stroke} />
      </>
    ),
    gap: (
      <>
        <path d="M5 4.5c-1.5 0-2.5 1-2.4 2.8.1 1.4.7 2.7 1.2 4 .3.7.9.7 1-.1L5 9.6l.2 1.6c.1.8.7.8 1 .1.5-1.3 1.1-2.6 1.2-4C7.5 5.5 6.5 4.5 5 4.5zM19 4.5c-1.5 0-2.5 1-2.4 2.8.1 1.4.7 2.7 1.2 4 .3.7.9.7 1-.1l.2-1.6.2 1.6c.1.8.7.8 1 .1.5-1.3 1.1-2.6 1.2-4 .1-1.8-.9-2.8-2.4-2.8z" {...stroke} />
        <path d="M10 6h4M10 9h4" {...stroke} strokeDasharray="1.5 2" />
        <path d="M12 14v6M9.5 20h5" {...stroke} />
      </>
    ),
    crooked: (
      <>
        <path d="M4 8c2-1 4-1 5.5.5L11 10M20 8c-2-1-4-1-5.5.5L13 10" {...stroke} />
        <path d="M6 6.5v9M12 5v10M18 6.5v9" {...stroke} />
        <path d="M3 17c6 2 12 2 18 0" {...stroke} />
      </>
    ),
    smile: (
      <>
        <path d="M4 10c2.5 6 5.5 9 8 9s5.5-3 8-9c-2.5 1.2-5.3 1.8-8 1.8S6.5 11.2 4 10z" {...stroke} />
        <path d="M18 3l.7 1.6L20.5 5l-1.8.7L18 7.5l-.7-1.8L15.5 5l1.8-.4z" fill="currentColor" />
      </>
    ),
    child: (
      <>
        <path d={tooth} {...stroke} />
        <circle cx="10.2" cy="9" r=".7" fill="currentColor" />
        <circle cx="13.8" cy="9" r=".7" fill="currentColor" />
        <path d="M10.5 11.5c.8.8 2.2.8 3 0" {...stroke} />
      </>
    ),
    gums: (
      <>
        <path d="M3 13c3-3 6-3 9 0s6 3 9 0" {...stroke} />
        <path d="M7 12V7c0-1.2.8-2 2-2s2 .8 2 2v6M13 13V7c0-1.2.8-2 2-2s2 .8 2 2v5" {...stroke} />
        <path d="M3 13v6h18v-6" {...stroke} />
      </>
    ),
    wisdom: (
      <>
        <path d={tooth} {...stroke} transform="translate(-4 3) scale(.85)" />
        <path d={tooth} {...stroke} transform="rotate(-30 17 10) translate(8 3) scale(.75)" />
      </>
    ),
    broken: (
      <>
        <path d="M12 3.5c-3 0-5 2-4.7 5.5.2 2.6 1.4 5 2.4 7.4.5 1.3 1.6 1.3 1.9-.2l.4-2.4.4 2.4c.3 1.5 1.4 1.5 1.9.2 1-2.4 2.2-4.8 2.4-7.4" {...stroke} />
        <path d="M16.7 9l1.8-2.2-2-1.3L18 3.5" {...stroke} />
      </>
    ),
    checkup: (
      <>
        <path d={tooth} {...stroke} transform="translate(-2 1) scale(.9)" />
        <circle cx="17" cy="16" r="3.2" {...stroke} />
        <path d="M19.4 18.4L22 21" {...stroke} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {glyphs[icon] ?? glyphs.checkup}
    </svg>
  );
}
