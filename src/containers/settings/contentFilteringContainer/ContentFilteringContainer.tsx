"use client";

import { Switch } from "@/components/inputs/switch/Switch";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ContentFilter,
  ContentFilterLabel,
  PreferencesResult,
} from "../../../../types/feed";
import { LabelPreference } from "@atproto/api";
import {
  updateContentFilterPreferences,
  updateIsAdultContentEnabled,
} from "@/lib/api/bsky/actor";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/inputs/toggleGroup/ToggleGroup";
import { ReactNode } from "react";
import ContentFilteringContainerSkeleton from "./ContentFilteringContainerSkeleton";
import toast from "react-hot-toast";
import { useAgent } from "@/app/providers/agent";

interface OptionsProps {
  item: ContentFilter;
}

function Options(props: OptionsProps) {
  const { item } = props;
  const agent = useAgent();

  return (
    <>
      <ToggleGroupItem type="button" value={"hide"}>
        Hide
      </ToggleGroupItem>
      <ToggleGroupItem type="button" value={"warn"}>
        Warn
      </ToggleGroupItem>
      <ToggleGroupItem
        type="button"
        value={item.visibility === "ignore" ? "ignore" : "show"}
      >
        Show
      </ToggleGroupItem>
    </>
  );
}

interface ItemProps {
  item: ContentFilter;
  children: ReactNode;
}
function Item(props: ItemProps) {
  const { item, children } = props;
  return (
    <div className="border-skin-base flex items-center justify-between gap-3 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-col">
        <span className="text-skin-base font-medium">{item.label}</span>
        <span className="text-skin-secondary">{item.description}</span>
      </div>
      {children}
    </div>
  );
}

export default function ContentFilteringContainer() {
  const agent = useAgent();
  const { preferences, isFetchingPreferences } = usePreferences();
  const adultContentFilters = preferences?.contentFilter?.adultContentFilters;
  const contentFilters = preferences?.contentFilter.contentFilters;
  const isAdultContentHidden = preferences?.contentFilter.isAdultContentHidden;
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
          },
        );
        await updateIsAdultContentEnabled(!value, agent);
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => {
      toast.error("Could not update preferences", { id: "Preferences error" });
    },
  });

  const updateContentFilter = useMutation({
    mutationKey: ["preferences"],
    mutationFn: async ({
      pref,
      value,
    }: {
      pref: ContentFilterLabel;
      value: LabelPreference;
    }) => {
      try {
        queryClient.setQueryData(
          ["preferences"],
          (oldData: PreferencesResult) => {
            const updatedContentFilters =
              oldData.contentFilter.contentFilters.map((filter) => {
                if (filter.type === pref) {
                  return { ...filter, visibility: value };
                }
                return filter;
              });

            return {
              ...oldData,
              contentFilter: {
                ...oldData.contentFilter,
                contentFilters: updatedContentFilters,
              },
            };
          },
        );
        await updateContentFilterPreferences(pref, value, agent);
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => {
      toast.error("Could not update preferences", { id: "Preferences error" });
    },
  });

  const updateAdultContentFilter = useMutation({
    mutationKey: ["preferences"],
    mutationFn: async ({
      pref,
      value,
    }: {
      pref: ContentFilterLabel;
      value: LabelPreference;
    }) => {
      try {
        queryClient.setQueryData(
          ["preferences"],
          (oldData: PreferencesResult) => {
            const updatedAdultContentFilters =
              oldData.contentFilter.adultContentFilters.map((filter) => {
                if (filter.type === pref) {
                  return { ...filter, visibility: value };
                }
                return filter;
              });

            return {
              ...oldData,
              contentFilter: {
                ...oldData.contentFilter,
                adultContentFilters: updatedAdultContentFilters,
              },
            };
          },
        );
        await updateContentFilterPreferences(pref, value, agent);
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => {
      toast.error("Could not update preferences", { id: "Preferences error" });
    },
  });

  if (isFetchingPreferences || !preferences)
    return <ContentFilteringContainerSkeleton />;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Content Filtering
      </h2>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Hide Adult Content
        </h3>
        <div className="border-skin-base flex items-center gap-2 border border-x-0 p-3 last:border-b md:rounded-t-2xl md:border-x md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
          <Switch
            checked={isAdultContentHidden}
            onCheckedChange={async (value) => {
              updateIsAdultContentHidden.mutate(value);
            }}
          />
          <Label>{isAdultContentHidden ? "Yes" : "No"}</Label>
        </div>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Adult Content Filters
        </h3>
        <div>
          {adultContentFilters?.map((item) => (
            <Item key={item.label} item={item}>
              <ToggleGroup
                key={item.label}
                type="single"
                defaultValue={item.visibility}
                value={item.visibility}
                disabled={isAdultContentHidden}
                onValueChange={(value) => {
                  if (!value) return;
                  const updateParams = {
                    pref: item.type as ContentFilterLabel,
                    value:
                      value === "ignore" ? "hide" : (value as LabelPreference),
                  };
                  updateAdultContentFilter.mutate(updateParams);
                }}
              >
                <Options item={item} />
              </ToggleGroup>
            </Item>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Other Filters
        </h3>
        <div>
          {contentFilters?.map((item) => (
            <Item key={item.label} item={item}>
              <ToggleGroup
                key={item.label}
                type="single"
                defaultValue={item.visibility}
                value={item.visibility}
                onValueChange={(value) => {
                  if (!value) return;
                  const updateParams = {
                    pref: item.type as ContentFilterLabel,
                    value:
                      value === "ignore" ? "hide" : (value as LabelPreference),
                  };
                  updateContentFilter.mutate(updateParams);
                }}
              >
                <Options item={item} />
              </ToggleGroup>
            </Item>
          ))}
        </div>
      </section>
    </section>
  );
}
