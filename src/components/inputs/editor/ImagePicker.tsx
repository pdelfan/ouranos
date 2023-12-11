import Button from "@/components/actions/button/Button";

interface Props {
  onShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImagePicker(props: Props) {
  const { onShow } = props;

  return (
    <div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onShow((prev) => !prev);
        }}
        icon="bx:image"
        iconColor="text-primary hover:text-primary-dark"
        iconSize="text-2xl"
        className="p-0"
      />
    </div>
  );
}
