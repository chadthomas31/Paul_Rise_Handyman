import React from 'react'
import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card } from '@/components/ui/Card'
import { BUSINESS_INFO, SERVICE_AREAS } from '@/lib/constants'
import { generatePageMetadata } from '@/lib/seo'
import { createPhoneLink, createEmailLink } from '@/lib/utils'

export const metadata: Metadata = generatePageMetadata(
  'Contact Us',
  `Get in touch with ${BUSINESS_INFO.owner} for a free quote on handyman services. Call ${BUSINESS_INFO.phone} or fill out our contact form. Serving San Clemente & South OC.`,
  '/contact',
  ['contact handyman', 'free quote', 'san clemente handyman contact']
)

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-ocean text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Get In Touch</h1>
            <p className="text-xl text-ocean-blue-100">
              Ready to check items off your to-do list? I typically respond to inquiries within
              2-4 hours during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 gap-12">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 mb-12 lg:mb-0">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>

              {/* Phone */}
              <Card className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-ocean-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-ocean-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                    <a
                      href={createPhoneLink(BUSINESS_INFO.phone)}
                      className="text-ocean-blue-600 hover:text-ocean-blue-700 font-medium text-lg"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                    <p className="text-sm text-slate-600 mt-1">Call or text anytime</p>
                  </div>
                </div>
              </Card>

              {/* Email */}
              <Card className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-ocean-blue-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-ocean-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a
                      href={createEmailLink(BUSINESS_INFO.email)}
                      className="text-ocean-blue-600 hover:text-ocean-blue-700 font-medium break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                    <p className="text-sm text-slate-600 mt-1">I'll respond within hours</p>
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-ocean-blue-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-ocean-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Business Hours</h3>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Mon - Fri:</span>
                        <span className="font-medium">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium">By Appointment</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Service Area */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="bg-ocean-blue-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-ocean-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Service Area</h3>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {SERVICE_AREAS.map((area) => (
                        <li key={area.id}>• {area.name}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-slate-500 mt-3">
                      Serving {BUSINESS_INFO.serviceRadius} from San Clemente
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Common Questions"
            subtitle="Here are answers to the questions I get most often."
          />
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                How quickly can you start my project?
              </h3>
              <p className="text-slate-600">
                For smaller jobs, I can usually schedule within 2-3 days. Larger projects may
                require 1-2 weeks advance notice depending on my current workload.
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Do you offer free estimates?
              </h3>
              <p className="text-slate-600">
                Yes! Phone consultations are always free. For larger projects, I can schedule a
                free on-site estimate to give you an accurate quote.
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                What forms of payment do you accept?
              </h3>
              <p className="text-slate-600">
                I accept cash, check, Venmo, and Zelle. Payment is due upon completion unless we
                arrange otherwise for larger projects.
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Are you licensed and insured?
              </h3>
              <p className="text-slate-600">
                Yes! I carry general liability insurance and follow all California contractor
                guidelines for handyman services.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
