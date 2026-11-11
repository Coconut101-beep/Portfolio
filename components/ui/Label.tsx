import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Label({ children, className }: Props) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        fontSize: "var(--text-xs)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: "var(--color-ink-muted)",
      }}
    >
      {children}
    </span>
  );
}
