# Ankit Kumar — Portfolio

A dark, interactive portfolio built with React + Three.js. Split into
separate files so it's easy to edit piece by piece.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for deployment (e.g. GitHub Pages, Vercel, Netlify):

```bash
npm run build
```

The output goes to `dist/`.

## Structure

```
src/
  theme.js              colors + font import — edit palette here
  data.js                all content: nav links, projects, skills,
                          experience, command-palette items, carousel text
  hooks.js               useClock, useReveal (scroll-in-view hook)
  App.jsx                 assembles every section
  index.css
  main.jsx                React entry point
  components/
    Nav.jsx               sticky pill nav, active-section highlight,
                           command palette trigger, mobile menu
    Loader.jsx             hold-to-enter intro screen
    CommandPalette.jsx     ⌘K / Ctrl+K jump-to-section & links
    Cursor.jsx              custom lag cursor (desktop only)
    Magnetic.jsx            magnetic-pull button wrapper
    Reveal.jsx              scroll-triggered fade/slide-in wrapper
    Starfield.jsx           Three.js particle field (hero background)
    Clock3D.jsx              Three.js 3D analog clock (real local time)
    Globe.jsx                Three.js dot-sphere globe with India marker
    SkillsOrbit.jsx          Three.js orbiting ring of skill labels
    PhoneMockup.jsx          device-frame project preview card
    DragRail.jsx             drag-to-scroll horizontal container
    CopyEmail.jsx            tap-to-copy email (large + compact variants)
    DiagonalRibbon.jsx       rotated scrolling marquee strip
    Carousel.jsx             auto-advancing slide carousel
```

## Editing your content

Everything you're likely to want to change lives in **`src/data.js`**:
projects, experience entries, skills list, and the command-palette
shortcuts. Colors live in **`src/theme.js`**.

## Notes

- No GSAP dependency — all motion (scroll reveals, magnetic buttons,
  drag-to-scroll) is built with plain React + `IntersectionObserver` +
  `requestAnimationFrame`.
- Three.js scenes (`Starfield`, `Clock3D`, `Globe`, `SkillsOrbit`) each
  pause rendering when scrolled out of view and fully clean up on
  unmount, so they're safe to leave running.
- The custom cursor and hold-to-enter loader are skipped automatically
  on touch devices.
