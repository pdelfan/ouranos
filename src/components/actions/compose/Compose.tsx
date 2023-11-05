import { Icon } from "@iconify/react/dist/iconify.js";

export default function Compose() {
  return (
    <button className="flex items-center gap-2 bg-primary px-3 py-2 rounded-full text-white font-semibold hover:brightness-95">
      <Icon icon="mdi:feather" className="text-2xl" />
      <span>Write a post</span>
    </button>
  );
}
