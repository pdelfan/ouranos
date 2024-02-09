import Image from "next/image";
import useGetLinkMeta from "@/lib/hooks/useGetLinkMeta";
import { Dispatch, SetStateAction, useEffect } from "react";
import { getHostname } from "@/lib/utils/text";
import Button from "@/components/actions/button/Button";
import Alert from "@/components/feedback/alert/Alert";
import { CgClose } from "react-icons/cg";

interface Props {
  link: string;
  onRemoveLinkCard: Dispatch<SetStateAction<string>>;
  onAddLinkCard: Dispatch<SetStateAction<LinkMeta | null>>;
}

export default function LinkCard(props: Props) {
  const { link, onRemoveLinkCard, onAddLinkCard } = props;
  const { status, data, error, isLoading, isFetching } = useGetLinkMeta(link);

  useEffect(() => {
    if (data) {
      onAddLinkCard(data);
    }
  }, [data, onAddLinkCard]);

  if (isLoading || isFetching) {
    return (
      <article className="relative animate-pulse rounded-2xl border">
        <div className="relative h-44 w-full rounded-t-2xl bg-neutral-200" />
        <div className="flex grow flex-col gap-3 p-3">
          <div className="h-5 w-2/5 bg-neutral-200" />
          <div className="h-5 w-full bg-neutral-200" />
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
    <article className="relative rounded-2xl border bg-white">
      <Button
        className="absolute right-0 top-0 z-50 m-2 rounded-full bg-black/50 p-1 text-white hover:bg-neutral-700"
        onClick={(e) => {
          e.preventDefault();
          onRemoveLinkCard(link);
        }}
      >
        <CgClose className="text-xl" />
      </Button>
      {data?.image && (
        <div className="relative h-44 w-full">
          <Image
            src={data.image}
            alt="Link image"
            fill
            className="rounded-t-2xl object-cover"
          />
        </div>
      )}
      <div className="flex flex-col p-3">
        <span className="break-all text-sm text-neutral-500">
          {getHostname(link)}
        </span>
        {data?.title && (
          <span className="font-medium [overflow-wrap:anywhere]">
            {data.title}
          </span>
        )}
      </div>
    </article>
  );
}
