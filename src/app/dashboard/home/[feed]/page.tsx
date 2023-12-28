import FeedContainer from "@/containers/FeedContainer";

interface Props {
  searchParams: {
    uri: string;
  };
}

export default function Feed(props: Props) {
  const { searchParams } = props;

  return <FeedContainer feed={searchParams.uri} />;
}
