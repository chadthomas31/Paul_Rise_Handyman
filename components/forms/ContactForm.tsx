'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { SERVICES } from '@/lib/constants'
import { isValidEmail, isValidPhone } from '@/lib/utils'
import type { ContactFormData } from '@/lib/types'

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredContact: 'phone',
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const serviceOptions = [
    { value: '', label: 'Select a service...' },
    ...SERVICES.map((service) => ({
      value: service.id,
      label: service.title,
    })),
    { value: 'other', label: 'Other / Multiple Services' },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please describe what you need help with'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          preferredContact: 'phone',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-coastal border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Request a Free Quote
      </h3>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-trust-green-50 border border-trust-green-200 rounded-lg">
          <p className="text-trust-green-800 font-medium">
            ✓ Message sent successfully! I'll get back to you within a few hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">
            There was an error sending your message. Please call me directly at (619) 727-7975.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          name="name"
          label="Your Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="John Smith"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="john@example.com"
          />

          <Input
            type="tel"
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            placeholder="(619) 555-1234"
          />
        </div>

        <Select
          name="service"
          label="Service Needed"
          value={formData.service}
          onChange={handleChange}
          options={serviceOptions}
        />

        <Textarea
          name="message"
          label="Tell me about your project"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          required
          placeholder="Describe what you need help with. Include any relevant details like size, timeline, or specific concerns."
          rows={5}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Preferred Contact Method
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={handleChange}
                className="w-4 h-4 text-ocean-blue-500 focus:ring-ocean-blue-500"
              />
              <span className="ml-2 text-slate-700">Phone</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleChange}
                className="w-4 h-4 text-ocean-blue-500 focus:ring-ocean-blue-500"
              />
              <span className="ml-2 text-slate-700">Email</span>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </Button>

        <p className="text-xs text-slate-500 text-center">
          By submitting this form, you agree to be contacted about your project.
          I typically respond within 2-4 hours during business hours.
        </p>
      </form>
    </div>
  )
}
