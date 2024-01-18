import { VirtualItem, useWindowVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface Props<T> {
  items: T[];
  options: {
    size: number;
    overscan: number;
    hasNextPage: boolean;
  };
}

export default function useVirtualList<T>(props: Props<T>) {
  const { items, options } = props;
  const { size = 50, overscan = 10, hasNextPage = false } = options;

  const viewportRef = useRef<HTMLElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? items.length + 1 : items.length,
    estimateSize: () => size,
    overscan,
  });

  const virtualMap = (
    fn: (virtualItem: VirtualItem, item: T) => JSX.Element
  ) => {
    return virtualizer.getVirtualItems().map((virtualItem) => {
      const item = items[virtualItem.index];
      return fn(virtualItem, item);
    });
  };

  return {
    viewportRef,
    getTotalSize: virtualizer.getTotalSize,
    getVirtualItems: virtualizer.getVirtualItems,
    virtualMap,
    virtualizer,
  };
}
