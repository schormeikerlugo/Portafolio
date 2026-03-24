import { useState, useEffect, useCallback, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";

export default function ScrambleText({
    text,
    className = "",
    characters = DEFAULT_CHARS,
    speed = 0.05,
    revealSpeed = 1,
    autoStart = true
}) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);
    const intervalRef = useRef(null);

    const scramble = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);

        let iteration = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev => {
                return text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        // Preserve whitespace and newlines to maintain layout stability
                        if (/\s/.test(text[index])) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("");
            });

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
                setIsAnimating(false);
            }

            iteration += revealSpeed / 3;
        }, speed * 1000);
    }, [text, characters, speed, revealSpeed, isAnimating]);

    useGSAP(() => {
        if (autoStart) {
            scramble();
        }
    }, { scope: containerRef, dependencies: [text, autoStart] });

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <span
            ref={containerRef}
            className={`inline-block relative ${!isAnimating ? 'animate-glitch-10s' : ''} ${className}`}
            onMouseOver={scramble}
            data-text={text}
        >
            {displayText}
        </span>
    );
}
