import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import useLike from "@/lib/hooks/bsky/feed/useLike";
import useRepost from "@/lib/hooks/bsky/feed/useRepost";
import { useClipboard } from "use-clipboard-copy";
import {
  AppBskyFeedPost,
  type AppBskyEmbedRecord,
  type AppBskyFeedDefs,
} from "@atproto/api";
import { useCallback } from "react";
import { getPostId } from "@/lib/utils/link";
import useMuteUser from "@/lib/hooks/bsky/feed/useMuteUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { abbreviateNumber } from "@/lib/utils/number";
import useDeletePost from "@/lib/hooks/bsky/feed/useDeletePost";
import { useComposerContext } from "@/app/providers/composer";
import toast from "react-hot-toast";

interface Props {
  post: AppBskyFeedDefs.PostView;
  mode?: "thread" | "feed";
}

export default function PostActions(props: Props) {
  const { post, mode = "feed" } = props;
  const { data: session } = useSession();
  const { deletePost } = useDeletePost({ post: post });
  const { liked, toggleLike, likeCount } = useLike({ post: post });
  const { reposted, toggleRepost, repostCount } = useRepost({ post: post });
  const { muted, toggleMuteUser } = useMuteUser({ author: post.author });
  const clipboard = useClipboard({ copiedTimeout: 3500 });
  const { isOpen, options, openComposer, closeComposer } = useComposerContext();

  const handleShare = useCallback(() => {
    const postId = getPostId(post.uri);
    const shareUrl = `https://useouranos.app/dashboard/user/${post.author.handle}/post/${postId}`;
    clipboard.copy(shareUrl);
    toast.success("Link to post copied to clipboard");
  }, [clipboard, post.uri, post.author.handle]);

  const handleCopyPostText = useCallback(() => {
    const record = post.record as AppBskyEmbedRecord.View["record"];
    const text = record.text || "";
    toast.success("Post text copied to clipboard");
    clipboard.copy(text);
  }, [clipboard, post.record]);

  if (!session) return null;

  if (mode === "thread") {
    return (
      <div>
        <div className="flex flex-wrap items-center gap-3 mt-3 border-y p-2">
          <Link
            href={`/dashboard/user/${post.author.handle}/post/${getPostId(
              post.uri
            )}/reposted-by`}
            className="flex gap-1 font-semibold text-neutral-700 hover:brightness-110"
          >
            {abbreviateNumber(repostCount)}
            <span className="font-medium text-neutral-400">
              Repost{repostCount > 1 && "s"}
            </span>
          </Link>
          <Link
            href={`/dashboard/user/${post.author.handle}/post/${getPostId(
              post.uri
            )}/liked-by`}
            className="flex gap-1 font-semibold text-neutral-700 hover:brightness-110"
          >
            {abbreviateNumber(likeCount)}
            <span className="font-medium text-neutral-400">
              Like{likeCount > 1 && "s"}
            </span>
          </Link>
        </div>
        <div className="flex gap-x-8 mt-3">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen) closeComposer();
              else {
                const text =
                  AppBskyFeedPost.isRecord(post.record) && post.record.text;

                openComposer({
                  replyTo: {
                    uri: post.uri,
                    cid: post.cid,
                    text: text.toString(),
                    author: {
                      handle: post.author.handle,
                      displayName: post.author.displayName,
                      avatar: post.author.avatar,
                    },
                  },
                });
              }
            }}
            className="text-neutral-500 hover:text-primary"
            icon="bx:message-rounded"
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
                onSelect={() => {
                  if (isOpen) closeComposer();
                  else {
                    const text =
                      AppBskyFeedPost.isRecord(post.record) && post.record.text;

                    openComposer({
                      quote: {
                        uri: post.uri,
                        cid: post.cid,
                        text: text.toString(),
                        indexedAt: post.indexedAt,
                        author: {
                          did: post.author.did,
                          handle: post.author.handle,
                          displayName: post.author.displayName,
                          avatar: post.author.avatar,
                        },
                      },
                    });
                  }
                }}
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
          />

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
                text="Copy Link to Post"
                icon="bx:link"
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
              {session.user?.handle === post.author.handle && (
                <Dropdown.MenuItem
                  onSelect={() => {
                    deletePost.mutate();
                  }}
                  text="Delete Post"
                  icon="bxs:trash"
                />
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-x-8">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          if (isOpen) closeComposer();
          else {
            const text =
              AppBskyFeedPost.isRecord(post.record) && post.record.text;

            openComposer({
              replyTo: {
                uri: post.uri,
                cid: post.cid,
                text: text.toString(),
                author: {
                  handle: post.author.handle,
                  displayName: post.author.displayName,
                  avatar: post.author.avatar,
                },
              },
            });
          }
        }}
        className="text-sm font-medium text-neutral-500 hover:text-primary"
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
            className={`text-sm font-medium
              ${
                reposted
                  ? "text-green-600"
                  : "text-neutral-500 hover:text-green-600"
              }
            `}
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
            onSelect={() => {
              if (isOpen) closeComposer();
              else {
                const text =
                  AppBskyFeedPost.isRecord(post.record) && post.record.text;

                openComposer({
                  quote: {
                    uri: post.uri,
                    cid: post.cid,
                    text: text.toString(),
                    indexedAt: post.indexedAt,
                    author: {
                      did: post.author.did,
                      handle: post.author.handle,
                      displayName: post.author.displayName,
                      avatar: post.author.avatar,
                    },
                  },
                });
              }
            }}
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
        className={`text-sm font-medium
          ${liked ? "text-red-600" : "text-neutral-500 hover:text-red-600"}
          `}
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
            text="Copy Link to Post"
            icon="bx:link"
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
          {session.user?.handle === post.author.handle && (
            <Dropdown.MenuItem
              onSelect={() => {
                deletePost.mutate();
              }}
              text="Delete Post"
              icon="bxs:trash"
            />
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
