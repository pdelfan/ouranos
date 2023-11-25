import { AppBskyFeedDefs } from "@atproto/api";
import useAgent from "../useAgent";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUser, unBlockUser } from "@/lib/api/bsky/actor";
import { profileKey } from "../actor/useProfile";
import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { profilePostsKey } from "../feed/useProfilePosts";
import { useSession } from "next-auth/react";

interface Props {
  author: AppBskyFeedDefs.PostView["author"];
  viewer: ViewerState;
  viewerDID: string;
}

export const useBlockKey = (did: string) => ["block", did];

export default function useBlockUser(props: Props) {
  const { author, viewer, viewerDID } = props;
  const agent = useAgent();
  const [blocked, setBlocked] = useState(!!author.viewer?.blocking);
  const queryClient = useQueryClient();

  const toggleBlockUser = useMutation({
    mutationKey: useBlockKey(author.did),
    mutationFn: async () => {
      if (!blocked) {
        try {
          setBlocked(true);
          await blockUser(viewerDID, author.did, agent);
          queryClient.setQueryData(
            profileKey(author.handle),
            (oldData: any) => {
              return {
                ...oldData,
                viewer: {
                  ...oldData.viewer,
                  blocking: author.did,
                },
              };
            }
          );
        } catch (err) {
          setBlocked(false);
        }
      } else {
        try {
          setBlocked(false);
          const rkey = viewer!.blocking!.split("/").pop()!;
          await unBlockUser(viewerDID, author.did, rkey, agent);
          queryClient.setQueryData(
            profileKey(author.handle),
            (oldData: any) => {
              return {
                ...oldData,
                viewer: {
                  ...oldData.viewer,
                  blocking: undefined,
                },
              };
            }
          );
        } catch (err) {
          setBlocked(true);
        }
      }
    },
  });

  return {
    blocked,
    toggleBlockUser,
  };
}
