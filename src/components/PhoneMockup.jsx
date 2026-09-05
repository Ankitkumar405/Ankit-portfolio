import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ACCENT, PANEL, LINE, DIM } from "../theme";

// Stylized "device frame" project preview: a rounded screen showing a
// live-data readout in place of a static screenshot. Original layout.
export default function PhoneMockup({ project }) {
  const { name, nameItalic, year, tags, description, links, hud } = project;
  return (
    <div
      className="card rounded-2xl p-6 md:p-7 flex flex-col shrink-0"
      style={{ background: PANEL, border: `1px solid ${LINE}`, width: "min(420px, 85vw)" }}
    >
      <div
        className="rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative"
        style={{ height: 180, background: "#0a0a0a", border: `1px solid ${LINE}` }}
      >
        <div
          className="w-[86%] h-[80%] rounded-xl relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${ACCENT}14, transparent 40%), #101010`,
            border: `1px solid ${LINE}`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div className="absolute inset-3.5 flex flex-col gap-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span className="text-[10px]" style={{ color: ACCENT }}>{hud.title}</span>
            <span className="text-base font-bold text-white">{hud.line1}</span>
            <span className="text-[10px]" style={{ color: DIM }}>{hud.line2}</span>
            <div className="h-1 rounded-full mt-1 overflow-hidden" style={{ background: "#222" }}>
              <div style={{ width: `${hud.pct}%`, height: "100%", background: ACCENT }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 text-xs" style={{ color: DIM }}>
        <span>{year}</span>
        <div className="flex gap-2 flex-wrap justify-end">
          {tags.map((t) => (
            <span key={t} className="px-2 py-1 rounded-full" style={{ border: `1px solid ${LINE}` }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <h3 className="display font-bold text-2xl mb-3">
        {name} <span className="display-italic">{nameItalic}</span>
      </h3>
      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: DIM }}>
        {description}
      </p>

      <div className="flex gap-4">
        {links.length > 0 ? (
          links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="hover-underline text-sm font-medium flex items-center gap-1"
              style={{ color: ACCENT }}
            >
              {l.label} <ArrowUpRight size={14} />
            </a>
          ))
        ) : (
          <span className="text-sm" style={{ color: DIM }}>
            Link coming soon
          </span>
        )}
      </div>
    </div>
  );
}
