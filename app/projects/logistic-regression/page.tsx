import { readFileSync } from "node:fs";
import path from "node:path";
import { Notebook } from "@/components/notebook/Notebook";
import { Link } from "@/components/ui/Link";

export const metadata = {
  title: "LendingClub default",
};

export default function LogisticRegressionPage() {
  const html = readFileSync(path.join(process.cwd(), "public/lending-club/body.html"), "utf8");

  return (
    <>
      <link rel="stylesheet" href="/lending-club/notes.css" />
      <Notebook html={html} />
      <p style={{ marginTop: "var(--space-section)" }}>
        <Link href="/projects">← All projects</Link>
      </p>
    </>
  );
}
