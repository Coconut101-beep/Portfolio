/** Subtle rule using design-guide border colour. */
export function Hairline({ className }: { className?: string }) {
  return (
    <hr
      className={className}
      style={{
        border: 0,
        borderTop: "1px solid var(--color-border)",
        margin: "1.5em 0",
      }}
    />
  );
}
