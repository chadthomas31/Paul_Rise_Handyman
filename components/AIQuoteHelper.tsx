import React, { useState } from 'react';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { analyzeProjectRequest } from '../services/geminiService';
import { Button } from './Button';
import { AIAnalysisResult } from '../types';

interface AIQuoteHelperProps {
  onAnalysisComplete: (result: AIAnalysisResult) => void;
}

export const AIQuoteHelper: React.FC<AIQuoteHelperProps> = ({ onAnalysisComplete }) => {
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!description.trim()) {
      setError("Please describe your project first.");
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeProjectRequest(description);
      if (result) {
        onAnalysisComplete(result);
      } else {
        setError("Could not analyze project. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong with the AI service.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-slate-900">Get an Instant AI Assessment</h3>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">
        Not sure how to explain the issue? Describe it below and our AI will categorize it and estimate the time for you.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. 'My kitchen faucet is dripping and the handle is loose'"
          className="flex-1 rounded-md border-slate-300 border p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <Button 
          variant="accent" 
          onClick={handleAnalyze} 
          disabled={isAnalyzing}
          className="whitespace-nowrap"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            "Analyze Project"
          )}
        </Button>
      </div>
      {error && (
        <div className="mt-2 flex items-center text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};
