import { getHostname } from "@/lib/utils/text";
import { AppBskyEmbedExternal } from "@atproto/api";
import Image from "next/image";
import Link from "next/link";

interface Props {
  embed: AppBskyEmbedExternal.View;
}
export default function ExternalEmbed(props: Props) {
  const { embed } = props;

  return (
    <article className="border rounded-2xl bg-white">
      <Link href={embed.external.uri} target="blank">
        {embed.external.thumb && (
          <div className="relative w-full h-44">
            <Image
              src={embed.external.thumb}
              alt={embed.external.description}
              fill
              className="rounded-t-xl object-cover"
            />
          </div>
        )}
        <div className="flex flex-col p-3">
          <span className="break-all text-sm text-gray-500">
            {getHostname(embed.external.uri)}
          </span>
          <span className="break-all font-medium">
            {embed.external.title}
          </span>
        </div>
      </Link>
    </article>
  );
}
