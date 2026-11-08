import { motion, useReducedMotion } from "motion/react";

/**
 * DateBlock
 * Three-column layout: year/month | day/weekday | time
 * Thin gold lines above and below, thin vertical dividers between columns.
 * Line-drawing animation on viewport entry (scaleX/scaleY).
 *
 * Props:
 *   t    – translation function
 *   lang – "en" | "ml"
 */
export default function DateBlock({ t, lang }) {
  const reduced = useReducedMotion();

  const lineTransition = {
    duration: reduced ? 0 : 0.8,
    ease: "easeOut",
  };
  const colTransition = (delay) => ({
    duration: reduced ? 0.3 : 0.5,
    delay: reduced ? 0 : 0.6 + delay,
    ease: "easeOut",
  });

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top gold rule */}
      <motion.div
        style={{
          height: "1px",
          backgroundColor: "var(--color-gold)",
          transformOrigin: "center",
          scaleX: 0,
        }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={lineTransition}
        aria-hidden="true"
      />

      {/* Three-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 0,
          alignItems: "center",
          padding: "0.75rem 0",
        }}
      >
        {/* Left column: Year / Month */}
        <motion.div
          className="flex flex-col items-center text-center px-3"
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={colTransition(0)}
        >
          <span className="font-serif text-[--color-ink] text-sm leading-tight">
            {t("date.year")}
          </span>
          <span
            className="font-serif font-semibold text-[--color-ink] text-base leading-tight mt-0.5"
            style={{ fontWeight: 600 }}
          >
            {t("date.month")}
          </span>
        </motion.div>

        {/* Vertical divider left */}
        <motion.div
          aria-hidden="true"
          style={{
            width: "1px",
            height: "3.5rem",
            backgroundColor: "var(--color-gold)",
            opacity: 0.6,
            transformOrigin: "top",
            scaleY: 0,
            alignSelf: "center",
          }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ...lineTransition, delay: reduced ? 0 : 0.3 }}
        />

        {/* Center column: Day / Weekday */}
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ opacity: 0, padding: "0 0.75rem" }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={colTransition(0.12)}
        >
          {/* Day number – always Latin digits, red, large */}
          <span
            className="font-serif text-[--color-red] leading-none"
            style={{
              fontSize: "4.5rem",
              fontWeight: 600,
              fontVariantNumeric: "lining-nums",
              fontFamily: "var(--font-serif)",
            }}
            lang="en" /* force Latin digit rendering */
          >
            {t("date.day")}
          </span>
          <span className="font-serif text-[--color-ink] text-sm mt-1">
            {t("date.weekday")}
          </span>
        </motion.div>

        {/* Vertical divider right */}
        <motion.div
          aria-hidden="true"
          style={{
            width: "1px",
            height: "3.5rem",
            backgroundColor: "var(--color-gold)",
            opacity: 0.6,
            transformOrigin: "top",
            scaleY: 0,
            alignSelf: "center",
          }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ...lineTransition, delay: reduced ? 0 : 0.3 }}
        />

        {/* Right column: Time */}
        <motion.div
          className="flex flex-col items-center text-center px-3"
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={colTransition(0.24)}
        >
          <span
            className="font-serif text-[--color-ink] text-sm leading-snug"
            style={{
              textWrap: "balance",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              maxWidth: "7rem",
              lineHeight: lang === "ml" ? "1.5" : "1.3",
            }}
          >
            {t("date.time")}
          </span>
        </motion.div>
      </div>

      {/* Bottom gold rule */}
      <motion.div
        style={{
          height: "1px",
          backgroundColor: "var(--color-gold)",
          transformOrigin: "center",
          scaleX: 0,
        }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={lineTransition}
        aria-hidden="true"
      />
    </div>
  );
}

