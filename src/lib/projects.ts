import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type ProjectEntry = CollectionEntry<'projects'>;
type Data = ProjectEntry['data'];

export interface Project extends Omit<Data, 'es' | 'en'> {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  challenge: string[];
  approach: string;
  outcome?: string;
}

const labels = {
  category: {
    design: { es: 'Diseño', en: 'Design' },
    development: { es: 'Desarrollo', en: 'Development' },
  },
  subcategory: {
    crypto: { es: 'Crypto', en: 'Crypto' },
    games: { es: 'Videojuegos', en: 'Games' },
    app: { es: 'App', en: 'App' },
    web: { es: 'Web', en: 'Web' },
    dashboard: { es: 'Dashboard', en: 'Dashboard' },
    ai: { es: 'IA', en: 'AI' },
    tools: { es: 'Herramientas', en: 'Tools' },
  },
  status: {
    live: { es: 'En línea', en: 'Live' },
    unpublished: { es: 'No publicado', en: 'Unpublished' },
    concept: { es: 'Concepto', en: 'Concept' },
    archived: { es: 'Archivado', en: 'Archived' },
    wip: { es: 'En desarrollo', en: 'In progress' },
  },
  type: {
    personal: { es: 'Proyecto personal', en: 'Personal project' },
    client: { es: 'Proyecto para cliente', en: 'Client project' },
    concept: { es: 'Exploración de diseño', en: 'Design exploration' },
    professional: { es: 'Trabajo profesional', en: 'Professional work' },
    'open-source': { es: 'Open source', en: 'Open source' },
  },
} as const;

export type LabelGroup = keyof typeof labels;

export function label<G extends LabelGroup>(group: G, key: keyof (typeof labels)[G], lang: Lang): string {
  return (labels[group][key] as Record<Lang, string>)[lang];
}

export function localize(entry: ProjectEntry, lang: Lang): Project {
  const { es, en, ...rest } = entry.data;
  return { ...rest, ...(lang === 'en' ? en : es), slug: entry.id };
}

/** Newest first; featured rank breaks ties, then title. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const entries = await getCollection('projects');
  return entries
    .map((e) => localize(e, lang))
    .sort(
      (a, b) =>
        b.year - a.year ||
        (a.featured ?? 99) - (b.featured ?? 99) ||
        a.title.localeCompare(b.title),
    );
}

export async function getFeatured(lang: Lang, limit = 6): Promise<Project[]> {
  const all = await getProjects(lang);
  return all
    .filter((p) => p.featured !== undefined)
    .sort((a, b) => a.featured! - b.featured!)
    .slice(0, limit);
}

export function projectUrl(slug: string, lang: Lang): string {
  return lang === 'en' ? `/en/portfolio/${slug}` : `/portfolio/${slug}`;
}
