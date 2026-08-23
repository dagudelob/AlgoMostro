import React from 'react';
import { HelpCircle, ChevronRight, Sparkles } from 'lucide-react';
import type { FlowchartNode, FlowchartOption, AlgorithmResult } from '../../types/flowchart';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';

interface FlowNodeProps {
  node: FlowchartNode;
  selectedOptionId?: string;
  onSelectOption: (nodeId: string, option: FlowchartOption) => void;
  onHoverResult?: (result: AlgorithmResult | null, e?: React.MouseEvent) => void;
  onOpenResultModal: (result: AlgorithmResult) => void;
  isLeaf?: boolean;
}

export const FlowNode: React.FC<FlowNodeProps> = ({
  node,
  selectedOptionId,
  onSelectOption,
  onHoverResult,
  onOpenResultModal
}) => {
  return (
    <div
      className="cyber-card"
      style={{
        width: '320px',
        padding: '16px',
        backgroundColor: 'rgba(11, 18, 36, 0.9)',
        border: '1px solid rgba(0, 245, 255, 0.3)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative'
      }}
    >
      {/* Node Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>
          {node.category.toUpperCase()}
        </span>
        <HelpCircle size={14} color="var(--neon-cyan)" />
      </div>

      {/* Question */}
      <div>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', lineHeight: '1.4', marginBottom: '4px' }}>
          {node.question}
        </h3>
        {node.subtitle && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
            {node.subtitle}
          </p>
        )}
      </div>

      {/* Interactive Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {node.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const result = opt.algorithmResultId ? ALGORITHM_RESULTS[opt.algorithmResultId] : null;

          return (
            <div
              key={opt.id}
              onClick={() => {
                onSelectOption(node.id, opt);
                if (result) onOpenResultModal(result);
              }}
              onMouseEnter={(e) => {
                if (result && onHoverResult) onHoverResult(result, e);
              }}
              onMouseLeave={() => {
                if (result && onHoverResult) onHoverResult(null);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isSelected
                  ? 'rgba(0, 245, 255, 0.2)'
                  : result
                  ? 'rgba(57, 255, 20, 0.08)'
                  : 'rgba(16, 28, 54, 0.7)',
                border: `1px solid ${
                  isSelected
                    ? 'var(--neon-cyan)'
                    : result
                    ? 'rgba(57, 255, 20, 0.4)'
                    : 'rgba(0, 245, 255, 0.15)'
                }`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isSelected ? '0 0 10px rgba(0, 245, 255, 0.3)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {result ? (
                  <Sparkles size={14} color="#39ff14" />
                ) : (
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'var(--neon-cyan)' : 'var(--text-dim)'
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: isSelected || result ? 600 : 400,
                    color: result ? '#39ff14' : isSelected ? '#fff' : '#c9d8f0'
                  }}
                >
                  {opt.label}
                </span>
              </div>

              <ChevronRight
                size={14}
                color={result ? '#39ff14' : isSelected ? 'var(--neon-cyan)' : 'var(--text-dim)'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
