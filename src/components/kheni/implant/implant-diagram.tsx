/**
 * Original educational diagram of an implant-supported tooth.
 *
 * Drawn in the codebase as semantic SVG so there is no image dependency, no
 * network request and no layout shift. It is a general educational schematic
 * in the style of a printed medical illustration, not a photorealistic or
 * surgical depiction, and it deliberately shows no procedural detail.
 *
 * Accessibility: exposed as a single labelled image with a text alternative
 * that describes the four parts in reading order, so a screen reader user gets
 * the same information a sighted reader takes from the labels.
 *
 * Server Component. The optional draw-in is pure CSS and is disabled by the
 * global `prefers-reduced-motion` rule.
 */
export function ImplantDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 398 470"
      role="img"
      aria-labelledby="implant-diagram-title implant-diagram-desc"
      className={className}
      focusable="false"
    >
      <title id="implant-diagram-title">
        How an implant-supported tooth is put together
      </title>
      <desc id="implant-diagram-desc">
        A cross-section diagram with four labelled parts, from top to bottom.
        The crown is the visible replacement tooth. Below it the gum line marks
        where the soft tissue sits. The abutment is the short connector that
        joins the crown to the post. The implant post is a threaded post placed
        into the jawbone, which is shown as the shaded area supporting it.
      </desc>

      <defs>
        <pattern
          id="implant-bone-hatch"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="0.6" opacity="0.16" />
        </pattern>
        <linearGradient id="implant-crown-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf9f4" />
          <stop offset="100%" stopColor="#e6e0d3" />
        </linearGradient>
      </defs>

      <g className="implant-diagram">
        {/* Jawbone mass */}
        <path
          d="M26 196 C60 178 96 172 130 172 C164 172 200 178 234 196 L234 404 C200 420 164 426 130 426 C96 426 60 420 26 404 Z"
          fill="currentColor"
          opacity="0.05"
        />
        <path
          d="M26 196 C60 178 96 172 130 172 C164 172 200 178 234 196 L234 404 C200 420 164 426 130 426 C96 426 60 420 26 404 Z"
          fill="url(#implant-bone-hatch)"
        />
        <path
          d="M26 196 C60 178 96 172 130 172 C164 172 200 178 234 196"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.3"
        />

        {/* Gum band sitting on the bone */}
        <path
          d="M26 190 C60 172 96 166 130 166 C164 166 200 172 234 190 L234 206 C200 190 164 184 130 184 C96 184 60 190 26 206 Z"
          fill="#caa968"
          opacity="0.22"
        />
        <path
          d="M26 190 C60 172 96 166 130 166 C164 166 200 172 234 190"
          fill="none"
          stroke="#caa968"
          strokeWidth="1.3"
          opacity="0.65"
        />

        {/* Crown: the visible replacement tooth */}
        <path
          d="M94 172 C89 140 91 106 102 86 C109 72 121 65 130 74 C139 65 151 72 158 86 C169 106 171 140 166 172 Z"
          fill="url(#implant-crown-face)"
          stroke="#caa968"
          strokeWidth="1.2"
          strokeOpacity="0.55"
        />
        <path
          d="M111 82 Q130 96 149 82"
          fill="none"
          stroke="#a98a4e"
          strokeWidth="1"
          opacity="0.45"
        />

        {/* Abutment: connector between crown and post */}
        <path
          d="M117 172 L143 172 L139 210 L121 210 Z"
          fill="currentColor"
          opacity="0.22"
          stroke="#caa968"
          strokeWidth="1.1"
          strokeOpacity="0.6"
        />

        {/* Implant post seated in the bone */}
        <path
          d="M110 210 L150 210 L150 348 C150 372 142 386 130 394 C118 386 110 372 110 348 Z"
          fill="currentColor"
          opacity="0.13"
          stroke="#caa968"
          strokeWidth="1.5"
          strokeOpacity="0.85"
        />
        {[228, 246, 264, 282, 300, 318, 336].map((y) => (
          <line
            key={y}
            x1="111"
            y1={y}
            x2="149"
            y2={y - 7}
            stroke="#caa968"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}

        {/* Leader lines and labels */}
        <g className="implant-diagram-labels" fontFamily="var(--font-sans)">
          {[
            { y: 108, from: 168, text: "Crown", sub: "the tooth you see" },
            { y: 180, from: 236, text: "Gum line", sub: "soft tissue level" },
            { y: 248, from: 152, text: "Abutment", sub: "the connector" },
            { y: 316, from: 152, text: "Implant post", sub: "placed in the bone" },
            { y: 402, from: 236, text: "Jawbone", sub: "carries the load" },
          ].map((label) => (
            <g key={label.text}>
              <line
                x1={label.from}
                y1={label.y}
                x2="258"
                y2={label.y}
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.3"
              />
              <circle cx="258" cy={label.y} r="2" fill="#caa968" />
              <text
                x="268"
                y={label.y - 2}
                fill="currentColor"
                fontSize="14"
                fontWeight="600"
                letterSpacing="-0.01em"
              >
                {label.text}
              </text>
              <text x="268" y={label.y + 14} fill="currentColor" fontSize="11" opacity="0.55">
                {label.sub}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
