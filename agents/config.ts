/**
 * CONFIGURACIÓN DE AGENTES
 * Define comportamiento, horarios y parámetros de cada agente
 */

export interface AgentConfig {
  name: string;
  enabled: boolean;
  schedule?: string; // Cron format: "0 9 * * *" = 9am daily
  runOn: "local" | "remote" | "hybrid";
  timeout: number; // milliseconds
  notifications?: {
    slack?: boolean;
    email?: boolean;
    webhook?: string;
  };
}

export const AGENTS_CONFIG: Record<string, AgentConfig> = {
  aesthetic: {
    name: "Aesthetic Agent - Web & Mobile Design Analysis",
    enabled: true,
    schedule: "0 9 * * 1", // Mondays at 9am
    runOn: "local", // Fast execution locally
    timeout: 300000, // 5 minutes
    notifications: {
      slack: true,
      email: false,
      webhook: process.env.SLACK_WEBHOOK_AESTHETIC,
    },
  },

  seo: {
    name: "SEO Agent - Complete Audit",
    enabled: true,
    schedule: "0 10 * * 1", // Mondays at 10am
    runOn: "remote", // Cloud execution for web crawling
    timeout: 600000, // 10 minutes
    notifications: {
      slack: true,
      email: true,
    },
  },

  content: {
    name: "Content Agent - Weekly Post Generation",
    enabled: true,
    schedule: "0 8 * * 0", // Sundays at 8am
    runOn: "hybrid", // Can run anywhere
    timeout: 300000, // 5 minutes
    notifications: {
      slack: true,
      webhook: process.env.SLACK_WEBHOOK_CONTENT,
    },
  },

  publishing: {
    name: "Publishing Agent - Multi-Channel Distribution",
    enabled: true,
    schedule: "0 12 * * 1-5", // Mon-Fri at 12pm
    runOn: "remote", // Needs API access
    timeout: 240000, // 4 minutes
    notifications: {
      slack: false,
      email: true,
    },
  },
};

// Configuración de canales de publicación
export const PUBLISHING_CHANNELS = {
  linkedin: {
    enabled: true,
    apiKey: process.env.LINKEDIN_API_KEY,
    rateLimit: 5, // posts per day
    priority: "high",
  },

  twitter: {
    enabled: true,
    apiKey: process.env.TWITTER_API_KEY,
    rateLimit: 10, // posts per day
    priority: "high",
  },

  instagram: {
    enabled: true,
    apiKey: process.env.INSTAGRAM_API_KEY,
    rateLimit: 2, // posts per day
    priority: "medium",
  },

  tiktok: {
    enabled: false, // Needs manual approval
    apiKey: process.env.TIKTOK_API_KEY,
    rateLimit: 1, // posts per day
    priority: "low",
  },

  blog: {
    enabled: true,
    apiKey: process.env.BLOG_API_KEY,
    rateLimit: 3, // posts per week
    priority: "medium",
  },
};

// Plantillas de notificaciones
export const NOTIFICATION_TEMPLATES = {
  success: {
    slack: `✅ Agent {agentName} completed successfully!\n\nDuration: {duration}ms\nResults: {summary}`,
    email:
      "Your {agentName} completed successfully at {timestamp}",
  },

  error: {
    slack: `❌ Agent {agentName} failed!\n\nError: {error}\nDuration: {duration}ms`,
    email: "Your {agentName} encountered an error at {timestamp}",
  },
};

// Sistema de prioridades
export const PRIORITY_LEVELS = {
  critical: { weight: 100, cooldown: 300000 }, // 5 min cooldown
  high: { weight: 75, cooldown: 600000 }, // 10 min cooldown
  medium: { weight: 50, cooldown: 1800000 }, // 30 min cooldown
  low: { weight: 25, cooldown: 3600000 }, // 1 hour cooldown
};

// Exportar configuración combinada
export const AGENTS_RUNTIME_CONFIG = {
  parallelExecution: true,
  maxConcurrentAgents: 2,
  retryPolicy: {
    maxAttempts: 3,
    backoffMultiplier: 2,
    initialDelay: 1000,
  },
  logging: {
    verbose: process.env.DEBUG === "true",
    logFile: "agents/logs/execution.log",
  },
  monitoring: {
    enableMetrics: true,
    metricsInterval: 60000, // 1 minute
  },
};
