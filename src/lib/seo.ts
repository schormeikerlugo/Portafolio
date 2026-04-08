const SITE = 'https://schormeikerlugo.com';
const AUTHOR = 'Schormeiker Lugo';

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR,
    jobTitle: 'UI/UX Designer & Frontend Developer',
    url: SITE,
    email: 'schormeikerl@gmail.com',
    image: `${SITE}/media/perfil.jpg`,
    knowsAbout: ['UI/UX Design', 'Frontend Development', 'React', 'Astro', 'Figma', 'Supabase', 'AI Engineering', 'Tailwind CSS', 'Design Systems'],
    sameAs: [
      'https://github.com/schormeikerlugo',
      'https://behance.net/schormeikerlugo',
      'https://www.linkedin.com/in/schormeiker/',
      'https://instagram.com/schormeiker_lugo',
      'https://tiktok.com/@schormeikerlugo',
      'https://dribbble.com/schormeiker',
    ],
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${AUTHOR} — Frontend Design Engineer`,
    url: SITE,
    logo: `${SITE}/og-image.png`,
    image: `${SITE}/media/perfil.jpg`,
    description: 'Servicios profesionales de diseño UI/UX y desarrollo frontend. Especializado en Design Systems, React, Astro e integración de Inteligencia Artificial.',
    founder: { '@type': 'Person', name: AUTHOR },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'schormeikerl@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    priceRange: '$$',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${AUTHOR} Portfolio`,
    url: SITE,
    description: 'Portafolio profesional de Schormeiker Lugo — Diseñador UI/UX y Desarrollador Frontend.',
    author: { '@type': 'Person', name: AUTHOR },
    inLanguage: 'es',
  };
}

export function projectSchema(project: { title: string; mission: string; link: string; id: number; image: string; tags: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.mission,
    url: `${SITE}/portfolio/${project.id}`,
    image: project.image.startsWith('http') ? project.image : `${SITE}${project.image}`,
    keywords: project.tags.join(', '),
    author: { '@type': 'Person', name: AUTHOR },
    creator: { '@type': 'Person', name: AUTHOR },
  };
}

export function articleSchema(article: { id: string; title: string; summary: string; date: string; read: string; cover: string; tags: string[] }) {
  // Convert "MAR 2024" to ISO date
  const months: Record<string, string> = { JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06', JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12' };
  const [mon, year] = article.date.split(' ');
  const isoDate = `${year}-${months[mon] || '01'}-01`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    url: `${SITE}/writing/${article.id}`,
    image: article.cover,
    datePublished: isoDate,
    dateModified: isoDate,
    author: { '@type': 'Person', name: AUTHOR, url: SITE },
    publisher: { '@type': 'Person', name: AUTHOR, url: SITE },
    keywords: article.tags.join(', '),
    wordCount: parseInt(article.read) * 200,
    inLanguage: 'es',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/writing/${article.id}` },
  };
}

export function serviceSchema(services: { name: string; description: string }[]) {
  return services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    provider: { '@type': 'Person', name: AUTHOR, url: SITE },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    serviceType: 'Digital Design & Development',
  }));
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function collectionSchema(name: string, description: string, itemCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE}/work`,
    numberOfItems: itemCount,
    author: { '@type': 'Person', name: AUTHOR },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
