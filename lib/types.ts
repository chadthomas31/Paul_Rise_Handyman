// Service Types
export interface ServiceItem {
  id: string
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  iconName: string
  priceRange: string
  features: string[]
}

// Testimonial Types
export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  rating: number
  date: string
  service: string
}

// Service Area Types
export interface ServiceArea {
  id: string
  name: string
  slug: string
  description: string
  neighborhoods: string[]
  zipCodes: string[]
}

// Form Types
export interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  preferredContact: 'phone' | 'email'
}

export interface QuoteFormData {
  name: string
  email: string
  phone: string
  address: string
  serviceType: string
  description: string
  urgency: 'asap' | 'this-week' | 'this-month' | 'flexible'
  preferredContact: 'phone' | 'email'
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  error?: string
}

// SEO Metadata Types
export interface PageMetadata {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  openGraph?: {
    title: string
    description: string
    image: string
    type: string
  }
  twitter?: {
    card: string
    title: string
    description: string
    image: string
  }
}

// Gallery Types
export interface GalleryItem {
  id: string
  title: string
  description: string
  beforeImage: string
  afterImage: string
  category: string
  date: string
}
