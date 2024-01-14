import LikedByContainer from "@/containers/thread/LikedByContainer";

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
      <h2 className="text-2xl font-semibold px-3 md:px-0 mb-2">Liked by</h2>
      <LikedByContainer handle={handle} id={id} />
    </section>
  );
}
