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
import { BskyLabelPreference } from "@atproto/api";
import useAgent from "@/lib/hooks/bsky/useAgent";
import {
  updateContentFilterPreferences,
  updateIsAdultContentEnabled,
} from "@/lib/api/bsky/actor";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/inputs/tabGroup/TabGroup";
import { ReactNode } from "react";
import ContentFilteringContainerSkeleton from "./ContentFilteringContainerSkeleton";

interface OptionsProps {
  item: ContentFilter;
}

function Options(props: OptionsProps) {
  const { item } = props;
  return (
    <>
      <ToggleGroupItem
        type="button"
        value={item.visibility === "ignore" ? "ignore" : "hide"}
      >
        Hide
      </ToggleGroupItem>
      <ToggleGroupItem type="button" value={"warn"}>
        Warn
      </ToggleGroupItem>
      <ToggleGroupItem type="button" value={"show"}>
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
    <div className="flex flex-wrap justify-between items-center gap-3 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      {item.label}
      {children}
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

  const updateContentFilter = useMutation({
    mutationKey: ["preferences"],
    mutationFn: async ({
      pref,
      value,
    }: {
      pref: ContentFilterLabel;
      value: BskyLabelPreference;
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
          }
        );
        await updateContentFilterPreferences(pref, value, agent);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const updateAdultContentFilter = useMutation({
    mutationKey: ["preferences"],
    mutationFn: async ({
      pref,
      value,
    }: {
      pref: ContentFilterLabel;
      value: BskyLabelPreference;
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
          }
        );
        await updateContentFilterPreferences(pref, value, agent);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isFetchingPreferences || !preferences)
    return <ContentFilteringContainerSkeleton />;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Content Filtering
      </h2>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Adult Content
        </h3>
        <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
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
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
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
                      value === "ignore"
                        ? "hide"
                        : (value as BskyLabelPreference),
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
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
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
                      value === "ignore"
                        ? "hide"
                        : (value as BskyLabelPreference),
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
