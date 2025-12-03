import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Paul's email for notifications
const PAUL_EMAIL = process.env.PAUL_EMAIL || 'paul@fixitsanclemente.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'quotes@fixitsanclemente.com';

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function escapeHtmlWithLineBreaks(text: string): string {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, address, serviceType, description, aiAnalysis } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please fill in all required fields (name, phone, email, description)' 
      });
    }

    // Validate serviceType
    const validServiceTypes = [
      'General Repair',
      'Drywall & Painting', 
      'Plumbing (Light)',
      'Electrical (Light)',
      'Furniture Assembly',
      'Mounting & Hanging',
      'Other'
    ];
    
    const finalServiceType = validServiceTypes.includes(serviceType) ? serviceType : 'General Repair';

    let leadId = null;
    let emailSent = false;
    let confirmationEmailSent = false;

    // Store in Supabase if configured
    if (supabase) {
      const { data, error: dbError } = await supabase
        .from('leads')
        .insert([
          {
            name,
            phone,
            email,
            address: address || null,
            service_type: finalServiceType,
            description,
            ai_analysis: aiAnalysis || null,
            status: 'new',
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (dbError) {
        console.error('Supabase error:', dbError);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to save your request. Please call Paul directly at (619) 727-7975.' 
        });
      }
      
      leadId = data?.id;
    }

    // Send email notification to Paul if Resend is configured
    if (resend) {
      try {
        // Email to Paul
        await resend.emails.send({
          from: FROM_EMAIL,
          to: PAUL_EMAIL,
          subject: `🔧 New Quote Request: ${escapeHtml(finalServiceType)} - ${escapeHtml(name)}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e3a5f; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">New Quote Request</h1>
              </div>
              <div style="padding: 20px; background: #f8f9fa;">
                <h2 style="color: #1e3a5f; margin-top: 0;">Customer Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6; font-weight: bold;">Name:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6; font-weight: bold;">Phone:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6; font-weight: bold;">Email:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6; font-weight: bold;">Address:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">${escapeHtml(address || 'Not provided')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6; font-weight: bold;">Service:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">${escapeHtml(finalServiceType)}</td>
                  </tr>
                </table>
                
                <h2 style="color: #1e3a5f; margin-top: 20px;">Project Description</h2>
                <p style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                  ${escapeHtmlWithLineBreaks(description)}
                </p>
                
                ${aiAnalysis ? `
                  <h2 style="color: #1e3a5f; margin-top: 20px;">AI Analysis</h2>
                  <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <p><strong>Category:</strong> ${escapeHtml(aiAnalysis.category || 'N/A')}</p>
                    <p><strong>Complexity:</strong> ${escapeHtml(aiAnalysis.complexity || 'N/A')}</p>
                    <p><strong>Est. Time:</strong> ${escapeHtml(aiAnalysis.estimatedHours || 'N/A')}</p>
                    <p><strong>Recommendation:</strong> ${escapeHtml(aiAnalysis.recommendation || 'N/A')}</p>
                  </div>
                ` : ''}
                
                <div style="margin-top: 20px; text-align: center;">
                  <a href="tel:${escapeHtml(phone)}" style="display: inline-block; background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    📞 Call ${escapeHtml(name)}
                  </a>
                </div>
              </div>
              <div style="background: #1e3a5f; color: white; padding: 10px; text-align: center; font-size: 12px;">
                Fix It San Clemente • fixitsanclemente.com
              </div>
            </div>
          `
        });
        emailSent = true;

        // Confirmation email to customer
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: `Thanks for your quote request! - Fix It San Clemente`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e3a5f; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Thanks, ${escapeHtml(name)}!</h1>
              </div>
              <div style="padding: 20px; background: #f8f9fa;">
                <p style="font-size: 16px;">I received your quote request and will get back to you within 24 hours (usually much sooner!).</p>
                
                <h2 style="color: #1e3a5f;">Your Request Summary</h2>
                <div style="background: white; padding: 15px; border-radius: 8px;">
                  <p><strong>Service:</strong> ${escapeHtml(finalServiceType)}</p>
                  <p><strong>Description:</strong> ${escapeHtmlWithLineBreaks(description)}</p>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
                  <p style="margin: 0; font-weight: bold;">Need it done ASAP?</p>
                  <p style="margin: 5px 0 0 0;">Call me directly: <a href="tel:6197277975">(619) 727-7975</a></p>
                </div>
                
                <p style="margin-top: 20px; color: #64748b; font-size: 14px;">
                  - Paul Ries<br>
                  Fix It San Clemente<br>
                  Your Local Handyman
                </p>
              </div>
              <div style="background: #1e3a5f; color: white; padding: 10px; text-align: center; font-size: 12px;">
                <a href="https://fixitsanclemente.com" style="color: #f59e0b;">fixitsanclemente.com</a> • (619) 727-7975
              </div>
            </div>
          `
        });
        confirmationEmailSent = true;
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the request if email fails - the lead is saved
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Quote request received! Paul will contact you soon.',
      leadId,
      emailSent,
      confirmationEmailSent
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Something went wrong. Please call Paul directly at (619) 727-7975.' 
    });
  }
}

