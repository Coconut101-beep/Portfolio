"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/ui/Link";
import { getNavItems } from "@/lib/content";
import styles from "./shell.module.css";

export function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const items = getNavItems();

  return (
    <nav className={styles.nav} aria-label="Primary">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={active ? "true" : "false"}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
