import Reveal from "./Reveal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { googleCalendarUrl } from "../utils/calendar";
import {
  EVENT_START_ISO,
  EVENT_DURATION_HOURS,
  MAPS_URL,
} from "../data/wedding";

/**
 * Venue
 * Minimal actions: View Venue on Maps and Add to Calendar.
 * (Location title has been removed to avoid duplicate text with the letter above).
 */
export default function Venue({ t, lang, countdownStatus }) {
  const isAfter = countdownStatus === "after";

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
      className="bg-[--color-cream] px-6 py-6 sm:py-8 text-center"
      aria-label="Location and Calendar Actions"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Primary button: Open in Google Maps */}
        <Reveal delay={0.1} className="w-full">
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

        {/* Google Calendar button (hidden when countdown status is "after") */}
        {!isAfter && (
          <Reveal delay={0.2} className="w-full">
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
    </section>
  );
}
