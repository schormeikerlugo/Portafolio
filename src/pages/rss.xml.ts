import { articles } from '../data/articles';

const SITE = 'https://schormeiker.com';
const months: Record<string, string> = { JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06', JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12' };

export async function GET() {
  const items = articles.map((a) => {
    const [mon, year] = a.date.split(' ');
    const isoDate = `${year}-${months[mon] || '01'}-01T00:00:00Z`;
    return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE}/writing/${a.id}</link>
      <guid>${SITE}/writing/${a.id}</guid>
      <description>${escapeXml(a.summary)}</description>
      <pubDate>${new Date(isoDate).toUTCString()}</pubDate>
      <category>${a.tags.join(', ')}</category>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Schormeiker Lugo — Documentación Técnica</title>
    <link>${SITE}/writing</link>
    <description>Artículos sobre ingeniería de interfaces, diseño sistémico, rendimiento frontend e inteligencia artificial aplicada.</description>
    <language>es</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
