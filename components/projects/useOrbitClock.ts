"use client";

import { useEffect, useRef, useState } from "react";

/** Seconds of orbit time; freezes when paused or reduced motion is preferred. */
export function useOrbitClock(paused = false) {
  const [seconds, setSeconds] = useState(0);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    let elapsed = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (!pausedRef.current) {
        elapsed += (now - last) / 1000;
        setSeconds(elapsed);
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return seconds;
}

export function orbitAngle(baseDeg: number, seconds: number, periodSec: number) {
  if (periodSec <= 0) return baseDeg;
  return (baseDeg + (seconds / periodSec) * 360) % 360;
}
