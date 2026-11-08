import { useEffect, useRef, useState } from "react";

/**
 * Hook to manage background music playback.
 * @param {string} src URL of the audio file (empty string disables music).
 * @returns {{available:boolean, state:string, start:()=>void, toggle:()=>void}}
 */
export default function useMusic(src) {
  const audioRef = useRef(null);
  const [state, setState] = useState("idle"); // idle | playing | muted

  const available = !!src;

  // Lazily create the Audio element when start() is first called
  const start = () => {
    if (!available) return;
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      audioRef.current = audio;
    }
    const audio = audioRef.current;
    // Fade in volume
    const fadeDuration = 1200; // ms
    const targetVol = 0.7;
    const step = 50;
    let elapsed = 0;
    const fade = () => {
      elapsed += step;
      const vol = Math.min((elapsed / fadeDuration) * targetVol, targetVol);
      audio.volume = vol;
      if (elapsed < fadeDuration) {
        setTimeout(fade, step);
      }
    };
    audio
      .play()
      .then(() => {
        setState("playing");
        fade();
      })
      .catch(() => {
        setState("muted");
      });
  };

  const toggle = () => {
    if (!available || !audioRef.current) return;
    const audio = audioRef.current;
    if (state === "playing") {
      audio.pause();
      setState("idle");
    } else {
      start();
    }
  };

  // Pause when tab hidden, resume if it was playing before
  useEffect(() => {
    if (!available) return;
    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          setState("idle");
        }
      } else {
        // do nothing; user can tap toggle to play again
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handleVisibility);
    };
  }, [available]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { available, state, start, toggle };
}

