"use client";

import { useState } from "react";
import { Link } from "@/components/ui/Link";
import { getNavItems, getProfile } from "@/lib/content";
import styles from "./shell.module.css";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const profile = getProfile();
  const items = getNavItems();

  return (
    <>
      <div className={styles.topBar}>
        <Link href="/about" className={styles.brand}>
          {profile.nickname}
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className={styles.mobileNav}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}
