import React, { useState } from 'react';
import { 
  GitFork, 
  Sparkles, 
  ListTree, 
  Terminal, 
  Search,
  Zap
} from 'lucide-react';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';
import { DATA_STRUCTURES } from '../../data/dataStructuresData';
import { ALGORITHMS } from '../../data/algorithmsData';

interface NavbarProps {
  activeView: 'canvas' | 'wizard' | 'tree' | 'visualizers';
  onViewChange: (view: 'canvas' | 'wizard' | 'tree' | 'visualizers') => void;
  onSelectResult: (id: string) => void;
  onSelectVisualizerItem?: (type: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  onSelectResult,
  onSelectVisualizerItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Search through all data structures, algorithms, and problem results
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...Object.values(ALGORITHM_RESULTS).filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.classicProblems.some(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    ).map(r => ({ type: 'problem' as const, id: r.id, name: r.name, sub: r.tagline })),

    ...DATA_STRUCTURES.filter(ds => 
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(ds => ({ type: 'ds' as const, id: ds.type, name: ds.name, sub: 'Data Structure' })),

    ...ALGORITHMS.filter(algo => 
      algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(algo => ({ type: 'algo' as const, id: algo.type, name: algo.name, sub: 'Algorithmic Pattern' }))
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.15)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}
    >
      {/* Brand / Logo */}
      <div 
        onClick={() => onViewChange('canvas')}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      >
        <div 
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 245, 255, 0.5)'
          }}
        >
          <Zap size={22} color="#050810" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '0.05em', color: '#fff' }}>
              ALGOMONSTER
            </span>
            <span style={{ color: 'var(--neon-cyan)', fontWeight: 800, fontSize: '1.15rem' }}>//</span>
            <span style={{ color: 'var(--neon-magenta)', fontWeight: 700, fontSize: '1.15rem' }}>CYBERFLOW</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            INTERACTIVE DSA DECISION MATRIX
          </span>
        </div>
      </div>

      {/* View Switcher Controls */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(13, 21, 39, 0.7)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <button
          onClick={() => onViewChange('canvas')}
          className={`cyber-tab ${activeView === 'canvas' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeView === 'canvas' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
            color: activeView === 'canvas' ? 'var(--neon-cyan)' : 'var(--text-muted)',
            boxShadow: activeView === 'canvas' ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <GitFork size={16} />
          <span>Interactive Flowchart</span>
        </button>

        <button
          onClick={() => onViewChange('wizard')}
          className={`cyber-tab ${activeView === 'wizard' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeView === 'wizard' ? 'rgba(255, 0, 127, 0.2)' : 'transparent',
            color: activeView === 'wizard' ? 'var(--neon-magenta)' : 'var(--text-muted)',
            boxShadow: activeView === 'wizard' ? '0 0 10px rgba(255, 0, 127, 0.3)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <Sparkles size={16} />
          <span>Wizard Mode</span>
        </button>

        <button
          onClick={() => onViewChange('tree')}
          className={`cyber-tab ${activeView === 'tree' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeView === 'tree' ? 'rgba(57, 255, 20, 0.2)' : 'transparent',
            color: activeView === 'tree' ? 'var(--neon-green)' : 'var(--text-muted)',
            boxShadow: activeView === 'tree' ? '0 0 10px rgba(57, 255, 20, 0.3)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <ListTree size={16} />
          <span>Tree Directory</span>
        </button>

        <button
          onClick={() => onViewChange('visualizers')}
          className={`cyber-tab ${activeView === 'visualizers' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeView === 'visualizers' ? 'rgba(255, 214, 10, 0.2)' : 'transparent',
            color: activeView === 'visualizers' ? 'var(--neon-yellow)' : 'var(--text-muted)',
            boxShadow: activeView === 'visualizers' ? '0 0 10px rgba(255, 214, 10, 0.3)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <Terminal size={16} />
          <span>16 Simulators</span>
        </button>
      </nav>

      {/* Global Quick Search */}
      <div style={{ position: 'relative', width: '260px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(13, 21, 39, 0.8)',
            border: '1px solid rgba(0, 245, 255, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 12px'
          }}
        >
          <Search size={15} color="var(--text-muted)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Search algorithm or DS..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              width: '100%'
            }}
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              width: '320px',
              backgroundColor: '#090e1c',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.8)',
              maxHeight: '340px',
              overflowY: 'auto',
              padding: '6px',
              zIndex: 100
            }}
          >
            {searchResults.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (item.type === 'problem') {
                    onSelectResult(item.id);
                  } else if (onSelectVisualizerItem) {
                    onSelectVisualizerItem(item.id);
                  }
                  setShowSearchResults(false);
                  setSearchQuery('');
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 245, 255, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{item.name}</span>
                  <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>{item.type.toUpperCase()}</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.sub}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
