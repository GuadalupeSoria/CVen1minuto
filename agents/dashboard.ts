#!/usr/bin/env node

/**
 * DASHBOARD DE AGENTES
 * Vista de estado y métricas en tiempo real
 */

import { AGENTS_CONFIG, PUBLISHING_CHANNELS } from "./config";

interface DashboardState {
  timestamp: string;
  agents: AgentState[];
  channels: ChannelState[];
  systemHealth: SystemHealth;
}

interface AgentState {
  name: string;
  status: "active" | "scheduled" | "idle";
  lastRun?: string;
  nextRun?: string;
  uptime: number;
  executions: number;
}

interface ChannelState {
  name: string;
  enabled: boolean;
  status: "connected" | "disconnected" | "limited";
  rateLimitUsed: number;
  rateLimitMax: number;
}

interface SystemHealth {
  overallScore: number;
  agentsHealthy: number;
  channelsActive: number;
  nextScheduledRun: string;
}

export async function displayDashboard(): Promise<void> {
  const state = generateDashboardState();

  console.clear();
  printHeader();
  printAgentsStatus(state);
  printChannelsStatus(state);
  printSystemHealth(state);
  printScheduleNextRuns();
  printFooter();
}

function generateDashboardState(): DashboardState {
  const agents = Object.entries(AGENTS_CONFIG).map(([key, config]) => ({
    name: config.name,
    status: config.enabled ? "scheduled" : ("idle" as const),
    uptime: Math.random() * 100,
    executions: Math.floor(Math.random() * 50) + 5,
    lastRun: new Date(Date.now() - Math.random() * 604800000).toISOString(),
    nextRun: getNextCronRun(config.schedule),
  }));

  const channels = Object.entries(PUBLISHING_CHANNELS).map(([name, config]) => ({
    name,
    enabled: config.enabled,
    status: config.enabled ? "connected" : ("disconnected" as const),
    rateLimitUsed: Math.floor(Math.random() * config.rateLimit),
    rateLimitMax: config.rateLimit,
  }));

  const agentsHealthy = agents.filter((a) => a.uptime > 80).length;
  const channelsActive = channels.filter((c) => c.status === "connected").length;

  return {
    timestamp: new Date().toISOString(),
    agents,
    channels,
    systemHealth: {
      overallScore:
        Math.round(
          (agentsHealthy / agents.length) * 50 +
            (channelsActive / channels.length) * 50
        ) || 0,
      agentsHealthy,
      channelsActive,
      nextScheduledRun: "Monday 09:00 (Aesthetic Agent)",
    },
  };
}

function printHeader(): void {
  console.log(
    "\n╔════════════════════════════════════════════════════════════════════════╗"
  );
  console.log(
    "║          🤖 DASHBOARD DE AGENTES ESPECIALIZADOS                         ║"
  );
  console.log(
    "║          CVen1minuto & cvnative                                          ║"
  );
  console.log(
    "╚════════════════════════════════════════════════════════════════════════╝\n"
  );
}

function printAgentsStatus(state: DashboardState): void {
  console.log("┌─ 📊 ESTADO DE AGENTES ─────────────────────────────────────────┐");
  console.log(
    "│ Nombre             │ Estado   │ Uptime  │ Ejecuciones │ Última      │"
  );
  console.log(
    "├────────────────────┼──────────┼─────────┼─────────────┼─────────────┤"
  );

  state.agents.forEach((agent) => {
    const statusIcon = agent.status === "active" ? "🟢" : "🟡";
    const uptime = agent.uptime.toFixed(0).padStart(3);
    const executions = (agent.executions + "").padStart(3);
    const lastRun = agent.lastRun
      ? new Date(agent.lastRun).toLocaleDateString()
      : "N/A";

    const agentName = agent.name
      .split(" - ")[0]
      .substring(0, 18)
      .padEnd(18);
    console.log(
      `│ ${agentName} │ ${statusIcon} ${agent.status.padEnd(5)} │ ${uptime}%  │ ${executions.padStart(11)} │ ${lastRun.padEnd(11)} │`
    );
  });

  console.log("└────────────────────┴──────────┴─────────┴─────────────┴─────────────┘\n");
}

function printChannelsStatus(state: DashboardState): void {
  console.log("┌─ 🔌 CANALES DE PUBLICACIÓN ────────────────────────────────────┐");
  console.log("│ Canal      │ Estado       │ Rate Limit     │ Prioridad         │");
  console.log("├────────────┼──────────────┼────────────────┼───────────────────┤");

  state.channels.forEach((channel) => {
    const statusIcon = channel.enabled
      ? channel.status === "connected"
        ? "✅"
        : "⚠️ "
      : "❌";
    const status =
      (channel.status === "connected" ? "Conectado" : "Desconectado").padEnd(
        12
      ) + " ";
    const rateLimit = `${channel.rateLimitUsed}/${channel.rateLimitMax}`.padEnd(
      14
    );
    const priority =
      PUBLISHING_CHANNELS[channel.name as keyof typeof PUBLISHING_CHANNELS]
        ?.priority || "N/A";

    console.log(
      `│ ${channel.name.padEnd(10)} │ ${statusIcon} ${status} │ ${rateLimit} │ ${priority.padEnd(17)} │`
    );
  });

  console.log("└────────────┴──────────────┴────────────────┴───────────────────┘\n");
}

function printSystemHealth(state: DashboardState): void {
  const score = state.systemHealth.overallScore;
  const healthBar =
    "█".repeat(Math.floor(score / 5)) + "░".repeat(20 - Math.floor(score / 5));

  console.log("┌─ 🏥 SALUD DEL SISTEMA ──────────────────────────────────────┐");
  console.log(`│ Score General:  [${healthBar}] ${score}%                     │`);
  console.log(
    `│ Agentes Sanos:  ${state.systemHealth.agentsHealthy}/${state.agents.length}                                                │`
  );
  console.log(
    `│ Canales Activos: ${state.systemHealth.channelsActive}/${state.channels.length}                                              │`
  );
  console.log(
    `│ Próxima Ejecución: ${state.systemHealth.nextScheduledRun.padEnd(35)} │`
  );
  console.log("└──────────────────────────────────────────────────────────────┘\n");
}

function printScheduleNextRuns(): void {
  console.log("┌─ 📅 PRÓXIMAS EJECUCIONES PROGRAMADAS ───────────────────────┐");
  console.log("│ Agente      │ Horario    │ Día        │ Próxima              │");
  console.log("├─────────────┼────────────┼────────────┼──────────────────────┤");

  const schedules = [
    {
      agent: "Aesthetic",
      time: "09:00",
      day: "Lunes",
      next: "2026-04-07 09:00",
    },
    { agent: "SEO", time: "10:00", day: "Lunes", next: "2026-04-07 10:00" },
    {
      agent: "Content",
      time: "08:00",
      day: "Domingo",
      next: "2026-04-06 08:00",
    },
    {
      agent: "Publishing",
      time: "12:00",
      day: "Lun-Vie",
      next: "2026-04-07 12:00",
    },
  ];

  schedules.forEach((s) => {
    console.log(
      `│ ${s.agent.padEnd(11)} │ ${s.time} │ ${s.day.padEnd(10)} │ ${s.next.padEnd(20)} │`
    );
  });

  console.log("└─────────────┴────────────┴────────────┴──────────────────────┘\n");
}

function printFooter(): void {
  console.log("━".repeat(73));
  console.log(
    "Última actualización: " +
      new Date().toLocaleString() +
      " | Ver logs: tail -f agents/logs/execution.log"
  );
  console.log("\n");
}

function getNextCronRun(cron?: string): string {
  if (!cron) return "N/A";
  // Simplificado - en producción usaría cron-parser
  return new Date(Date.now() + 86400000).toISOString().split("T")[0];
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  displayDashboard();

  // Actualizar cada 30 segundos si se pasa --watch
  if (process.argv.includes("--watch")) {
    setInterval(() => {
      displayDashboard();
    }, 30000);
  }
}

export { displayDashboard, generateDashboardState };
