import React, { useState } from 'react';
import { Button } from './Button';
import { AIQuoteHelper } from './AIQuoteHelper';
import { AIAnalysisResult } from '../types';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.PROD 
  ? '/api/contact' 
  : 'http://localhost:3000/api/contact';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: 'General Repair',
    description: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error when user types
  };

  const handleAIComplete = (result: AIAnalysisResult) => {
    setAiAnalysis(result);
    setFormData(prev => ({
      ...prev,
      serviceType: result.category,
      description: `${prev.description ? prev.description + '\n\n' : ''}[AI Assessment]: ${result.recommendation} (Est. Time: ${result.estimatedHours})`
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          aiAnalysis: aiAnalysis || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Something went wrong. Please try calling Paul directly at (619) 727-7975.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center animate-fade-in">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-600 mb-2">Thanks for contacting Paul. I'll get back to you within 24 hours (usually sooner) to confirm details.</p>
        <p className="text-sm text-slate-500">A confirmation email has been sent to your inbox.</p>
        <Button variant="outline" className="mt-6" onClick={() => {
          setSubmitted(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            address: '',
            serviceType: 'General Repair',
            description: ''
          });
          setAiAnalysis(null);
        }}>
          Send Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 md:p-8 bg-slate-900 text-white">
        <h3 className="text-2xl font-bold">Request a Free Quote</h3>
        <p className="text-slate-300 mt-2">Fill out the form below or call Paul directly.</p>
      </div>
      
      <div className="p-6 md:p-8">
        
        <AIQuoteHelper onAnalysisComplete={handleAIComplete} />

        {aiAnalysis && (
           <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-slate-700">
             <strong>AI Estimate:</strong> {aiAnalysis.estimatedHours} • {aiAnalysis.complexity} Complexity
             <div className="text-xs text-slate-500 mt-1">This info has been added to your request automatically.</div>
           </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <strong>Error:</strong> {error}
            <div className="mt-2">
              <a href="tel:6197277975" className="text-red-800 underline font-medium">
                Call Paul directly at (619) 727-7975
              </a>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border disabled:bg-slate-100 disabled:cursor-not-allowed"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border disabled:bg-slate-100 disabled:cursor-not-allowed"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border disabled:bg-slate-100 disabled:cursor-not-allowed"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address (San Clemente Area)</label>
              <input
                type="text"
                name="address"
                id="address"
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border disabled:bg-slate-100 disabled:cursor-not-allowed"
                placeholder="Street address or Neighborhood"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border disabled:bg-slate-100 disabled:cursor-not-allowed"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option>General Repair</option>
              <option>Drywall & Painting</option>
              <option>Plumbing (Light)</option>
              <option>Electrical (Light)</option>
              <option>Furniture Assembly</option>
              <option>Mounting & Hanging</option>
              <option>Carpentry & Trim</option>
              <option>Outdoor & Deck</option>
              <option>Hauling & Cleanup</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">How can I help?</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border disabled:bg-slate-100 disabled:cursor-not-allowed"
              placeholder="Describe what needs fixing..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <Button 
            type="submit" 
            variant="secondary" 
            fullWidth 
            className="text-lg font-bold shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </span>
            ) : (
              'Send Request'
            )}
          </Button>
          <p className="text-xs text-center text-slate-500 mt-2">
            No spam. I only use your info to quote the job.
          </p>
        </form>
      </div>
    </div>
  );
};
