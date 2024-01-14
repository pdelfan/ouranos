import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAgent from "../useAgent";
import { getProfile } from "@/lib/api/bsky/actor";
import { follow, unfollow } from "@/lib/api/bsky/social";

export const profileKey = (handle: string) => ["profile", handle];

export default function useProfile(handle: string) {
  const agent = useAgent();
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: profileKey(handle),
    queryFn: () => getProfile(handle, agent),
  });

  const updateFollowCount = (mode: "decrease" | "increase") => {
    queryClient.setQueryData(profileKey(handle), (oldData: any) => {
      return {
        ...oldData,
        viewer: {
          ...oldData.viewer,
          following: mode === "increase" ? true : false,
        },
        followersCount:
          mode === "increase"
            ? oldData.followersCount + 1
            : oldData.followersCount - 1,
      };
    });
  };

  // TODO: resolve race condition issue where unfollow stops working after unfollowing, following, and then unfollowing again
  const toggleFollow = useMutation({
    mutationKey: profileKey(handle),
    mutationFn: async () => {
      if (!data) return;

      const isCurrentlyFollowing = data.viewer?.following ? true : false;
      // optimistically update to the new state
      updateFollowCount(isCurrentlyFollowing ? "decrease" : "increase");

      try {
        if (isCurrentlyFollowing && data.viewer?.following) {
          await unfollow(agent, data.viewer.following);
        } else {
          await follow(agent, data.did);
        }
      } catch (error) {
        // revert to the old state in case of an error
        updateFollowCount(isCurrentlyFollowing ? "increase" : "decrease");
      }
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    isRefetching,
    toggleFollow,
  };
}
