"use client";

import { useEffect, useRef, useState } from "react";
import { formatEuro, parsePrice } from "@/lib/price";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function AnimatedPrice({ price }: { price: string }) {
  const parsed = parsePrice(price);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number | null>(() =>
    !parsed ? null : prefersReducedMotion() ? parsed.value : 0,
  );

  useEffect(() => {
    if (!parsed || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(parsed.value * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!parsed || display === null) {
    return <span ref={ref}>{price}</span>;
  }

  return (
    <span ref={ref}>
      {parsed.prefix}
      {formatEuro(display, parsed.decimals)}
    </span>
  );
}
