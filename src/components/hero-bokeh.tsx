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
  { size: 160, x: "78%", y: "8%", dx: -20, dy: 24, delay: 2, duration: 19 },
  { size: 260, x: "62%", y: "58%", dx: 18, dy: -26, delay: 4, duration: 26 },
  { size: 140, x: "18%", y: "70%", dx: -24, dy: 20, delay: 1, duration: 21 },
  { size: 190, x: "90%", y: "40%", dx: 22, dy: 18, delay: 6, duration: 24 },
  { size: 120, x: "40%", y: "20%", dx: -18, dy: -22, delay: 3, duration: 18 },
  { size: 200, x: "30%", y: "85%", dx: 20, dy: -16, delay: 5, duration: 23 },
  { size: 150, x: "70%", y: "80%", dx: -22, dy: 18, delay: 7, duration: 20 },
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
