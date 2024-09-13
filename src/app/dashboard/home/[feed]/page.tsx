import FeedContainer from "@/containers/posts/FeedContainer";
import { getFeedInfo } from "@/lib/api/bsky/feed";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const feedInfo = await getFeedInfo(searchParams.uri);
  const title = feedInfo.view.displayName
      ? feedInfo.view.displayName
      : "Feed";
  
    return {
      title: title + " — Ouranos",
      description: "Feed",
    };
  }

interface Props {
  searchParams: {
    uri: string;
  };
}

export default function Page(props: Props) {
  const { searchParams } = props;

  return <FeedContainer feed={searchParams.uri} mode="feed" />;
}
