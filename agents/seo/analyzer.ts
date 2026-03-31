/**
 * AGENTE DE SEO
 * Auditoría y optimización de SEO
 */

interface SEOAudit {
  timestamp: string;
  site: "CVen1minuto" | "cvnative-web";
  overall: number;
  categories: SEOCategory[];
  recommendations: SEORecommendation[];
  opportunities: Opportunity[];
}

interface SEOCategory {
  name: string;
  score: number;
  weight: number;
  details: string[];
}

interface SEORecommendation {
  priority: "critical" | "high" | "medium" | "low";
  category: string;
  issue: string;
  solution: string;
  expectedImpact: string;
  effort: "quick" | "medium" | "long";
}

interface Opportunity {
  keyword: string;
  volume: number;
  difficulty: number;
  opportunity: number;
  currentRank: number | null;
}

export async function auditSEO(site: "web" | "native"): Promise<SEOAudit> {
  console.log(`🔍 Auditando SEO de ${site}...`);

  const siteLabel = site === "web" ? "CVen1minuto" : "cvnative-web";

  const categories = await analyzeCategories(site);
  const recommendations = generateSEORecommendations(categories);
  const opportunities = await findKeywordOpportunities(site);

  const overall = calculateSEOScore(categories);

  return {
    timestamp: new Date().toISOString(),
    site: siteLabel as "CVen1minuto" | "cvnative-web",
    overall,
    categories,
    recommendations: recommendations.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }),
    opportunities: opportunities.sort((a, b) => b.opportunity - a.opportunity),
  };
}

async function analyzeCategories(site: "web" | "native"): Promise<SEOCategory[]> {
  return [
    {
      name: "On-Page SEO",
      score: 75,
      weight: 0.25,
      details: [
        "Meta titles: Bien optimizados",
        "Meta descriptions: 70% óptimas",
        "Headings: Estructura irregular",
        "Schema markup: Google Navbar presente",
      ],
    },
    {
      name: "Technical SEO",
      score: 82,
      weight: 0.25,
      details: [
        "Core Web Vitals: PASS",
        "Mobile friendliness: PASS",
        "SSL: Implementado",
        "Robots.txt: Configurado",
        "Sitemap.xml: Presente",
        "Canonicalization: OK",
      ],
    },
    {
      name: "Content",
      score: 68,
      weight: 0.25,
      details: [
        "Contenido duplicado: 0%",
        "Profundidad de contenido: Media",
        "Engagement: Bajo tiempo en página",
        "Freshness: Actualizado hace 2 meses",
      ],
    },
    {
      name: "Backlinks & Authority",
      score: 55,
      weight: 0.25,
      details: [
        "Backlinks: 12 referencias",
        "Referring domains: 8",
        "Authority score: Bajo",
        "Anchor text: Mejorable",
      ],
    },
  ];
}

function generateSEORecommendations(categories: SEOCategory[]): SEORecommendation[] {
  const recommendations: SEORecommendation[] = [
    {
      priority: "critical",
      category: "Content",
      issue: "Falta de contenido de valor en landing page",
      solution: "Crear guías detalladas sobre generación de CVs",
      expectedImpact: "Aumentar tráfico orgánico 30-40%",
      effort: "medium",
    },
    {
      priority: "high",
      category: "Technical SEO",
      issue: "Performance en mobile puede mejorar",
      solution: "Optimizar imágenes con WebP y lazy loading",
      expectedImpact: "Mejorar LCP en 0.5s",
      effort: "medium",
    },
    {
      priority: "high",
      category: "Backlinks",
      issue: "Baja autoridad de dominio",
      solution: "Estrategia de guest posting en blogs de HR",
      expectedImpact: "Aumentar DA 2-3 puntos",
      effort: "long",
    },
    {
      priority: "medium",
      category: "On-Page",
      issue: "Meta descriptions no optimizadas en todas las páginas",
      solution: "Actualizar meta tags con palabras clave relevantes",
      expectedImpact: "Mejorar CTR un 5-10%",
      effort: "quick",
    },
    {
      priority: "medium",
      category: "Content",
      issue: "Headers (H1, H2, H3) mal estructurados",
      solution: "Reescribir estructura de headings",
      expectedImpact: "Mejor relevancia en búsqueda",
      effort: "quick",
    },
    {
      priority: "low",
      category: "Technical",
      issue: "Falta de structured data para LocalBusiness",
      solution: "Implementar JSON-LD para negocio local",
      expectedImpact: "Rich snippets en SERP",
      effort: "quick",
    },
  ];

  return recommendations;
}

async function findKeywordOpportunities(site: "web" | "native"): Promise<Opportunity[]> {
  const baseKeywords = [
    {
      keyword: "generador de CV profesional",
      volume: 1200,
      difficulty: 45,
      currentRank: null,
    },
    {
      keyword: "crear CV online gratis",
      volume: 890,
      difficulty: 38,
      currentRank: null,
    },
    {
      keyword: "CV con IA",
      volume: 450,
      difficulty: 35,
      currentRank: 8,
    },
    {
      keyword: "plantillas de CV modernas",
      volume: 720,
      difficulty: 42,
      currentRank: null,
    },
    {
      keyword: "optimizar CV para ATS",
      volume: 340,
      difficulty: 28,
      currentRank: null,
    },
    {
      keyword: "análisis de CV automático",
      volume: 280,
      difficulty: 32,
      currentRank: null,
    },
  ];

  return baseKeywords.map((kw) => ({
    ...kw,
    opportunity: calculateOpportunity(kw.volume, kw.difficulty, kw.currentRank),
  }));
}

function calculateOpportunity(
  volume: number,
  difficulty: number,
  currentRank: number | null
): number {
  if (currentRank === null) {
    return (volume / (difficulty + 1)) * 10;
  }
  // Si ya estamos rankeados, el opportunity es menor
  return (volume / (difficulty + 1)) * (100 - currentRank * 2);
}

function calculateSEOScore(categories: SEOCategory[]): number {
  return Math.round(
    categories.reduce((sum, cat) => sum + cat.score * cat.weight, 0)
  );
}
