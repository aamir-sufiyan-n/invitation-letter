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

        {/* Invitation header: slight gap below greeting, slight gap above/below the whole block */}
        <Reveal delay={0.06}>
          <p
            className={`
              text-[--color-ink] font-medium mt-2 mb-0
              ${
                lang === "ml"
                  ? "font-ml normal-case tracking-normal text-xs sm:text-sm font-medium"
                  : "font-cinzel text-xs sm:text-sm uppercase tracking-[0.08em]"
              }
            `}
          >
            {t("letter.tagline")}
          </p>

          {/* ── The whole calligraphy block: Wedding / of / Names — with breathing room ── */}
          <div className="mt-[25px] mb-[25px]">
            {/* "Wedding" — slightly smaller than the names */}
            <p
              className={
                lang === "ml"
                  ? "font-ml font-bold text-3xl sm:text-4xl text-[--color-crimson] leading-tight mb-0"
                  : "font-brittany text-4xl sm:text-5xl text-[--color-ink] leading-tight mb-0"
              }
            >
              {t("letter.wedding")}
            </p>

            {lang === "en" && (
              <p className="font-moontime text-2xl sm:text-3xl text-[--color-ink] leading-none mt-0 mb-0">
                {t("letter.of")}
              </p>
            )}

            {/* Names: Aamir Suhail / and / Sajeena K S */}
            <div className="flex flex-col items-center mt-0">
              <span
                className={`
                  text-[--color-ink] leading-tight whitespace-nowrap
                  ${
                    lang === "ml"
                      ? "font-ml font-bold text-2xl sm:text-3xl"
                      : "font-brittany text-4xl sm:text-5xl md:text-6xl tracking-wide"
                  }
                `}
              >
                {t("letter.groom")}
              </span>

              <span
                className={`
                  select-none leading-none
                  ${
                    lang === "ml"
                      ? "font-ml text-xl sm:text-2xl text-[--color-gold] font-bold"
                      : "font-moontime text-2xl sm:text-3xl text-[--color-ink] font-normal"
                  }
                `}
                aria-hidden="true"
              >
                {lang === "en" ? t("letter.and") : t("letter.ampersand")}
              </span>

              <span
                className={`
                  text-[--color-ink] leading-tight whitespace-nowrap
                  ${
                    lang === "ml"
                      ? "font-ml font-bold text-2xl sm:text-3xl"
                      : "font-brittany text-4xl sm:text-5xl md:text-6xl tracking-wide"
                  }
                `}
              >
                {t("letter.bride")}
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── Venue + Date info row ── */}
        <Reveal delay={0.1}>
          <div className="w-full flex items-stretch justify-center gap-0 mt-3 mb-2">
            {/* Left: venue with location pin */}
            <div className="flex items-start gap-2 pr-5 sm:pr-7 border-r border-[--color-ink]/30">
              {/* Location pin icon */}
              <svg
                className="w-[1.1rem] h-[1.1rem] mt-0.5 flex-shrink-0 text-[--color-ink]"
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
              <p
                className={`
                  text-left leading-snug text-[--color-ink]
                  ${lang === "ml" ? "font-ml text-sm font-semibold" : "font-cinzel text-[0.72rem] sm:text-xs uppercase tracking-[0.08em] font-bold"}
                `}
              >
                {lang === "ml" ? (
                  <>ഷേർളി ഓഡിറ്റോറിയം<br />കുളത്തൂപ്പുഴ</>
                ) : (
                  <>Sherley<br />Auditorium<br />Kulathupuzha</>
                )}
              </p>
            </div>

            {/* Right: date + time with calendar icon */}
            <div className="flex items-start gap-2 pl-5 sm:pl-7">
              {/* Calendar icon */}
              <svg
                className="w-[1.1rem] h-[1.1rem] mt-0.5 flex-shrink-0 text-[--color-ink]"
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
              <p
                className={`
                  text-left leading-snug text-[--color-ink]
                  ${lang === "ml" ? "font-ml text-sm font-semibold" : "font-cinzel text-[0.72rem] sm:text-xs uppercase tracking-[0.08em] font-bold"}
                `}
              >
                {lang === "ml" ? (
                  <>ഡിസംബർ 6<br />ഞായർ<br />ഉച്ചയ്ക്ക് 12:30 ന്</>
                ) : (
                  <>December 6<br />Sunday<br />12:30 PM</>
                )}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Request sentence */}
        <Reveal delay={0.18}>
          <p
            className={`
              leading-relaxed text-[--color-ink] max-w-[34ch] mx-auto mt-4 mb-2
              ${
                lang === "ml"
                  ? "font-ml text-sm sm:text-base"
                  : "font-cinzel text-xs sm:text-sm uppercase tracking-[0.1em] font-medium"
              }
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
              leading-relaxed text-[--color-ink] max-w-[34ch] mx-auto mb-2
              ${
                lang === "ml"
                  ? "font-ml not-italic text-sm sm:text-base"
                  : "font-cinzel text-xs sm:text-sm uppercase tracking-[0.08em] font-medium"
              }
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
