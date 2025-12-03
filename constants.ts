import { ServiceItem, Testimonial } from './types';

export const BUSINESS_NAME = "Paul Ries Handyman Services";
export const PHONE_NUMBER = "(619) 727-7975";
export const EMAIL_ADDRESS = "paul@rieshandyman.sc";
export const SERVICE_AREA = "San Clemente & South Orange County";

// All service areas
export const SERVICE_CITIES = [
  'San Clemente',
  'Dana Point', 
  'San Juan Capistrano',
  'Laguna Niguel',
  'Mission Viejo',
  'Laguna Hills',
  'Aliso Viejo',
  'Capistrano Beach',
  'Talega'
];

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Drywall & Painting',
    description: 'Patching holes, texture matching, and interior painting. I make walls look new again.',
    iconName: 'Paintbrush'
  },
  {
    id: '2',
    title: 'General Repairs',
    description: 'Leaky faucets, squeaky doors, cabinet adjustments, and hardware replacement.',
    iconName: 'Wrench'
  },
  {
    id: '3',
    title: 'Furniture Assembly',
    description: "IKEA expert. Don't waste your weekend fighting instructions. I'll build it fast and sturdy.",
    iconName: 'Hammer'
  },
  {
    id: '4',
    title: 'Light Electrical',
    description: 'Replacing outlets, installing ceiling fans, dimmer switches, and light fixtures.',
    iconName: 'Zap'
  },
  {
    id: '5',
    title: 'Mounting & Hanging',
    description: 'TV mounting, heavy mirrors, artwork, shelving, and window treatments.',
    iconName: 'Ruler'
  },
  {
    id: '6',
    title: 'Hauling & Cleanup',
    description: 'Garage cleanouts, debris removal, and donation runs. Reclaim your space.',
    iconName: 'Truck'
  }
];

export const DETAILED_SERVICES = [
  {
    id: '1',
    title: 'Drywall & Painting',
    description: 'From small nail holes to large repairs, I restore walls to like-new condition with expert texture matching and professional painting.',
    iconName: 'Paintbrush',
    image: '/assets/images/Paul Jobsite Carhartt shit.png',
    subServices: [
      'Drywall hole patching (small & large)',
      'Texture matching (orange peel, knockdown, smooth)',
      'Interior painting (walls & ceilings)',
      'Accent walls & color changes',
      'Cabinet painting & refinishing',
      'Touch-up painting',
      'Popcorn ceiling removal',
      'Drywall crack repair'
    ],
    priceRange: '$75 - $400+',
    timeEstimate: '1-4 hours'
  },
  {
    id: '2',
    title: 'General Repairs',
    description: 'The everyday fixes that keep your home running smoothly. No job too small – I tackle the tasks others won\'t.',
    iconName: 'Wrench',
    image: null,
    subServices: [
      'Door repair & adjustment',
      'Window repair & weatherstripping',
      'Faucet & toilet repairs',
      'Cabinet door adjustment',
      'Hardware replacement (knobs, hinges)',
      'Caulking & sealing',
      'Screen repair & replacement',
      'Weatherproofing',
      'Lock installation & repair',
      'Sliding door track repair'
    ],
    priceRange: '$65 - $250+',
    timeEstimate: '30 min - 3 hours'
  },
  {
    id: '3',
    title: 'Furniture Assembly',
    description: 'Skip the frustration of confusing instructions. I assemble furniture quickly, correctly, and securely.',
    iconName: 'Hammer',
    image: null,
    subServices: [
      'IKEA furniture assembly',
      'Office furniture setup',
      'Bed frames & headboards',
      'Desks & bookcases',
      'Outdoor furniture assembly',
      'Exercise equipment assembly',
      'Storage units & shelving',
      'Kids furniture & cribs',
      'Patio sets & gazebos'
    ],
    priceRange: '$50 - $200+',
    timeEstimate: '30 min - 4 hours'
  },
  {
    id: '4',
    title: 'Light Electrical',
    description: 'Safe, code-compliant electrical work for common household needs. Fixtures, outlets, and switches done right.',
    iconName: 'Zap',
    image: null,
    subServices: [
      'Light fixture installation',
      'Ceiling fan installation',
      'Outlet & switch replacement',
      'Dimmer switch installation',
      'GFCI outlet installation',
      'USB outlet upgrades',
      'Under-cabinet lighting',
      'Smoke detector installation',
      'Doorbell installation (wired & wireless)',
      'Chandelier hanging'
    ],
    priceRange: '$75 - $300+',
    timeEstimate: '30 min - 2 hours'
  },
  {
    id: '5',
    title: 'Mounting & Hanging',
    description: 'Secure, level, and professional mounting for TVs, mirrors, artwork, and more. I find the studs so you don\'t have to.',
    iconName: 'Ruler',
    image: null,
    subServices: [
      'TV mounting (all sizes)',
      'Heavy mirror hanging',
      'Artwork & picture hanging',
      'Floating shelves installation',
      'Curtain rod & blinds installation',
      'Towel bars & bathroom accessories',
      'Coat hooks & key holders',
      'Wall-mounted coat racks',
      'Garage organization systems',
      'Sound bar mounting'
    ],
    priceRange: '$65 - $250+',
    timeEstimate: '30 min - 2 hours'
  },
  {
    id: '6',
    title: 'Hauling & Cleanup',
    description: 'Reclaim your space. I handle junk removal, donation runs, and garage cleanouts so you don\'t have to.',
    iconName: 'Truck',
    image: null,
    subServices: [
      'Garage cleanout & organization',
      'Junk & debris removal',
      'Donation drop-off runs',
      'Appliance removal',
      'Furniture disposal',
      'Yard waste removal',
      'Estate cleanout assistance',
      'Storage unit cleanout',
      'Post-renovation cleanup'
    ],
    priceRange: '$100 - $500+',
    timeEstimate: '1-4 hours'
  },
  {
    id: '7',
    title: 'Carpentry & Trim',
    description: 'Quality woodwork and trim installation that adds character and value to your home.',
    iconName: 'Hammer',
    image: null,
    subServices: [
      'Baseboard installation & repair',
      'Crown molding installation',
      'Door trim & casing',
      'Window trim',
      'Chair rail installation',
      'Closet shelving',
      'Custom shelving solutions',
      'Wood rot repair',
      'Deck board replacement'
    ],
    priceRange: '$100 - $400+',
    timeEstimate: '1-4 hours'
  },
  {
    id: '8',
    title: 'Outdoor & Deck',
    description: 'Keep your outdoor spaces safe and looking great with maintenance and repairs.',
    iconName: 'Hammer',
    image: '/assets/images/Paul and Deck Build .png',
    subServices: [
      'Deck board replacement',
      'Deck staining & sealing',
      'Fence repairs',
      'Gate adjustment & repair',
      'Patio furniture assembly',
      'Outdoor lighting installation',
      'Pressure washing prep',
      'Gutter cleaning',
      'Mailbox installation'
    ],
    priceRange: '$75 - $350+',
    timeEstimate: '1-4 hours'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    location: 'Talega, San Clemente',
    text: 'Paul is a lifesaver. He fixed our sliding door and patched some drywall in the hallway. On time, polite, and cleaned up perfectly.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Mike D.',
    location: 'Pier Bowl area',
    text: 'Hard to find reliable tradesmen in town. Paul actually answers his phone and shows up when he says he will. Highly recommended.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Linda & Tom',
    location: 'Forster Ranch',
    text: 'We had a huge "honey-do" list. Paul knocked out 6 months of procrastination in one afternoon. Fair pricing too.',
    rating: 5
  }
];