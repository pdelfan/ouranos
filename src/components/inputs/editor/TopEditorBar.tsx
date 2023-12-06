import Button from "@/components/actions/button/Button";

interface Props {
  onCancel: () => void;
}

export default function TopEditorBar(props: Props) {
  const { onCancel } = props;
  return (
    <div className="flex justify-between items-center">
      <Button
        onClick={onCancel}
        className="px-3 py-2 font-semibold border rounded-full hover:bg-neutral-50"
      >
        Cancel
      </Button>

      <Button className="bg-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-primary-dark">
        Post
      </Button>
    </div>
  );
}
