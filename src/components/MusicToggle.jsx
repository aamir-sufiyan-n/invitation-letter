import { motion } from "motion/react";

/**
 * MusicToggle
 * Fixed circular button bottom-right. Fades in after reveal.
 * Shows play/mute SVG icons.
 *
 * Props:
 *   music – { state, toggle } from useMusic
 *   t     – translation function
 */
export default function MusicToggle({ music, t }) {
  const isPlaying = music.state === "playing";
  const label = isPlaying ? t("ui.muteLabel") : t("ui.unmuteLabel");

  return (
    <motion.button
      onClick={music.toggle}
      aria-pressed={isPlaying}
      aria-label={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{
        bottom: "calc(var(--safe-bottom) + 1rem)",
        right: "calc(var(--safe-right) + 1rem)",
      }}
      className="
        fixed z-40
        w-11 h-11 min-w-[44px] min-h-[44px]
        flex items-center justify-center
        rounded-full
        border border-[--color-gold]
        cursor-pointer select-none
      "
      /* ~92% opacity cream – no backdrop-filter per spec */
      /* Use inline style for the rgba since Tailwind v4 arbitrary rgba is tricky */
    >
      <span
        style={{ background: "rgba(246,236,218,0.92)" }}
        className="absolute inset-0 rounded-full"
        aria-hidden="true"
      />
      <span className="relative z-10" aria-hidden="true">
        {isPlaying ? (
          /* Mute icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="var(--color-ink)" />
            <path d="M23 9l-6 6M17 9l6 6" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          /* Play / unmute icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="var(--color-ink)" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </motion.button>
  );
}

