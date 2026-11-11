import type { ReactNode } from "react";
import { MobileMenu } from "./MobileMenu";
import { Rail } from "./Rail";
import styles from "./shell.module.css";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.frame}>
      <Rail />
      <div>
        <MobileMenu />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
