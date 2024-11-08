import FollowersContainer from "@/containers/users/FollowersContainer";

interface Props {
  params: {
    handle: string;
  };
}

export default function Page(props: Props) {
  const { handle } = props.params;

  return <FollowersContainer handle={handle} />;
}
