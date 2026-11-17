"use client";

import NextLink from "next/link";
import { useState, type CSSProperties } from "react";
import type { Constellation } from "@/types/content";
import { Link } from "@/components/ui/Link";
import { orbitAngle, useOrbitClock } from "./useOrbitClock";
import styles from "./subproject.module.css";

const SIZE = 640;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RING_R = { 1: 150, 2: 230 } as const;
const PERIOD = { 1: 24, 2: 26 } as const;

type Props = {
  constellation: Constellation;
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

export function SubprojectDisplay({ constellation }: Props) {
  const [paused, setPaused] = useState(false);
  const seconds = useOrbitClock(paused);
  const placed = constellation.entries.map((entry) => {
    const angle = orbitAngle(entry.angle, seconds, PERIOD[entry.ring]);
    const { x, y } = polar(entry.ring, angle);
    return { entry, angle, x, y };
  });

  const axis = placed.length >= 2 ? [placed[0], placed[1]] : null;

  return (
    <div className={styles.page}>
      <p className={styles.crumb}>
        <Link href="/projects">{constellation.breadcrumbIndex}</Link>
        <span className={styles.crumbSep}>/</span>
        <span>{constellation.code}</span>
      </p>
      <h1 className={styles.title}>{constellation.title}</h1>
      <p className={styles.subtitle}>{constellation.subtitle}</p>

      <div
        className={styles.stage}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg className={styles.svg} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
          <circle className={styles.orbit} cx={CX} cy={CY} r={RING_R[1]} />
          <circle className={styles.orbit} cx={CX} cy={CY} r={RING_R[2]} />
          {axis ? (
            <line
              className={styles.axis}
              x1={axis[0].x}
              y1={axis[0].y}
              x2={axis[1].x}
              y2={axis[1].y}
            />
          ) : null}
          <text className={styles.centre} x={CX} y={CY}>
            {constellation.code}
          </text>
          {placed.map(({ entry, x, y }) => {
            const active = entry.status === "active";
            return (
              <g key={entry.id} transform={`translate(${x} ${y})`}>
                {active ? <circle className={styles.glow} cx={0} cy={0} r={12} /> : null}
                <circle className={active ? styles.core : styles.coreSoon} cx={0} cy={0} r={6} />
              </g>
            );
          })}
        </svg>

        {placed.map(({ entry, angle, x, y }) => {
          const below = labelBelow(angle);
          const style = {
            left: `${(x / SIZE) * 100}%`,
            top: `${(y / SIZE) * 100}%`,
            transform: below ? "translate(-50%, 12px)" : "translate(-50%, calc(-100% - 12px))",
          } as CSSProperties;
          const active = entry.status === "active" && entry.slug;

          if (active) {
            return (
              <NextLink
                key={entry.id}
                href={`/projects/${entry.slug}`}
                className={`${styles.node} ${styles.nodeActive}`}
                style={style}
              >
                <span className={styles.nodeTitle}>{entry.title}</span>
                <span className={styles.nodeYear}>{entry.year}</span>
              </NextLink>
            );
          }

          return (
            <span key={entry.id} className={`${styles.node} ${styles.nodeSoon}`} style={style}>
              <span className={styles.nodeTitle}>{entry.title}</span>
              <span className={styles.nodeYear}>{entry.year}</span>
            </span>
          );
        })}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Entry</th>
            <th scope="col">Tags</th>
            <th scope="col">Year</th>
          </tr>
        </thead>
        <tbody>
          {constellation.entries.map((entry, index) => (
            <tr key={entry.id}>
              <td>{String(index + 1).padStart(2, "0")}</td>
              <td>
                {entry.status === "active" && entry.slug ? (
                  <NextLink href={`/projects/${entry.slug}`}>{entry.title}</NextLink>
                ) : (
                  <span className={styles.muted}>{entry.title}</span>
                )}
              </td>
              <td className={styles.muted}>{entry.tags.join(", ")}</td>
              <td>{entry.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
