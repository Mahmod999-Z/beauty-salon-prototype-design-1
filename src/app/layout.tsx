import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { CursorGlow } from "@/components/cursor-glow";
import { CursorDot } from "@/components/cursor-dot";
import { ScrollProgress } from "@/components/scroll-progress";
import { jsonLd, salon } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${salon.name} · ${salon.city}`,
  description: `Kapsalon aan ${salon.street} in ${salon.city}. Heren, dames en kinderen. Binnenlopen mag, geen afspraak nodig.`,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bone text-ink">
        <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-oak focus:px-3 focus:py-2 focus:text-ink"
        >
          Ga naar inhoud
        </a>
        {children}
        <ScrollProgress />
        <CursorGlow />
        <CursorDot />
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
