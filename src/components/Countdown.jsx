import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";

function AnimatedChar({ char, reduced }) {
  if (reduced) {
    return <span>{char}</span>;
  }
  return (
    <span className="inline-block relative overflow-hidden h-[1.1em] align-top">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-block"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function DigitGroup({ value, reduced }) {
  const chars = String(value).split("");
  return (
    <span
      className="inline-flex items-center justify-center tabular-nums"
      style={{ fontVariantNumeric: "tabular-nums" }}
      lang="en" /* Always Latin numerals */
    >
      {chars.map((c, i) => (
        <AnimatedChar key={i} char={c} reduced={reduced} />
      ))}
    </span>
  );
}

/**
 * Countdown
 * Displays 4 cells: Days, Hours, Minutes, Seconds.
 * Uses tabular figures, animates only changing digits.
 * When status is "after", displays date.finished text.
 */
export default function Countdown({ countdown, t, lang, className = "mt-6" }) {
  const reduced = useReducedMotion();
  const [ariaLabel, setAriaLabel] = useState("");
  const lastMinuteRef = useRef(-1);

  // Update aria-label only once per minute to avoid spamming screen readers
  useEffect(() => {
    if (countdown.status === "after") {
      setAriaLabel(t("date.finished"));
      return;
    }
    if (lastMinuteRef.current !== countdown.minutes) {
      lastMinuteRef.current = countdown.minutes;
      const label = `${countdown.days} ${t("date.labels.days")} ${countdown.hours} ${t("date.labels.hours")} ${countdown.minutes} ${t("date.labels.minutes")} ${countdown.seconds} ${t("date.labels.seconds")}`;
      setAriaLabel(label);
    }
  }, [
    countdown.days,
    countdown.hours,
    countdown.minutes,
    countdown.seconds,
    countdown.status,
    t,
  ]);

  if (countdown.status === "after") {
    return (
      <Reveal>
        <div className="mt-8 text-center px-4">
          <p className="font-serif text-[--color-ink] text-lg sm:text-xl italic">
            {t("date.finished")}
          </p>
        </div>
      </Reveal>
    );
  }

  const cells = [
    {
      value: String(countdown.days).padStart(2, "0"),
      label: t("date.labels.days"),
    },
    {
      value: String(countdown.hours).padStart(2, "0"),
      label: t("date.labels.hours"),
    },
    {
      value: String(countdown.minutes).padStart(2, "0"),
      label: t("date.labels.minutes"),
    },
    {
      value: String(countdown.seconds).padStart(2, "0"),
      label: t("date.labels.seconds"),
    },
  ];

  return (
    <Reveal>
      <div
        role="group"
        aria-label={ariaLabel}
        className={`w-full max-w-[380px] mx-auto px-2 ${className}`}
      >
        <div
          aria-hidden="true"
          className="grid grid-cols-4 gap-2 sm:gap-4 w-full"
        >
          {cells.map(({ value, label }, idx) => (
            <div
              key={idx}
              className="min-w-0 flex flex-col items-center justify-center py-2 px-1 text-center"
            >
              <span className="text-[--color-red] font-serif font-semibold text-3xl sm:text-4xl leading-none">
                <DigitGroup value={value} reduced={reduced} />
              </span>
              <span
                className={`
                  text-[0.65rem] sm:text-xs text-[--color-ink]/70 font-serif mt-2 text-center leading-tight
                  ${lang === "ml" ? "font-ml normal-case tracking-normal" : "uppercase tracking-widest"}
                `}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

