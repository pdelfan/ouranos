"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
}
export default function Search(props: Props) {
  const { placeholder } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0 mx-3 sm:mx-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Icon
        icon={"bx:search"}
        className="absolute left-3 top-1/2 text-lg -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
      />
    </div>
  );
}
