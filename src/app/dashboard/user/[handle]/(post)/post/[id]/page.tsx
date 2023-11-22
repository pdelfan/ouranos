import PostThreadContainer from "@/containers/PostThreadContainer";

interface Props {
  params: {
    id: string;
    handle: string;
  };
}

export default async function Page(props: Props) {
  const { id, handle } = props.params;

  return <PostThreadContainer id={id} handle={handle} />;
}
