import React from 'react';
import type { FlowchartNode } from '../../types/flowchart';
import { ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';

interface FlowNodeProps {
  node: FlowchartNode;
  stepNumber: number;
  selectedOptionId?: string;
  onSelectOption: (nodeId: string, optionId: string, nextNodeId?: string, algorithmResultId?: string) => void;
  onHoverItem?: (term: string, event: React.MouseEvent) => void;
  onLeaveItem?: () => void;
}

export const FlowNode: React.FC<FlowNodeProps> = ({
  node,
  stepNumber,
  selectedOptionId,
  onSelectOption,
  onHoverItem,
  onLeaveItem
}) => {
  return (
    <div
      className="cyber-node-card"
      style={{
        width: '360px',
        backgroundColor: '#090f20',
        border: '1px solid rgba(0, 245, 255, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 245, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        position: 'relative',
        animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Node Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 245, 255, 0.2)',
              border: '1px solid var(--neon-cyan)',
              color: 'var(--neon-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)'
            }}
          >
            {stepNumber}
          </span>
          <span className="cyber-badge badge-cyan" style={{ fontSize: '0.68rem' }}>
            {node.category.toUpperCase()}
          </span>
        </div>

        {node.tags && node.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px' }}>
            {node.tags.map(t => (
              <span key={t} style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Node Question */}
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
          {node.question}
        </h3>
        {node.subtitle && (
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {node.subtitle}
          </p>
        )}
      </div>

      {/* Options Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {node.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isTerminal = !!opt.algorithmResultId;
          const result = opt.algorithmResultId ? ALGORITHM_RESULTS[opt.algorithmResultId] : null;

          return (
            <button
              key={opt.id}
              onClick={() => onSelectOption(node.id, opt.id, opt.nextNodeId, opt.algorithmResultId)}
              onMouseEnter={(e) => {
                if (result && onHoverItem) {
                  onHoverItem(result.visualizerType || result.name, e);
                }
              }}
              onMouseLeave={() => {
                if (onLeaveItem) onLeaveItem();
              }}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected
                  ? 'rgba(0, 245, 255, 0.25)'
                  : isTerminal
                  ? 'rgba(255, 0, 127, 0.08)'
                  : 'rgba(16, 28, 54, 0.6)',
                border: `1px solid ${
                  isSelected
                    ? 'var(--neon-cyan)'
                    : isTerminal
                    ? 'rgba(255, 0, 127, 0.4)'
                    : 'rgba(255, 255, 255, 0.08)'
                }`,
                color: isSelected ? '#fff' : '#c9d8f0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                boxShadow: isSelected
                  ? '0 0 15px rgba(0, 245, 255, 0.4)'
                  : isTerminal
                  ? '0 0 8px rgba(255, 0, 127, 0.15)'
                  : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isTerminal ? <Sparkles size={15} color="var(--neon-magenta)" /> : <HelpCircle size={15} color="var(--neon-cyan)" />}
                <span>{opt.label}</span>
              </div>
              <ArrowRight size={14} color={isSelected ? 'var(--neon-cyan)' : 'var(--text-dim)'} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
