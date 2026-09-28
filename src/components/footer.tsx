import Link from "next/link";
import { salon } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Footer() {
  return (
    <footer className="border-t border-ink/15 px-5 py-10 md:px-10">
      <Reveal className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm text-ink/70">
            Een concept van{" "}
            <Link
              href="/over-dit-concept"
              className="relative font-medium text-ink after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-oak after:transition-transform after:duration-400 after:ease-signature hover:text-oak hover:after:scale-x-100"
            >
              Xbuilt Studio
            </Link>
            . Dit is een demo-ontwerp, niet de website van {salon.name}.
          </p>
          <p className="text-sm text-ink/70">
            {salon.name}
            <br />
            {salon.street}, {salon.city}
            <br />
            <a
              href={`tel:${salon.phoneTel}`}
              className="relative transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-oak after:transition-transform after:duration-400 after:ease-signature hover:text-oak hover:after:scale-x-100"
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
