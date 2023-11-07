import { getProfile, getSuggestions } from "@/lib/api/bsky/actor";
import Image from "next/image";

interface Props {
  handle: string;
}
export default async function ProfileHeader(props: Props) {
  const { handle } = props;
  const profile = await getProfile(handle);

  return (
    <section className="border sm:rounded-2xl overflow-hidden">
      <div className="relative">
        <Image
          src={profile?.banner ?? "/default-banner.jpg"}
          alt="Banner"
          width={700}
          height={100}
          className="object-cover min-h-[9rem]"
        />
        <div className="absolute bottom-0 transform translate-y-1/2 px-4">
          <Image
            src={profile?.avatar ?? "/default-avatar.jpg"}
            alt="Avatar"
            width={95}
            height={95}
            className="object-cover rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="p-5 mt-10">
        <h1 className="text-2xl font-semibold">{profile?.displayName}</h1>
        <h2 className="text-neutral-400 font-medium">@{profile?.handle}</h2>
        <p className="text-neutral-600 leading-5 mt-3">
          {profile?.description}
        </p>
        <div className="flex flex-gap items-center mt-3 gap-3">
          <div className="flex gap-1">
            <span className="font-semibold text-neutral-600">
              {profile?.followsCount}
            </span>
            <span className="font-medium text-neutral-400">Following</span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold">{profile?.followersCount}</span>
            <span className="font-medium text-neutral-400">Followers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
