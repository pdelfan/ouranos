import PostThreadContainer from "@/containers/thread/PostThreadContainer";
import { Metadata } from "next";

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Post by ${params.handle}`,
    description: `${params.handle}'s post thread`,
  };
}

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

  return (
    <PostThreadContainer
      id={id}
      handle={handle}
      repliesTextFilter={query ?? ""}
    />
  );
}
