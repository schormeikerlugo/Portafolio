import { useState, useEffect, useRef } from 'react';

/**
 * Returns [ref, isInView].
 * Attach `ref` to the container element you want to observe.
 * `isInView` is true when at least `threshold` % of the element is visible.
 *
 * @param {number} threshold  – fraction visible to count as "in view" (0–1)
 * @param {string} rootMargin – margin around the root (e.g. "100px 0px")
 */
export default function useInView(threshold = 0.05, rootMargin = '0px') {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setIsInView(true); // fallback: always active
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, isInView];
}
