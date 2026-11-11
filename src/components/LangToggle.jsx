import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";

/**
 * LangToggle
 * Compact circular toggle button at the bottom-right corner with transparent background.
 * Displays "മ" when in English, and "EN" when in Malayalam.
 *
 * Automatically adapts contrast:
 *   - Dark tone (gold-light text/border) on splash & hero screen (dark burgundy backgrounds)
 *   - Light tone (ink text/border) when scrolled down into the cream letter card
 */
export default function LangToggle({ tone = "light" }) {
  const { lang, toggleLang, t } = useLang();
  const [isScrolledToContent, setIsScrolledToContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.65;
      setIsScrolledToContent(window.scrollY > heroThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const label =
    lang === "en"
      ? "Switch to Malayalam (മലയാളം)"
      : "Switch to English (EN)";

  const display = lang === "en" ? (t("ui.toggleToMl") || "മ") : (t("ui.toggleToEn") || "EN");

  // Use dark tone on splash or while on the dark hero screen, light tone on cream letter
  const isDark = tone === "dark" || !isScrolledToContent;

  return (
    <button
      onClick={toggleLang}
      aria-label={label}
      style={{
        bottom: "calc(var(--safe-bottom) + 1rem)",
        right: "calc(var(--safe-right) + 1rem)",
      }}
      className={[
        "fixed z-50",
        "w-9 h-9 min-w-[36px] min-h-[36px]",
        "flex items-center justify-center",
        "rounded-full",
        "border-[1.5px]",
        "bg-transparent",
        "font-serif text-xs font-bold",
        "opacity-100",
        "cursor-pointer select-none",
        "transition-colors duration-200",
        // Touch ergonomics hit target expansion
        "before:absolute before:inset-[-8px] before:content-['']",
        isDark
          ? "text-[--color-gold-light] border-[--color-gold-light]"
          : "text-[--color-ink] border-[--color-ink]",
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
