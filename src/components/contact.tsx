import { salon } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { whatsappHref } from "@/lib/whatsapp";

export function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${salon.street}, ${salon.city}`,
  )}&output=embed`;

  return (
    <section id="contact" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="type-label text-ink/60">Contact</p>
          <h2 className="type-heading mt-3">Loop binnen, of bel.</h2>
          <a
            href={`tel:${salon.phoneTel}`}
            className="type-heading relative mt-8 inline-block text-oak after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-oak after:transition-transform after:duration-500 after:ease-signature hover:after:scale-x-100"
          >
            {salon.phoneDisplay}
          </a>
          <p className="mt-6 max-w-md text-ink/80">
            Geen afspraak nodig. Binnenlopen mag.
          </p>
          <a
            href={whatsappHref("Hoi, ik wil graag een afspraak maken.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition-all duration-300 ease-signature hover:-translate-y-0.5 hover:border-oak hover:text-oak"
            style={{ borderRadius: "2px" }}
          >
            App via WhatsApp
          </a>
        </Reveal>
        <Reveal className="md:col-span-4 md:col-start-9">
          <p className="type-label text-ink/60">Adres</p>
          <p className="mt-4 text-xl">
            {salon.street}
            <br />
            {salon.city}
          </p>
          <a
            href={salon.mapsUrl}
            className="relative mt-4 inline-block text-sm after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-oak after:transition-transform after:duration-400 after:ease-signature hover:after:scale-x-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Route naar de zaak
          </a>
          <p className="mt-8 text-ink/80">
            Studentenkorting (collegekaart verplicht) en 55+ korting.
          </p>
        </Reveal>
      </div>
      <Reveal delay={120} className="mx-auto mt-14 max-w-6xl">
        <div className="h-64 w-full overflow-hidden border border-ink/10 grayscale transition-[filter] duration-500 ease-signature hover:grayscale-0 md:h-80">
          <iframe
            title={`Kaart naar ${salon.name}`}
            src={mapSrc}
            loading="lazy"
            className="h-full w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  );
}
