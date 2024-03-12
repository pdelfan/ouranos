interface Props {
  rounded?: boolean;
}

function Skeleton(props: Props) {
  const { rounded = true } = props;
  return (
    <article
      className={`border-skin-base flex flex-col gap-2 border border-x-0 p-3 last:border-b md:border-x ${
        rounded ? "first:border-t md:first:rounded-t-2xl" : "first:border-t-0"
      } md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="bg-skin-muted h-10 w-10 rounded-lg" />
        <div className="flex flex-col gap-3">
          <div className="bg-skin-muted h-3 w-20 rounded-full" />
          <div className="bg-skin-muted h-3 w-32 rounded-full" />
        </div>
      </div>
      <div className="bg-skin-muted mt-2 h-2 w-4/5 rounded-full" />
      <div className="bg-skin-muted h-2 w-3/4 rounded-full" />
      <div className="bg-skin-muted h-2 w-5/6 rounded-full" />
    </article>
  );
}

export default function ListsSkeleton(props: Props) {
  const { rounded = true } = props;

  return (
    <section className="flex flex-col">
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
      <Skeleton rounded={rounded} />
    </section>
  );
}
