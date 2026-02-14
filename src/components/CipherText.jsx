import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEF0123456789_#@$%-/';

export default function CipherText({ text, className, delay = 0, duration = 1.5 }) {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
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
    }, [text, delay, duration]);

    return (
        <span className={className}>
            {displayText}
            {!isComplete && <span className="animate-pulse text-cyan">_</span>}
        </span>
    );
}
