import Button from "@/components/actions/button/Button";
import { useCallback, useEffect, useState } from "react";

interface Props {
  text: string;
}

export default function AltTag(props: Props) {
  const { text } = props;
  const [showAlt, setShowAlt] = useState(false);

  const handleShowAlt = () => {
    setShowAlt(!showAlt);
  };

  const handleCloseAlt = () => {
    setShowAlt(false);
  };

  const handleKeyboard = useCallback(
    (e: Event) => {
      const { key } = e as unknown as KeyboardEvent;
      if (key === "Escape") {
        setShowAlt(false);
      }
    },
    [setShowAlt]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard]);

  return (
    <>
      <Button
        onClick={handleShowAlt}
        className="absolute bottom-1.5 left-1.5 text-xs font-semibold px-2 py-0.5 rounded-md text-white bg-black/50 hover:bg-neutral-500/90"
      >
        ALT
      </Button>
      {showAlt && (
        <section
          className="z-50 bg-black/80 fixed inset-0 w-screen h-screen flex items-center justify-center"
          onClick={handleCloseAlt}
        >
          <Button
            className="z-50 fixed right-3 top-3 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90"
            icon="ph:x-bold"
            onClick={handleCloseAlt}
          />
          <div className="z-40 max-w-2xl max-h-[calc(100%-3rem)] overflow-auto p-4  text-white rounded-xl">
            <h3 className="text-xl font-semibold">Alternative text</h3>
            <p className="mt-2">{text}</p>
          </div>
        </section>
      )}
    </>
  );
}
