import SuggestionsList from "@/components/contentDisplay/suggestionsList/SuggestionsList";
import SuggestionsListSkeleton from "@/components/contentDisplay/suggestionsList/SuggestionsListSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <section>
      <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2">
        Suggested Follows
      </h2>
      <Suspense fallback={<SuggestionsListSkeleton />}>
        <SuggestionsList />
      </Suspense>
    </section>
  );
}
