"use client";

import { useEffect, useState } from "react";

const notes = [
  {
    id: "top",
    title: "De eerste indruk",
    note: "Direct een compositie, geen banner met tekst erop. Video plus een live open-status bewijst dat dit een levende site is, geen screenshot.",
  },
  {
    id: "diensten",
    title: "Meer dan een prijslijst",
    note: "De calculator eindigt in een kant-en-klaar WhatsApp-bericht. Dat kan geen standaard boekingsprofiel.",
  },
  {
    id: "over",
    title: "Bewijs, geen beweringen",
    note: "Elk cijfer telt op vanuit 0 zodra het in beeld komt — het voelt als een feit, niet als marketingtekst.",
  },
  {
    id: "reviews",
    title: "Echte klanten, woordelijk",
    note: "Dit demo-voorbeeld toont illustratieve reviews. Bij een echte klant vullen we dit met hun eigen, geverifieerde Google-reviews — woordelijk, niets verzonnen.",
  },
  {
    id: "galerij",
    title: "De echte zaak",
    note: "Deze demo gebruikt sfeerbeelden. Bij een echte klant vervangen we dit door foto's van hun eigen zaak — geen stockfoto's van een andere salon.",
  },
  {
    id: "tijden",
    title: "Altijd actueel",
    note: "Deze klok berekent zichzelf continu opnieuw. Geen openingstijden die ooit kunnen verouderen.",
  },
  {
    id: "contact",
    title: "Frictieloos boeken",
    note: "Bellen, WhatsAppen of de kaart — drie manieren om vandaag nog binnen te lopen.",
  },
];

export function PitchMode() {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("pitch") === "1";
  });
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (!open) return;
    const sections = notes
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-pressed={open}
        className="fixed bottom-5 right-5 z-[65] flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-bone text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 ease-signature hover:-translate-y-0.5 hover:border-oak hover:text-oak"
      >
        <span className="type-label">{open ? "×" : "i"}</span>
      </button>

      {open ? (
        <aside
          className="fixed inset-x-0 bottom-0 z-[64] max-h-[55vh] overflow-y-auto border-t border-ink/15 bg-bone px-5 py-6 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.25)] md:inset-x-auto md:bottom-4 md:right-4 md:top-24 md:max-h-none md:w-80 md:rounded-none md:border"
        >
          <p className="type-label text-ink/60">Pitch-modus</p>
          <p className="mt-1 text-xs text-ink/50">
            Notities voor Xbuilt Studio — niet zichtbaar voor gasten van de
            zaak tenzij deze knop wordt gebruikt.
          </p>
          <div className="mt-6 flex flex-col gap-5">
            {notes.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`block border-l-2 pl-4 transition-colors duration-300 ${
                  active === n.id
                    ? "border-oak"
                    : "border-ink/10 hover:border-oak/50"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    active === n.id ? "text-oak" : "text-ink"
                  }`}
                >
                  {n.title}
                </p>
                <p className="mt-1 text-sm text-ink/60">{n.note}</p>
              </a>
            ))}
          </div>
        </aside>
      ) : null}
    </>
  );
}
