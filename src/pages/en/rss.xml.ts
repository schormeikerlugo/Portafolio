import { articles } from '../../data/articles';

const SITE = 'https://schormeikerlugo.com';
const months: Record<string, string> = { JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06', JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12' };

export async function GET() {
  const items = articles.map((a) => {
    const [mon, year] = a.date.split(' ');
    const isoDate = `${year}-${months[mon] || '01'}-01T00:00:00Z`;
    return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE}/en/writing/${a.id}</link>
      <guid>${SITE}/en/writing/${a.id}</guid>
      <description>${escapeXml(a.summary)}</description>
      <pubDate>${new Date(isoDate).toUTCString()}</pubDate>
      <category>${a.tags.join(', ')}</category>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Schormeiker Lugo — Technical Documentation</title>
    <link>${SITE}/en/writing</link>
    <description>Articles on interface engineering, systemic design, frontend performance and applied artificial intelligence.</description>
    <language>en</language>
    <atom:link href="${SITE}/en/rss.xml" rel="self" type="application/rss+xml"/>
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
