import React, { useState, useEffect, useRef } from "react";
import { Search, CornerDownLeft } from "lucide-react";
import { ACCENT, LINE, DIM } from "../theme";
import { CMD_ITEMS } from "../data";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const filtered = CMD_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (e) => {
      const isK = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey);
      if (isK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const runItem = (item) => {
    if (!item) return;
    if (item.action.type === "scroll") {
      const section = document.getElementById(item.action.target);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = item.action.target === "top" ? "/" : `/#${item.action.target}`;
      }
    } else if (item.action.target.startsWith("/")) {
      window.location.href = item.action.target;
    } else {
      window.open(item.action.target, item.action.target.startsWith("mailto:") ? "_self" : "_blank");
    }
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      runItem(filtered[active]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor-hover
        aria-label="Open search"
        title="Search pages and sections"
        className="hidden lg:inline-flex items-center justify-center rounded-full"
        style={{ width: 38, height: 38, border: `1px solid ${LINE}`, color: DIM }}
      >
        <Search size={16} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[150] flex items-start justify-center pt-[14vh] px-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-2xl overflow-hidden"
            style={{ maxWidth: 560, background: "#111113", border: `1px solid ${LINE}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
          >
            <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: `1px solid ${LINE}` }}>
              <Search size={16} style={{ color: "#777" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section or link…"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#fff", fontFamily: "'Inter', sans-serif" }}
              />
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ border: `1px solid ${LINE}`, color: "#777" }}>
                ESC
              </span>
            </div>
            <div className="max-h-[340px] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="text-center py-6 text-sm" style={{ color: "#777" }}>
                  No matches.
                </p>
              )}
              {filtered.map((item, i) => (
                <div
                  key={item.label}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => runItem(item)}
                  className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl text-sm cursor-pointer"
                  style={{ background: i === active ? ACCENT : "transparent", color: i === active ? "#0a0a0b" : "#ddd" }}
                >
                  <span className="flex items-center gap-3">
                    {i === active && <CornerDownLeft size={13} />}
                    {item.label}
                  </span>
                  <span className="text-[10px]" style={{ fontFamily: "'Inter', sans-serif", color: i === active ? "#284000" : "#777" }}>
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
