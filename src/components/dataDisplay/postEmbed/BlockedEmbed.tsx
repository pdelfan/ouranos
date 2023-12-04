import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  depth: number;
}

export default function BlockedEmbed(props: Props) {
  const { depth } = props;

  return (
    <>
      {depth < 1 && (
        <div className="p-3 mt-2 border rounded-xl bg-white">
          <div className="flex gap-2">
            <Icon icon="fluent:shield-error-24-filled" className="text-2xl" />
            <span>
              Post is from a blocked user or someone who has blocked you.
            </span>
          </div>
        </div>
      )}
    </>
  );
}
