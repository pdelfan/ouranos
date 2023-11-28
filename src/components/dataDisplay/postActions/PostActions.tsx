import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import useLike from "@/lib/hooks/bsky/feed/useLike";
import useRepost from "@/lib/hooks/bsky/feed/useRepost";
import { useClipboard } from "use-clipboard-copy";
import type { AppBskyEmbedRecord, AppBskyFeedDefs } from "@atproto/api";
import { useCallback } from "react";
import { getPostId } from "@/lib/utils/link";
import useMuteUser from "@/lib/hooks/bsky/feed/useMuteUser";
import { useSession } from "next-auth/react";

interface Props {
  post: AppBskyFeedDefs.PostView;
  mode?: "thread" | "feed";
}

export default function PostActions(props: Props) {
  const { post, mode = "feed" } = props;
  const { data: session } = useSession();
  const { liked, toggleLike, likeCount } = useLike({ post: post });
  const { reposted, toggleRepost, repostCount } = useRepost({ post: post });
  const { muted, toggleMuteUser } = useMuteUser({ author: post.author });
  const clipboard = useClipboard({ copiedTimeout: 3500 });

  const handleShare = useCallback(() => {
    const postId = getPostId(post.uri);
    const shareUrl = `https://bsky.app/profile/${post.author.handle}/post/${postId}`;
    clipboard.copy(shareUrl);
  }, [clipboard, post.uri, post.author.handle]);

  const handleCopyPostText = useCallback(() => {
    const record = post.record as AppBskyEmbedRecord.View["record"];
    const text = record.text || "";

    clipboard.copy(text);
  }, [clipboard, post.record]);

  if (!session) return null;

  if (mode === "thread") {
    return (
      <div className="flex gap-x-8 mt-2">
        <Button
          className="text-neutral-500 hover:text-primary"
          icon="bx:message-rounded"
          iconSize="text-[1.7rem]"
        />

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
              iconSize="text-[1.7rem]"
            />
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
          iconSize="text-[1.7rem]"
        />

        <Dropdown>
          <Dropdown.Trigger>
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              icon="bx:dots-horizontal-rounded"
              iconSize="text-[1.7rem]"
              className="text-neutral-500 hover:text-neutral-600"
            />
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.MenuItem
              onSelect={handleShare}
              text="Share"
              icon="bxs:share"
            />
            <Dropdown.MenuItem
              onSelect={handleCopyPostText}
              text="Copy Post Text"
              icon="bxs:copy"
            />
            {session.user?.handle !== post.author.handle && (
              <Dropdown.MenuItem
                onSelect={() => {
                  toggleMuteUser.mutate();
                }}
                text={`${muted ? "Unmute User" : "Mute User"}`}
                icon="bxs:bell-off"
              />
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  return (
    <div className="flex gap-x-8">
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
            onSelect={handleShare}
            text="Share"
            icon="bxs:share"
          />
          <Dropdown.MenuItem
            onSelect={handleCopyPostText}
            text="Copy Post Text"
            icon="bxs:copy"
          />
          {session.user?.handle !== post.author.handle && (
            <Dropdown.MenuItem
              onSelect={() => {
                toggleMuteUser.mutate();
              }}
              text={`${muted ? "Unmute User" : "Mute User"}`}
              icon="bxs:bell-off"
            />
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
