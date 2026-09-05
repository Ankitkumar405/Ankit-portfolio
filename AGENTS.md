# Agent Guidance

## Project

- This is a Vite + React 18 portfolio using Three.js, Tailwind CSS, and `lucide-react`.
- `src/App.jsx` assembles the page sections. Keep reusable interaction and visual logic in `src/components/`.
- Put portfolio content, links, and command-palette items in `src/data.js`; put shared colors and font imports in `src/theme.js`.
- `src/hooks.js` owns shared time and IntersectionObserver-based reveal behavior.

## Commands

- Install dependencies with `npm install`.
- Start local development with `npm run dev`.
- Create the production build with `npm run build`.
- Preview the production build with `npm run preview`.
- There is currently no test or lint script in `package.json`; use the production build as the default validation check.

## Implementation Conventions

- Preserve the existing dark, lime-accented visual language and responsive behavior. Prefer existing theme constants and component patterns over new styling systems.
- Use existing interaction primitives such as `Reveal`, `Magnetic`, `DragRail`, `CopyEmail`, and `CommandPalette` before adding alternatives.
- Keep Three.js scenes self-contained: pause rendering when offscreen, respond to resize, remove event listeners and observers, dispose geometries/materials, dispose the renderer, and remove its canvas on unmount.
- Provide or preserve a `WebGLFallback` for interactive graphics that may fail to initialize in browsers without WebGL.
- Respect touch-device behavior and reduced-motion preferences. Do not assume the custom cursor or hover interactions exist on touch devices.
- Use `lucide-react` icons where an icon is already appropriate, and keep external links' existing `target`/`rel` behavior.
- Keep edits focused. Avoid adding dependencies or changing public component APIs unless the task requires it.

## Validation

- Run `npm run build` after changes affecting React, CSS, data imports, or Three.js components.
- For interaction changes, also manually verify keyboard navigation, command-palette closing, responsive layout, and WebGL fallback behavior when practical.
- Do not commit changes unless explicitly requested.

## Reference

- See [README.md](README.md) for the editable project structure and runtime notes.