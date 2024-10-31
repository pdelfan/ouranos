"use client";

import useGetLinkMeta from "@/lib/hooks/useGetLinkMeta";
import Image from "next/image";
import { SiGooglemessages } from "react-icons/si";
import TopicHeaderSkeleton from "./TopicHeaderSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { useState } from "react";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { getHostname } from "@/lib/utils/text";

interface Props {
  url: string;
}

export default function TopicHeader(props: Props) {
  const { url } = props;
  const { status, data, error, isLoading, isFetching } = useGetLinkMeta(url);
  const [hideImage, setHideImage] = useState(false);

  if (isLoading && !data) return <TopicHeaderSkeleton />;

  return (
    <article className="border-skin-base md:border-x">
      {error && (
        <div className="p-3">
          <FeedAlert
            variant="badResponse"
            message="Could not load this topic"
            standalone
          />
        </div>
      )}

      {data?.image && !hideImage && (
        <Image
          src={data.image}
          alt={`Image from ${url}`}
          width={900}
          height={500}
          onError={() => setHideImage(true)}
          className="max-h-96 object-cover"
        />
      )}

      {data && (
        <div className="p-3">
          <div className="flex flex-col gap-1">
            <Link
              href={url}
              target="_blank"
              className="flex flex-wrap items-center gap-2 mt-2 font-medium text-skin-tertiary hover:text-skin-base"
            >
              <BiLinkExternal />
              {getHostname(url)}
            </Link>
            {data?.title && (
              <h1 className="text-skin-base break-words text-xl font-medium">
                {data.title}
              </h1>
            )}
            {data?.description && (
              <p className="text-skin-secondary">{data.description}</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
