import { useTranslation } from 'react-i18next';
import { Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialCTA from '../components/SocialCTA';
import { ArrowRight } from 'lucide-react';
import { ScanlineBar } from '../components/ValorantOverlays';

// Lazy imports for all sections
const Hero = lazy(() => import('../sections/Hero'));
const Anomalies = lazy(() => import('../sections/Anomalies'));
const InteractiveBioTeaser = lazy(() => import('../sections/InteractiveBioTeaser'));
const Portfolio = lazy(() => import('../sections/Portfolio'));
const Protocols = lazy(() => import('../sections/Protocols'));
const Skills = lazy(() => import('../sections/Skills'));

const SectionPlaceholder = () => (
    <div className="w-full h-[300px] flex items-center justify-center bg-void">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="mono text-[10px] text-white/20 uppercase tracking-[0.4em]">INIT_PORTAL_MODULE...</span>
        </div>
    </div>
);

const PortalBridge = ({ to, label }) => (
    <div className="flex justify-center pb-16 sm:pb-20 bg-void">
        <Link
            to={to}
            className="group flex items-center gap-4 px-8 py-3 border border-white/10 hover:border-cyan/40 bg-white/[0.02] hover:bg-cyan/5 transition-all text-white/60 hover:text-cyan"
        >
            <span className="mono text-[10px] font-bold tracking-[0.3em] uppercase">{label}</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </Link>
    </div>
);

/* ── Simple horizontal separator ── */
const SectionDivider = () => (
    <div className="relative w-full h-px bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
    </div>
);

export default function Home({ onOpenContact, isAppLoading }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSelectProject = (project) => {
        navigate(`/portfolio/${project.id}`);
    };

    return (
        <div className="space-y-0">
            <Suspense fallback={<SectionPlaceholder />}>
                {/* 01 // system.init */}
                <Hero onOpenContact={onOpenContact} isAppLoading={isAppLoading} />

                {/* 0x01 // Anomalies */}
                <div className="relative">
                    <Anomalies isTeaser={true} />
                    <PortalBridge to="/approach" label="Ver mi enfoque completo" />
                </div>

                <SectionDivider />

                {/* 0x02 // Skills */}
                <div className="relative">
                    <Skills />
                </div>

                <SectionDivider />

                {/* 0x03 // Bio Teaser */}
                <div className="relative">
                    <InteractiveBioTeaser />
                    <PortalBridge to="/about" label="Explorar mi trayectoria" />
                </div>

                <SectionDivider />

                {/* 0x04 // Portfolio */}
                <div className="relative">
                    <Portfolio isTeaser={true} limit={3} onSelectProject={handleSelectProject} />
                    <PortalBridge to="/work" label="Ver todos los proyectos" />
                </div>

                <SectionDivider />

                {/* 0x05 // Protocols */}
                <div className="relative">
                    <Protocols />
                    <PortalBridge to="/services" label="Mis capacidades técnicas" />
                </div>

                {/* Social CTA */}
                <SocialCTA
                    title={t('social.title', 'TRANSMISIÓN ABIERTA')}
                    message={t('social.message', 'El universo no fue diseñado para explorarlo solo. Conecta con la estación y sigamos construyendo juntos.')}
                    author={t('social.author', 'Comandante SL')}
                    networks={['instagram', 'tiktok', 'dribbble']}
                    onOpenContact={onOpenContact}
                />
            </Suspense>
        </div>
    );
}
