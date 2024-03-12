import ListsSkeleton from "@/components/contentDisplay/lists/ListsSkeleton";

export default function Loading() {
  return (
    <section>
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        My Lists
      </h2>
      <ListsSkeleton />
    </section>
  );
}
