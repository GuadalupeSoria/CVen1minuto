/**
 * AGENTE DE CONTENIDO
 * Generación automática de posts y contenido
 */

interface ContentPlan {
  week: number;
  month: string;
  posts: Post[];
  totalReach: number;
  engagementRate: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  platforms: Platform[];
  hashtags: string[];
  cta: string;
  tone: "professional" | "casual" | "educational";
  language: "es" | "en";
  scheduledAt: string;
  estimatedReach: number;
}

interface Platform {
  name: "twitter" | "linkedin" | "instagram" | "tiktok" | "blog";
  format: "text" | "carousel" | "video" | "article";
  charLimit: number;
  aspect: string;
}

export async function generateContentPlan(
  weekNumber: number
): Promise<ContentPlan> {
  console.log(`✍️  Generando plan de contenido para semana ${weekNumber}...`);

  const month = getMonth();
  const posts = await generateWeeklyPosts(weekNumber);

  const totalReach = posts.reduce((sum, p) => sum + p.estimatedReach, 0);
  const engagementRate = calculateEngagementRate(posts);

  return {
    week: weekNumber,
    month,
    posts,
    totalReach,
    engagementRate,
  };
}

async function generateWeeklyPosts(weekNumber: number): Promise<Post[]> {
  const themes = getWeeklyThemes(weekNumber);
  const posts: Post[] = [];

  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i];
    posts.push(
      await createPost(theme, "professional", "es"),
      await createPost(theme, "educational", "en")
    );
  }

  return posts;
}

async function createPost(
  theme: string,
  tone: "professional" | "casual" | "educational",
  language: "es" | "en"
): Promise<Post> {
  const templates = getContentTemplates(tone, language);
  const template = templates[Math.floor(Math.random() * templates.length)];

  const content = adaptTemplate(template, theme, language);
  const hashtags = generateHashtags(theme, language);
  const cta = generateCTA(tone, language);

  return {
    id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: `${theme} - ${tone}`,
    content,
    platforms: selectPlatforms(tone),
    hashtags,
    cta,
    tone,
    language,
    scheduledAt: generateScheduleTime(),
    estimatedReach: Math.floor(Math.random() * 5000) + 1000,
  };
}

function getWeeklyThemes(weekNumber: number): string[] {
  const themes: Record<number, string[]> = {
    1: [
      "Errores comunes en CVs",
      "Cómo optimizar tu CV para ATS",
      "Tendencias en entrevistas 2024",
    ],
    2: [
      "Historias de éxito de usuarios",
      "Tips de networking profesional",
      "Skills más demandados en 2024",
    ],
    3: [
      "Importancia del CV visual",
      "Errores de LinkedIn que cometes",
      "Cómo hablar de logros sin sonar arrogante",
    ],
    4: [
      "Adaptando CV por industria",
      "Cover letter que funciona",
      "Salary negotiation tips",
    ],
  };

  return themes[weekNumber % 4 || 4] || themes[1];
}

function getContentTemplates(tone: string, language: string): string[] {
  const templates: Record<string, Record<string, string[]>> = {
    professional: {
      es: [
        "🎯 Hoy queremos hablar sobre: {theme}\n\nEn CVen1minuto hemos visto que {stat}. Por eso te recomendamos {recommendation}.\n\n¿Aplicas estos cambios a tu CV? {cta}",
        "💡 Un dato importante: {theme}\n\nSegún nuestros análisis, {stat}. La solución: {recommendation}\n\n{cta}",
      ],
      en: [
        "📌 Today we're discussing: {theme}\n\nAt CVen1minuto, we've found that {stat}. Here's what we recommend: {recommendation}\n\n{cta}",
        "💼 Important insight: {theme}\n\nOur data shows {stat}. The solution: {recommendation}\n\n{cta}",
      ],
    },
    educational: {
      es: [
        "🎓 Tutorial: {theme}\n\nPaso 1: {step1}\nPaso 2: {step2}\nPaso 3: {step3}\n\n¿Listo para intentar? {cta}",
        "📚 Todo lo que necesitas saber sobre {theme}:\n\n{explanation}\n\n{recommendation}\n\n{cta}",
      ],
      en: [
        "🎯 Learn: {theme}\n\nStep 1: {step1}\nStep 2: {step2}\nStep 3: {step3}\n\nReady to try? {cta}",
        "📖 Complete guide to {theme}:\n\n{explanation}\n\n{recommendation}\n\n{cta}",
      ],
    },
  };

  return templates[tone]?.[language] || templates.professional.es;
}

function adaptTemplate(template: string, theme: string, language: string): string {
  const replacements: Record<string, string> = {
    "{theme}": theme,
    "{stat}": language === "es"
      ? "el 78% de CVs no está optimizado"
      : "78% of CVs aren't optimized",
    "{recommendation}": language === "es"
      ? "agregar palabras clave relevantes"
      : "add relevant keywords",
    "{explanation}": language === "es"
      ? `${theme} es fundamental para tu carrera profesional`
      : `${theme} is essential for your professional career`,
    "{step1}": language === "es" ? "Identificar tus fortalezas" : "Identify your strengths",
    "{step2}": language === "es" ? "Cuantificar logros" : "Quantify achievements",
    "{step3}": language === "es" ? "Revisar y optimizar" : "Review and optimize",
  };

  let result = template;
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(key, value);
  });

  return result;
}

function generateHashtags(theme: string, language: string): string[] {
  const baseHashtags = [
    "#CVen1minuto",
    "#CarrerasProfesionales",
    "#LinkedInTips",
    "#ConsejosProfesionales",
  ];

  const themeHashtags: Record<string, string[]> = {
    "Errores comunes en CVs": ["#ErroresCV", "#OptimizaCV"],
    "Cómo optimizar tu CV para ATS": ["#ATS", "#CVOptimizado"],
    "Tips de networking": ["#Networking", "#ConexionesLaborales"],
  };

  return [
    ...baseHashtags,
    ...(themeHashtags[theme] || []),
  ];
}

function generateCTA(tone: string, language: string): string {
  const ctas: Record<string, Record<string, string>> = {
    professional: {
      es: "✅ Prueba CVen1minuto ahora - Transforma tu CV en minutos",
      en: "✅ Try CVen1minuto now - Transform your CV in minutes",
    },
    educational: {
      es: "👉 Aprende más en nuestro blog + crea tu CV optimizado",
      en: "👉 Learn more in our blog + create your optimized CV",
    },
  };

  return ctas[tone]?.[language] || ctas.professional.es;
}

function selectPlatforms(tone: string): Platform[] {
  const baseSelection = [
    { name: "linkedin" as const, format: "text" as const, charLimit: 3000, aspect: "1:1" },
    { name: "twitter" as const, format: "text" as const, charLimit: 280, aspect: "16:9" },
  ];

  if (tone === "educational") {
    baseSelection.push({
      name: "blog" as const,
      format: "article" as const,
      charLimit: 2000,
      aspect: "16:9",
    });
  }

  return baseSelection;
}

function generateScheduleTime(): string {
  const times = [
    "09:00",
    "13:00",
    "17:00",
    "20:00",
  ];
  const randomTime = times[Math.floor(Math.random() * times.length)];
  const randomDay = Math.floor(Math.random() * 6) + 1;

  return `2024-04-${String(randomDay).padStart(2, "0")} ${randomTime}:00`;
}

function calculateEngagementRate(posts: Post[]): number {
  // Fórmula simplificada
  return (
    posts.reduce((sum, p) => sum + (Math.random() * 0.08 + 0.02), 0) /
    posts.length
  );
}

function getMonth(): string {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months[new Date().getMonth()];
}
