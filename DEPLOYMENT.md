# 🚀 Deployment Guide: Paul Ries Handyman Services

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Image Preparation](#image-preparation)
4. [Local Development](#local-development)
5. [Vercel Deployment](#vercel-deployment)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Email Integration](#email-integration)
8. [SEO Configuration](#seo-configuration)
9. [Performance Optimization](#performance-optimization)
10. [Monitoring & Analytics](#monitoring--analytics)

---

## Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Vercel Account** (free tier is fine)
- **Git** for version control
- **Domain name** (optional but recommended)

---

## Environment Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd paul-ries-handyman

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your actual values:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://www.paulrieshandyman.com

# Email (choose one service)
RESEND_API_KEY=your_resend_api_key_here
NOTIFICATION_EMAIL=paul@rieshandyman.sc

# Optional but recommended
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Image Preparation

### Required Images

Place these images in the `public/` directory:

1. **paul-dog.jpg** (Hero section) - 1920x1080px
2. **paul-framing.jpg** (About section) - 1200x800px
3. **paul-portrait.jpg** (About page hero) - 800x800px
4. **og-image.jpg** (Social sharing) - 1200x630px
5. **twitter-card.jpg** (Twitter sharing) - 1200x600px
6. **favicon.ico** (Browser icon) - 32x32px

### Recommended Image Specs

- Format: JPEG or WebP
- Quality: 85-90%
- Optimization: Use ImageOptim or TinyPNG
- Naming: lowercase, hyphens only

### Gallery Images (Optional)

Add before/after project photos in `public/gallery/`:
- drywall-before.jpg / drywall-after.jpg
- shelves-before.jpg / shelves-after.jpg
- paint-before.jpg / paint-after.jpg
- etc.

---

## Local Development

### Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### Test Build Locally

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

---

## Vercel Deployment

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 2: Git Integration (Easiest)

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

2. Connect to Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. Add environment variables in Vercel dashboard

4. Click "Deploy"

### Method 3: Drag & Drop

1. Build locally:
```bash
npm run build
```

2. Drag `.next` folder to Vercel dashboard

---

## Post-Deployment Checklist

### ✅ Immediate Tasks

- [ ] Test all pages (Home, Services, About, Contact, etc.)
- [ ] Submit contact form test
- [ ] Verify mobile responsiveness
- [ ] Check all images load correctly
- [ ] Test phone number click-to-call
- [ ] Verify email links work

### ✅ SEO Setup

- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Analytics tracking
- [ ] Test Open Graph images (Facebook debugger)
- [ ] Check Twitter Card validator
- [ ] Submit to Bing Webmaster Tools
- [ ] Create Google My Business listing
- [ ] Add business to local directories (Yelp, HomeAdvisor, etc.)

### ✅ Domain Configuration

1. **Custom Domain Setup** (if using):
   - In Vercel dashboard, go to Domains
   - Add your domain: `www.paulrieshandyman.com`
   - Configure DNS:
     ```
     CNAME www -> cname.vercel-dns.com
     A @ -> 76.76.21.21
     ```

2. **SSL Certificate**:
   - Automatically provisioned by Vercel
   - Verify HTTPS is working

---

## Email Integration

### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to `.env.local`:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

4. Update contact form API route:
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'noreply@paulrieshandyman.com',
  to: process.env.NOTIFICATION_EMAIL!,
  subject: `New Quote Request from ${body.name}`,
  html: `...`
})
```

### Option 2: SendGrid

```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

await sgMail.send({
  to: process.env.NOTIFICATION_EMAIL!,
  from: 'noreply@paulrieshandyman.com',
  subject: `New Quote Request`,
  html: `...`
})
```

### Option 3: Gmail SMTP (Simple but limited)

Use Nodemailer with Gmail app password.

---

## SEO Configuration

### Google Search Console

1. Visit [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `www.paulrieshandyman.com`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://www.paulrieshandyman.com/sitemap.xml`

### Google My Business

1. Create/claim listing
2. Add business info:
   - Name: Paul Ries Handyman Services
   - Category: Handyman
   - Service area: San Clemente, Dana Point, San Juan Capistrano
   - Phone: (619) 727-7975
3. Upload photos
4. Collect reviews

### Local SEO

1. **Yelp**: Create business page
2. **HomeAdvisor**: Sign up for pro account
3. **Thumbtack**: Create profile
4. **Nextdoor**: Join as local business
5. **Angi** (formerly Angie's List)

---

## Performance Optimization

### Current Optimizations

✅ Next.js Image component for automatic optimization
✅ Tailwind CSS purging unused styles
✅ TypeScript strict mode
✅ Code splitting via Next.js
✅ Automatic static optimization

### Additional Recommendations

1. **Enable Vercel Analytics**:
```bash
npm install @vercel/analytics
```

2. **Add Font Optimization**:
Already configured with `next/font/google`

3. **Compression**:
Automatically handled by Vercel

4. **Caching**:
Configure in `next.config.js` (already set)

---

## Monitoring & Analytics

### Google Analytics 4

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
```bash
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

4. Add to `app/layout.tsx`:
```typescript
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
  strategy="afterInteractive"
/>
```

### Vercel Analytics (Recommended)

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

<Analytics />
```

### Error Tracking (Optional)

Consider Sentry for production error monitoring:
```bash
npm install @sentry/nextjs
```

---

## Maintenance & Updates

### Regular Tasks

**Weekly:**
- Check contact form submissions
- Respond to inquiries
- Monitor site uptime

**Monthly:**
- Review Google Analytics
- Update service listings
- Add new project photos to gallery
- Check for broken links

**Quarterly:**
- Update testimonials
- Review and update pricing
- Check competitor websites
- Update SEO strategy

---

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Image Optimization Errors

- Verify images are in `public/` directory
- Check image file names (lowercase, no spaces)
- Ensure images aren't too large (< 5MB)

### Environment Variable Issues

- Verify variables in Vercel dashboard
- Redeploy after adding new variables
- Check variable names (NEXT_PUBLIC_ prefix for client-side)

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev

---

## 🎉 Deployment Complete!

Your website is now live and optimized for:
- ✅ Maximum performance
- ✅ SEO dominance in San Clemente
- ✅ Lead generation
- ✅ Mobile-first experience
- ✅ Professional trust-building

**Next Steps:**
1. Share website with friends and family
2. Add to business cards
3. Update social media profiles
4. Start collecting reviews
5. Monitor and optimize based on analytics

Good luck with your handyman business! 🔨🏡
