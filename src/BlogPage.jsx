import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronRight, Clock3, Search, Tag, X } from "lucide-react";
import { ACCENT, BG, DIM, FONT_IMPORT, LINE, PANEL } from "./theme";
import { BLOG_POSTS } from "./data";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const categories = ["All", ...new Set(BLOG_POSTS.map((post) => post.category))];
  const filteredPosts = useMemo(() => BLOG_POSTS.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    const searchText = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase());
  }), [category, query]);
  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedPost(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="blog-page min-h-screen" style={{ background: BG, color: "#F2F2F0", fontFamily: "'Inter', sans-serif" }}>
      <style>{`${FONT_IMPORT}
        * { cursor: none; }
        @media (hover: none), (pointer: coarse) { * { cursor: auto; } }
        .display { font-family: 'Bricolage Grotesque', sans-serif; }
        .display-italic { font-family: 'Bricolage Grotesque', sans-serif; font-style: italic; }
        .blog-page button:focus-visible, .blog-page a:focus-visible, .blog-page input:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 3px; }
        .post-card { transition: transform .25s ease, border-color .25s ease, background .25s ease; }
        .post-card:hover { transform: translateY(-5px); border-color: ${ACCENT}88 !important; background: #18181a !important; }
        .featured-glow { box-shadow: inset 0 0 100px rgba(214,255,75,.04); }
        .longform { max-width: 68ch; }
        .image-wash { filter: saturate(.8) contrast(1.05); transition: transform .5s ease, filter .5s ease; }
        .post-card:hover .image-wash { transform: scale(1.04); filter: saturate(1) contrast(1.05); }
      `}</style>
      <Cursor />
      <Nav />
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-28 md:pt-40">
        <Reveal>
          <a href="/" className="inline-flex items-center gap-2 text-sm mb-12" style={{ color: DIM }}><ArrowLeft size={15} /> Back to portfolio</a>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: ACCENT }}>Journal / 2026</p>
              <h1 className="display font-bold text-6xl sm:text-8xl md:text-[9rem] leading-[0.78] tracking-tight">Notes<span className="display-italic" style={{ color: ACCENT }}>.</span></h1>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: DIM }}>Thoughts on front-end development, design, experiments, and learning in public.</p>
          </div>
        </Reveal>

        <section className="border-t mt-20 pt-8" style={{ borderColor: LINE }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
            <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className="rounded-full px-4 py-2 text-xs transition-colors" style={{ background: category === item ? ACCENT : "transparent", color: category === item ? "#0A0A0B" : DIM, border: `1px solid ${category === item ? ACCENT : LINE}` }}>{item}</button>)}</div>
            <label className="flex items-center gap-3 rounded-full px-4 py-2.5" style={{ border: `1px solid ${LINE}`, color: DIM }}><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" aria-label="Search blog notes" className="w-32 bg-transparent text-xs outline-none" /></label>
          </div>

          {featuredPost ? <>
            <Reveal>
              <button type="button" onClick={() => setSelectedPost(featuredPost)} className="post-card featured-glow w-full rounded-2xl p-5 md:p-7 text-left" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
                <div className="grid md:grid-cols-[1fr_300px] gap-8 items-stretch">
                  <div><div className="flex items-center gap-3 mb-8 text-xs" style={{ color: DIM }}><span style={{ color: featuredPost.accent }}>Featured note</span><span>/</span><span>{featuredPost.date}</span><span>/</span><span>{featuredPost.readTime}</span></div><h2 className="display font-bold text-3xl md:text-6xl leading-[0.95] max-w-3xl mb-6">{featuredPost.title}</h2><p className="text-sm leading-relaxed max-w-xl" style={{ color: DIM }}>{featuredPost.excerpt}</p></div>
                  <div className="relative min-h-56 overflow-hidden rounded-xl" style={{ border: `1px solid ${featuredPost.accent}55` }}><img src={featuredPost.image} alt="" className="image-wash absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${featuredPost.accent}55, transparent 60%)` }} /><div className="absolute inset-x-5 bottom-5 flex items-end justify-between"><span className="display text-7xl font-bold" style={{ color: "#fff" }}>01</span><ArrowUpRight size={20} style={{ color: "#fff" }} /></div></div>
                </div>
              </button>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-4 mt-4">{otherPosts.map((post, i) => <PostCard key={post.id} post={post} index={i + 1} onOpen={() => setSelectedPost(post)} />)}</div>
          </> : <div className="rounded-2xl py-20 text-center" style={{ border: `1px solid ${LINE}`, color: DIM }}>No notes match that search.</div>}
        </section>
      </main>

      {selectedPost && <div className="fixed inset-0 z-[160] flex items-start justify-center overflow-y-auto px-4 py-8 md:py-16" style={{ background: "rgba(0,0,0,.78)", backdropFilter: "blur(10px)" }} onClick={() => setSelectedPost(null)}><article className="w-full max-w-3xl rounded-2xl p-5 md:p-10" style={{ background: "#111113", border: `1px solid ${LINE}` }} onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between mb-8"><span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em]" style={{ color: selectedPost.accent }}><Tag size={14} /> {selectedPost.category}</span><button type="button" onClick={() => setSelectedPost(null)} aria-label="Close article" className="rounded-full p-2" style={{ color: DIM, border: `1px solid ${LINE}` }}><X size={17} /></button></div><div className="mb-10 overflow-hidden rounded-xl" style={{ height: 260 }}><img src={selectedPost.image} alt="" className="h-full w-full object-cover" /></div><p className="text-xs mb-4" style={{ color: DIM }}>{selectedPost.date} · {selectedPost.readTime}</p><h2 className="display font-bold text-4xl md:text-6xl leading-[0.95] mb-10">{selectedPost.title}</h2><div className="longform space-y-6 text-base md:text-lg leading-[1.85]" style={{ color: "#c2c2c5" }}>{selectedPost.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="border-t mt-12 pt-6 flex items-center gap-2 text-xs" style={{ borderColor: LINE, color: DIM }}><Clock3 size={14} style={{ color: selectedPost.accent }} /> Written from the build desk</div></article></div>}
    </div>
  );
}

function PostCard({ post, index, onOpen }) {
  return <Reveal delay={index * 80}><button type="button" onClick={onOpen} className="post-card w-full rounded-2xl p-4 text-left" style={{ background: PANEL, border: `1px solid ${LINE}` }}><div className="relative mb-6 h-48 overflow-hidden rounded-xl"><img src={post.image} alt="" className="image-wash h-full w-full object-cover" /><div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${post.accent}44, transparent 65%)` }} /><span className="absolute left-4 top-4 text-xs" style={{ color: "#fff" }}>0{index + 1} / {post.category}</span><ArrowUpRight size={17} className="absolute right-4 top-4" style={{ color: "#fff" }} /></div><div className="px-3 pb-3"><h3 className="display font-semibold text-2xl leading-tight mb-4">{post.title}</h3><p className="text-sm leading-relaxed mb-8" style={{ color: DIM }}>{post.excerpt}</p><div className="flex items-center justify-between text-xs" style={{ color: DIM }}><span>{post.date}</span><span>{post.readTime} <ChevronRight size={13} className="inline" /></span></div></div></button></Reveal>;
}
