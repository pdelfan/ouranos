import { searchPosts } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useQuery } from "@tanstack/react-query";
import FeedPostSkeleton from "../feedPost/FeedPostSkeleton";
import { Fragment } from "react";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import SearchPost from "../searchPost/SearchPost";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";

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
      <section className="flex flex-col">
        {posts &&
          posts.map((post, i) => (
            <Fragment key={i}>
              <SearchPost key={i} post={post} />
            </Fragment>
          ))}
      </section>
      {posts && posts.length === 0 && (
        <div className="mx-3 md:mx-0 border-t">
          <FeedAlert variant="empty" message="No posts found" />
        </div>
      )}
      {posts && posts.length > 0 && <EndOfFeed />}
    </>
  );
}
