import { getProfile } from "@/lib/content";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const profile = getProfile();

  return (
    <div className="content">
      <h1 style={{ margin: "0 0 0.75em" }}>About</h1>
      <p>{profile.shortBio}</p>
    </div>
  );
}
