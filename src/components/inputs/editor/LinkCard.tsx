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
      <article className="border-skin-base relative animate-pulse rounded-2xl border">
        <div className="bg-skin-muted relative h-44 w-full rounded-t-2xl" />
        <div className="flex grow flex-col gap-3 p-3">
          <div className="bg-skin-muted h-5 w-2/5" />
          <div className="bg-skin-muted h-5 w-full" />
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
    <article className="bg-skin-base border-skin-base relative rounded-2xl border">
      <Button
        className="text-skin-inverted bg-skin-overlay hover:bg-skin-inverted absolute right-0 top-0 z-50 m-2 rounded-full p-1"
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
            className="border-skin-base rounded-t-2xl border-b object-cover"
          />
        </div>
      )}
      <div className="flex flex-col p-3">
        <span className="text-skin-secondary break-all text-sm">
          {getHostname(link)}
        </span>
        {data?.title && (
          <span className="text-skin-base font-medium [overflow-wrap:anywhere]">
            {data.title}
          </span>
        )}
      </div>
    </article>
  );
}
