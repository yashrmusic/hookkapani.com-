import { MetadataRoute } from 'next'
import { artworks } from '@/data/artworks'
import { caseStudies } from '@/data/case-studies'
import { audiencePages } from '@/data/audience-pages'
import { SITE_URL, absoluteUrl } from '@/lib/seo'
import { artworkUrl } from '@/lib/artwork-utils'

// No lastModified: the data files carry no real edit dates, and a build-time
// timestamp on every URL tells crawlers nothing.
export default function sitemap(): MetadataRoute.Sitemap {
    const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
        url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
        changeFrequency: 'monthly',
        priority,
    })

    return [
        entry('/', 1),
        entry('/commission', 0.9),
        entry('/portfolio', 0.8),
        entry('/case-studies', 0.8),
        entry('/studio', 0.7),
        entry('/press-kit', 0.6),
        entry('/privacy', 0.3),
        ...audiencePages.map((page) => entry(`/for/${page.slug}`, 0.7)),
        ...caseStudies.map((study) => entry(`/case-studies/${study.slug}`, 0.7)),
        // Work URLs use readable slugs only; old numbered URLs are not listed
        // and are permanently redirected in next.config.mjs.
        ...artworks.map((artwork) => ({
            ...entry(artworkUrl(artwork), 0.7),
            images: [absoluteUrl(artwork.imageUrl)],
        })),
    ]
}
