import { MetadataRoute } from 'next'
import { artworks } from '@/data/artworks'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hookkapaani.com'
    const workPages: MetadataRoute.Sitemap = artworks.map((artwork) => ({
        url: `${baseUrl}/work/${artwork.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/studio`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...workPages,
    ]
}
