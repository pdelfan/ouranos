import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-1 justify-center mt-3 animate-spin">
      <AiOutlineLoading3Quarters className="text-xl" />
    </div>
  );
}
