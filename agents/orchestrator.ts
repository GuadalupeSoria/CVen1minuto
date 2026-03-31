/**
 * ORQUESTADOR CENTRAL DE AGENTES
 * Coordina la ejecución de todos los agentes especializados
 */

import { analyzeAesthetic } from "./aesthetic/analyzer";
import { auditSEO } from "./seo/analyzer";
import { generateContentPlan } from "./content/generator";
import { publishContent, getPublishingAnalytics } from "./publishing/publisher";

interface AgentExecution {
  timestamp: string;
  agents: AgentResult[];
  summary: string;
  metrics: {
    totalExecutionTime: number;
    successRate: number;
  };
}

interface AgentResult {
  name: string;
  type: "aesthetic" | "seo" | "content" | "publishing";
  status: "success" | "failed";
  duration: number;
  data?: unknown;
  error?: string;
}

async function runAllAgents(): Promise<AgentExecution> {
  console.log("\n🤖 Iniciando ejecución de todos los agentes...\n");

  const startTime = Date.now();
  const agents: AgentResult[] = [];

  // Ejecutar agentes en paralelo
  const [aesthetic, seo, content, analytics] = await Promise.allSettled([
    executeAestheticAgent(),
    executeSEOAgent(),
    executeContentAgent(),
    executePublishingAgent(),
  ]);

  if (aesthetic.status === "fulfilled") {
    agents.push(aesthetic.value);
  } else {
    agents.push({
      name: "Aesthetic Agent",
      type: "aesthetic",
      status: "failed",
      duration: 0,
      error: aesthetic.reason?.message,
    });
  }

  if (seo.status === "fulfilled") {
    agents.push(seo.value);
  } else {
    agents.push({
      name: "SEO Agent",
      type: "seo",
      status: "failed",
      duration: 0,
      error: seo.reason?.message,
    });
  }

  if (content.status === "fulfilled") {
    agents.push(content.value);
  } else {
    agents.push({
      name: "Content Agent",
      type: "content",
      status: "failed",
      duration: 0,
      error: content.reason?.message,
    });
  }

  if (analytics.status === "fulfilled") {
    agents.push(analytics.value);
  } else {
    agents.push({
      name: "Publishing Agent",
      type: "publishing",
      status: "failed",
      duration: 0,
      error: analytics.reason?.message,
    });
  }

  const duration = Date.now() - startTime;
  const successCount = agents.filter((a) => a.status === "success").length;
  const successRate = (successCount / agents.length) * 100;

  const summary = generateSummary(agents);

  return {
    timestamp: new Date().toISOString(),
    agents,
    summary,
    metrics: {
      totalExecutionTime: duration,
      successRate: Math.round(successRate),
    },
  };
}

async function executeAestheticAgent(): Promise<AgentResult> {
  const start = Date.now();
  console.log("🎨 [Aesthetic Agent] Analizando diseño web...");

  try {
    const data = await analyzeAesthetic("web");
    console.log(`✅ [Aesthetic] Score: ${data.overallScore}/100`);

    return {
      name: "Aesthetic Agent",
      type: "aesthetic",
      status: "success",
      duration: Date.now() - start,
      data,
    };
  } catch (error) {
    return {
      name: "Aesthetic Agent",
      type: "aesthetic",
      status: "failed",
      duration: Date.now() - start,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

async function executeSEOAgent(): Promise<AgentResult> {
  const start = Date.now();
  console.log("🔍 [SEO Agent] Auditando SEO...");

  try {
    const data = await auditSEO("web");
    console.log(`✅ [SEO] Score: ${data.overall}/100`);

    return {
      name: "SEO Agent",
      type: "seo",
      status: "success",
      duration: Date.now() - start,
      data,
    };
  } catch (error) {
    return {
      name: "SEO Agent",
      type: "seo",
      status: "failed",
      duration: Date.now() - start,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

async function executeContentAgent(): Promise<AgentResult> {
  const start = Date.now();
  console.log("✍️  [Content Agent] Generando plan de contenido...");

  try {
    const weekNumber = Math.ceil(new Date().getDate() / 7);
    const data = await generateContentPlan(weekNumber);
    console.log(`✅ [Content] ${data.posts.length} posts generados`);

    return {
      name: "Content Agent",
      type: "content",
      status: "success",
      duration: Date.now() - start,
      data,
    };
  } catch (error) {
    return {
      name: "Content Agent",
      type: "content",
      status: "failed",
      duration: Date.now() - start,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

async function executePublishingAgent(): Promise<AgentResult> {
  const start = Date.now();
  console.log("📢 [Publishing Agent] Obteniendo analytics...");

  try {
    const data = await getPublishingAnalytics(7);
    console.log(`✅ [Publishing] Datos de 7 días recopilados`);

    return {
      name: "Publishing Agent",
      type: "publishing",
      status: "success",
      duration: Date.now() - start,
      data,
    };
  } catch (error) {
    return {
      name: "Publishing Agent",
      type: "publishing",
      status: "failed",
      duration: Date.now() - start,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

function generateSummary(agents: AgentResult[]): string {
  const lines = [
    "📊 REPORTE DE AGENTES ESPECIALIZADOS",
    `📅 ${new Date().toLocaleString()}`,
    "",
    "Resultados por agente:",
  ];

  agents.forEach((agent) => {
    const icon = agent.status === "success" ? "✅" : "❌";
    lines.push(
      `${icon} ${agent.name}: ${agent.duration}ms`
    );
  });

  const successCount = agents.filter((a) => a.status === "success").length;
  const totalCount = agents.length;

  lines.push("");
  lines.push(`📈 Éxito general: ${successCount}/${totalCount} agentes`);

  return lines.join("\n");
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllAgents().then((result) => {
    console.log("\n" + result.summary);
    console.log(
      `\n⏱️  Tiempo total de ejecución: ${result.metrics.totalExecutionTime}ms`
    );
    console.log(`✅ Tasa de éxito: ${result.metrics.successRate}%\n`);
    process.exit(result.metrics.successRate === 100 ? 0 : 1);
  });
}

export { runAllAgents };
