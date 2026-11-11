import { Link } from "@/components/ui/Link";
import { getProfile } from "@/lib/content";
import { IdentityBlock } from "./IdentityBlock";
import { Nav } from "./Nav";
import styles from "./shell.module.css";

export function Rail() {
  const profile = getProfile();
  return (
    <aside className={styles.rail}>
      <div>
        <Link href="/about" className={styles.brand}>
          {profile.nickname}
          <span className={styles.brandSub}>{profile.name}</span>
        </Link>
      </div>
      <Nav />
      <IdentityBlock />
    </aside>
  );
}
