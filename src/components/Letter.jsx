import Countdown from "./Countdown";
import Reveal from "./Reveal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import GoldDivider from "./GoldDivider";
import { googleCalendarUrl } from "../utils/calendar";
import {
  EVENT_START_ISO,
  EVENT_DURATION_HOURS,
  MAPS_URL,
} from "../data/wedding";

/**
 * Increases the size of numeric digits (like "6", "2026", "12:30", "06") slightly
 * so they balance harmoniously against uppercase serif letters.
 */
function renderWithLargerNumbers(text) {
  if (typeof text !== "string") return text;
  const parts = text.split(/(\d+(?:[:.]\d+)*)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (/^\d+(?:[:.]\d+)*$/.test(part)) {
      return (
        <span
          key={i}
          className="text-[1.22em] font-semibold tracking-normal"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

/**
 * Letter
 * Wedding invitation details framed inside the stationery card.
 * Uses CSS 9-slice border-image scaling so the parchment background stretches
 * to fit all content seamlessly without stretching or distorting the red corner flourishes or borders.
 *
 * Structure:
 *   - Greeting ("Assalamu alaikum")
 *   - Tagline ("PLEASE JOIN US FOR THE")
 *   - "Wedding" in flowing script
 *   - "of" in delicate script
 *   - Names on 3 lines: "Aamir Suhail", "&", "Sajeena K S"
 *   - Date, Time, Venue in matching uppercase serif
 *   - Request: "We kindly request the presence of you and your family to celebrate with us."
 *   - Countdown timer directly under the request sentence
 *   - Location and Calendar action buttons ("Open in Google Maps", "Add to Calendar")
 *   - Gold Divider
 *   - Closing message ("We look forward to sharing this joyous occasion with you.")
 *   - Blessing ("Insha'Allah" in gold script)
 */
export default function Letter({ t, lang, countdown }) {
  const isAfter = countdown?.status === "after";

  const gCalUrl = googleCalendarUrl({
    title: t("calendar.title"),
    description: t("calendar.description"),
    location: t("venue.name"),
    url: MAPS_URL,
    startIso: EVENT_START_ISO,
    durationHours: EVENT_DURATION_HOURS,
  });

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-label="Invitation letter"
    >
      {/* ── 9-slice background frame: stretches background to fit content without stretching red corners ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderStyle: "solid",
          borderWidth: "clamp(44px, 12vw, 54px)",
          borderImageSource: "url('/letter-stationery.jpg')",
          borderImageSlice: "110 fill",
          borderImageWidth: "clamp(44px, 12vw, 54px)",
          borderImageRepeat: "stretch",
        }}
      />

      {/* ── Content container sitting cleanly inside the framed area ── */}
      <div
        className="relative z-10 w-full flex flex-col items-center text-center px-6 sm:px-8 pt-10 sm:pt-14"
        style={{ paddingBottom: "calc(var(--safe-bottom) + 3rem)" }}
      >
        {/* Top Greeting: Assalamu Alaikum in gold script matching Insha'Allah */}
        <Reveal delay={0}>
          <p
            className="names-text text-gold-gradient-dark mb-4 mt-1"
            style={{
              fontSize: lang === "ml" ? "1.85rem" : "2.6rem",
              lineHeight: 1.25,
            }}
          >
            {t("letter.greeting")}
          </p>
        </Reveal>

        {/* Invitation header styled like reference stationery */}
        <Reveal delay={0.06}>
          <p
            className={`
              font-serif text-[0.78rem] sm:text-sm text-[--color-ink] font-semibold mb-1
              ${lang === "ml" ? "normal-case tracking-normal text-xs sm:text-sm font-semibold" : "uppercase tracking-[0.2em]"}
            `}
          >
            {t("letter.tagline")}
          </p>

          <p
            className={
              lang === "ml"
                ? "font-ml font-bold text-3xl sm:text-4xl text-[--color-crimson] my-1.5"
                : "font-script text-5xl sm:text-6xl text-[--color-crimson] leading-none my-1.5"
            }
          >
            {t("letter.wedding")}
          </p>

          {lang === "en" && (
            <p className="font-script text-2xl sm:text-3xl text-[--color-ink]/70 -mt-1 mb-1">
              {t("letter.of")}
            </p>
          )}

          {/* Names laid out on 3 lines: "Aamir Suhail", "&", "Sajeena K S" */}
          <div className="flex flex-col items-center mt-2 mb-5">
            <span
              className={`
                text-[--color-ink] font-bold leading-tight
                ${
                  lang === "ml"
                    ? "font-ml text-2xl sm:text-3xl"
                    : "font-serif text-[1.75rem] sm:text-3xl md:text-4xl tracking-wide"
                }
              `}
            >
              {t("letter.groom")}
            </span>

            <span
              className={`
                my-1 select-none leading-none
                ${
                  lang === "ml"
                    ? "font-ml text-xl sm:text-2xl text-[--color-gold] font-bold"
                    : "font-serif italic text-2xl sm:text-3xl text-[--color-gold] font-normal"
                }
              `}
              aria-hidden="true"
            >
              &
            </span>

            <span
              className={`
                text-[--color-ink] font-bold leading-tight
                ${
                  lang === "ml"
                    ? "font-ml text-2xl sm:text-3xl"
                    : "font-serif text-[1.75rem] sm:text-3xl md:text-4xl tracking-wide"
                }
              `}
            >
              {t("letter.bride")}
            </span>
          </div>
        </Reveal>

        {/* Date, Time, Venue block */}
        <Reveal delay={0.12}>
          <div className="my-2 space-y-1.5">
            <p
              className={`
                font-serif text-sm sm:text-base text-[--color-ink] font-semibold max-w-[32ch] mx-auto leading-relaxed
                ${lang === "ml" ? "normal-case tracking-normal" : "uppercase tracking-wider"}
              `}
            >
              {renderWithLargerNumbers(t("letter.date"))}
            </p>
            <p
              className={`
                font-serif text-xs sm:text-sm text-[--color-ink] font-semibold leading-snug
                ${lang === "ml" ? "normal-case tracking-normal" : "uppercase tracking-wider"}
              `}
            >
              {renderWithLargerNumbers(t("letter.time"))}
            </p>
            <p
              className={`
                font-serif text-xs sm:text-sm text-[--color-ink] font-semibold max-w-[30ch] mx-auto leading-relaxed pt-0.5
                ${lang === "ml" ? "normal-case tracking-normal" : "uppercase tracking-wider"}
              `}
            >
              {t("letter.venue")}
            </p>
          </div>
        </Reveal>

        {/* Request sentence: "We kindly request the presence of you and your family to celebrate with us." */}
        <Reveal delay={0.18}>
          <p
            className={`
              font-serif text-sm sm:text-base leading-relaxed text-[--color-ink]/85 max-w-[34ch] mx-auto mt-4 mb-2
              ${lang === "ml" ? "font-ml text-sm sm:text-base" : ""}
            `}
          >
            {t("letter.request")}
          </p>
        </Reveal>

        {/* Countdown timer directly under the request sentence */}
        {countdown && (
          <Reveal delay={0.24} className="w-full">
            <div className="mt-3 sm:mt-4 w-full">
              <Countdown countdown={countdown} t={t} lang={lang} className="mt-0" />
            </div>
          </Reveal>
        )}

        {/* Action Buttons: Open in Google Maps & Add to your calendar */}
        <div className="mt-6 sm:mt-8 w-full flex flex-col items-center gap-2.5">
          <Reveal delay={0.28} className="w-full">
            <PrimaryButton
              as="a"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{t("venue.mapsButton")}</span>
            </PrimaryButton>
          </Reveal>

          {!isAfter && (
            <Reveal delay={0.32} className="w-full">
              <SecondaryButton
                as="a"
                href={gCalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{t("venue.calendarButton")}</span>
              </SecondaryButton>
            </Reveal>
          )}
        </div>

        {/* Gold Divider with tapered lines and centered star */}
        <Reveal delay={0.36}>
          <GoldDivider className="max-w-[220px] mx-auto my-6 sm:my-7" />
        </Reveal>

        {/* Closing message: "We look forward to sharing this joyous occasion with you." */}
        <Reveal delay={0.4}>
          <p
            className={`
              font-serif text-sm sm:text-base italic leading-relaxed text-[--color-ink]/85 max-w-[34ch] mx-auto mb-2
              ${lang === "ml" ? "font-ml not-italic text-sm sm:text-base" : ""}
            `}
          >
            {t("footer.closingMessage")}
          </p>

          {/* Blessing: "Insha'Allah" in gold script */}
          <p
            className="names-text text-gold-gradient-dark my-2"
            style={{
              fontSize: lang === "ml" ? "1.85rem" : "2.5rem",
              lineHeight: 1.25,
            }}
          >
            {t("letter.blessing")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
