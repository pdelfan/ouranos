import Alert from "@/components/feedback/alert/Alert";
import { FyiUnravelFrontpagePost } from "../../../types/atmosphere/index";
import { Record } from "@atproto/api/dist/client/types/com/atproto/repo/listRecords";
import Link from "next/link";
import { getFormattedDate } from "@/lib/utils/time";
import { AtUri } from "@atproto/api";
import { getHostname } from "@/lib/utils/text";

interface Props {
  records: Record[];
  handle: string;
}

export default function FrontpageContainer(props: Props) {
  const { records, handle } = props;

  if (!records.every((item) => FyiUnravelFrontpagePost.isRecord(item?.value))) {
    return <Alert variant="error" message="Invalid records" />;
  }

  return (
    <section>
      <>
        {records.map((item) => (
          <>
            {FyiUnravelFrontpagePost.isRecord(item.value) && (
              <Link
                key={item.uri}
                href={`https://frontpage.fyi/post/${handle}/${new AtUri(item.uri).rkey}`}
                target="_blank"
                className="flex flex-col p-3 bg-skin-base border border-x-0 md:border-x first:border-t-0 md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0 border-skin-base hover:bg-skin-secondary cursor-pointer"
              >
                {item.value.url && (
                  <span className="text-skin-tertiary break-all text-sm font-medium">
                    {getHostname(item.value.url)}
                  </span>
                )}
                {item.value.title && (
                  <h3 className="text-skin-base font-medium">
                    {item.value.title}
                  </h3>
                )}
                {item.value.createdAt && (
                  <time className="text-skin-tertiary whitespace-nowrap font-medium mt-1">
                    {getFormattedDate(item.value.createdAt)}
                  </time>
                )}
              </Link>
            )}
          </>
        ))}
      </>
    </section>
  );
}
