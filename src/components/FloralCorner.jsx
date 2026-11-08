/**
 * FloralCorner
 * A decorative SVG floral cluster (roses, buds, leaves, gold sprigs).
 * Props:
 *   size    – number, side length in px (default 120)
 *   flip    – boolean, mirror horizontally for right corner (default false)
 *   rotation – number, degrees to rotate (default 0)
 *
 * Colors: crimson #7A0C1A, red #C1121F, crimson-mid #A01020,
 *         leaf (dark olive) #4B5A30, gold sprig #B8893B
 *
 * This is the single source of truth for all floral artwork.
 * Swap the SVG paths here to update artwork project-wide.
 */
export default function FloralCorner({ size = 120, flip = false, rotation = 0 }) {
  const transform = [
    flip ? `scale(-1, 1) translate(-${size}, 0)` : "",
    rotation ? `rotate(${rotation}, ${size / 2}, ${size / 2})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", pointerEvents: "none" }}
    >
      <g transform={transform || undefined}>
        {/* ── Gold sprigs ── */}
        {/* Main stem */}
        <path
          d="M 10 110 Q 30 80 55 50"
          fill="none"
          stroke="#B8893B"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Left sprig */}
        <path
          d="M 22 94 Q 15 85 12 78"
          fill="none"
          stroke="#B8893B"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Right sprig */}
        <path
          d="M 38 74 Q 48 68 50 60"
          fill="none"
          stroke="#B8893B"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Small sprig dots */}
        <circle cx="12" cy="77" r="1.5" fill="#F3DFA2" />
        <circle cx="50" cy="59" r="1.5" fill="#F3DFA2" />
        <circle cx="55" cy="49" r="1.5" fill="#F3DFA2" />

        {/* ── Leaves (dark olive #4B5A30) ── */}
        {/* Large leaf left-mid */}
        <ellipse
          cx="18" cy="88" rx="7" ry="3.5"
          fill="#4B5A30"
          transform="rotate(-45 18 88)"
        />
        {/* Medium leaf */}
        <ellipse
          cx="35" cy="68" rx="6" ry="2.8"
          fill="#4B5A30"
          transform="rotate(-55 35 68)"
        />
        {/* Small leaf near top */}
        <ellipse
          cx="50" cy="55" rx="5" ry="2.2"
          fill="#4B5A30"
          transform="rotate(-60 50 55)"
        />
        {/* Extra small accent leaf */}
        <ellipse
          cx="28" cy="80" rx="4" ry="1.8"
          fill="#3D4A28"
          transform="rotate(30 28 80)"
        />

        {/* ── Main rose (large, crimson #7A0C1A) ── */}
        {/* Rose center */}
        <circle cx="30" cy="90" r="8" fill="#7A0C1A" />
        {/* Inner petals */}
        <ellipse cx="30" cy="83" rx="4.5" ry="3" fill="#A01020" transform="rotate(-10 30 83)" />
        <ellipse cx="36" cy="88" rx="4.5" ry="3" fill="#A01020" transform="rotate(50 36 88)" />
        <ellipse cx="34" cy="96" rx="4.5" ry="3" fill="#A01020" transform="rotate(140 34 96)" />
        <ellipse cx="24" cy="96" rx="4.5" ry="3" fill="#A01020" transform="rotate(-140 24 96)" />
        <ellipse cx="22" cy="88" rx="4.5" ry="3" fill="#A01020" transform="rotate(-50 22 88)" />
        {/* Outer petals */}
        <ellipse cx="30" cy="79" rx="3.5" ry="2.5" fill="#7A0C1A" transform="rotate(-5 30 79)" />
        <ellipse cx="39" cy="84" rx="3.5" ry="2.5" fill="#7A0C1A" transform="rotate(60 39 84)" />
        <ellipse cx="37" cy="98" rx="3.5" ry="2.5" fill="#7A0C1A" transform="rotate(145 37 98)" />
        <ellipse cx="22" cy="98" rx="3.5" ry="2.5" fill="#7A0C1A" transform="rotate(-145 22 98)" />
        <ellipse cx="20" cy="84" rx="3.5" ry="2.5" fill="#7A0C1A" transform="rotate(-60 20 84)" />
        {/* Rose center highlight */}
        <circle cx="29" cy="89" r="3" fill="#C1121F" />
        <circle cx="29" cy="89" r="1.5" fill="#8A1020" />

        {/* ── Medium bud (red #C1121F) ── */}
        <ellipse
          cx="52" cy="62" rx="6" ry="4.5"
          fill="#C1121F"
          transform="rotate(-30 52 62)"
        />
        <ellipse
          cx="52" cy="62" rx="4" ry="3"
          fill="#7A0C1A"
          transform="rotate(-30 52 62)"
        />
        {/* Bud sepals */}
        <path d="M 47 65 Q 44 70 46 73" fill="none" stroke="#4B5A30" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 56 64 Q 60 68 58 72" fill="none" stroke="#4B5A30" strokeWidth="1.2" strokeLinecap="round" />

        {/* ── Small bud (crimson, top area) ── */}
        <ellipse
          cx="62" cy="42" rx="4.5" ry="3.5"
          fill="#7A0C1A"
          transform="rotate(-50 62 42)"
        />
        <ellipse
          cx="62" cy="42" rx="3" ry="2.2"
          fill="#A01020"
          transform="rotate(-50 62 42)"
        />
        {/* Tiny sepals */}
        <path d="M 58 45 Q 56 49 57 52" fill="none" stroke="#4B5A30" strokeWidth="1" strokeLinecap="round" />
        <path d="M 65 44 Q 68 47 67 50" fill="none" stroke="#4B5A30" strokeWidth="1" strokeLinecap="round" />

        {/* ── Tiny accent buds ── */}
        <circle cx="20" cy="100" r="3" fill="#A01020" />
        <circle cx="8" cy="108" r="2.5" fill="#7A0C1A" />

        {/* ── Gold sprig dots (berries) ── */}
        <circle cx="43" cy="71" r="1.8" fill="#B8893B" />
        <circle cx="41" cy="75" r="1.4" fill="#F3DFA2" />
        <circle cx="58" cy="52" r="1.5" fill="#B8893B" />
      </g>
    </svg>
  );
}

