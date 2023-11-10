import SuggestionsList from "@/components/contentDisplay/suggestionsList/SuggestionsList";

export default function Page() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2">Search</h2>
      </section>
      <section>
        <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2">
          Suggested Follows
        </h2>
        <SuggestionsList />
      </section>
    </section>
  );
}
