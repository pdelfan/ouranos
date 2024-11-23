import Alert from "@/components/feedback/alert/Alert";
import { BlueLinkatBoard } from "../../../types/atmosphere/index";
import { Record } from "@atproto/api/dist/client/types/com/atproto/repo/listRecords";
import Link from "next/link";
import { BiLink } from "react-icons/bi";

interface Props {
  records: Record[];
}

export default function LinkatContainer(props: Props) {
  const { records } = props;

  if (!records.every((item) => BlueLinkatBoard.isRecord(item?.value))) {
    return <Alert variant="error" message="Invalid records" />;
  }

  return (
    <section className="flex flex-wrap flex-col gap-2 bg-skin-base p-3 border-skin-base border-b md:border-x md:rounded-b-2xl">
      <>
        {records.map((item) => (
          <>
            {BlueLinkatBoard.isRecord(item.value) &&
              item.value.cards.map((card, i) => (
                <article
                  key={i}
                  className="bg-skin-tertiary text-skin-base rounded-lg"
                >
                  {card.url ? (
                    <Link
                      href={card.url}
                      target="_blank"
                      className="flex flex-wrap items-center gap-1 p-3 hover:bg-skin-muted rounded-lg"
                    >
                      <BiLink className="text-xl" />
                      {card.emoji && <span>{card.emoji}</span>}
                      {card.text && <span>{card.text}</span>}
                    </Link>
                  ) : (
                    <div className="p-3 rounded-lg">
                      {card.emoji && <span>{card.emoji}</span>}
                      {card.text && <span>{card.text}</span>}
                    </div>
                  )}
                </article>
              ))}
          </>
        ))}
      </>
    </section>
  );
}
