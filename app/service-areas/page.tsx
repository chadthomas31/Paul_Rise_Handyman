import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SERVICE_AREAS, BUSINESS_INFO } from '@/lib/constants'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata(
  'Service Areas',
  `${BUSINESS_INFO.name} serves San Clemente, Dana Point, San Juan Capistrano, and surrounding South Orange County areas. ${BUSINESS_INFO.serviceRadius} service radius.`,
  '/service-areas',
  [
    'san clemente handyman',
    'dana point handyman',
    'san juan capistrano handyman',
    'south orange county handyman',
  ]
)

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-ocean text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-extrabold">Service Areas</h1>
            </div>
            <p className="text-xl text-ocean-blue-100">
              Proudly serving South Orange County communities within {BUSINESS_INFO.serviceRadius}{' '}
              of San Clemente. If you're not sure if I serve your area, just give me a call!
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_AREAS.map((area) => (
              <Card key={area.id} hover>
                <div className="bg-ocean-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-ocean-blue-600" />
                </div>
                <CardTitle className="mb-3">{area.name}</CardTitle>
                <CardDescription className="mb-4">{area.description}</CardDescription>

                <h4 className="font-semibold text-slate-900 mb-2 text-sm">
                  Neighborhoods Served:
                </h4>
                <ul className="space-y-1 mb-4">
                  {area.neighborhoods.map((neighborhood, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-trust-green-500 flex-shrink-0" />
                      {neighborhood}
                    </li>
                  ))}
                </ul>

                <div className="text-xs text-slate-500">
                  Zip Codes: {area.zipCodes.join(', ')}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Being Local Matters"
            subtitle="I'm not just working in San Clemente - I live here."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardTitle className="mb-3">🏖️ I Know the Area</CardTitle>
              <CardDescription>
                I understand how coastal climate affects homes here. Salt air, moisture, and
                temperature swings require specific materials and techniques.
              </CardDescription>
            </Card>

            <Card>
              <CardTitle className="mb-3">⚡ Fast Response Times</CardTitle>
              <CardDescription>
                Living locally means I can get to you quickly. Most service calls are within
                15-20 minutes of my home base.
              </CardDescription>
            </Card>

            <Card>
              <CardTitle className="mb-3">🤝 Community Investment</CardTitle>
              <CardDescription>
                My reputation is built right here. Your neighbors are my neighbors, and word of
                mouth is everything in a tight-knit community.
              </CardDescription>
            </Card>

            <Card>
              <CardTitle className="mb-3">📍 Easy to Reach</CardTitle>
              <CardDescription>
                No long drives from other counties. I'm here, available, and committed to
                serving this community for the long haul.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Coverage Area"
            subtitle="Serving a 20-mile radius from San Clemente"
          />

          <div className="bg-slate-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-slate-600">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Interactive Map Placeholder</p>
              <p className="text-sm mt-2">
                In production: Embed Google Maps showing service radius
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Not Sure If I Serve Your Area?
          </h2>
          <p className="text-xl text-ocean-blue-100 mb-8">
            Give me a call! I may be able to accommodate projects slightly outside my usual
            service radius, especially for larger jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Me
              </Button>
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone.replace(/\D/g, '')}`}>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-ocean-blue-600"
              >
                Call {BUSINESS_INFO.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
