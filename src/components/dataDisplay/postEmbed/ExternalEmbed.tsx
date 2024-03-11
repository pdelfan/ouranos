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
        <article className="bg-skin-base border-skin-base mt-2 rounded-2xl border hover:brightness-95">
          <Link
            href={embed.external.uri}
            target="blank"
            onClick={(e) => e.stopPropagation()}
          >
            {embed.external.thumb && (
              <div className="relative h-44 w-full">
                <Image
                  src={embed.external.thumb}
                  alt={embed.external.description}
                  fill
                  className="border-b-skin-base rounded-t-2xl border-b object-cover"
                />
              </div>
            )}
            <div className="flex flex-col p-3">
              <span className="text-skin-tertiary break-all text-sm">
                {getHostname(embed.external.uri)}
              </span>
              <span className="font-medium [overflow-wrap:anywhere]">
                {embed.external.title}
              </span>
            </div>
          </Link>
        </article>
      )}
    </>
  );
}
