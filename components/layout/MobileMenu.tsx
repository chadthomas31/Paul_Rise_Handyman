'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'
import { createPhoneLink, createEmailLink } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: { name: string; href: string }[]
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigation,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-20 left-0 right-0 bottom-0 bg-white z-50 lg:hidden overflow-y-auto">
        <div className="px-4 py-6">
          {/* Navigation Links */}
          <nav className="space-y-1 mb-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-lg font-medium text-slate-900 hover:bg-ocean-blue-50 hover:text-ocean-blue-600 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Information */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            <a
              href={createPhoneLink(BUSINESS_INFO.phone)}
              className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 text-ocean-blue-500" />
              <div>
                <div className="text-xs text-slate-500">Call or Text</div>
                <div className="font-semibold">{BUSINESS_INFO.phone}</div>
              </div>
            </a>

            <a
              href={createEmailLink(BUSINESS_INFO.email)}
              className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5 text-ocean-blue-500" />
              <div>
                <div className="text-xs text-slate-500">Email</div>
                <div className="font-semibold">{BUSINESS_INFO.email}</div>
              </div>
            </a>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                onClose()
                window.location.href = '/contact'
              }}
            >
              Request a Free Quote
            </Button>
          </div>

          {/* Business Hours */}
          <div className="mt-6 px-4 py-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Business Hours</h3>
            <div className="text-sm text-slate-600 space-y-1">
              <div>{BUSINESS_INFO.hours.weekday}</div>
              <div>{BUSINESS_INFO.hours.saturday}</div>
              <div>{BUSINESS_INFO.hours.sunday}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
