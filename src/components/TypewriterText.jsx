import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TypewriterText({
    text = "",
    className = "",
    delay = 0,
    speed = 0.03,
    trigger = null,
    start = "top 80%",
    scrub = false,
    loop = true
}) {
    const textRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(delay === 0);

    useEffect(() => {
        if (delay === 0) return;
        const timer = setTimeout(() => setHasStarted(true), delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!textRef.current || !text) return;

        const charElements = textRef.current.querySelectorAll('.char');
        if (charElements.length === 0) return;

        // Correctly handle both DOM elements and React Ref objects
        const triggerElement = (trigger && trigger.current) ? trigger.current : (trigger || textRef.current);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: start,
                toggleActions: scrub ? "none" : "play pause resume pause",
                scrub: scrub
            },
            repeat: scrub ? 0 : (loop ? -1 : 0),
            delay: delay
        });

        tl.set(charElements, { display: 'none' })
            .to(charElements, {
                display: 'inline',
                duration: 0,
                stagger: {
                    each: speed,
                    from: "start"
                }
            });

        if (!scrub && loop) {
            tl.to({}, { duration: 10 }) // Hold for 10 seconds
              .to(charElements, {
                  display: 'none',
                  duration: 0,
                  stagger: {
                      each: speed * 0.6, // Erase a bit faster than typing
                      from: "end"
                  }
              })
              .to({}, { duration: 1 }); // Wait 1 second before rewriting
        }

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, [text, delay, speed, trigger, start, scrub]);

    if (!text) return null;

    const renderChars = () => {
        return text.split('').map((char, i) => {
            const charSpan = (
                <span key={i} className="char whitespace-pre-wrap" style={{ display: 'none' }}>
                    {char === '\n' ? <br /> : char}
                </span>
            );

            if (i === text.length - 1) {
                return (
                    <span key={i} className="whitespace-nowrap">
                        {charSpan}
                        {hasStarted && <span className="terminal-cursor inline-block w-[8px] h-[1.1em] bg-white align-middle translate-x-1 animate-pulse" />}
                    </span>
                );
            }
            return charSpan;
        });
    };

    return (
        <span className={`typewriter-text ${className} relative inline-block max-w-full`}>
            {/* Ghost text reserves exact boundaries so that display:inline typing doesn't jitter parent height */}
            <span className="invisible select-none whitespace-pre-wrap" aria-hidden="true">
                {text.slice(0, -1)}
                <span className="whitespace-nowrap">
                    {text.slice(-1)}
                    <span className="inline-block w-[8px] h-[1.1em] align-middle translate-x-1" />
                </span>
            </span>
            <span ref={textRef} className="absolute inset-0 whitespace-pre-wrap">
                {renderChars()}
            </span>
        </span>
    );
}
