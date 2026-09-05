import React, { useState, useEffect, useRef } from "react";
import { ACCENT, LINE } from "../theme";
import { CAROUSEL_SLIDES } from "../data";

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [fill, setFill] = useState(0);
  const paused = useRef(false);
  const DURATION = 4000;

  useEffect(() => {
    let raf;
    let start = performance.now();
    const loop = (now) => {
      if (!paused.current) {
        const elapsed = now - start;
        const pct = Math.min(100, (elapsed / DURATION) * 100);
        setFill(pct);
        if (pct >= 100) {
          setIndex((i) => (i + 1) % CAROUSEL_SLIDES.length);
          start = now;
        }
      } else {
        start = now - (fill / 100) * DURATION;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div
      className="relative rounded-[32px] overflow-hidden"
      style={{ height: 320, border: `1px solid ${LINE}` }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {CAROUSEL_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
          style={{
            opacity: i === index ? 1 : 0,
            transition: "opacity 0.8s ease",
            background: `radial-gradient(circle at 70% 20%, ${ACCENT}22, transparent 40%), linear-gradient(#141414,#0a0a0a)`,
          }}
        >
          <span
            className="display font-bold"
            style={{ fontSize: s.big.length > 3 ? "clamp(1.6rem,4vw,2.6rem)" : "clamp(3rem,8vw,5rem)", color: "#f4f4f4" }}
          >
            {s.big}
          </span>
        </div>
      ))}
      <div className="absolute left-5 right-5 bottom-5 flex items-center gap-3 z-[1]">
        <span className="text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#ccc" }}>
          {String(index + 1).padStart(2, "0")}/{String(CAROUSEL_SLIDES.length).padStart(2, "0")}
        </span>
        <div className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
          <div style={{ width: `${fill}%`, height: "100%", background: ACCENT }} />
        </div>
        <span className="text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#aaa" }}>
          {CAROUSEL_SLIDES[index].caption}
        </span>
      </div>
    </div>
  );
}
