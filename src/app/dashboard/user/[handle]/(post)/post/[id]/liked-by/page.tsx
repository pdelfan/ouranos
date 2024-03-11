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
      <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
        Liked by
      </h2>
      <LikedByContainer handle={handle} id={id} />
    </section>
  );
}
