import type { MetadataRoute } from 'next'
import { getAllArticleMeta } from '@/lib/mdx'

const BASE = 'https://neelbanker.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticleMeta()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/writing`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/resources`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/newsletter`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE}/work-with-me`, lastModified: new Date(), priority: 0.9 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/writing/${a.slug}`,
    lastModified: new Date(a.date),
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
