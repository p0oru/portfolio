import { rename, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { contentPages } from './src/seo/site.js'

export default {
  appDirectory: 'src',
  ssr: false,
  // getStaticPaths() covers routes without params (incl. /sitemap.xml); /404 renders the catch-all route
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...contentPages(), '/404']
  },
  // Cloudflare Pages serves 404.html with status 404 for unknown paths
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client')
    await rename(join(client, '404', 'index.html'), join(client, '404.html'))
    await rm(join(client, '404'), { recursive: true, force: true })
    await rm(join(client, '__spa-fallback.html'), { force: true })
  },
}
