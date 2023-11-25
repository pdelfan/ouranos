import { getHostname } from "@/lib/utils/text";
import { AppBskyEmbedExternal } from "@atproto/api";
import Image from "next/image";
import Link from "next/link";

interface Props {
  embed: AppBskyEmbedExternal.View;
  depth: number;
}
export default function ExternalEmbed(props: Props) {
  const { embed, depth } = props;

  return (
    <>
      {depth < 2 && (
        <article className="border rounded-2xl bg-white hover:brightness-95">
          <Link
            href={embed.external.uri}
            target="blank"
            onClick={(e) => e.stopPropagation()}
          >
            {embed.external.thumb && (
              <div className="relative w-full h-44">
                <Image
                  src={embed.external.thumb}
                  alt={embed.external.description}
                  fill
                  className="rounded-t-2xl object-cover"
                />
              </div>
            )}
            <div className="flex flex-col p-3">
              <span className="break-all text-sm text-gray-500">
                {getHostname(embed.external.uri)}
              </span>
              <span className="[overflow-wrap:anywhere] font-medium">
                {embed.external.title}
              </span>
            </div>
          </Link>
        </article>
      )}
    </>
  );
}
