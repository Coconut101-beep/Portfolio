import type { ReactNode } from "react";

/** Sub-heading style from design-guide: body size, italic. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontSize: "var(--text-h3)",
        fontStyle: "italic",
        fontWeight: "var(--weight-regular)",
        color: "var(--color-ink)",
      }}
    >
      {children}
    </span>
  );
}
