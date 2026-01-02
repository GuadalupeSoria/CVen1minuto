interface JobDescription {
  company: string;
  position: string;
  description: string;
}

interface CVOptimizationResult {
  optimizedAbout: string;
  suggestedTitle: string;
  skillsToReplace?: string[];
  suggestedSkills: string[];
  experienceHighlights: string[];
  projectRecommendations: string[];
  atsKeywords: string[];
}

interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: string[];
  experience: Array<{ position: string; company: string }>;
  [key: string]: string | string[] | Array<{ position: string; company: string }>;
}

export const AIService = {
  async optimizeCV(
    currentCV: PortfolioData,
    jobDescription: JobDescription,
    jobLanguage: 'es' | 'en' = 'es'
  ): Promise<CVOptimizationResult> {
    try {
      const responseLanguage = jobLanguage === 'en' ? 'English' : 'Spanish';

      const prompt = `You are an expert in CV optimization and ATS systems.

IMPORTANT: Respond in ${responseLanguage}. All suggestions, recommendations, and keywords must be in ${responseLanguage}.

CURRENT CV:
- Name: ${currentCV.name}
- Title: ${currentCV.title}
- About: ${currentCV.about}
- Skills: ${currentCV.skills.join(', ')}
- Experience: ${currentCV.experience.map(exp => `${exp.position} at ${exp.company}`).join('; ')}

JOB APPLICATION:
- Company: ${jobDescription.company}
- Position: ${jobDescription.position}
- Description: ${jobDescription.description}

Provide CV optimization suggestions in this EXACT JSON format (respond ONLY with valid JSON, no markdown, no extra text).
All text fields must be in ${responseLanguage}:
{
  "optimizedAbout": "improved about section tailored to this job (in ${responseLanguage})",
  "suggestedTitle": "${jobDescription.position}",
  "skillsToReplace": [],
  "suggestedSkills": ["skill1", "skill2", "skill3"],
  "experienceHighlights": ["highlight 1 (in ${responseLanguage})", "highlight 2 (in ${responseLanguage})"],
  "projectRecommendations": ["recommendation 1 (in ${responseLanguage})", "recommendation 2 (in ${responseLanguage})"],
  "atsKeywords": ["keyword1", "keyword2", "keyword3"]
}`;

      const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

      if (!GROQ_API_KEY || GROQ_API_KEY.length < 10) {
        throw new Error('Groq API key not configured');
      }

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
              {
                role: 'system',
                content: 'You are a CV optimization expert. Always respond with valid JSON only, no markdown formatting.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API error:', response.status, errorText);
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices[0]?.message?.content || '';

      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        console.log('AI response:', text);
        return createFallbackResponse(currentCV, jobDescription);
      }

      const optimizationResult: CVOptimizationResult = JSON.parse(jsonMatch[0]);
      return optimizationResult;
    } catch (error) {
      console.error('Error optimizing CV:', error);
      return createFallbackResponse(currentCV, jobDescription);
    }
  },

  isConfigured(): boolean {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    return !!apiKey && apiKey.length > 10 && !apiKey.includes('xxx');
  },
};

function createFallbackResponse(
  currentCV: PortfolioData,
  jobDescription: JobDescription
): CVOptimizationResult {
  return {
    optimizedAbout: `Experienced professional with expertise in ${currentCV.skills.slice(0, 3).join(', ')}. Seeking ${jobDescription.position} role at ${jobDescription.company} to leverage skills and drive impact.`,
    suggestedTitle: jobDescription.position,
    skillsToReplace: [],
    suggestedSkills: currentCV.skills.slice(0, 5),
    experienceHighlights: [
      'Tailor your experience to match job requirements',
      'Use action verbs and quantify achievements',
      'Highlight relevant accomplishments',
    ],
    projectRecommendations: [
      'Showcase projects demonstrating required skills',
      'Include measurable outcomes and impact',
      'Align projects with company goals',
    ],
    atsKeywords: [
      jobDescription.position,
      jobDescription.company,
      ...currentCV.skills.slice(0, 3)
    ],
  };
}
