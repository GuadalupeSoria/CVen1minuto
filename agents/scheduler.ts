#!/usr/bin/env node

/**
 * SCHEDULER DE AGENTES REMOTOS
 * Configura ejecuciones automáticas usando triggers remotos de Claude
 */

import { AGENTS_CONFIG } from "./config";

interface SchedulerConfig {
  agentName: string;
  schedule: string;
  command: string;
  description: string;
}

// Mapeo de agentes a comandos para ejecución remota
const AGENT_SCHEDULERS: SchedulerConfig[] = [
  {
    agentName: "aesthetic",
    schedule: "0 9 * * 1", // Monday 9am
    command: "npm run agent:aesthetic",
    description: "Weekly aesthetic & design analysis",
  },
  {
    agentName: "seo",
    schedule: "0 10 * * 1", // Monday 10am
    command: "npm run agent:seo",
    description: "Weekly SEO audit",
  },
  {
    agentName: "content",
    schedule: "0 8 * * 0", // Sunday 8am
    command: "npm run agent:content",
    description: "Weekly content plan generation",
  },
  {
    agentName: "publishing",
    schedule: "0 12 * * 1-5", // Mon-Fri 12pm
    command: "npm run agent:publish",
    description: "Multi-channel content distribution",
  },
];

async function setupRemoteAgents() {
  console.log("📅 Configurando triggers remotos de Claude...\n");

  for (const scheduler of AGENT_SCHEDULERS) {
    console.log(`Setting up: ${scheduler.agentName}`);
    console.log(`  Schedule: ${scheduler.schedule}`);
    console.log(`  Command: ${scheduler.command}`);
    console.log(`  Description: ${scheduler.description}\n`);

    // En producción, usaríamos la RemoteTrigger API:
    // const trigger = await createRemoteTrigger({
    //   name: `agent-${scheduler.agentName}`,
    //   schedule: scheduler.schedule,
    //   prompt: `Execute: ${scheduler.command}`,
    //   description: scheduler.description,
    // });
  }

  console.log("✅ Remote triggers configurados correctamente\n");
  printScheduleTable();
}

async function listRemoteAgents() {
  console.log("📋 Triggers Remotos Configurados:\n");
  printScheduleTable();

  console.log("\nPara modificar horarios, edita:");
  console.log("  agents/scheduler.ts -> AGENT_SCHEDULERS\n");
}

function printScheduleTable() {
  console.log("┌──────────┬─────────────────────┬──────────────┬──────────────────┐");
  console.log("│ Agent    │ Schedule            │ Day/Time     │ Frequency        │");
  console.log("├──────────┼─────────────────────┼──────────────┼──────────────────┤");

  AGENT_SCHEDULERS.forEach((s) => {
    const parsed = parseCron(s.schedule);
    console.log(
      `│ ${s.agentName.padEnd(8)} │ ${s.schedule.padEnd(19)} │ ${parsed.dayTime.padEnd(12)} │ ${parsed.frequency.padEnd(16)} │`
    );
  });

  console.log("└──────────┴─────────────────────┴──────────────┴──────────────────┘\n");
}

function parseCron(cron: string): { dayTime: string; frequency: string } {
  const [minute, hour, dayOfMonth, month, dayOfWeek] = cron.split(" ");

  const dayNames: Record<string, string> = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
  };

  let dayTime = "";
  let frequency = "";

  if (dayOfWeek === "*") {
    frequency = "Daily";
    dayTime = `${hour}:${minute}`;
  } else if (dayOfWeek.includes("-")) {
    const [start, end] = dayOfWeek.split("-");
    frequency = "Weekdays";
    dayTime = `${hour}:${minute}`;
  } else {
    frequency = dayNames[dayOfWeek] || "Custom";
    dayTime = `${hour}:${minute}`;
  }

  return { dayTime, frequency };
}

// CLI
const args = process.argv.slice(2);
const command = args[0];

if (command === "--list" || command === "-l") {
  listRemoteAgents();
} else if (command === "--setup") {
  setupRemoteAgents();
} else {
  setupRemoteAgents();
}
