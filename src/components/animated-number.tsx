"use client";

import { useCountUp } from "@/hooks/use-count-up";

export function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
  duration = 900,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, display } = useCountUp(value, { duration, threshold: 0.3 });

  return (
    <span ref={ref}>
      {display.toLocaleString("nl-NL", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
