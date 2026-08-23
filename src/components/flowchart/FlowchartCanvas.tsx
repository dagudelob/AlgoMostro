import React, { useState } from 'react';
import { FLOWCHART_NODES, FLOWCHART_ROOT_ID } from '../../data/flowchartData';
import { FlowNode } from './FlowNode';
import { ZoomIn, ZoomOut, RotateCcw, Filter } from 'lucide-react';
import type { FlowchartOption, AlgorithmResult } from '../../types/flowchart';

interface FlowchartCanvasProps {
  onHoverResult: (result: AlgorithmResult | null, e?: React.MouseEvent) => void;
  onOpenResultModal: (result: AlgorithmResult) => void;
}

export const FlowchartCanvas: React.FC<FlowchartCanvasProps> = ({
  onHoverResult,
  onOpenResultModal
}) => {
  // Navigation path array of { nodeId, selectedOptionId }
  const [path, setPath] = useState<{ nodeId: string; optionId?: string }[]>([
    { nodeId: FLOWCHART_ROOT_ID }
  ]);
  const [zoom, setZoom] = useState<number>(1);

  const handleSelectOption = (nodeId: string, option: FlowchartOption) => {
    // Find index of this node in path
    const nodeIdx = path.findIndex((p) => p.nodeId === nodeId);
    if (nodeIdx === -1) return;

    // Truncate path after this node
    const newPath = path.slice(0, nodeIdx + 1);
    newPath[nodeIdx].optionId = option.id;

    if (option.nextNodeId && FLOWCHART_NODES[option.nextNodeId]) {
      newPath.push({ nodeId: option.nextNodeId });
    }

    setPath(newPath);
  };

  const handleResetCanvas = () => {
    setPath([{ nodeId: FLOWCHART_ROOT_ID }]);
    setZoom(1);
  };

  const handleJumpCategory = (rootOptionId: string) => {
    const rootNode = FLOWCHART_NODES[FLOWCHART_ROOT_ID];
    const opt = rootNode.options.find((o) => o.id === rootOptionId);
    if (opt && opt.nextNodeId) {
      setPath([
        { nodeId: FLOWCHART_ROOT_ID, optionId: rootOptionId },
        { nodeId: opt.nextNodeId }
      ]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
      {/* Top Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(13, 21, 39, 0.7)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(0, 245, 255, 0.15)'
        }}
      >
        {/* Quick Category Jump */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          <Filter size={15} color="var(--neon-cyan)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginRight: '4px' }}>
            Atajos:
          </span>
          <button
            onClick={() => handleJumpCategory('opt-graph')}
            className="cyber-btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            Grafos & Árboles
          </button>
          <button
            onClick={() => handleJumpCategory('opt-sorted')}
            className="cyber-btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            Input Ordenado / BS
          </button>
          <button
            onClick={() => handleJumpCategory('opt-subarray')}
            className="cyber-btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            Subarray / Window
          </button>
          <button
            onClick={() => handleJumpCategory('opt-ways-opt')}
            className="cyber-btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            DP & Greedy
          </button>
          <button
            onClick={() => handleJumpCategory('opt-string-dict')}
            className="cyber-btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            Tries / Cadenas
          </button>
        </div>

        {/* Zoom & Reset Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}
            className="cyber-btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', width: '45px', textAlign: 'center' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
            className="cyber-btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={handleResetCanvas}
            className="cyber-btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', gap: '4px' }}
          >
            <RotateCcw size={13} /> Reiniciar Árbol
          </button>
        </div>
      </div>

      {/* Interactive Branching Canvas */}
      <div
        style={{
          background: '#060a14',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-xl)',
          minHeight: '520px',
          padding: '30px',
          overflowX: 'auto',
          overflowY: 'auto',
          display: 'flex',
          alignItems: 'flex-start',
          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s ease',
            minWidth: 'min-content',
            padding: '20px 0'
          }}
        >
          {path.map((step, idx) => {
            const node = FLOWCHART_NODES[step.nodeId];
            if (!node) return null;

            return (
              <React.Fragment key={step.nodeId}>
                {/* Node Card */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--neon-cyan)',
                      marginBottom: '6px',
                      fontWeight: 600
                    }}
                  >
                    PASO {idx + 1}
                  </span>
                  <FlowNode
                    node={node}
                    selectedOptionId={step.optionId}
                    onSelectOption={handleSelectOption}
                    onHoverResult={onHoverResult}
                    onOpenResultModal={onOpenResultModal}
                  />
                </div>

                {/* Animated Connecting Arrow */}
                {idx < path.length - 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--neon-cyan)' }}>
                    <div
                      className="animate-pulse-glow"
                      style={{
                        width: '32px',
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
                        boxShadow: '0 0 8px var(--neon-cyan)'
                      }}
                    />
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', marginTop: '4px' }}>
                      ▶
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
