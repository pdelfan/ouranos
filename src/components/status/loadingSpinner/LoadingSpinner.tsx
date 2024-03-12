import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSpinner() {
  return (
    <div className="mt-3 flex flex-1 justify-center">
      <div className="animate-spin">
        <AiOutlineLoading3Quarters className="text-skin-icon-base text-xl" />
      </div>
    </div>
  );
}
