import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar, type AppView } from './components/common/Navbar';
import { FlowchartCanvas } from './components/flowchart/FlowchartCanvas';
import { MermaidFlowchartView } from './components/mermaid/MermaidFlowchartView';
import { WizardMode } from './components/flowchart/WizardMode';
import { TreeListView } from './components/flowchart/TreeListView';
import { VisualizerHub } from './components/visualizers/VisualizerHub';
import { WikiView } from './components/wiki/WikiView';
import { HoverPreviewCard } from './components/common/HoverPreviewCard';
import { ProblemDetailModal } from './components/details/ProblemDetailModal';
import { ALGORITHM_RESULTS } from './data/problemCatalog';
import { DATA_STRUCTURES } from './data/dataStructuresData';
import { ALGORITHMS } from './data/algorithmsData';
import type { AlgorithmResult } from './types/flowchart';
import type { DSItem, AlgoItem } from './types/visualizer';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<AppView>('canvas');
  const [selectedVisualizerType, setSelectedVisualizerType] = useState<string>('array');
  const [activeModalResult, setActiveModalResult] = useState<AlgorithmResult | null>(null);

  // Floating hover preview state
  const [hoverItem, setHoverItem] = useState<DSItem | AlgoItem | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleHoverTerm = (term: string, event: React.MouseEvent) => {
    const dsMatch = DATA_STRUCTURES.find(d => d.type === term || d.name.toLowerCase() === term.toLowerCase());
    const algoMatch = ALGORITHMS.find(a => a.type === term || a.name.toLowerCase() === term.toLowerCase());

    if (dsMatch) {
      setHoverItem(dsMatch);
      setHoverPos({ x: event.clientX, y: event.clientY });
    } else if (algoMatch) {
      setHoverItem(algoMatch);
      setHoverPos({ x: event.clientX, y: event.clientY });
    }
  };

  const handleLeaveTerm = () => {
    setHoverItem(null);
  };

  const handleSelectResult = (resultId: string) => {
    const res = ALGORITHM_RESULTS[resultId];
    if (res) {
      setActiveModalResult(res);
    }
  };

  const handleSelectVisualizerItem = (type: string) => {
    setSelectedVisualizerType(type);
    setActiveView('visualizers');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Sticky Top Navbar with Language Toggle */}
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        onSelectResult={handleSelectResult}
        onSelectVisualizerItem={handleSelectVisualizerItem}
      />

      {/* Main App View Routing */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeView === 'canvas' && (
          <FlowchartCanvas
            onSelectResult={handleSelectResult}
            onHoverItem={handleHoverTerm}
            onLeaveItem={handleLeaveTerm}
          />
        )}

        {activeView === 'mermaid' && (
          <MermaidFlowchartView
            onSelectResult={handleSelectResult}
            onOpenVisualizer={handleSelectVisualizerItem}
          />
        )}

        {activeView === 'wiki' && (
          <WikiView onOpenVisualizer={handleSelectVisualizerItem} />
        )}

        {activeView === 'wizard' && (
          <WizardMode
            onSelectResult={handleSelectResult}
            onHoverItem={handleHoverTerm}
            onLeaveItem={handleLeaveTerm}
          />
        )}

        {activeView === 'tree' && (
          <TreeListView
            onSelectResult={handleSelectResult}
            onHoverItem={handleHoverTerm}
            onLeaveItem={handleLeaveTerm}
          />
        )}

        {activeView === 'visualizers' && (
          <VisualizerHub initialType={selectedVisualizerType} />
        )}
      </main>

      {/* Floating Hover Preview Card */}
      {hoverItem && (
        <HoverPreviewCard item={hoverItem} position={hoverPos} />
      )}

      {/* Modal with Theory, Simulator and LeetCode Code */}
      <ProblemDetailModal
        isOpen={!!activeModalResult}
        onClose={() => setActiveModalResult(null)}
        result={activeModalResult}
      />

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(0, 245, 255, 0.15)',
          backgroundColor: '#060912',
          padding: '16px 24px',
          marginTop: 'auto'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {t('footer.based_on')}{' '}
              <a
                href="https://algo.monster/flowchart"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontWeight: 600 }}
              >
                AlgoMonster Flowchart
              </a>
              {' '}&bull; {t('footer.collab')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            <span>8 DATA STRUCTURES</span>
            <span>•</span>
            <span>8 ALGORITHMS</span>
            <span>•</span>
            <span>16 SIMULATORS</span>
            <span>•</span>
            <span>PYTHON / TS / JS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
