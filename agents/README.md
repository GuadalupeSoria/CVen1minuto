# Sistema de Agentes Especializados

Sistema de agentes autónomos para optimizar y automatizar tareas de diseño, SEO, contenido y publicación.

## Estructura

```
agents/
├── aesthetic/      # Agente de estética y diseño UI/UX
├── seo/           # Agente de optimización SEO
├── content/       # Agente de creación de contenido
├── publishing/    # Agente de publicación y distribución
└── orchestrator.ts # Controlador central
```

## Uso Rápido

### Bajo demanda
```bash
npm run agent:aesthetic   # Analiza y sugiere mejoras de diseño
npm run agent:seo        # Audit SEO completo
npm run agent:content    # Genera posts y contenido
npm run agent:publish    # Publica contenido en canales
```

### Remoto (Triggers en claude.ai)
```bash
npm run agents:schedule  # Configura ejecuciones automáticas
```

## Agentes

### 1. **Aesthetic** 🎨
- Analiza componentes React/React Native
- Revisa consistencia de diseño
- Sugiere mejoras de UX
- Valida accesibilidad
- Propone actualizaciones de colores/tipografía

### 2. **SEO** 🔍
- Auditoría de metadatos
- Análisis de performance
- Optimización de imágenes
- Recomendaciones de contenido
- Link building strategy

### 3. **Content** ✍️
- Generación automática de posts
- Templates para diferentes plataformas
- Optimización de copy
- Hashtags y CTAs
- Multi-idioma (ES/EN)

### 4. **Publishing** 📢
- Publicación en redes sociales
- Distribución de contenido
- Gestión de horarios
- Analytics tracking
- Multi-channel coordination
