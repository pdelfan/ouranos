import PostThreadContainer from "@/containers/thread/PostThreadContainer";
import { getSessionFromServer } from "@/lib/api/auth/session";
import { getProfile } from "@/lib/api/bsky/actor";

interface Props {
  params: {
    id: string;
    handle: string;
  };
  searchParams: {
    query?: string;
  };
}

export default async function Page(props: Props) {
  const { id, handle } = props.params;
  const { query } = props.searchParams;
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <PostThreadContainer
      id={id}
      handle={handle}
      viewerAvatar={profile?.avatar}
      repliesTextFilter={query ?? ""}
    />
  );
}
