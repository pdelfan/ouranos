import { searchPosts } from "@/lib/api/bsky/actor";
import FeedPost from "../feedPost/FeedPost";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useQuery } from "@tanstack/react-query";
import FeedPostSkeleton from "../feedPost/FeedPostSkeleton";
import { Fragment } from "react";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import SearchPost from "../searchPost/SearchPost";

interface Props {
  query: string;
}

export default function PostsSearchList(props: Props) {
  const { query } = props;
  const decoded = decodeURIComponent(query);
  const agent = useAgent();

  const {
    status,
    data: posts,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["searchPosts", decoded],
    queryFn: () => searchPosts(decoded, agent),
  });

  return (
    <>
      {isFetching && <FeedPostSkeleton />}
      <section className="flex flex-col border-t">
        {posts &&
          posts.map((post, i) => (
            <Fragment key={i}>
              <SearchPost key={i} post={post} />
            </Fragment>
          ))}
      </section>
      {posts && posts.length > 0 && <EndOfFeed />}
    </>
  );
}
