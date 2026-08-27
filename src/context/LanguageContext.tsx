import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.flowchart': 'Interactive Flowchart',
    'nav.mermaid': 'Mermaid Architecture',
    'nav.wiki': 'Wiki & Big-O',
    'nav.simulators': '16 Simulators',
    'nav.wizard': 'Diagnostic Wizard',
    'nav.directory': 'Tree Directory',
    'nav.search': 'Search algorithms, DS, or signals...',
    'nav.subtitle': 'INTERACTIVE DSA FLOWCHART & WIKI',
    'nav.algorithms': 'ALGORITHMIC SOLUTIONS',
    'nav.data_structures': 'DATA STRUCTURES',
    'nav.sim_badge': 'Simulator',

    // Flowchart
    'flowchart.mode.structure': '1. Problem Structure Flowchart',
    'flowchart.mode.showdown': '2. Algorithm Showdown & Tradeoffs',
    'flowchart.filter.all': 'All Patterns',
    'flowchart.filter.graph': 'Graphs/Trees',
    'flowchart.filter.bs': 'Binary Search',
    'flowchart.filter.subarray': 'Subarrays',
    'flowchart.filter.dp': 'DP',
    'flowchart.filter.heap': 'Heaps',
    'flowchart.filter.greedy': 'Greedy',
    'flowchart.filter.label': 'FILTER:',
    'flowchart.depth': 'Depth:',
    'flowchart.reset': 'Reset',
    'flowchart.step': 'STEP',
    'flowchart.active': 'ACTIVE',
    'flowchart.showdown.title': 'ALGORITHM VS ALGORITHM TRADEOFF ENGINE',

    // Mermaid
    'mermaid.banner.badge': 'INTERACTIVE MERMAID.JS DECISION ARCHITECTURE',
    'mermaid.copy': 'Copy Mermaid Code',
    'mermaid.copied': 'Copied!',
    'mermaid.export': 'Export SVG',
    'mermaid.fullscreen': 'Fullscreen View',
    'mermaid.exit_fullscreen': 'Exit Fullscreen',
    'mermaid.tab.master': '🌟 Full Master Flowchart',
    'mermaid.tab.arrays': '🟩 1. Arrays & Strings',
    'mermaid.tab.graphs': '🟦 2. Graphs & Trees',
    'mermaid.tab.dp': '🟧 3. DP & Combinatorics',
    'mermaid.tab.specialized': '🟪 4. Heaps & Intervals',
    'mermaid.matrix.title': 'Algorithmic Master Matrix & Complexity Reference',
    'mermaid.guide.title': 'Quick Interview Decision Guide',

    // Simulators
    'sim.tab.ds': '8 Data Structures',
    'sim.tab.algo': '8 Algorithms',
    'sim.layout.split': 'Split View',
    'sim.layout.wide': 'Wide Code View',
    'sim.overview': 'CORE OVERVIEW & COMPLEXITY',
    'sim.reference': 'Reference Implementation',
    'sim.speed': 'Speed',
    'sim.step_back': 'Step -1',
    'sim.step_fwd': 'Step +1',
    'sim.play': 'Play',
    'sim.pause': 'Pause',
    'sim.reset': 'Reset',
    'sim.debug': 'State Debugger',

    // Wiki
    'wiki.banner.badge': 'KNOWLEDGE BASE & PROGRESSIVE CURRICULUM',
    'wiki.title': 'DSA Learning Wiki & Big-O Guide',
    'wiki.subtitle': 'Structured progressive mastery: memory structures, algorithmic patterns, computational complexity and decision matrices.',
    'wiki.search': 'Search signals, terms, Big-O...',
    'wiki.tab.curriculum': '1. Progressive Curriculum',
    'wiki.tab.decision': '2. Decision Guide',
    'wiki.tab.bigo': '3. Big-O Cheat Sheet',
    'wiki.tab.glossary': '4. Glossary',
    'wiki.takeaway': 'KEY TAKEAWAY:',
    'wiki.launch_sim': 'Launch Live Simulator',

    // Wizard
    'wizard.title': 'Diagnostic Problem Wizard',
    'wizard.subtitle': 'Answer step-by-step diagnostic questions to identify the ideal algorithmic pattern for your interview problem.',
    'wizard.question': 'Question',
    'wizard.of': 'of',
    'wizard.back': 'Back',
    'wizard.restart': 'Restart Diagnostic',

    // Modal
    'modal.tab.overview': 'Overview & Theory',
    'modal.tab.code': 'Solution Code',
    'modal.tab.visualizer': 'Live Simulator',
    'modal.when_to_use': 'WHEN TO USE THIS PATTERN',
    'modal.when_to_avoid': 'WHEN TO AVOID (COMMON PITFALLS)',
    'modal.practice_title': 'Curated LeetCode Practice Problems',

    // Footer
    'footer.collab': 'Collaborative Educational Project',
    'footer.based_on': 'Based on the algorithmic decision tree methodology by'
  },
  es: {
    // Navbar
    'nav.flowchart': 'Diagrama de Flujo',
    'nav.mermaid': 'Arquitectura Mermaid',
    'nav.wiki': 'Wiki y Big-O',
    'nav.simulators': '16 Simuladores',
    'nav.wizard': 'Asistente de Diagnóstico',
    'nav.directory': 'Directorio de Árbol',
    'nav.search': 'Buscar algoritmos, estructuras o señales...',
    'nav.subtitle': 'DIAGRAMA DE FLUJO INTERACTIVO Y WIKI DSA',
    'nav.algorithms': 'SOLUCIONES ALGORÍTMICAS',
    'nav.data_structures': 'ESTRUCTURAS DE DATOS',
    'nav.sim_badge': 'Simulador',

    // Flowchart
    'flowchart.mode.structure': '1. Estructura del Problema',
    'flowchart.mode.showdown': '2. Comparativas y Tradeoffs',
    'flowchart.filter.all': 'Todos los Patrones',
    'flowchart.filter.graph': 'Grafos/Árboles',
    'flowchart.filter.bs': 'Búsqueda Binaria',
    'flowchart.filter.subarray': 'Subarreglos',
    'flowchart.filter.dp': 'Prog. Dinámica',
    'flowchart.filter.heap': 'Heaps',
    'flowchart.filter.greedy': 'Greedy',
    'flowchart.filter.label': 'FILTRO:',
    'flowchart.depth': 'Nivel:',
    'flowchart.reset': 'Reiniciar',
    'flowchart.step': 'PASO',
    'flowchart.active': 'ACTIVO',
    'flowchart.showdown.title': 'MOTOR DE COMPARATIVAS Y TRADEOFFS',

    // Mermaid
    'mermaid.banner.badge': 'ARQUITECTURA DE DECISIÓN INTERACTIVA EN MERMAID.JS',
    'mermaid.copy': 'Copiar Código Mermaid',
    'mermaid.copied': '¡Copiado!',
    'mermaid.export': 'Exportar SVG',
    'mermaid.fullscreen': 'Pantalla Completa',
    'mermaid.exit_fullscreen': 'Salir de Pantalla Completa',
    'mermaid.tab.master': '🌟 Diagrama Maestro Completo',
    'mermaid.tab.arrays': '🟩 1. Arreglos y Cadenas',
    'mermaid.tab.graphs': '🟦 2. Grafos y Árboles',
    'mermaid.tab.dp': '🟧 3. Prog. Dinámica y Combinatoria',
    'mermaid.tab.specialized': '🟪 4. Heaps e Intervalos',
    'mermaid.matrix.title': 'Matriz Resumen de Algoritmos y Complejidad',
    'mermaid.guide.title': 'Guía Rápida de Decisión durante la Entrevista',

    // Simulators
    'sim.tab.ds': '8 Estructuras de Datos',
    'sim.tab.algo': '8 Algoritmos Esenciales',
    'sim.layout.split': 'Vista Dividida',
    'sim.layout.wide': 'Vista de Código Ampliada',
    'sim.overview': 'RESUMEN GENERAL Y COMPLEJIDAD',
    'sim.reference': 'Implementación de Referencia',
    'sim.speed': 'Velocidad',
    'sim.step_back': 'Paso -1',
    'sim.step_fwd': 'Paso +1',
    'sim.play': 'Reproducir',
    'sim.pause': 'Pausar',
    'sim.reset': 'Reiniciar',
    'sim.debug': 'Depurador de Variables',

    // Wiki
    'wiki.banner.badge': 'BASE DE CONOCIMIENTO Y RUTA DE APRENDIZAJE',
    'wiki.title': 'Wiki de DSA y Guía Big-O',
    'wiki.subtitle': 'Dominio progresivo estructurado: estructuras en memoria, patrones algorítmicos, complejidad computacional y matrices de decisión.',
    'wiki.search': 'Buscar señales, términos, Big-O...',
    'wiki.tab.curriculum': '1. Ruta Progresiva',
    'wiki.tab.decision': '2. Guía de Decisión',
    'wiki.tab.bigo': '3. Tabla Big-O',
    'wiki.tab.glossary': '4. Glosario Técnico',
    'wiki.takeaway': 'CONCLUSIÓN CLAVE:',
    'wiki.launch_sim': 'Abrir Simulador Interactivo',

    // Wizard
    'wizard.title': 'Asistente de Diagnóstico de Problemas',
    'wizard.subtitle': 'Responde preguntas paso a paso para identificar el patrón algorítmico ideal para tu problema de entrevista.',
    'wizard.question': 'Pregunta',
    'wizard.of': 'de',
    'wizard.back': 'Atrás',
    'wizard.restart': 'Reiniciar Diagnóstico',

    // Modal
    'modal.tab.overview': 'Resumen y Teoría',
    'modal.tab.code': 'Código de Solución',
    'modal.tab.visualizer': 'Simulador Interactivo',
    'modal.when_to_use': 'CUÁNDO USAR ESTE PATRÓN',
    'modal.when_to_avoid': 'CUÁNDO EVITARLO (ERRORES COMUNES)',
    'modal.practice_title': 'Problemas Seleccionados de LeetCode',

    // Footer
    'footer.collab': 'Proyecto Colaborativo Educativo',
    'footer.based_on': 'Basado en la metodología del árbol de decisiones de'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string, defaultText?: string) => defaultText || key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('algomonster_lang');
    return (saved === 'es' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('algomonster_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'es' : 'en'));
  };

  const t = (key: string, defaultText?: string): string => {
    return translations[lang][key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
