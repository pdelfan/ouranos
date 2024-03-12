import NotificationsContainer from "@/containers/notifications/NotificationsContainer";

export default function Page() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
          Notifications
        </h2>
        <NotificationsContainer />
      </section>
    </section>
  );
}
