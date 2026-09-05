import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, ChevronDown, UserRound, Wrench, MessageCircle } from "lucide-react";
import { ACCENT, DIM, LINE, PANEL } from "../theme";
import { NAV, MORE_NAV } from "../data";
import Magnetic from "./Magnetic";
import CommandPalette from "./CommandPalette";

const MORE_DETAILS = {
  profiles: { icon: UserRound, description: "Find me online" },
  gear: { icon: Wrench, description: "Tools I use" },
  contact: { icon: MessageCircle, description: "Start a conversation" },
};

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!moreRef.current?.contains(event.target)) setMoreOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    const ids = ["top", ...NAV.filter((n) => n.href.includes("#")).map((n) => n.id)];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50" style={{ background: scrolled ? "rgba(10,10,11,0.72)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", transition: "background .4s ease, backdrop-filter .4s ease" }}>
      <div className="max-w-6xl mx-auto px-6 min-h-20 flex items-center justify-between gap-8">
        <a href="/" data-cursor-hover className="flex min-w-0 items-baseline shrink-0">
          <span className="display font-bold text-lg tracking-tight">Ankit and dev</span>
          <span className="hidden sm:block ml-5 border-l pl-5 text-[10px] uppercase tracking-[0.18em] whitespace-nowrap" style={{ borderColor: LINE, color: DIM }}>Creative Engineering: Building the Future</span>
        </a>

        {/* pill nav with active-state highlight */}
        <nav
          className="hidden md:flex items-center gap-1"
          style={{ marginLeft: "auto" }}
        >
          {["top", ...NAV.map((n) => n.id)].map((id) => {
            const label = id === "top" ? "Home" : NAV.find((n) => n.id === id)?.label;
            const isActive = activeId === id;
            const navItem = NAV.find((n) => n.id === id);
            return (
              <a
                key={id}
                href={id === "top" ? "/" : navItem?.href || `#${id}`}
                data-cursor-hover
                className="px-4 py-1.5 rounded-full text-sm transition-colors"
                style={{
                  background: isActive ? "#fff" : "transparent",
                  color: isActive ? "#000" : "#ddd",
                }}
              >
                {label}
              </a>
            );
          })}
          <div ref={moreRef} className="relative">
            <button type="button" onClick={() => setMoreOpen((value) => !value)} data-cursor-hover className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm" style={{ color: moreOpen ? "#000" : "#ddd", background: moreOpen ? "#fff" : "transparent" }} aria-expanded={moreOpen} aria-haspopup="menu">
              More <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute right-0 top-full mt-3 w-60 rounded-2xl p-2 transition-all duration-200 ${moreOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} style={{ background: PANEL, border: `1px solid ${LINE}`, boxShadow: "0 18px 40px rgba(0,0,0,.35)" }} role="menu" aria-hidden={!moreOpen}>
              <p className="px-3 py-2 text-[10px] uppercase tracking-[0.25em]" style={{ color: "#777" }}>Explore more</p>
              {MORE_NAV.map((item) => { const Icon = MORE_DETAILS[item.id].icon; return <a key={item.id} href={item.href} onClick={() => setMoreOpen(false)} className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/10" style={{ color: "#ddd" }} role="menuitem"><span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(214,255,75,.1)", color: ACCENT }}><Icon size={16} /></span><span className="flex-1"><strong className="block text-sm font-medium">{item.label}</strong><small className="block mt-0.5 text-[11px]" style={{ color: "#777" }}>{MORE_DETAILS[item.id].description}</small></span><ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" style={{ color: ACCENT }} /></a>; })}
            </div>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Magnetic
            href="/book"
            data-cursor-hover
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
            style={{ border: `1px solid ${LINE}`, color: "#F2F2F0" }}
          >
            Book a Call <ArrowUpRight size={14} />
          </Magnetic>
          <CommandPalette />
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4 text-sm" style={{ background: "rgba(10,10,11,.92)" }}>
          <a href="/book" onClick={() => setMenuOpen(false)} style={{ color: ACCENT }}>Book a Call</a>
          {NAV.map((l) => (
            <a key={l.id} href={l.href || `#${l.id}`} onClick={() => setMenuOpen(false)} style={{ color: "#9A9A9E" }}>
              {l.label}
            </a>
          ))}
          <button type="button" onClick={() => setMoreOpen((value) => !value)} className="flex items-center gap-2 text-left" style={{ color: "#9A9A9E" }}>More <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} /></button>
          {moreOpen && MORE_NAV.map((l) => <a key={l.id} href={l.href} onClick={() => setMenuOpen(false)} className="pl-4" style={{ color: "#9A9A9E" }}>{l.label} <span className="ml-2 text-xs" style={{ color: "#666" }}>{MORE_DETAILS[l.id].description}</span></a>)}
        </div>
      )}
    </header>
  );
}
