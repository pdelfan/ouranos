import ComposePrompt from "@/components/actions/composePrompt/ComposePrompt";
import Search from "@/components/filter/search/Search";
import { AppBskyFeedDefs } from "@atproto/api";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import Button from "@/components/actions/button/Button";
import { BiSortAlt2 } from "react-icons/bi";
import { SetStateAction, useState } from "react";
import { ThreadViewResult } from "../../../types/feed";
import { getSortLabel } from "@/lib/utils/text";

interface Props {
  avatar?: string;
  post: AppBskyFeedDefs.PostView;
  rounded?: boolean;
  onThreadSort: React.Dispatch<SetStateAction<ThreadViewResult>>;
  preferredSort: string;
}

export default function ThreadActionsContainer(props: Props) {
  const { avatar, post, rounded, onThreadSort, preferredSort } = props;
  const postHasReplies = !!post.replyCount;

  const handleSort = (sortBy: string) => {
    onThreadSort((prev) => {
      return { ...prev, sort: sortBy };
    });
  };

  return (
    <div>
      <div
        className={`md:border-x-skin-base border-x-0 px-3 py-2 md:border-x ${
          rounded
            ? "border-skin-base border md:rounded-b-2xl"
            : "border-t-skin-base border-t"
        }`}
      >
        <ComposePrompt avatar={avatar} post={post} />
      </div>
      {postHasReplies && (
        <div className="flex flex-wrap items-center gap-3 justify-between border-x border-t border-skin-base px-3 py-2">
          <Dropdown>
            <Dropdown.Trigger>
              <Button>
                <BiSortAlt2 className="text-skin-icon-base text-lg" />
                Sort:{" "}
                <span className="font-semibold">
                  {getSortLabel(preferredSort)}
                </span>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.MenuItem
                onSelect={() => handleSort("newest")}
                text="Newest"
              />
              <Dropdown.MenuItem
                onSelect={() => handleSort("oldest")}
                text="Oldest"
              />
              <Dropdown.MenuItem
                onSelect={() => handleSort("most-likes")}
                text="Most likes"
              />
              <Dropdown.MenuItem
                onSelect={() => handleSort("random")}
                text="Random"
              />
            </Dropdown.Menu>
          </Dropdown>
          <div className="w-full sm:w-fit sm:max-w-sm">
            <Search placeholder="Search for replies" />
          </div>
        </div>
      )}
    </div>
  );
}
