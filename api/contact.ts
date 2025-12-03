import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Paul's email for notifications
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'paul@paulrieshandyman.com';

/**
 * Escapes HTML special characters to prevent XSS attacks
 * Must be used on all user-supplied data before embedding in HTML
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Escapes HTML and converts newlines to <br> tags for display
 */
function escapeHtmlWithLineBreaks(unsafe: string): string {
  return escapeHtml(unsafe).replace(/\n/g, '<br>');
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  address?: string;
  serviceType: string;
  description: string;
  aiAnalysis?: {
    category: string;
    estimatedHours: string;
    complexity: string;
    recommendation: string;
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: ContactFormData = req.body;

    // Validate required fields
    if (!data.name || !data.phone || !data.email || !data.serviceType || !data.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Sanitize all user inputs for HTML embedding
    const sanitized = {
      name: escapeHtml(data.name),
      firstName: escapeHtml(data.name.split(' ')[0]),
      phone: escapeHtml(data.phone),
      email: escapeHtml(data.email),
      address: data.address ? escapeHtml(data.address) : null,
      serviceType: escapeHtml(data.serviceType),
      description: escapeHtmlWithLineBreaks(data.description),
      descriptionShort: escapeHtml(data.description.substring(0, 100)) + (data.description.length > 100 ? '...' : ''),
      aiAnalysis: data.aiAnalysis ? {
        category: escapeHtml(data.aiAnalysis.category),
        estimatedHours: escapeHtml(data.aiAnalysis.estimatedHours),
        complexity: escapeHtml(data.aiAnalysis.complexity),
        recommendation: escapeHtml(data.aiAnalysis.recommendation),
      } : null,
    };

    // 1. Save to Supabase database
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address || null,
          service_type: data.serviceType,
          description: data.description,
          ai_category: data.aiAnalysis?.category || null,
          ai_estimated_hours: data.aiAnalysis?.estimatedHours || null,
          ai_complexity: data.aiAnalysis?.complexity || null,
          ai_recommendation: data.aiAnalysis?.recommendation || null,
          status: 'new',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    // If database save fails, return error - don't proceed with misleading success
    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        error: 'Failed to save your request. Please call Paul directly at (619) 727-7975.',
        details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }

    // 2. Send email notification to Paul
    const aiInfo = sanitized.aiAnalysis
      ? `
        <h3 style="color: #2563eb; margin-top: 20px;">🤖 AI Assessment</h3>
        <ul style="background: #f0f9ff; padding: 15px 25px; border-radius: 8px;">
          <li><strong>Category:</strong> ${sanitized.aiAnalysis.category}</li>
          <li><strong>Estimated Time:</strong> ${sanitized.aiAnalysis.estimatedHours}</li>
          <li><strong>Complexity:</strong> ${sanitized.aiAnalysis.complexity}</li>
          <li><strong>Recommendation:</strong> ${sanitized.aiAnalysis.recommendation}</li>
        </ul>
      `
      : '';

    const emailResult = await resend.emails.send({
      from: 'Paul Ries Handyman <notifications@paulrieshandyman.com>',
      to: [NOTIFICATION_EMAIL],
      subject: `🔧 New Quote Request from ${sanitized.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">New Quote Request!</h1>
            <p style="color: #bfdbfe; margin: 10px 0 0;">From paulrieshandyman.com</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <h2 style="color: #1e293b; margin-top: 0;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">${sanitized.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <a href="tel:${sanitized.phone}" style="color: #2563eb;">${sanitized.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <a href="mailto:${sanitized.email}" style="color: #2563eb;">${sanitized.email}</a>
                </td>
              </tr>
              ${sanitized.address ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Address:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">${sanitized.address}</td>
              </tr>
              ` : ''}
            </table>
            
            <h3 style="color: #1e293b; margin-top: 25px;">Service Requested</h3>
            <p style="background: #fef3c7; padding: 10px 15px; border-radius: 6px; display: inline-block; font-weight: bold; color: #92400e;">
              ${sanitized.serviceType}
            </p>
            
            <h3 style="color: #1e293b; margin-top: 20px;">Project Description</h3>
            <p style="background: #f8fafc; padding: 15px; border-radius: 8px; color: #475569; line-height: 1.6;">
              ${sanitized.description}
            </p>
            
            ${aiInfo}
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">
            
            <div style="text-align: center;">
              <a href="tel:${sanitized.phone}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-right: 10px;">
                📞 Call ${sanitized.firstName}
              </a>
              <a href="mailto:${sanitized.email}" style="display: inline-block; background: #64748b; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                ✉️ Send Email
              </a>
            </div>
            
            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 25px;">
              Lead ID: ${lead.id} • Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
            </p>
          </div>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error('Email error:', emailResult.error);
      // Log but don't fail - the lead was saved successfully
    }

    // 3. Send confirmation email to customer
    const customerEmailResult = await resend.emails.send({
      from: 'Paul Ries Handyman <noreply@paulrieshandyman.com>',
      to: [data.email], // Use original email for delivery
      subject: `Thanks for contacting Paul Ries Handyman!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">Thanks for reaching out!</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #1e293b;">Hi ${sanitized.firstName},</p>
            
            <p style="color: #475569; line-height: 1.6;">
              I received your quote request and will get back to you within 24 hours (usually much sooner!).
            </p>
            
            <p style="color: #475569; line-height: 1.6;">
              If this is urgent, feel free to call or text me directly at <a href="tel:6197277975" style="color: #2563eb; font-weight: bold;">(619) 727-7975</a>.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e293b;">Your Request Summary:</h3>
              <p style="margin: 5px 0; color: #64748b;"><strong>Service:</strong> ${sanitized.serviceType}</p>
              <p style="margin: 5px 0; color: #64748b;"><strong>Description:</strong> ${sanitized.descriptionShort}</p>
            </div>
            
            <p style="color: #475569;">
              Looking forward to helping you!<br><br>
              <strong>Paul Ries</strong><br>
              Paul Ries Handyman Services<br>
              San Clemente, CA
            </p>
          </div>
        </div>
      `,
    });

    if (customerEmailResult.error) {
      console.error('Customer email error:', customerEmailResult.error);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Quote request submitted successfully',
      leadId: lead.id,
      emailSent: !emailResult.error,
      confirmationEmailSent: !customerEmailResult.error
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
