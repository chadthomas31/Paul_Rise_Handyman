import { NextRequest, NextResponse } from 'next/server'
import type { ContactFormData, ApiResponse } from '@/lib/types'

/**
 * API Route: POST /api/contact
 * Handles contact form submissions
 *
 * In production, you would:
 * 1. Send an email via SendGrid, Resend, or similar service
 * 2. Store the submission in a database
 * 3. Send a confirmation email to the user
 * 4. Integrate with a CRM
 */
export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Missing required fields',
          error: 'Please fill in all required fields',
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Invalid email address',
          error: 'Please provide a valid email address',
        },
        { status: 400 }
      )
    }

    // Log the submission (in production, send email and/or save to database)
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
      preferredContact: body.preferredContact,
      timestamp: new Date().toISOString(),
    })

    // TODO: In production, implement email sending
    /*
    // Example with Resend:
    await resend.emails.send({
      from: 'noreply@paulrieshandyman.com',
      to: 'paul@rieshandyman.sc',
      subject: `New Quote Request from ${body.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Service:</strong> ${body.service || 'Not specified'}</p>
        <p><strong>Preferred Contact:</strong> ${body.preferredContact}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    })
    */

    // Return success response
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: 'Thank you for your message! I will get back to you within 2-4 hours.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: 'An error occurred',
        error: 'Unable to process your request. Please call directly at (619) 727-7975.',
      },
      { status: 500 }
    )
  }
}

// Optionally handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
