import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone, Clock, ArrowRight, Home, Calendar, MessageSquare } from 'lucide-react';
import { PHONE_NUMBER, BUSINESS_NAME } from '../constants';
import { Button } from '../components/Button';

export const ThankYou: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti animation after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-green-50 to-white">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'][Math.floor(Math.random() * 5)],
                width: '10px',
                height: '10px',
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-bounce-slow">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Request Received!
          </h1>
          
          <p className="text-xl text-slate-600 max-w-xl mx-auto">
            Thanks for reaching out! I've received your quote request and will get back to you shortly.
          </p>
        </div>

        {/* What Happens Next Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            What Happens Next?
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">I'll Review Your Request</h3>
                <p className="text-slate-600">I personally read every request and assess what you need.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Quick Response</h3>
                <p className="text-slate-600">Expect a call or text within a few hours during business hours (Mon-Sat).</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Free Estimate</h3>
                <p className="text-slate-600">We'll discuss your project and I'll provide a clear, honest quote.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent? Call Now */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-shrink-0">
              <Phone className="h-10 w-10 text-amber-600" />
            </div>
            <div className="text-center sm:text-left flex-grow">
              <h3 className="font-bold text-slate-900">Need Help Sooner?</h3>
              <p className="text-slate-600 text-sm">For urgent repairs, feel free to call or text me directly.</p>
            </div>
            <a 
              href={`tel:${PHONE_NUMBER.replace(/[^\d]/g, '')}`}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="h-5 w-5" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 font-medium py-4 px-6 rounded-xl transition-colors"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          
          <Link 
            to="/services"
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 font-medium py-4 px-6 rounded-xl transition-colors"
          >
            <Calendar className="h-5 w-5" />
            View Services
          </Link>
          
          <Link 
            to="/blog"
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 font-medium py-4 px-6 rounded-xl transition-colors"
          >
            <MessageSquare className="h-5 w-5" />
            Read Our Blog
          </Link>
        </div>

        {/* Reassurance Message */}
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>
            You're in good hands. I've helped over 500+ homeowners in South Orange County 
            with their home repairs and improvements.
          </p>
          <p className="mt-2 font-medium text-slate-700">— Paul Ries</p>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti {
          animation: confetti-fall 3s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

