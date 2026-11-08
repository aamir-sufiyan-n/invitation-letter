import { createContext, useContext, useEffect, useState } from "react";
import { content, DEFAULT_LANG } from "../data/wedding";

const LanguageContext = createContext(null);

// Resolve a dot-path key from an object, e.g. "letter.body"
function resolvePath(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}

// Track whether the Malayalam font CSS has been loaded
let mlFontLoaded = false;

async function loadMalayalamFont() {
  if (mlFontLoaded) return;
  mlFontLoaded = true;
  try {
    await import("@fontsource/noto-serif-malayalam/400.css");
    await import("@fontsource/noto-serif-malayalam/600.css");
    await import("@fontsource/noto-serif-malayalam/700.css");
  } catch (e) {
    console.warn("[LanguageContext] Failed to load Malayalam font:", e);
  }
}

function readStoredLang() {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "ml") return stored;
  } catch {
    // localStorage blocked (in-app browsers, private mode, etc.)
  }
  return DEFAULT_LANG;
}

function writeLang(lang) {
  try {
    localStorage.setItem("lang", lang);
  } catch {
    // silently ignore
  }
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  const meta = content[lang]?.meta ?? content.en.meta;
  document.title = meta.title;
  if (lang === "ml") {
    loadMalayalamFont();
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => readStoredLang());

  // Apply on first render
  useEffect(() => {
    applyLang(lang);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function setLang(next) {
    if (next !== "en" && next !== "ml") return;
    writeLang(next);
    applyLang(next);
    setLangState(next);
  }

  function toggleLang() {
    setLang(lang === "en" ? "ml" : "en");
  }

  /**
   * t("dot.path.key") → resolves from content[lang], falls back to content.en,
   * returns the key string itself if missing (with a dev warning).
   * Works for both primitives and arrays/objects.
   */
  function t(path) {
    const primary = resolvePath(content[lang], path);
    if (primary !== undefined) return primary;

    const fallback = resolvePath(content.en, path);
    if (fallback !== undefined) return fallback;

    if (import.meta.env.DEV) {
      console.warn(`[t] Missing translation key: "${path}"`);
    }
    return path;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

