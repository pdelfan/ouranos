"use client";

import useGetLinkMeta from "@/lib/hooks/useGetLinkMeta";
import Image from "next/image";
import { SiGooglemessages } from "react-icons/si";
import TopicHeaderSkeleton from "./TopicHeaderSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { useState } from "react";

interface Props {
  url: string;
}

export default function TopicHeader(props: Props) {
  const { url } = props;
  const { status, data, error, isLoading, isFetching } = useGetLinkMeta(url);
  const [hideImage, setHideImage] = useState(false);

  if (isLoading && !data) return <TopicHeaderSkeleton />;

  return (
    <article className="border-skin-base flex flex-col gap-2 border border-x-0 border-t-0 p-3 md:border md:rounded-t-2xl">
      {error && (
        <FeedAlert
          variant="badResponse"
          message="Something went wrong"
          standalone
        />
      )}

      {data?.image && !hideImage && (
        <Image
          src={data.image}
          alt={`Image from ${url}`}
          width={900}
          height={500}
          className="rounded-lg"
          onError={() => setHideImage(true)}
        />
      )}

      {data && (
        <>
          <div className="flex flex-wrap items-center gap-2 text-skin-secondary mt-2">
            <SiGooglemessages className="text-2xl" />
            <span className="font-medium text-lg">Topic</span>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {data?.title && (
              <h3 className="text-skin-base break-words text-xl font-medium">
                {data.title}
              </h3>
            )}
            {data?.description && (
              <p className="text-skin-secondary">{data.description}</p>
            )}
          </div>
        </>
      )}
    </article>
  );
}
