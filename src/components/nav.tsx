"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

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
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || menuOpen
          ? "border-ink/15 bg-bone/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-10">
        <Logo light={!scrolled && !menuOpen} />
        <nav aria-label="Pagina">
          <ul
            className={`hidden items-center gap-3 text-xs transition-colors duration-500 md:flex md:gap-6 md:text-sm ${
              scrolled ? "text-ink" : "text-paper/90"
            }`}
          >
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`link-underline whitespace-nowrap pb-1 transition-colors duration-300 hover:text-oak ${
                      isActive ? "is-active text-oak" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
          className={`flex h-9 w-9 items-center justify-center transition-colors duration-300 md:hidden ${
            scrolled || menuOpen ? "text-ink" : "text-paper"
          }`}
        >
          {menuOpen ? (
            <span className="text-xl leading-none" aria-hidden="true">
              ×
            </span>
          ) : (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path
                d="M0 1h18M0 7h18M0 13h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
      {menuOpen ? (
        <nav id="mobile-nav" aria-label="Pagina (mobiel)" className="md:hidden">
          <ul className="flex flex-col divide-y divide-ink/10 border-t border-ink/10 px-5">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-4 text-sm transition-colors duration-300 hover:text-oak ${
                      isActive ? "text-oak" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
