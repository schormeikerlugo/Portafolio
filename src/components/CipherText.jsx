import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEF0123456789_#@$%-/';

export default function CipherText({ text, className, delay = 0, duration = 1.5, triggerRef, multiline = false }) {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
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
            setHasStarted(true);
            animationFrame = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(animationFrame);
        };
    }, [text, delay, duration, shouldStart]);

    const baseClass = multiline ? "relative block" : "relative inline-block";

    if (isComplete) {
        return (
            <span ref={internalRef} className={`${baseClass} animate-glitch-10s ${className || ''}`} data-text={text}>
                <span className="invisible select-none whitespace-pre-wrap">{text}</span>
                <span className="absolute inset-0 whitespace-pre-wrap">{text}</span>
            </span>
        );
    }

    return (
        <span ref={internalRef} className={`${baseClass} ${className || ''}`}>
            <span className="invisible select-none whitespace-pre-wrap">{text}</span>
            <span className="absolute inset-0 whitespace-pre-wrap" aria-hidden="true">
                {displayText}
                {hasStarted && !isComplete && <span className="animate-pulse text-cyan">_</span>}
            </span>
        </span>
    );
}



