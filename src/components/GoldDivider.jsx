/**
 * GoldDivider
 * Features the four-pointed gold star with tapered needle lines,
 * matching the user's reference divider artwork.
 * Purely decorative – aria-hidden.
 */
export default function GoldDivider({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center w-full py-1 select-none pointer-events-none ${className}`}
    >
      <img
        src="/gold-star-divider.png"
        alt=""
        className="w-full max-w-[220px] sm:max-w-[240px] h-auto object-contain mx-auto"
        loading="eager"
      />
    </div>
  );
}
