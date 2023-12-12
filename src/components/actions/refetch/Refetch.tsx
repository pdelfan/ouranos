import useHideOnScroll from "@/lib/hooks/useHideOnScroll";
import Button from "../button/Button";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  onRefetch: () => void;
}

export default function Refetch(props: Props) {
  const { onRefetch } = props;
  const show = useHideOnScroll({ showOnTop: false });
  const debouncedRefetch = useDebouncedCallback(onRefetch, 300);

  return (
    <Button
      onClick={debouncedRefetch}
      icon="tabler:refresh"
      iconSize="text-2xl"
      iconColor="text-neutral-500 hover:text-neutral-600"
      className={`z-50 p-3 rounded-full fixed bottom-20 md:bottom-5 ml-3 border border-neutral-300 bg-white hover:bg-neutral-50 hover:-rotate-180 ${
        show ? "translate-y-0" : "translate-y-36"
      } transition-translate ease-in-out duration-300`}
    />
  );
}
