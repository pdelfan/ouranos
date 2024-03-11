import RepostedByContainer from "@/containers/thread/RepostedByContainer";

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
        Reposted by
      </h2>
      <RepostedByContainer handle={handle} id={id} />
    </section>
  );
}
