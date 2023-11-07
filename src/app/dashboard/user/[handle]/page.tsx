import ProfileHeader from "@/components/contentDisplay/profileHeader/ProfileHeader";
import ProfileHeaderSkeleton from "@/components/contentDisplay/profileHeader/ProfileHeaderSkeleton";
import { getSuggestions } from "@/lib/api/bsky/actor";
import { Suspense } from "react";

interface Props {
  params: { handle: string };
}

export default async function Page(props: Props) {
  const { params } = props;
  return (
    <Suspense fallback={<ProfileHeaderSkeleton />}>
      <ProfileHeader handle={params.handle} />
    </Suspense>
  );
}
