import { getSuggestions } from "@/lib/api/bsky/actor";
import ProfileCard from "../profileCard/ProfileCard";

export default async function SuggestionsList() {
  const suggestions = await getSuggestions();

  return (
    <section className="flex flex-col">
      {suggestions &&
        suggestions.map((profile) => (
          <article
            key={profile.did}
            className="p-3 border border-x-0 md:border-x md:first:rounded-t-2xl
          md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            <ProfileCard profile={profile} />
          </article>
        ))}
    </section>
  );
}
