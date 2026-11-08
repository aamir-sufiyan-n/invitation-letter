import { motion, useReducedMotion } from "motion/react";

/**
 * Reveal
 * A scroll-triggered entrance wrapper using motion's whileInView.
 * Fades in and rises from y=24 to y=0 over 0.7s, once only.
 * Under reduced motion: 0.3s fade, no movement.
 *
 * Props:
 *   delay   – number (seconds), stagger delay (default 0)
 *   className – extra classes passed to the wrapper div
 *   children  – content to reveal
 */
export default function Reveal({ delay = 0, className = "", children }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduced ? 0.3 : 0.7,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

