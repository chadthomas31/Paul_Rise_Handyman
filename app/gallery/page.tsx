import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BUSINESS_INFO } from '@/lib/constants'
import { generatePageMetadata } from '@/lib/seo'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata(
  'Project Gallery',
  `View completed handyman projects by ${BUSINESS_INFO.owner}. See before & after photos of drywall repairs, painting, furniture assembly, and more in San Clemente.`,
  '/gallery',
  ['handyman gallery', 'before after photos', 'project portfolio']
)

// Sample gallery data - in production, this would come from a CMS or database
const galleryProjects = [
  {
    id: '1',
    title: 'Living Room Drywall Repair',
    category: 'Drywall & Painting',
    beforeImage: '/gallery/drywall-before.jpg',
    afterImage: '/gallery/drywall-after.jpg',
    description: 'Repaired water damage and matched texture perfectly.',
  },
  {
    id: '2',
    title: 'Custom Floating Shelves',
    category: 'Mounting & Installation',
    beforeImage: '/gallery/shelves-before.jpg',
    afterImage: '/gallery/shelves-after.jpg',
    description: 'Installed custom oak floating shelves in home office.',
  },
  {
    id: '3',
    title: 'Bedroom Paint Transformation',
    category: 'Painting',
    beforeImage: '/gallery/paint-before.jpg',
    afterImage: '/gallery/paint-after.jpg',
    description: 'Complete bedroom repaint with accent wall.',
  },
  {
    id: '4',
    title: 'IKEA Wardrobe Assembly',
    category: 'Furniture Assembly',
    beforeImage: '/gallery/ikea-before.jpg',
    afterImage: '/gallery/ikea-after.jpg',
    description: 'Assembled and anchored PAX wardrobe system.',
  },
  {
    id: '5',
    title: '75" TV Wall Mount',
    category: 'Mounting & Hanging',
    beforeImage: '/gallery/tv-before.jpg',
    afterImage: '/gallery/tv-after.jpg',
    description: 'Mounted TV with concealed cable management.',
  },
  {
    id: '6',
    title: 'Garage Organization',
    category: 'Hauling & Cleanup',
    beforeImage: '/gallery/garage-before.jpg',
    afterImage: '/gallery/garage-after.jpg',
    description: 'Cleared and organized two-car garage.',
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-ocean text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Project Gallery</h1>
            <p className="text-xl text-ocean-blue-100">
              Take a look at recent projects from around San Clemente. Every job gets the same
              attention to detail, whether it's a small repair or a full-day project.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Before & After"
            subtitle="See the quality of work for yourself."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {galleryProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-coastal overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                    <Badge variant="info">{project.category}</Badge>
                  </div>

                  {/* Before/After Images */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        BEFORE
                      </div>
                      <Image
                        src={project.beforeImage}
                        alt={`${project.title} - Before`}
                        width={400}
                        height={300}
                        className="rounded-lg w-full h-64 object-cover"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute top-2 left-2 z-10 bg-trust-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        AFTER
                      </div>
                      <Image
                        src={project.afterImage}
                        alt={`${project.title} - After`}
                        width={400}
                        height={300}
                        className="rounded-lg w-full h-64 object-cover"
                      />
                    </div>
                  </div>

                  <p className="text-slate-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note about placeholder images */}
          <div className="mt-12 text-center">
            <div className="bg-sunset-amber-50 border border-sunset-amber-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-slate-700">
                <strong>Note:</strong> These are placeholder images. In production, you would
                replace these with actual project photos. I recommend taking before and after
                photos of every job to build an impressive portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Let's Start Your Project"
            subtitle="Whether it's a quick fix or a full transformation, I'm here to help."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Request a Free Quote
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
