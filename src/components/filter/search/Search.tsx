"use client";

import { BiSearch } from "react-icons/bi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Button from "@/components/actions/button/Button";
import { CgClose } from "react-icons/cg";
import { useState } from "react";

interface Props {
  placeholder: string;
  autoFocus?: boolean;
}

export default function Search(props: Props) {
  const { placeholder, autoFocus = false } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("query") ?? "");

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
    <div className="relative flex-shrink-0 grow md:mx-0">
      <BiSearch className="text-skin-icon-muted peer-focus:text-icon-base absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="border-skin-base outline-offset-0 outline-2 outline-transparent focus:outline-skin-base focus:outline active:outline-2 hover:outline-skin-base/50 hover:outline  focus:bg-skin-tertiary text-skin-base placeholder:text-skin-secondary bg-skin-secondary peer block w-full rounded-xl border py-2.5 pl-10 text-sm hover:bg-skin-tertiary/80"
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
          handleSearch(e.target.value);
        }}
        value={search}
        defaultValue={searchParams.get("query")?.toString()}
      />

      {search.length > 0 && (
        <Button
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => {
            replace(`${pathname}`, { scroll: false });
            setSearch("");
          }}
        >
          <CgClose className="text-skin-icon-muted peer-focus:text-icon-base text-lg" />
        </Button>
      )}
    </div>
  );
}
