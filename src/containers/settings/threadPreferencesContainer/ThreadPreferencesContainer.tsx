"use client";

import Label from "@/components/inputs/label/Label";
import { RadioGroup, RadioGroupItem } from "@/components/inputs/radio/Radio";
import { Switch } from "@/components/inputs/switch/Switch";
import { updateThreadViewPreferences } from "@/lib/api/bsky/actor";
import { THREAD_VIEW_OPTIONS } from "@/lib/consts/settings";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { BskyThreadViewPreference } from "@atproto/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PreferencesResult } from "../../../../types/feed";
import ThreadPreferencesContainerSkeleton from "./ThreadPreferencesContainerSkeleton";

interface ItemProps {
  value: string;
  label: string;
}

function SortReplyItem(props: ItemProps) {
  const { value, label } = props;
  return (
    <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      <RadioGroupItem value={value}>{value}</RadioGroupItem>
      <Label>{label}</Label>
    </div>
  );
}

export default function ThreadPreferencesContainer() {
  const { isFetchingPreferences, preferences } = usePreferences();
  const agent = useAgent();
  const queryClient = useQueryClient();

  const updateThreadPrefs = useMutation({
    mutationKey: ["preferences"],
    mutationFn: async (prefs: Partial<BskyThreadViewPreference>) => {
      try {
        queryClient.setQueryData(
          ["preferences"],
          (oldData: PreferencesResult) => {
            return {
              ...oldData,
              threadPreferences: {
                ...oldData.threadPreferences,
                ...prefs,
              },
            };
          }
        );
        await updateThreadViewPreferences(prefs, agent);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isFetchingPreferences) {
    return <ThreadPreferencesContainerSkeleton />;
  }

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Thread Preferences
      </h2>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Sort Replies
        </h3>
        <section className="flex flex-col">
          <RadioGroup
            defaultValue={preferences?.threadPreferences.sort}
            onValueChange={async (value) => {
              updateThreadPrefs.mutate({ sort: value });
            }}
          >
            {THREAD_VIEW_OPTIONS.map((option) => (
              <SortReplyItem
                key={option.label}
                value={option.value}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Prioritize Your Follows
        </h3>
        <section className="flex flex-col">
          <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
            <Switch
              checked={preferences?.threadPreferences.prioritizeFollowedUsers}
              onCheckedChange={async (value) => {
                updateThreadPrefs.mutate({
                  prioritizeFollowedUsers: value,
                });
              }}
            />
            <Label>
              {preferences?.threadPreferences.prioritizeFollowedUsers
                ? "Yes"
                : "No"}
            </Label>
          </div>
        </section>
      </section>
    </section>
  );
}
