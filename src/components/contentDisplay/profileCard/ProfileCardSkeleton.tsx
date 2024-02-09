interface Props {
  rounded?: boolean;
}

export function Skeleton(props: Props) {
  const { rounded = true } = props;
  return (
    <article
      className={`animate-pulse border border-x-0 p-3 md:border-x ${
        rounded && "md:first:rounded-t-2xl"
      } last:border-b md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0`}
    >
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-neutral-300" />
          <div className="flex flex-col">
            {/* Skeleton for Display Name & Handle */}
            <div className="h-4 w-32 rounded bg-neutral-200" />
            <div className="mt-2 h-4 w-24 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
      <div className="mt-3 h-4 w-5/6 rounded bg-neutral-200" />
      <div className="mt-2 h-4 w-full rounded bg-neutral-200" />
    </article>
  );
}

export default function ProfileCardSkeleton(props: Props) {
  const { rounded = true } = props;
  return (
    <section className="flex flex-col">
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
    </section>
  );
}
