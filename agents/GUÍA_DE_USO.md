# 🤖 Sistema de Agentes Especializados - Guía Completa

Sistema completo de agentes autónomos para optimizar y automatizar todas las áreas de CVen1minuto y cvnative.

---

## 📋 Tabla de Contenidos

1. [Inicio Rápido](#inicio-rápido)
2. [Agentes Disponibles](#agentes-disponibles)
3. [Ejecución](#ejecución)
4. [Configuración](#configuración)
5. [Triggers Remotos](#triggers-remotos)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Inicio Rápido

### 1. Instalación

```bash
# Asegúrate de estar en la raíz del proyecto
cd c:/Dev/CVen1minuto

# Instala dependencias (si aún no lo hiciste)
npm install
```

### 2. Primeros Pasos

```bash
# Ejecuta todos los agentes
npm run agent:all

# O uno por uno:
npm run agent:aesthetic
npm run agent:seo
npm run agent:content
npm run agent:analytics
```

### 3. Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp agents/.env.example agents/.env

# Edita con tus credenciales
nano agents/.env  # o usa tu editor favorito
```

---

## 🎯 Agentes Disponibles

### 🎨 **Aesthetic Agent** - Diseño & UX

**Qué hace:**
- Analiza consistencia visual de componentes
- Revisa accesibilidad (WCAG)
- Valida design system
- Propone mejoras de modernidad

**Uso:**
```bash
npm run agent:aesthetic
npm run agent:aesthetic web    # Web app específicamente
npm run agent:aesthetic native # App móvil específicamente
```

**Salida esperada:**
```
🎨 Score general: 82/100

Componentes analizados:
  • Header: 85% consistencia
  • Button: 78% consistencia
  • Card: 88% consistencia

Top recomendaciones:
  1. [HIGH] Mejorar contraste de color
  2. [MEDIUM] Actualizar tipografía
```

---

### 🔍 **SEO Agent** - Optimización SEO

**Qué hace:**
- Auditoría técnica completa
- Análisis de keywords
- Evaluación de content
- Estrategia de backlinks

**Uso:**
```bash
npm run agent:seo
npm run agent:seo web    # SEO web app
npm run agent:seo native # SEO web version de app mobile
```

**Salida esperada:**
```
🔍 Score SEO: 76/100

Categorías:
  • On-Page SEO: 75/100
  • Technical SEO: 82/100
  • Content: 68/100
  • Backlinks: 55/100

Oportunidades (primeras 3):
  • "generador de CV" - Oportunidad: 12
  • "CV online gratis" - Oportunidad: 9
  • "plantillas CV" - Oportunidad: 8
```

---

### ✍️ **Content Agent** - Generación de Contenido

**Qué hace:**
- Genera plan de contenido semanal
- Crea posts multi-plataforma
- Sugiere horarios óptimos
- Estima reach & engagement

**Uso:**
```bash
npm run agent:content      # Semana actual
npm run agent:content 2    # Semana específica
npm run agent:content 4
```

**Salida esperada:**
```
✍️ Semana 2 de Marzo

Posts generados: 10
Reach estimado: 25,840
Engagement rate: 5.25%

Posts:
  1. Errores comunes en CVs - professional
  2. Tips de networking - educational
  3. Historias de éxito - professional
  ...
```

---

### 📢 **Publishing Agent** - Publicación Multi-Canal

**Qué hace:**
- Publica en LinkedIn, Twitter, Instagram, TikTok
- Gestiona horarios de publicación
- Recopila analytics
- Optimiza CTAs por plataforma

**Uso:**
```bash
# Publicar un post
npm run agent:publish post_123 linkedin,twitter

# Obtener analytics (últimos 7 días)
npm run agent:analytics

# Últimos 14 días
npm run agent:analytics 14
```

**Salida esperada:**
```
📢 Publicación completada:

✅ linkedin: success
   URL: https://linkedin.com/feed/update/...
✅ twitter: success
   URL: https://twitter.com/CVen1minuto/status/...

Reach total: 3,842
Impresiones: 12,450
```

---

## ⚙️ Ejecución

### Bajo Demanda (Manual)

```bash
# Individual
npm run agent:aesthetic
npm run agent:seo
npm run agent:content
npm run agent:publish post_id channels

# Todos juntos
npm run agent:all
```

### Automática (Triggers Remotos)

```bash
# Configurar ejecuciones automáticas
npm run agents:schedule

# Listar triggers configurados
npm run agents:list

# Resultado:
# ┌──────────┬─────────────────┬──────────────┬──────────────────┐
# │ Agent    │ Schedule        │ Day/Time     │ Frequency        │
# ├──────────┼─────────────────┼──────────────┼──────────────────┤
# │ aesthetic│ 0 9 * * 1       │ 9:00         │ Monday           │
# │ seo      │ 0 10 * * 1      │ 10:00        │ Monday           │
# │ content  │ 0 8 * * 0       │ 8:00         │ Sunday           │
# │ publish  │ 0 12 * * 1-5    │ 12:00        │ Mon-Fri          │
# └──────────┴─────────────────┴──────────────┴──────────────────┘
```

---

## ⚙️ Configuración

### agents/config.ts

Define comportamiento global:

```typescript
// Habilitar/deshabilitar agentes
AGENTS_CONFIG.aesthetic.enabled = true;

// Cambiar schedule (cron format)
AGENTS_CONFIG.aesthetic.schedule = "0 9 * * 1"; // Monday 9am

// Cambiar tipo de ejecución
AGENTS_CONFIG.aesthetic.runOn = "local"; // local | remote | hybrid

// Configurar notificaciones
AGENTS_CONFIG.aesthetic.notifications = {
  slack: true,
  email: false,
};
```

### Cron Schedule Format

```
┌─────────────────────── minute (0-59)
│ ┌─────────────────────── hour (0-23)
│ │ ┌─────────────────────── day of month (1-31)
│ │ │ ┌─────────────────────── month (1-12)
│ │ │ │ ┌─────────────────────── day of week (0-7, 0 = Sunday)
│ │ │ │ │
│ │ │ │ │
* * * * *

Ejemplos:
"0 9 * * 1"       = Lunes 9am
"0 12 * * 1-5"    = Lun-Vie 12pm
"*/30 * * * *"    = Cada 30 minutos
"0 8 1 * *"       = 1er día del mes 8am
```

---

## 🌐 Triggers Remotos

### Configurar en Claude

1. Ve a [claude.ai/code](https://claude.ai/code)
2. Abre la terminal
3. Usa el skill `/schedule`:

```bash
/schedule "0 9 * * 1" "npm run agent:aesthetic"
/schedule "0 10 * * 1" "npm run agent:seo"
/schedule "0 8 * * 0" "npm run agent:content"
/schedule "0 12 * * 1-5" "npm run agent:publish"
```

### Resultado

Los agentes se ejecutarán automáticamente en los horarios configurados y enviarán reportes a:
- Slack (webhooks configurados)
- Email (si está habilitado)

---

## 💡 Mejores Prácticas

### 1. Auditoría Completa Semanal

```bash
# Cada lunes ejecuta todos los análisis
npm run agent:all

# Genera un reporte consolidado que incluye:
# - Análisis de diseño & UX
# - Auditoría SEO completa
# - Plan de contenido semanal
# - Metrics de publicación
```

### 2. Aprovecha Multi-Plataforma

```bash
# Publica en todas partes simultáneamente
npm run agent:publish post_123 linkedin,twitter,instagram,blog

# Ahorra tiempo + maximiza alcance
```

### 3. Monitoreo Regular

```bash
# Cada viernes revisa analytics
npm run agent:analytics 7   # Semana

# Identifica top performers y patrones
```

### 4. Integra con CI/CD

En `.github/workflows/agents.yml`:

```yaml
name: Weekly Agents

on:
  schedule:
    - cron: '0 9 * * 1' # Monday 9am

jobs:
  run-agents:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run agent:all
```

---

## 🔧 Troubleshooting

### Error: "Command not found"

**Solución:**
```bash
# Asegúrate de estar en el directorio correcto
cd c:/Dev/CVen1minuto

# Instala ts-node globalmente
npm install -g ts-node
```

### Error: "Cannot find module 'agents'"

**Solución:**
```bash
# Verifica que los archivos existan
ls agents/

# Rebuild TypeScript
npm run build

# O ejecuta manualmente con ruta completa
npx ts-node agents/cli.ts aesthetic
```

### Agente se demora mucho

**Solución:**
```bash
# Aumenta el timeout en agents/config.ts
AGENTS_CONFIG.aesthetic.timeout = 600000; // 10 min

# O ejecuta en modo remoto
AGENTS_CONFIG.aesthetic.runOn = "remote";
```

### Notificaciones no funcionan

**Solución:**
1. Verifica que `.env` está configurado correctamente
2. Comprueba credenciales de Slack/Email
3. Habilita notificaciones en `config.ts`:
   ```typescript
   notifications: {
     slack: true,
     email: true
   }
   ```

---

## 📊 Métricas Clave por Agente

### Aesthetic
- **Esperado:** Score 80-95
- **Crítico:** < 70
- **Acción:** Revisar diseño system

### SEO
- **Esperado:** Score 70-85
- **Crítico:** < 60
- **Acción:** Auditoría técnica completa

### Content
- **Esperado:** 3-5 posts/semana
- **Engagement:** 3-8%
- **Reach:** 5k+ por post

### Publishing
- **Reach:** 15k+ semanal
- **Engagement:** 4-6%
- **Posts:** 10-15/semana multi-plataforma

---

## 📚 Recursos Adicionales

- [Documentación de Cron](https://crontab.guru/)
- [LinkedIn API Docs](https://docs.microsoft.com/en-us/linkedin/shared/api-guide/)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)

---

## 🤝 Soporte

¿Problemas? Abre un issue en:
- 📧 Email: guada@cven1minuto.com
- 🐙 GitHub: github.com/guada/CVen1minuto/issues
- 💬 Slack: #agentes-cven1minuto

---

**Última actualización:** Marzo 2026
**Versión:** 1.0.0
