import React, { useState, useRef, useEffect, useCallback } from "react";

export default function useDraggableScroll() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft ?? 0));
    setScrollLeft(containerRef.current?.scrollLeft ?? 0);
  }, []);

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!isDragging) return;
      const x = e.pageX - (containerRef.current?.offsetLeft ?? 0);
      const walk = (x - startX) * 1; // scroll-fastness
      containerRef.current!.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  return {
    draggableContainerRef: containerRef,
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
  };
}
