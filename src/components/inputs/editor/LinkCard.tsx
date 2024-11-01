import Image from "next/image";
import useGetLinkMeta from "@/lib/hooks/useGetLinkMeta";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
  const [showImage, setShowIamge] = useState(true);

  const onErrorImage = useCallback(() => setShowIamge(false), []);

  useEffect(() => {
    if (data) {
      onAddLinkCard(data);
    }
  }, [data, onAddLinkCard]);

  if (isLoading || isFetching) {
    return (
      <article className="border-skin-base relative animate-pulse rounded-2xl border">
        <div className="bg-skin-muted relative h-44 w-full rounded-t-2xl" />
        <div className="flex grow flex-col gap-1 p-3">
          <div className="bg-skin-muted h-3 w-2/5" />
          <div className="bg-skin-muted h-4 w-1/2" />
          <div className="bg-skin-muted h-3 w-3/4" />
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <div className="bg-skin-base border-skin-base flex flex-wrap items-center justify-between w-full gap-3 rounded-2xl border p-3">
        <div className="flex flex-col gap-3">
          <span className="text-skin-base w-fit shrink-0">
            Could not get info about this link
          </span>
          <span className="text-skin-link-base line-clamp-1 shrink overflow-ellipsis break-all text-sm">
            {link}
          </span>
        </div>
        <Button
          className="text-skin-secondary bg-skin-secondary hover:bg-skin-base hover:text-skin-base rounded-full p-2 border border-skin-base"
          onClick={(e) => {
            e.preventDefault();
            onRemoveLinkCard(link);
          }}
        >
          <CgClose className="text-xl" />
        </Button>
      </div>
    );
  }

  return (
    <article className="bg-skin-base border-skin-base relative rounded-2xl border">
      <Button
        className="text-skin-secondary bg-skin-secondary hover:bg-skin-base hover:text-skin-base absolute left-0 top-0 z-50 m-2 p-2 border border-skin-base rounded-full"
        onClick={(e) => {
          e.preventDefault();
          onRemoveLinkCard(link);
        }}
      >
        <CgClose className="text-xl" />
      </Button>
      {data?.image && showImage && (
        <div className="relative h-44 w-full">
          <Image
            src={data.image}
            alt="Link image"
            onError={onErrorImage}
            fill
            priority
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
        {data?.description && (
          <span className="text-skin-secondary text-sm line-clamp-2">
            {data.description}
          </span>
        )}
      </div>
    </article>
  );
}
