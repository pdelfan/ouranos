import { getHostname } from "@/lib/utils/text";
import { AppBskyEmbedExternal } from "@atproto/api";
import { SiGooglemessages } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

interface Props {
  embed: AppBskyEmbedExternal.View;
  depth: number;
}
export default function ExternalEmbed(props: Props) {
  const { embed, depth } = props;

  return (
    <>
      {depth < 2 && (
        <article className="border border-skin-base mt-2 rounded-lg group">
          <div className="bg-skin-base hover:bg-skin-secondary rounded-t-lg">
            <Link
              href={embed.external.uri}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              {embed.external.thumb && (
                <Image
                  src={embed.external.thumb}
                  alt={embed.external.description}
                  width={900}
                  height={500}
                  priority
                  className="border-b-skin-base rounded-t-lg border-b aspect-auto max-h-96 object-cover group-hover:brightness-95"
                />
              )}
              <div className="flex flex-col p-3">
                <span className="text-skin-tertiary break-all text-sm">
                  {getHostname(embed.external.uri)}
                </span>
                <span className="text-skin-base font-medium [overflow-wrap:anywhere]">
                  {embed.external.title}
                </span>
                {embed.external.description && (
                  <span className="text-skin-secondary text-sm line-clamp-2">
                    {embed.external.description}
                  </span>
                )}
              </div>
            </Link>
          </div>
          <div className="bg-skin-base border-t border-skin-base rounded-b-lg hover:bg-skin-secondary">
            <Link
              href={`/dashboard/topics/${encodeURIComponent(
                embed.external.uri
              )}`}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-wrap items-center gap-2 text-skin-tertiary px-3 py-2 hover:text-skin-secondary"
            >
              <SiGooglemessages className="text-lg" />
              <div className="flex flex-wrap items-center">
                <span className="font-medium text-sm">View topic</span>
                <BiRightArrowAlt className="text-lg" />
              </div>
            </Link>
          </div>
        </article>
      )}
    </>
  );
}
