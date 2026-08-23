import React, { useState } from 'react';
import { FLOWCHART_NODES, FLOWCHART_ROOT_ID } from '../../data/flowchartData';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';
import { 
  Sparkles, 
  ArrowDown, 
  RotateCcw, 
  HelpCircle, 
  ChevronDown,
  Filter
} from 'lucide-react';

interface FlowchartCanvasProps {
  onSelectResult: (resultId: string) => void;
  onHoverItem?: (term: string, event: React.MouseEvent) => void;
  onLeaveItem?: () => void;
}

export const FlowchartCanvas: React.FC<FlowchartCanvasProps> = ({
  onSelectResult,
  onHoverItem,
  onLeaveItem
}) => {
  // Path of active decision node IDs
  const [activePath, setActivePath] = useState<string[]>([FLOWCHART_ROOT_ID]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Patterns' },
    { id: 'graph', label: 'Graphs & Trees' },
    { id: 'binary_search', label: 'Binary Search' },
    { id: 'array_string', label: 'Subarrays & Strings' },
    { id: 'dp', label: 'Dynamic Programming' },
    { id: 'heap', label: 'Heaps & Top-K' },
    { id: 'greedy', label: 'Greedy & Intervals' }
  ];

  const handleSelectBranch = (stepIndex: number, nextNodeId?: string, algorithmResultId?: string) => {
    if (algorithmResultId) {
      onSelectResult(algorithmResultId);
      return;
    }

    if (nextNodeId && FLOWCHART_NODES[nextNodeId]) {
      // Truncate path up to current step, then append nextNodeId
      const newPath = activePath.slice(0, stepIndex + 1);
      newPath.push(nextNodeId);
      setActivePath(newPath);
    }
  };

  const handleReset = () => {
    setActivePath([FLOWCHART_ROOT_ID]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '10px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Top Controls: Filter & Reset */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: '#090e1c',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(0, 245, 255, 0.2)'
        }}
      >
        {/* Category Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--neon-cyan)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
            <Filter size={14} />
            <span>FILTER:</span>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((c) => {
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'rgba(0, 245, 255, 0.25)' : 'rgba(13, 21, 39, 0.7)',
                    border: `1px solid ${isActive ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset & Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            Active Depth: {activePath.length} Steps
          </span>
          <button
            onClick={handleReset}
            className="cyber-btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <RotateCcw size={13} /> Reset Tree
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
          paddingBottom: '40px'
        }}
      >
        {activePath.map((nodeId, stepIdx) => {
          const node = FLOWCHART_NODES[nodeId];
          if (!node) return null;

          const isLastStep = stepIdx === activePath.length - 1;
          const nextSelectedNodeId = activePath[stepIdx + 1];

          // Filter options if category filter is active on root
          const visibleOptions = (stepIdx === 0 && selectedCategory !== 'all')
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
                  border: `2px solid ${isLastStep ? 'var(--neon-cyan)' : 'rgba(0, 245, 255, 0.3)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '22px 26px',
                  boxShadow: isLastStep
                    ? '0 0 25px rgba(0, 245, 255, 0.2), 0 10px 30px rgba(0, 0, 0, 0.6)'
                    : '0 4px 15px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 2
                }}
              >
                {/* Step Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="cyber-badge badge-cyan" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                      STEP {stepIdx + 1}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      {node.category.toUpperCase()}
                    </span>
                  </div>

                  {stepIdx > 0 && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--neon-green)', fontFamily: 'var(--font-mono)' }}>
                      &bull; BRANCH ACTIVE
                    </span>
                  )}
                </div>

                {/* Question and Subtitle */}
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#fff', lineHeight: 1.4 }}>
                    {node.question}
                  </h3>
                  {node.subtitle && (
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {node.subtitle}
                    </p>
                  )}
                </div>

                {/* Option Branches Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: visibleOptions.length > 2 ? 'repeat(auto-fit, minmax(260px, 1fr))' : 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '10px'
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
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isBranchActive
                            ? 'rgba(0, 245, 255, 0.25)'
                            : isTerminal
                            ? 'rgba(255, 0, 127, 0.1)'
                            : 'rgba(16, 28, 54, 0.7)',
                          border: `1.5px solid ${
                            isBranchActive
                              ? 'var(--neon-cyan)'
                              : isTerminal
                              ? 'rgba(255, 0, 127, 0.4)'
                              : 'rgba(0, 245, 255, 0.2)'
                          }`,
                          color: '#fff',
                          textAlign: 'left',
                          fontSize: '0.86rem',
                          fontWeight: isBranchActive ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: isBranchActive ? '0 0 12px rgba(0, 245, 255, 0.3)' : 'none',
                          transform: isBranchActive ? 'scale(1.02)' : 'scale(1)',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {isTerminal ? (
                            <Sparkles size={15} color="var(--neon-magenta)" />
                          ) : (
                            <HelpCircle size={15} color="var(--neon-cyan)" />
                          )}
                          <span style={{ lineHeight: 1.3 }}>{opt.label}</span>
                        </div>

                        {isTerminal && result && (
                          <span className="cyber-badge badge-magenta" style={{ fontSize: '0.65rem', marginLeft: '6px' }}>
                            {result.name}
                          </span>
                        )}
                        {isBranchActive && (
                          <ChevronDown size={16} color="var(--neon-cyan)" />
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
                    height: '48px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '28px',
                      backgroundColor: 'var(--neon-cyan)',
                      boxShadow: '0 0 10px var(--neon-cyan)'
                    }}
                  />
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#090f20',
                      border: '2px solid var(--neon-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 12px var(--neon-cyan)',
                      marginTop: '-6px'
                    }}
                  >
                    <ArrowDown size={14} color="var(--neon-cyan)" />
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
