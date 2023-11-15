import { searchPosts } from "@/lib/api/bsky/actor";
import FeedPost from "../feedPost/FeedPost";
import useAgent from "@/lib/hooks/useAgent";
import { useQuery } from "@tanstack/react-query";
import FeedPostSkeleton from "../feedPost/FeedPostSkeleton";
import { Fragment } from "react";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";

interface Props {
  query: string;
}

export default function PostsSearchList(props: Props) {
  const { query } = props;
  const agent = useAgent();

  const {
    status,
    data: posts,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["searchPosts", query],
    queryFn: () => searchPosts(query, agent),
  });

  return (
    <>
      {isFetching && <FeedPostSkeleton />}
      <section className="flex flex-col border-t">
        {posts &&
          posts.map((post, i) => (
            <Fragment key={i}>
              <FeedPost key={i} post={post} />
            </Fragment>
          ))}
      </section>
      {posts && posts.length > 1 && <EndOfFeed />}
    </>
  );
}
