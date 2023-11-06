import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import FeedItem from "../feedItem/FeedItem";

interface Props {
  popular: GeneratorView[];
}

export default function FeedList(props: Props) {
  const { popular } = props;
  return (
    <section className="flex flex-col">
      {popular &&
        popular.map((feed) => <FeedItem key={feed.cid} feedItem={feed} />)}
    </section>
  );
}
