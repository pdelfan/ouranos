"use client";

import AtmosphereContainer from "@/containers/atmosphere/AtmosphereContainer";
import AtmosphereContainerSkeleton from "@/containers/atmosphere/AtmosphereContainerSkeleton";
import useProfile from "@/lib/hooks/bsky/actor/useProfile";

interface Props {
  params: {
    handle: string;
  };
}

export default function Page(props: Props) {
  const { params } = props;
  const { data: profile, isFetching } = useProfile(params.handle);

  if (isFetching || !profile) return <AtmosphereContainerSkeleton />;

  return <AtmosphereContainer handle={params.handle} did={profile.did} />;
}
