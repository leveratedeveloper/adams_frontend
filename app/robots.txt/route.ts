// app/robots.txt/route.ts
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = 'https://www.adamsolutions.asia'

  const content = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
  `.trim()

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
