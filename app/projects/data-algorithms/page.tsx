import { notFound } from "next/navigation";
import { SubprojectDisplay } from "@/components/projects/SubprojectDisplay";
import { getConstellation } from "@/lib/content";

export const metadata = {
  title: "Data & Algorithms",
};

export default function DataAlgorithmsPage() {
  const constellation = getConstellation("data-algorithms");
  if (!constellation) notFound();
  return <SubprojectDisplay constellation={constellation} />;
}
