import LikedByContainer from "@/containers/thread/LikedByContainer";
import type { Metadata } from "next";

export function generateMetadata({ params }: Props): Metadata {
  const title = `@${params.handle}'s Post Liked By`;
  const descripton = `Users who have liked @${params.handle}'s post`;

  return {
    title: title,
    description: descripton,
  };
}

interface Props {
  params: {
    id: string;
    handle: string;
  };
}

export default function Page(props: Props) {
  const { id, handle } = props.params;

  return (
    <section>
      <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
        Liked by
      </h2>
      <LikedByContainer handle={handle} id={id} />
    </section>
  );
}
