import PostThreadContainer from "@/containers/thread/PostThreadContainer";

interface Props {
  params: {
    id: string;
    handle: string;
  };
  searchParams: {
    query?: string;
  };
}

export default function Page(props: Props) {
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
