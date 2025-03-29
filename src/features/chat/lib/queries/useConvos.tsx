import { useAgent, useSession } from "@/app/providers/atproto";
import { getChatConvos } from "@/lib/atproto/bsky/chat";

import { useQuery } from "@tanstack/react-query";

export default function useConvos() {
  const agent = useAgent();
  const session = useSession();

  const {
    data: convos,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["convos", session.did],
    queryFn: async () => {
      const data = await getChatConvos({agent});
      if (!data) {
        throw new Error("Could not get convos");
      }

      // filter out the user from members list
      const formattedConvos = data.convos.map((convo) => {
        return {
          ...convo,
          members: convo.members.filter((m) => m.did !== session.did),
        };
      });

      return formattedConvos;
    },
  });

  return { convos, error, isLoading, isFetching };

}
