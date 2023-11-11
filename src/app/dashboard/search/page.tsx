import SearchList from "@/components/contentDisplay/searchList/SearchList";
import SuggestionsList from "@/components/contentDisplay/suggestionsList/SuggestionsList";
import Search from "@/components/filter/search/Search";

interface Props {
  searchParams: {
    query?: string;
  };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const query = searchParams?.query || "";

  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2">Search</h2>
        <Search placeholder="Search for users or posts" />
        {query && <SearchList query={query} />}
      </section>
      {!query && (
        <section>
          <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2">
            Suggested Follows
          </h2>
          <SuggestionsList />
        </section>
      )}
    </section>
  );
}
