"use client";

import { useEffect, useState } from "react";
import { salon, hours } from "@/lib/content";
import { readStatus, type Status } from "@/lib/hours-status";
import { Reveal } from "@/components/reveal";

export function Hours() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(readStatus(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="tijden"
      className="relative overflow-hidden bg-gradient-to-br from-brick to-[#3a3836] px-5 py-20 text-paper md:px-10 md:py-28"
    >
      <div aria-hidden="true" className="hero-grain absolute inset-0" />
      <Reveal
        variant="clip"
        className="relative z-10 mx-auto grid max-w-6xl gap-12 md:grid-cols-12"
      >
        <div className="md:col-span-5">
          <p className="type-label text-paper/60">Openingstijden</p>
          <h2 className="type-heading mt-3">Wanneer de deur open is.</h2>
          <p
            className="mt-6 flex items-center gap-3 text-paper/80"
            aria-live="polite"
          >
            <span className="relative flex h-2.5 w-2.5">
              {status?.open ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-oak opacity-75" />
              ) : null}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  status === null
                    ? "bg-paper/30"
                    : status.open
                      ? "bg-oak"
                      : "bg-paper/40"
                }`}
              />
            </span>
            {status === null ? "…" : status.open ? "Nu open." : "Nu gesloten."}
          </p>
          {status?.remainingLabel ? (
            <p className="type-label mt-2 text-paper/45">
              {status.remainingLabel}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${salon.phoneTel}`}
              data-cursor-label="Bel"
              className="inline-flex items-center bg-oak px-5 py-3 text-sm font-medium text-ink transition-all duration-300 ease-signature hover:-translate-y-0.5"
              style={{ borderRadius: "2px" }}
            >
              Bel nu
            </a>
            <a
              href={salon.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Route"
              className="inline-flex items-center border border-paper/30 px-5 py-3 text-sm font-medium text-paper transition-all duration-300 ease-signature hover:-translate-y-0.5 hover:border-oak hover:text-oak"
              style={{ borderRadius: "2px" }}
            >
              Route
            </a>
          </div>
        </div>
        <dl className="md:col-span-6 md:col-start-7">
          {hours.map((row, index) => {
            const isToday = status?.todayRow === index;
            return (
              <div
                key={row.label}
                className={`group/hour relative grid grid-cols-2 gap-4 overflow-hidden border-t py-4 transition-colors duration-300 ${
                  isToday ? "border-oak/50" : "border-paper/20"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0 bg-paper/10 transition-[width] duration-300 ease-out group-hover/hour:w-full"
                />
                <dt
                  className={`relative ${isToday ? "text-paper" : "text-paper/80"}`}
                >
                  {row.label}
                  {isToday ? (
                    <span className="type-label ml-2 align-middle text-oak">
                      Vandaag
                    </span>
                  ) : null}
                </dt>
                <dd
                  className={`relative ${
                    row.closed
                      ? "text-paper/55"
                      : isToday
                        ? "text-oak"
                        : "text-paper/80"
                  }`}
                >
                  {row.time}
                </dd>
                {isToday && status?.open ? (
                  <div className="relative col-span-2 h-px w-full bg-paper/15">
                    <div
                      className="h-px bg-oak transition-[width] duration-1000 ease-linear"
                      style={{ width: `${status.progress * 100}%` }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </dl>
      </Reveal>
    </section>
  );
}
