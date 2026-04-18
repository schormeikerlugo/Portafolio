export interface WorkflowStep {
  id: string;
  label: string;
  labelEn: string;
  title: string;
  titleEn: string;
  sub: string;
  subEn: string;
  accent?: boolean;
}

export interface WorkflowDecision {
  label: string;
  labelEn: string;
  yes: string;
  yesEn: string;
  no: string;
  noEn: string;
}

export interface WorkflowTemplate {
  steps: WorkflowStep[];
  decision?: WorkflowDecision;
  iterateLabel?: string;
  iterateLabelEn?: string;
  iterateSub?: string;
  iterateSubEn?: string;
}

// ═══════════════════════════════════════════════
// TEMPLATES
// ═══════════════════════════════════════════════

const designTemplate: WorkflowTemplate = {
  steps: [
    { id: 's1', label: '01 · DISCOVERY', labelEn: '01 · DISCOVERY', title: 'Descubrimiento', titleEn: 'Discovery', sub: 'Brief · Stakeholders · Objetivos', subEn: 'Brief · Stakeholders · Goals' },
    { id: 's2', label: '02 · RESEARCH', labelEn: '02 · RESEARCH', title: 'Investigación', titleEn: 'Research', sub: 'Benchmark · Usuarios · Competencia', subEn: 'Benchmark · Users · Competition' },
    { id: 's3', label: '03 · UX ARCH', labelEn: '03 · UX ARCH', title: 'Arquitectura UX', titleEn: 'UX Architecture', sub: 'User Flows · Wireframes · IA', subEn: 'User Flows · Wireframes · IA', accent: true },
    { id: 's4', label: '04 · UI DESIGN', labelEn: '04 · UI DESIGN', title: 'Diseño Visual', titleEn: 'Visual Design', sub: 'Tokens · Layout · Componentes', subEn: 'Tokens · Layout · Components' },
    { id: 's5', label: '05 · PROTOTYPE', labelEn: '05 · PROTOTYPE', title: 'Prototipado', titleEn: 'Prototyping', sub: 'Interacción · Micro-animaciones', subEn: 'Interaction · Micro-animations', accent: true },
    { id: 's6', label: '06 · TESTING', labelEn: '06 · TESTING', title: 'Validación', titleEn: 'Validation', sub: 'Usabilidad · Feedback · Iteración', subEn: 'Usability · Feedback · Iteration' },
    { id: 's7', label: '07 · HANDOFF', labelEn: '07 · HANDOFF', title: 'Entrega', titleEn: 'Handoff', sub: 'Specs · Assets · Documentación', subEn: 'Specs · Assets · Documentation' },
    { id: 's8', label: '08 · SUPPORT', labelEn: '08 · SUPPORT', title: 'Soporte', titleEn: 'Support', sub: 'QA Visual · Ajustes · Evolución', subEn: 'Visual QA · Adjustments · Evolution', accent: true },
  ],
  decision: { label: 'APROBADO?', labelEn: 'APPROVED?', yes: 'SÍ', yesEn: 'YES', no: 'REVISAR', noEn: 'REVISE' },
  iterateLabel: 'REVISAR', iterateLabelEn: 'REVISE',
  iterateSub: 'Ajustar con feedback', iterateSubEn: 'Adjust with feedback',
};

const developmentTemplate: WorkflowTemplate = {
  steps: [
    { id: 's1', label: '01 · PLANNING', labelEn: '01 · PLANNING', title: 'Planificación', titleEn: 'Planning', sub: 'Requisitos · Alcance · Timeline', subEn: 'Requirements · Scope · Timeline' },
    { id: 's2', label: '02 · ARCHITECTURE', labelEn: '02 · ARCHITECTURE', title: 'Arquitectura', titleEn: 'Architecture', sub: 'Stack · DB Schema · APIs', subEn: 'Stack · DB Schema · APIs', accent: true },
    { id: 's3', label: '03 · DESIGN', labelEn: '03 · DESIGN', title: 'Diseño UI', titleEn: 'UI Design', sub: 'Figma · Tokens · Responsive', subEn: 'Figma · Tokens · Responsive' },
    { id: 's4', label: '04 · FRONTEND', labelEn: '04 · FRONTEND', title: 'Frontend', titleEn: 'Frontend', sub: 'Componentes · Rutas · Estado', subEn: 'Components · Routes · State', accent: true },
    { id: 's5', label: '05 · BACKEND', labelEn: '05 · BACKEND', title: 'Backend', titleEn: 'Backend', sub: 'APIs · Auth · Base de Datos', subEn: 'APIs · Auth · Database' },
    { id: 's6', label: '06 · INTEGRATION', labelEn: '06 · INTEGRATION', title: 'Integración', titleEn: 'Integration', sub: 'E2E · Servicios · Terceros', subEn: 'E2E · Services · Third-party', accent: true },
    { id: 's7', label: '07 · QA', labelEn: '07 · QA', title: 'Testing', titleEn: 'Testing', sub: 'Performance · A11Y · Cross-browser', subEn: 'Performance · A11Y · Cross-browser' },
    { id: 's8', label: '08 · DEPLOY', labelEn: '08 · DEPLOY', title: 'Despliegue', titleEn: 'Deploy', sub: 'CI/CD · Monitoring · Launch', subEn: 'CI/CD · Monitoring · Launch', accent: true },
  ],
  decision: { label: 'QA PASS?', labelEn: 'QA PASS?', yes: 'DEPLOY', yesEn: 'DEPLOY', no: 'FIX', noEn: 'FIX' },
  iterateLabel: 'DEBUGAR', iterateLabelEn: 'DEBUG',
  iterateSub: 'Corregir y re-testear', iterateSubEn: 'Fix and re-test',
};

const aiTemplate: WorkflowTemplate = {
  steps: [
    { id: 's1', label: '01 · RESEARCH', labelEn: '01 · RESEARCH', title: 'Investigación', titleEn: 'Research', sub: 'Datos · Papers · Viabilidad', subEn: 'Data · Papers · Feasibility' },
    { id: 's2', label: '02 · DATA', labelEn: '02 · DATA', title: 'Datos', titleEn: 'Data', sub: 'Recolección · Limpieza · Pipeline', subEn: 'Collection · Cleaning · Pipeline', accent: true },
    { id: 's3', label: '03 · ARCHITECTURE', labelEn: '03 · ARCHITECTURE', title: 'Arquitectura', titleEn: 'Architecture', sub: 'Modelos · Infra · Esquema DB', subEn: 'Models · Infra · DB Schema' },
    { id: 's4', label: '04 · AI ENGINE', labelEn: '04 · AI ENGINE', title: 'Motor IA', titleEn: 'AI Engine', sub: 'Training · Fine-tuning · Prompts', subEn: 'Training · Fine-tuning · Prompts', accent: true },
    { id: 's5', label: '05 · INTERFACE', labelEn: '05 · INTERFACE', title: 'Interfaz', titleEn: 'Interface', sub: 'UI · 3D · Visualización', subEn: 'UI · 3D · Visualization' },
    { id: 's6', label: '06 · INTEGRATION', labelEn: '06 · INTEGRATION', title: 'Integración', titleEn: 'Integration', sub: 'API · Realtime · Sync', subEn: 'API · Realtime · Sync', accent: true },
    { id: 's7', label: '07 · VALIDATION', labelEn: '07 · VALIDATION', title: 'Validación', titleEn: 'Validation', sub: 'Precisión · Latencia · Edge Cases', subEn: 'Accuracy · Latency · Edge Cases' },
    { id: 's8', label: '08 · DEPLOY', labelEn: '08 · DEPLOY', title: 'Despliegue', titleEn: 'Deploy', sub: 'Local · Cloud · Offline Mode', subEn: 'Local · Cloud · Offline Mode', accent: true },
  ],
  decision: { label: 'PRECISIÓN?', labelEn: 'ACCURACY?', yes: 'DEPLOY', yesEn: 'DEPLOY', no: 'RETRAIN', noEn: 'RETRAIN' },
  iterateLabel: 'REENTRENAR', iterateLabelEn: 'RETRAIN',
  iterateSub: 'Ajustar modelo + datos', iterateSubEn: 'Tune model + data',
};

// ═══════════════════════════════════════════════
// PROJECT ASSIGNMENTS
// ═══════════════════════════════════════════════

const templates: Record<string, WorkflowTemplate> = {
  design: designTemplate,
  development: developmentTemplate,
  ai: aiTemplate,
};

const projectWorkflowMap: Record<number, string> = {
  // Diseño — Crypto
  1: 'design', 2: 'design', 3: 'design', 4: 'design', 5: 'design',
  // Diseño — Videojuegos
  6: 'design', 7: 'design', 8: 'design', 9: 'design', 10: 'design',
  11: 'design', 12: 'design', 13: 'design',
  // Diseño — App
  14: 'design', 15: 'design', 16: 'design', 17: 'design',
  // Diseño — Web
  18: 'design', 19: 'design', 20: 'design', 21: 'design',
  22: 'design', 23: 'design', 24: 'design', 25: 'design', 26: 'design',
  // Diseño — Dashboard
  27: 'design', 28: 'design', 29: 'design',
  // Desarrollo — Videojuegos
  30: 'development', 31: 'development',
  // Desarrollo — Web
  32: 'development', 33: 'development', 35: 'development', 37: 'development',
  // Desarrollo — IA
  34: 'ai', 36: 'ai',
};

export function getWorkflow(projectId: number): WorkflowTemplate | null {
  const key = projectWorkflowMap[projectId];
  if (!key) return null;
  return templates[key] || null;
}
