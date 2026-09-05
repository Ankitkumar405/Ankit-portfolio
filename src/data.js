export const NAV = [
  { id: "about", label: "About", href: "/#about" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "blog", label: "Blog", href: "/blog" },
];

export const MORE_NAV = [
  { id: "profiles", label: "Profiles", href: "/profiles" },
  { id: "gear", label: "Gear", href: "/gear" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const PHILOSOPHY = [
  { label: "Motion", note: "Transitions that explain, not decorate." },
  { label: "Type", note: "Hierarchy you can feel before you read it." },
  { label: "Interaction", note: "Every click gets a response." },
  { label: "Craft", note: "Spacing sweated over, not defaulted." },
];

export const PROJECTS = [
  {
    year: "2025",
    tags: ["HTML", "CSS", "JavaScript"],
    name: "Antriksh",
    nameItalic: "UAV",
    description:
      "Ground-control console for a modular UAV — manual & autonomous flight, delivery routing with live ETA/battery, one-tap rescue requests, and a MAVLink-style telemetry readout.",
    links: [
      { label: "Live Link", href: "https://ankitkumar405.github.io/Antriksh_UAV/" },
      { label: "Source", href: "https://github.com/Ankitkumar405/Antriksh_UAV" },
    ],
    hud: { title: "ANTRIKSH // LIVE", line1: "ALT 124.0m · SPD 12.4m/s", line2: "LINK 98% · BAT 76%", pct: 76 },
  },
  {
    year: "2025",
    tags: ["JavaScript", "Weather API"],
    name: "Weather",
    nameItalic: "Web",
    description:
      "City-based weather lookup with live conditions and forecast data. In progress — deployment link coming soon.",
    links: [],
    hud: { title: "WEATHER // WIP", line1: "28° · CLEAR", line2: "WIND 9 KM/H", pct: 42 },
  },
];

export const SKILLS = ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Three.js", "Figma", "Git", "GitHub", "UI/UX"];

export const PROFILES = [
  { label: "GitHub", detail: "Code, experiments, and shipped work.", href: "https://github.com/Ankitkumar405", icon: "github" },
  { label: "LinkedIn", detail: "Professional updates and collaborations.", href: "https://linkedin.com/in/mr-tony-stark-4a7359333", icon: "linkedin" },
  { label: "Instagram", detail: "Creative work and life between projects.", href: "https://instagram.com/mr._ankit_arya", icon: "instagram" },
  { label: "Spotify", detail: "The soundtrack behind the work.", href: "https://open.spotify.com/", icon: "spotify" },
];

export const TOOLS = [
  { label: "React", detail: "Interactive interfaces" },
  { label: "JavaScript", detail: "Front-end logic" },
  { label: "Three.js", detail: "Web-based 3D" },
  { label: "Tailwind CSS", detail: "Rapid visual systems" },
  { label: "Figma", detail: "Interface prototyping" },
  { label: "Git + GitHub", detail: "Version control" },
  { label: "VS Code", detail: "Daily build space" },
  { label: "Video editing", detail: "Creative storytelling" },
];

export const HARDWARE = [
  { label: "Motorola Edge 30 Fusion", detail: "Daily driver · quick testing and communication", visual: "phone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85" },
  { label: "Lenovo LOQ", detail: "Primary machine · code, design, and 3D experiments", visual: "laptop", image: "https://p3-ofp.static.pub/ShareResource/na/laptops-splitter/results/cards/lenovo-loq-brand-image.png" },
  { label: "ROG keyboard", detail: "Long-form input · writing and daily development", visual: "keyboard", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85" },
  { label: "ROG mouse", detail: "Precision control · layout and interface work", visual: "mouse", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85" },
  { label: "OnePlus headphones", detail: "Focused audio · editing and deep work", visual: "audio", image: "https://www.oneplus.com/content/dam/oasis/page/2022/operation/mar/3-28/in-bullets/1440/new-KV_M.jpg" },
];

export const DEV_TOOLS = [
  { label: "VS Code", detail: "Primary editor for React, JavaScript, CSS, and project work.", role: "Code", logo: "https://cdn.simpleicons.org/visualstudiocode" },
  { label: "Figma", detail: "Wireframes, visual systems, prototypes, and interface exploration.", role: "Design", logo: "https://cdn.simpleicons.org/figma" },
  { label: "Git + GitHub", detail: "Version control, collaboration, source hosting, and deployment history.", role: "Ship", logo: "https://cdn.simpleicons.org/github" },
  { label: "Chrome DevTools", detail: "Inspecting layout, debugging browser behavior, and responsive testing.", role: "Test", logo: "https://cdn.simpleicons.org/googlechrome" },
  { label: "React", detail: "Component architecture for interactive front-end experiences.", role: "Build", logo: "https://cdn.simpleicons.org/react" },
  { label: "Tailwind CSS", detail: "Fast, consistent styling while building responsive interfaces.", role: "Style", logo: "https://cdn.simpleicons.org/tailwindcss" },
  { label: "Three.js", detail: "Interactive 3D scenes, visual experiments, and WebGL prototypes.", role: "Explore", logo: "https://cdn.simpleicons.org/threedotjs" },
  { label: "Lighthouse", detail: "Performance, accessibility, SEO, and quality checks before shipping.", role: "Quality", logo: "https://cdn.simpleicons.org/lighthouse" },
];

export const CMD_ITEMS = [
  { label: "Home", tag: "Section", action: { type: "scroll", target: "top" } },
  { label: "About", tag: "Section", action: { type: "scroll", target: "about" } },
  { label: "Selected Work", tag: "Section", action: { type: "scroll", target: "work" } },
  { label: "Blog", tag: "Page", action: { type: "link", target: "/blog" } },
  { label: "Profiles", tag: "Page", action: { type: "link", target: "/profiles" } },
  { label: "Gear and applications", tag: "Page", action: { type: "link", target: "/gear" } },
  { label: "Book a Call", tag: "Page", action: { type: "link", target: "/book" } },
  { label: "Contact", tag: "Section", action: { type: "scroll", target: "contact" } },
  { label: "Antriksh UAV — Live", tag: "Project", action: { type: "link", target: "https://ankitkumar405.github.io/Antriksh_UAV/" } },
  { label: "Antriksh UAV — Source", tag: "Project", action: { type: "link", target: "https://github.com/Ankitkumar405/Antriksh_UAV" } },
  { label: "Ank Square", tag: "Currently", action: { type: "link", target: "https://www.anksquare.com/" } },
  { label: "Ditvi Foundation", tag: "Currently", action: { type: "link", target: "https://ditvi.org/" } },
  { label: "Email — ankitku2007@gmail.com", tag: "Contact", action: { type: "link", target: "mailto:ankitku2007@gmail.com" } },
  { label: "GitHub", tag: "Contact", action: { type: "link", target: "https://github.com/Ankitkumar405" } },
  { label: "LinkedIn", tag: "Contact", action: { type: "link", target: "https://linkedin.com/in/mr-tony-stark-4a7359333" } },
  { label: "Instagram", tag: "Contact", action: { type: "link", target: "https://instagram.com/mr._ankit_arya" } },
  { label: "Spotify", tag: "Profile", action: { type: "link", target: "https://open.spotify.com/" } },
];

export const CAROUSEL_SLIDES = [
  { big: "AK", caption: "Ankit Kumar" },
  { big: "Building in real time.", caption: "Philosophy" },
  { big: "</>", caption: "Front-End Development" },
  { big: "Always learning.", caption: "Mindset" },
];

export const EXPERIENCE = [
  {
    org: "Ank Square",
    orgItalic: "Square",
    orgPlain: "Ank",
    role: "WEB DESIGN INTERN",
    href: "https://www.anksquare.com/",
    note: "Assisting on client website builds and branding-led web design at a digital services studio.",
  },
  {
    org: "Ditvi Foundation",
    orgItalic: "Foundation",
    orgPlain: "Ditvi",
    role: "VOLUNTEER WEB DEVELOPER",
    href: "https://ditvi.org/",
    note: "Contributing front-end work in support of the foundation's community and education initiatives.",
  },
];

export const BLOG_POSTS = [
  {
    id: "interfaces-that-feel-alive",
    category: "Design",
    date: "Sep 04, 2026",
    readTime: "4 min read",
    title: "Interfaces should feel alive, not busy",
    excerpt: "Motion is most useful when it gives an interface a sense of cause and effect.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85",
    accent: "#D6FF4B",
    body: [
      "The best motion on a website is not the motion you notice first. It is the small response that tells you the interface understood what you did. A button settles. A section arrives at the right moment. A menu opens from the place your attention already is.",
      "When I build an interaction, I start with a question: what should the user understand after this movement finishes? If the answer is nothing, the animation probably does not need to be there.",
      "That approach keeps a page expressive without making it noisy. The details still have personality, but they are working for clarity instead of competing with it.",
    ],
  },
  {
    id: "learning-three-js-by-building",
    category: "Code",
    date: "Aug 28, 2026",
    readTime: "5 min read",
    title: "Learning Three.js by building tiny worlds",
    excerpt: "A practical way to learn 3D for the web: make one small scene, then make it respond.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    accent: "#8BA7FF",
    body: [
      "Three.js becomes less intimidating when the goal is not a complete game or a perfect 3D model. A ring, a cloud of points, or a small clock is enough to teach the important loop: create, update, render, and clean up.",
      "The part I pay most attention to is what happens outside the canvas. A scene should pause when it is offscreen, resize with its container, and release its resources when the component unmounts. Good 3D is also good browser behavior.",
      "Small experiments make the visual side feel playful while the cleanup discipline makes them reliable enough to belong in a real interface.",
    ],
  },
  {
    id: "shipping-before-perfect",
    category: "Process",
    date: "Aug 16, 2026",
    readTime: "3 min read",
    title: "The useful version comes before the perfect version",
    excerpt: "A working first pass reveals more than an over-planned idea ever can.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    accent: "#FF9B71",
    body: [
      "There is a version of a project that exists only in your head. It has no awkward spacing, no broken mobile layout, and no confusing interaction because nobody has used it yet.",
      "Shipping a small version changes that. It gives you real questions: where do people hesitate, which detail matters, and what can disappear without weakening the idea? Those questions are more valuable than another week of guessing.",
      "I try to make the first version honest and small. Then I improve the parts that real use proves are worth improving.",
    ],
  },
];

export const FEEDBACK = [
  {
    label: "Client feedback 01",
    image: "",
    quote: "Add a short client quote here about the clarity, craft, or impact of the work.",
    source: "Your client name · Project name",
  },
  {
    label: "Client feedback 02",
    image: "",
    quote: "Add another note here about the collaboration, process, or final result.",
    source: "Your client name · Project name",
  },
  {
    label: "Client feedback 03",
    image: "",
    quote: "Keep this concise: one honest sentence that gives future clients confidence.",
    source: "Your client name · Project name",
  },
];
