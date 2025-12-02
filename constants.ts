import { ServiceItem, Testimonial } from './types';

export const BUSINESS_NAME = "Paul Ries Handyman Services";
export const PHONE_NUMBER = "(619) 727-7975";
export const EMAIL_ADDRESS = "paul@rieshandyman.sc";
export const SERVICE_AREA = "San Clemente, Dana Point, & San Juan Capistrano";

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
    description: 'IKEA expert. Don’t waste your weekend fighting instructions. I’ll build it fast and sturdy.',
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