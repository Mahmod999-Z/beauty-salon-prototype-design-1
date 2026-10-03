"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card relative transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
      <div aria-hidden="true" className="tilt-specular" />
    </div>
  );
}
