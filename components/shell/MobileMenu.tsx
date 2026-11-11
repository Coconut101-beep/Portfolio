"use client";

import { useState } from "react";
import { getProfile } from "@/lib/content";
import { Nav } from "./Nav";
import styles from "./shell.module.css";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const profile = getProfile();

  return (
    <>
      <div className={styles.mobileBar}>
        <span>{profile.name}</span>
        <button type="button" className={styles.menuButton} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? <Nav className={styles.mobileNav} /> : null}
    </>
  );
}
