// app/sitemap.xml/route.ts
import { type NextRequest } from 'next/server'
import { getInsightsArticles } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const baseUrl = 'https://www.adamsolutions.asia'

  // Static routes (manually add with dummy dates)
  const staticPages = [
    { path: '', lastmod: new Date() },
    { path: 'insights', lastmod: new Date() }
  ]

  // Dynamic article slugs
  const insights = await getInsightsArticles()
  const articles = insights?.data ?? []

  // Convert articles to sitemap format
  const dynamicPages = articles.map((article: any) => ({
    path: `insights/${article.slug}`,
    lastmod: new Date(article.published_at)
  }))

  const allPages = [...staticPages, ...dynamicPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `<url>
  <loc>${baseUrl}/${page.path}</loc>
  <lastmod>${page.lastmod.toISOString()}</lastmod>
</url>`
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
