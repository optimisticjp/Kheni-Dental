import { cn } from "@/lib/utils";

/**
 * Placeholder artwork for the demo layer.
 *
 * The reference clinics fill these slots with stock photography. There is no
 * stock library here and lifting someone else's photograph is not on the
 * table, so these are drawn: soft gradient fields with a figure or a mouth
 * suggested rather than depicted. They occupy the exact space a real
 * photograph will, so swapping one in changes nothing about the layout.
 */

/** A warm, out-of-focus portrait field. Reads as photography at a glance. */
export function StockPortrait({ className, seed = 0, label }: { className?: string; seed?: number; label?: string }) {
  const id = `sp${seed}`;
  const skies = [
    ["#ffe9d6", "#ffc9a8", "#f79f77"],
    ["#e2ecff", "#c2d5fb", "#93b1f2"],
    ["#e6f6ee", "#c2e6d3", "#95d2b3"],
    ["#f3e9ff", "#dcc9f8", "#bfa2ee"],
  ][seed % 4];

  return (
    <svg viewBox="0 0 600 750" role="img" aria-label={label ?? "Illustration standing in for a clinic photograph"} className={cn("size-full", className)} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={skies[0]} />
          <stop offset="1" stopColor={skies[1]} />
        </linearGradient>
        <radialGradient id={`${id}glow`} cx=".5" cy=".38" r=".62">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}blur`}><feGaussianBlur stdDeviation="26" /></filter>
      </defs>
      <rect width="600" height="750" fill={`url(#${id}bg)`} />
      <g filter={`url(#${id}blur)`} opacity=".65">
        <circle cx="120" cy="140" r="90" fill="#ffffff" opacity=".8" />
        <circle cx="500" cy="90" r="70" fill={skies[2]} />
        <circle cx="540" cy="600" r="120" fill="#ffffff" opacity=".55" />
        <circle cx="60" cy="620" r="80" fill={skies[2]} opacity=".7" />
      </g>
      <rect width="600" height="750" fill={`url(#${id}glow)`} />
      {/* Figure: shoulders and head, suggested only. */}
      <g opacity=".9">
        <path d="M300 706c-138 0-208 44-208 96h416c0-52-70-96-208-96z" fill="#ffffff" opacity=".9" />
        <path d="M300 690c-96 0-150 40-150 92h300c0-52-54-92-150-92z" fill={skies[2]} opacity=".55" />
        <ellipse cx="300" cy="500" rx="118" ry="140" fill="#ffffff" opacity=".92" />
        <ellipse cx="300" cy="498" rx="104" ry="126" fill={skies[2]} opacity=".28" />
        {/* A suggestion of a smile, no teeth, no face. */}
        <path d="M252 540q48 40 96 0" stroke="#ffffff" strokeWidth="13" strokeLinecap="round" fill="none" opacity=".95" />
      </g>
    </svg>
  );
}

/** A wide clinic-interior field for banners. */
export function StockInterior({ className, seed = 0 }: { className?: string; seed?: number }) {
  const id = `si${seed}`;
  return (
    <svg viewBox="0 0 1200 700" role="img" aria-label="Illustration standing in for a clinic photograph" className={cn("size-full", className)} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef3ff" />
          <stop offset=".55" stopColor="#dfe9ff" />
          <stop offset="1" stopColor="#ffeede" />
        </linearGradient>
        <filter id={`${id}b`}><feGaussianBlur stdDeviation="34" /></filter>
      </defs>
      <rect width="1200" height="700" fill={`url(#${id}g)`} />
      <g filter={`url(#${id}b)`} opacity=".7">
        <circle cx="200" cy="180" r="150" fill="#ffffff" />
        <circle cx="980" cy="140" r="130" fill="#ffd9a8" opacity=".8" />
        <circle cx="1090" cy="560" r="170" fill="#bcd3fb" opacity=".7" />
      </g>
      <g opacity=".55" fill="#ffffff">
        <rect x="80" y="300" width="380" height="300" rx="28" />
        <rect x="510" y="240" width="260" height="360" rx="28" opacity=".75" />
        <rect x="820" y="330" width="300" height="270" rx="28" opacity=".6" />
      </g>
      <g stroke="#12224a" strokeOpacity=".08" strokeWidth="2" fill="none">
        <path d="M0 600h1200" /><path d="M0 250h1200" />
      </g>
    </svg>
  );
}

/** A two-tone abstract frame used by the result gallery. */
export function ResultFrame({ tone, label, className }: { tone: [string, string]; label?: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={label ?? "Illustration standing in for a clinical photograph"} className={cn("size-full", className)} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={tone[0]} />
      <circle cx="300" cy="80" r="90" fill={tone[1]} opacity=".75" />
      <circle cx="90" cy="240" r="70" fill={tone[1]} opacity=".5" />
      {/* An arch of shapes, standing in for teeth. */}
      <g fill="#ffffff" opacity=".92">
        {Array.from({ length: 9 }).map((_, i) => {
          const t = (i - 4) / 4;
          const x = 200 + t * 118;
          const y = 168 + t * t * 34;
          const h = 40 - Math.abs(t) * 12;
          return <rect key={i} x={x - 13} y={y} width="26" height={h} rx="9" />;
        })}
      </g>
    </svg>
  );
}

/** Flat, clip-art style glyphs for the icon service grid. */
export function ServiceGlyph({ glyph, className }: { glyph: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    implant: (<><path d="M12 4c2.6 0 4 1.9 4 4.3 0 2.1-.9 3-1.3 5" {...common} /><path d="M12 4C9.4 4 8 5.9 8 8.3c0 2.1.9 3 1.3 5" {...common} /><path d="M12 12v8" {...common} /><path d="M9.6 14.2h4.8M9.8 16.6h4.4M10 19h4" {...common} /></>),
    canal: (<><path d="M12 3c3 0 4.6 2.2 4.6 5 0 3.4-1.6 5.2-2.2 8.4-.3 1.7-.9 2.6-2.4 2.6s-2.1-.9-2.4-2.6C9 13.2 7.4 11.4 7.4 8c0-2.8 1.6-5 4.6-5Z" {...common} /><path d="M12 8.5v9M10.4 10.5 12 12.6l1.6-2.1" {...common} /></>),
    braces: (<><path d="M3 12h18" {...common} /><rect x="5" y="9.4" width="4" height="5.2" rx="1.3" {...common} /><rect x="10" y="9.4" width="4" height="5.2" rx="1.3" {...common} /><rect x="15" y="9.4" width="4" height="5.2" rx="1.3" {...common} /></>),
    smile: (<><circle cx="12" cy="12" r="8.6" {...common} /><path d="M7.8 13.4q4.2 4.2 8.4 0" {...common} /><path d="M9 9.4h.01M15 9.4h.01" {...common} /></>),
    arch: (<><path d="M4 15c0-5.5 3.6-9 8-9s8 3.5 8 9" {...common} /><path d="M6.6 15.6V13M9.6 14.2V11M12 13.8V10.6M14.4 14.2V11M17.4 15.6V13" {...common} /></>),
    crown: (<><path d="M4.5 16 3 7l4.5 3L12 4.5 16.5 10 21 7l-1.5 9Z" {...common} /><path d="M5 19h14" {...common} /></>),
    kid: (<><circle cx="12" cy="8.6" r="4" {...common} /><path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" {...common} /><path d="M10.4 8.2h.01M13.6 8.2h.01M10.6 10.4q1.4 1.2 2.8 0" {...common} /></>),
    gum: (<><path d="M4 14c0-4.4 3.6-7.6 8-7.6s8 3.2 8 7.6" {...common} /><path d="M4 14c1.6 2 3.2 2.4 4 1s1.6-1.4 2.4 0 2.4 1.4 3.2 0 1.6-1.4 2.4 0 2.4 1 4-1" {...common} /></>),
    wisdom: (<><path d="M12 3.6c3 0 4.8 2 4.8 4.8 0 3.4-1.8 5-2.4 8.2-.3 1.6-.9 2.4-2.4 2.4s-2.1-.8-2.4-2.4C9 13.4 7.2 11.8 7.2 8.4c0-2.8 1.8-4.8 4.8-4.8Z" {...common} /><path d="m15.6 15.4 4 4M19.6 15.4l-4 4" {...common} /></>),
    check: (<><path d="M12 3.6c3 0 4.8 2 4.8 4.8 0 3.4-1.8 5-2.4 8.2-.3 1.6-.9 2.4-2.4 2.4s-2.1-.8-2.4-2.4C9 13.4 7.2 11.8 7.2 8.4c0-2.8 1.8-4.8 4.8-4.8Z" {...common} /><path d="m9.4 11.4 1.9 1.9 3.5-3.9" {...common} /></>),
    filling: (<><path d="M12 3.6c3 0 4.8 2 4.8 4.8 0 3.4-1.8 5-2.4 8.2-.3 1.6-.9 2.4-2.4 2.4s-2.1-.8-2.4-2.4C9 13.4 7.2 11.8 7.2 8.4c0-2.8 1.8-4.8 4.8-4.8Z" {...common} /><path d="M10 8h4v3.2h-4z" {...common} /></>),
    sparkle: (<><path d="M12 3.4 13.7 9l5.6 1.7L13.7 12.4 12 18l-1.7-5.6L4.7 10.7 10.3 9Z" {...common} /><path d="M18.6 16.2l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" {...common} /></>),
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-full", className)}>
      {paths[glyph] ?? paths.smile}
    </svg>
  );
}

/** A fictional masthead, set as a wordmark so the press strip has shapes to hold. */
export function PressWordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("font-serif text-[.95rem] font-semibold uppercase tracking-[.14em] sm:text-base", className)}>{name}</span>
  );
}
