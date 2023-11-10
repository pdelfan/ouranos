import Button from "@/components/actions/button/Button";
import type { AppBskyFeedDefs } from "@atproto/api";

interface Props {
  post: AppBskyFeedDefs.PostView;
}

export default function PostActions(props: Props) {
  const { post } = props;
  return (
    <div className="flex gap-x-8 mt-2">
      <Button
        className="text-neutral-500 hover:text-green-600"
        icon="bx:message-rounded"
      >
        {post.replyCount}
      </Button>
      <Button className="text-neutral-500 hover:text-red-600" icon="bx:heart">
        {post.likeCount}
      </Button>
      <Button className="text-neutral-500 hover:text-primary" icon="bx:repost">
        {post.repostCount}
      </Button>
    </div>
  );
}
