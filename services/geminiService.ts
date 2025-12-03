import { AIAnalysisResult } from "../types";

// Helper to get safe API key
const getApiKey = (): string | undefined => {
  return process.env.API_KEY_GEMINI || process.env.API_KEY;
};

// Smart mock analysis based on keywords when no API key
const getMockAnalysis = (description: string): AIAnalysisResult => {
  const desc = description.toLowerCase();
  
  // Major projects (days/weeks)
  if (desc.includes('rebuild') || desc.includes('remodel') || desc.includes('renovation') || 
      desc.includes('new deck') || desc.includes('build deck') || desc.includes('bathroom remodel') ||
      desc.includes('kitchen remodel') || desc.includes('addition')) {
    return {
      category: "Major Construction",
      estimatedHours: "Multiple days (40-80+ hours)",
      complexity: "High",
      recommendation: "This is a significant project. Paul will need to visit for an in-person assessment and provide a detailed quote."
    };
  }
  
  // Deck work
  if (desc.includes('deck')) {
    if (desc.includes('repair') || desc.includes('board') || desc.includes('plank') || desc.includes('railing')) {
      return {
        category: "Deck & Outdoor",
        estimatedHours: "4-8 hours",
        complexity: "Medium",
        recommendation: "Deck repairs vary based on extent of damage. Photos of the affected area would help provide an accurate estimate."
      };
    }
    return {
      category: "Deck & Outdoor",
      estimatedHours: "2-5 days (16-40 hours)",
      complexity: "High",
      recommendation: "Deck projects require an on-site assessment. Paul will measure and evaluate the scope before providing a detailed quote."
    };
  }
  
  // Painting
  if (desc.includes('paint') || desc.includes('painting')) {
    if (desc.includes('room') || desc.includes('bedroom') || desc.includes('living')) {
      return {
        category: "Painting",
        estimatedHours: "4-8 hours per room",
        complexity: "Medium",
        recommendation: "Time depends on room size, prep work needed, and number of coats. Include ceiling? Trim work?"
      };
    }
    if (desc.includes('house') || desc.includes('exterior') || desc.includes('whole')) {
      return {
        category: "Painting",
        estimatedHours: "Multiple days (24-60+ hours)",
        complexity: "High",
        recommendation: "Large painting projects require an on-site estimate. Paul will assess prep work, surface condition, and square footage."
      };
    }
    return {
      category: "Painting",
      estimatedHours: "2-4 hours",
      complexity: "Low",
      recommendation: "Touch-up and small painting jobs are straightforward. What's the approximate area to be painted?"
    };
  }
  
  // Drywall
  if (desc.includes('drywall') || desc.includes('hole') || desc.includes('wall damage')) {
    if (desc.includes('large') || desc.includes('big') || desc.includes('multiple')) {
      return {
        category: "Drywall",
        estimatedHours: "4-8 hours",
        complexity: "Medium",
        recommendation: "Larger drywall repairs need proper patching and texture matching. Photos will help assess the scope."
      };
    }
    return {
      category: "Drywall",
      estimatedHours: "1-3 hours",
      complexity: "Low",
      recommendation: "Small drywall repairs are quick fixes. What's the approximate size of the damage?"
    };
  }
  
  // Plumbing
  if (desc.includes('plumb') || desc.includes('faucet') || desc.includes('toilet') || 
      desc.includes('leak') || desc.includes('drain') || desc.includes('pipe')) {
    if (desc.includes('replace') || desc.includes('install') || desc.includes('new')) {
      return {
        category: "Plumbing",
        estimatedHours: "2-4 hours",
        complexity: "Medium",
        recommendation: "Fixture replacements typically take a few hours. Is there existing plumbing in place?"
      };
    }
    return {
      category: "Plumbing",
      estimatedHours: "1-2 hours",
      complexity: "Low",
      recommendation: "Minor plumbing fixes are usually quick. Can you describe where the issue is located?"
    };
  }
  
  // Electrical
  if (desc.includes('electric') || desc.includes('outlet') || desc.includes('switch') || 
      desc.includes('light') || desc.includes('fan') || desc.includes('fixture')) {
    if (desc.includes('install') || desc.includes('new') || desc.includes('ceiling fan')) {
      return {
        category: "Electrical",
        estimatedHours: "2-4 hours",
        complexity: "Medium",
        recommendation: "New electrical installations require checking existing wiring. Is there an existing fixture/outlet in that location?"
      };
    }
    return {
      category: "Electrical",
      estimatedHours: "1-2 hours",
      complexity: "Low",
      recommendation: "Simple electrical repairs are straightforward. Is the issue with one fixture or multiple?"
    };
  }
  
  // Furniture assembly
  if (desc.includes('assemble') || desc.includes('assembly') || desc.includes('ikea') || desc.includes('furniture')) {
    return {
      category: "Furniture Assembly",
      estimatedHours: "1-3 hours",
      complexity: "Low",
      recommendation: "Assembly time varies by item complexity. What furniture pieces need assembly?"
    };
  }
  
  // Door/window
  if (desc.includes('door') || desc.includes('window')) {
    if (desc.includes('install') || desc.includes('replace') || desc.includes('new')) {
      return {
        category: "Doors & Windows",
        estimatedHours: "3-6 hours",
        complexity: "Medium",
        recommendation: "Door/window installation depends on the type and if the frame needs modification. What type of door/window?"
      };
    }
    return {
      category: "Doors & Windows",
      estimatedHours: "1-2 hours",
      complexity: "Low",
      recommendation: "Door adjustments and minor repairs are quick fixes. What's the specific issue?"
    };
  }
  
  // Carpentry
  if (desc.includes('carpentry') || desc.includes('wood') || desc.includes('shelf') || 
      desc.includes('cabinet') || desc.includes('trim') || desc.includes('baseboard')) {
    return {
      category: "Carpentry",
      estimatedHours: "2-6 hours",
      complexity: "Medium",
      recommendation: "Carpentry work varies significantly by scope. Can you describe what needs to be built or repaired?"
    };
  }
  
  // Default for unclear descriptions
  return {
    category: "General Handyman",
    estimatedHours: "1-3 hours (estimate)",
    complexity: "Medium",
    recommendation: "Please provide more details about the project so Paul can give you an accurate estimate."
  };
};

export const analyzeProjectRequest = async (userDescription: string): Promise<AIAnalysisResult | null> => {
  const apiKey = getApiKey();
  
  // If no API key is present, use smart mock response based on keywords
  if (!apiKey) {
    console.warn("No API Key found. Using smart mock analysis.");
    return getMockAnalysis(userDescription);
  }

  try {
    const prompt = `You are an expert handyman assistant for Paul Ries Handyman Services in San Clemente, CA.
Analyze this project: "${userDescription}"

TIME ESTIMATES GUIDE:
- Small repairs (faucet, doorknob, small hole): 1-2 hours
- Medium repairs (toilet, ceiling fan, door): 2-4 hours  
- Larger repairs (deck boards, room paint): 4-8 hours
- Big projects (deck rebuild, bathroom): 1-3 DAYS (8-24 hours)
- Major projects (full deck build, remodel): Multiple DAYS/WEEKS (40-100+ hours)

Respond with ONLY valid JSON in this exact format:
{
  "category": "one of: Plumbing, Electrical, Drywall & Painting, Carpentry, Deck & Outdoor, Doors & Windows, Furniture Assembly, General Handyman, Major Construction",
  "estimatedHours": "realistic time range like '2-4 hours' or '2-3 days (16-24 hours)'",
  "complexity": "Low, Medium, or High",
  "recommendation": "one helpful sentence for the homeowner"
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          }
        })
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", response.status);
      return getMockAnalysis(userDescription);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as AIAnalysisResult;
      }
    }
    
    // Fall back to mock if parsing fails
    return getMockAnalysis(userDescription);

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fall back to smart mock analysis on any error
    return getMockAnalysis(userDescription);
  }
};
