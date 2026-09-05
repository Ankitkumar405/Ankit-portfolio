import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock3, Mail, MapPin, Send, Video } from "lucide-react";
import { ACCENT, BG, DIM, FONT_IMPORT, LINE, PANEL } from "./theme";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";

const TIMES = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"];

function getAvailableDates() {
  const dates = [];
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  while (dates.length < 8) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) dates.push(new Date(date));
  }
  return dates;
}

function formatDate(date, options) {
  return new Intl.DateTimeFormat("en-IN", options).format(date);
}

export default function BookingPage() {
  const dates = useMemo(getAvailableDates, []);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(TIMES[0]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const sendMessage = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Call request from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nPreferred call: ${formatDate(selectedDate, { dateStyle: "full" })} at ${selectedTime} IST\n\n${form.message}`);
    window.location.href = `mailto:ankitku2007@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="booking-page min-h-screen" style={{ background: BG, color: "#F2F2F0", fontFamily: "'Inter', sans-serif" }}>
      <style>{`${FONT_IMPORT}
        * { cursor: none; }
        @media (hover: none), (pointer: coarse) { * { cursor: auto; } }
        .display { font-family: 'Bricolage Grotesque', sans-serif; }
        .display-italic { font-family: 'Bricolage Grotesque', sans-serif; font-style: italic; }
        .booking-page input, .booking-page textarea { color: #f2f2f0; outline: none; }
        .booking-page input:focus, .booking-page textarea:focus { border-color: ${ACCENT}; }
        .booking-page button:focus-visible, .booking-page a:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 3px; }
        .date-card, .time-card { transition: border-color .2s ease, background .2s ease, transform .2s ease; }
        .date-card:hover, .time-card:hover { transform: translateY(-2px); }
      `}</style>
      <Cursor />
      <Nav />
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-40">
        <Reveal>
          <a href="/" className="inline-flex items-center gap-2 text-sm mb-12" style={{ color: DIM }}><ArrowLeft size={15} /> Back to portfolio</a>
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: ACCENT }}>Book a call</p>
          <h1 className="display font-bold text-4xl md:text-7xl leading-[1.02] max-w-4xl">Let&apos;s make time for <span className="display-italic" style={{ color: ACCENT }}>a good conversation.</span></h1>
          <div className="flex items-center gap-4 mt-8">
            <div
              role="img"
              aria-label="Portrait placeholder"
              className="h-20 w-20 shrink-0 rounded-full"
              style={{ border: `1px solid ${ACCENT}`, background: "transparent" }}
            />
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: DIM }}>Choose a time that works for you, then send a little context so I can come prepared.</p>
          </div>
        </Reveal>

        <section className="grid lg:grid-cols-[1.15fr_.85fr] gap-8 mt-20">
          <Reveal>
            <div className="rounded-2xl p-6 md:p-8" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
              <div className="flex items-center justify-between gap-4 mb-8"><div><p className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: ACCENT }}>Availability</p><h2 className="display font-semibold text-2xl">Pick a date</h2></div><CalendarDays size={24} style={{ color: ACCENT }} /></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {dates.map((date) => {
                  const active = date.toDateString() === selectedDate.toDateString();
                  return <button key={date.toISOString()} type="button" className="date-card rounded-xl p-4 text-left" onClick={() => setSelectedDate(date)} style={{ background: active ? ACCENT : "transparent", color: active ? "#0A0A0B" : "#F2F2F0", border: `1px solid ${active ? ACCENT : LINE}` }}><span className="block text-xs uppercase tracking-widest opacity-70">{formatDate(date, { weekday: "short" })}</span><strong className="display block text-2xl mt-2">{formatDate(date, { day: "2-digit" })}</strong><span className="block text-xs mt-1 opacity-70">{formatDate(date, { month: "short" })}</span></button>;
                })}
              </div>
              <div className="border-t mt-8 pt-8" style={{ borderColor: LINE }}><div className="flex items-center gap-2 mb-5"><Clock3 size={17} style={{ color: ACCENT }} /><h3 className="font-medium">Available times</h3><span className="text-xs ml-auto" style={{ color: DIM }}>IST (UTC+5:30)</span></div><div className="grid grid-cols-2 gap-3">{TIMES.map((time) => { const active = time === selectedTime; return <button key={time} type="button" className="time-card rounded-lg py-3 text-sm" onClick={() => setSelectedTime(time)} style={{ background: active ? ACCENT : "transparent", color: active ? "#0A0A0B" : "#F2F2F0", border: `1px solid ${active ? ACCENT : LINE}` }}>{time}{active && <Check size={14} className="inline ml-2" />}</button>; })}</div></div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl p-6 md:p-8 h-full" style={{ border: `1px solid ${LINE}` }}>
              <p className="text-xs uppercase tracking-[0.25em] mb-8" style={{ color: DIM }}>Meeting details</p>
              <div className="space-y-6 text-sm"><div className="flex gap-4"><Video size={18} style={{ color: ACCENT }} /><div><p className="font-medium">Online video call</p><p className="mt-1" style={{ color: DIM }}>A private link will be shared after we confirm.</p></div></div><div className="flex gap-4"><Clock3 size={18} style={{ color: ACCENT }} /><div><p className="font-medium">30 minutes</p><p className="mt-1" style={{ color: DIM }}>{formatDate(selectedDate, { dateStyle: "full" })}<br />{selectedTime} IST</p></div></div><div className="flex gap-4"><MapPin size={18} style={{ color: ACCENT }} /><div><p className="font-medium">Remote and worldwide</p><p className="mt-1" style={{ color: DIM }}>I&apos;m based in Jamtara, India and work remotely.</p></div></div></div>
              <div className="border-t mt-10 pt-6 text-xs leading-relaxed" style={{ borderColor: LINE, color: DIM }}>Good for project briefs, portfolio feedback, collaborations, or simply putting a face to the name.</div>
            </div>
          </Reveal>
        </section>

        <section className="border-t mt-20 pt-20" style={{ borderColor: LINE }}>
          <Reveal><div className="flex items-center gap-3 mb-3"><Mail size={18} style={{ color: ACCENT }} /><p className="text-xs uppercase tracking-[0.3em]" style={{ color: DIM }}>Send a message</p></div><h2 className="display font-bold text-3xl md:text-5xl mb-10">Tell me what&apos;s <span className="display-italic" style={{ color: ACCENT }}>on your mind.</span></h2></Reveal>
          <Reveal delay={100}>
            <form onSubmit={sendMessage} className="grid md:grid-cols-2 gap-5 max-w-4xl">
              <label className="text-xs" style={{ color: DIM }}>Your name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 w-full rounded-lg px-4 py-3 text-sm bg-transparent" style={{ border: `1px solid ${LINE}` }} /></label>
              <label className="text-xs" style={{ color: DIM }}>Email address<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-lg px-4 py-3 text-sm bg-transparent" style={{ border: `1px solid ${LINE}` }} /></label>
              <label className="text-xs md:col-span-2" style={{ color: DIM }}>What would you like to discuss?<textarea required rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 w-full rounded-lg px-4 py-3 text-sm bg-transparent resize-y" style={{ border: `1px solid ${LINE}` }} /></label>
              <div className="md:col-span-2 flex items-center gap-5"><button type="submit" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium" style={{ background: ACCENT, color: "#0A0A0B" }}><Send size={15} /> Send message</button>{sent && <span className="text-xs" style={{ color: DIM }}>Your email app should open with the details filled in.</span>}</div>
            </form>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
