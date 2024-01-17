import { VirtualItem } from "@tanstack/react-virtual";
import { useEffect } from "react";

interface Props {
  items: unknown[];
  fetchNextPage: () => void;
  getVirtualItems: () => VirtualItem[];
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export default function useInfiniteList(props: Props) {
  const {
    items,
    fetchNextPage,
    getVirtualItems,
    hasNextPage,
    isFetchingNextPage,
  } = props;

  useEffect(() => {
    if (!items) return;

    const [lastItem] = [...getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= items.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, items, isFetchingNextPage, getVirtualItems]);
}
