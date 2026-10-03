"use client";

import { useEffect, useState } from "react";
import { salon } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

const photos = [
  {
    src: "/gallery-storefront.jpg",
    alt: "De ingang van de salon",
  },
  {
    src: "/gallery-interior.jpg",
    alt: "Interieur van de salon met de kappersstoelen",
  },
  {
    src: "/gallery-owner.jpg",
    alt: "Een van onze stylisten aan het werk",
  },
];

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const close = () => {
    setIsClosing(true);
    window.setTimeout(() => {
      setOpenIndex(null);
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      }
      if (event.key === "ArrowLeft") {
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + photos.length) % photos.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <section id="galerij" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <p className="type-label text-ink/60">Ons werk</p>
          <h2 className="type-heading mt-3 max-w-xl">
            Een kijkje bij {salon.name}.
          </h2>
        </Reveal>
      </div>
      <Reveal className="mt-14" delay={120} variant="fade-scale">
        <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track group/gallery flex gap-6 md:gap-8">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1 ? "true" : undefined}
                className="flex shrink-0 gap-6 md:gap-8"
              >
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="h-64 w-80 shrink-0 overflow-hidden transition-all duration-500 ease-signature group-hover/gallery:opacity-50 hover:z-10 hover:scale-105 hover:opacity-100! md:h-80 md:w-[26rem]"
                  >
                    {copy === 0 ? (
                      <TiltCard className="h-full w-full">
                        <button
                          type="button"
                          onClick={() => setOpenIndex(index)}
                          aria-label={`Bekijk foto groter: ${photo.alt}`}
                          data-cursor-label="Bekijk"
                          className="block h-full w-full cursor-zoom-in"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            loading="eager"
                            className="gallery-photo h-full w-full object-cover"
                          />
                        </button>
                      </TiltCard>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo.src}
                        alt=""
                        loading="lazy"
                        className="gallery-photo h-full w-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {openIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[openIndex].alt}
          className={`lightbox-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm ${isClosing ? "is-closing" : ""}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Sluiten"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors duration-300 hover:border-oak hover:text-oak"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[openIndex].src}
            alt={photos[openIndex].alt}
            className={`lightbox-image max-h-[80vh] max-w-full object-contain ${isClosing ? "is-closing" : ""}`}
            onClick={(event) => event.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-paper/70">
            {photos[openIndex].alt}
          </p>
        </div>
      ) : null}
    </section>
  );
}
