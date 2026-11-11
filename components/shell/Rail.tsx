import { Nav } from "./Nav";
import styles from "./shell.module.css";

export function Rail() {
  return (
    <aside className={styles.rail}>
      <Nav />
    </aside>
  );
}
