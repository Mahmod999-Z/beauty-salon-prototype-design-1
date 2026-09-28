import { salon } from "@/lib/content";
import { AnimatedNumber } from "@/components/animated-number";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="over" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-end gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="type-label text-ink/60">Over {salon.owner}</p>
          <p className="type-display mt-4">
            <AnimatedNumber value={salon.years} />
          </p>
          <p className="type-label mt-3 text-ink/60">jaar in het vak</p>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7">
          <h2 className="type-heading">
            {salon.owner} luistert naar wat je echt wilt.
          </h2>
          <p className="mt-6 max-w-prose text-ink/80">
            {salon.owner} heeft meer dan {salon.years} jaar ervaring. Hij staat
            erom bekend te luisteren naar wat de klant wil. De sfeer in de zaak
            is ontspannen en huiselijk. Heren, dames en kinderen zijn welkom.
          </p>
          <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-ink/10 pt-8">
            <div>
              <p className="font-display text-4xl leading-none text-oak">
                <AnimatedNumber value={Number(salon.ratingValue)} decimals={1} />
              </p>
              <p className="type-label mt-2 text-ink/60">
                uit {salon.reviewCount} beoordelingen
              </p>
            </div>
            <div>
              <p className="font-display text-4xl leading-none text-oak">
                <AnimatedNumber value={salon.reviewCount} />
              </p>
              <p className="type-label mt-2 text-ink/60">reviews op Google</p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-oak px-3 py-1.5 type-label text-oak">
              Alleen inlopen
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
