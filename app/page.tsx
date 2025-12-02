import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle,
  Phone,
  ArrowRight,
  Hammer,
  Paintbrush,
  Wrench,
  Zap,
  Ruler,
  Truck,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { ContactForm } from '@/components/forms/ContactForm'
import { BUSINESS_INFO, SERVICES, TESTIMONIALS } from '@/lib/constants'
import { createPhoneLink } from '@/lib/utils'

const IconMap = {
  Hammer,
  Paintbrush,
  Wrench,
  Zap,
  Ruler,
  Truck,
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden h-[600px] lg:h-[700px]">
        <div className="absolute inset-0">
          <Image
            src="/paul-dog.jpg"
            alt="Paul Ries and his dog in San Clemente"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="md:w-2/3 lg:w-1/2 py-12">
            <div className="inline-flex items-center rounded-full bg-ocean-blue-600/30 px-3 py-1 text-sm font-semibold text-ocean-blue-100 border border-ocean-blue-400/30 mb-6 backdrop-blur-sm">
              <span>Serving San Clemente & South OC</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md text-shadow">
              Home Repairs Done <span className="text-sunset-amber-400">Right</span>
            </h1>
            <p className="mt-4 text-xl text-slate-100 max-w-2xl mb-8 leading-relaxed drop-shadow-sm font-medium">
              I'm Paul. I fix the things big contractors ignore. Reliable, friendly, and
              local to San Clemente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="shadow-lg"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get a Free Quote
              </Button>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900 bg-white/10 backdrop-blur-sm"
                >
                  View Services
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-white text-sm font-bold shadow-black drop-shadow-md">
              <span className="flex items-center gap-2">
                <CheckCircle className="text-trust-green-400 h-5 w-5" />
                Licensed & Insured
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="text-trust-green-400 h-5 w-5" />
                100% Satisfaction
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="text-trust-green-400 h-5 w-5" />
                Local Resident
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How I Can Help You"
            subtitle="From the 'honey-do' list to urgent repairs, I handle it all with professional care."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const Icon = IconMap[service.iconName as keyof typeof IconMap]
              return (
                <Card key={service.id} hover className="group">
                  <div className="bg-ocean-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-ocean-blue-600 transition-colors">
                    <Icon className="h-7 w-7 text-ocean-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="mb-3">{service.title}</CardTitle>
                  <CardDescription className="mb-4">{service.shortDescription}</CardDescription>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-ocean-blue-600 font-semibold hover:text-ocean-blue-700 inline-flex items-center text-sm"
                  >
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center text-ocean-blue-600 font-semibold hover:text-ocean-blue-700 text-lg"
            >
              See Full Service List <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Local Trust/About Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative mb-12 lg:mb-0">
              <div className="absolute inset-0 bg-ocean-blue-600 rounded-2xl transform rotate-3 opacity-10" />
              <Image
                src="/paul-framing.jpg"
                alt="Paul working on a framing project"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Your Neighbor in San Clemente
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                I've lived in San Clemente for over {BUSINESS_INFO.yearsInBusiness} years. I know
                how the salt air affects our homes, and I know the importance of showing up on
                time.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Unlike big contracting firms, I don't have overhead or salesmen. When you call,
                you speak to Paul. When the work starts, Paul is there.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-ocean-blue-600 mb-1">
                    {BUSINESS_INFO.yearsInBusiness}+
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Years Experience</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-ocean-blue-600 mb-1">
                    {BUSINESS_INFO.completedProjects}+
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Happy Clients</div>
                </div>
              </div>

              <Link href="/about">
                <Button variant="primary">Learn More About Paul</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Neighbors Are Saying" light />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} className="bg-slate-800 border-slate-700">
                <div className="flex text-sunset-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.location}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/reviews">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Read All Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-ocean-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Ready to Fix Your List?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Don't let small repairs turn into big problems. Fill out the form, or give me
                a call. I usually respond within a few hours.
              </p>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-ocean-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-ocean-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Call or Text</p>
                    <a
                      href={createPhoneLink(BUSINESS_INFO.phone)}
                      className="text-xl font-bold text-slate-900 hover:text-ocean-blue-600"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
                <p className="text-sm text-slate-500 ml-16">
                  {BUSINESS_INFO.hours.weekday}
                  <br />
                  {BUSINESS_INFO.hours.saturday}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
