import { useCallback, useEffect, useState } from "react";

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

  useEffect(() => {
    const debouncedControlNavbar = debounce(
      () => controlNavbar(),
      DEBOUNCE_DELAY
    );

    window.addEventListener("scroll", debouncedControlNavbar);

    return () => {
      window.removeEventListener("scroll", debouncedControlNavbar);
    };
  }, [controlNavbar]);

  return show;
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: void, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
