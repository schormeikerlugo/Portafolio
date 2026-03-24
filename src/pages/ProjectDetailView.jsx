import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { projects } from '../data/content';
import { useTranslation } from 'react-i18next';
import GlassContainer from '../components/GlassContainer';
import CipherText from '../components/CipherText';
import TypewriterText from '../components/TypewriterText';

const ProjectDetailView = ({ project: projectProp, onBack }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  
  // Find project by prop or by param ID
  const project = projectProp || projects.find(p => p.id === parseInt(id));
  const projectIndex = project ? projects.findIndex(p => p.id === project.id) : -1;

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-void">
        <div className="w-16 h-16 border border-cyan/20 flex items-center justify-center mb-8 animate-pulse text-cyan">!</div>
        <div className="mono text-[10px] text-cyan uppercase tracking-[0.4em] mb-4">ERR_PROJECT_NOT_FOUND</div>
        <button 
            onClick={onBack}
            className="mono text-[10px] text-white/40 hover:text-cyan transition-colors uppercase border border-white/10 px-6 py-2"
        >
            [ DISMISS_OPERATIONAL_FAULT ]
        </button>
    </div>
  );

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto relative overflow-hidden bg-void"
    >
      {/* Animated Sci-Fi Background from Orígenes */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
              initial={{ backgroundPosition: "0px 0px" }}
              animate={{ backgroundPosition: "0px -40px" }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-0 opacity-[0.3]"
              style={{
                  backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.8) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
              }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_80%)]" />
      </div>

      <div className="relative z-10 w-full h-full">
          {/* ── Navigation Header ── */}
          <nav className="mb-12">
            {onBack ? (
                <button 
                    onClick={onBack}
                    className="group inline-flex items-center gap-2 font-mono text-[10px] text-text-dim hover:text-cyan transition-colors tracking-widest uppercase cursor-pointer"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    {t('project.back_to_work', 'VOLVER A OPERACIONES')}
                </button>
            ) : (
                <Link 
                    to="/work" 
                    className="group inline-flex items-center gap-2 font-mono text-[10px] text-text-dim hover:text-cyan transition-colors tracking-widest uppercase"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    {t('project.back_to_work', 'VOLVER A OPERACIONES')}
                </Link>
            )}
          </nav>

          {/* ── Project Identity ── */}
          <header className="mb-16">
            <div className="flex gap-2 mb-6">
              <span className="px-2 py-0.5 border border-cyan/20 bg-cyan/5 font-mono text-[9px] text-cyan font-bold tracking-widest">
                {project.year || '2024'}
              </span>
              <span className="px-2 py-0.5 border border-white/10 bg-white/5 font-mono text-[9px] text-text-secondary tracking-widest uppercase">
                {project.category || 'FRONTEND'}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-sans font-bold text-text-primary tracking-tighter mb-4 uppercase leading-none">
              <CipherText text={project.title} />
            </h1>
            
            <p className="text-cyan text-lg sm:text-xl font-mono mb-8 opacity-80 uppercase tracking-tight">
              {project.role || 'FULLSTACK ENGINEER'}
            </p>

            <p className="w-full text-text-secondary text-lg sm:text-xl leading-relaxed font-sans">
              <TypewriterText text={project.hook || 'Diseño de infraestructura digital de alta fidelidad, optimizando flujos de datos y experiencia de usuario en entornos críticos.'} delay={0.2} loop={false} speed={0.015} />
            </p>
          </header>

          {/* ── Hero Image ── */}
          <motion.div 
            className="relative aspect-video mb-24 overflow-hidden rounded-xl border border-white/[0.05] panel"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          {/* ── Main Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-16 lg:gap-24 relative">
            
            {/* ── Sticky Sidebar ── */}
            <aside className="lg:sticky lg:top-32 h-fit space-y-12 order-2 lg:order-1">
              {/* Key Metrics/Achievements */}
              <section>
                <h3 className="font-mono text-[10px] text-cyan tracking-[0.3em] mb-6 font-bold uppercase">
                  {t('project.metrics', 'MÉTRICAS CLAVE')}
                </h3>
                <ul className="space-y-4 font-sans">
                  {(project.achievements || ['95%+ Performance Score', 'Modular Architecture', 'Responsive Design']).map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-text-secondary border-b border-white/[0.03] pb-4">
                      <Plus size={14} className="text-cyan shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Arsenal / Tech Stack */}
              <section>
                <h3 className="font-mono text-[10px] text-cyan tracking-[0.3em] mb-6 font-bold uppercase">
                  {t('project.arsenal', 'ARSENAL TÉCNICO')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/[0.03] border border-white/10 rounded font-mono text-[9px] text-text-dim uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* CTA */}
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between w-full p-4 border border-cyan/30 rounded-lg hover:bg-cyan/5 transition-all duration-300"
                >
                  <span className="font-mono text-xs text-cyan tracking-widest font-bold uppercase">
                    {t('project.view_live', 'VISITAR DESPLIEGUE')}
                  </span>
                  <ExternalLink size={16} className="text-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
            </aside>

            {/* ── Narrative Content ── */}
            <div className="order-1 lg:order-2 space-y-24 w-full">
              {/* Context/Intro */}
              <section>
                <span className="mono text-[10px] text-cyan uppercase tracking-widest block mb-2">
                    01 // FASE_DIAGNOSTICO
                </span>
                <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-primary tracking-tighter mb-6">
                  <CipherText text={t('project.diagnostics', 'Diagnóstico del sistema.')} />
                </h2>
                <p className="w-full text-text-secondary text-lg sm:text-xl leading-relaxed font-sans">
                  <TypewriterText text={project.mission || 'Descripción general de la misión e impacto esperado en el ecosistema digital del cliente.'} delay={0.2} loop={false} speed={0.015} />
                </p>
              </section>

              {/* The Challenge */}
              <section className="relative">
                <div className="absolute -left-4 sm:-left-8 top-0 bottom-0 w-px bg-magenta/20" />
                <span className="mono text-[10px] text-magenta uppercase tracking-widest block mb-2 pl-4 sm:pl-0">
                    02 // REPORTE_DE_ANOMALIAS
                </span>
                <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-primary tracking-tighter mb-6 pl-4 sm:pl-0">
                  <CipherText text={t('project.challenge', 'El desafío.')} />
                </h2>
                <div className="space-y-6 text-text-secondary leading-relaxed border-l-0 sm:border-l border-magenta/20 pl-4 sm:pl-8 font-sans text-lg sm:text-xl bg-magenta/[0.01]">
                    <p><TypewriterText text={project.challenge_text || 'Análisis de los cuellos de botella técnicos y estructurales que impedían el escalado eficiente del producto.'} delay={0.2} loop={false} speed={0.015} /></p>
                    {project.problem && (
                       <div className="mt-6 p-4 bg-black/40 border border-white/[0.05] rounded font-mono text-[9px] sm:text-[11px] text-magenta/70 uppercase tracking-widest leading-relaxed">
                            [{t('project.error_log', 'ERR_LOG')}]: 
                            <span className="block mt-2 italic font-sans text-text-secondary opacity-80 font-light">{project.problem}</span>
                       </div>
                    )}
                </div>
              </section>

              {/* Strategy / Approach */}
              <section>
                <span className="mono text-[10px] text-cyan uppercase tracking-widest block mb-2">
                    03 // EJECUCION_PLANTEADA
                </span>
                <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-primary tracking-tighter mb-6">
                  <CipherText text={t('project.strategy', 'La estrategia.')} />
                </h2>
                <p className="w-full text-text-secondary text-lg sm:text-xl leading-relaxed font-sans mb-12">
                  <TypewriterText text={project.solution || 'Implementación de una architecture modular y escalable para resolver los puntos críticos identificados en el diagnóstico.'} delay={0.2} loop={false} speed={0.015} />
                </p>
                {/* Gallery Images Integration */}
                {project.gallery?.slice(0, 2).map((img, idx) => (
                    <div key={idx} className="mb-12 rounded-xl border border-white/[0.05] overflow-hidden panel">
                        <img src={img} alt="Detail" className="w-full h-auto opacity-70 hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
              </section>

              {/* Results & Future */}
              <section>
                <span className="mono text-[10px] text-text-dim uppercase tracking-widest block mb-2">
                    04 // METRICAS_POST_DESPLIEGUE
                </span>
                <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-primary tracking-tighter mb-6">
                  <CipherText text={t('project.results', 'Los resultados.')} />
                </h2>
                <p className="w-full text-text-secondary text-lg sm:text-xl leading-relaxed font-sans">
                  <TypewriterText text={project.results || 'Resultados finales y métricas de éxito alcanzadas tras el despliegue de la infraestructura.'} delay={0.2} loop={false} speed={0.015} />
                </p>
              </section>
            </div>
          </div>

          {/* ── Footer Navigation ── */}
          <footer className="mt-32 pt-24 border-t border-white/[0.05] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
                to={`/portfolio/${prevProject.id}`}
                className="group p-8 border border-white/[0.05] rounded-xl hover:border-cyan/30 transition-all flex flex-col items-start gap-4 panel"
            >
                <div className="flex items-center gap-2 font-mono text-[9px] text-text-dim group-hover:text-cyan transition-colors uppercase">
                    <ChevronLeft size={16} /> {t('project.prev', 'ANTERIOR')}
                </div>
                <span className="text-lg font-mono text-white group-hover:text-cyan transition-colors uppercase truncate w-full">{prevProject.title}</span>
            </Link>

            <Link 
                to={`/portfolio/${nextProject.id}`}
                className="group p-8 border border-white/[0.05] rounded-xl hover:border-cyan/30 transition-all flex flex-col items-end gap-4 text-right panel"
            >
                <div className="flex items-center gap-2 font-mono text-[9px] text-text-dim group-hover:text-cyan transition-colors uppercase">
                  {t('project.next', 'SIGUIENTE')} <ChevronRight size={16} />
                </div>
                <span className="text-lg font-mono text-white group-hover:text-cyan transition-colors uppercase truncate w-full">{nextProject.title}</span>
            </Link>
          </footer>
      </div>
    </motion.div>
  );
};

export default ProjectDetailView;
