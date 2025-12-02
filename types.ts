export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Hammer' | 'Paintbrush' | 'Wrench' | 'Zap' | 'Ruler' | 'Truck';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string; // e.g., "Talega, San Clemente"
  text: string;
  rating: number;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  serviceType: string;
}

export interface AIAnalysisResult {
  category: string;
  estimatedHours: string;
  complexity: 'Low' | 'Medium' | 'High';
  recommendation: string;
}
