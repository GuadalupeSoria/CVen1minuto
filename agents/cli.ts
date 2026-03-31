#!/usr/bin/env node

/**
 * CLI para invocar agentes de forma manual
 * Uso: npx ts-node agents/cli.ts <agent> [options]
 */

import { analyzeAesthetic } from "./aesthetic/analyzer";
import { auditSEO } from "./seo/analyzer";
import { generateContentPlan } from "./content/generator";
import { publishContent, getPublishingAnalytics } from "./publishing/publisher";
import { runAllAgents } from "./orchestrator";

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  if (!command) {
    printHelp();
    process.exit(0);
  }

  try {
    switch (command) {
      case "aesthetic":
        await handleAesthetic(args[1] || "web");
        break;

      case "seo":
        await handleSEO(args[1] || "web");
        break;

      case "content":
        await handleContent(args[1]);
        break;

      case "publish":
        await handlePublish(args[1], args[2]);
        break;

      case "analytics":
        await handleAnalytics(parseInt(args[1] || "7", 10));
        break;

      case "all":
        await handleAll();
        break;

      default:
        console.error(`❌ Comando desconocido: ${command}`);
        printHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error(
      "❌ Error:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    process.exit(1);
  }
}

async function handleAesthetic(app: string) {
  console.log("\n🎨 Analizando estética...\n");
  const result = await analyzeAesthetic(app as "web" | "native");

  console.log(`Score general: ${result.overallScore}/100\n`);
  console.log("📋 Componentes analizados:");
  result.components.forEach((c) => {
    console.log(`  • ${c.name}: ${Math.round(c.consistency)}% consistencia`);
  });

  console.log(`\n🎯 Top ${result.recommendations.length} recomendaciones:`);
  result.recommendations.slice(0, 5).forEach((r, i) => {
    console.log(`  ${i + 1}. [${r.priority.toUpperCase()}] ${r.issue}`);
    console.log(`     → Solución: ${r.solution}`);
  });
}

async function handleSEO(site: string) {
  console.log("\n🔍 Auditando SEO...\n");
  const result = await auditSEO(site as "web" | "native");

  console.log(`Score SEO: ${result.overall}/100\n`);
  console.log("📊 Por categoría:");
  result.categories.forEach((c) => {
    console.log(`  • ${c.name}: ${c.score}/100`);
  });

  console.log(`\n💡 Top recomendaciones:`);
  result.recommendations.slice(0, 3).forEach((r) => {
    console.log(`  • [${r.priority}] ${r.issue}`);
  });

  console.log(`\n🔑 Oportunidades de keywords:`);
  result.opportunities.slice(0, 3).forEach((o) => {
    console.log(
      `  • "${o.keyword}" - Oportunidad: ${Math.round(o.opportunity)}`
    );
  });
}

async function handleContent(weekNumber?: string) {
  console.log("\n✍️  Generando plan de contenido...\n");
  const week = parseInt(weekNumber || "1", 10);
  const result = await generateContentPlan(week);

  console.log(`📅 Semana ${result.week} de ${result.month}\n`);
  console.log(`📝 Posts generados: ${result.posts.length}`);
  console.log(`📊 Reach estimado: ${Math.round(result.totalReach).toLocaleString()}`);
  console.log(`💬 Engagement rate: ${(result.engagementRate * 100).toFixed(2)}%\n`);

  console.log("Posts:");
  result.posts.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.title}`);
    console.log(`     Plataformas: ${p.platforms.map((pl) => pl.name).join(", ")}`);
    console.log(`     Hashtags: ${p.hashtags.join(" ")}`);
  });
}

async function handlePublish(postId?: string, channels?: string) {
  if (!postId || !channels) {
    console.error("❌ Uso: npx ts-node agents/cli.ts publish <postId> <channels>");
    console.error("   Ej: npx ts-node agents/cli.ts publish post_123 linkedin,twitter");
    process.exit(1);
  }

  const channelList = channels.split(",");
  const content = `[Post de contenido generado automáticamente - ID: ${postId}]`;

  console.log(`\n📢 Publicando ${postId} en ${channelList.length} canales...\n`);
  const result = await publishContent(postId, content, channelList);

  console.log(`✅ Publicación completada:\n`);
  result.channels.forEach((c) => {
    const icon = c.status === "success" ? "✅" : "⏳";
    console.log(`  ${icon} ${c.channel}: ${c.status}`);
    if (c.url) console.log(`     URL: ${c.url}`);
  });

  console.log(`\n📈 Reach total: ${Math.round(result.totalReach).toLocaleString()}`);
  console.log(`👁️  Impresiones: ${Math.round(result.totalImpressions).toLocaleString()}`);
}

async function handleAnalytics(days: number) {
  console.log(`\n📊 Analytics de los últimos ${days} días...\n`);
  const result = await getPublishingAnalytics(days);

  console.log("📈 Por plataforma:");
  Object.entries(result.channels).forEach(([platform, data]) => {
    console.log(`\n  ${platform.toUpperCase()}`);
    console.log(`    Posts: ${data.posts}`);
    console.log(`    Reach: ${data.totalReach.toLocaleString()}`);
    console.log(
      `    Engagement: ${(data.engagementRate * 100).toFixed(2)}%`
    );
  });

  console.log("\n🌟 Top performers:");
  result.topPerformers.forEach((p) => {
    console.log(`  • "${p.title}" (${p.platform})`);
    console.log(`    Reach: ${p.reach.toLocaleString()}`);
  });
}

async function handleAll() {
  const result = await runAllAgents();
  console.log("\n" + result.summary);
}

function printHelp() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║        SISTEMA DE AGENTES ESPECIALIZADOS                  ║
║        CVen1minuto & cvnative                              ║
╚════════════════════════════════════════════════════════════╝

COMANDOS DISPONIBLES:

  🎨 AESTHETIC
    $ npm run agent:aesthetic [web|native]
    Analiza diseño, componentes y accesibilidad

  🔍 SEO
    $ npm run agent:seo [web|native]
    Auditoría completa de SEO

  ✍️  CONTENT
    $ npm run agent:content [week]
    Genera plan de contenido semanal

  📢 PUBLISHING
    $ npm run agent:publish <postId> <channels>
    Publica contenido en redes

  📊 ANALYTICS
    $ npm run agent:analytics [days]
    Obtiene metrics de publicación

  🤖 ALL
    $ npm run agent:all
    Ejecuta todos los agentes

EJEMPLOS:

  npm run agent:aesthetic
  npm run agent:seo web
  npm run agent:content 2
  npm run agent:publish post_123 linkedin,twitter,blog
  npm run agent:analytics 14
  npm run agent:all

CONFIGURACIÓN DE TRIGGERS REMOTOS:

  npm run agents:schedule      # Configura ejecuciones automáticas
  npm run agents:list          # Lista todos los triggers

Para más info: https://github.com/guada/CVen1minuto
`);
}

main();
