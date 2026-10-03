"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealVariant = "fade-up" | "fade-scale" | "slide-left" | "slide-right" | "clip";

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
