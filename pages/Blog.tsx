import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User, Tag, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { PHONE_NUMBER } from '../constants';

// Blog post data - great for SEO
const BLOG_POSTS = [
  {
    id: 'why-hire-trusted-handyman',
    title: 'Why Hiring a Trusted Handyman Can Save You Time, Money and Headaches',
    excerpt: 'Small problems left unattended can turn into major headaches. Learn why hiring a professional handyman (rather than attempting DIY) can save you time, money, and stress.',
    content: `
      Owning a home is rewarding — but it also comes with maintenance, repairs, and unexpected "to-do's." Whether it's a dripping faucet, a squeaky door, a loose shelf, or a drywall crack, small problems left unattended can turn into major headaches. That's where a reliable handyman steps in.

      **The Hidden Cost of DIY: Common Mistakes Homeowners Make**

      Many homeowners try DIY repairs to save money — but often, those small fixes lead to bigger problems. Common pitfalls include:

      - Misdiagnosing the root cause of an issue (e.g., patching drywall without addressing structural movement)
      - Using incorrect or low-quality materials, leading to repeated repairs
      - Incomplete repairs that cause ongoing nuisance or safety hazards (loose railings, unstable shelves, faulty fixtures)
      - Wasting time on projects that take far longer than expected

      These "short-term savings" end up costing more — both in money and time — over the long run.

      **What a Professional Handyman Brings to the Table**

      When you hire a trusted handyman, you're not just paying for one repair — you're paying for experience, knowledge, tools, and reliability. A professional handyman:

      - Diagnoses the root cause of problems, not just the symptoms — saving repeated repairs
      - Has the right tools and materials to get the job done properly the first time
      - Works efficiently and safely, minimizing risk to your home and family
      - Offers versatility — whether it's plumbing, drywall patching, painting, furniture assembly, or general carpentry
      - Saves you time and stress — no more weekends lost to confusing DIY instructions or botched fixes

      I believe in "doing it right the first time" — delivering durable results so you don't have to worry about it again.

      **When It's Worth Calling a Handyman — 5 Situations That Signal It's Time**

      Sometimes the signs are obvious. Here are five common situations when hiring a handyman makes sense:

      - **Recurring problems** — a leaky faucet, a door that always squeaks, or cracks in drywall come back even after patching
      - **Projects you don't enjoy or don't have time for** — from assembling furniture to mounting shelves or painting accent walls
      - **Safety matters** — electrical outlets, unstable fixtures, or structural concerns are better handled by a pro
      - **You want it done fast and done right** — especially when you're juggling work, family, or simply don't want to spend weekends on repairs
      - **You're prepping your home for sale or rent** — first impressions matter, and well-maintained details make a difference

      **What to Expect When You Hire Me**

      When you contact Paul Ries Handyman Services, here's how I work to ensure a smooth, high-quality experience:

      - **Clear assessment & transparent pricing** — I inspect the issue, explain what needs fixing, and provide a clear quote before I begin
      - **Quality materials & proper tools** — no shortcuts or sub-standard parts
      - **Professional, clean workmanship** — I treat your home with respect, clean up after myself, and leave things better than I found them
      - **Versatile service offering** — from plumbing and electrical fixes to painting, carpentry, drywall repair, furniture assembly, and more
      - **Satisfaction guarantee** — I aim for long-lasting results, not quick fixes

      **Why Local Matters — Handyman Services Close to Home**

      Choosing a local handyman service has important advantages. Working with someone familiar with local building codes, climate-related wear and tear (especially in coastal regions like San Clemente), and common regional home quirks means faster solutions and fewer surprises. As part of the San Clemente and Orange County community, I know what homes here need — and I'm close by when you need me most.

      **Ready to Get Started?**

      Whether you're dealing with a leaky faucet, sagging shelf, or just a long list of small fixes, a professional handyman can save you valuable time, money, and frustration. I'm ready to be your go-to for dependable, honest, and high-quality home repairs — no job too small, no detail overlooked.

      Get in touch today for a free quote and see why my clients trust me for quality workmanship, friendly service, and lasting results.
    `,
    image: '/assets/images/Paul Jobsite Carhartt shit.png',
    date: '2024-12-01',
    readTime: '6 min read',
    category: 'Home Tips',
    tags: ['handyman', 'home repair', 'DIY vs pro', 'save money', 'san clemente']
  },
  {
    id: 'deck-maintenance-san-clemente',
    title: '5 Essential Deck Maintenance Tips for San Clemente Homeowners',
    excerpt: 'Living near the ocean means your deck faces unique challenges. Salt air, moisture, and UV exposure can damage wood faster than inland homes. Here\'s how to protect your investment.',
    content: `
      Living in beautiful San Clemente means enjoying ocean views and coastal breezes, but it also means your deck faces some unique challenges. Salt air, moisture, and intense UV exposure can cause premature aging and damage to your outdoor living spaces.

      **1. Annual Inspection is Critical**
      Every spring, do a thorough inspection of your deck. Look for soft spots, loose boards, popped nails, and signs of rot. In our coastal climate, problems can develop quickly if left unchecked.

      **2. Power Washing (Done Right)**
      While it's tempting to blast away dirt, improper power washing can damage wood fibers. Use a fan tip, keep the pressure under 1500 PSI, and maintain a consistent distance. Better yet, call a professional.

      **3. Seal and Stain Regularly**
      San Clemente's UV exposure breaks down sealants faster than you'd expect. Plan to reseal your deck every 1-2 years, not the 3-5 years recommended for inland areas.

      **4. Address Rust Immediately**
      Salt air accelerates corrosion on screws, nails, and metal fasteners. If you see rust stains, replace those fasteners with marine-grade stainless steel before they fail.

      **5. Trim Vegetation**
      Keep plants away from your deck structure. Trapped moisture from overhanging plants promotes rot, and roots can damage footings over time.

      Need help with deck maintenance or repairs? I've been maintaining decks in San Clemente for over 15 years and know exactly what our local conditions demand.
    `,
    image: '/assets/images/Paul and Deck Build .png',
    date: '2024-11-15',
    readTime: '4 min read',
    category: 'Deck & Outdoor',
    tags: ['deck maintenance', 'san clemente', 'outdoor living', 'wood care']
  },
  {
    id: 'when-to-call-handyman-vs-contractor',
    title: 'Handyman vs. Contractor: When to Call Which (And Save Money)',
    excerpt: 'Not every home repair needs a licensed contractor. Learn which projects are perfect for a handyman and when you really do need a specialist.',
    content: `
      One of the most common questions I get is "Should I call you or a contractor?" It's a great question, and knowing the answer can save you hundreds or even thousands of dollars.

      **When a Handyman is Your Best Choice:**

      - **Small to medium repairs**: Drywall patches, door adjustments, leaky faucets, toilet repairs
      - **Multiple small jobs**: That "honey-do list" of 10 little things is perfect for a handyman visit
      - **Furniture assembly**: IKEA nightmares? We've got you covered
      - **Fixture replacements**: Swapping out light fixtures, ceiling fans, faucets
      - **Minor carpentry**: Shelving, trim work, small deck repairs
      - **Painting**: Interior rooms, touch-ups, accent walls

      **When You Need a Licensed Contractor:**

      - **Structural work**: Moving walls, foundation issues, major framing
      - **Major electrical**: New circuits, panel upgrades, whole-house rewiring
      - **Major plumbing**: Sewer lines, water main replacement, gas lines
      - **Permitted work**: Anything requiring city permits typically needs a licensed contractor
      - **Large additions**: Room additions, major remodels

      **The Gray Area:**

      Some projects could go either way. A good handyman will be honest about their limits. I always tell clients when a project needs a specialist – it's about doing what's right for your home.

      **Pro Tip**: For borderline projects, get quotes from both. You might be surprised at the difference. A handyman's lower overhead often means significant savings on medium-sized jobs.
    `,
    image: '/assets/images/Paul Jobsite Carhartt shit.png',
    date: '2024-11-08',
    readTime: '5 min read',
    category: 'Home Tips',
    tags: ['hiring tips', 'home repair', 'contractors', 'save money']
  },
  {
    id: 'drywall-repair-guide',
    title: 'DIY Drywall Repair: What You Can Fix vs. What Needs a Pro',
    excerpt: 'Small holes and nail pops are easy DIY fixes. But texture matching and larger repairs? That\'s where things get tricky. Here\'s how to know the difference.',
    content: `
      Drywall damage happens to everyone. Doorknobs, furniture moves, kids, pets – your walls take a beating. The good news? Some repairs are easy DIY projects. The bad news? Some definitely aren't.

      **DIY-Friendly Repairs:**

      **Nail Pops** - When nails push through the paint, simply drive them back in (or better, add a drywall screw nearby), then spackle and paint.

      **Small Holes (under 2 inches)** - Use a self-adhesive mesh patch, apply joint compound in thin layers, sand smooth, and paint.

      **Dents and Dings** - Fill with spackle, let dry, sand, paint. Easy!

      **When to Call a Pro:**

      **Texture Matching** - This is the #1 reason DIY drywall repairs look amateur. Orange peel, knockdown, and other textures require special equipment and technique to match.

      **Large Holes** - Anything bigger than 6 inches needs proper backing and multiple coats of compound. Poor technique here shows badly.

      **Water Damage** - If water caused the damage, you need to address the source first. Water-damaged drywall often has hidden mold issues.

      **Ceiling Repairs** - Working overhead is exhausting, and ceiling texture is notoriously hard to match.

      **Multiple Repairs** - If you have several spots, a pro can do them all in one visit, often for less than you'd spend on supplies and a weekend of frustration.

      **My Honest Take:**
      I actually encourage clients to try small repairs themselves. But when they call me after a failed DIY attempt, it usually costs more to fix because I have to remove their work first. Know your limits!
    `,
    image: null,
    date: '2024-10-25',
    readTime: '4 min read',
    category: 'Drywall & Painting',
    tags: ['drywall repair', 'DIY', 'home repair', 'painting']
  },
  {
    id: 'preparing-home-for-sale-san-clemente',
    title: 'Top 10 Quick Fixes Before Selling Your San Clemente Home',
    excerpt: 'Getting ready to sell? These affordable handyman repairs offer the best ROI and help your home show beautifully without breaking the bank.',
    content: `
      The San Clemente real estate market moves fast, and first impressions matter enormously. Here are the repairs that give you the biggest bang for your buck when preparing to sell.

      **1. Fresh Paint in Neutral Colors** ($200-500 per room)
      Nothing transforms a space like fresh paint. Stick to warm whites and light grays – buyers want to envision their own style.

      **2. Fix All Door Issues** ($50-150)
      Squeaky hinges, doors that don't latch, sticky locks – these small annoyances make buyers wonder what bigger issues exist.

      **3. Update Cabinet Hardware** ($100-300)
      New pulls and knobs in brushed nickel or matte black make kitchens and bathrooms feel updated without a renovation.

      **4. Repair Drywall Damage** ($100-400)
      Patch holes, fix cracks, and address any water stains. Buyers notice every flaw during inspections.

      **5. Caulk Everything** ($50-150)
      Fresh caulk around tubs, sinks, and windows shows attention to maintenance. Old, cracked caulk screams neglect.

      **6. Power Wash Exterior** ($150-300)
      Clean your driveway, walkways, and siding. Instant curb appeal boost.

      **7. Fix Leaky Faucets** ($75-200)
      That dripping faucet you've ignored for months? Buyers hear it loud and clear.

      **8. Replace Dated Light Fixtures** ($100-400)
      Swap out brass chandeliers and boob lights for modern alternatives.

      **9. Deck Touch-Ups** ($200-500)
      In San Clemente, outdoor living space sells. Make sure your deck looks its best.

      **10. Deep Clean Grout** ($100-300)
      Or better yet, have it professionally cleaned and sealed. Sparkling tile makes bathrooms shine.

      **Total Investment**: $1,200-3,000 for a complete refresh
      **Potential Return**: Often 3-5x your investment in perceived value

      Want to get your home sale-ready? I offer pre-listing inspection walks where we identify priorities together.
    `,
    image: '/assets/images/Paul with homeowners.png',
    date: '2024-10-18',
    readTime: '6 min read',
    category: 'Home Tips',
    tags: ['selling home', 'san clemente real estate', 'home value', 'quick fixes']
  },
  {
    id: 'ceiling-fan-installation-guide',
    title: 'Ceiling Fan Installation: What Homeowners Need to Know',
    excerpt: 'Thinking about adding a ceiling fan? Here\'s everything you need to know about costs, requirements, and what to expect from the installation process.',
    content: `
      Ceiling fans are one of the most popular upgrades I install. They look great, improve comfort, and can lower energy bills. Here's what you need to know before scheduling an installation.

      **Can Any Light Fixture Become a Ceiling Fan?**

      Usually, yes – but there's a catch. Ceiling fans are heavier than light fixtures and they vibrate. The electrical box in your ceiling must be "fan-rated" to support the weight and movement safely.

      If your current box isn't fan-rated (most standard light boxes aren't), I'll need to install a proper fan brace. This adds 30-60 minutes to the job but is absolutely essential for safety.

      **What About Where There's No Fixture?**

      Installing a ceiling fan where no fixture exists is more involved. It requires:
      - Running electrical wire from a nearby circuit
      - Cutting into the ceiling
      - Installing a fan-rated box
      - Patching and painting the ceiling
      - Installing a wall switch

      This is a half-day project but absolutely doable.

      **Choosing the Right Fan:**

      - **Room size matters**: 42" fans for rooms up to 144 sq ft, 52" for larger spaces
      - **Ceiling height**: Standard downrods work for 8-9' ceilings. Higher ceilings need extension downrods
      - **Outdoor rating**: For covered patios in San Clemente, get a "damp-rated" fan minimum

      **What to Expect Cost-Wise:**

      - Basic installation (replacing existing fixture): $75-150
      - Installation requiring new fan box: $150-250
      - New installation (no existing fixture): $300-500
      - High ceiling/vaulted installations: Add $50-100

      **Pro Tip**: Buy your fan first so I can see exactly what we're working with. Or tell me your budget and style preference, and I can recommend options.
    `,
    image: null,
    date: '2024-10-10',
    readTime: '5 min read',
    category: 'Electrical',
    tags: ['ceiling fan', 'installation', 'electrical', 'home improvement']
  },
  {
    id: 'coastal-home-maintenance-checklist',
    title: 'The Ultimate Coastal Home Maintenance Checklist',
    excerpt: 'Salt air, marine layer moisture, and intense sun create unique maintenance challenges for San Clemente homes. Here\'s your seasonal checklist.',
    content: `
      Living on the coast is incredible, but your home faces challenges that inland properties don't. Salt air corrodes metal, moisture promotes mold, and UV rays fade and degrade everything. Here's how to stay ahead of coastal wear and tear.

      **SPRING (March-May)**
      
      □ Inspect and clean gutters (winter debris)
      □ Check window and door weatherstripping
      □ Inspect deck for winter damage
      □ Service air conditioning before summer
      □ Check exterior caulking
      □ Look for rust on exterior fixtures, hinges, house numbers
      □ Inspect roof for lifted shingles or tiles

      **SUMMER (June-August)**

      □ Touch up exterior paint where needed
      □ Clean salt residue from windows and screens
      □ Check irrigation systems
      □ Inspect and seal deck if needed
      □ Service garbage disposal (heavy use season)
      □ Check for ant invasions (common this time)

      **FALL (September-November)**

      □ Clean gutters before winter rains
      □ Inspect weather stripping again
      □ Check outdoor lighting (shorter days)
      □ Service heating system
      □ Inspect for roof leaks before rains
      □ Drain and winterize outdoor faucets (yes, even in SoCal)
      □ Seal any gaps where pests might enter

      **WINTER (December-February)**

      □ Check for water intrusion after storms
      □ Monitor for mold in bathrooms and closets
      □ Test smoke and CO detectors
      □ Inspect attic for moisture
      □ Check for drafts around windows/doors

      **Year-Round in Coastal Areas:**

      - Replace exterior screws and hinges with stainless steel when they rust
      - Rinse exterior metal fixtures monthly to remove salt buildup
      - Run bathroom fans during and after showers to prevent mold
      - Keep vegetation trimmed away from the house

      **Want a Professional Walk-Through?**
      I offer seasonal maintenance inspections where I check all these items and create a prioritized repair list. It's the best way to catch small problems before they become expensive repairs.
    `,
    image: null,
    date: '2024-09-28',
    readTime: '5 min read',
    category: 'Home Tips',
    tags: ['maintenance', 'coastal living', 'san clemente', 'seasonal checklist']
  }
];

const CATEGORIES = ['All', 'Deck & Outdoor', 'Home Tips', 'Drywall & Painting', 'Electrical'];

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Home Repair Tips & Advice
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Practical advice from a San Clemente handyman with 15+ years of experience. 
              Learn when to DIY and when to call a pro.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="md:flex">
                    {/* Image */}
                    {post.image && (
                      <div className="md:w-1/3 flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className={`p-6 md:p-8 ${post.image ? 'md:w-2/3' : 'w-full'}`}>
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-blue-600 font-medium">
                          <Tag className="h-4 w-4" />
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt or Full Content */}
                      {expandedPost === post.id ? (
                        <div className="prose prose-slate max-w-none">
                          {post.content.split('\n').map((paragraph, idx) => {
                            if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                              return <h3 key={idx} className="text-lg font-bold text-slate-900 mt-6 mb-2">{paragraph.replace(/\*\*/g, '')}</h3>;
                            }
                            if (paragraph.trim().startsWith('**')) {
                              return <h4 key={idx} className="font-semibold text-slate-800 mt-4 mb-1">{paragraph.replace(/\*\*/g, '')}</h4>;
                            }
                            if (paragraph.trim().startsWith('□')) {
                              return <p key={idx} className="text-slate-600 ml-4">{paragraph}</p>;
                            }
                            if (paragraph.trim().startsWith('-')) {
                              return <p key={idx} className="text-slate-600 ml-4">{paragraph}</p>;
                            }
                            if (paragraph.trim()) {
                              return <p key={idx} className="text-slate-600 mb-3">{paragraph}</p>;
                            }
                            return null;
                          })}
                          <button
                            onClick={() => setExpandedPost(null)}
                            className="mt-6 text-blue-600 font-semibold hover:text-blue-700"
                          >
                            Show Less
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-slate-600 mb-4">{post.excerpt}</p>
                          <button
                            onClick={() => setExpandedPost(post.id)}
                            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                          >
                            Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </>
                      )}

                      {/* Tags */}
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Question About Your Project?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Can't find what you're looking for? Reach out directly and I'll give you honest, practical advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${PHONE_NUMBER.replace(/[^\d]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-blue-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Call {PHONE_NUMBER}
            </a>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get a Free Quote <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Schema - Hidden but important for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Paul Ries Handyman - Home Repair Tips",
          "description": "Practical home repair advice from a San Clemente handyman with 15+ years of experience",
          "url": "https://fixitsanclemente.com/#/blog",
          "author": {
            "@type": "Person",
            "name": "Paul Ries"
          },
          "blogPost": BLOG_POSTS.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
              "@type": "Person", 
              "name": "Paul Ries"
            }
          }))
        })
      }} />
    </>
  );
};

