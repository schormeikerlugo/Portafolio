/**
 * IntersectionObserver-based scroll animations.
 * Call initAnimations() once per page load.
 */
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.countTo);
  if (!Number.isFinite(target) || reduced()) return;
  const duration = 1100;
  const start = performance.now();
  const decimals = String(el.dataset.countTo).includes('.') ? 1 : 0;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
}

export function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('visible');
        el.querySelectorAll<HTMLElement>('[data-count-to]').forEach(countUp);
        observer.unobserve(el);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-animate], [data-stat-card], [data-draw]').forEach((el) => observer.observe(el));

  // Staggered fade-up
  document.querySelectorAll('[data-animate-group]').forEach((group) => {
    const children = group.querySelectorAll('[data-animate-stagger]');
    const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), reduced() ? 0 : i * 80);
            });
            groupObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    groupObserver.observe(group);
  });
}
