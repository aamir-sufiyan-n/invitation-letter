import { useEffect, useState } from "react";

let devOffset = null;

function getNow() {
  if (import.meta.env.DEV && typeof window !== "undefined") {
    if (devOffset === null) {
      const params = new URLSearchParams(window.location.search);
      const nowParam = params.get("now");
      if (nowParam) {
        const parsed = new Date(nowParam).getTime();
        if (!isNaN(parsed)) {
          devOffset = parsed - Date.now();
        } else {
          devOffset = 0;
        }
      } else {
        devOffset = 0;
      }
    }
    return Date.now() + devOffset;
  }
  return Date.now();
}

function computeCountdown(targetIso, durationHours) {
  const targetMs = new Date(targetIso).getTime();
  const durationMs = durationHours * 3600 * 1000;
  const now = getNow();

  if (now < targetMs) {
    const diff = targetMs - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, status: "before" };
  }

  if (now < targetMs + durationMs) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: "during" };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0, status: "after" };
}

/**
 * useCountdown
 * @param {string} targetIso ISO string of event start
 * @param {number} durationHours Duration in hours
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, status: "before" | "during" | "after" }}
 */
export default function useCountdown(targetIso, durationHours) {
  const [countdown, setCountdown] = useState(() =>
    computeCountdown(targetIso, durationHours)
  );

  useEffect(() => {
    let timerId = null;

    function tick() {
      const next = computeCountdown(targetIso, durationHours);
      setCountdown(next);

      if (next.status === "after") {
        return;
      }

      const now = getNow();
      const delay = 1000 - (now % 1000);
      timerId = setTimeout(tick, delay);
    }

    const initialNow = getNow();
    const initialDelay = 1000 - (initialNow % 1000);
    timerId = setTimeout(tick, initialDelay);

    function handleVisibility() {
      if (!document.hidden) {
        tick();
      } else if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (timerId) clearTimeout(timerId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [targetIso, durationHours]);

  return countdown;
}

