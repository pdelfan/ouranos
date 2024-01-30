import { AppBskyFeedDefs, AppBskyFeedThreadgate } from "@atproto/api";
import Link from "next/link";
import { ReactElement } from "react";
import { BiMessageRoundedEdit } from "react-icons/bi";

interface Props {
  post: AppBskyFeedDefs.PostView;
}

export default function WhoCanReply(props: Props) {
  const { post } = props;
  const canReply = !post.viewer?.replyDisabled ?? false;
  const rounded = !canReply && post.replyCount === 0;
  const record =
    post.threadgate &&
    AppBskyFeedThreadgate.isRecord(post.threadgate.record) &&
    AppBskyFeedThreadgate.validateRecord(post.threadgate.record).success
      ? post.threadgate.record
      : null;

  if (!record) return null;

  const getLabel = () => {
    if (!record.allow || record.allow.length === 0) {
      return (
        <p className="text-sm text-neutral-800">
          Replies to this thread are disabled
        </p>
      );
    }

    let label: ReactElement = <></>;
    const rules = record.allow;
    let mention = false;
    let follow = false;
    let lists;

    for (const rule of rules) {
      if (
        AppBskyFeedThreadgate.isMentionRule(rule) &&
        AppBskyFeedThreadgate.isFollowingRule(rule)
      ) {
        mention = true;
        follow = true;
      } else if (AppBskyFeedThreadgate.isFollowingRule(rule)) {
        follow = true;
      } else if (AppBskyFeedThreadgate.isMentionRule(rule)) {
        mention = true;
      } else if (AppBskyFeedThreadgate.isListRule(rule)) {
        lists = post.threadgate?.lists;
      }
    }

    return (
      <p className="text-sm text-neutral-800">
        {follow && mention && (
          <>
            Users followed and mentioned by{" "}
            <Link
              href={`/dashboard/user/${post.author.handle}`}
              className="text-primary hover:text-primary-dark font-medium"
            >
              {post.author.handle}
            </Link>{" "}
          </>
        )}
        {follow && !mention && (
          <>
            Users followed by{" "}
            <Link
              href={`/dashboard/user/${post.author.handle}`}
              className="text-primary hover:text-primary-dark font-medium"
            >
              {post.author.handle}
            </Link>{" "}
          </>
        )}
        {mention && !follow && <>Mentioned users</>}
        {lists && lists.length > 0 && (
          <>
            {follow || mention ? " and members " : "Members "}
            in the following {lists.length > 1 ? "lists" : "list"} can reply:{" "}
            {lists.map((list, i) => (
              <Link
                key={list.uri}
                href={{
                  pathname: `/dashboard/user/${post.author.handle}/lists/${encodeURIComponent(
                    list.uri.split(":")[3].split("/")[2],
                  )}`,
                  query: { uri: list.uri },
                }}
                className="text-primary hover:text-primary-dark font-medium"
              >
                {list.name}
                {i < lists?.length - 1 && ", "}
              </Link>
            ))}
          </>
        )}
        {!lists && <> can reply</>}
      </p>
    );
  };

  return (
    <section
      className={`bg-primary/20 flex w-full items-center gap-3 border-x-0 border-t px-3 py-2 md:border-x ${rounded && "md:rounded-b-2xl"}`}
    >
      <div className="bg-primary rounded-2xl p-1.5">
        <BiMessageRoundedEdit className=" text-xl text-white" />
      </div>
      {getLabel()}
    </section>
  );
}
