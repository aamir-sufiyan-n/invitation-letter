import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import GoldDivider from "./GoldDivider";

/**
 * Hero
 * Displays the wax-sealed handmade paper card containing the wedding details:
 * Greeting, Names, GoldDivider, Full Names, Date Line, and Scroll Cue.
 *
 * Props:
 *   t      – translation function
 *   phase  – "opening" | "open"
 *   lang   – "en" | "ml"
 */
export default function Hero({ t, phase, lang }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  // Entrance animation staggering
  const immediate = useRef(phase === "open").current; // true only when ?skip

  // Scroll cue fade-out & permanent dismissal
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (scrollY.get() > 30) {
      setHasScrolled(true);
    }
    return scrollY.on("change", (latest) => {
      if (latest > 30) {
        setHasScrolled(true);
      }
    });
  }, [scrollY]);

  function getAnimate(index) {
    if (immediate) return { opacity: 1, y: 0 };
    if (phase === "opening" || phase === "open") {
      return { opacity: 1, y: 0 };
    }
    return { opacity: 0, y: reduced ? 0 : 14 };
  }

  function getTransition(index) {
    if (immediate) return { duration: 0 };
    return {
      duration: reduced ? 0.35 : 0.65,
      delay: 0.45 + index * 0.1,
      ease: "easeOut",
    };
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen-dvh flex flex-col items-center justify-center overflow-hidden px-3 py-6"
      style={{ minHeight: "100dvh", backgroundColor: "#3D0103" }}
      aria-label={t("hero.names")}
    >
      {/* ── Wax-sealed card container ── */}
      <motion.div
        className="relative w-full max-w-[390px] aspect-[576/1024] max-h-[82dvh] sm:max-h-[85dvh] flex items-center justify-center select-none"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: immediate ? 0 : 0.7, delay: immediate ? 0 : 0.2, ease: "easeOut" },
        }}
      >
        {/* Card backdrop image with deckled edges and 3D wax seal */}
        <img
          src="/hero-card.jpg"
          alt=""
          className="w-full h-full object-contain pointer-events-none"
          loading="eager"
        />

        {/* ── Bismillahi Rahmani Raheem at the top of the hero image above the wax seal ── */}
        <motion.div
          className="absolute z-10 w-full flex justify-center pointer-events-none px-6"
          style={{
            top: "4.5%",
            height: "7.5%",
          }}
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          animate={getAnimate(0)}
          transition={getTransition(0)}
        >
          <img
            src="/bismillah.png"
            alt="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
            className="h-full w-auto max-w-[210px] object-contain select-none"
            loading="eager"
          />
        </motion.div>

        {/* ── Content placed inside the deckled paper sheet below wax seal ── */}
        <div
          className="absolute z-10 flex flex-col items-center justify-center text-center px-4"
          style={{
            top: "30%",
            bottom: "22%",
            left: "12%",
            right: "12%",
          }}
        >
          {/* "Save the date" */}
          <motion.p
            className={`
              font-serif text-xs sm:text-sm text-[--color-ink]/80 mb-2 sm:mb-3 leading-tight
              ${lang === "ml" ? "normal-case tracking-normal" : "uppercase tracking-[0.25em]"}
            `}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={getAnimate(1)}
            transition={getTransition(1)}
          >
            {t("hero.tagline")}
          </motion.p>

          {/* "Aamir & Sajeena" */}
          <motion.h1
            className="names-text text-[--color-crimson] my-1 sm:my-2 leading-tight"
            style={{
              fontSize:
                lang === "ml"
                  ? "clamp(1.45rem, 5vw, 2.15rem)"
                  : "clamp(1.95rem, 6.6vw, 2.9rem)",
            }}
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={getAnimate(2)}
            transition={getTransition(2)}
          >
            {t("hero.names")}
          </motion.h1>

          {/* Gold divider with 4-pointed star under couple names */}
          <motion.div
            className="w-full max-w-[160px] sm:max-w-[180px] my-1 sm:my-1.5"
            initial={{ opacity: 0 }}
            animate={getAnimate(3)}
            transition={getTransition(3)}
          >
            <GoldDivider className="py-0" />
          </motion.div>

          {/* "06.12.2026" */}
          <motion.p
            className="font-serif text-base sm:text-lg font-semibold text-[--color-ink] tracking-[0.2em] leading-none mt-1"
            lang="en" /* Always Latin numerals */
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={getAnimate(4)}
            transition={getTransition(4)}
          >
            {t("hero.date")}
          </motion.p>
        </div>
      </motion.div>

      {/* ── Scroll cue – hidden permanently once scrolled down ── */}
      {!hasScrolled && (
        <motion.div
          className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none"
          style={{
            opacity: cueOpacity,
          }}
          initial={{ opacity: 0 }}
          animate={getAnimate(5)}
          transition={getTransition(5)}
          aria-hidden="true"
        >
          <span className="font-serif text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-[--color-gold-light] font-semibold">
            {t("hero.scrollCue")}
          </span>
          <motion.svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "var(--color-gold-light)" }}
            animate={reduced ? {} : { y: [0, 5, 0] }}
            transition={
              reduced
                ? {}
                : {
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }
            }
          >
            <path
              d="M 2 2 L 10 10 L 18 2"
              stroke="var(--color-gold-light)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      )}
    </section>
  );
}
