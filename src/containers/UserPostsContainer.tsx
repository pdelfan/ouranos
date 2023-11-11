"use client";

import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import useProfilePosts from "@/lib/hooks/useProfilePosts";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  mode: UserPostMode;
  handle: string;
}

export default function UserPostsConatiner(props: Props) {
  const { mode, handle } = props;
  const {
    observerRef,
    userPostsStatus,
    userPostsData,
    userPostsError,
    isLoadingUserPosts,
    isFetchingUserPosts,
    isFetchingUserPostsNextPage,
    userPostsHasNextPage,
  } = useProfilePosts({ mode: mode, handle: handle });

  return (
    <div>
      {userPostsData &&
        userPostsData?.pages.map((page, i) => (
          <div key={i}>
            {page.data.feed.map((post, i) => (
              <FeedPost key={post.post.uri + i} post={post} />
            ))}
          </div>
        ))}
      {isFetchingUserPosts && !isFetchingUserPostsNextPage && (
        <section>
          <FeedPostSkeleton />
          <FeedPostSkeleton />
          <FeedPostSkeleton />
          <FeedPostSkeleton />
          <FeedPostSkeleton />
          <FeedPostSkeleton />
          <FeedPostSkeleton />
          <FeedPostSkeleton />
        </section>
      )}
      {isFetchingUserPostsNextPage && (
        <section className="flex flex-1 justify-center mt-3">
          <Icon icon="eos-icons:loading" className="text-xl" />
        </section>
      )}
      {!isFetchingUserPosts && !userPostsHasNextPage && <EndOfFeed />}
      <div ref={observerRef}></div>
    </div>
  );
}
