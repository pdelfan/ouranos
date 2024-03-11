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
        <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
          Search
        </h2>
        <Search placeholder="Search for users or posts" autoFocus={true} />
        {query && <SearchList query={query} />}
      </section>
      {!query && (
        <section>
          <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
            Suggestions
          </h2>
          <SuggestionsList />
        </section>
      )}
    </section>
  );
}
