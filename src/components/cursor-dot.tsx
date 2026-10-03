"use client";

import { useEffect, useRef, useState } from "react";

export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let frame = 0;
    let active = false;

    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      if (!active) {
        active = true;
        el.classList.add("is-active");
      }
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      el.style.setProperty("--cx", `${pos.current.x}px`);
      el.style.setProperty("--cy", `${pos.current.y}px`);
      frame = requestAnimationFrame(tick);
    };

    const onOver = (event: MouseEvent) => {
      const hovered = (event.target as HTMLElement)?.closest?.(
        "[data-cursor-label]",
      );
      if (hovered) {
        setHovering(true);
        setLabel(hovered.getAttribute("data-cursor-label") ?? "");
      }
    };

    const onOut = (event: MouseEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      const stillInside = related?.closest?.("[data-cursor-label]");
      if (!stillInside) {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`cursor-dot ${hovering ? "cursor-dot--hovering" : ""}`}
    >
      {label ? <span className="cursor-dot-label">{label}</span> : null}
    </div>
  );
}
