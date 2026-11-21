"use client";

import NextLink from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import type { ProjectStar } from "@/types/content";
import styles from "./star-map.module.css";

const SIZE = 640;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RING_R = { 1: 168, 2: 248 } as const;

type Props = {
  stars: ProjectStar[];
  originLabel: string;
  hint: string;
  lead?: string;
};

function polar(ring: 1 | 2, angleDeg: number) {
  return pointOnSpoke(RING_R[ring], angleDeg);
}

function pointOnSpoke(radius: number, angleDeg: number) {
  const angle = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(angle), y: CY + radius * Math.sin(angle) };
}

function ease(progress: number) {
  return progress * progress * (3 - 2 * progress);
}

export function ProjectStarMap({ stars, originLabel, hint, lead }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motionTokens = getComputedStyle(stage);
    const mean = Number(motionTokens.getPropertyValue("--map-star-mean-travel"));
    const shiftMs = Number(motionTokens.getPropertyValue("--map-star-shift-ms"));
    const pauseMs = Number(motionTokens.getPropertyValue("--map-star-pause-ms"));
    const cycleMs = 2 * shiftMs + pauseMs;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const spokes = stage.querySelectorAll<SVGLineElement>("[data-star-spoke]");
    const dots = stage.querySelectorAll<SVGGElement>("[data-star-dot]");
    const labels = stage.querySelectorAll<HTMLElement>("[data-star-label]");
    let frame = 0;

    const motion = stars.map((star, index) => ({
      radius: RING_R[star.ring],
      angle: star.angle,
      spoke: spokes[index],
      dot: dots[index],
      label: labels[index],
    }));

    function draw(star: (typeof motion)[number], distance: number) {
      const { x, y } = pointOnSpoke(star.radius + distance, star.angle);
      star.spoke.setAttribute("x2", String(x));
      star.spoke.setAttribute("y2", String(y));
      star.dot.setAttribute("transform", `translate(${x} ${y})`);
      star.label.style.setProperty("--map-node-x", `${(x / SIZE) * 100}cqw`);
      star.label.style.top = `${(y / SIZE) * 100}%`;
    }

    function nextDistance() {
      return mean * (0.5 + Math.random());
    }

    function updatePreference() {
      cancelAnimationFrame(frame);
      if (reducedMotion.matches) {
        motion.forEach((star) => draw(star, 0));
        return;
      }

      const now = performance.now();
      const cycles = motion.map(() => ({
        start: now + Math.random() * shiftMs,
        distance: nextDistance(),
      }));

      function animate(time: number) {
        motion.forEach((star, index) => {
          const cycle = cycles[index];
          let elapsed = Math.max(0, time - cycle.start);
          if (elapsed >= cycleMs) {
            cycle.start = time;
            cycle.distance = nextDistance();
            elapsed = 0;
          }

          const progress = Math.max(0, 1 - Math.abs(elapsed / shiftMs - 1));
          draw(star, cycle.distance * ease(progress));
        });
        frame = requestAnimationFrame(animate);
      }

      frame = requestAnimationFrame(animate);
    }

    updatePreference();
    reducedMotion.addEventListener("change", updatePreference);
    return () => {
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", updatePreference);
    };
  }, [stars]);

  return (
    <div className={styles.wrap}>
      {lead ? <p className={styles.hintTop}>{lead}</p> : null}
      <div ref={stageRef} className={styles.stage}>
        <svg className={styles.svg} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
          <g>
            <circle className={styles.orbit} cx={CX} cy={CY} r={RING_R[1]} />
            <circle className={styles.orbit} cx={CX} cy={CY} r={RING_R[2]} />
          </g>

          {stars.map((star) => {
            const { x, y } = polar(star.ring, star.angle);
            return (
              <line
                key={`spoke-${star.id}`}
                className={styles.spoke}
                data-star-spoke=""
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
              />
            );
          })}

          <text className={styles.origin} x={CX} y={CY}>
            {originLabel}
          </text>

          {stars.map((star) => {
            const { x, y } = polar(star.ring, star.angle);
            const active = star.status === "active";
            return (
              <g key={star.id} data-star-dot="" transform={`translate(${x} ${y})`}>
                {active ? <circle className={styles.rim} cx={0} cy={0} /> : null}
                <circle className={active ? styles.core : styles.coreSoon} cx={0} cy={0} r={5.5} />
              </g>
            );
          })}
        </svg>

        {stars.map((star) => {
          const { x, y } = polar(star.ring, star.angle);
          const style = {
            "--map-node-x": `${(x / SIZE) * 100}cqw`,
            top: `${(y / SIZE) * 100}%`,
          } as CSSProperties;
          const active = star.status === "active" && star.slug;

          if (active) {
            return (
              <NextLink
                key={`hit-${star.id}`}
                href={`/projects/${star.slug}`}
                className={`${styles.node} ${styles.nodeActive}`}
                data-star-label=""
                style={style}
              >
                <span className={styles.nodeDot} aria-hidden="true" />
                <span className={styles.nodeLabel}>{star.label}</span>
                <span className={styles.nodeCode}>{star.code}</span>
              </NextLink>
            );
          }

          return (
            <span key={`hit-${star.id}`} className={`${styles.node} ${styles.nodeSoon}`} data-star-label="" style={style}>
              <span className={styles.nodeDot} aria-hidden="true" />
              <span className={styles.nodeLabel}>{star.label}</span>
              <span className={styles.nodeCode}>{star.code}</span>
            </span>
          );
        })}
      </div>
      <p className={styles.hint}>{hint}</p>
    </div>
  );
}
