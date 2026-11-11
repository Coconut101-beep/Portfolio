"use client";

import { useState } from "react";
import { Link } from "@/components/ui/Link";
import { getFollowing, getProfile } from "@/lib/content";
import styles from "./shell.module.css";

export function IdentityBlock() {
  const profile = getProfile();
  const following = getFollowing();
  const [showFollow, setShowFollow] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.identity}>
      <button type="button" onClick={copyEmail}>
        {copied ? "Copied" : "Email"}
      </button>
      <Link href={profile.linkedin} external>
        LinkedIn
      </Link>
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => setShowFollow((v) => !v)} aria-expanded={showFollow}>
          Following
        </button>
        {showFollow ? (
          <div className={styles.followPanel}>
            {following.map((name) => (
              <div key={name}>{name}</div>
            ))}
          </div>
        ) : null}
      </div>
      <span className={styles.identityName}>{profile.name}</span>
      {profile.avatarSrc ? (
        <img className={styles.avatar} src={profile.avatarSrc} alt="" />
      ) : (
        <span className={styles.avatarFallback} aria-hidden="true">
          {profile.nickname.slice(0, 1)}
        </span>
      )}
    </div>
  );
}
