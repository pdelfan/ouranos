"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useMutation } from "@tanstack/react-query";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import { Switch } from "@/components/inputs/switch/Switch";
import { useEffect, useState } from "react";
import { BskyFeedViewPreference } from "@atproto/api";
import { updateHomeFeedPreferences } from "@/lib/api/bsky/actor";
import { Label } from "@radix-ui/react-dropdown-menu";
import { getFeedFilter } from "@/lib/utils/feed";

export function HomeFeedItemSkeleton() {
  return (
    <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 animate-pulse">
      <div className="w-8 h-6 rounded-full bg-gray-200"></div>
      <div className="w-1/3 h-6 rounded-full bg-gray-200"></div>
    </div>
  );
}

export default function HomeFeedContainer() {
  const agent = useAgent();
  const { isFetchingPreferences, preferences } = usePreferences();
  const feedFilter = getFeedFilter(preferences);
  const [homeFeedPrefs, setHomeFeedPrefs] = useState(feedFilter);

  useEffect(() => {
    setHomeFeedPrefs(feedFilter);
  }, [feedFilter]);

  const updateHomeFeedPrefs = useMutation({
    mutationKey: ["preferences"],
    mutationFn: async (prefs: Partial<BskyFeedViewPreference>) => {
      try {
        await updateHomeFeedPreferences(prefs, agent);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isFetchingPreferences || !preferences) {
    return (
      <section className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
          Home Feed Preferences
        </h2>

        <section>
          <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
            Hide Replies
          </h3>
          <section className="flex flex-col">
            <HomeFeedItemSkeleton />
          </section>
        </section>
        <section>
          <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
            Hide Replies by Unfollowed Users
          </h3>
          <section className="flex flex-col">
            <HomeFeedItemSkeleton />
          </section>
        </section>
        <section>
          <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
            Hide Reposts
          </h3>
          <section className="flex flex-col">
            <HomeFeedItemSkeleton />
          </section>
        </section>
        <section>
          <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
            Hide Quote Posts
          </h3>
          <section className="flex flex-col">
            <HomeFeedItemSkeleton />
          </section>
        </section>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Home Feed Preferences
      </h2>

      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Replies
        </h3>
        <section className="flex flex-col">
          <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={homeFeedPrefs.hideReplies}
              onCheckedChange={async (value) => {
                setHomeFeedPrefs((prev) => ({
                  ...prev,
                  hideReplies: value,
                }));

                updateHomeFeedPrefs.mutate({
                  hideReplies: value,
                });
              }}
            />
            <Label>{homeFeedPrefs.hideReplies ? "Yes" : "No"}</Label>
          </div>
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Replies by Unfollowed Users
        </h3>
        <section className="flex flex-col">
          <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={homeFeedPrefs.hideRepliesByUnfollowed}
              onCheckedChange={async (value) => {
                setHomeFeedPrefs((prev) => ({
                  ...prev,
                  hideRepliesByUnfollowed: value,
                }));

                updateHomeFeedPrefs.mutate({
                  hideRepliesByUnfollowed: value,
                });
              }}
            />
            <Label>
              {homeFeedPrefs.hideRepliesByUnfollowed ? "Yes" : "No"}
            </Label>
          </div>
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Reposts
        </h3>
        <section className="flex flex-col">
          <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={homeFeedPrefs.hideReposts}
              onCheckedChange={async (value) => {
                setHomeFeedPrefs((prev) => ({
                  ...prev,
                  hideReposts: value,
                }));

                updateHomeFeedPrefs.mutate({
                  hideReposts: value,
                });
              }}
            />
            <Label>{homeFeedPrefs.hideReposts ? "Yes" : "No"}</Label>
          </div>
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Quote Posts
        </h3>
        <section className="flex flex-col">
          <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={homeFeedPrefs.hideQuotePosts}
              onCheckedChange={async (value) => {
                setHomeFeedPrefs((prev) => ({
                  ...prev,
                  hideQuotePosts: value,
                }));

                updateHomeFeedPrefs.mutate({
                  hideQuotePosts: value,
                });
              }}
            />
            <Label>{homeFeedPrefs.hideQuotePosts ? "Yes" : "No"}</Label>
          </div>
        </section>
      </section>
    </section>
  );
}
