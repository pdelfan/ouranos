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
}

export default async function Page(props: Props) {
  const { id, handle } = props.params;

  return (
    <>
      <div className="border-skin-base border-b md:rounded-t-2xl md:border">
        <h2 className="text-skin-base px-3 py-2 text-center text-xl font-semibold">
          Post
        </h2>
      </div>
      <PostThreadContainer id={id} handle={handle} />
    </>
  );
}
