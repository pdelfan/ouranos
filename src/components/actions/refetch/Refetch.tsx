import useHideOnScroll from "@/lib/hooks/useHideOnScroll";
import Button from "../button/Button";

interface Props {
  onRefetch: () => void;
}

export default function Refetch(props: Props) {
  const { onRefetch } = props;
  const show = useHideOnScroll();

  return (
    <Button
      onClick={onRefetch}
      icon="tabler:refresh"
      iconSize="text-2xl"
      iconColor="text-neutral-500 hover:text-neutral-600"
      className={`z-50 p-3 rounded-full fixed bottom-20 md:bottom-5 ml-3 border bg-neutral-50 shadow-lg border-neutral-200 hover:bg-neutral-100 ${
        show ? "translate-y-0" : "translate-y-36"
      } transition-translate ease-in-out duration-300`}
    />
  );
}
