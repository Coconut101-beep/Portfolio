import type { ReactNode } from "react";

/** Sub-label: body size, italic, weight 400. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        display: "inline",
        fontSize: "var(--text-body)",
        fontWeight: "var(--weight-regular)",
        fontStyle: "italic",
        color: "var(--color-ink)",
      }}
    >
      {children}
    </span>
  );
}
