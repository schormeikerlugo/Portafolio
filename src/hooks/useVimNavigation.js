import { useEffect } from 'react';

export const useVimNavigation = (onOpenHelp) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore if typing in input/textarea
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

            switch (e.key) {
                case 'j':
                    window.scrollBy({ top: 150, behavior: 'smooth' });
                    break;
                case 'k':
                    window.scrollBy({ top: -150, behavior: 'smooth' });
                    break;
                case 'g':
                    // Check for rapid 'gg'
                    if (window._lastG && Date.now() - window._lastG < 300) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        window._lastG = null;
                    } else {
                        window._lastG = Date.now();
                    }
                    break;
                case 'G':
                    if (e.shiftKey) {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                    break;
                case '?':
                    onOpenHelp?.();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onOpenHelp]);
};
