import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialCTA from '../components/SocialCTA';
import { ArrowRight } from 'lucide-react';
import { ScanlineBar, DiagonalLine } from '../components/ValorantOverlays';

// Lazy imports for all sections
const Hero = lazy(() => import('../sections/Hero'));
const Anomalies = lazy(() => import('../sections/Anomalies'));
const Bio = lazy(() => import('../sections/Bio'));
const InteractiveBioTeaser = lazy(() => import('../sections/InteractiveBioTeaser'));
const Portfolio = lazy(() => import('../sections/Portfolio'));
const Protocols = lazy(() => import('../sections/Protocols'));
const Writing = lazy(() => import('../sections/Writing'));
const Skills = lazy(() => import('../sections/Skills'));
const Certifications = lazy(() => import('../sections/Certifications'));

const SectionPlaceholder = () => (
    <div className="w-full h-[300px] flex items-center justify-center bg-void">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="mono text-[10px] text-white/20 uppercase tracking-[0.4em]">INIT_PORTAL_MODULE...</span>
        </div>
    </div>
);

const PortalBridge = ({ to, label }) => (
    <div className="flex justify-center pb-24 sm:pb-32 bg-void">
        <Link
            to={to}
            className="group flex items-center gap-4 px-10 py-4 border border-white/10 hover:border-cyan/40 bg-white/[0.02] hover:bg-cyan/5 transition-all text-white/60 hover:text-cyan"
        >
            <span className="mono text-[11px] font-bold tracking-[0.4em] uppercase">{label}</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </Link>
    </div>
);

export default function Home({ onOpenContact }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSelectProject = (project) => {
        navigate(`/portfolio/${project.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-0"
        >
            <Suspense fallback={<SectionPlaceholder />}>
                {/* 01 // system.init */}
                <Hero onOpenContact={onOpenContact} />

                {/* 0x01 // the_problem (Teaser) */}
                <div className="relative group">
                    <Anomalies isTeaser={true} />
                    <PortalBridge to="/approach" label="Ver mi enfoque completo" />
                </div>

                <ScanlineBar />

                {/* 0X02 // section.skills */}
                <div className="relative group border-t border-white/5">
                    <Skills />
                </div>

                <DiagonalLine height={30} />

                {/* 03 // section.about (Interactive Content Shift) */}
                <div className="relative group border-t border-white/5">
                    <InteractiveBioTeaser />
                    <PortalBridge to="/about" label="Explorar mi trayectoria" />
                </div>

                <ScanlineBar />

                {/* 04 // section.work (Work Teaser) */}
                <div className="relative group border-t border-white/5">
                    <Portfolio isTeaser={true} limit={3} onSelectProject={handleSelectProject} />
                    <PortalBridge to="/work" label="Ver todos los proyectos" />
                </div>

                <DiagonalLine height={30} />

                {/* 05 // section.services (Services Teaser) */}
                <div className="relative group border-t border-white/5">
                    <Protocols />
                    <PortalBridge to="/services" label="Mis capacidades técnicas" />
                </div>

                {/* Social CTA / Bridge */}
                <SocialCTA
                    title={t('social.title', 'TRANSMISIÓN ABIERTA')}
                    message={t('social.message', 'El universo no fue diseñado para explorarlo solo. Conecta con la estación y sigamos construyendo juntos.')}
                    author={t('social.author', 'Comandante SL')}
                    networks={['instagram', 'tiktok', 'dribbble']}
                    onOpenContact={onOpenContact}
                />
            </Suspense>
        </motion.div>
    );
}