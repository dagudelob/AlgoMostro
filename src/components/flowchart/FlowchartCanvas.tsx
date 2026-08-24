import React, { useState, useEffect } from 'react';
import { 
  FLOWCHART_NODES, 
  FLOWCHART_ROOT_ID,
  FLOWCHART_ALGO_SHOWDOWN_NODES,
  FLOWCHART_ALGO_SHOWDOWN_ROOT_ID
} from '../../data/flowchartData';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';
import { 
  Sparkles, 
  ArrowDown, 
  RotateCcw, 
  HelpCircle, 
  ChevronDown,
  Filter,
  Scale,
  GitFork
} from 'lucide-react';

interface FlowchartCanvasProps {
  onSelectResult: (resultId: string) => void;
  onHoverItem?: (term: string, event: React.MouseEvent) => void;
  onLeaveItem?: () => void;
}

type FlowchartMode = 'structure' | 'showdown';

export const FlowchartCanvas: React.FC<FlowchartCanvasProps> = ({
  onSelectResult,
  onHoverItem,
  onLeaveItem
}) => {
  const [treeMode, setTreeMode] = useState<FlowchartMode>('structure');
  const [activePath, setActivePath] = useState<string[]>([FLOWCHART_ROOT_ID]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentNodesMap = treeMode === 'structure' ? FLOWCHART_NODES : FLOWCHART_ALGO_SHOWDOWN_NODES;

  const categories = [
    { id: 'all', label: 'All Patterns' },
    { id: 'graph', label: 'Graphs/Trees' },
    { id: 'binary_search', label: 'Binary Search' },
    { id: 'array_string', label: 'Subarrays' },
    { id: 'dp', label: 'DP' },
    { id: 'heap', label: 'Heaps' },
    { id: 'greedy', label: 'Greedy' }
  ];

  const handleSwitchMode = (mode: FlowchartMode) => {
    setTreeMode(mode);
    setActivePath([mode === 'structure' ? FLOWCHART_ROOT_ID : FLOWCHART_ALGO_SHOWDOWN_ROOT_ID]);
    setSelectedCategory('all');
  };

  const handleSelectBranch = (stepIndex: number, nextNodeId?: string, algorithmResultId?: string) => {
    if (algorithmResultId) {
      onSelectResult(algorithmResultId);
      return;
    }

    if (nextNodeId && currentNodesMap[nextNodeId]) {
      const newPath = activePath.slice(0, stepIndex + 1);
      newPath.push(nextNodeId);
      setActivePath(newPath);
    }
  };

  const handleReset = () => {
    setActivePath([treeMode === 'structure' ? FLOWCHART_ROOT_ID : FLOWCHART_ALGO_SHOWDOWN_ROOT_ID]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px', padding: isMobile ? '8px 10px' : '10px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Top Mode Toggle: Structure vs Algorithm Showdown */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '6px' : '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleSwitchMode('structure')}
          className={`cyber-tab ${treeMode === 'structure' ? 'active' : ''}`}
          style={{
            padding: isMobile ? '8px 14px' : '10px 22px',
            borderRadius: '8px',
            fontSize: isMobile ? '0.78rem' : '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            cursor: 'pointer',
            flex: isMobile ? 1 : 'none',
            justifyContent: 'center',
            backgroundColor: treeMode === 'structure' ? 'rgba(0, 245, 255, 0.2)' : 'rgba(13, 21, 39, 0.6)',
            color: treeMode === 'structure' ? 'var(--neon-cyan)' : 'var(--text-muted)',
            boxShadow: treeMode === 'structure' ? '0 0 15px rgba(0, 245, 255, 0.3)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <GitFork size={15} /> 1. Problem Structure
        </button>

        <button
          onClick={() => handleSwitchMode('showdown')}
          className={`cyber-tab ${treeMode === 'showdown' ? 'active' : ''}`}
          style={{
            padding: isMobile ? '8px 14px' : '10px 22px',
            borderRadius: '8px',
            fontSize: isMobile ? '0.78rem' : '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            cursor: 'pointer',
            flex: isMobile ? 1 : 'none',
            justifyContent: 'center',
            backgroundColor: treeMode === 'showdown' ? 'rgba(255, 0, 127, 0.2)' : 'rgba(13, 21, 39, 0.6)',
            color: treeMode === 'showdown' ? 'var(--neon-magenta)' : 'var(--text-muted)',
            boxShadow: treeMode === 'showdown' ? '0 0 15px rgba(255, 0, 127, 0.3)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <Scale size={15} /> 2. Algorithm Showdown
        </button>
      </div>

      {/* Controls Bar: Filter & Reset */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          backgroundColor: '#090e1c',
          padding: isMobile ? '10px 12px' : '12px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(0, 245, 255, 0.2)'
        }}
      >
        {/* Category Filters (only on structure mode) */}
        {treeMode === 'structure' ? (
          <div className="horizontal-touch-scroll" style={{ display: 'flex', alignItems: 'center', gap: '6px', width: isMobile ? '100%' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--neon-cyan)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
              <Filter size={12} />
              <span>FILTER:</span>
            </div>

            <div style={{ display: 'flex', gap: '4px', flexWrap: isMobile ? 'nowrap' : 'wrap' }}>
              {categories.map((c) => {
                const isActive = selectedCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: isActive ? 'rgba(0, 245, 255, 0.25)' : 'rgba(13, 21, 39, 0.7)',
                      border: `1px solid ${isActive ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      fontSize: '0.72rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s'
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-magenta)', fontSize: '0.76rem', fontFamily: 'var(--font-mono)' }}>
            <Scale size={14} />
            <span>ALGORITHM VS ALGORITHM TRADEOFF ENGINE</span>
          </div>
        )}

        {/* Reset & Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: isMobile ? 'space-between' : 'flex-end', width: isMobile ? '100%' : 'auto' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            Depth: {activePath.length}
          </span>
          <button
            onClick={handleReset}
            className="cyber-btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Vertical (Top-to-Bottom) Decision Flow Stream */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
          position: 'relative',
          paddingBottom: '30px',
          width: '100%'
        }}
      >
        {activePath.map((nodeId, stepIdx) => {
          const node = currentNodesMap[nodeId];
          if (!node) return null;

          const isLastStep = stepIdx === activePath.length - 1;
          const nextSelectedNodeId = activePath[stepIdx + 1];

          // Filter options if category filter is active on root
          const visibleOptions = (stepIdx === 0 && selectedCategory !== 'all' && treeMode === 'structure')
            ? node.options.filter(o => {
                if (selectedCategory === 'graph') return o.id.includes('graph');
                if (selectedCategory === 'binary_search') return o.id.includes('sorted');
                if (selectedCategory === 'array_string') return o.id.includes('subarray') || o.id.includes('string') || o.id.includes('partition');
                if (selectedCategory === 'dp') return o.id.includes('ways');
                if (selectedCategory === 'heap') return o.id.includes('kth');
                if (selectedCategory === 'greedy') return o.id.includes('intervals');
                return true;
              })
            : node.options;

          return (
            <React.Fragment key={`${nodeId}-${stepIdx}`}>
              {/* Question Node Card */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '920px',
                  backgroundColor: '#090f20',
                  border: `2px solid ${
                    isLastStep
                      ? treeMode === 'showdown' ? 'var(--neon-magenta)' : 'var(--neon-cyan)'
                      : 'rgba(0, 245, 255, 0.3)'
                  }`,
                  borderRadius: 'var(--radius-lg)',
                  padding: isMobile ? '16px 14px' : '22px 26px',
                  boxShadow: isLastStep
                    ? treeMode === 'showdown'
                      ? '0 0 25px rgba(255, 0, 127, 0.2), 0 10px 30px rgba(0, 0, 0, 0.6)'
                      : '0 0 25px rgba(0, 245, 255, 0.2), 0 10px 30px rgba(0, 0, 0, 0.6)'
                    : '0 4px 15px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '12px' : '16px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 2
                }}
              >
                {/* Step Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      className={`cyber-badge ${treeMode === 'showdown' ? 'badge-magenta' : 'badge-cyan'}`}
                      style={{ fontSize: '0.68rem', fontWeight: 700 }}
                    >
                      STEP {stepIdx + 1}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      {node.category.toUpperCase()}
                    </span>
                  </div>

                  {stepIdx > 0 && (
                    <span style={{ fontSize: '0.68rem', color: 'var(--neon-green)', fontFamily: 'var(--font-mono)' }}>
                      &bull; ACTIVE
                    </span>
                  )}
                </div>

                {/* Question and Subtitle */}
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: isMobile ? '1.05rem' : '1.2rem', color: '#fff', lineHeight: 1.35 }}>
                    {node.question}
                  </h3>
                  {node.subtitle && (
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: isMobile ? '0.76rem' : '0.85rem' }}>
                      {node.subtitle}
                    </p>
                  )}
                </div>

                {/* Option Branches Grid (1-column on mobile) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : (visibleOptions.length > 2 ? 'repeat(auto-fit, minmax(260px, 1fr))' : 'repeat(auto-fit, minmax(220px, 1fr))'),
                    gap: '8px'
                  }}
                >
                  {visibleOptions.map((opt) => {
                    const isTerminal = !!opt.algorithmResultId;
                    const isBranchActive = opt.nextNodeId === nextSelectedNodeId;
                    const result = opt.algorithmResultId ? ALGORITHM_RESULTS[opt.algorithmResultId] : null;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectBranch(stepIdx, opt.nextNodeId, opt.algorithmResultId)}
                        onMouseEnter={(e) => {
                          if (result && onHoverItem) {
                            onHoverItem(result.visualizerType || result.name, e);
                          }
                        }}
                        onMouseLeave={() => {
                          if (onLeaveItem) onLeaveItem();
                        }}
                        style={{
                          padding: isMobile ? '10px 12px' : '12px 14px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isBranchActive
                            ? treeMode === 'showdown' ? 'rgba(255, 0, 127, 0.25)' : 'rgba(0, 245, 255, 0.25)'
                            : isTerminal
                            ? 'rgba(255, 0, 127, 0.1)'
                            : 'rgba(16, 28, 54, 0.7)',
                          border: `1.5px solid ${
                            isBranchActive
                              ? treeMode === 'showdown' ? 'var(--neon-magenta)' : 'var(--neon-cyan)'
                              : isTerminal
                              ? 'rgba(255, 0, 127, 0.4)'
                              : 'rgba(0, 245, 255, 0.2)'
                          }`,
                          color: '#fff',
                          textAlign: 'left',
                          fontSize: isMobile ? '0.8rem' : '0.86rem',
                          fontWeight: isBranchActive ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: isBranchActive ? '0 0 12px rgba(0, 245, 255, 0.3)' : 'none',
                          transform: isBranchActive ? 'scale(1.01)' : 'scale(1)',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {isTerminal ? (
                            <Sparkles size={14} color="var(--neon-magenta)" style={{ flexShrink: 0 }} />
                          ) : (
                            <HelpCircle size={14} color="var(--neon-cyan)" style={{ flexShrink: 0 }} />
                          )}
                          <span style={{ lineHeight: 1.3 }}>{opt.label}</span>
                        </div>

                        {isTerminal && result && (
                          <span className="cyber-badge badge-magenta" style={{ fontSize: '0.62rem', marginLeft: '6px', flexShrink: 0 }}>
                            {result.name}
                          </span>
                        )}
                        {isBranchActive && (
                          <ChevronDown size={14} color="var(--neon-cyan)" style={{ flexShrink: 0 }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Downward Vertical Connector Stream */}
              {stepIdx < activePath.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '42px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '24px',
                      backgroundColor: treeMode === 'showdown' ? 'var(--neon-magenta)' : 'var(--neon-cyan)',
                      boxShadow: treeMode === 'showdown' ? '0 0 10px var(--neon-magenta)' : '0 0 10px var(--neon-cyan)'
                    }}
                  />
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: '#090f20',
                      border: `2px solid ${treeMode === 'showdown' ? 'var(--neon-magenta)' : 'var(--neon-cyan)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: treeMode === 'showdown' ? '0 0 12px var(--neon-magenta)' : '0 0 12px var(--neon-cyan)',
                      marginTop: '-5px'
                    }}
                  >
                    <ArrowDown size={13} color={treeMode === 'showdown' ? 'var(--neon-magenta)' : 'var(--neon-cyan)'} />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
