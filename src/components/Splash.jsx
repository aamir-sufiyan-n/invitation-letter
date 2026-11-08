import { useEffect } from "react";
import { motion, useAnimation } from "motion/react";

/**
 * Splash screen component.
 * Features:
 *  - Background matched to the interior hero color (#3D0103) with a warm central glow
 *  - Silky smooth curtain-opening transition on tap
 *  - Elegant gold monogram and responsive "Touch to open" cue (reduced delay 0.4s, increased opacity)
 */
export default function Splash({ t, monogram, phase, onTap, onComplete, reduced }) {
  const monogramControls = useAnimation();
  const lineControls = useAnimation();
  const hintControls = useAnimation();
  const leftPanelControls = useAnimation();
  const rightPanelControls = useAnimation();
  const contentControls = useAnimation();

  // Intro sequence (run once on mount)
  useEffect(() => {
    async function runIntro() {
      if (reduced) {
        await Promise.all([
          monogramControls.start({ opacity: 1, transition: { duration: 0.3 } }),
          lineControls.start({ opacity: 1, transition: { duration: 0.3 } }),
          hintControls.start({ opacity: 1, transition: { duration: 0.3 } }),
        ]);
        return;
      }
      // Monogram scale + fade in
      monogramControls.start({
        opacity: 1,
        scale: 1,
        transition: { delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      });
      // Gold line expand
      lineControls.start({
        scaleX: 1,
        transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
      });
      // Hint appearance: reduced delay to 0.4s and full opacity
      hintControls.start({
        opacity:1,
        transition: {
          delay: 0.4,
          duration: 0.5,
          ease: "easeOut",
        },
      });
    }
    runIntro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Curtain opening exit animation when phase becomes "opening"
  useEffect(() => {
    if (phase !== "opening") return;

    async function runExit() {
      if (reduced) {
        await contentControls.start({
          opacity: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        });
        await Promise.all([
          leftPanelControls.start({ opacity: 0, transition: { duration: 0.4 } }),
          rightPanelControls.start({ opacity: 0, transition: { duration: 0.4 } }),
        ]);
        onComplete();
        return;
      }

      // Smooth curtain opening curve: velvety deceleration
      const curtainEase = [0.16, 1, 0.3, 1];
      const duration = 1.15;

      // 1. Content smoothly dissolves as curtains start to part
      contentControls.start({
        opacity: 0,
        scale: 0.96,
        transition: { duration: 0.45, ease: "easeOut" },
      });

      // 2. Both curtain panels part simultaneously to left and right
      await Promise.all([
        leftPanelControls.start({
          x: "-102%",
          opacity: [1, 1, 0.85, 0],
          transition: { duration, ease: curtainEase },
        }),
        rightPanelControls.start({
          x: "102%",
          opacity: [1, 1, 0.85, 0],
          transition: { duration, ease: curtainEase },
        }),
      ]);

      onComplete();
    }

    runExit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleClick = () => {
    if (phase !== "splash") return;
    onTap();
  };

  // Color matched to the interior background (#3D0103) with a warm subtle glow
  const curtainBackground =
    "radial-gradient(ellipse at center, #4D0307 0%, #3D0103 68%, #2A0102 100%)";

  return (
    <motion.button
      onClick={handleClick}
      aria-label={t("splash.tapToOpen")}
      className="fixed inset-0 z-30 flex overflow-hidden cursor-pointer"
      style={{ outline: "none", backgroundColor: "transparent" }}
    >
      {/* Left Curtain Panel */}
      <motion.div
        animate={leftPanelControls}
        initial={{ x: 0, opacity: 1 }}
        style={{
          background: curtainBackground,
          width: "50%",
          height: "100%",
          boxShadow: "inset -12px 0 28px -4px rgba(0, 0, 0, 0.5)",
        }}
        className="relative will-change-transform"
      />

      {/* Right Curtain Panel */}
      <motion.div
        animate={rightPanelControls}
        initial={{ x: 0, opacity: 1 }}
        style={{
          background: curtainBackground,
          width: "50%",
          height: "100%",
          boxShadow: "inset 12px 0 28px -4px rgba(0, 0, 0, 0.5)",
        }}
        className="relative will-change-transform"
      />

      {/* Centered Content Overlay */}
      <motion.div
        animate={contentControls}
        initial={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
      >
        {/* Monogram */}
        <motion.div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
          }}
          className="text-gold-gradient select-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={monogramControls}
        >
          {monogram}
        </motion.div>

        {/* Delicate Gold Line */}
        <motion.div
          className="w-24 h-px bg-[--color-gold]/80 mt-2"
          initial={{ scaleX: 0 }}
          animate={lineControls}
        />

        {/* Tap to open hint (full opacity and reduced delay to 0.4s) */}
        <motion.div
          className="absolute bottom-8 text-xs sm:text-sm font-serif tracking-[0.25em] uppercase text-[--color-gold-light] font-semibold select-none"
          initial={{ opacity: 0 }}
          animate={hintControls}
        >
          {t("splash.tapToOpen")}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
