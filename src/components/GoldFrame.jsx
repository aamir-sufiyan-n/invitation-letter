/**
 * GoldFrame
 * Thin gold double-line frame with inverted (concave) quarter-circle notches at corners.
 * Fixed-size SVG corners (R=20px) ensure the notches never distort into ovals on tall viewports.
 * Straight edges are drawn with CSS lines that stretch freely between the corner pieces.
 *
 * Decorative only – aria-hidden, pointer-events none.
 */

function CornerPiece({ style = {} }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className="absolute pointer-events-none"
    >
      {/* Outer notch line (1px gold, concave arc R=20) */}
      <path
        d="M 0.5 26 L 0.5 20.5 A 20 20 0 0 0 20.5 0.5 L 26 0.5"
        stroke="var(--color-gold)"
        strokeWidth="1"
      />
      {/* Inner notch line (fainter, 5px inset) */}
      <path
        d="M 5.5 26 L 5.5 25.5 A 20 20 0 0 0 25.5 5.5 L 26 5.5"
        stroke="var(--color-gold)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

export default function GoldFrame({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {/* Four fixed-size corner SVGs */}
      <CornerPiece style={{ top: 0, left: 0 }} />
      <CornerPiece style={{ top: 0, right: 0, transform: "scaleX(-1)" }} />
      <CornerPiece style={{ bottom: 0, left: 0, transform: "scaleY(-1)" }} />
      <CornerPiece style={{ bottom: 0, right: 0, transform: "scale(-1, -1)" }} />

      {/* Top straight double line */}
      <div className="absolute top-0 left-[26px] right-[26px] h-[6px]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[--color-gold]" />
        <div className="absolute top-[5px] left-0 right-0 h-[1px] bg-[--color-gold] opacity-50" />
      </div>

      {/* Bottom straight double line */}
      <div className="absolute bottom-0 left-[26px] right-[26px] h-[6px]">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[--color-gold]" />
        <div className="absolute bottom-[5px] left-0 right-0 h-[1px] bg-[--color-gold] opacity-50" />
      </div>

      {/* Left straight double line */}
      <div className="absolute left-0 top-[26px] bottom-[26px] w-[6px]">
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[--color-gold]" />
        <div className="absolute left-[5px] top-0 bottom-0 w-[1px] bg-[--color-gold] opacity-50" />
      </div>

      {/* Right straight double line */}
      <div className="absolute right-0 top-[26px] bottom-[26px] w-[6px]">
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[--color-gold]" />
        <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-[--color-gold] opacity-50" />
      </div>
    </div>
  );
}
