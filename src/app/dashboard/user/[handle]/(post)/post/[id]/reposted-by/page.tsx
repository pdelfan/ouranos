import RepostedByContainer from "@/containers/thread/RepostedByContainer";

interface Props {
  params: {
    id: string;
    handle: string;
  };
}

export default async function Page(props: Props) {
  const { id, handle } = props.params;

  return (
    <section className="px-3">
      <h2 className="text-2xl font-semibold sm:px-0 mb-2">Reposted by</h2>
      <RepostedByContainer handle={handle} id={id} />
    </section>
  );
}
