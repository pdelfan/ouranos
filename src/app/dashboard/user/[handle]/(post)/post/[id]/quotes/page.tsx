import QuotesContainer from "@/containers/thread/QuotesContainer";
import type { Metadata } from "next";

export function generateMetadata({ params }: Props): Metadata {
  const title = `@${params.handle}'s Post Quotes`;
  const descripton = `Users who have quoted @${params.handle}'s post`;

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
        Quotes
      </h2>
      <QuotesContainer handle={handle} id={id} />
    </section>
  );
}
