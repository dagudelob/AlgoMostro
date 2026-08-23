import React from 'react';
import { MiniVisualizer } from '../visualizers/MiniVisualizer';
import { ComplexityBadge } from './ComplexityBadge';
import { ExternalLink, Sparkles } from 'lucide-react';
import type { AlgorithmResult, VisualizerType } from '../../types/flowchart';
import type { DSItem, AlgoItem } from '../../types/visualizer';

interface HoverPreviewCardProps {
  item?: DSItem | AlgoItem | AlgorithmResult;
  onOpenModal?: () => void;
  position?: { x: number; y: number };
}

export const HoverPreviewCard: React.FC<HoverPreviewCardProps> = ({ item, onOpenModal }) => {
  if (!item) return null;

  const isAlgoResult = 'tagline' in item;
  const isDS = 'timeComplexity' in item && typeof item.timeComplexity === 'object' && 'access' in item.timeComplexity;
  const isAlgo = 'keySignals' in item;

  let title = item.name;
  let description = item.description;
  let visualizerType: VisualizerType = 'array';
  let timeStr = 'O(N)';
  let spaceStr = 'O(1)';

  if (isAlgoResult) {
    const res = item as AlgorithmResult;
    visualizerType = res.visualizerType || 'array';
    timeStr = res.timeComplexity;
    spaceStr = res.spaceComplexity;
  } else if (isDS) {
    const ds = item as DSItem;
    visualizerType = ds.type;
    timeStr = `Acceso: ${ds.timeComplexity.access}`;
    spaceStr = ds.spaceComplexity;
  } else if (isAlgo) {
    const al = item as AlgoItem;
    visualizerType = al.type;
    timeStr = `Avg: ${al.timeComplexity.average}`;
    spaceStr = al.spaceComplexity;
  }

  return (
    <div
      className="cyber-card"
      style={{
        width: '280px',
        padding: '14px',
        backgroundColor: 'rgba(8, 14, 28, 0.95)',
        border: '1px solid var(--neon-cyan)',
        boxShadow: '0 0 25px rgba(0, 245, 255, 0.25), 0 10px 20px rgba(0,0,0,0.8)',
        zIndex: 9999,
        pointerEvents: 'auto',
        animation: 'fadeIn 0.15s ease-out'
      }}
    >
      {/* Title & Glow icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#00f5ff" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{title}</span>
        </div>
        <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>PREVIEW</span>
      </div>

      {/* Mini Animation Frame */}
      <div
        style={{
          background: '#040711',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: '6px',
          padding: '8px',
          marginBottom: '10px'
        }}
      >
        <MiniVisualizer type={visualizerType} />
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '10px' }}>
        {description.length > 110 ? `${description.slice(0, 110)}...` : description}
      </p>

      {/* Complexities */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <ComplexityBadge type="time" value={timeStr} size="sm" />
        <ComplexityBadge type="space" value={spaceStr} size="sm" />
      </div>

      {/* Action button */}
      {onOpenModal && (
        <button
          onClick={onOpenModal}
          className="cyber-btn"
          style={{ width: '100%', padding: '6px', fontSize: '0.75rem', gap: '6px' }}
        >
          <ExternalLink size={12} /> Abrir Simulador Completo
        </button>
      )}
    </div>
  );
};
