import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Headphones, Keyboard, Laptop, Mouse, Smartphone, Sparkles } from "lucide-react";
import { ACCENT, BG, DIM, FONT_IMPORT, LINE, PANEL } from "./theme";
import { DEV_TOOLS, HARDWARE } from "./data";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";

const HARDWARE_ICONS = { phone: Smartphone, laptop: Laptop, keyboard: Keyboard, mouse: Mouse, audio: Headphones };
const FILTERS = ["All", "Code", "Design", "Test", "Ship", "Build", "Style", "Explore", "Quality"];

export default function GearPage() {
  const [selectedHardware, setSelectedHardware] = useState(0);
  const [toolFilter, setToolFilter] = useState("All");
  const activeHardware = HARDWARE[selectedHardware];
  const ActiveIcon = HARDWARE_ICONS[activeHardware.visual];
  const visibleTools = useMemo(() => toolFilter === "All" ? DEV_TOOLS : DEV_TOOLS.filter((tool) => tool.role === toolFilter), [toolFilter]);

  return (
    <div className="gear-page min-h-screen" style={{ background: BG, color: "#F2F2F0", fontFamily: "'Inter', sans-serif" }}>
      <style>{`${FONT_IMPORT}
        * { cursor: none; }
        @media (hover: none), (pointer: coarse) { * { cursor: auto; } }
        .display { font-family: 'Bricolage Grotesque', sans-serif; }
        .display-italic { font-family: 'Bricolage Grotesque', sans-serif; font-style: italic; }
        .gear-page button:focus-visible, .gear-page a:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 3px; }
        .hardware-button, .tool-card { transition: border-color .25s ease, background .25s ease, transform .25s ease; }
        .hardware-button:hover, .tool-card:hover { transform: translateY(-3px); border-color: ${ACCENT}88 !important; }
        .hardware-button.active { background: ${ACCENT}; color: #0A0A0B; border-color: ${ACCENT}; }
        .hardware-button.active small { color: #334500 !important; }
        .device-stage { background: radial-gradient(circle at 50% 35%, rgba(214,255,75,.13), transparent 34%), #101012; }
        .device-stage::before { content: ''; position: absolute; inset: 10%; border: 1px solid rgba(214,255,75,.2); border-radius: 50%; transform: rotate(18deg) scaleX(1.5); }
        .device-stage::after { content: ''; position: absolute; width: 52%; height: 1px; left: 24%; top: 50%; background: rgba(214,255,75,.35); box-shadow: 0 0 30px rgba(214,255,75,.5); }
        .device-image { animation: device-float 5s ease-in-out infinite; max-height: 100%; }
        @keyframes device-float { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-8px) rotate(1deg); } }
        @media (prefers-reduced-motion: reduce) { .device-image { animation: none; } }
      `}</style>
      <Cursor />
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <Reveal>
            <a href="/" className="inline-flex items-center gap-2 text-sm mb-14" style={{ color: DIM }}><ArrowLeft size={15} /> Back to portfolio</a>
            <div className="flex items-end justify-between gap-10 flex-wrap">
              <div><p className="text-xs uppercase tracking-[0.35em] mb-5" style={{ color: ACCENT }}>The setup</p><h1 className="display font-bold uppercase text-6xl sm:text-8xl md:text-[9rem] leading-[0.78] tracking-tight">Gear<span className="display-italic" style={{ color: ACCENT }}>.</span></h1></div>
              <div className="flex items-center gap-3 text-xs" style={{ color: DIM }}><span className="flex items-center gap-2 rounded-full px-3 py-2" style={{ border: `1px solid ${LINE}` }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} /> Currently building</span><span className="rounded-full px-3 py-2" style={{ border: `1px solid ${LINE}` }}>5 / 8 essentials</span></div>
            </div>
            <p className="text-base md:text-lg leading-relaxed max-w-xl mt-12" style={{ color: DIM }}>The physical tools and digital systems I reach for when an idea needs to become something people can use.</p>
          </Reveal>
        </section>

        <section className="border-t" style={{ borderColor: LINE }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <Reveal><div className="flex items-baseline gap-4 mb-5"><span className="text-xs" style={{ color: ACCENT }}>01.</span><p className="text-xs uppercase tracking-[0.3em]" style={{ color: DIM }}>Workstation</p></div><h2 className="display font-bold text-4xl md:text-6xl mb-5">The physical <span className="display-italic" style={{ color: ACCENT }}>setup.</span></h2><p className="text-sm leading-relaxed max-w-lg mb-12" style={{ color: DIM }}>Select an item to inspect the role it plays in the workday.</p></Reveal>
            <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-5">
              <Reveal>
                <div className="relative grid min-h-[520px] grid-rows-[auto_minmax(210px,1fr)_auto] gap-6 overflow-hidden rounded-2xl p-6 md:p-8 device-stage" style={{ border: `1px solid ${LINE}` }}>
                  <div className="relative z-10 flex min-w-0 items-start justify-between gap-5"><div className="min-w-0"><p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Selected hardware</p><h3 className="display mt-3 break-words text-3xl font-semibold leading-[0.95] md:text-5xl">{activeHardware.label}</h3></div><ActiveIcon className="shrink-0" size={22} style={{ color: ACCENT }} /></div>
                  <div className="relative z-10 flex min-h-[210px] items-center justify-center overflow-hidden rounded-xl" style={{ background: "rgba(0,0,0,.2)", border: `1px solid ${LINE}` }}><img src={activeHardware.image} alt={activeHardware.label} className="device-image h-full w-full object-contain mix-blend-screen" /></div>
                  <div className="relative z-10 flex items-end justify-between gap-6"><div><p className="text-sm max-w-xs leading-relaxed" style={{ color: DIM }}>{activeHardware.detail}</p><p className="text-[10px] uppercase tracking-[0.2em] mt-4" style={{ color: "#666" }}>Tap another item to change view</p></div><span className="display shrink-0 text-7xl font-bold" style={{ color: `${ACCENT}66` }}>{String(selectedHardware + 1).padStart(2, "0")}</span></div>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 content-start">{HARDWARE.map((item, index) => { const Icon = HARDWARE_ICONS[item.visual]; return <Reveal key={item.label} delay={index * 70}><button type="button" onClick={() => setSelectedHardware(index)} className={`hardware-button w-full rounded-xl p-4 text-left ${selectedHardware === index ? "active" : ""}`} style={{ border: `1px solid ${LINE}`, background: selectedHardware === index ? ACCENT : PANEL }}><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: selectedHardware === index ? "rgba(10,10,11,.1)" : "rgba(214,255,75,.1)", color: selectedHardware === index ? "#0A0A0B" : ACCENT }}><Icon size={17} /></span><span className="min-w-0"><strong className="block truncate text-sm font-medium">{item.label}</strong><small className="mt-1 block truncate text-[10px]" style={{ color: DIM }}>{item.detail.split(" · ")[0]}</small></span><ChevronRight size={15} className="ml-auto shrink-0" /></div></button></Reveal>; })}</div>
            </div>
          </div>
        </section>

        <section className="border-t" style={{ borderColor: LINE }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <Reveal><div className="flex items-baseline gap-4 mb-5"><span className="text-xs" style={{ color: ACCENT }}>02.</span><p className="text-xs uppercase tracking-[0.3em]" style={{ color: DIM }}>Dev tools</p></div><div className="flex items-end justify-between gap-8 flex-wrap mb-12"><h2 className="display font-bold text-4xl md:text-6xl max-w-3xl">The systems behind the <span className="display-italic" style={{ color: ACCENT }}>work.</span></h2><Sparkles size={28} style={{ color: ACCENT }} /></div><p className="text-sm leading-relaxed max-w-lg mb-10" style={{ color: DIM }}>Filter the stack by the part of the process it helps move forward.</p></Reveal>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-8">{FILTERS.map((filter) => <button key={filter} type="button" onClick={() => setToolFilter(filter)} className="shrink-0 rounded-full px-4 py-2 text-xs" style={{ background: toolFilter === filter ? ACCENT : "transparent", color: toolFilter === filter ? "#0A0A0B" : DIM, border: `1px solid ${toolFilter === filter ? ACCENT : LINE}` }}>{filter}</button>)}</div>
            <div className="grid sm:grid-cols-2 gap-4">{visibleTools.map((tool, index) => <Reveal key={tool.label} delay={index * 55}><article className="tool-card rounded-2xl p-6" style={{ background: PANEL, border: `1px solid ${LINE}` }}><div className="flex items-start justify-between mb-10"><span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#0b0b0c", border: `1px solid ${LINE}` }}><img src={tool.logo} alt={`${tool.label} logo`} className="h-5 w-5 object-contain" style={{ filter: "grayscale(1) brightness(0) invert(1)" }} /></span><span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{tool.role}</span></div><h3 className="display text-2xl font-semibold mb-2">{tool.label}</h3><p className="text-sm leading-relaxed" style={{ color: DIM }}>{tool.detail}</p><div className="mt-6 flex items-center gap-2 text-xs" style={{ color: "#666" }}><Check size={13} style={{ color: ACCENT }} /> Part of the workflow</div></article></Reveal>)}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
