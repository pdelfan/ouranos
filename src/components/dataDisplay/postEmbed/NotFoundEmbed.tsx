import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  depth: number;
}

export default function NotFoundEmbed(props: Props) {
  const { depth } = props;

  return (
    <>
      {depth < 1 && (
        <div className="p-3 mt-2 border rounded-xl bg-white">
          <div className="flex gap-2">
            <Icon icon="ep:warning-filled" className="text-2xl" />
            <span>Post cannot be found</span>
          </div>
        </div>
      )}
    </>
  );
}
