"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/ui/Link";
import { getNavItems } from "@/lib/content";
import styles from "./shell.module.css";

export function Nav({ className }: { className?: string }) {
  const pathname = usePathname();
  const items = getNavItems();

  return (
    <nav className={className ?? styles.nav} aria-label="Primary">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        if (active) {
          return (
            <span key={item.href} className={styles.navCurrent} aria-current="page">
              <span className={styles.navMarker}>—</span>
              {item.label}
            </span>
          );
        }
        return (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
