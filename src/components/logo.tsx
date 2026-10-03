"use client";

import { useEffect, useRef } from "react";
import { salon } from "@/lib/content";

export function Logo({ light }: { light: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const id = requestAnimationFrame(() => el.classList.add("is-visible"));
    return () => cancelAnimationFrame(id);
  }, []);

  const words = salon.name.split(" ");

  return (
    <a
      ref={ref}
      href="#top"
      className={`logo group relative inline-flex flex-col leading-none font-display text-lg tracking-tight transition-colors duration-500 ${
        light ? "text-paper" : "text-ink"
      }`}
    >
      <span className="inline-flex gap-[0.35em]">
        {words.map((word, i) => (
          <span
            key={i}
            className="logo-word inline-block"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {word}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="logo-underline mt-0.5 block h-px w-full bg-oak"
      />
    </a>
  );
}
