import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Hammer, Paintbrush, Wrench, Zap, Ruler, Truck, ArrowRight, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SERVICES, BUSINESS_INFO } from '@/lib/constants'
import { generatePageMetadata } from '@/lib/seo'

const IconMap = {
  Hammer,
  Paintbrush,
  Wrench,
  Zap,
  Ruler,
  Truck,
}

export const metadata: Metadata = generatePageMetadata(
  'Professional Handyman Services',
  `Complete handyman services in San Clemente. From drywall repair to furniture assembly, ${BUSINESS_INFO.owner} handles all your home maintenance needs. Licensed & insured.`,
  '/services',
  ['handyman services san clemente', 'home repair services', 'furniture assembly', 'drywall repair', 'painting services']
)

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-ocean text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="info" className="mb-4 bg-white/20 text-white">
              {SERVICES.length}+ Service Categories
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Professional Handyman Services
            </h1>
            <p className="text-xl text-ocean-blue-100 mb-8">
              No job too small. From quick fixes to full-day projects, I bring {BUSINESS_INFO.yearsInBusiness}+ years
              of experience to every task. Licensed, insured, and local to San Clemente.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Request a Quote
                </Button>
              </Link>
              <a href={`tel:${BUSINESS_INFO.phone.replace(/\D/g, '')}`}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-blue-600">
                  Call Now: {BUSINESS_INFO.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const Icon = IconMap[service.iconName as keyof typeof IconMap]
              return (
                <Card key={service.id} hover className="group">
                  <div className="flex items-start gap-6">
                    <div className="bg-ocean-blue-50 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-blue-600 transition-colors">
                      <Icon className="h-8 w-8 text-ocean-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-2">{service.title}</CardTitle>
                      <Badge variant="info" className="mb-3 text-xs">
                        {service.priceRange}
                      </Badge>
                      <CardDescription className="mb-4">
                        {service.fullDescription}
                      </CardDescription>
                      <CardContent>
                        <h4 className="font-semibold text-slate-900 mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-trust-green-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href={`/services/${service.slug}`} className="inline-flex items-center mt-4 text-ocean-blue-600 font-semibold hover:text-ocean-blue-700">
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Paul Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Paul Ries?"
            subtitle="Here's what makes my handyman services different from the rest."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="text-4xl mb-4">🎯</div>
              <CardTitle className="mb-3">No Upselling</CardTitle>
              <CardDescription>
                I fix what you need fixed. No unnecessary add-ons, no pressure tactics. Just honest work at fair prices.
              </CardDescription>
            </Card>
            <Card>
              <div className="text-4xl mb-4">⚡</div>
              <CardTitle className="mb-3">Fast Response</CardTitle>
              <CardDescription>
                Most quotes within hours, not days. I typically schedule smaller jobs within 2-3 days of your call.
              </CardDescription>
            </Card>
            <Card>
              <div className="text-4xl mb-4">🛡️</div>
              <CardTitle className="mb-3">Licensed & Insured</CardTitle>
              <CardDescription>
                Full liability insurance and worker's comp. Your home is protected, and so is your peace of mind.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Cross Items Off Your To-Do List?
          </h2>
          <p className="text-xl text-ocean-blue-100 mb-8">
            Call or text me today for a free quote. I usually respond within a few hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Request Free Quote
              </Button>
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone.replace(/\D/g, '')}`}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-blue-600">
                {BUSINESS_INFO.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
