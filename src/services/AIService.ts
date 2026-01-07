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
  [key: string]: any;
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
    ]
  };
}

export const AIService = {
  async extractTextFromPDF(file: File): Promise<string> {
    try {
      const pdfjsLib = await import('pdfjs-dist');
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
  "experience": [{"company": "Company name", "position": "Job title", "duration": "2020 - 2023", "description": "Brief description"}],
  "education": [{"institution": "University name", "degree": "Degree name", "duration": "2015 - 2019"}],
  "projects": [{"name": "Project name", "description": "Project description", "skills": ["tech1", "tech2"]}],
  "languages": [{"name": "Language name", "level": "Proficiency level"}]
}

Extract as much relevant information as possible. If a field is not found, omit it.`;

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

  async translateCV(cvData: any, targetLanguage: 'es' | 'en'): Promise<any> {
    try {
      const sourceLanguage = targetLanguage === 'es' ? 'English' : 'Spanish';
      const targetLang = targetLanguage === 'es' ? 'Spanish' : 'English';

      // Solo enviar los campos que necesitan traducción para reducir el tamaño del payload
      const dataToTranslate = {
        about: cvData.about,
        title: cvData.title,
        experience: cvData.experience?.map((exp: any) => ({
          id: exp.id,
          description: exp.description
        })),
        projects: cvData.projects?.map((proj: any) => ({
          id: proj.id,
          description: proj.description
        })),
        education: cvData.education?.map((edu: any) => ({
          id: edu.id,
          description: edu.description
        }))
      };

      const prompt = `Translate from ${sourceLanguage} to ${targetLang}. Only translate the text content, keep IDs unchanged. Return ONLY valid JSON:

${JSON.stringify(dataToTranslate)}`;

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
                content: 'You are a professional translator. Respond only with valid JSON.'
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
        throw new Error(`Error de la IA: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices[0]?.message?.content || '';

      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('La IA no pudo traducir el CV correctamente');
      }

      const translated = JSON.parse(jsonMatch[0]);

      // Reconstruir el CV completo con las traducciones
      const result = { ...cvData };
      
      if (translated.about) result.about = translated.about;
      if (translated.title) result.title = translated.title;
      
      if (translated.experience && Array.isArray(translated.experience)) {
        result.experience = cvData.experience.map((exp: any) => {
          const translatedExp = translated.experience.find((t: any) => t.id === exp.id);
          return {
            ...exp,
            description: translatedExp?.description || exp.description
          };
        });
      }

      if (translated.projects && Array.isArray(translated.projects)) {
        result.projects = cvData.projects.map((proj: any) => {
          const translatedProj = translated.projects.find((t: any) => t.id === proj.id);
          return {
            ...proj,
            description: translatedProj?.description || proj.description
          };
        });
      }

      if (translated.education && Array.isArray(translated.education)) {
        result.education = cvData.education.map((edu: any) => {
          const translatedEdu = translated.education.find((t: any) => t.id === edu.id);
          return {
            ...edu,
            description: translatedEdu?.description || edu.description
          };
        });
      }

      return result;
    } catch (error) {
      console.error('Error translating CV:', error);
      throw new Error('Error al traducir el CV. Intenta nuevamente.');
    }
  }
};
