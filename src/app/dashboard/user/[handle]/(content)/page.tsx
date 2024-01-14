import UserPostsConatiner from "@/containers/UserPostsContainer";

interface Props {
  params: {
    handle: string;
  };
}

export default function Page(props: Props) {
  const { handle } = props.params;

  return <UserPostsConatiner mode="posts" handle={handle} />;
}
