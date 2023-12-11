import Image from "next/image";
import useGetLinkMeta from "@/lib/hooks/useGetLinkMeta";
import { Dispatch, SetStateAction } from "react";
import { getHostname } from "@/lib/utils/text";
import Button from "@/components/actions/button/Button";
import Alert from "@/components/feedback/alert/Alert";

interface Props {
  link: string;
  onRemoveLinkCard: Dispatch<SetStateAction<string>>;
}

export default function LinkCard(props: Props) {
  const { link, onRemoveLinkCard } = props;
  const { status, data, error, isLoading, isFetching } = useGetLinkMeta(link);

  if (isLoading || isFetching) {
    return (
      <article className="relative border rounded-2xl animate-pulse">
        <div className="relative w-full h-44 rounded-t-2xl bg-gray-200" />
        <div className="flex flex-col grow p-3 gap-3">
          <div className="w-2/5 h-5 bg-gray-200" />
          <div className="w-full h-5 bg-gray-200" />
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <Alert variant="error" message="Could not get info about this link" />
    );
  }

  return (
    <article className="relative border rounded-2xl bg-white">
      <Button
        className="absolute z-50 top-0 m-2 p-2 bg-black/50 text-white rounded-full hover:bg-neutral-700"
        icon="ph:x-bold"
        onClick={(e) => {
          e.preventDefault();
          onRemoveLinkCard(link);
        }}
      />
      {data?.image && (
        <div className="relative w-full h-44">
          <Image
            src={data.image}
            alt="Link image"
            fill
            className="rounded-t-2xl object-cover"
          />
        </div>
      )}
      <div className="flex flex-col p-3">
        <span className="break-all text-sm text-gray-500">
          {getHostname(link)}
        </span>
        {data?.title && (
          <span className="[overflow-wrap:anywhere] font-medium">
            {data.title}
          </span>
        )}
      </div>
    </article>
  );
}
