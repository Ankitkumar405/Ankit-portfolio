import React, { lazy, Suspense, useState, useEffect } from "react";
import { ArrowUpRight, Github, Linkedin, Instagram, Mail } from "lucide-react";

import { ACCENT, BG, PANEL, LINE, DIM, FONT_IMPORT } from "./theme";
import { PHILOSOPHY, PROJECTS, EXPERIENCE, FEEDBACK } from "./data";
import { useClock } from "./hooks";

import Reveal from "./components/Reveal";
import Cursor from "./components/Cursor";
import Magnetic from "./components/Magnetic";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Clock3D from "./components/Clock3D";
import Globe from "./components/Globe";
import SkillsOrbit from "./components/SkillsOrbit";
import DragRail from "./components/DragRail";
import PhoneMockup from "./components/PhoneMockup";
import { CopyEmail, CopyRow } from "./components/CopyEmail";
import DiagonalRibbon from "./components/DiagonalRibbon";
import Carousel from "./components/Carousel";

const ProfilesPage = lazy(() => import("./ProfilesPage"));
const GearPage = lazy(() => import("./GearPage"));
const BookingPage = lazy(() => import("./BookingPage"));
const BlogPage = lazy(() => import("./BlogPage"));

function HomePage() {
  const [entered, setEntered] = useState(false);
  const [sectionBlend, setSectionBlend] = useState(0);
  const [catGaze, setCatGaze] = useState({ x: 0, y: 0 });
  const time = useClock();
  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const onPointerMove = (event) => {
      const horizontal = (event.clientX / window.innerWidth) - 0.5;
      const vertical = (event.clientY / window.innerHeight) - 0.5;
      setCatGaze({ x: horizontal * 8, y: vertical * 6 });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const start = window.innerHeight * 0.55;
      const distance = window.innerHeight * 0.9;
      setSectionBlend(Math.min(1, Math.max(0, (window.scrollY - start) / distance)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <div style={{ background: BG, color: "#F2F2F0", fontFamily: "'Inter', sans-serif" }} className="min-h-screen relative">
      <style>{`
        ${FONT_IMPORT}
        html { scroll-behavior: smooth; }
        * { cursor: none; }
        @media (hover: none), (pointer: coarse) { * { cursor: auto; } }
        .display { font-family: 'Bricolage Grotesque', sans-serif; }
        .display-italic { font-family: 'Bricolage Grotesque', sans-serif; font-style: italic; }
        ::selection { background: ${ACCENT}; color: #0A0A0B; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 3px; }
        .hover-underline { position: relative; }
        .hover-underline::after {
          content: ''; position: absolute; left: 0; bottom: -2px; height: 1px; width: 0;
          background: ${ACCENT}; transition: width 0.25s ease;
        }
        .hover-underline:hover::after { width: 100%; }
        .card { transition: border-color 0.25s ease, transform 0.25s ease; }
        .card:hover { border-color: ${ACCENT}66; transform: translateY(-4px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .marquee { display: flex; width: max-content; animation: scroll 26s linear infinite; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .glossy {
          background: linear-gradient(110deg, #5c5c5c 20%, #fff 40%, #fff 52%, #5c5c5c 70%);
          background-size: 220% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shine 5s ease-in-out infinite;
        }
        @keyframes shine {
          0% { background-position: 120% 0; }
          50% { background-position: -20% 0; }
          100% { background-position: 120% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee, .glossy { animation: none; }
          html { scroll-behavior: auto; }
        }
        .hero-reference { min-height: 100svh; background: #080808; }
        .hero-reference::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 50% 44%, rgba(255,255,255,.035), transparent 34%); }
        .hero-wordmark { font-size: clamp(4.2rem, 17.4vw, 15.8rem); letter-spacing: -.075em; line-height: .76; }
        .hero-italic { font-size: clamp(2.3rem, 6.3vw, 6.4rem); letter-spacing: -.055em; line-height: .9; }
        .hero-corner { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: .16em; }
        .hero-scroll { animation: hero-breathe 2.4s ease-in-out infinite; }
        .reference-transition { background: #f5f5f3; isolation: isolate; }
        .scroll-wash { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .scroll-wash-panel { position: absolute; top: 0; bottom: 0; width: 50%; background: #f5f5f3; will-change: transform; }
        .scroll-wash-left { left: 0; }
        .scroll-wash-right { right: 0; }
        .reference-transition-content { color: #111; }
        .reference-card { background: rgba(255,255,255,.88); border: 1px solid #dedede; color: #111; box-shadow: 0 12px 38px rgba(0,0,0,.06); }
        .reference-grid { display: grid; grid-template-columns: 1fr 1.9fr 1fr; grid-template-rows: 290px 300px; grid-template-areas: 'profile intro contact' 'project project globe'; gap: 18px; }
        .reference-tile { position: relative; overflow: hidden; min-width: 0; border: 1px solid #dedede; border-radius: 18px; background: rgba(255,255,255,.92); color: #111; box-shadow: 0 12px 38px rgba(0,0,0,.06); }
        .reference-profile, .reference-contact { padding: 24px; }
        .reference-intro { padding: 24px 28px; }
        .reference-project, .reference-globe { padding: 22px 24px; }
        .reference-kicker { color: #727276; font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: .18em; text-transform: uppercase; }
        .reference-name { margin-top: 15px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(1.8rem, 3vw, 3rem); line-height: .9; }
        .reference-name span, .reference-intro em, .reference-contact em, .reference-project em, .reference-globe em { font-family: 'Bricolage Grotesque', sans-serif; font-style: italic; font-weight: 400; }
        .reference-meta { margin-top: 14px; color: #777; font-family: 'IBM Plex Mono', monospace; font-size: 9px; }
        .reference-orbit { position: absolute; right: 16%; top: 37%; display: grid; place-items: center; width: 92px; height: 92px; border: 1px solid #d8d8d8; border-radius: 50%; color: #111; font-family: 'Bricolage Grotesque', sans-serif; font-size: 22px; transform: rotate(-14deg); }
        .reference-orbit::before { content: ''; position: absolute; inset: -12px 17px; border: 1px solid #ddd; border-radius: 50%; transform: rotate(55deg); }
        .reference-socials { position: absolute; bottom: 18px; left: 24px; right: 24px; display: flex; gap: 13px; border-top: 1px solid #e1e1e1; padding-top: 13px; color: #555; font-size: 10px; }
        .reference-pill { display: inline-block; border: 1px solid #ddd; border-radius: 999px; padding: 5px 9px; color: #777; font-family: 'IBM Plex Mono', monospace; font-size: 8px; letter-spacing: .12em; }
        .reference-intro h2 { margin-top: 16px; font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(2rem, 3.2vw, 3.4rem); line-height: .82; }
        .reference-intro h2 em { color: #777; }
        .reference-intro > p { position: relative; z-index: 2; max-width: 270px; margin-top: 15px; color: #777; font-size: 10px; line-height: 1.45; }
        .reference-micro { position: absolute; right: 24px; top: 26px; color: #555; font-family: 'IBM Plex Mono', monospace; font-size: 7px; letter-spacing: .1em; text-align: right; }
        .reference-micro span { color: #999; letter-spacing: 0; }
        .reference-free-clock { position: absolute; z-index: 20; left: 50%; top: 48%; transform: translate(-50%, -50%); pointer-events: none; filter: drop-shadow(0 16px 20px rgba(0,0,0,.18)); }
        .reference-contact h2 { margin-top: 45px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.7rem; line-height: .85; }
        .reference-contact em { display: block; margin-top: 5px; color: #888; font-size: 13px; }
        .reference-rule { height: 1px; margin: 17px 0; background: #ddd; }
        .reference-connect { position: absolute; bottom: 17px; left: 24px; right: 24px; display: flex; align-items: center; justify-content: center; gap: 5px; border-radius: 8px; padding: 10px; background: #111; color: #fff; font-family: 'IBM Plex Mono', monospace; font-size: 8px; letter-spacing: .08em; }
        .reference-project h2, .reference-globe h2 { margin-top: 12px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.45rem; line-height: .9; }
        .reference-project .reference-phone-row { position: absolute; right: 7%; bottom: -100px; transform: scale(.72); transform-origin: bottom right; }
        .reference-globe > div:last-child { position: absolute; right: -25px; bottom: -118px; }
        @media (max-width: 900px) { .reference-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; grid-template-areas: 'profile contact' 'intro intro' 'project globe'; } .reference-intro { min-height: 350px; } .reference-free-clock { top: 43%; } }
        @media (max-width: 600px) { .reference-grid { display: flex; flex-direction: column; } .reference-tile { min-height: 260px; } .reference-intro { min-height: 390px; } .reference-project .reference-phone-row { right: -5%; } .reference-free-clock { top: 42%; } }
        @media (prefers-reduced-motion: reduce) { .scroll-wash-panel { transition: none; } }
        .cat-eye { position: absolute; display: flex; align-items: center; justify-content: center; width: 15%; height: 11%; border-radius: 58% 42% 52% 48%; background: #f8f8f5; border: 2px solid #080808; box-shadow: 0 1px 0 rgba(0,0,0,.18); transform: rotate(-3deg); }
        .cat-eye:nth-of-type(2) { transform: rotate(3deg); }
        .cat-pupil { position: relative; display: block; width: 42%; height: 58%; border-radius: 50%; background: #080808; transition: transform 140ms ease-out; }
        .cat-pupil::after { content: ''; position: absolute; left: 22%; top: 17%; width: 24%; height: 24%; border-radius: 50%; background: #fff; }
        @keyframes hero-breathe { 0%, 100% { opacity: .42; transform: translateY(0); } 50% { opacity: 1; transform: translateY(5px); } }
        @media (prefers-reduced-motion: reduce) { .hero-scroll { animation: none; } }
      `}</style>

      {!entered && <Loader onEnter={() => setEntered(true)} />}
      <Cursor />

      <Nav />

      {/* HERO */}
      <section id="top" className="hero-reference relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-[1500px] px-6 text-center">
          <Reveal>
            <p className="hero-corner mb-8 uppercase" style={{ color: DIM }}>Creative engineering / 2026</p>
            <div className="relative mx-auto w-fit">
              <div className="pointer-events-none absolute bottom-[78%] left-1/2 z-10" style={{ width: clampCatWidth(), height: clampCatWidth() * (1134 / 1170), transform: "translateX(-50%)" }} aria-hidden="true">
                <img src="/cat.png" width="1170" height="1134" alt="White cat illustration" className="hero-cat" id="heroCat" aria-hidden="true" fetchPriority="high" decoding="sync" style={{ width: "100%", height: "100%", objectFit: "contain", filter: `drop-shadow(0 0 12px ${ACCENT}55)` }} />
                <span className="cat-eye" style={{ left: "32%", top: "30%" }}><span className="cat-pupil" style={{ transform: `translate(${catGaze.x}px, ${catGaze.y}px)` }} /></span>
                <span className="cat-eye" style={{ left: "55%", top: "30%" }}><span className="cat-pupil" style={{ transform: `translate(${catGaze.x}px, ${catGaze.y}px)` }} /></span>
              </div>
              <h1 className="display hero-wordmark mx-auto max-w-[1400px] font-bold uppercase text-white">Ankit</h1>
            </div>
            <p className="hero-corner mt-10 uppercase" style={{ color: DIM }}>Design and build products that</p>
            <p className="display-italic hero-italic mt-5 text-white">feel alive.</p>
          </Reveal>
        </div>
        <div className="hero-corner absolute bottom-10 left-6 z-10 uppercase text-left" style={{ color: DIM }}>
          <span className="mb-2 block" style={{ color: ACCENT }}>⌖</span>
          Based in India<br /><span style={{ color: "#555" }}>Earth</span>
        </div>
        <div className="hero-corner absolute bottom-10 right-6 z-10 uppercase text-right" style={{ color: DIM }}>
          <span className="mb-2 block" style={{ color: ACCENT }}>▣</span>
          Front-end developer<br /><span style={{ color: "#555" }}>Designer</span>
        </div>
        <div className="hero-scroll hero-corner absolute bottom-5 left-1/2 z-10 -translate-x-1/2 uppercase" style={{ color: "#777" }}>Scroll to explore ↓</div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: LINE }} />
      </section>

      {/* BENTO INTRO */}
      <section className="reference-transition relative overflow-hidden py-8 md:py-12" style={{ "--blend": sectionBlend }}>
        <div className="scroll-wash" aria-hidden="true"><div className="scroll-wash-panel scroll-wash-left" style={{ transform: `scaleX(${sectionBlend})`, transformOrigin: "left center" }} /><div className="scroll-wash-panel scroll-wash-right" style={{ transform: `scaleX(${sectionBlend})`, transformOrigin: "right center" }} /></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-7">
          <div className="reference-grid">
            <Reveal className="reference-tile reference-profile" style={{ gridArea: "profile" }}>
              <p className="reference-kicker">Creative engineer</p>
              <h2 className="reference-name">Ankit <span>Kumar</span></h2>
              <p className="reference-meta">⌖ INDIA, EARTH · {hh}:{mm}:{ss}</p>
              <div className="reference-orbit" aria-hidden="true"><span>AK</span></div>
              <div className="reference-socials"><a href="https://github.com/Ankitkumar405" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/mr-tony-stark-4a7359333" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://instagram.com/mr._ankit_arya" target="_blank" rel="noreferrer">Instagram</a></div>
            </Reveal>

            <Reveal delay={80} className="reference-tile reference-intro" style={{ gridArea: "intro" }}>
              <span className="reference-pill">+ DETAIL-DRIVEN UI</span>
              <h2>Interfaces<br /><em>you can feel.</em></h2>
              <p>I sweat spacing, timeline, feedback — the tiny stuff. I build digital experiences that feel organic and human, where every pixel has a purpose.</p>
              <div className="reference-micro">MICRO-INTERACTIONS<br /><span>Every pixel has a purpose. Every transition tells a story.</span></div>
            </Reveal>

            <Reveal delay={160} className="reference-tile reference-contact" style={{ gridArea: "contact" }}>
              <p className="reference-kicker">Available for work</p>
              <h2>LET&apos;S BUILD<br />SOMETHING</h2>
              <em>that actually works.</em>
              <div className="reference-rule" />
              <CopyRow />
              <a href="mailto:ankitku2007@gmail.com" className="reference-connect">CONNECT ME <ArrowUpRight size={13} /></a>
            </Reveal>

            <Reveal delay={220} className="reference-tile reference-project" style={{ gridArea: "project" }}>
              <p className="reference-kicker">Founder of <strong>Antriksh</strong></p>
              <h2>Building products<br /><em>people remember.</em></h2>
              <div className="reference-phone-row"><PhoneMockup project={PROJECTS[0]} /></div>
            </Reveal>

            <Reveal delay={280} className="reference-tile reference-globe" style={{ gridArea: "globe" }}>
              <p className="reference-kicker">Available globally</p>
              <h2>Adaptable across<br /><em>time zones.</em></h2>
              <Globe size={300} />
            </Reveal>
          </div>
          <div className="reference-free-clock" aria-label="Current local time"><Clock3D size={280} interactive={false} /></div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="border-t border-b" style={{ borderColor: LINE }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: ACCENT }}>Detail-driven UI</p>
            <h2 className="display font-bold text-3xl md:text-5xl mb-10 max-w-2xl">
              Interfaces <span className="display-italic" style={{ color: ACCENT }}>you can feel.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.label} delay={i * 90}>
                <p className="display font-semibold text-lg mb-2">{p.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: DIM }}>{p.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: DIM }}>Available for work</p>
          <h2 className="display font-bold text-3xl md:text-5xl mb-10">
            Let's build something{" "}
            <span className="display-italic" style={{ color: ACCENT }}>that actually works.</span>
          </h2>
          <CopyEmail />
        </Reveal>
      </section>

      {/* GLOBE — availability */}
      <section className="border-t" style={{ borderColor: LINE }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: DIM }}>Reach</p>
            <h2 className="display font-bold text-3xl md:text-5xl mb-6 max-w-md">
              Working with people{" "}
              <span className="display-italic" style={{ color: ACCENT }}>wherever they are.</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: DIM }}>
              Based in Jamtara, India — comfortable collaborating async across time zones for remote or freelance work.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Globe size={320} />
          </Reveal>
        </div>
      </section>

      {/* CURRENT ROLES */}
      <section className="border-t" style={{ borderColor: LINE }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <Reveal><p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: DIM }}>Currently</p></Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.org} delay={i * 120}>
                <a
                  href={e.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="card block rounded-2xl p-8 h-full"
                  style={{ background: PANEL, border: `1px solid ${LINE}` }}
                >
                  <p className="text-xs mb-3" style={{ color: ACCENT }}>{e.role}</p>
                  <h3 className="display font-semibold text-2xl mb-3">
                    {e.orgPlain} <span className="display-italic">{e.orgItalic}</span>
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: DIM }}>{e.note}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK — drag to explore, phone-mockup cards */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: DIM }}>Selected work</p>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="display font-bold text-3xl md:text-5xl max-w-2xl">
              Building things{" "}
              <span className="display-italic" style={{ color: ACCENT }}>people can use.</span>
            </h2>
            <span className="text-xs uppercase tracking-widest" style={{ color: DIM }}>← Drag to explore →</span>
          </div>
        </Reveal>
        <DragRail>
          {PROJECTS.map((p) => (
            <PhoneMockup key={p.name} project={p} />
          ))}
        </DragRail>
      </section>

      {/* SKILLS ORBIT (three.js) */}
      <section className="border-t border-b overflow-hidden" style={{ borderColor: LINE }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-[0.3em] mb-2" style={{ color: DIM }}>Tools &amp; technologies</p>
            <p className="text-center text-xs mb-6" style={{ color: DIM }}>hover to slow the orbit</p>
          </Reveal>
          <SkillsOrbit />
        </div>
      </section>

      <DiagonalRibbon />

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: DIM }}>Beyond the screen</p>
          <h2 className="display font-bold text-3xl md:text-5xl mb-10 max-w-2xl">
            A student learning{" "}
            <span className="display-italic" style={{ color: ACCENT }}>by building.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Reveal delay={100}>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: DIM }}>
              I'm Ankit — a student at Kendriya Vidyalaya and a creative web designer who enjoys
              turning ideas into modern, interactive, visually engaging websites. When I'm not
              building interfaces, I'm editing video or prototyping new creative concepts —
              anything that lets an idea become something people can actually use.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[["KV", "Kendriya Vidyalaya"], ["2+", "Projects shipped"], ["Always", "Learning"]].map(([big, small]) => (
                <div key={small}>
                  <p className="display font-bold text-2xl md:text-3xl mb-1" style={{ color: ACCENT }}>{big}</p>
                  <p className="text-xs" style={{ color: DIM }}>{small}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <Carousel />
          </Reveal>
        </div>
      </section>

      {/* CLIENT FEEDBACK */}
      <section className="border-t" style={{ borderColor: LINE }}>
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: DIM }}>Client feedback</p>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
              <h2 className="display font-bold text-3xl md:text-5xl max-w-2xl">
                Good work should leave a <span className="display-italic" style={{ color: ACCENT }}>good feeling.</span>
              </h2>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: DIM }}>A few words from the people and projects I build with.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {FEEDBACK.map((item, i) => (
              <Reveal key={item.label} delay={i * 100}>
                <article className="card rounded-2xl p-7 h-full flex flex-col" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
                  <div className="mb-7 flex h-32 items-center justify-center rounded-xl" style={{ border: `1px dashed ${LINE}`, background: "rgba(255,255,255,0.015)" }}>
                    {item.image ? <img src={item.image} alt={`${item.source} portrait`} className="h-full w-full rounded-xl object-cover" /> : <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#666" }}>Client image</span>}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.25em] mb-12" style={{ color: ACCENT }}>{item.label}</p>
                  <p className="display text-xl leading-relaxed mb-8">“{item.quote}”</p>
                  <p className="mt-auto text-xs" style={{ color: DIM }}>{item.source}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="border-t" style={{ borderColor: LINE }}>
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <Reveal>
            <h2 className="display glossy font-bold text-4xl md:text-6xl mb-10">Ready to begin?</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <Magnetic
                href="mailto:ankitku2007@gmail.com"
                data-cursor-hover
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium"
                style={{ background: ACCENT, color: "#0A0A0B" }}
              >
                <Mail size={16} /> Send Email
              </Magnetic>
              <Magnetic
                href="https://instagram.com/mr._ankit_arya"
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium"
                style={{ border: `1px solid ${LINE}`, color: "#F2F2F0" }}
              >
                <Instagram size={16} /> Message on Instagram
              </Magnetic>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm" style={{ color: DIM }}>
              <a href="https://github.com/Ankitkumar405" target="_blank" rel="noreferrer" data-cursor-hover className="hover-underline flex items-center gap-2">
                <Github size={16} /> GitHub
              </a>
              <a href="https://linkedin.com/in/mr-tony-stark-4a7359333" target="_blank" rel="noreferrer" data-cursor-hover className="hover-underline flex items-center gap-2">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER MARQUEE */}
      <footer className="overflow-hidden py-6 border-t" style={{ borderColor: LINE }}>
        <div className="marquee mb-6">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="display font-semibold text-2xl md:text-3xl mx-4 whitespace-nowrap" style={{ color: DIM }}>
              Web Designer ✦ Front-End Developer ✦ Creative Design ✦ Open to Work ✦ Based in India ✦
            </span>
          ))}
        </div>
        <p className="text-center text-xs" style={{ color: DIM }}>
          © {new Date().getFullYear()} Ankit Kumar. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function clampCatWidth() {
  if (typeof window === "undefined") return 72;
  return Math.min(170, Math.max(100, window.innerWidth * 0.105));
}


export default function App() {
  let page = null;
  if (window.location.pathname === "/profiles") page = <ProfilesPage />;
  else if (window.location.pathname === "/gear") page = <GearPage />;
  else if (window.location.pathname === "/book") page = <BookingPage />;
  else if (window.location.pathname === "/blog") page = <BlogPage />;
  if (page) return <Suspense fallback={null}>{page}</Suspense>;
  return <HomePage />;
}
