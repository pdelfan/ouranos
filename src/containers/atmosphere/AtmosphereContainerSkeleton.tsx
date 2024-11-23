function Skeleton() {
  return (
    <div className="flex w-full h-12 items-start gap-3 bg-skin-muted rounded-lg animate-pulse" />
  );
}

export default function AtmosphereContainerSkeleton() {
  return (
    <section className="flex flex-col gap-2 border-b md:border-x md:rounded-b-2xl border-skin-base p-3">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </section>
  );
}
