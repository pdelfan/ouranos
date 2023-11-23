import FeedHeaderSkeleton from "@/components/contentDisplay/feedHeader/FeedHeaderSkeleton";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";

export default function Loading() {
  return (
    <>
      <FeedHeaderSkeleton />
      <FeedPostSkeleton />
    </>
  );
}
