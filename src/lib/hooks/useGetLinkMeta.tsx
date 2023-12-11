import { useQuery } from "@tanstack/react-query";
import { LINK_META_ENDPOINT } from "../consts/links";

export default function useGetLinkMeta(url: string) {
  const { status, data, error, isLoading, isFetching } = useQuery({
    queryKey: ["linkMeta", url],
    queryFn: async ({ signal }) => {
      const response = await fetch(`${LINK_META_ENDPOINT}?url=${url}`, {
        signal,
      });

      if (!response.ok) {
        throw new Error("Could not fetch link meta");
      }

      const body: LinkMeta = await response.json();

      if (body.error !== "") {
        throw new Error("Link meta returned an error");
      }

      const linkMeta: LinkMeta = {
        url: body.url,
        title: body.title,
        description: body.description,
        image: body.image,
        likelyType: body.likelyType,
      };

      return linkMeta;
    },
  });

  return {
    status,
    data,
    error,
    isLoading,
    isFetching,
  };
}
