import { motion } from 'framer-motion';

/* ── Inline SVG icons (lightweight, no extra deps) ── */
const icons = {
    github: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    ),
    behance: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.608.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.34.5-.84.88-1.503 1.14.872.228 1.527.67 1.957 1.33.43.66.645 1.45.645 2.36 0 .75-.15 1.39-.44 1.92-.3.53-.69.96-1.18 1.27-.49.32-1.04.54-1.66.68-.62.13-1.24.2-1.86.2H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.09-.16 1.47-.48.38-.32.57-.78.57-1.37 0-.36-.06-.66-.18-.9-.12-.24-.29-.43-.5-.57-.22-.14-.47-.24-.76-.3-.29-.06-.6-.09-.93-.09H3.24v3.71h3.3v.01h.005zm.195 5.58c.37 0 .72-.04 1.04-.13.32-.09.6-.22.84-.4.23-.18.42-.41.55-.7.13-.28.2-.62.2-1.01 0-.78-.23-1.35-.68-1.7-.46-.35-1.06-.53-1.8-.53H3.24v4.47h3.5zM15.206 4.14h6.288v1.69h-6.288V4.14zM21.78 12.3c0-.85-.17-1.6-.5-2.23-.33-.63-.77-1.16-1.32-1.58-.55-.42-1.18-.73-1.89-.93-.72-.2-1.46-.3-2.24-.3-.79 0-1.54.1-2.25.31-.71.21-1.33.52-1.87.94-.54.42-.97.95-1.29 1.58-.33.63-.49 1.37-.49 2.22 0 .83.16 1.57.48 2.2.32.64.75 1.17 1.29 1.6.54.43 1.17.75 1.88.96.71.21 1.46.31 2.25.31.96 0 1.77-.16 2.44-.49.67-.33 1.25-.75 1.73-1.27l-1.64-1.39c-.32.38-.69.67-1.12.87-.43.2-.93.3-1.5.3-.78 0-1.44-.2-1.97-.59-.53-.39-.82-.97-.89-1.72h7.56c.01-.12.02-.26.02-.42v-.07l-.02-.1v.01zm-7.5-1.05c.08-.31.2-.59.38-.84.18-.25.39-.46.65-.63.25-.17.53-.3.83-.38.3-.09.62-.13.97-.13.7 0 1.3.19 1.77.56.48.37.76.9.86 1.59h-5.46v-.17z" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
        </svg>
    ),
    tiktok: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
    ),
    dribbble: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702A10.005 10.005 0 0012 1.8c-.825 0-1.63.1-2.4.252zm10.335 3.483c-.218.29-1.91 2.478-5.717 4.005.216.435.42.885.615 1.338.066.15.131.3.192.453 3.42-.43 6.823.27 7.16.34-.02-2.32-.884-4.455-2.25-6.14z" />
        </svg>
    ),
};

/* ── Social link config ── */
const SOCIAL_LINKS = {
    github: { url: 'https://github.com/schormeikerlugo', label: 'GitHub' },
    behance: { url: 'https://behance.net/schormeikerlugo', label: 'Behance' },
    linkedin: { url: 'https://linkedin.com/in/schormeikerlugo', label: 'LinkedIn' },
    instagram: { url: 'https://instagram.com/schormeiker_lugo', label: 'Instagram' },
    tiktok: { url: 'https://tiktok.com/@schormeikerlugo', label: 'TikTok' },
    dribbble: { url: 'https://dribbble.com/schormeiker', label: 'Dribbble' },
};

function SocialIcon({ name, className = '' }) {
    const link = SOCIAL_LINKS[name];
    if (!link) return null;
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={`text-text-secondary hover:text-cyan transition-colors duration-200 ${className}`}
        >
            {icons[name]}
        </a>
    );
}

/* ── Navbar social icons (compact) ── */
export function NavbarSocials() {
    return (
        <div className="hidden md:flex items-center gap-3 ml-6 pl-6 border-l border-white/[0.06]">
            <SocialIcon name="github" />
            <SocialIcon name="behance" />
            <SocialIcon name="linkedin" />
        </div>
    );
}

/* ── Footer social row ── */
export function FooterSocials() {
    return (
        <div className="flex items-center justify-center gap-5 mt-4">
            {Object.keys(SOCIAL_LINKS).map((name) => (
                <SocialIcon key={name} name={name} />
            ))}
        </div>
    );
}

/* ── CTA Section ── */
import { useRef } from 'react';
import CipherText from './CipherText';

export default function SocialCTA({ title, message, author, networks = [] }) {
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="relative z-10 py-16 sm:py-20 px-6">
            <motion.div
                className="max-w-[800px] mx-auto text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Terminal header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan/40" />
                    <span className="mono text-[10px] tracking-[0.3em] text-cyan/70">
                        <CipherText text={title} delay={0.2} duration={1.2} triggerRef={sectionRef} />
                    </span>
                    <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-cyan/40" />
                </div>

                {/* Message */}
                <p className="text-text-primary/80 text-base sm:text-lg leading-relaxed font-light italic max-w-[600px] mx-auto">
                    "<CipherText text={message} delay={0.6} duration={2.5} triggerRef={sectionRef} multiline />"
                </p>

                {/* Author */}
                {author && (
                    <p className="mono text-[11px] text-text-dim mt-4 tracking-wider">
                        — <CipherText text={author} delay={1.8} duration={0.8} triggerRef={sectionRef} />
                    </p>
                )}

                {/* Social icons */}
                <div className="flex items-center justify-center gap-5 mt-8">
                    {networks.map((name) => (
                        <motion.div
                            key={name}
                            whileHover={{ scale: 1.15, y: -2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <SocialIcon name={name} className="!text-text-dim hover:!text-cyan" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom line */}
                <div className="h-px w-full max-w-[200px] mx-auto mt-8 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </motion.div>
        </section>
    );
}

