import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import useLike from "@/lib/hooks/bsky/feed/useLike";
import useRepost from "@/lib/hooks/bsky/feed/useRepost";
import { useClipboard } from "use-clipboard-copy";
import { AppBskyFeedPost, type AppBskyFeedDefs } from "@atproto/api";
import { useCallback } from "react";
import { getPostId } from "@/lib/utils/link";
import useMuteUser from "@/lib/hooks/bsky/feed/useMuteUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { abbreviateNumber } from "@/lib/utils/number";
import useDeletePost from "@/lib/hooks/bsky/feed/useDeletePost";
import { useComposerControls } from "@/app/providers/composer";
import toast from "react-hot-toast";
import {
  BiDotsHorizontalRounded,
  BiHeart,
  BiMessageRounded,
  BiRepost,
  BiSolidBell,
  BiSolidBellOff,
  BiSolidCopy,
  BiSolidHeart,
  BiSolidQuoteAltRight,
  BiSolidTrash,
} from "react-icons/bi";
import { getTranslateLink } from "@/lib/utils/text";
import { MdOutlineTranslate, MdIosShare } from "react-icons/md";

interface Props {
  post: AppBskyFeedDefs.PostView;
  mode?: "thread" | "feed";
}

export default function PostActions(props: Props) {
  const { post, mode = "feed" } = props;
  const text = AppBskyFeedPost.isRecord(post.record) && post.record.text;
  const { data: session } = useSession();
  const { deletePost } = useDeletePost({ post: post });
  const { liked, toggleLike, likeCount } = useLike({ post: post });
  const { reposted, toggleRepost, repostCount } = useRepost({ post: post });
  const quoteCount = post.quoteCount ?? 0;
  const { muted, toggleMuteUser } = useMuteUser({ author: post.author });
  const clipboard = useClipboard({ copiedTimeout: 3500 });
  const { openComposer } = useComposerControls();

  const handleShare = useCallback(() => {
    const postId = getPostId(post.uri);
    const shareUrl = `https://useouranos.app/dashboard/user/${post.author.handle}/post/${postId}`;
    clipboard.copy(shareUrl);
    toast.success("Copied link to post", { id: "Copy post link" });
  }, [clipboard, post.uri, post.author.handle]);

  const handleCopyPostText = useCallback(() => {
    toast.success("Copied post text", { id: "Copy post text" });
    clipboard.copy(text);
  }, [clipboard, text]);

  const handleTranslation = useCallback(() => {
    if (text) {
      window.open(getTranslateLink(text), "_blank");
    }
  }, [text]);

  if (!session) return null;

  if (mode === "thread") {
    return (
      <div>
        {(likeCount > 0 || repostCount > 0) && (
          <div className="border-skin-base mt-3 flex flex-wrap items-center gap-3 border-y py-2">
            {repostCount > 0 && (
              <Link
                href={`/dashboard/user/${post.author.handle}/post/${getPostId(
                  post.uri
                )}/reposted-by`}
                className="text-skin-base flex gap-1 font-semibold"
              >
                {abbreviateNumber(repostCount)}
                <span className="text-skin-tertiary font-medium">
                  Repost{repostCount > 1 && "s"}
                </span>
              </Link>
            )}
            {quoteCount > 0 && (
              <Link
                href={`/dashboard/user/${post.author.handle}/post/${getPostId(
                  post.uri
                )}/quotes`}
                className="text-skin-base flex gap-1 font-semibold"
              >
                {abbreviateNumber(quoteCount)}
                <span className="text-skin-tertiary font-medium">
                  Quote{quoteCount > 1 && "s"}
                </span>
              </Link>
            )}
            {likeCount > 0 && (
              <Link
                href={`/dashboard/user/${post.author.handle}/post/${getPostId(
                  post.uri
                )}/liked-by`}
                className="text-skin-base flex gap-1 font-semibold"
              >
                {abbreviateNumber(likeCount)}
                <span className="text-skin-tertiary font-medium">
                  Like{likeCount > 1 && "s"}
                </span>
              </Link>
            )}
          </div>
        )}
        <div className="mt-3 flex justify-between">
          <Button
            disabled={post.viewer?.replyDisabled}
            onClick={(e) => {
              e.stopPropagation();
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
            }}
            className="hover:text-primary text-skin-icon-muted"
          >
            <BiMessageRounded className="text-xl" />
          </Button>
          <Dropdown>
            <Dropdown.Trigger>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={
                  reposted
                    ? "text-skin-icon-repost"
                    : "text-skin-icon-muted hover:text-skin-icon-repost"
                }
              >
                <BiRepost className="text-2xl" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.MenuItem
                onSelect={() => {
                  toggleRepost.mutate();
                }}
                text={`${reposted ? "Undo repost" : "Repost"}`}
                icon={<BiRepost />}
              />
              <Dropdown.MenuItem
                onSelect={() => {
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
                }}
                text="Quote Post"
                icon={<BiSolidQuoteAltRight />}
              />
            </Dropdown.Menu>
          </Dropdown>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike.mutate();
            }}
            className={
              liked
                ? "text-skin-icon-like"
                : "text-skin-icon-muted hover:text-skin-icon-like"
            }
          >
            {liked ? (
              <BiSolidHeart className="text-xl" />
            ) : (
              <BiHeart className="text-xl" />
            )}
          </Button>
          <Dropdown>
            <Dropdown.Trigger>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-skin-icon-muted hover:text-skin-base"
              >
                <BiDotsHorizontalRounded className="text-xl" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              {text && (
                <Dropdown.MenuItem
                  onSelect={handleTranslation}
                  text="Translate"
                  icon={<MdOutlineTranslate />}
                />
              )}
              <Dropdown.MenuItem
                onSelect={handleShare}
                text="Copy Link to Post"
                icon={<MdIosShare />}
              />
              {text && (
                <Dropdown.MenuItem
                  onSelect={handleCopyPostText}
                  text="Copy Post Text"
                  icon={<BiSolidCopy />}
                />
              )}
              {session.user?.handle !== post.author.handle && (
                <Dropdown.MenuItem
                  onSelect={() => {
                    toggleMuteUser.mutate();
                  }}
                  text={`${muted ? "Unmute User" : "Mute User"}`}
                  icon={muted ? <BiSolidBell /> : <BiSolidBellOff />}
                />
              )}
              {session.user?.handle === post.author.handle && (
                <Dropdown.MenuItem
                  onSelect={() => {
                    deletePost.mutate();
                  }}
                  text="Delete Post"
                  icon={<BiSolidTrash />}
                />
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <Button
        disabled={post.viewer?.replyDisabled}
        onClick={(e) => {
          e.stopPropagation();
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
        }}
        className="hover:text-primary text-skin-icon-muted text-sm font-medium"
      >
        <BiMessageRounded className="text-lg" />
        {post.replyCount ? abbreviateNumber(post.replyCount) : null}
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
                  ? "text-skin-icon-repost"
                  : "text-skin-icon-muted hover:text-skin-icon-repost"
              }
            `}
          >
            <BiRepost className="text-xl" />
            {repostCount > 0 && abbreviateNumber(repostCount)}
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.MenuItem
            onSelect={() => {
              toggleRepost.mutate();
            }}
            text={`${reposted ? "Undo repost" : "Repost"}`}
            icon={<BiRepost />}
          />
          <Dropdown.MenuItem
            onSelect={() => {
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
            }}
            text="Quote Post"
            icon={<BiSolidQuoteAltRight />}
          />
        </Dropdown.Menu>
      </Dropdown>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike.mutate();
        }}
        className={`text-sm font-medium ${
          liked
            ? "text-skin-icon-like"
            : "text-skin-icon-muted hover:text-skin-icon-like"
        }
          `}
      >
        {liked ? (
          <BiSolidHeart className="text-lg" />
        ) : (
          <BiHeart className="text-lg" />
        )}
        {likeCount > 0 && abbreviateNumber(likeCount)}
      </Button>

      <Dropdown>
        <Dropdown.Trigger>
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-skin-icon-muted hover:text-skin-base"
          >
            <BiDotsHorizontalRounded className="text-lg" />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {text && (
            <Dropdown.MenuItem
              onSelect={handleTranslation}
              text="Translate"
              icon={<MdOutlineTranslate />}
            />
          )}
          <Dropdown.MenuItem
            onSelect={handleShare}
            text="Copy Link to Post"
            icon={<MdIosShare />}
          />
          {text && (
            <Dropdown.MenuItem
              onSelect={handleCopyPostText}
              text="Copy Post Text"
              icon={<BiSolidCopy />}
            />
          )}
          {session.user?.handle !== post.author.handle && (
            <Dropdown.MenuItem
              onSelect={() => {
                toggleMuteUser.mutate();
              }}
              text={`${muted ? "Unmute User" : "Mute User"}`}
              icon={muted ? <BiSolidBell /> : <BiSolidBellOff />}
            />
          )}
          {session.user?.handle === post.author.handle && (
            <Dropdown.MenuItem
              onSelect={() => {
                deletePost.mutate();
              }}
              text="Delete Post"
              icon={<BiSolidTrash />}
            />
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
