import SearchList from "@/components/contentDisplay/searchList/SearchList";
import WhoToFollowList from "@/components/contentDisplay/whoToFollowList/WhoToFollowList";
import Search from "@/components/filter/search/Search";
import { BiSolidHelpCircle } from "react-icons/bi";
import * as Popover from "@radix-ui/react-popover";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

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
        <div className="mx-3 mb-2 flex items-center justify-between md:mx-0">
          <h2 className="text-skin-base text-2xl font-semibold">Search</h2>
          <Popover.Root>
            <Popover.Trigger asChild>
              <BiSolidHelpCircle className="text-skin-icon-muted hover:text-skin-icon-base hover:cursor-pointer text-2xl" />
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="animate-fade animate-duration-200 outline-none border-skin-base bg-skin-base text-skin-base z-50 m-2 max-h-full min-w-fit overflow-y-auto rounded-xl border p-2 shadow-lg">
                <span className="text-skin-base font-semibold">
                  Advanced Search
                </span>
                <p className="max-w-48 text-sm">
                  You can finetune with these options
                </p>
                <div className="flex flex-col gap-3 mt-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <BsFillPeopleFill />
                      <span className="text-skin-base font-medium mb-1">
                        By user
                      </span>
                    </div>
                    <ul className="text-skin-secondary text-sm">
                      <li>
                        <code>to:handle</code>
                      </li>
                      <li>
                        <code>mentions:handle</code>
                      </li>
                      <li>
                        <code>from:handle</code>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span className="text-skin-base font-medium mb-1">
                        By date
                      </span>
                    </div>
                    <ul className="text-skin-secondary text-sm">
                      <li>
                        <code>since:YYYY-MM-DD</code>
                      </li>
                      <li>
                        <code>until:YYYY-MM-DD</code>
                      </li>
                    </ul>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div className="mx-3 md:mx-0">
          <Search placeholder="Search for users or posts" autoFocus={true} />
        </div>
        {query && <SearchList query={query} />}
      </section>
      {!query && (
        <section>
          <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
            Who to follow
          </h2>
          <WhoToFollowList />
        </section>
      )}
    </section>
  );
}
