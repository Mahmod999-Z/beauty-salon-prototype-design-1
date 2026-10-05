"use client";

import { useEffect, type RefObject } from "react";

export function useHeroScrollEffects(
  bgRef: RefObject<HTMLDivElement | null>,
  cueRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const parallax = Math.min(y * 0.15, 40);
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${parallax}px) translateZ(0)`;
        }
        if (cueRef.current) {
          cueRef.current.style.opacity = String(Math.max(0, 1 - y / 80));
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
