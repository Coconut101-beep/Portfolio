"use client";

import { useState } from "react";
import { Link } from "@/components/ui/Link";
import { getProfile } from "@/lib/content";
import styles from "./shell.module.css";

export function IdentityBlock() {
  const profile = getProfile();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.identity}>
      <div>
        <strong style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
          {profile.nickname}
        </strong>
        <div style={{ color: "var(--color-ink-muted)", fontSize: "var(--text-xs)" }}>
          {profile.name}
        </div>
      </div>
      <button
        type="button"
        onClick={copyEmail}
        style={{
          border: 0,
          background: "transparent",
          padding: 0,
          textAlign: "left",
          color: "var(--color-accent)",
          font: "inherit",
          cursor: "pointer",
          textDecoration: "underline",
          textUnderlineOffset: "0.2em",
        }}
      >
        {copied ? "Email copied" : "Email"}
      </button>
      <Link href={profile.linkedin} external>
        LinkedIn
      </Link>
    </div>
  );
}
