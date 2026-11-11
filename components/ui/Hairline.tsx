/** Visual spec: no divider lines. Kept as a spacing-only spacer. */
export function Hairline({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ height: "var(--space-section)", margin: 0, border: 0, background: "transparent" }}
    />
  );
}
