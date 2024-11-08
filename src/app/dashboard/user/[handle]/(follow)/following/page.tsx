import FollowingContainer from "@/containers/users/FollowingContainer";

interface Props {
  params: {
    handle: string;
  };
}

export default function Page(props: Props) {
  const { handle } = props.params;

  return <FollowingContainer handle={handle} />;
}
