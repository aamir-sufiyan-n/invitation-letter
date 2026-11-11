import { motion, useReducedMotion } from "motion/react";

/**
 * SecondaryButton
 * Minimal transparent button with ink/gold border and dark text.
 * Can render as a <button> or <a> based on `as="a"` or `href`.
 */
export default function SecondaryButton({
  as,
  href,
  onClick,
  children,
  className = "",
  target,
  rel,
  ...props
}) {
  const reduced = useReducedMotion();
  const Component = as === "a" || href ? motion.a : motion.button;

  const baseStyles = `
    min-h-[42px] w-full max-w-[16.5rem] mx-auto
    flex items-center justify-center gap-2 text-center
    px-5 py-2
    rounded-full
    border border-[--color-gold]/70
    bg-transparent text-[--color-ink]
    font-cinzel text-xs sm:text-sm font-semibold
    tracking-[0.1em] uppercase
    cursor-pointer select-none no-underline
    focus-visible:outline-2 focus-visible:outline-[--color-gold-dark] focus-visible:outline-offset-2
    hover:border-[--color-gold] hover:text-[--color-crimson]
    transition-all duration-200
  `;

  return (
    <Component
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      whileTap={{ scale: reduced ? 1 : 0.97 }}
      transition={{ duration: 0.12 }}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
