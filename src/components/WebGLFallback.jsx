import React from "react";
import { ACCENT, DIM, LINE, PANEL } from "../theme";

export default function WebGLFallback({ label = "Interactive graphic" }) {
  return (
    <div
      className="flex h-full min-h-[180px] w-full items-center justify-center rounded-2xl px-6 text-center"
      style={{ background: PANEL, border: `1px solid ${LINE}` }}
    >
      <div>
        <p className="display text-lg font-semibold" style={{ color: ACCENT }}>{label}</p>
        <p className="mt-2 text-xs" style={{ color: DIM }}>3D preview unavailable in this browser.</p>
      </div>
    </div>
  );
}