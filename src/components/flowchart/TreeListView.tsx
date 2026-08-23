import React, { useState } from 'react';
import { FLOWCHART_NODES, FLOWCHART_ROOT_ID } from '../../data/flowchartData';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';
import { ChevronRight, ChevronDown, Sparkles, HelpCircle, FolderTree } from 'lucide-react';

interface TreeListViewProps {
  onSelectResult: (resultId: string) => void;
  onHoverItem?: (term: string, event: React.MouseEvent) => void;
  onLeaveItem?: () => void;
}

export const TreeListView: React.FC<TreeListViewProps> = ({
  onSelectResult,
  onHoverItem,
  onLeaveItem
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    [FLOWCHART_ROOT_ID]: true,
    'node-graph-1': true,
    'node-sorted-1': true
  });

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const renderNode = (nodeId: string, level = 0) => {
    const node = FLOWCHART_NODES[nodeId];
    if (!node) return null;

    const isExpanded = expandedNodes[nodeId];

    return (
      <div key={nodeId} style={{ marginLeft: `${level * 20}px`, marginTop: '8px' }}>
        {/* Node Question Bar */}
        <div
          onClick={() => toggleNode(nodeId)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: level === 0 ? 'rgba(0, 245, 255, 0.12)' : 'rgba(13, 21, 39, 0.7)',
            border: `1px solid ${level === 0 ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            boxShadow: level === 0 ? '0 0 10px rgba(0, 245, 255, 0.2)' : 'none'
          }}
        >
          {isExpanded ? <ChevronDown size={16} color="var(--neon-cyan)" /> : <ChevronRight size={16} color="var(--text-dim)" />}
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{node.question}</span>
          <span className="cyber-badge badge-cyan" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>{node.category}</span>
        </div>

        {/* Options / Children */}
        {isExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px', marginLeft: '16px', borderLeft: '2px solid rgba(0, 245, 255, 0.2)', paddingLeft: '12px' }}>
            {node.options.map(opt => {
              const isTerminal = !!opt.algorithmResultId;
              const result = opt.algorithmResultId ? ALGORITHM_RESULTS[opt.algorithmResultId] : null;

              if (isTerminal && result) {
                return (
                  <div
                    key={opt.id}
                    onClick={() => onSelectResult(result.id)}
                    onMouseEnter={(e) => {
                      if (onHoverItem) onHoverItem(result.visualizerType || result.name, e);
                    }}
                    onMouseLeave={() => {
                      if (onLeaveItem) onLeaveItem();
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255, 0, 127, 0.08)',
                      border: '1px solid rgba(255, 0, 127, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={14} color="var(--neon-magenta)" />
                      <span style={{ fontSize: '0.85rem', color: '#ffb7d2', fontWeight: 600 }}>{opt.label}</span>
                    </div>
                    <span className="cyber-badge badge-magenta" style={{ fontSize: '0.68rem' }}>{result.name}</span>
                  </div>
                );
              }

              if (opt.nextNodeId) {
                return (
                  <div key={opt.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 0', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      <HelpCircle size={13} color="var(--neon-cyan)" />
                      <span>{opt.label}</span>
                    </div>
                    {renderNode(opt.nextNodeId, level + 1)}
                  </div>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '840px', margin: '30px auto', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <FolderTree size={24} color="var(--neon-green)" />
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Taxonomy & Decision Tree</h2>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Complete hierarchical breakdown of all algorithmic pattern branches
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#070c18', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
        {renderNode(FLOWCHART_ROOT_ID, 0)}
      </div>
    </div>
  );
};
