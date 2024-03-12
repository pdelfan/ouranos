interface Props {
  rounded?: boolean;
}

export function Skeleton(props: Props) {
  const { rounded = true } = props;
  return (
    <article
      className={`border-skin-base animate-pulse border border-x-0 p-3 md:border-x ${
        rounded && "md:first:rounded-t-2xl"
      } last:border-b md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0`}
    >
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Avatar */}
          <div className="bg-skin-muted h-10 w-10 rounded-full" />
          <div className="flex flex-col">
            {/* Skeleton for Display Name & Handle */}
            <div className="bg-skin-muted h-4 w-32 rounded" />
            <div className="bg-skin-muted mt-2 h-4 w-24 rounded" />
          </div>
        </div>
      </div>
      <div className="bg-skin-muted mt-3 h-4 w-5/6 rounded" />
      <div className="bg-skin-muted mt-2 h-4 w-full rounded" />
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
