import { serviceGroups } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ServiceCalculator } from "@/components/service-calculator";
import { TiltCard } from "@/components/tilt-card";

export function Services() {
  return (
    <section
      id="diensten"
      className="relative z-10 bg-bone px-5 pt-16 shadow-[0_-40px_60px_-30px_rgba(0,0,0,0.3)] md:px-10 md:pt-40"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="type-label text-ink/60">Diensten & prijzen</p>
          <h2 className="type-heading mt-3 max-w-xl">
            Wat er op de stoel gebeurt, en wat het kost.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {serviceGroups.map((group, groupIndex) => {
            const featured = group.id === "heren";
            return (
              <Reveal
                key={group.id}
                delay={groupIndex * 120}
                variant="fade-scale"
                className="group/col h-full"
              >
                <TiltCard
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2px] bg-paper p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-500 ${
                    featured ? "ring-1 ring-oak" : ""
                  }`}
                >
                  {featured ? (
                    <span className="absolute right-6 top-6 rounded-full bg-oak px-3 py-1 type-label text-ink">
                      Populair
                    </span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/15 font-display text-lg text-ink/50 transition-colors duration-500 ease-out group-hover/col:border-oak group-hover/col:text-oak"
                  >
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-6 text-3xl">{group.label}</h3>
                  <div className="mt-3 h-px w-10 bg-oak transition-[width] duration-500 ease-out group-hover/col:w-16" />
                  <ul className="mt-8 flex-1">
                    {group.services.map((service) => (
                      <li
                        key={service.name}
                        className="group/row relative flex items-baseline justify-between gap-4 border-b border-ink/10 py-4 last:border-b-0"
                      >
                        <span className="text-ink/85 transition-colors duration-300 group-hover/row:text-ink">
                          {service.name}
                          {service.duration ? (
                            <span className="mt-0.5 block text-sm text-ink/50">
                              {service.duration}
                            </span>
                          ) : null}
                        </span>
                        <span className="flex items-baseline gap-2">
                          <span
                            aria-hidden="true"
                            className="-translate-x-1 font-display text-oak opacity-0 transition-all duration-300 ease-out group-hover/row:translate-x-0 group-hover/row:opacity-100"
                          >
                            →
                          </span>
                          <span
                            className={`font-display text-xl tabular-nums transition-transform duration-300 ease-out group-hover/row:-translate-y-0.5 group-hover/row:scale-110 ${
                              service.priceOnRequest
                                ? "text-sm text-ink/55"
                                : "text-oak"
                            }`}
                          >
                            {service.price}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-12 max-w-xl border-t border-oak pt-6 text-ink/80">
          <p>
            Studentenkorting (collegekaart verplicht) en 55+ korting. Het
            studententarief voor mannen knippen staat hierboven.
          </p>
        </Reveal>
        <Reveal>
          <ServiceCalculator />
        </Reveal>
      </div>
    </section>
  );
}
