import { useState } from "react";
import { SavedFeed } from "../../../../../types/feed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePinFeed, toggleSaveFeed } from "@/lib/api/bsky/feed";
import toast from "react-hot-toast";
import { useAgent } from "@/app/providers/agent";

interface Props {
  feedItem: SavedFeed;
}

export default function useSaveFeed(props: Props) {
  const { feedItem } = props;
  const agent = useAgent();
  const [isPinned, setIsPinned] = useState(feedItem.pinned);
  const queryClient = useQueryClient();

  const updatePinnedFeeds = (mode: "pin" | "unpin") => {
    queryClient.setQueryData(["savedFeeds"], (oldData: any) => {
      return oldData.map((feed: SavedFeed) => {
        if (feed.cid === feedItem.cid) {
          return {
            ...feed,
            pinned: mode === "pin" ? true : false,
          };
        }
        return feed;
      });
    });
  };

  const updateSavedFeeds = (mode: "remove" | "add") => {
    queryClient.setQueryData(["savedFeeds"], (oldData: any) => {
      if (mode === "remove") {
        return oldData.filter((feed: SavedFeed) => feed.cid !== feedItem.cid);
      }

      if (mode === "add") {
        return [...oldData, feedItem];
      }
    });
  };

  const togglePin = useMutation({
    mutationKey: ["savedFeeds"],
    mutationFn: async () => {
      const isCurrentlyPinned = feedItem.pinned;
      // optimistically update to the new state
      setIsPinned(!isCurrentlyPinned);
      updatePinnedFeeds(isCurrentlyPinned ? "unpin" : "pin");

      try {
        await togglePinFeed(agent, feedItem.uri);
      } catch (error) {
        // revert to the old state in case of an error
        updatePinnedFeeds(isCurrentlyPinned ? "pin" : "unpin");
        setIsPinned(isCurrentlyPinned);
      }
    },
    onError: () => {
      toast.error(`Could not ${feedItem.pinned ? "unpin" : "pin"} feed`, {
        id: "Feed item pin error",
      });
    },
  });

  const deleteFeed = useMutation({
    mutationKey: ["savedFeeds"],
    mutationFn: async () => {
      updateSavedFeeds("remove");
      try {
        await toggleSaveFeed(agent, feedItem.uri);
      } catch (error) {
        updateSavedFeeds("add");
      }
    },
    onError: () => {
      toast.error(`Could not delete feed`, { id: "Feed item deletion error" });
    },
  });

  const saveFeed = useMutation({
    mutationKey: ["savedFeeds"],
    mutationFn: async () => {
      updateSavedFeeds("add");
      try {
        await toggleSaveFeed(agent, feedItem.uri);
      } catch (error) {
        updateSavedFeeds("remove");
      }
    },
    onError: () => {
      toast.error(`Could not save feed`, { id: "Feed item save error" });
    },
  });

  return {
    isPinned,
    togglePin,
    saveFeed,
    deleteFeed,
  };
}
