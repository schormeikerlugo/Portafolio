/**
 * Per-page lifecycle helpers for Astro's ClientRouter.
 *
 * `astro:page-load` fires on every client-side navigation, so any listener added
 * to `window`/`document` there must be removed before the next page swaps in.
 * `pageSignal()` returns an AbortSignal that aborts on `astro:before-swap`.
 */
let controller: AbortController | null = null;

export function pageSignal(): AbortSignal {
  if (!controller || controller.signal.aborted) {
    controller = new AbortController();
    document.addEventListener('astro:before-swap', () => controller?.abort(), { once: true });
  }
  return controller.signal;
}

export function onPageLoad(fn: (signal: AbortSignal) => void): void {
  document.addEventListener('astro:page-load', () => fn(pageSignal()));
}

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
