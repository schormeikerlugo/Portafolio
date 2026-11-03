/** Deterministic 32-bit hash so decorative codes stay stable between builds. */
export function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function trackingCode(seed: string, variant: 'hex' | 'rec' = 'hex'): string {
  const h = hash(seed);
  const a = (h & 0xffff).toString(16).toUpperCase().padStart(4, '0');
  const b = ((h >>> 16) & 0xffff).toString(16).toUpperCase().padStart(4, '0');
  return variant === 'hex' ? `0x${a} ${b}` : `REC_${(h % 9000) + 1000}.${a}`;
}

/** Sparkline path for a series of numbers inside a w×h box. */
export function sparkline(values: number[], w = 120, h = 28): { line: string; area: string } {
  if (values.length < 2) return { line: '', area: '' };
  const max = Math.max(...values, 1);
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / max) * (h - 2) - 1] as const);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return { line, area: `${line} L${w} ${h} L0 ${h} Z` };
}
