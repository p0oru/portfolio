import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './styles/global.scss'

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#d97706" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        {/* Google Fonts: Futuristic + Modern */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
        <script defer src="https://metrics.puru.live/script.js" data-website-id="d511bbab-b7f0-415c-9ce4-217dab667447"></script>
      </head>
      <body>
        {/* #root keeps global.scss's `html, body, #root { height: 100% }` rule working */}
        <div id="root">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
