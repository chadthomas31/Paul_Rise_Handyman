import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { AIQuoteHelper } from './AIQuoteHelper';
import { AIAnalysisResult } from '../types';
import { Loader2, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: 'General Repair',
    description: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          aiAnalysis: aiAnalysis
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Redirect to thank you page
        navigate('/thank-you');
      } else {
        setError(data.error || 'Something went wrong. Please try again or call Paul directly.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Unable to send request. Please call Paul directly at (619) 727-7975.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
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
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
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
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
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
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
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
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option>General Repair</option>
              <option>Drywall & Painting</option>
              <option>Plumbing (Light)</option>
              <option>Electrical (Light)</option>
              <option>Furniture Assembly</option>
              <option>Mounting & Hanging</option>
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
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
              placeholder="Describe what needs fixing..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
                <a href="tel:6197277975" className="text-red-700 underline text-sm font-medium">
                  Call Paul directly at (619) 727-7975
                </a>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            variant="secondary" 
            fullWidth 
            className="text-lg font-bold shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
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