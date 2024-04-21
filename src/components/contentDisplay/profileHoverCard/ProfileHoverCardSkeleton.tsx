export default function ProfileHoverCardSkeleton() {
  return (
    <article className="animate-pulse min-w-64">
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Avatar */}
          <div className="bg-skin-muted h-12 w-12 rounded-full" />
          <div className="flex flex-col">
            {/* Skeleton for Display Name & Handle */}
            <div className="bg-skin-muted h-4 w-32 rounded" />
            <div className="bg-skin-muted mt-2 h-4 w-24 rounded" />
          </div>
        </div>
      </div>
      {/* Follow count */}
      <div className="bg-skin-muted mb-5 mt-3 h-4 w-full rounded" />

      {/* Description */}
      <div className="bg-skin-muted h-4 w-4/6 rounded" />
      <div className="bg-skin-muted mt-2 h-4 w-5/6 rounded" />
      <div className="bg-skin-muted mt-2 h-4 w-full rounded" />
    </article>
  );
}
