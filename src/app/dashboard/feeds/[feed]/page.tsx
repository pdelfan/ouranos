import FeedHeader from "@/components/contentDisplay/feedHeader/FeedHeader";
import FeedContainer from "@/containers/FeedContainer";

interface Props {
  searchParams: {
    uri: string;
  };
}

export default function Page(props: Props) {
  const { searchParams } = props;

  return (
    <>
      <FeedHeader feed={searchParams.uri} />
      <FeedContainer feed={searchParams.uri} />
    </>
  );
}
