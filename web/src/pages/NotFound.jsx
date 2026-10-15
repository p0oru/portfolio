import { Link } from 'react-router'
import { notFoundMeta } from '../seo/pages'

export function meta() {
  return notFoundMeta()
}

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <h1>Page not found</h1>
      <p style={{ color: 'var(--muted)' }}>That page doesn't exist.</p>
      <Link to="/" className="btn-ghost">Back home</Link>
    </div>
  )
}
