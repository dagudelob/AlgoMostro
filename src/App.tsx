import React, { useState } from 'react';
import { Navbar, type AppView } from './components/common/Navbar';
import { FlowchartCanvas } from './components/flowchart/FlowchartCanvas';
import { WizardMode } from './components/flowchart/WizardMode';
import { TreeListView } from './components/flowchart/TreeListView';
import { VisualizerHub } from './components/visualizers/VisualizerHub';
import { HoverPreviewCard } from './components/common/HoverPreviewCard';
import { ProblemDetailModal } from './components/details/ProblemDetailModal';
import { ALGORITHM_RESULTS } from './data/problemCatalog';
import type { AlgorithmResult } from './types/flowchart';
import { Terminal } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('canvas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalResult, setActiveModalResult] = useState<AlgorithmResult | null>(null);

  // Floating hover preview state
  const [hoveredResult, setHoveredResult] = useState<AlgorithmResult | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  const handleHoverResult = (result: AlgorithmResult | null, e?: React.MouseEvent) => {
    setHoveredResult(result);
    if (result && e) {
      setHoverPos({
        x: Math.min(e.clientX + 15, window.innerWidth - 300),
        y: Math.min(e.clientY + 15, window.innerHeight - 280)
      });
    } else {
      setHoverPos(null);
    }
  };

  // Search filtered results
  const searchMatches = searchQuery.trim()
    ? Object.values(ALGORITHM_RESULTS).filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.dataStructures.some((ds) => ds.toLowerCase().includes(searchQuery.toLowerCase())) ||
          r.algorithms.some((al) => al.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onChangeView={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container */}
      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '24px 20px' }}>
        {/* Search Results Dropdown Overlay */}
        {searchQuery.trim() && (
          <div
            className="cyber-card"
            style={{
              marginBottom: '20px',
              padding: '16px',
              border: '1px solid var(--neon-cyan)',
              backgroundColor: 'rgba(9, 14, 28, 0.95)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Terminal size={16} color="var(--neon-cyan)" />
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', fontWeight: 600 }}>
                RESULTADOS DE BÚSQUEDA ({searchMatches.length}):
              </span>
            </div>

            {searchMatches.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No se encontraron algoritmos coincidentes con "{searchQuery}".
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                {searchMatches.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      setActiveModalResult(res);
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(16, 28, 54, 0.8)',
                      border: '1px solid rgba(0, 245, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                      e.currentTarget.style.backgroundColor = 'rgba(0, 245, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.2)';
                      e.currentTarget.style.backgroundColor = 'rgba(16, 28, 54, 0.8)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.85rem' }}>{res.name}</span>
                      <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>{res.timeComplexity}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {res.description.slice(0, 70)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View Routing */}
        {currentView === 'canvas' && (
          <FlowchartCanvas
            onHoverResult={handleHoverResult}
            onOpenResultModal={setActiveModalResult}
          />
        )}

        {currentView === 'wizard' && (
          <WizardMode onOpenResultModal={setActiveModalResult} />
        )}

        {currentView === 'tree' && (
          <TreeListView onOpenResultModal={setActiveModalResult} />
        )}

        {currentView === 'visualizers' && (
          <VisualizerHub />
        )}
      </main>

      {/* Floating Hover Preview Card */}
      {hoveredResult && hoverPos && (
        <div
          style={{
            position: 'fixed',
            left: `${hoverPos.x}px`,
            top: `${hoverPos.y}px`,
            zIndex: 99999,
            pointerEvents: 'none'
          }}
        >
          <HoverPreviewCard item={hoveredResult} />
        </div>
      )}

      {/* Full Problem & Simulator Modal */}
      <ProblemDetailModal
        algorithmResult={activeModalResult}
        isOpen={!!activeModalResult}
        onClose={() => setActiveModalResult(null)}
      />

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(0, 245, 255, 0.15)',
          backgroundColor: '#060912',
          padding: '20px 24px',
          marginTop: '40px'
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
              Basado en la metodología de árbol de decisión de{' '}
              <a
                href="https://algo.monster/flowchart"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontWeight: 600 }}
              >
                AlgoMonster Flowchart
              </a>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            <span>8 DATA STRUCTURES</span>
            <span>•</span>
            <span>8 ALGORITHMS</span>
            <span>•</span>
            <span>INTERACTIVE VISUALIZERS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
