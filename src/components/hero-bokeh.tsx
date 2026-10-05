import type { CSSProperties } from "react";

type Particle = {
  size: number;
  x: string;
  y: string;
  dx: number;
  dy: number;
  delay: number;
  duration: number;
};

const particles: Particle[] = [
  { size: 220, x: "8%", y: "12%", dx: 26, dy: -18, delay: 0, duration: 22 },
  { size: 180, x: "80%", y: "10%", dx: -20, dy: 24, delay: 2, duration: 19 },
  { size: 260, x: "62%", y: "58%", dx: 18, dy: -26, delay: 4, duration: 26 },
  { size: 150, x: "16%", y: "72%", dx: -24, dy: 20, delay: 1, duration: 21 },
  { size: 190, x: "90%", y: "42%", dx: 22, dy: 18, delay: 6, duration: 24 },
];

export function HeroBokeh() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="hero-bokeh"
          style={
            {
              "--size": `${p.size}px`,
              "--x": p.x,
              "--y": p.y,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--delay": `${p.delay}s`,
              "--duration": `${p.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
