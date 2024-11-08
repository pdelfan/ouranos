import Layout from "@/containers/Layout";

interface Props {
  children: React.ReactNode;
  params: {
    handle: string;
  };
}

export default function FollowingLayout(props: Props) {
  const { children, params } = props;
  return (
    <Layout>
      <section>
        <div className="px-3 md:px-0">
          <h2 className="text-skin-base text-2xl font-semibold">Following</h2>
          <h3 className="text-skin-secondary text-lg">@{params.handle}</h3>
        </div>
        <section className="mt-2 flex flex-col">{children}</section>
      </section>
    </Layout>
  );
}
