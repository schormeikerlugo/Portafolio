/**
 * IntersectionObserver-based scroll animations.
 * Call initAnimations() once from a <script> tag.
 */
export function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Simple fade-up
  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });

  // Staggered fade-up
  document.querySelectorAll('[data-animate-group]').forEach((group) => {
    const children = group.querySelectorAll('[data-animate-stagger]');
    const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 80);
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
