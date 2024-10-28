import { getSuggestions } from "@/lib/api/bsky/actor";
import ProfileCard from "../profileCard/ProfileCard";

export default async function WhoToFollowList() {
  const suggestions = await getSuggestions();

  return (
    <section className="flex flex-col">
      {suggestions &&
        suggestions.map((profile) => (
          <ProfileCard key={profile.did} profile={profile} />
        ))}
    </section>
  );
}
