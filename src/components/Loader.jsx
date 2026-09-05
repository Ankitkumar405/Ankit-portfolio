import React, { useState, useEffect, useRef } from "react";
import { ACCENT, BG, LINE } from "../theme";

export default function Loader({ onEnter }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const raf = useRef();
  const startedAt = useRef(Date.now());
  const finishTimer = useRef();

  useEffect(() => {
    const tick = () => {
      const next = Math.min(100, ((Date.now() - startedAt.current) / 1500) * 100);
      setProgress(next);
      if (next >= 100) {
        setLeaving(true);
        finishTimer.current = window.setTimeout(() => {
          setDone(true);
          onEnter?.();
        }, 650);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(finishTimer.current);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: BG,
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.04)" : "scale(1)",
        transition: "opacity 0.65s ease, transform 0.9s cubic-bezier(.76,0,.24,1)",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(${LINE}, 1px, transparent 1px), linear-gradient(90deg, ${LINE}, 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
      <div className="absolute top-8 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em]" style={{ color: "#777" }}>
        <span>AK / 2026</span>
        <span>Portfolio system <b style={{ color: ACCENT }}>●</b></span>
      </div>
      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="flex items-center justify-between mb-10" style={{ color: "#777" }}>
          <span className="text-xs uppercase tracking-[0.3em]">Web designer</span>
          <span className="text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{String(Math.round(progress)).padStart(3, "0")} %</span>
        </div>
        <div className="relative mb-10 overflow-hidden" style={{ height: 2, background: "rgba(255,255,255,0.12)" }}>
          <div className="absolute inset-y-0 left-0" style={{ width: `${progress}%`, background: ACCENT, boxShadow: `0 0 18px ${ACCENT}` }} />
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="display text-6xl sm:text-8xl md:text-[9rem] font-bold leading-[0.8] tracking-tight">ANKIT</p>
            <p className="mt-6 text-sm max-w-xs leading-relaxed" style={{ color: "#888" }}>Building interfaces with motion, clarity, and a little bit of curiosity.</p>
          </div>
          <div className="relative h-28 w-28 shrink-0 rounded-full" style={{ border: `1px solid ${ACCENT}66` }}>
            <div className="absolute inset-3 rounded-full" style={{ border: `1px dashed ${ACCENT}88`, animation: "loader-spin 8s linear infinite" }} />
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 18px ${ACCENT}` }} />
          </div>
        </div>
        <p className="mt-14 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#777" }}>{progress >= 100 ? "Entering experience" : "Preparing experience"}</p>
      </div>
      <style>{`@keyframes loader-spin { to { transform: rotate(360deg); } } @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }`}</style>
    </div>
  );
}
