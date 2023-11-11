import FeedContainer from "@/containers/FeedContainer";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    uri: string;
  };
}

export default async function Feed(props: Props) {
  const { searchParams } = props;

  return <FeedContainer feed={searchParams.uri} />;
}
