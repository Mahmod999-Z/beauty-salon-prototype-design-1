"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { serviceGroups } from "@/lib/content";
import { formatEuro, parsePrice } from "@/lib/price";
import { whatsappHref } from "@/lib/whatsapp";

function useTweenedTotal(target: number) {
  const [display, setDisplay] = useState(target);
  const frame = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(frame.current);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame.current = requestAnimationFrame(() => setDisplay(target));
      return () => cancelAnimationFrame(frame.current);
    }

    const start = performance.now();
    const from = display;
    const duration = 400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (target - from) * eased);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return display;
}

export function ServiceCalculator() {
  const flat = useMemo(
    () => serviceGroups.flatMap((group) => group.services),
    [],
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const chosen = flat.filter((service) => selected.has(service.name));
  const hasFrom = chosen.some(
    (service) => service.priceOnRequest || /vanaf/i.test(service.price),
  );
  const total = chosen.reduce((sum, service) => {
    if (service.priceOnRequest) return sum;
    const parsed = parsePrice(service.price);
    return parsed ? sum + parsed.value : sum;
  }, 0);
  const totalMinutes = chosen.reduce((sum, service) => {
    const minutes = service.duration ? parseInt(service.duration, 10) : 0;
    return sum + (Number.isFinite(minutes) ? minutes : 0);
  }, 0);

  const message =
    chosen.length > 0
      ? `Hoi, ik wil graag: ${chosen.map((service) => service.name).join(", ")}.`
      : "Hoi, ik wil graag een afspraak maken.";

  const displayTotal = useTweenedTotal(total);

  return (
    <div className="mt-16 border-t border-oak pt-10">
      <p className="type-label text-ink/60">Stel je bezoek samen</p>
      <h3 className="type-heading mt-3 max-w-lg">Wat wil je laten doen?</h3>
      <div className="mt-6 flex flex-wrap gap-2">
        {flat.map((service) => {
          const isSelected = selected.has(service.name);
          return (
            <button
              key={service.name}
              type="button"
              onClick={() => toggle(service.name)}
              aria-pressed={isSelected}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ease-signature active:scale-95 ${
                isSelected
                  ? "border-oak bg-oak text-ink"
                  : "border-ink/20 text-ink/70 hover:border-oak hover:text-ink"
              }`}
            >
              {service.name}
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-6">
        <div>
          <p className="type-label text-ink/60">Geschat totaal</p>
          <p className="font-display text-4xl leading-none text-oak">
            {chosen.length === 0
              ? "—"
              : `${hasFrom ? "vanaf " : ""}€${formatEuro(displayTotal)}`}
          </p>
          {totalMinutes > 0 ? (
            <p className="mt-2 text-sm text-ink/60">± {totalMinutes} minuten</p>
          ) : null}
        </div>
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-label="App"
          className="inline-flex items-center gap-2 bg-oak px-5 py-3 text-sm font-medium text-ink transition-all duration-300 ease-signature hover:-translate-y-0.5"
          style={{ borderRadius: "2px" }}
        >
          Stuur via WhatsApp
        </a>
      </div>
    </div>
  );
}
