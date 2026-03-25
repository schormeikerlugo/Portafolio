import { useState, useEffect } from 'react';

/**
 * Detects if the current viewport is mobile-sized.
 * Used to conditionally disable heavy animations on mobile devices.
 * Breakpoint: 768px (matches Tailwind's `md` breakpoint).
 */
export default function useMobileDetect() {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)');
        const handler = (e) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return isMobile;
}
