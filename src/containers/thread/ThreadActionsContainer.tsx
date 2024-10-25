import ComposePrompt from "@/components/actions/composePrompt/ComposePrompt";
import Search from "@/components/filter/search/Search";
import { AppBskyFeedDefs } from "@atproto/api";

interface Props {
  avatar?: string;
  post: AppBskyFeedDefs.PostView;
  rounded?: boolean;
}

export default function ThreadActionsContainer(props: Props) {
  const { avatar, post, rounded } = props;
  const postHasReplies = !!post.replyCount;

  return (
    <div>
      <div
        className={`flex flex-wrap justify-between gap-3 md:border-x-skin-base border-x-0 px-3 py-2 md:border-x ${
          rounded
            ? "border-skin-base border md:rounded-b-2xl"
            : "border-t-skin-base border-t"
        }`}
      >
        <ComposePrompt avatar={avatar} post={post} />
        {postHasReplies && (
          <div className="w-full sm:w-fit">
            <Search placeholder="Search for replies" />
          </div>
        )}
      </div>
    </div>
  );
}
