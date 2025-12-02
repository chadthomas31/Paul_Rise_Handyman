import { BUSINESS_INFO } from './constants'
import type { PageMetadata } from './types'

/**
 * Generate JSON-LD structured data for local business
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BUSINESS_INFO.website,
    name: BUSINESS_INFO.name,
    image: `${BUSINESS_INFO.website}/images/paul-hero.jpg`,
    url: BUSINESS_INFO.website,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.4269,
      longitude: -117.6119,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
    priceRange: '$$',
    sameAs: [],
    areaServed: [
      {
        '@type': 'City',
        name: 'San Clemente',
        '@id': 'https://en.wikipedia.org/wiki/San_Clemente,_California',
      },
      {
        '@type': 'City',
        name: 'Dana Point',
      },
      {
        '@type': 'City',
        name: 'San Juan Capistrano',
      },
    ],
  }
}

/**
 * Generate JSON-LD for a specific service
 */
export function generateServiceSchema(service: {
  title: string
  description: string
  priceRange: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_INFO.name,
    },
    areaServed: {
      '@type': 'City',
      name: 'San Clemente',
    },
    description: service.description,
    offers: {
      '@type': 'Offer',
      priceRange: service.priceRange,
      priceCurrency: 'USD',
    },
  }
}

/**
 * Generate default SEO metadata
 */
export function generateDefaultMetadata(): PageMetadata {
  return {
    title: `${BUSINESS_INFO.name} | ${BUSINESS_INFO.tagline}`,
    description: `Trusted handyman services in San Clemente, Dana Point & San Juan Capistrano. ${BUSINESS_INFO.yearsInBusiness}+ years experience. Licensed & insured. Call ${BUSINESS_INFO.phone} for a free quote.`,
    keywords: [
      'handyman san clemente',
      'san clemente handyman',
      'handyman services',
      'home repairs san clemente',
      'furniture assembly',
      'drywall repair',
      'painting services',
      'dana point handyman',
      'san juan capistrano handyman',
    ],
    canonical: BUSINESS_INFO.website,
    openGraph: {
      title: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`,
      description: 'Licensed, insured handyman serving South Orange County. Call for a free quote!',
      image: `${BUSINESS_INFO.website}/images/og-image.jpg`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: BUSINESS_INFO.name,
      description: 'Your trusted local handyman in San Clemente',
      image: `${BUSINESS_INFO.website}/images/twitter-card.jpg`,
    },
  }
}

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  additionalKeywords: string[] = []
): PageMetadata {
  const defaultMeta = generateDefaultMetadata()

  return {
    title: `${title} | ${BUSINESS_INFO.name}`,
    description,
    keywords: [...defaultMeta.keywords, ...additionalKeywords],
    canonical: `${BUSINESS_INFO.website}${path}`,
    openGraph: {
      ...defaultMeta.openGraph!,
      title,
      description,
    },
    twitter: {
      ...defaultMeta.twitter!,
      title,
      description,
    },
  }
}
