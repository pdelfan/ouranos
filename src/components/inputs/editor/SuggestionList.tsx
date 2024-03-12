import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MentionSuggestion } from "./CreateMentionSuggestions";

import Image from "next/image";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";

export type SuggestionListRef = {
  // For convenience using this SuggestionList from within the
  // mentionSuggestionOptions, we'll match the signature of SuggestionOptions's
  // `onKeyDown` returned in its `render` function
  onKeyDown: NonNullable<
    ReturnType<
      NonNullable<SuggestionOptions<MentionSuggestion>["render"]>
    >["onKeyDown"]
  >;
};

// This type is based on
// https://github.com/ueberdosis/tiptap/blob/a27c35ac8f1afc9d51f235271814702bc72f1e01/packages/extension-mention/src/mention.ts#L73-L103.
interface MentionNodeAttrs {
  id: string;
  avatar?: string;
  displayName?: string;
  handle: string;
  viewer: {
    muted?: boolean;
    blockedBy?: boolean;
  };
}

export type SuggestionListProps = SuggestionProps<MentionSuggestion>;

const SuggestionList = forwardRef<SuggestionListRef, SuggestionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(-1); // -1 means no selection by default

    const selectItem = (index: number) => {
      if (index >= props.items.length) {
        // Make sure we actually have enough items to select the given index. For
        // instance, if a user presses "Enter" when there are no options, the index will
        // be 0 but there won't be any items, so just ignore the callback here
        return;
      }

      const suggestion = props.items[index];

      // Set all of the attributes of our Mention node based on the suggestion
      // data. The fields of `suggestion` will depend on whatever data you
      // return from your `items` function in your "suggestion" options handler.
      // Our suggestion handler returns `MentionSuggestion`s (which we've
      // indicated via SuggestionProps<MentionSuggestion>). We are passing an
      // object of the `MentionNodeAttrs` shape when calling `command` (utilized
      // by the Mention extension to create a Mention Node).
      const mentionItem: MentionNodeAttrs = {
        id: suggestion.handle,
        avatar: suggestion.avatar,
        displayName: suggestion.displayName,
        handle: suggestion.handle,
        viewer: suggestion.viewer,
      };

      props.command(mentionItem);
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length,
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(-1), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div
        className={`animate-fade animate-duration-300 bg-skin-base border-skin-base mb-2 mt-2 min-h-fit rounded-xl border p-1 drop-shadow-lg`}
      >
        {props.items.length === 0 && (
          <div className="focus:bg-skin-tertiary flex cursor-pointer items-center justify-between gap-10 rounded-md px-2 py-1 focus:outline-none">
            <span className="inline-block max-w-xs whitespace-nowrap">
              No User Found
            </span>
          </div>
        )}
        {props.items.length > 0 &&
          props.items.map((item, index) => (
            <div
              key={item.id + index}
              onClick={(e) => {
                e.preventDefault();
                selectItem(index);
              }}
              className={`hover:bg-skin-tertiary focus:bg-skin-tertiary flex cursor-pointer items-center justify-between rounded-md px-2 py-1 focus:outline-none ${
                index === selectedIndex && "bg-skin-tertiary"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={item?.avatar ?? FallbackAvatar}
                  alt="Avatar"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-skin-base max-w-xs">
                    {item.displayName || item.handle}
                  </span>
                  <span className="text-skin-tertiary text-sm">
                    {item.handle}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  },
);

SuggestionList.displayName = "SuggestionList";

export default SuggestionList;
