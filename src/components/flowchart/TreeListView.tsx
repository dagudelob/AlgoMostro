import React, { useState } from 'react';
import { FLOWCHART_NODES, FLOWCHART_ROOT_ID } from '../../data/flowchartData';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';
import { ChevronRight, ChevronDown, Sparkles, BookOpen } from 'lucide-react';
import type { AlgorithmResult } from '../../types/flowchart';

interface TreeListViewProps {
  onOpenResultModal: (result: AlgorithmResult) => void;
}

export const TreeListView: React.FC<TreeListViewProps> = ({ onOpenResultModal }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([FLOWCHART_ROOT_ID, 'node-graph-1']));

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  const renderBranch = (nodeId: string, depth = 0): React.ReactNode => {
    const node = FLOWCHART_NODES[nodeId];
    if (!node) return null;

    const isExpanded = expandedNodes.has(nodeId);

    return (
      <div key={nodeId} style={{ marginLeft: `${depth * 20}px`, marginTop: '8px' }}>
        {/* Node Bar */}
        <div
          onClick={() => toggleNode(nodeId)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(16, 28, 54, 0.75)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--neon-cyan)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 245, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.2)';
            e.currentTarget.style.backgroundColor = 'rgba(16, 28, 54, 0.75)';
          }}
        >
          {isExpanded ? (
            <ChevronDown size={16} color="var(--neon-cyan)" />
          ) : (
            <ChevronRight size={16} color="var(--neon-cyan)" />
          )}

          <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>
            {node.category.toUpperCase()}
          </span>

          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
            {node.question}
          </span>
        </div>

        {/* Children if expanded */}
        {isExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px', borderLeft: '2px solid rgba(0, 245, 255, 0.15)', paddingLeft: '14px' }}>
            {node.options.map((opt) => {
              const result = opt.algorithmResultId ? ALGORITHM_RESULTS[opt.algorithmResultId] : null;

              if (result) {
                return (
                  <div
                    key={opt.id}
                    onClick={() => onOpenResultModal(result)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(57, 255, 20, 0.08)',
                      border: '1px solid rgba(57, 255, 20, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(57, 255, 20, 0.15)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(57, 255, 20, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(57, 255, 20, 0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={14} color="#39ff14" />
                      <span style={{ fontSize: '0.85rem', color: '#39ff14', fontWeight: 600 }}>
                        {opt.label} → {result.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                        {result.timeComplexity}
                      </span>
                      <BookOpen size={13} color="var(--neon-green)" />
                    </div>
                  </div>
                );
              }

              if (opt.nextNodeId) {
                return renderBranch(opt.nextNodeId, depth + 1);
              }

              return null;
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="cyber-card"
      style={{
        padding: '24px',
        maxWidth: '900px',
        margin: '0 auto'
      }}
    >
      <div style={{ marginBottom: '16px', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '12px' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
          Vista de Árbol Jerárquico Desplegable
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Explora todas las ramas del árbol de decisión de AlgoMonster de manera compacta
        </span>
      </div>

      {renderBranch(FLOWCHART_ROOT_ID)}
    </div>
  );
};
