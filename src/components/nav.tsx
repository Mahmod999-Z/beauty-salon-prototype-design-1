"use client";

import { useEffect, useState } from "react";
import { salon } from "@/lib/content";

const links = [
  { href: "#diensten", label: "Diensten" },
  { href: "#over", label: "Over" },
  { href: "#reviews", label: "Reviews" },
  { href: "#galerij", label: "Foto's" },
  { href: "#tijden", label: "Tijden" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "border-ink/15 bg-bone/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-10">
        <a
          href="#top"
          className={`font-display text-lg leading-none tracking-tight transition-colors duration-500 ${
            scrolled ? "text-ink" : "text-paper"
          }`}
        >
          {salon.name.split(" ")[0]}
        </a>
        <nav aria-label="Pagina">
          <ul
            className={`flex items-center gap-3 text-xs transition-colors duration-500 md:gap-6 md:text-sm ${
              scrolled ? "text-ink" : "text-paper/90"
            }`}
          >
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative whitespace-nowrap pb-1 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-oak after:transition-transform after:duration-400 after:ease-signature hover:text-oak hover:after:scale-x-100 ${
                      isActive ? "text-oak after:scale-x-100" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
