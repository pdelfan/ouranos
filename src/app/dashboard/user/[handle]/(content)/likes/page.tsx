import UserPostsConatiner from "@/containers/posts/UserPostsContainer";
import { getSessionFromServer } from "@/lib/api/auth/session";
import { redirect } from "next/navigation";

interface Props {
  params: {
    handle: string;
  };
}

export default async function Page(props: Props) {
  const { handle } = props.params;
  const session = await getSessionFromServer();

  if (session?.user?.handle !== handle) {
    redirect(`/dashboard/user/${handle}`);
  }

  return <UserPostsConatiner mode="likes" handle={handle} />;
}
