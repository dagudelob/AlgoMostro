import React, { useState, useRef, useEffect } from 'react';
import { 
  GitBranch, 
  Sparkles, 
  FolderTree, 
  PlayCircle, 
  Search, 
  X,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { DATA_STRUCTURES } from '../../data/dataStructuresData';
import { ALGORITHMS } from '../../data/algorithmsData';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';

export type AppView = 'canvas' | 'wiki' | 'wizard' | 'tree' | 'visualizers';

interface NavbarProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  onSelectResult: (resultId: string) => void;
  onSelectVisualizerItem: (type: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  onSelectResult,
  onSelectVisualizerItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter items across data structures, algorithms, and decision patterns
  const filteredDS = DATA_STRUCTURES.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlgos = ALGORITHMS.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResults = Object.values(ALGORITHM_RESULTS).filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.classicProblems.some(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const hasResults = filteredDS.length > 0 || filteredAlgos.length > 0 || filteredResults.length > 0;

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(4, 7, 14, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 20px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => onViewChange('canvas')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.5)'
            }}
          >
            <GitBranch size={22} color="#050811" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.5px', color: '#fff' }}>
                AlgoMonster
              </span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  letterSpacing: '-0.5px',
                  background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                CyberFlow
              </span>
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', display: 'block', marginTop: '-2px' }}>
              INTERACTIVE DSA FLOWCHART & WIKI
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div ref={searchRef} style={{ position: 'relative', width: '300px', display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                color: 'var(--neon-cyan)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search algorithms, DS, or signals..."
              style={{
                width: '100%',
                padding: '8px 32px 8px 36px',
                borderRadius: '20px',
                backgroundColor: 'rgba(16, 28, 54, 0.7)',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                color: '#fff',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                transition: 'all 0.2s'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '44px',
                left: 0,
                right: 0,
                backgroundColor: '#0c1324',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 245, 255, 0.2)',
                maxHeight: '400px',
                overflowY: 'auto',
                zIndex: 1000,
                padding: '8px'
              }}
            >
              {!hasResults && (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                  No matches found for "{searchQuery}"
                </div>
              )}

              {filteredResults.length > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--neon-magenta)', fontWeight: 700, padding: '4px 8px', fontFamily: 'var(--font-mono)' }}>
                    ALGORITHMIC SOLUTIONS ({filteredResults.length})
                  </div>
                  {filteredResults.map(res => (
                    <div
                      key={res.id}
                      onClick={() => {
                        onSelectResult(res.id);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'transparent',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 0, 127, 0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{res.name}</span>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{res.tagline}</div>
                      </div>
                      <ArrowRight size={14} color="var(--neon-magenta)" />
                    </div>
                  ))}
                </div>
              )}

              {filteredDS.length > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--neon-cyan)', fontWeight: 700, padding: '4px 8px', fontFamily: 'var(--font-mono)' }}>
                    DATA STRUCTURES ({filteredDS.length})
                  </div>
                  {filteredDS.map(ds => (
                    <div
                      key={ds.id}
                      onClick={() => {
                        onSelectVisualizerItem(ds.type);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 245, 255, 0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span style={{ fontSize: '0.85rem', color: '#fff' }}>{ds.name}</span>
                      <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>Visualizer</span>
                    </div>
                  ))}
                </div>
              )}

              {filteredAlgos.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--neon-green)', fontWeight: 700, padding: '4px 8px', fontFamily: 'var(--font-mono)' }}>
                    ALGORITHMS ({filteredAlgos.length})
                  </div>
                  {filteredAlgos.map(algo => (
                    <div
                      key={algo.id}
                      onClick={() => {
                        onSelectVisualizerItem(algo.type);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(57, 255, 20, 0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span style={{ fontSize: '0.85rem', color: '#fff' }}>{algo.name}</span>
                      <span className="cyber-badge badge-green" style={{ fontSize: '0.65rem' }}>Visualizer</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Views in Learning Order */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* 1. Flowchart */}
          <button
            onClick={() => onViewChange('canvas')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeView === 'canvas' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: activeView === 'canvas' ? 'var(--neon-cyan)' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeView === 'canvas' ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <GitBranch size={16} />
            <span>Interactive Flowchart</span>
          </button>

          {/* 2. Wiki & Curriculum */}
          <button
            onClick={() => onViewChange('wiki')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeView === 'wiki' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: activeView === 'wiki' ? 'var(--neon-cyan)' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeView === 'wiki' ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <BookOpen size={16} />
            <span>Learning Wiki & Big-O</span>
          </button>

          {/* 3. Simulators */}
          <button
            onClick={() => onViewChange('visualizers')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeView === 'visualizers' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: activeView === 'visualizers' ? 'var(--neon-cyan)' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeView === 'visualizers' ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <PlayCircle size={16} />
            <span>16 Live Simulators</span>
          </button>

          {/* 4. Wizard */}
          <button
            onClick={() => onViewChange('wizard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeView === 'wizard' ? 'rgba(255, 0, 127, 0.2)' : 'transparent',
              color: activeView === 'wizard' ? 'var(--neon-magenta)' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeView === 'wizard' ? '0 0 10px rgba(255, 0, 127, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={16} />
            <span>Diagnostic Wizard</span>
          </button>

          {/* 5. Tree Directory */}
          <button
            onClick={() => onViewChange('tree')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeView === 'tree' ? 'rgba(57, 255, 20, 0.2)' : 'transparent',
              color: activeView === 'tree' ? 'var(--neon-green)' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeView === 'tree' ? '0 0 10px rgba(57, 255, 20, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <FolderTree size={16} />
            <span>Tree Directory</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
