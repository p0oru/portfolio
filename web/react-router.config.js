import { rename } from 'node:fs/promises'
import { join } from 'node:path'
import { contentPages } from './src/seo/site.js'

export default {
  appDirectory: 'src',
  ssr: false,
  // getStaticPaths() covers routes without params (incl. /sitemap.xml); content pages come from the JSON data
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...contentPages()]
  },
  // Cloudflare Pages serves 404.html with status 404 for unknown paths. Using the SPA fallback shell (empty root)
  // lets the client render whichever route matches — a prerendered NotFound page would mismatch on /projects/<unknown>
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client')
    await rename(join(client, '__spa-fallback.html'), join(client, '404.html'))
  },
}
