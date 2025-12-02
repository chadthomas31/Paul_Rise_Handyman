import React from 'react'
import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { TESTIMONIALS, BUSINESS_INFO } from '@/lib/constants'
import { generatePageMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata(
  'Customer Reviews',
  `Read verified customer reviews for ${BUSINESS_INFO.name}. See why San Clemente homeowners trust Paul Ries for all their handyman needs.`,
  '/reviews',
  ['handyman reviews', 'customer testimonials', 'san clemente handyman reviews']
)

export default function ReviewsPage() {
  const averageRating = (
    TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
  ).toFixed(1)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-ocean text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Customer Reviews</h1>
            <p className="text-xl text-ocean-blue-100 mb-8">
              Don't just take my word for it. Here's what your neighbors have to say.
            </p>

            {/* Rating Summary */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 inline-block">
              <div className="text-6xl font-extrabold mb-2">{averageRating}</div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-sunset-amber-400 fill-current" />
                ))}
              </div>
              <div className="text-ocean-blue-100 text-lg">
                Based on {TESTIMONIALS.length} verified reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} hover>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{testimonial.name}</h3>
                    <p className="text-sm text-slate-500">{testimonial.location}</p>
                  </div>
                  <Badge variant="success">
                    {testimonial.rating}.0 ★
                  </Badge>
                </div>

                <div className="flex text-sunset-amber-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-sm text-slate-600 font-medium">
                    Service: {testimonial.service}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatDate(testimonial.date)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Ready to Add Your Review?"
            subtitle="First, let's get your project done. Contact me today for a free quote."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Request a Quote
              </Button>
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone.replace(/\D/g, '')}`}>
              <Button variant="outline" size="lg">
                Call {BUSINESS_INFO.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
