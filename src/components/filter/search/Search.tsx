"use client";

import { BiSearch } from "react-icons/bi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
  autoFocus?: boolean;
  enableKeypress?: boolean; // search by pressing Enter
}
export default function Search(props: Props) {
  const { placeholder, enableKeypress, autoFocus = false } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div className="relative mx-3 flex-shrink-0 grow md:mx-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {enableKeypress ? (
        <input
          className="peer block w-full rounded-full border border-neutral-200 bg-neutral-100 py-[9px] pl-10 text-sm outline-2 placeholder:text-neutral-500"
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e.currentTarget.value);
            }
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      ) : (
        <input
          className="peer block w-full rounded-full border border-neutral-200 bg-neutral-100 py-[9px] pl-10 text-sm outline-2 placeholder:text-neutral-500"
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      )}
      <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-neutral-500 peer-focus:text-neutral-900" />
    </div>
  );
}
