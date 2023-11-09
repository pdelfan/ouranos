import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import TabItem from "@/components/navigational/tabs/TabItem";
import Tabs from "@/components/navigational/tabs/Tabs";
import { getFeed, getSavedFeeds } from "@/lib/api/bsky/feed";

interface Props {
  searchParams: {
    feed: string;
    uri: string;
  };
}

export default async function Page(props: Props) {
  const { searchParams } = props;
  const feed = await getFeed(searchParams.uri);
  const savedFeeds = await getSavedFeeds();

  return (
    <div>
      <div className="pt-2 border-x sm:border-t sm:rounded-t-2xl">
        <Tabs>
          {savedFeeds.map((feed) => {
            const path =
              feed.displayName === "For You"
                ? {
                    pathname: "/dashboard",
                  }
                : {
                    pathname: `/dashboard/feeds/${encodeURIComponent(
                      feed.uri.split(":")[3].split("/")[0]
                    )}`,
                    query: { uri: feed.uri },
                  };

            return (
              <TabItem
                key={feed.cid}
                isActive={searchParams.uri === feed.uri}
                label={feed.displayName}
                path={path}
              />
            );
          })}
        </Tabs>
      </div>

      {feed.data.feed &&
        feed.data.feed.map((post, i) => (
          <FeedPost key={post.post.uri} post={post} />
        ))}
    </div>
  );
}
