import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ACCENT, LINE, DIM } from "../theme";

const EMAIL = "ankitku2007@gmail.com";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button onClick={copy} data-cursor-hover className="group flex items-center gap-3 mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      <span className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight break-all">{EMAIL}</span>
      <span
        className="flex items-center gap-1 text-xs uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors"
        style={{ border: `1px solid ${copied ? ACCENT : LINE}`, color: copied ? ACCENT : DIM }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Copied" : "Tap to copy"}
      </span>
    </button>
  );
}

export function CopyRow() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <button
      onClick={copy}
      data-cursor-hover
      className="mt-auto flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left w-full"
      style={{
        border: `1px solid ${copied ? ACCENT : LINE}`,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12,
        transition: "border-color 0.2s ease, background 0.2s ease",
        background: copied ? `${ACCENT}0d` : "transparent",
      }}
    >
      <span>{EMAIL}</span>
      <small style={{ color: copied ? ACCENT : "#7d7d7d", letterSpacing: "0.08em" }}>{copied ? "COPIED" : "TAP TO COPY"}</small>
    </button>
  );
}
