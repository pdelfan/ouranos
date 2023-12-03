"use client";

import { Switch } from "@/components/inputs/switch/Switch";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentFilterLabel, PreferencesResult } from "../../../types/feed";
import { BskyLabelPreference } from "@atproto/api";
import useAgent from "@/lib/hooks/bsky/useAgent";
import {
  updateContentFilterPreferences,
  updateIsAdultContentEnabled,
} from "@/lib/api/bsky/actor";
import { RadioGroupItem } from "@radix-ui/react-radio-group";

interface ItemProps {
  value: string;
  label: string;
}

function Item(props: ItemProps) {
  const { value, label } = props;
  return (
    <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      <RadioGroupItem value={value}>{value}</RadioGroupItem>
      <Label>{label}</Label>
    </div>
  );
}

export default function ContentFilteringContainer() {
  const { preferences, isFetchingPreferences } = usePreferences();
  const adultContentFilters = preferences?.contentFilter?.adultContentFilters;
  const contentFilters = preferences?.contentFilter.contentFilters;
  const isAdultContentHidden = preferences?.contentFilter.isAdultContentHidden;
  const agent = useAgent();
  const queryClient = useQueryClient();

  const updateIsAdultContentHidden = useMutation({
    mutationKey: ["preferences"],
    mutationFn: async (value: boolean) => {
      try {
        queryClient.setQueryData(
          ["preferences"],
          (oldData: PreferencesResult) => {
            return {
              ...oldData,
              contentFilter: {
                ...oldData.contentFilter,
                isAdultContentHidden: value,
              },
            };
          }
        );
        await updateIsAdultContentEnabled(!value, agent);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isFetchingPreferences || !preferences) return <>Loading</>;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Content Filtering
      </h2>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Adult Content
        </h3>
        <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
          <Switch
            checked={isAdultContentHidden}
            onCheckedChange={async (value) => {
              updateIsAdultContentHidden.mutate(value);
            }}
          />
          <Label>{isAdultContentHidden ? "Yes" : "No"}</Label>
        </div>
      </section>
    </section>
  );
}
