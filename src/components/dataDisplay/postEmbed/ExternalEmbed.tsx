import { getHostname } from "@/lib/utils/text";
import { AppBskyEmbedExternal } from "@atproto/api";
import { SiGooglemessages } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { detectExternalEmbedType } from "@/lib/utils/embed";
import { ExternalEmbedType } from "@/lib/utils/embed";
import GifEmbed from "./GifEmbed";

interface Props {
  embed: AppBskyEmbedExternal.View;
  depth: number;
}
export default function ExternalEmbed(props: Props) {
  const { embed, depth } = props;
  const embedContent = detectExternalEmbedType(embed.external);

  if (depth > 1) return null;

  if (embedContent.type === ExternalEmbedType.GIF) {
    return (
      <article className="mt-2">
        <GifEmbed embed={embedContent} />
      </article>
    );
  }

  return (
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
              className="border-b-skin-base rounded-t-lg border-b aspect-video max-h-96 object-cover group-hover:brightness-95"
            />
          )}
          <div className="flex flex-col p-3">
            <span className="text-skin-tertiary break-all text-sm">
              {getHostname(embed.external.uri)}
            </span>
            <div className="mt-1">
              <span className="text-skin-base font-medium [overflow-wrap:anywhere]">
                {embed.external.title}
              </span>
              {embed.external.description && (
                <span className="text-skin-secondary text-sm line-clamp-2 [overflow-wrap:anywhere]">
                  {embed.external.description}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
      <div className="bg-skin-base border-t border-skin-base rounded-b-lg hover:bg-skin-secondary">
        <Link
          href={`/dashboard/topics/${encodeURIComponent(embed.external.uri)}`}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-wrap items-center gap-2 text-skin-tertiary px-3 py-2"
        >
          <SiGooglemessages className="text-lg" />
          <span className="font-medium text-sm">View topic</span>
        </Link>
      </div>
    </article>
  );
}
