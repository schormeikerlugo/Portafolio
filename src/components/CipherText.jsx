import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEF0123456789_#@$%-/';

export default function CipherText({ text, className, delay = 0, duration = 1.5, triggerRef, multiline = false }) {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const internalRef = useRef(null);
    const ref = triggerRef || internalRef;
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const shouldStart = triggerRef ? isInView : true;

    useEffect(() => {
        if (!shouldStart) return;

        let startTime;
        let animationFrame;

        const animate = (time) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / (duration * 1000);

            if (progress < 1) {
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    if (i < text.length * progress) {
                        result += text[i];
                    } else {
                        result += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                setDisplayText(result);
                animationFrame = requestAnimationFrame(animate);
            } else {
                setDisplayText(text);
                setIsComplete(true);
            }
        };

        const timeout = setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(animationFrame);
        };
    }, [text, delay, duration, shouldStart]);

    if (isComplete) {
        return <span ref={internalRef} className={className}>{text}</span>;
    }

    if (multiline) {
        return (
            <span ref={internalRef} className={className} style={{ position: 'relative', display: 'block' }}>
                <span style={{ visibility: 'hidden' }}>{text}</span>
                <span style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
                    {displayText}
                    {shouldStart && <span className="animate-pulse text-cyan">_</span>}
                </span>
            </span>
        );
    }

    return (
        <span ref={internalRef} className={className}>
            {displayText}
            {shouldStart && <span className="animate-pulse text-cyan">_</span>}
        </span>
    );
}



