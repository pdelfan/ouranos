import FollowInfo from "@/components/dataDisplay/followInfo/FollowInfo";
import { getProfile } from "@/lib/api/bsky/actor";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import FallbackBanner from "@/assets/images/fallbackBanner.png";
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
          src={profile?.banner ?? FallbackBanner}
          alt="Banner"
          width={700}
          height={100}
          className="object-cover min-h-[9rem]"
        />
        <div className="absolute bottom-0 transform translate-y-1/2 px-3">
          <Image
            src={profile?.avatar ?? FallbackAvatar}
            alt="Avatar"
            width={95}
            height={95}
            className="object-cover rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="p-4 mt-10">
        <h1 className="text-2xl font-semibold break-all">
          {profile?.displayName}
        </h1>
        <h2 className="text-neutral-400 font-medium break-all">
          @{profile?.handle}
        </h2>
        <p className="text-neutral-600 leading-5 mt-3 break-words">
          {profile?.description}
        </p>
        <FollowInfo
          followersCount={profile?.followersCount ?? 0}
          followsCount={profile?.followsCount ?? 0}
        />
      </div>
    </section>
  );
}
