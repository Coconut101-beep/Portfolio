import NextLink from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  "data-active"?: string;
};

export function Link({ href, children, className, external, onClick, ...rest }: Props) {
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </NextLink>
  );
}
