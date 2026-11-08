// App entry – splash → opening → open
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { useLang } from "./context/LanguageContext";
import LangToggle from "./components/LangToggle";
import Splash from "./components/Splash";
import MusicToggle from "./components/MusicToggle";
import Hero from "./components/Hero";
import Letter from "./components/Letter";
import useMusic from "./hooks/useMusic";
import useCountdown from "./hooks/useCountdown";
import {
  MONOGRAM,
  MUSIC_SRC,
  EVENT_START_ISO,
  EVENT_DURATION_HOURS,
} from "./data/wedding";

export default function App() {
  const { t, lang } = useLang();

  // Dev shortcut: ?skip starts directly at open (no music, no animation)
  const [phase, setPhase] = useState(() => {
    if (
      import.meta.env.DEV &&
      typeof window !== "undefined" &&
      window.location.search.includes("?skip")
    ) {
      return "open";
    }
    return "splash";
  });

  const music = useMusic(MUSIC_SRC);
  const countdown = useCountdown(EVENT_START_ISO, EVENT_DURATION_HOURS);

  // Scroll lock while splash / opening
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (phase !== "open") {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [phase]);

  // Focus main content when fully open
  const mainRef = useRef(null);
  useEffect(() => {
    if (phase === "open" && mainRef.current) {
      mainRef.current.focus();
    }
  }, [phase]);

  const handleSplashTap = () => {
    music.start(); // must fire synchronously for autoplay permissions
    setPhase("opening");
  };

  const handleSplashComplete = () => {
    setPhase("open");
  };

  const reduced = useReducedMotion();

  return (
    <>
      {/*
        Outer wrapper: on desktop shows crimson-deep background (set on body).
        page-column constrains content to max 430px centered.
      */}
      <main
        ref={mainRef}
        tabIndex={-1}
        inert={phase === "splash" ? "" : undefined}
        className="page-column"
        style={{ outline: "none" }}
      >
        {/* Real Hero – visible after splash opens */}
        {phase !== "splash" && (
          <Hero t={t} phase={phase} lang={lang} />
        )}

        {/* Invitation Letter (complete framed stationery with details, countdown, buttons & closing) */}
        {phase !== "splash" && (
          <Letter t={t} lang={lang} countdown={countdown} />
        )}
      </main>

      {/* LangToggle always on top – z-50, tone adjusts with phase */}
      <LangToggle tone={phase === "splash" ? "dark" : "light"} />

      {/* Splash overlay – AnimatePresence handles unmounting */}
      <AnimatePresence>
        {phase !== "open" && (
          <Splash
            t={t}
            monogram={MONOGRAM}
            phase={phase}
            onTap={handleSplashTap}
            onComplete={handleSplashComplete}
            reduced={reduced}
          />
        )}
      </AnimatePresence>

      {/* Music toggle – only when music exists and splash has started opening */}
      {music.available && (phase === "opening" || phase === "open") && (
        <MusicToggle music={music} t={t} />
      )}
    </>
  );
}
