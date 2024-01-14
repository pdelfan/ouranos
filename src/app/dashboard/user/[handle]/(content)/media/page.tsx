import UserPostsConatiner from "@/containers/UserPostsContainer";

interface Props {
  params: {
    handle: string;
  };
}

export default function Page(props: Props) {
  const { handle } = props.params;

  return <UserPostsConatiner mode="media" handle={handle} />;
}
