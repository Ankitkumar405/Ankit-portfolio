import React from "react";
import { ArrowLeft, ArrowUpRight, Github, Instagram, Linkedin, Music2 } from "lucide-react";
import { ACCENT, BG, DIM, FONT_IMPORT, LINE, PANEL } from "./theme";
import { PROFILES } from "./data";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";

const PROFILE_ICONS = { github: Github, linkedin: Linkedin, instagram: Instagram, spotify: Music2 };

export default function ProfilesPage() {
  return (
    <div style={{ background: BG, color: "#F2F2F0", fontFamily: "'Inter', sans-serif" }} className="min-h-screen">
      <style>{`${FONT_IMPORT} * { cursor: none; } @media (hover: none), (pointer: coarse) { * { cursor: auto; } } .display { font-family: 'Bricolage Grotesque', sans-serif; } .display-italic { font-family: 'Bricolage Grotesque', sans-serif; font-style: italic; } .card { transition: border-color 0.25s ease, transform 0.25s ease; } .card:hover { border-color: ${ACCENT}66; transform: translateY(-4px); } a:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 3px; }`}</style>
      <Cursor />
      <Nav />
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-40">
        <Reveal>
          <a href="/" className="inline-flex items-center gap-2 text-sm mb-12" style={{ color: DIM }}><ArrowLeft size={15} /> Back to portfolio</a>
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: DIM }}>Profiles</p>
          <h1 className="display font-bold text-4xl md:text-7xl leading-[1.02] max-w-4xl">Find me <span className="display-italic" style={{ color: ACCENT }}>elsewhere.</span></h1>
          <p className="text-sm leading-relaxed max-w-lg mt-8" style={{ color: DIM }}>Code, conversations, and the places where I share what I am building.</p>
        </Reveal>
        <section className="border-t mt-20 pt-16 md:pt-20" style={{ borderColor: LINE }}>
          <Reveal><p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: DIM }}>Find me online</p></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFILES.map((profile, i) => {
              const Icon = PROFILE_ICONS[profile.icon];
              return <Reveal key={profile.label} delay={i * 90}><a href={profile.href} target="_blank" rel="noreferrer" data-cursor-hover className="card block rounded-2xl p-6 h-full" style={{ background: PANEL, border: `1px solid ${LINE}` }}><div className="flex items-center justify-between mb-8"><Icon size={22} style={{ color: ACCENT }} /><ArrowUpRight size={16} style={{ color: DIM }} /></div><p className="display font-semibold text-xl mb-2">{profile.label}</p><p className="text-sm leading-relaxed" style={{ color: DIM }}>{profile.detail}</p></a></Reveal>;
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
