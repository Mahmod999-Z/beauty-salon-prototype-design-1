import { reviewKeywords, reviews, salon } from "@/lib/content";
import { AnimatedNumber } from "@/components/animated-number";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`star ${i < rating ? "text-oak" : "text-ink/15"}`}
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function Reviews() {
  const roundedRating = Math.round(Number(salon.ratingValue));

  return (
    <section id="reviews" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-label text-ink/60">Beoordelingen</p>
            <h2 className="type-heading mt-3 max-w-xl">Wat klanten zeggen.</h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-display text-5xl leading-none">
              <AnimatedNumber value={Number(salon.ratingValue)} decimals={1} />
            </p>
            <div>
              <Stars rating={roundedRating} />
              <p className="type-label mt-1 text-ink/60">
                uit {salon.reviewCount} beoordelingen
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80} className="mt-8 flex flex-wrap gap-2">
          {reviewKeywords.map((keyword) => (
            <span
              key={keyword.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-sm text-ink/70"
            >
              {keyword.label}
              <span className="text-ink/40">· {keyword.count}×</span>
            </span>
          ))}
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 90}>
              <TiltCard className="flex h-full flex-col border-t border-ink/15 pt-6">
                <Stars rating={review.rating} />
                <p className="mt-4 flex-1 font-display text-xl leading-snug text-ink/90">
                  “{review.quote}”
                </p>
                <p className="type-label mt-6 text-ink/60">
                  {review.name} · {review.date}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={salon.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block text-sm after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-oak after:transition-transform after:duration-400 after:ease-signature hover:after:scale-x-100"
          >
            Bekijk alle beoordelingen op Google
          </a>
          <span className="text-sm text-ink/40">
            Bijgewerkt vanuit Google · {salon.reviewsUpdated}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
