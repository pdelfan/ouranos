import { useState, useEffect, useCallback } from "react";

const useScrollTranslation = () => {
  const [val, setVal] = useState(0);
  const [prevY, setPrevY] = useState(0);

  const MAX = 100;
  const MIN = 0;
  const ACCELERATION = 0.8;

  const handleScroll = useCallback(() => {
    const currY = Math.floor(window.scrollY);
    const diff = currY - prevY;

    // map the scroll difference to the range [MIN, MAX]
    const mapped = Math.floor(((diff * ACCELERATION) / 100) * 100);
    // update the value within the range [MIN, MAX]

    setVal((prev) => {
      const nextVal = Math.floor(prev + mapped);

      if (nextVal >= MAX) {
        return MAX;
      }

      if (nextVal <= MIN || currY <= 0) {
        return MIN;
      }

      return nextVal;
    });
    setPrevY(currY);
  }, [prevY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return val;
};

export default useScrollTranslation;
