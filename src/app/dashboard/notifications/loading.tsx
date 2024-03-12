import NotificationSkeleton from "@/components/contentDisplay/notification/NotificationSkeleton";
import { TabsSkeleton } from "@/components/contentDisplay/profileHeader/ProfileHeaderSkeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
          Notifications
        </h2>
        <TabsSkeleton />
        <NotificationSkeleton />
      </section>
    </section>
  );
}
