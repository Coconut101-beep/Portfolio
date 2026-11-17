"use client";

import NextLink from "next/link";
import { useState, type CSSProperties } from "react";
import type { ProjectStar } from "@/types/content";
import { orbitAngle, useOrbitClock } from "./useOrbitClock";
import styles from "./star-map.module.css";

const SIZE = 640;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RING_R = { 1: 168, 2: 248 } as const;
/** Seconds for one full orbit; outer rings move slightly slower. */
const PERIOD = { 1: 22, 2: 30 } as const;

type Props = {
  stars: ProjectStar[];
  originLabel: string;
  hint: string;
  lead?: string;
};

function polar(ring: 1 | 2, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const r = RING_R[ring];
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function labelBelow(angle: number) {
  const a = ((angle % 360) + 360) % 360;
  return a > 90 && a < 270;
}

export function ProjectStarMap({ stars, originLabel, hint, lead }: Props) {
  const [paused, setPaused] = useState(false);
  const seconds = useOrbitClock(paused);

  const placed = stars.map((star) => {
    const angle = orbitAngle(star.angle, seconds, PERIOD[star.ring]);
    const { x, y } = polar(star.ring, angle);
    return { star, angle, x, y };
  });

  return (
    <div className={styles.wrap}>
      {lead ? <p className={styles.hintTop}>{lead}</p> : null}
      <div
        className={styles.stage}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg className={styles.svg} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
          <g className={styles.orbits}>
            <circle className={styles.orbit} cx={CX} cy={CY} r={RING_R[1]} />
            <circle className={styles.orbit} cx={CX} cy={CY} r={RING_R[2]} />
          </g>

          {placed.map(({ star, x, y }) => (
            <line
              key={`spoke-${star.id}`}
              className={styles.spoke}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
            />
          ))}

          <text className={styles.origin} x={CX} y={CY}>
            {originLabel}
          </text>

          {placed.map(({ star, x, y }) => {
            const active = star.status === "active";
            return (
              <g key={star.id} transform={`translate(${x} ${y})`}>
                <g className={active ? styles.float : undefined}>
                  {active ? <circle className={styles.glow} cx={0} cy={0} r={14} /> : null}
                  <circle className={active ? styles.core : styles.coreSoon} cx={0} cy={0} r={5.5} />
                </g>
              </g>
            );
          })}
        </svg>

        {placed.map(({ star, angle, x, y }) => {
          const below = labelBelow(angle);
          const style = {
            left: `${(x / SIZE) * 100}%`,
            top: `${(y / SIZE) * 100}%`,
            transform: below ? "translate(-50%, 10px)" : "translate(-50%, calc(-100% - 10px))",
          } as CSSProperties;
          const active = star.status === "active" && star.slug;

          if (active) {
            return (
              <NextLink
                key={`hit-${star.id}`}
                href={`/projects/${star.slug}`}
                className={`${styles.node} ${styles.nodeActive}`}
                style={style}
              >
                <span className={styles.nodeLabel}>{star.label}</span>
                <span className={styles.nodeCode}>{star.code}</span>
              </NextLink>
            );
          }

          return (
            <span key={`hit-${star.id}`} className={`${styles.node} ${styles.nodeSoon}`} style={style}>
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
