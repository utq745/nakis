import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.approvalstitch.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/dashboard/',
                    '/tr/panel/',
                    '/orders/',
                    '/tr/siparisler/',
                    '/customers/',
                    '/tr/musteriler/',
                    '/reports/',
                    '/tr/raporlar/',
                    '/settings/',
                    '/tr/ayarlar/',
                    '/api/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/dashboard/',
                    '/tr/panel/',
                    '/orders/',
                    '/tr/siparisler/',
                    '/api/',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
