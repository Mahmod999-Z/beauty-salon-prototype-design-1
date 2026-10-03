"use client";

import { formatEuro, parsePrice } from "@/lib/price";
import { useCountUp } from "@/hooks/use-count-up";

export function AnimatedPrice({ price }: { price: string }) {
  const parsed = parsePrice(price);
  const { ref, display } = useCountUp(parsed?.value ?? 0, {
    duration: 900,
    threshold: 0.1,
  });

  if (!parsed) {
    return <span>{price}</span>;
  }

  return (
    <span ref={ref}>
      {parsed.prefix}
      {formatEuro(display, parsed.decimals)}
    </span>
  );
}
