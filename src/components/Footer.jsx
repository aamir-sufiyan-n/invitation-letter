import GoldDivider from "./GoldDivider";
import Reveal from "./Reveal";

/**
 * Footer
 * Displayed at the very end of the website under everything else.
 * Features:
 *   - Gold divider
 *   - Closing message ("We look forward to sharing this joyous occasion with you.")
 *   - Blessing ("Insha'Allah" in gold script)
 */
export default function Footer({ t, lang }) {
  return (
    <footer
      className="bg-[--color-cream] px-6 pt-6 pb-12 text-center"
      aria-label="Closing message"
    >
      <Reveal delay={0.1}>
        <GoldDivider className="max-w-[130px] mx-auto mb-6" />

        <p className="font-serif text-[--color-ink]/85 text-sm sm:text-base italic leading-relaxed max-w-[34ch] mx-auto mb-3">
          {t("footer.closingMessage")}
        </p>

        {/* Insha'Allah in gold script */}
        <p
          className="names-text text-gold-gradient-dark mt-3"
          style={{
            fontSize: lang === "ml" ? "1.65rem" : "2.25rem",
            lineHeight: 1.25,
          }}
        >
          {t("letter.blessing")}
        </p>
      </Reveal>
    </footer>
  );
}
