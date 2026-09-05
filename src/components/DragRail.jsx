import React, { useRef } from "react";

export default function DragRail({ children }) {
  const railRef = useRef(null);
  const dragging = useRef(false);
  const start = useRef({ x: 0, scroll: 0 });

  const onDown = (e) => {
    dragging.current = true;
    start.current.x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    start.current.scroll = railRef.current.scrollLeft;
    railRef.current.style.cursor = "grabbing";
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    railRef.current.scrollLeft = start.current.scroll - (x - start.current.x);
  };
  const stop = () => {
    dragging.current = false;
    if (railRef.current) railRef.current.style.cursor = "grab";
  };

  return (
    <div
      ref={railRef}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={stop}
      className="flex gap-6 overflow-x-auto pb-4 select-none no-scrollbar"
      style={{ cursor: "grab", scrollbarWidth: "none" }}
    >
      {children}
    </div>
  );
}
