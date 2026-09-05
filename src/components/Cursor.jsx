import React, { useState, useEffect, useRef } from "react";
import { ACCENT } from "../theme";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    const over = (e) => {
      const t = e.target;
      setHovering(!!t.closest?.("a,button,[data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    let raf;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100]"
        style={{ width: 6, height: 6, background: ACCENT }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] border transition-[width,height] duration-200"
        style={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          borderColor: ACCENT,
          borderWidth: 1,
          opacity: 0.7,
        }}
      />
    </>
  );
}
