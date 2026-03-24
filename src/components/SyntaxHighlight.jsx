import { motion } from 'framer-motion';

// Token definitions with terminal/IDE colors (Applied on hover)
const TOKEN_COLORS = {
    keyword: 'hover:text-cyan',
    function: 'hover:text-amber-400',
    string: 'hover:text-emerald-400',
    number: 'hover:text-purple-400',
    comment: 'hover:text-white/40 italic',
};

// Patterns to match specific technical terms
const PATTERNS = [
    { regex: /\b(React|Vite|Framer Motion|GSAP|Tailwind|IDE|SaaS|UX|UI|Web3|DeFi|Blockchain|NFT)\b/gi, type: 'keyword' },
    { regex: /\b(optimize|build|deploy|configure|render|interface|design|solve|create|implement|iterate|reduce|increase|fix)\b/gi, type: 'function' },
    { regex: /(['"])(?:(?!\1|\\).|\\.)*\1/g, type: 'string' },
    { regex: /\b\d+(\.\d+)?%?\b/g, type: 'number' },
    { regex: /\/\/.*$/gm, type: 'comment' }
];

export default function SyntaxHighlight({ text }) {
    if (!text) return null;

    const segments = [];
    let lastIndex = 0;

    const allMatches = [];
    PATTERNS.forEach(pattern => {
        let match;
        const regex = new RegExp(pattern.regex);
        while ((match = regex.exec(text)) !== null) {
            allMatches.push({
                start: match.index,
                end: match.index + match[0].length,
                content: match[0],
                type: pattern.type
            });
        }
    });

    allMatches.sort((a, b) => a.start - b.start);

    const filteredMatches = [];
    let currentPos = 0;
    allMatches.forEach(match => {
        if (match.start >= currentPos) {
            filteredMatches.push(match);
            currentPos = match.end;
        }
    });

    filteredMatches.forEach(match => {
        if (match.start > lastIndex) {
            segments.push(text.substring(lastIndex, match.start));
        }
        
        segments.push(
            <motion.span
                key={match.start}
                whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
                className={`inline-block cursor-default px-0.5 rounded-sm transition-all duration-200 text-inherit font-medium border-b border-white/5 hover:border-white/20 ${TOKEN_COLORS[match.type]}`}
                title={`[TOKEN_TYPE: ${match.type.toUpperCase()}]`}
            >
                {match.content}
            </motion.span>
        );
        lastIndex = match.end;
    });

    if (lastIndex < text.length) {
        segments.push(text.substring(lastIndex));
    }

    return (
        <span className="leading-relaxed">
            {segments}
        </span>
    );
}
