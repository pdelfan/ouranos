import useDraggableScroll from "@/lib/hooks/useDraggableScroll";

interface Props {
  children: React.ReactNode;
}

export default function Tabs(props: Props) {
  const { children } = props;
  const {
    draggableContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
  } = useDraggableScroll();

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"      
      ref={draggableContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      className="flex flex-nowrap gap-3 px-4 overflow-auto no-scrollbar"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {children}
    </div>
  );
}
