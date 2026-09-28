import { serviceGroups } from "@/lib/content";
import { AnimatedPrice } from "@/components/animated-price";
import { Reveal } from "@/components/reveal";
import { ServiceCalculator } from "@/components/service-calculator";

export function Services() {
  return (
    <section id="diensten" className="px-5 pt-16 md:px-10 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="type-label text-ink/60">Diensten & prijzen</p>
          <h2 className="type-heading mt-3 max-w-xl">
            Wat er op de stoel gebeurt, en wat het kost.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-12">
          {serviceGroups.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 120} className="group/col">
              <div className="transition-transform duration-500 ease-signature hover:-translate-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl">{group.label}</h3>
                    <div className="mt-3 h-px w-10 bg-oak transition-[width] duration-500 ease-out group-hover/col:w-16" />
                  </div>
                  <span
                    aria-hidden="true"
                    className="select-none font-display text-6xl leading-none text-ink/25 transition-all duration-500 ease-out group-hover/col:-translate-y-1 group-hover/col:text-oak/60"
                  >
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-8">
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
                          className={`font-display text-xl transition-transform duration-300 ease-out group-hover/row:-translate-y-0.5 group-hover/row:scale-110 ${
                            service.priceOnRequest
                              ? "text-sm text-ink/55"
                              : "text-oak"
                          }`}
                        >
                          {service.priceOnRequest ? (
                            service.price
                          ) : (
                            <AnimatedPrice price={service.price} />
                          )}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
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
