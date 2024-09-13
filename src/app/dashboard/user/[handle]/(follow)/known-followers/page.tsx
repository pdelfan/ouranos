import KnownFollowersContainer from "@/containers/users/KnownFollowersContainer";
import type { Metadata } from "next";

export function generateMetadata({ params }: Props): Metadata {
  const title = `Followers of @${params.handle} that you know`;
  const descripton = `Followers of @${params.handle} that you know`;

  return {
    title: title,
    description: descripton,
  };
}

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
        <h2 className="text-skin-base text-2xl font-semibold">
          Followers you know
        </h2>
        <h3 className="text-skin-secondary text-lg">@{handle}</h3>
      </div>
      <section className="mt-2 flex flex-col">
        <KnownFollowersContainer handle={handle} />
      </section>
    </section>
  );
}
