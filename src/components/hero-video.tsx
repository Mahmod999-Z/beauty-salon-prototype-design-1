"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        wrapper.style.transform = `perspective(1200px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) scale(1.03)`;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="hero-video-wrapper h-full w-full transition-transform duration-300 ease-out will-change-transform"
      >
        <video
          ref={videoRef}
          aria-hidden="true"
          tabIndex={-1}
          className="hero-video h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.jpg"
        >
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Geluid aanzetten" : "Geluid uitzetten"}
        className="absolute bottom-4 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-paper/30 text-paper/80 backdrop-blur-sm transition-colors duration-300 ease-signature hover:border-oak hover:text-oak"
      >
        {muted ? (
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <path
              d="M3 8v4h3.5L11 16V4L6.5 8H3z"
              fill="currentColor"
            />
            <path
              d="M14.5 7l4 6M18.5 7l-4 6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <path d="M3 8v4h3.5L11 16V4L6.5 8H3z" fill="currentColor" />
            <path
              d="M14 6.5a5 5 0 0 1 0 7M16.2 4.3a8 8 0 0 1 0 11.4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        )}
      </button>
    </>
  );
}
