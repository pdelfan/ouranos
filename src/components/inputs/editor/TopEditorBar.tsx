import Button from "@/components/actions/button/Button";

interface Props {
  onCancel: () => void;
  label: string;
}

export default function TopEditorBar(props: Props) {
  const { onCancel, label } = props;
  return (
    <div className="flex flex-wrap justify-between items-center">
      <Button
        onClick={onCancel}
        className="px-3 py-2 font-semibold border rounded-full hover:bg-neutral-50"
      >
        Cancel
      </Button>

      {label !== "" && (
        <div>
          <span className="font-medium text-orange-600">Label: </span>
          <span className="font-medium text-neutral-600">{label}</span>
        </div>
      )}
      <Button className="bg-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-primary-dark">
        Post
      </Button>
    </div>
  );
}
