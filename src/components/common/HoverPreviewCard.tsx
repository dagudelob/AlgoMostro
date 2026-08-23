import React from 'react';
import type { DSItem, AlgoItem } from '../../types/visualizer';
import { MiniVisualizer } from '../visualizers/MiniVisualizer';
import { ComplexityBadge } from './ComplexityBadge';

interface HoverPreviewCardProps {
  item: DSItem | AlgoItem;
  position: { x: number; y: number };
}

export const HoverPreviewCard: React.FC<HoverPreviewCardProps> = ({ item, position }) => {
  const isDS = item.category === 'data_structure';
  const dsItem = isDS ? (item as DSItem) : null;
  const algoItem = !isDS ? (item as AlgoItem) : null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${Math.min(position.x + 15, window.innerWidth - 320)}px`,
        top: `${Math.min(position.y + 15, window.innerHeight - 380)}px`,
        width: '300px',
        backgroundColor: '#090f20',
        border: '1px solid var(--neon-cyan)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 8px 32px rgba(0, 245, 255, 0.25), 0 0 10px rgba(0, 0, 0, 0.9)',
        padding: '14px',
        zIndex: 9999,
        pointerEvents: 'none',
        animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(16px)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
          {item.name}
        </h4>
        <span className={`cyber-badge ${isDS ? 'badge-magenta' : 'badge-green'}`}>
          {isDS ? 'Data Structure' : 'Algorithm'}
        </span>
      </div>

      {/* Mini Animation Loop */}
      <div
        style={{
          height: '110px',
          backgroundColor: '#050811',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          marginBottom: '10px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <MiniVisualizer type={item.type} />
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
        {item.description}
      </p>

      {/* Complexities */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {dsItem && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-dim)' }}>Access / Search:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <ComplexityBadge complexity={dsItem.timeComplexity.access} label="Access" />
                <ComplexityBadge complexity={dsItem.timeComplexity.search} label="Search" />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-dim)' }}>Insert / Delete:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <ComplexityBadge complexity={dsItem.timeComplexity.insertion} label="Insert" />
                <ComplexityBadge complexity={dsItem.timeComplexity.deletion} label="Delete" />
              </div>
            </div>
          </>
        )}

        {algoItem && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-dim)' }}>Average Runtime:</span>
              <ComplexityBadge complexity={algoItem.timeComplexity.average} label="Time" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-dim)' }}>Memory Space:</span>
              <ComplexityBadge complexity={algoItem.spaceComplexity} label="Space" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
