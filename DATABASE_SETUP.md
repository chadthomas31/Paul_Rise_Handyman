# Database & Email Setup Guide

This guide walks you through setting up Supabase (database) and Resend (email) for the Paul Ries Handyman website.

## 1. Supabase Setup (Free Database)

### Create Account & Project
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click "New Project"
3. Name it "paul-ries-handyman"
4. Set a secure database password (save this!)
5. Choose region: US West (or closest to San Clemente)

### Create the Leads Table
1. Go to **SQL Editor** in Supabase dashboard
2. Run this SQL to create the leads table:

```sql
-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Info
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  
  -- Service Info
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  
  -- AI Analysis (optional)
  ai_category TEXT,
  ai_estimated_hours TEXT,
  ai_complexity TEXT,
  ai_recommendation TEXT,
  
  -- Lead Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'scheduled', 'completed', 'cancelled')),
  notes TEXT,
  quoted_amount DECIMAL(10,2),
  scheduled_date DATE,
  completed_date DATE
);

-- Create index for faster queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from API
CREATE POLICY "Allow insert from API" ON leads
  FOR INSERT WITH CHECK (true);

-- Create policy to allow select/update from authenticated users
CREATE POLICY "Allow all for service role" ON leads
  USING (true)
  WITH CHECK (true);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Get Your API Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (secret) → `SUPABASE_SERVICE_KEY`

⚠️ **Important**: Use the `service_role` key, NOT the `anon` key. The service_role key bypasses RLS.

---

## 2. Resend Setup (Email Notifications)

### Create Account & API Key
1. Go to [resend.com](https://resend.com) and sign up (free tier: 3,000 emails/month)
2. Verify your email address
3. Go to **API Keys** and create a new key
4. Copy the API key → `RESEND_API_KEY`

### Domain Setup (Optional but Recommended)
For production, add your domain for better deliverability:
1. Go to **Domains** → **Add Domain**
2. Add `paulrieshandyman.com`
3. Add the DNS records shown to your domain registrar
4. Wait for verification (usually a few minutes)

Without domain verification, emails will come from `onboarding@resend.dev` (fine for testing).

---

## 3. Environment Variables

### For Local Development
Create a `.env` file in the project root:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbG...your-service-role-key

# Resend
RESEND_API_KEY=re_your-api-key

# Notification recipient
NOTIFICATION_EMAIL=paul@paulrieshandyman.com
```

### For Vercel Deployment
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`

---

## 4. Testing

### Test Locally
```bash
# Start the dev server
npm run dev

# In another terminal, test the API endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "(555) 123-4567",
    "email": "test@example.com",
    "serviceType": "General Repair",
    "description": "Testing the contact form"
  }'
```

### Check Results
1. **Supabase**: Go to Table Editor → leads to see the new entry
2. **Email**: Check Paul's inbox for the notification
3. **Customer Email**: Check test@example.com for confirmation

---

## 5. Viewing Leads in Supabase

### Quick Stats Query
```sql
-- Count leads by status
SELECT status, COUNT(*) 
FROM leads 
GROUP BY status;

-- Recent leads
SELECT name, phone, service_type, created_at 
FROM leads 
ORDER BY created_at DESC 
LIMIT 10;

-- Leads from this week
SELECT * FROM leads 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Export to CSV
1. Go to Table Editor → leads
2. Click the download icon to export all leads

---

## Troubleshooting

### "Failed to process request" error
- Check Vercel function logs for detailed error
- Verify environment variables are set correctly
- Make sure Supabase table exists

### Emails not sending
- Check Resend dashboard for failed sends
- Verify `RESEND_API_KEY` is correct
- Check spam folder

### Database insert failing
- Verify `SUPABASE_SERVICE_KEY` (not anon key)
- Check SQL syntax in table creation
- Look at Supabase logs for errors

