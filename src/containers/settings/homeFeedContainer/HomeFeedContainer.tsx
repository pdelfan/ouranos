"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import { Switch } from "@/components/inputs/switch/Switch";
import { BskyFeedViewPreference } from "@atproto/api";
import { updateHomeFeedPreferences } from "@/lib/api/bsky/actor";
import Label from "@/components/inputs/label/Label";
import { PreferencesResult } from "../../../../types/feed";
import HomeFeedContainerSkeleton from "./HomeFeedContainerSkeleton";
import toast from "react-hot-toast";
import { useAgent } from "@/app/providers/agent";

export default function HomeFeedContainer() {
  const agent = useAgent();
  const { isFetchingPreferences, preferences } = usePreferences();
  const feedFilter = preferences?.feedFilter;
  const queryClient = useQueryClient();

  const updateHomeFeedPrefs = useMutation({
    mutationKey: ["preferences"],
    mutationFn: async (prefs: Partial<BskyFeedViewPreference>) => {
      try {
        queryClient.setQueryData(
          ["preferences"],
          (oldData: PreferencesResult) => {
            return {
              ...oldData,
              feedFilter: {
                ...oldData.feedFilter,
                ...prefs,
              },
            };
          },
        );
        await updateHomeFeedPreferences(prefs, agent);
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => {
      toast.error("Could not update preferences", { id: "Preferences error" });
    },
  });

  if (isFetchingPreferences || !preferences) {
    return <HomeFeedContainerSkeleton />;
  }

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Home Feed Preferences
      </h2>

      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Hide Replies
        </h3>
        <section className="flex flex-col">
          <div className="border-skin-base flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={feedFilter?.hideReplies}
              onCheckedChange={async (value) => {
                updateHomeFeedPrefs.mutate({
                  hideReplies: value,
                });
              }}
            />
            <Label>{feedFilter?.hideReplies ? "Yes" : "No"}</Label>
          </div>
        </section>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Hide Replies by Unfollowed Users
        </h3>
        <section className="flex flex-col">
          <div className="border-skin-base flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={feedFilter?.hideRepliesByUnfollowed}
              onCheckedChange={async (value) => {
                // setHomeFeedPrefs((prev) => ({
                //   ...prev,
                //   hideRepliesByUnfollowed: value,
                // }));

                updateHomeFeedPrefs.mutate({
                  hideRepliesByUnfollowed: value,
                });
              }}
            />
            <Label>{feedFilter?.hideRepliesByUnfollowed ? "Yes" : "No"}</Label>
          </div>
        </section>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Hide Reposts
        </h3>
        <section className="flex flex-col">
          <div className="border-skin-base flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={feedFilter?.hideReposts}
              onCheckedChange={async (value) => {
                updateHomeFeedPrefs.mutate({
                  hideReposts: value,
                });
              }}
            />
            <Label>{feedFilter?.hideReposts ? "Yes" : "No"}</Label>
          </div>
        </section>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Hide Quote Posts
        </h3>
        <section className="flex flex-col">
          <div className="border-skin-base flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={feedFilter?.hideQuotePosts}
              onCheckedChange={async (value) => {
                updateHomeFeedPrefs.mutate({
                  hideQuotePosts: value,
                });
              }}
            />
            <Label>{feedFilter?.hideQuotePosts ? "Yes" : "No"}</Label>
          </div>
        </section>
      </section>
    </section>
  );
}
