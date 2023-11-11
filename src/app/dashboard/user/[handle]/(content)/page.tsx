import UserPostsConatiner from "@/containers/UserPostsContainer";

interface Props {
  params: {
    handle: string;
  };
}

export default async function Page(props: Props) {
  const { handle } = props.params;

  return <UserPostsConatiner mode="posts" handle={handle} />;
}
