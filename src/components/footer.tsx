"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { salon } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { readStatus, type Status } from "@/lib/hours-status";

export function Footer() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(readStatus(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-ink/15 px-5 py-10 md:px-10">
      <Reveal className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm text-ink/70">
            Een concept van{" "}
            <Link
              href="/over-dit-concept"
              className="link-underline font-medium text-ink hover:text-oak"
            >
              Xbuilt Studio
            </Link>
            . Dit is een demo-ontwerp, niet de website van {salon.name}.
          </p>
          <p className="text-sm text-ink/70">
            {salon.name}
            {status ? (
              <span className="ml-2 inline-flex items-center gap-1.5 text-xs text-ink/50">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${status.open ? "bg-oak" : "bg-ink/30"}`}
                />
                {status.open ? "Nu open" : "Nu gesloten"}
              </span>
            ) : null}
            <br />
            {salon.street}, {salon.city}
            <br />
            <a
              href={`tel:${salon.phoneTel}`}
              className="link-underline transition-colors duration-300 hover:text-oak"
            >
              {salon.phoneDisplay}
            </a>
          </p>
        </div>
        <p className="type-label border-t border-ink/10 pt-6 text-ink/40">
          AA-toegankelijk · gebouwd met Next.js 16 · razendsnel
        </p>
      </Reveal>
    </footer>
  );
}
