import React from 'react';
import { Terminal, Network, Sparkles, Cpu, ListTree } from 'lucide-react';

export type AppView = 'canvas' | 'wizard' | 'tree' | 'visualizers';

interface NavbarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onChangeView,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(8, 12, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        {/* Brand */}
        <div
          onClick={() => onChangeView('canvas')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 0, 127, 0.2))',
              border: '1px solid var(--neon-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0, 245, 255, 0.4)'
            }}
          >
            <Network size={20} color="#00f5ff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em', color: '#fff' }}>
                ALGOMONSTER
              </span>
              <span style={{ color: 'var(--neon-magenta)', fontWeight: 800, fontSize: '1.1rem' }}>
                //
              </span>
              <span style={{ color: 'var(--neon-cyan)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                CYBERFLOW
              </span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              STUDY NAVIGATOR & DSA VISUALIZER
            </span>
          </div>
        </div>

        {/* View Mode Tabs */}
        <nav style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => onChangeView('canvas')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: currentView === 'canvas' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: currentView === 'canvas' ? '#00f5ff' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              boxShadow: currentView === 'canvas' ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Network size={14} /> Flowchart Canvas
          </button>

          <button
            onClick={() => onChangeView('wizard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: currentView === 'wizard' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: currentView === 'wizard' ? '#00f5ff' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              boxShadow: currentView === 'wizard' ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={14} /> Modo Asistente
          </button>

          <button
            onClick={() => onChangeView('visualizers')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: currentView === 'visualizers' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: currentView === 'visualizers' ? '#00f5ff' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              boxShadow: currentView === 'visualizers' ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Cpu size={14} /> 16 Simuladores
          </button>

          <button
            onClick={() => onChangeView('tree')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: currentView === 'tree' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: currentView === 'tree' ? '#00f5ff' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              boxShadow: currentView === 'tree' ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <ListTree size={14} /> Vista Árbol
          </button>
        </nav>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar algoritmo o estructura..."
            style={{
              width: '240px',
              padding: '7px 12px',
              paddingLeft: '32px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(0, 245, 255, 0.25)',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-sans)',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--neon-cyan)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 245, 255, 0.3)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.25)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <Terminal
            size={14}
            color="var(--neon-cyan)"
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
      </div>
    </header>
  );
};
