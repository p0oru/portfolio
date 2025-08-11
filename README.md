Portfolio website (React + Vite)

How to run

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`

Customize content

- Update name and nav links in `src/components/Layout/Layout.jsx`.
- Replace social links and email in the header.
- Edit hero text and skill chips in `src/pages/Home.jsx`.
- Add or edit project cards in `src/pages/Projects.jsx`.
- Blog posts live in `src/posts/` as markdown. Use frontmatter fields: `title`, `date`, `tags`, `excerpt`.
- Update resume items in `src/pages/Resume.jsx` and set your PDF URL.

Styling

- Global theme variables are in `src/styles/global.scss` (colors, radii, shadows).
- Each page has a co-located `*.module.scss` file for scoped styles.

Notes

- Pages are routed via `react-router-dom` in `src/App.jsx`.
- Animations use `framer-motion`. Adjust durations in components as desired.
