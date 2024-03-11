import FollowingContainer from "@/containers/users/FollowingContainer";

interface Props {
  params: {
    handle: string;
  };
}

export default function Page(props: Props) {
  const { handle } = props.params;

  return (
    <section>
      <div className="px-3 md:px-0">
        <h2 className="text-skin-base text-2xl font-semibold">Following</h2>
        <h3 className="text-skin-secondary text-lg">@{handle}</h3>
      </div>
      <section className="mt-2 flex flex-col">
        <FollowingContainer handle={handle} />
      </section>
    </section>
  );
}
