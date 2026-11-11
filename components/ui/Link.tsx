import NextLink from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  "data-active"?: string;
  plain?: boolean;
};

export function Link({ href, children, className, external, onClick, plain, ...rest }: Props) {
  const combined = [className, plain ? undefined : undefined].filter(Boolean).join(" ") || undefined;
  if (external) {
    return (
      <a href={href} className={combined} target="_blank" rel="noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={combined} onClick={onClick} {...rest}>
      {children}
    </NextLink>
  );
}
