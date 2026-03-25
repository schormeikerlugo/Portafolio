import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'HOME',
        approach: 'APPROACH',
        work: 'WORK',
        contact: 'CONTACT',
        contact_btn: 'CONTACT'
      },
      status: {
        system_ready: 'SYSTEM_READY',
        exploring: 'EXPLORING_ARCHIVE',
        stable: 'STABLE'
      },
      hero: {
        title: 'Schormeiker Lugo',
        subtitle: 'Frontend Design Engineer // Visual Systems Architect',
        cta_approach: 'SEE MY APPROACH',
        cta_work: 'CASE STUDIES'
      },
      anomalies: {
        title: 'DIAGNOSING ANOMALIES',
        subtitle: 'DIGITAL',
        tag: 'SYSTEMS DIAGNOSTICS',
        description: 'Before building, I analyze. I identify the structural failure points that prevent a product from reaching its maximum escape velocity.',
        items: {
          inconsistent: {
            title: 'INCONSISTENT SYSTEMS',
            desc: 'Visual and technical fragmentation in digital products creates technical debt that slows down launches and confuses the end user.',
            impact: 'Disordered growth // Maintenance fatigue'
          },
          gap: {
            title: 'DESIGN-ENGINEERING GAP',
            desc: 'The lack of a common language between designers and developers results in low-fidelity implementations and friction in delivery processes.',
            impact: 'Quality loss // Operational friction'
          },
          rigid: {
            title: 'RIGID ARCHITECTURES',
            desc: 'Interfaces that cannot evolve without breaking. The absence of an atomic design system prevents efficient scaling of complex applications.',
            impact: 'Structural rigidity // Lack of modularity'
          }
        }
      },
      bio: {
        tag: 'MODULE 03',
        title: 'MISSION HISTORY // ARCHITECT',
        p1: 'Hi, my name is Schormeiker Lugo, a UI/UX Designer and Frontend Developer with more than seven years of professional experience. My profile combines advanced technical capability with a solid background in advertising and marketing. This combination allows me to create digital products with robust architecture that prioritize the end user experience.',
        p2: 'My methodology transforms complex flows into efficient and attractive interfaces. The creative process is backed by deep mastery of HTML, CSS, and JavaScript. I also build interactive applications using React and Vite, and connect these visual environments to agile databases using tools like Supabase and PostgreSQL.',
        p3: 'My workflow integrates Artificial Intelligence as a fundamental resource. My expertise in prompt engineering maximizes the performance of large language models (LLMs), both on commercial platforms and in local execution environments. This technological adoption accelerates visual ideation, automates routine tasks, and elevates the overall quality of each project.',
        specs_title: 'STATION SPECIFICATIONS',
        status: 'ALL SYSTEMS OPERATIONAL',
        metrics: {
          years: 'YEARS IN ORBIT',
          products: 'DEPLOYED SYSTEMS',
          teams: 'TEAMS SCALED'
        },
        principles: {
          p1_t: 'Clarity over Complexity',
          p1_d: 'Priority on intuitive systems that reduce cognitive load.',
          p2_t: 'Performance as UX',
          p2_d: 'Every millisecond of latency is user friction.',
          p3_t: 'High-Impact Design',
          p3_d: 'Interfaces that are not just aesthetic, but operational.'
        }
      },
      project: {
        metrics: 'KEY METRICS',
        arsenal: 'TECHNICAL ARSENAL',
        links: 'EXTERNAL LINKS',
        diagnostics: 'SYSTEM DIAGNOSTICS',
        back_to_work: 'BACK TO OPERATIONS',
        prev: 'PREVIOUS',
        next: 'NEXT',
        view_live: 'VIEW LIVE',
        view_code: 'VIEW REPO',
        challenge: 'THE CHALLENGE',
        strategy: 'THE STRATEGY',
        results: 'THE RESULTS',
        error_log: 'ERR_LOG'
      },
      portfolio: {
        title: 'CASE STUDIES',
        subtitle: 'DIGITAL OPERATIONS',
        status_label: 'STATUS',
        filter_all: 'ALL_NODES',
        filter_design: 'DESIGN',
        filter_dev: 'DEVELOPMENT'
      },
      metrics: {
        tag: 'SYSTEM TELEMETRY',
        title: 'METRICS',
        items: {
          experience: { label: 'YEARS IN ORBIT', desc: 'Solving structural friction' },
          projects: { label: 'DEPLOYED SYSTEMS', desc: 'Direct product impact' },
          protocols: { label: 'TECHNICAL PROTOCOLS', desc: 'High-fidelity stack' },
          nations: { label: 'REACHED NATIONS', desc: 'Global system reach' }
        }
      },
      protocols: {
        tag: 'SECURITY PROTOCOLS',
        title: 'HOW DO I',
        subtitle: 'HELP?',
        description: 'I standardize processes and eliminate technical uncertainty through execution protocols designed for operational excellence.',
        items: {
          ds: {
            title: 'PROTOCOL 01: DESIGN SYSTEMS',
            subtitle: 'Visual Scalability',
            desc: 'Building atomic component libraries and technical documentation. I ensure visual consistency and system integrity in high-traffic products.'
          },
          ui: {
            title: 'PROTOCOL 02: INTERFACE ENGINEERING',
            subtitle: 'Technical Fidelity',
            desc: 'Frontend development with React and Framer Motion. Specialized in optimizing rendering performance and creating micro-interactions.'
          },
          strategy: {
            title: 'PROTOCOL 03: PRODUCT STRATEGY',
            subtitle: 'Vision to Execution',
            desc: 'Technical and visual diagnosis to define the product roadmap. I eliminate operational friction between stakeholders and engineering.'
          },
          ai: {
            title: 'PROTOCOL 04: APPLIED AI RESEARCH',
            subtitle: 'Operational Innovation',
            desc: 'Implementation of smart workflows. From Prompt Engineering to local LLM deployment (Ollama/Llama3) to automate internal processes.'
          }
        }
      },
      skills: {
        tag: 'MODULE 01',
        title: 'SKILLS MATRIX',
        subtitle: 'Technological stack and design capabilities of the operator.',
        console_idle: 'SYSTEM IDLE // AWAITING INPUT...',
        console_detected: 'DETECTED:',
        categories: {
          design: 'DESIGN SYSTEMS',
          dev: 'INTERFACE ENGINEERING',
          tools: 'OPERATIONAL STACK',
          soft: 'CRITICAL THINKING'
        }
      },
      experience: {
        tag: 'MISSION LOG',
        title: 'EXPERIENCE',
        subtitle: '+7 years navigating the digital ecosystem, designing interfaces that connect creative vision with technical execution.',
        mission: 'MISSION',
        types: {
          contract: 'CONTRACT',
          freelance: 'FREELANCE',
          fulltime: 'FULL-TIME'
        }
      },
      testimonials: {
        tag: 'RECEIVED COMMUNICATIONS',
        title: 'TESTIMONIALS',
        subtitle: 'Signals intercepted from mission partners and squadron commanders.'
      },
      certifications: {
        tag: 'VALIDATED CREDENTIALS',
        title: 'FORMATION',
        subtitle: 'Continuous improvement of the operative.',
        verify: 'VERIFY CERTIFICATE'
      },
      social: {
        title: 'OPEN TRANSMISSION',
        message: 'The universe wasn\'t designed to be explored alone. Connect with the station and let\'s keep building together.',
        author: 'Commander SL'
      },
      footer: {
        end: 'END_OF_TRANSMISSION',
        copy: 'SISTEMAS_OPERATIVOS_ACTIVOS',
        status: 'STATUS: STABLE // NODE: 0X4F92 // LATENCY: --ms',
        secure: 'SECURE_CONNECTION_ESTABLISHED'
      },
      contact: {
        title: 'ESTABLISH CONNECTION',
        subtitle: 'Send a secure message to the station.',
        name: 'OPERATOR NAME',
        email: 'COMMUNICATION FREQUENCY (EMAIL)',
        message: 'MESSAGE CONTENT',
        send: 'SEND TRANSMISSION',
        sending: 'SENDING...',
        success: 'TRANSMISSION RECEIVED',
        error: 'CONNECTION FAILURE'
      },
      common: {
        loading: 'INITIALIZING_SYSTEM...',
        back: 'BACK_TO_SYSTEM',
        more: 'READ_MORE',
        back_to_all_work: 'BACK_TO_OPERATIONS'
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'INICIO',
        approach: 'ENFOQUE',
        work: 'TRABAJO',
        contact: 'CONTACTO',
        contact_btn: 'CONTACTO'
      },
      status: {
        system_ready: 'SISTEMA_LISTO',
        exploring: 'EXPLORANDO_ARCHIVO',
        stable: 'ESTABLE'
      },
      hero: {
        title: 'Schormeiker Lugo',
        subtitle: 'Ingeniero de Diseño Frontend // Arquitecto de Sistemas Visuales',
        cta_approach: 'VER MI ENFOQUE',
        cta_work: 'CASOS DE ESTUDIO'
      },
      anomalies: {
        title: 'DETECTANDO ANOMALÍAS',
        subtitle: 'DIGITALES',
        tag: 'DIAGNÓSTICO DE SISTEMAS',
        description: 'Antes de construir, analizo. Identifico los puntos de fallo estructurales que impiden a un producto alcanzar su máxima velocidad de escape.',
        items: {
          inconsistent: {
            title: 'SISTEMAS INCONSISTENTES',
            desc: 'La fragmentación visual y técnica en productos digitales genera una deuda técnica que ralentiza los lanzamientos y confunde al usuario final.',
            impact: 'Crecimiento desordenado // Fatiga de mantenimiento'
          },
          gap: {
            title: 'BRECHA DISEÑO-INGENIERÍA',
            desc: 'La falta de un lenguaje común entre diseñadores y desarrolladores resulta en implementaciones de baja fidelidad y fricción en los procesos de entrega.',
            impact: 'Pérdida de calidad // Fricción operativa'
          },
          rigid: {
            title: 'ARQUITECTURAS RÍGIDAS',
            desc: 'Interfaces que no pueden evolucionar sin romperse. La ausencia de un sistema de diseño atómico impide el escalado eficiente de aplicaciones complejas.',
            impact: 'Rigidez estructural // Falta de modularidad'
          }
        }
      },
      bio: {
        tag: 'MÓDULO 03',
        title: 'Historia de la misión // Arquitecto',
        p1: 'Hola, mi nombre es Schormeiker Lugo, Diseñador UI/UX y Desarrollador Frontend con más de siete años de trayectoria profesional. Mi perfil une una capacidad técnica avanzada con un sólido conocimiento en publicidad y marketing. Esta combinación me facilita crear productos digitales que poseen una arquitectura robusta y priorizan la experiencia del usuario final.',
        p2: 'Mi metodología transforma flujos complejos en interfaces eficientes y atractivas. El proceso creativo se respalda con un dominio profundo de HTML, CSS y JavaScript. Además, construyo aplicaciones interactivas mediante React y Vite, y conecto estos entornos visuales con bases de datos ágiles utilizando herramientas como Supabase y PostgreSQL.',
        p3: 'El flujo de trabajo que utilizo integra la Inteligencia Artificial como un recurso fundamental. Mi experiencia en ingeniería de prompts maximiza el rendimiento de los modelos de lenguaje (LLMs), tanto en plataformas comerciales como en entornos de ejecución local. Esta adopción tecnológica acelera la ideación visual, automatiza tareas rutinarias y eleva la calidad general de cada proyecto.',
        specs_title: 'ESPECIFICACIONES DE LA ESTACIÓN',
        status: 'TODOS LOS SISTEMAS OPERATIVOS',
        metrics: {
          years: 'AÑOS EN ÓRBITA',
          products: 'SISTEMAS DESPLEGADOS',
          teams: 'EQUIPOS ESCALADOS'
        },
        principles: {
          p1_t: 'Claridad sobre Complejidad',
          p1_d: 'Priorizo sistemas intuitivos que reducen la carga cognitiva.',
          p2_t: 'Rendimiento como UX',
          p2_d: 'Cada milisegundo de latencia es fricción en el usuario.',
          p3_t: 'Diseño de Alto-Impacto',
          p3_d: 'Interfaces que no solo son estéticas, sino operativas.'
        }
      },
      project: {
        metrics: 'MÉTRICAS CLAVE',
        arsenal: 'ARSENAL TÉCNICO',
        links: 'ENLACES EXTERNOS',
        diagnostics: 'DIAGNÓSTICO DEL SISTEMA',
        back_to_work: 'VOLVER A OPERACIONES',
        prev: 'ANTERIOR',
        next: 'SIGUIENTE',
        view_live: 'VER EN VIVO',
        view_code: 'VER REPO',
        challenge: 'EL DESAFÍO',
        strategy: 'LA ESTRATEGIA',
        results: 'LOS RESULTADOS',
        error_log: 'BITÁCORA_ERROR'
      },
      portfolio: {
        title: 'CASOS DE ESTUDIO',
        subtitle: 'OPERACIONES DIGITALES',
        status_label: 'ESTADO',
        filter_all: 'TODOS_LOS_NODOS',
        filter_design: 'DISEÑO',
        filter_dev: 'DESARROLLO'
      },
      metrics: {
        tag: 'TELEMETRÍA DEL SISTEMA',
        title: 'MÉTRICAS',
        items: {
          experience: { label: 'AÑOS EN ÓRBITA', desc: 'Resolviendo fricción estructural' },
          projects: { label: 'SISTEMAS DESPLEGADOS', desc: 'Impacto directo en el producto' },
          protocols: { label: 'PROTOCOLOS TÉCNICOS', desc: 'Stack de alta fidelidad' },
          nations: { label: 'NACIONES ALCANZADAS', desc: 'Alcance global del sistema' }
        }
      },
      protocols: {
        tag: 'PROTOCOLOS DE SEGURIDAD',
        title: '¿CÓMO',
        subtitle: 'AYUDO?',
        description: 'Estandarizo procesos y elimino la incertidumbre técnica mediante protocolos de ejecución diseñados para la excelencia operativa.',
        items: {
          ds: {
            title: 'PROTOCOLO 01: SISTEMAS DE DISEÑO',
            subtitle: 'Escalabilidad Visual',
            desc: 'Construcción de bibliotecas de componentes atómicos y documentación técnica. Aseguro la consistencia visual y la integridad del sistema en productos de alto tráfico.'
          },
          ui: {
            title: 'PROTOCOLO 02: INGENIERÍA DE INTERFAZ',
            subtitle: 'Fidelidad Técnica',
            desc: 'Desarrollo frontend con React y Framer Motion. Especializado en optimizar el rendimiento de renderizado y crear micro-interacciones.'
          },
          strategy: {
            title: 'PROTOCOLO 03: ESTRATEGIA DE PRODUCTO',
            subtitle: 'Visión a Ejecución',
            desc: 'Diagnóstico técnico y visual para definir el roadmap de producto. Elimino la fricción operativa entre stakeholders e ingeniería.'
          },
          ai: {
            title: 'PROTOCOLO 04: INVESTIGACIÓN IA APLICADA',
            subtitle: 'Innovación Operativa',
            desc: 'Implementación de flujos de trabajo inteligentes. Desde Ingeniería de Prompts hasta el despliegue de LLMs locales (Ollama/Llama3).'
          }
        }
      },
      skills: {
        tag: 'MÓDULO 01',
        title: 'MATRIZ DE HABILIDADES',
        subtitle: 'Stack tecnológico y capacidades de diseño del operador.',
        console_idle: 'SISTEMA INACTIVO // ESPERANDO ENTRADA...',
        console_detected: 'DETECTADO:',
        categories: {
          design: 'SISTEMAS DE DISEÑO',
          dev: 'INGENIERÍA DE INTERFAZ',
          tools: 'STACK OPERATIVO',
          soft: 'PENSAMIENTO CRÍTICO'
        }
      },
      experience: {
        tag: 'BITÁCORA DE MISIONES',
        title: 'EXPERIENCIA',
        subtitle: '+7 años navegando por el ecosistema digital, diseñando interfaces que conectan la visión creativa con la ejecución técnica.',
        mission: 'MISIÓN',
        types: {
          contract: 'CONTRATO',
          freelance: 'FREELANCE',
          fulltime: 'TIEMPO COMPLETO'
        }
      },
      testimonials: {
        tag: 'COMUNICACIONES RECIBIDAS',
        title: 'TESTIMONIOS',
        subtitle: 'Señales interceptadas de compañeros de misión y comandantes de escuadrón.'
      },
      certifications: {
        tag: 'CREDENCIALES VALIDADAS',
        title: 'FORMACIÓN',
        subtitle: 'Mejora continua del operativo.',
        verify: 'VERIFICAR CERTIFICADO'
      },
      social: {
        title: 'TRANSMISIÓN ABIERTA',
        message: 'El universo no fue diseñado para explorarlo solo. Conecta con la estación y sigamos construyendo juntos.',
        author: 'Comandante SL'
      },
      footer: {
        end: 'FIN_DE_TRANSMISIÓN',
        copy: 'SISTEMAS_OPERATIVOS_ACTIVOS',
        status: 'ESTADO: ESTABLE // NODO: 0X4F92 // LATENCIA: --ms',
        secure: 'CONEXIÓN_SEGURA_ESTABLECIDA'
      },
      contact: {
        title: 'ESTABLECER CONEXIÓN',
        subtitle: 'Envía un mensaje seguro a la estación.',
        name: 'NOMBRE DEL OPERADOR',
        email: 'FRECUENCIA DE COMUNICACIÓN (EMAIL)',
        message: 'CONTENIDO DEL MENSAJE',
        send: 'ENVIAR TRANSMISIÓN',
        sending: 'ENVIANDO...',
        success: 'TRANSMISSION RECEIVED',
        error: 'FALLO EN LA CONEXIÓN'
      },
      common: {
        loading: 'INICIALIZANDO_SISTEMA...',
        back: 'VOLVER_AL_SISTEMA',
        more: 'LEER_MÁS',
        back_to_all_work: 'VOLVER_A_OPERACIONES'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
