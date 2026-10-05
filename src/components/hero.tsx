"use client";

import { useEffect, useRef } from "react";
import { salon } from "@/lib/content";
import { HeroVideo } from "@/components/hero-video";
import { HeroBokeh } from "@/components/hero-bokeh";
import { OpenBadge } from "@/components/open-badge";
import { Reveal } from "@/components/reveal";
import { useHeroScrollEffects } from "@/hooks/use-hero-scroll";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useHeroScrollEffects(bgRef, cueRef);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-offscreen", !entry.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="safari-clip-fix relative flex flex-col overflow-hidden bg-ink md:min-h-[100svh]"
    >
      <div
        ref={bgRef}
        className="hero-bg-mask absolute inset-0 overflow-hidden"
        style={{ transform: "translateZ(0)" }}
      >
        <HeroVideo />
        <div aria-hidden="true" className="hero-vignette absolute inset-0" />
        <div aria-hidden="true" className="hero-grain absolute inset-0" />
        <HeroBokeh />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/50"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-bone md:h-28"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-24 md:px-10 md:pt-28">
        <Reveal>
          <p className="flex flex-wrap items-center gap-3 type-label text-paper/70">
            {salon.street}, {salon.city}
            <OpenBadge />
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="type-display mt-5 text-paper md:mt-8">
            {salon.name.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 grid items-end gap-6 md:mt-12 md:grid-cols-12">
            <p className="max-w-sm text-paper/80 md:col-span-5">
              Heren, dames en kinderen. Al meer dan {salon.years} jaar.
            </p>
            <p className="type-label text-paper/60 md:col-span-4 md:col-start-9">
              {salon.rating} uit {salon.reviewCount} beoordelingen
            </p>
          </div>
        </Reveal>
        <Reveal
          delay={360}
          className="relative z-10 mt-10 md:-mb-28 md:mt-auto md:pt-16"
        >
          <div className="ml-auto w-full bg-brick px-6 py-8 text-paper md:w-[min(100%,40rem)] md:px-10 md:py-12">
            <div className="h-px w-14 bg-oak" />
            <p className="type-walkin mt-6">Geen afspraak nodig.</p>
            <p className="mt-4 text-lg text-paper/85">Binnenlopen mag.</p>
            <a
              href={`tel:${salon.phoneTel}`}
              data-cursor-label="Bel"
              className="mt-8 inline-flex bg-oak px-5 py-3 text-sm font-medium text-ink transition-all duration-300 ease-signature hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.45)]"
              style={{ borderRadius: "2px" }}
            >
              Bel {salon.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
      <div
        ref={cueRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center motion-reduce:hidden md:flex"
      >
        <span className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-paper/30 text-paper/70">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 5l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
