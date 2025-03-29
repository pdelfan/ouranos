import { useAgent } from "@/app/providers/atproto";
import { getProfile } from "@/lib/atproto/bsky/actor";
import { useQuery } from "@tanstack/react-query";

interface Props {
  handleOrDid: string;
}

export default function useProfile(props: Props) {
  const { handleOrDid } = props;
  const agent = useAgent();

  const {
    data: profile,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["profile", handleOrDid],
    queryFn: async () => {
      const profile = await getProfile({ agent, handleOrDid: handleOrDid });
      if (!profile) {
        throw new Error("Could not get profile");
      }
      return profile;
    },
  });

  return { profile, error, isLoading, isFetching };

}
