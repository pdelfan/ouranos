import NotificationSkeleton from "@/components/contentDisplay/notification/NotificationSkeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
          Notifications
        </h2>
        <NotificationSkeleton />
      </section>
    </section>
  );
}
