import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle, Award, Users, Heart, Shield, Wrench } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BUSINESS_INFO } from '@/lib/constants'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata(
  'About Paul Ries',
  `Meet Paul Ries, San Clemente's trusted handyman with ${BUSINESS_INFO.yearsInBusiness}+ years of experience. Local resident, licensed professional, and your neighbor who cares about quality work.`,
  '/about',
  ['about paul ries', 'san clemente handyman', 'local handyman', 'licensed handyman']
)

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-ocean text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                Hi, I'm Paul Ries
              </h1>
              <p className="text-xl text-ocean-blue-100 mb-6">
                Your local San Clemente handyman who treats every home like it's my own.
              </p>
              <p className="text-lg text-ocean-blue-50 mb-8">
                I've been helping homeowners in South Orange County for over {BUSINESS_INFO.yearsInBusiness} years.
                What started as helping neighbors fix things has grown into a full-time business
                built on trust, quality work, and fair prices.
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Work With Me
                </Button>
              </Link>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-sunset-amber-400 rounded-2xl transform rotate-3" />
                <Image
                  src="/paul-portrait.jpg"
                  alt="Paul Ries - San Clemente Handyman"
                  width={600}
                  height={600}
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ocean-blue-600 mb-2">
                {BUSINESS_INFO.yearsInBusiness}+
              </div>
              <div className="text-slate-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ocean-blue-600 mb-2">
                {BUSINESS_INFO.completedProjects}+
              </div>
              <div className="text-slate-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ocean-blue-600 mb-2">5.0</div>
              <div className="text-slate-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ocean-blue-600 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="My Story" />
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              I moved to San Clemente in 2010, fell in love with the coastal lifestyle, and never
              looked back. Before starting my handyman business, I worked in construction and
              property maintenance, learning the trades from experienced craftsmen who taught me
              that quality and integrity matter more than speed.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              What I love most about being a handyman is the variety. One day I'm hanging a TV,
              the next I'm building custom shelving or repairing drywall. Every home has its own
              character, and every homeowner has different needs. I take pride in being the person
              people call when they need something done right.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              I live here, my kids go to school here, and I shop at the same stores as you. When
              you hire me, you're not just hiring a contractor – you're hiring a neighbor who
              cares about this community and wants to do right by you.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What I Stand For"
            subtitle="These are the principles that guide every job I take."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <Shield className="w-12 h-12 text-ocean-blue-600 mb-4" />
              <CardTitle className="mb-3">Integrity</CardTitle>
              <CardDescription>
                I give you my honest assessment, even if it means talking you out of unnecessary
                work. Your trust is more valuable than any single job.
              </CardDescription>
            </Card>
            <Card>
              <Award className="w-12 h-12 text-ocean-blue-600 mb-4" />
              <CardTitle className="mb-3">Quality</CardTitle>
              <CardDescription>
                I don't cut corners. If I wouldn't do it in my own home, I won't do it in yours.
                Every job gets the same attention to detail.
              </CardDescription>
            </Card>
            <Card>
              <Users className="w-12 h-12 text-ocean-blue-600 mb-4" />
              <CardTitle className="mb-3">Communication</CardTitle>
              <CardDescription>
                I show up on time, return calls promptly, and keep you updated throughout the
                project. No ghosting, no excuses.
              </CardDescription>
            </Card>
            <Card>
              <Heart className="w-12 h-12 text-ocean-blue-600 mb-4" />
              <CardTitle className="mb-3">Respect</CardTitle>
              <CardDescription>
                Your home is your sanctuary. I treat it with respect, clean up thoroughly, and
                minimize disruption to your daily life.
              </CardDescription>
            </Card>
            <Card>
              <CheckCircle className="w-12 h-12 text-ocean-blue-600 mb-4" />
              <CardTitle className="mb-3">Reliability</CardTitle>
              <CardDescription>
                When I say I'll be there Tuesday at 9am, I'm there Tuesday at 9am. Consistency
                and dependability are the foundation of my business.
              </CardDescription>
            </Card>
            <Card>
              <Wrench className="w-12 h-12 text-ocean-blue-600 mb-4" />
              <CardTitle className="mb-3">Expertise</CardTitle>
              <CardDescription>
                I stay current with building codes, techniques, and tools. Continuous learning
                ensures I'm always providing the best solutions.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                When I'm Not Working...
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                You'll probably find me at the beach with my dog, surfing at T-Street, or
                mountain biking in the hills behind town. I love this community and try to give
                back when I can.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                I volunteer with local youth sports programs and donate my handyman services to
                seniors in need through our church. San Clemente has given me so much – it feels
                good to return the favor.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-700">
                <span className="flex items-center gap-2">
                  <CheckCircle className="text-trust-green-500 h-5 w-5" />
                  Dog lover (ask me about Max!)
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="text-trust-green-500 h-5 w-5" />
                  Youth sports volunteer
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="text-trust-green-500 h-5 w-5" />
                  Avid surfer & cyclist
                </span>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <Image
                src="/paul-dog.jpg"
                alt="Paul with his dog Max"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ocean-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-ocean-blue-100 mb-8">
            Whether it's a quick fix or a full day of projects, I'm here to help. Give me a call
            or request a quote online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Request a Quote
              </Button>
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone.replace(/\D/g, '')}`}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-blue-600">
                Call {BUSINESS_INFO.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
