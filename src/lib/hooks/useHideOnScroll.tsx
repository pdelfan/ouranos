import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const DEBOUNCE_DELAY = 15;

export default function useHideOnScroll() {
  const [show, setShow] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY === 0) {
      setShow(true); // explicitly set show to true when at the top of the page (fix for Safari)
    } else if (scrollY > prevScrollY && show) {
      setShow(false);
    } else if (scrollY <= prevScrollY && !show) {
      setShow(true);
    }

    setPrevScrollY(scrollY);
  }, [prevScrollY, show]);

  const debouncedControlNavbar = useDebouncedCallback(
    controlNavbar,
    DEBOUNCE_DELAY
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedControlNavbar);

    return () => {
      window.removeEventListener("scroll", debouncedControlNavbar);
    };
  }, [debouncedControlNavbar]);

  return show;
}
