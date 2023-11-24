import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import useLike from "@/lib/hooks/bsky/feed/useLike";
import useRepost from "@/lib/hooks/bsky/feed/useRepost";
import type { AppBskyFeedDefs } from "@atproto/api";
import { useRouter } from "next/navigation";

interface Props {
  post: AppBskyFeedDefs.PostView;
}

export default function PostActions(props: Props) {
  const { post } = props;
  const { liked, toggleLike, likeCount } = useLike({ post: post });
  const { reposted, toggleRepost, repostCount } = useRepost({ post: post });
  const router = useRouter();

  return (
    <div className="flex gap-x-8 mt-2">
      <Button
        className="text-neutral-500 hover:text-primary"
        icon="bx:message-rounded"
      >
        {post.replyCount}
      </Button>

      <Dropdown>
        <Dropdown.Trigger>
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={
              reposted
                ? "text-green-600"
                : "text-neutral-500 hover:text-green-600"
            }
            icon="bx:repost"
          >
            {repostCount}
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.MenuItem
            onSelect={() => {
              toggleRepost.mutate();
            }}
            text={`${reposted ? "Undo repost" : "Repost"}`}
            icon="bx:repost"
          />
          <Dropdown.MenuItem
            onSelect={() => {}}
            text="Quote Post"
            icon="bxs:quote-alt-right"
          />
        </Dropdown.Menu>
      </Dropdown>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike.mutate();
        }}
        className={
          liked ? "text-red-600" : "text-neutral-500 hover:text-red-600"
        }
        icon={liked ? "bxs:heart" : "bx:heart"}
      >
        {likeCount}
      </Button>

      <Dropdown>
        <Dropdown.Trigger>
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            icon="bx:dots-horizontal-rounded"
            className="text-neutral-500 hover:text-neutral-600"
          />
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.MenuItem
            onSelect={() => {}}
            text="Share"
            icon="bxs:share"
          />
          <Dropdown.MenuItem
            onSelect={() => {}}
            text="Copy Post Text"
            icon="bxs:copy"
          />
          <Dropdown.MenuItem
            onSelect={() => {}}
            text="Mute User"
            icon="bxs:bell-off"
          />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}