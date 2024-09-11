import { AppBskyFeedDefs, AppBskyFeedThreadgate } from "@atproto/api";
import Link from "next/link";
import { BiMessageRoundedEdit } from "react-icons/bi";

interface Props {
  post: AppBskyFeedDefs.PostView;
}

export default function WhoCanReply(props: Props) {
  const { post } = props;
  const canReply = !post.viewer?.replyDisabled || false;  
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
        <p className="text-skin-base text-sm">
          Replies to this thread are disabled
        </p>
      );
    }

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
      <p className="text-skin-base text-sm">
        {follow && mention && (
          <>
            Users followed and mentioned by{" "}
            <Link
              href={`/dashboard/user/${post.author.handle}`}
              className="text-skin-link-base hover:text-skin-link-hover font-medium"
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
              className="text-skin-link-base hover:text-skin-link-hover font-medium"
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
                className="text-skin-link-base hover:text-skin-link-hover font-medium"
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
      className="border-t-skin-base md:border-x-skin-base w-full border-x-0 border-t p-2 md:border-x"
    >
      <div className="bg-primary/20 flex items-center gap-3 rounded-xl p-2">
        <div className="bg-primary rounded-2xl p-1.5">
          <BiMessageRoundedEdit className="text-skin-icon-inverted text-xl" />
        </div>
        <div className="flex flex-col">
          <span className="text-skin-base font-medium">
            {canReply ? "You can reply" : "Who can reply?"}
          </span>
          {getLabel()}
        </div>
      </div>
    </section>
  );
}
