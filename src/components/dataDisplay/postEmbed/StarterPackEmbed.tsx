import { getStarterPackHref, getStarterPackImage } from "@/lib/utils/link";
import { AppBskyGraphDefs, AppBskyGraphStarterpack } from "@atproto/api";
import Image from "next/image";
import Link from "next/link";

interface Props {
  embed: AppBskyGraphDefs.StarterPackViewBasic;
  depth: number;
}

export default function StarterPackEmbed(props: Props) {
  const { embed, depth } = props;
  const starterPackHref = getStarterPackHref(embed);
  const imageUri = getStarterPackImage(embed);

  if (!AppBskyGraphStarterpack.isRecord(embed.record)) {
    return null;
  }

  return (
    <>
      {depth < 2 && (
        <article className="border border-skin-base mt-2 rounded-lg group">
          <div className="bg-skin-base hover:bg-skin-secondary rounded-lg">
            <Link
              href={starterPackHref}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              {imageUri && (
                <Image
                  src={imageUri}
                  alt="Starter pack image"
                  width={900}
                  height={500}
                  priority
                  className="border-b-skin-base rounded-t-lg border-b aspect-auto max-h-96 object-cover group-hover:brightness-95"
                />
              )}
              <div className="flex flex-col gap-2 p-3">
                <div className="flex flex-wrap gap-2">
                  <Image
                    src={"/starterPack.svg"}
                    alt="Starter pack icon"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <span className="text-skin-base font-medium [overflow-wrap:anywhere]">
                      {embed.record.name}
                    </span>
                    <span className="text-skin-tertiary font-medium break-all text-sm">
                      Starter pack by {embed.creator.handle}
                    </span>
                  </div>
                </div>
                {embed.record.description && (
                  <span className="text-skin-secondary text-sm line-clamp-2">
                    {embed.record.description}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </article>
      )}
    </>
  );
}
