"use client";

import { getPopularFeeds } from "@/lib/api/bsky/feed";
import { useQuery } from "@tanstack/react-query";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { getAgentFromClient } from "@/lib/api/bsky/agent";
import FeedListSkeleton from "@/components/contentDisplay/feedList/FeedListSkeleton";
import FeedItem from "@/components/contentDisplay/feedItem/FeedItem";

interface Props {
  query: string;
}

export default function FeedSearchContainer(props: Props) {
  const { query } = props;
  const { data: feeds, isFetching } = useQuery({
    queryKey: ["searchFeeds", query],
    queryFn: async () => {
      const agent = await getAgentFromClient();
      return getPopularFeeds(query, agent);
    },
  });

  const isEmpty = !isFetching && feeds?.length === 0;

  return (
    <section>
      {feeds &&
        feeds.map((feed) => (
          <FeedItem key={feed.cid} feedItem={feed} rounded={false} />
        ))}

      {isEmpty && (
        <div className="border-skin-base border-t">
          <FeedAlert variant="empty" message={`No feeds found for ${query}`} />
        </div>
      )}
      {isFetching && <FeedListSkeleton />}
    </section>
  );
}
