import { Icon } from "@iconify/react/dist/iconify.js";

export default function Compose() {
  return (
    <button className="p-3 flex items-center gap-2 bg-primary lg:px-3 lg:py-2 rounded-full text-white font-semibold hover:brightness-95">
      <Icon icon="mdi:feather" className="text-2xl" />
      <span className="hidden lg:inline">Write a post</span>
    </button>
  );
}
