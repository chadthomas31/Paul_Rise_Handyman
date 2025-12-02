import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

// Helper to get safe API key
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

export const analyzeProjectRequest = async (userDescription: string): Promise<AIAnalysisResult | null> => {
  const apiKey = getApiKey();
  
  // If no API key is present, we return a mock response to ensure the UI still functions for demo purposes
  // In production, this would handle errors more gracefully.
  if (!apiKey) {
    console.warn("No API Key found. Returning mock analysis.");
    return {
      category: "General Repair",
      estimatedHours: "1-2 hours",
      complexity: "Medium",
      recommendation: "This sounds like a standard repair. Please provide photos if possible."
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      You are an expert handyman assistant. Analyze the following project description from a homeowner: "${userDescription}".
      
      Determine the likely trade category (e.g., Plumbing, Electrical, Drywall, Carpentry, General),
      estimate the time it might take for a professional handyman (range in hours),
      assess the complexity (Low, Medium, High),
      and give a 1-sentence professional recommendation or clarifying question the handyman should ask.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            estimatedHours: { type: Type.STRING },
            complexity: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            recommendation: { type: Type.STRING }
          },
          required: ["category", "estimatedHours", "complexity", "recommendation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResult;
    }
    return null;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};
