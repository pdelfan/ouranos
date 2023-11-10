import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { getFollows } from "@/lib/api/bsky/social";

interface Props {
  params: {
    handle: string;
  };
}

export default async function Page(props: Props) {
  const { handle } = props.params;
  const follows = await getFollows(handle);

  return (
    <section>
      <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2 mt-3">
        Following
      </h2>
      <section className="flex flex-col">
        {follows &&
          follows.data.follows.map((profile) => (
            <ProfileCard key={profile.did} profile={profile} />
          ))}
      </section>
    </section>
  );
}
