import type { Metadata } from "next";
import Link from "next/link";
import { salon } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Het proces achter elk concept · Xbuilt Studio",
};

const steps = [
  {
    label: "01",
    title: "Research eerst, ontwerp daarna.",
    body: "Voor een echte klant zoeken we eerst op wat er al over hun zaak bestaat: het Google Bedrijfsprofiel, reviews, foto's, openingstijden. Niets wordt verzonnen. Dit exemplaar is een demo-sjabloon — de inhoud hieronder is ter illustratie, geen research naar een bestaande zaak.",
  },
  {
    label: "02",
    title: "De kleuren komen bij voorkeur uit de zaak zelf.",
    body: "Heeft een klant nog geen merk om op voort te bouwen? Dan meten we het palet letterlijk aan de fysieke zaak — de stoelen, de wanden, het materiaal van de schappen. Dit voorbeeld gebruikt een neutraal ink/brick/bone/oak-palet dat op vrijwel elke salon past, als startpunt.",
  },
  {
    label: "03",
    title: "Echte reviews, echte foto's — bij een echt project.",
    body: "De testimonials en foto's hieronder zijn illustratief. Bij een echte klant vervangen we ze door woordelijke citaten van hun eigen, geverifieerde Google-reviews en foto's van hun eigen zaak — geen stockfoto's van een andere salon.",
  },
  {
    label: "04",
    title: "Levend, niet statisch.",
    body: "De status 'nu open / nu gesloten', het aftellen tot sluitingstijd en de live voortgangsbalk zijn geen screenshots — ze berekenen zich elke keer opnieuw op basis van de actuele tijd. Dat werkt al in deze demo, precies zoals bij een live project.",
  },
  {
    label: "05",
    title: "Afwerking tot in de details.",
    body: "Elke overgang gebruikt dezelfde signature-easing, prijzen tellen op wanneer ze in beeld komen, sterren vullen zich één voor één, en alles respecteert prefers-reduced-motion. Dat merk je niet bewust — maar je voelt het verschil met een sjabloon zonder aandacht.",
  },
];

export default function OverDitConcept() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <Link
          href="/"
          className="link-underline type-label text-ink/60 hover:text-oak"
        >
          ← Terug naar de site
        </Link>
        <p className="type-label mt-10 text-ink/60">Xbuilt Studio</p>
        <h1 className="type-heading mt-3 max-w-xl">
          Het proces achter elk concept.
        </h1>
        <p className="mt-6 max-w-prose text-ink/80">
          Dit exemplaar van {salon.name} is een demo-sjabloon, geen research
          naar een bestaande zaak. Maar de manier waarop we het bouwen is
          precies hoe we een echt project aanpakken. Hieronder lees je hoe.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-14">
        {steps.map((step, index) => (
          <Reveal key={step.label} delay={index * 90}>
            <div className="flex gap-6">
              <span className="font-display text-3xl leading-none text-oak">
                {step.label}
              </span>
              <div>
                <h2 className="font-display text-2xl">{step.title}</h2>
                <p className="mt-3 max-w-prose text-ink/80">{step.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={steps.length * 90} className="mt-20 border-t border-oak pt-8">
        <p className="max-w-prose text-ink/80">
          Wil je dit voor jouw zaak? Xbuilt Studio bouwt pitch-prototypes op
          dezelfde manier: eerst research naar wat er al over je bedrijf
          bestaat, dan een ontwerp dat daar echt uit voortkomt.
        </p>
        <Link
          href="/"
          className="link-underline type-label mt-6 inline-block text-oak"
        >
          Bekijk het resultaat →
        </Link>
      </Reveal>
    </main>
  );
}
