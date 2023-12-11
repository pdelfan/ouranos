import { Dispatch, SetStateAction } from "react";

interface Props {
  link: string;
  onRemoveLinkCard: Dispatch<SetStateAction<string>>;
}

export default function LinkCard(props: Props) {
  const { link, onRemoveLinkCard } = props;

  return (
    <article className="mt-2 border rounded-2xl bg-white hover:brightness-95">
      {/* {embed.external.thumb && (
        <div className="relative w-full h-44">
          <Image
            src={embed.external.thumb}
            alt={embed.external.description}
            fill
            className="rounded-t-2xl object-cover"
          />
        </div>
      )} */}
      {/* <div className="flex flex-col p-3">
        <span className="break-all text-sm text-gray-500">
          {getHostname(embed.external.uri)}
        </span>
        <span className="[overflow-wrap:anywhere] font-medium">
          {embed.external.title}
        </span>
      </div> */}
    </article>
  );
}
