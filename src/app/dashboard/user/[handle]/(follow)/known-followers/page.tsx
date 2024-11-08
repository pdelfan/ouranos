import KnownFollowersContainer from "@/containers/users/KnownFollowersContainer";
import type { Metadata } from "next";

export function generateMetadata({ params }: Props): Metadata {
  const title = `Followers of @${params.handle} that you know`;
  const descripton = `Followers of @${params.handle} that you know`;

  return {
    title: title,
    description: descripton,
  };
}

interface Props {
  params: {
    handle: string;
  };
}

export default function Page(props: Props) {
  const { handle } = props.params;

  return <KnownFollowersContainer handle={handle} />;
}
