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
    if (!data.name || !data.phone || !data.email || !data.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue with email even if DB fails
    }

    // 2. Send email notification to Paul
    const aiInfo = data.aiAnalysis
      ? `
        <h3 style="color: #2563eb; margin-top: 20px;">🤖 AI Assessment</h3>
        <ul style="background: #f0f9ff; padding: 15px 25px; border-radius: 8px;">
          <li><strong>Category:</strong> ${data.aiAnalysis.category}</li>
          <li><strong>Estimated Time:</strong> ${data.aiAnalysis.estimatedHours}</li>
          <li><strong>Complexity:</strong> ${data.aiAnalysis.complexity}</li>
          <li><strong>Recommendation:</strong> ${data.aiAnalysis.recommendation}</li>
        </ul>
      `
      : '';

    const emailResult = await resend.emails.send({
      from: 'Paul Ries Handyman <notifications@paulrieshandyman.com>',
      to: [NOTIFICATION_EMAIL],
      subject: `🔧 New Quote Request from ${data.name}`,
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
                <td style="padding: 8px 0; color: #1e293b;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a>
                </td>
              </tr>
              ${data.address ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Address:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">${data.address}</td>
              </tr>
              ` : ''}
            </table>
            
            <h3 style="color: #1e293b; margin-top: 25px;">Service Requested</h3>
            <p style="background: #fef3c7; padding: 10px 15px; border-radius: 6px; display: inline-block; font-weight: bold; color: #92400e;">
              ${data.serviceType}
            </p>
            
            <h3 style="color: #1e293b; margin-top: 20px;">Project Description</h3>
            <p style="background: #f8fafc; padding: 15px; border-radius: 8px; color: #475569; line-height: 1.6;">
              ${data.description.replace(/\n/g, '<br>')}
            </p>
            
            ${aiInfo}
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">
            
            <div style="text-align: center;">
              <a href="tel:${data.phone}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-right: 10px;">
                📞 Call ${data.name.split(' ')[0]}
              </a>
              <a href="mailto:${data.email}" style="display: inline-block; background: #64748b; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                ✉️ Send Email
              </a>
            </div>
            
            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 25px;">
              Lead ID: ${lead?.id || 'N/A'} • Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
            </p>
          </div>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error('Email error:', emailResult.error);
    }

    // 3. Send confirmation email to customer
    await resend.emails.send({
      from: 'Paul Ries Handyman <noreply@paulrieshandyman.com>',
      to: [data.email],
      subject: `Thanks for contacting Paul Ries Handyman!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">Thanks for reaching out!</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #1e293b;">Hi ${data.name.split(' ')[0]},</p>
            
            <p style="color: #475569; line-height: 1.6;">
              I received your quote request and will get back to you within 24 hours (usually much sooner!).
            </p>
            
            <p style="color: #475569; line-height: 1.6;">
              If this is urgent, feel free to call or text me directly at <a href="tel:6197277975" style="color: #2563eb; font-weight: bold;">(619) 727-7975</a>.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e293b;">Your Request Summary:</h3>
              <p style="margin: 5px 0; color: #64748b;"><strong>Service:</strong> ${data.serviceType}</p>
              <p style="margin: 5px 0; color: #64748b;"><strong>Description:</strong> ${data.description.substring(0, 100)}${data.description.length > 100 ? '...' : ''}</p>
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

    return res.status(200).json({ 
      success: true, 
      message: 'Quote request submitted successfully',
      leadId: lead?.id 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}

