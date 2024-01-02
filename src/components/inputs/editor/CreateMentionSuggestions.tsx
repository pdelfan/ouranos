import type { MentionOptions } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import SuggestionList, { type SuggestionListRef } from "./SuggestionList";
import { ProfileViewBasic } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import tippy, { type Instance as TippyInstance } from "tippy.js";

const DOM_RECT_FALLBACK: DOMRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON() {
    return {};
  },
};

export type MentionSuggestion = {
  id: string;
  avatar?: string;
  displayName?: string;
  handle: string;
  viewer: {
    muted?: boolean;
    blockedBy?: boolean;
  };
};

export function CreateMentionSuggestions({
  autoComplete,
}: {
  autoComplete: (term: string) => Promise<ProfileViewBasic[] | undefined>;
}): MentionOptions["suggestion"] {
  return {
    items: async ({ query }) => {
      // TODO: add debounce
      const suggestions = await autoComplete(query);
      if (!suggestions) return [];
      return suggestions.map((suggestion) => ({
        id: suggestion.did,
        avatar: suggestion.avatar,
        displayName: suggestion.displayName,
        handle: suggestion.handle,
        viewer: {
          muted: suggestion.viewer?.muted,
          blockedBy: suggestion.viewer?.blockedBy,
        },
      }));
    },

    render: () => {
      let component: ReactRenderer<SuggestionListRef> | undefined;
      let popup: TippyInstance | undefined;
      let parent: HTMLDivElement | null = document.querySelector("#composer");

      return {
        onStart: (props) => {
          component = new ReactRenderer(SuggestionList, {
            props,
            editor: props.editor,
          });

          popup = tippy("body", {
            getReferenceClientRect: () =>
              props.clientRect?.() ?? DOM_RECT_FALLBACK,
            appendTo: parent ?? "parent",
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          })[0];
        },

        onUpdate(props) {
          component?.updateProps(props);

          popup?.setProps({
            getReferenceClientRect: () =>
              props.clientRect?.() ?? DOM_RECT_FALLBACK,
          });
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup?.hide();
            return true;
          }

          if (!component?.ref) {
            return false;
          }

          return component.ref.onKeyDown(props);
        },

        onExit() {
          popup?.destroy();
          component?.destroy();

          // Remove references to the old popup and component upon destruction/exit.
          // (This should prevent redundant calls to `popup.destroy()`, which Tippy
          // warns in the console is a sign of a memory leak, as the `suggestion`
          // plugin seems to call `onExit` both when a suggestion menu is closed after
          // a user chooses an option, *and* when the editor itself is destroyed.)
          popup = undefined;
          component = undefined;
        },
      };
    },
  };
}
