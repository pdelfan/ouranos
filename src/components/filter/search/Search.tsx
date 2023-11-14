"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
  enableKeypress?: boolean; // search by pressing Enter
}
export default function Search(props: Props) {
  const { placeholder, enableKeypress } = props;
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
    <div className="relative grow flex-shrink-0 mx-3 sm:mx-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {enableKeypress ? (
        <input
          className="peer block w-full rounded-full bg-neutral-100 border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e.currentTarget.value);
            }
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      ) : (
        <input
          className="peer block w-full rounded-full bg-neutral-100 border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      )}
      <Icon
        icon={"bx:search"}
        className="absolute left-3 top-1/2 text-lg -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
      />
    </div>
  );
}
