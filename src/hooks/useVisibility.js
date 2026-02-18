import { useState, useEffect, useRef } from 'react';

/**
 * Hook: detects if an element is visible in the viewport.
 * Used to pause heavy animations (Three.js, Canvas) when offscreen.
 *
 * @param {Object} options
 * @param {string} options.rootMargin - IntersectionObserver margin (default: '200px')
 * @param {number} options.threshold - Visibility threshold 0-1 (default: 0)
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useVisibility({ rootMargin = '200px', threshold = 0 } = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin, threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin, threshold]);

    return { ref, isVisible };
}
