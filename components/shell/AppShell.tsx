import type { ReactNode } from "react";
import { IdentityBlock } from "./IdentityBlock";
import { MobileMenu } from "./MobileMenu";
import { Rail } from "./Rail";
import styles from "./shell.module.css";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.frame}>
      <div className={styles.inner}>
        <IdentityBlock />
        <div className={styles.body}>
          <Rail />
          <div>
            <MobileMenu />
            <main className={styles.main}>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
