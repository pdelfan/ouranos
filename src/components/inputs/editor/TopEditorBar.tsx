import Button from "@/components/actions/button/Button";

interface Props {
  onCancel: () => void;
  label: string;
  onRemoveLabel: () => void;
}

export default function TopEditorBar(props: Props) {
  const { onCancel, label, onRemoveLabel } = props;
  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <Button
        onClick={onCancel}
        className="px-3 py-2 text-sm font-semibold border rounded-full hover:bg-neutral-50"
      >
        Cancel
      </Button>

      {label !== "" && (
        <Button
          onClick={onRemoveLabel}
          icon="material-symbols:no-adult-content"
          className="px-2 py-1.5 border-2 border-orange-500 rounded-full text-sm text-orange-500 font-medium hover:bg-orange-500 hover:text-white"
        >
          {label}
        </Button>
      )}
      <Button className="bg-primary text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-primary-dark">
        Post
      </Button>
    </div>
  );
}
