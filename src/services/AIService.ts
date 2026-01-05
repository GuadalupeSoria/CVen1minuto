/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface ParsedCVData {
  name?: string;
  title?: string;
  about?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  address?: string;
  website?: string;
  skills?: string[];
  experience?: Array<{
    company: string;
    position: string;
    duration: string;
    description?: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    duration?: string;
    description?: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    skills?: string[];
  }>;
  languages?: Array<{
    name: string;
    level?: string;
  }>;
}

export const AIService = {
  async extractTextFromPDF(file: File): Promise<string> {
    try {
      // Dynamically import PDF.js
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set worker source - use unpkg for better Vercel compatibility
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.530/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }
      
      return fullText;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('No se pudo extraer el texto del PDF. Verifica que sea un archivo PDF válido.');
    }
  },

  async parseCVWithAI(pdfText: string, language: 'es' | 'en' = 'es'): Promise<ParsedCVData> {
    try {
      const responseLanguage = language === 'en' ? 'English' : 'Spanish';
      
      const prompt = `You are an expert at parsing CV/Resume information. Extract and structure the following CV text into organized sections.

CV TEXT:
${pdfText}

IMPORTANT: Identify and extract information in ${responseLanguage}. Respond ONLY with valid JSON, no markdown, no extra text.

Parse the CV and return this EXACT JSON structure:
{
  "name": "Full name from CV",
  "title": "Professional title or current position",
  "about": "Professional summary or about section (2-3 sentences)",
  "email": "email@example.com",
  "phone": "+1234567890",
  "linkedin": "https://linkedin.com/in/profile",
  "address": "City, Country",
  "website": "personal website if mentioned",
  "skills": ["skill1", "skill2", "skill3"],
  "experience": [
    {
      "company": "Company name",
      "position": "Job title",
      "duration": "2020 - 2023",
      "description": "Brief description of responsibilities"
    }
  ],
  "education": [
    {
      "institution": "University name",
      "degree": "Degree name",
      "duration": "2015 - 2019",
      "description": "Additional details if any"
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "description": "Project description",
      "skills": ["tech1", "tech2"]
    }
  ],
  "languages": [
    {
      "name": "Language name",
      "level": "Proficiency level"
    }
  ]
}

Extract as much relevant information as possible. If a field is not found, omit it. Be thorough and accurate.`;

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
                content: 'You are an expert CV parser. Always respond with valid JSON only, no markdown formatting.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.3,
            max_tokens: 2000,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API error:', response.status, errorText);
        throw new Error(`Error de la IA: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices[0]?.message?.content || '';

      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        console.log('AI response:', text);
        throw new Error('La IA no pudo procesar el CV correctamente');
      }

      const parsedData: ParsedCVData = JSON.parse(jsonMatch[0]);
      return parsedData;
    } catch (error) {
      console.error('Error parsing CV with AI:', error);
      throw new Error('Error al procesar el CV con IA. Intenta con otro archivo.');
    }
  },

  async importCVFromPDF(file: File, language: 'es' | 'en' = 'es'): Promise<ParsedCVData> {
    const pdfText = await this.extractTextFromPDF(file);
    const parsedData = await this.parseCVWithAI(pdfText, language);
    return parsedData;
  },

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
