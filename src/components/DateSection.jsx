import Countdown from "./Countdown";

/**
 * DateSection
 * Displays only the countdown timer.
 * Date and time grid has been removed per request.
 *
 * Props:
 *   t         – translation function
 *   lang      – "en" | "ml"
 *   countdown – result of useCountdown
 */
export default function DateSection({ t, lang, countdown }) {
  if (!countdown) return null;

  return (
    <section
      className="bg-[--color-cream] px-6 py-8 sm:py-10 text-center"
      aria-label="Wedding countdown"
    >
      <Countdown countdown={countdown} t={t} lang={lang} />
    </section>
  );
}
