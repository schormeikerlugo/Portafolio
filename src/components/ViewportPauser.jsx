import { useRef, useEffect, useState } from 'react';

/**
 * ViewportPauser
 * Wraps any content and sets `visibility: hidden` when off-screen.
 * When an element is `visibility: hidden`, the browser compositor skips
 * painting it entirely — this effectively pauses all CSS and Framer Motion
 * animations inside without unmounting or re-mounting the React tree.
 *
 * Use this to wrap decorative background pattern layers.
 *
 * @param {string}  className  – extra classes for the wrapper div
 * @param {number}  margin     – extra px of margin before triggering (default: 200px)
 */
export default function ViewportPauser({ children, className = 'absolute inset-0 pointer-events-none', margin = 200 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { rootMargin: `${margin}px 0px`, threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [margin]);

    return (
        <div
            ref={ref}
            className={className}
            style={{ visibility: visible ? 'visible' : 'hidden' }}
        >
            {children}
        </div>
    );
}
