import es from './es';
import en from './en';

export type Lang = 'es' | 'en';

const translations: Record<Lang, typeof es> = { es, en };

export function t(lang: Lang, key: string): any {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const path = url.pathname;
  if (path.startsWith('/en/') || path === '/en') return 'en';
  return 'es';
}

export function getAlternateUrl(currentPath: string, targetLang: Lang): string {
  // Strip existing /en prefix to get the base path
  const basePath = currentPath.replace(/^\/en(\/|$)/, '/');
  if (targetLang === 'en') {
    return basePath === '/' ? '/en' : `/en${basePath}`;
  }
  return basePath || '/';
}

export const languages: { code: Lang; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
];
