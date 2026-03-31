/**
 * AGENTE DE ESTÉTICA & DISEÑO
 * Analiza y mejora la UI/UX en web y mobile
 */

import { analyze } from "../../src/utils/analyzer";

interface AestheticReport {
  app: "web" | "native";
  components: ComponentAnalysis[];
  designSystem: DesignSystemReview;
  accessibility: AccessibilityReport;
  recommendations: Recommendation[];
  overallScore: number;
}

interface ComponentAnalysis {
  name: string;
  location: string;
  consistency: number;
  accessibility: number;
  modernness: number;
  issues: string[];
}

interface DesignSystemReview {
  colors: ColorAnalysis;
  typography: TypographyAnalysis;
  spacing: SpacingAnalysis;
  consistency: number;
}

interface AccessibilityReport {
  contrast: number;
  semanticHTML: number;
  ariaLabels: number;
  keyboardNavigation: number;
  issues: string[];
}

interface Recommendation {
  priority: "high" | "medium" | "low";
  category: string;
  issue: string;
  solution: string;
  impact: string;
}

interface ColorAnalysis {
  colors: string[];
  consistency: number;
  accessibility: number;
  suggestions: string[];
}

interface TypographyAnalysis {
  fonts: string[];
  consistency: number;
  readability: number;
  suggestions: string[];
}

interface SpacingAnalysis {
  consistency: number;
  alignment: number;
  suggestions: string[];
}

export async function analyzeAesthetic(
  appType: "web" | "native"
): Promise<AestheticReport> {
  console.log(`🎨 Analizando estética de ${appType}...`);

  const components = await analyzeComponents(appType);
  const designSystem = await analyzeDesignSystem(appType);
  const accessibility = await analyzeAccessibility(appType);
  const recommendations = generateRecommendations(
    components,
    designSystem,
    accessibility
  );

  const overallScore = calculateScore(
    components,
    designSystem,
    accessibility
  );

  return {
    app: appType,
    components,
    designSystem,
    accessibility,
    recommendations: recommendations.sort(
      (a, b) =>
        (a.priority === "high" ? 0 : a.priority === "medium" ? 1 : 2) -
        (b.priority === "high" ? 0 : b.priority === "medium" ? 1 : 2)
    ),
    overallScore,
  };
}

async function analyzeComponents(
  appType: "web" | "native"
): Promise<ComponentAnalysis[]> {
  // Simulación - en producción, usaría AST parsing
  const baseComponents = ["Header", "Button", "Card", "Form", "Modal"];

  return baseComponents.map((name) => ({
    name,
    location: getComponentPath(appType, name),
    consistency: Math.random() * 100,
    accessibility: Math.random() * 100,
    modernness: Math.random() * 100,
    issues: generateIssues(name),
  }));
}

async function analyzeDesignSystem(
  appType: "web" | "native"
): Promise<DesignSystemReview> {
  return {
    colors: {
      colors: ["#1F2937", "#3B82F6", "#10B981", "#F59E0B"],
      consistency: 85,
      accessibility: 78,
      suggestions: [
        "Mejorar contraste en botones secundarios",
        "Agregar paleta de colores oscuros para dark mode",
      ],
    },
    typography: {
      fonts: ["Inter", "Poppins"],
      consistency: 90,
      readability: 88,
      suggestions: [
        "Reducir tamaño de fuente en mobile para mejor legibilidad",
      ],
    },
    spacing: {
      consistency: 82,
      alignment: 88,
      suggestions: ["Estandarizar padding en tarjetas"],
    },
    consistency: 85,
  };
}

async function analyzeAccessibility(
  appType: "web" | "native"
): Promise<AccessibilityReport> {
  return {
    contrast: 82,
    semanticHTML: appType === "web" ? 85 : 90,
    ariaLabels: 70,
    keyboardNavigation: appType === "web" ? 75 : 80,
    issues: [
      "Falta aria-label en botón de cerrar modal",
      "Contraste insuficiente en texto gris",
      "Falta de focus visible en inputs",
    ],
  };
}

function generateRecommendations(
  components: ComponentAnalysis[],
  designSystem: DesignSystemReview,
  accessibility: AccessibilityReport
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Recomendaciones por accesibilidad
  if (accessibility.contrast < 85) {
    recommendations.push({
      priority: "high",
      category: "Accesibilidad",
      issue: "Contraste de color insuficiente",
      solution: "Aumentar contraste a mínimo AA (4.5:1)",
      impact: "Mejora experiencia para usuarios con baja visión",
    });
  }

  // Recomendaciones por consistencia
  if (designSystem.consistency < 80) {
    recommendations.push({
      priority: "high",
      category: "Design System",
      issue: "Inconsistencia en espaciado",
      solution: "Implementar grid system de 4px o 8px",
      impact: "Mejora coherencia visual",
    });
  }

  // Recomendaciones por modernidad
  const lowScoreComponents = components.filter((c) => c.modernness < 70);
  if (lowScoreComponents.length > 0) {
    recommendations.push({
      priority: "medium",
      category: "Modernización",
      issue: `${lowScoreComponents.length} componentes necesitan actualización visual`,
      solution: "Revisar y actualizar según últimas tendencias de diseño",
      impact: "Mejora percepción de calidad",
    });
  }

  return recommendations;
}

function calculateScore(
  components: ComponentAnalysis[],
  designSystem: DesignSystemReview,
  accessibility: AccessibilityReport
): number {
  const componentAvg =
    components.reduce((a, b) => a + b.consistency, 0) / components.length;
  const scores = [
    componentAvg * 0.3,
    designSystem.consistency * 0.3,
    ((accessibility.contrast +
      accessibility.ariaLabels +
      accessibility.keyboardNavigation) /
      3) *
      0.4,
  ];

  return Math.round(scores.reduce((a, b) => a + b, 0));
}

function getComponentPath(appType: "web" | "native", name: string): string {
  if (appType === "web") {
    return `src/components/${name}.tsx`;
  }
  return `src/screens/${name}Screen.tsx`;
}

function generateIssues(componentName: string): string[] {
  const issues: Record<string, string[]> = {
    Header: ["Padding inconsistente en mobile", "Logo mal alineado"],
    Button: [
      "Falta state hover",
      "Contraste insuficiente en modo oscuro",
    ],
    Card: ["Sombra no está en design system", "Border radius variable"],
    Form: ["Labels no visible en campo vacío", "Error spacing inconsistente"],
    Modal: ["Falta backdrop blur", "Close button sin aria-label"],
  };

  return issues[componentName] || [];
}
