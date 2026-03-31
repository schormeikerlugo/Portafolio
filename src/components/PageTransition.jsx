import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

/* ═══════════════════════════════════════════════
   SIMPLE PAGE TRANSITION
   Fade suave de 0.12s entre páginas.
   Minimalista, sin glitches.
   ═══════════════════════════════════════════════ */

export default function PageTransition({ children, isLoading }) {
    const contentRef = useRef(null);

    useGSAP(() => {
        if (!contentRef.current) return;

        if (isLoading) {
            // Fade out rápido
            gsap.to(contentRef.current, {
                opacity: 0,
                duration: 0.12,
                ease: 'power2.in'
            });
        } else {
            // Fade in suave
            gsap.fromTo(contentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.15, ease: 'power2.out' }
            );
        }
    }, [isLoading]);

    return (
        <div ref={contentRef}>
            {children}
        </div>
    );
}
