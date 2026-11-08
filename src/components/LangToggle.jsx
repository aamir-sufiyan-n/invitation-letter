import { useLang } from "../context/LanguageContext";

/**
 * LangToggle
 * Compact circular toggle button top-right with transparent background.
 * Displays "മ" when in English, and "EN" when in Malayalam.
 *
 * Props:
 *   tone – "dark" (on splash: gold-light text)
 *         | "light" (after open: ink text)
 *         default "light"
 */
export default function LangToggle({ tone = "light" }) {
  const { lang, toggleLang, t } = useLang();

  const label =
    lang === "en"
      ? "Switch to Malayalam (മലയാളം)"
      : "Switch to English (EN)";

  const display = lang === "en" ? (t("ui.toggleToMl") || "മ") : (t("ui.toggleToEn") || "EN");

  const isDark = tone === "dark";

  return (
    <button
      onClick={toggleLang}
      aria-label={label}
      style={{ top: "calc(var(--safe-top) + 0.75rem)" }}
      className={[
        "fixed right-4 z-50",
        "w-8 h-8",
        "flex items-center justify-center",
        "rounded-full",
        "border-[1.5px]",
        "bg-transparent",
        "font-serif text-xs font-bold",
        "opacity-100",
        "cursor-pointer select-none",
        "transition-colors duration-200",
        // Invisible hit target expansion for touch ergonomics
        "before:absolute before:inset-[-8px] before:content-['']",
        isDark ? "text-[--color-gold-light] border-[--color-gold-light]" : "text-[--color-ink] border-[--color-ink]",
      ].join(" ")}
    >
      <span
        style={{
          fontFamily: lang === "en" ? "var(--font-ml), var(--font-serif)" : "var(--font-serif)",
          lineHeight: 1,
        }}
      >
        {display}
      </span>
    </button>
  );
}
