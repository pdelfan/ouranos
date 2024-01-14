import PostThreadContainer from "@/containers/thread/PostThreadContainer";

interface Props {
  params: {
    id: string;
    handle: string;
  };
}

export default function Page(props: Props) {
  const { id, handle } = props.params;

  return <PostThreadContainer id={id} handle={handle} />;
}
