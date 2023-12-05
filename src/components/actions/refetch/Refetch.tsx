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
      iconSize="text-[1.5rem]"
      iconColor="text-neutral-500"
      className={`z-50 p-3 rounded-full aspect-square fixed bottom-20 md:bottom-5 ml-3 border-2 bg-white border-neutral-200 ${
        show ? "translate-y-0" : "translate-y-36"
      } transition-translate ease-in-out duration-300`}
    />
  );
}
