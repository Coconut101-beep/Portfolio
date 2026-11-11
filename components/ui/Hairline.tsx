type Props = {
  className?: string;
};

export function Hairline({ className }: Props) {
  return (
    <hr
      className={className}
      style={{
        border: 0,
        borderTop: "1px solid var(--color-line)",
        margin: "var(--space-5) 0",
      }}
    />
  );
}
