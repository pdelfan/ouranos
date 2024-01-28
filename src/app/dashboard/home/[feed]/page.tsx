import FeedContainer from "@/containers/posts/FeedContainer";

interface Props {
  searchParams: {
    uri: string;
  };
}

export default function Feed(props: Props) {
  const { searchParams } = props;

  return <FeedContainer feed={searchParams.uri} mode="feed" />;
}
