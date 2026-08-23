import React, { useState } from 'react';
import { FLOWCHART_NODES, FLOWCHART_ROOT_ID } from '../../data/flowchartData';
import { FlowNode } from './FlowNode';
import { RotateCcw, ZoomIn, ZoomOut, Maximize2, Compass } from 'lucide-react';

interface FlowchartCanvasProps {
  onSelectResult: (resultId: string) => void;
  onHoverItem?: (term: string, event: React.MouseEvent) => void;
  onLeaveItem?: () => void;
}

interface ActiveStep {
  nodeId: string;
  selectedOptionId?: string;
}

export const FlowchartCanvas: React.FC<FlowchartCanvasProps> = ({
  onSelectResult,
  onHoverItem,
  onLeaveItem
}) => {
  const [steps, setSteps] = useState<ActiveStep[]>([{ nodeId: FLOWCHART_ROOT_ID }]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleSelectOption = (
    nodeId: string, 
    optionId: string, 
    nextNodeId?: string, 
    algorithmResultId?: string
  ) => {
    const nodeIdx = steps.findIndex(s => s.nodeId === nodeId);
    if (nodeIdx === -1) return;

    const updatedSteps = steps.slice(0, nodeIdx + 1);
    updatedSteps[nodeIdx].selectedOptionId = optionId;

    if (algorithmResultId) {
      setSteps(updatedSteps);
      onSelectResult(algorithmResultId);
      return;
    }

    if (nextNodeId && FLOWCHART_NODES[nextNodeId]) {
      updatedSteps.push({ nodeId: nextNodeId });
      setSteps(updatedSteps);
    }
  };

  const handleReset = () => {
    setSteps([{ nodeId: FLOWCHART_ROOT_ID }]);
    setZoomLevel(1);
  };

  const handleJumpToCategory = (targetNodeId: string) => {
    if (FLOWCHART_NODES[targetNodeId]) {
      setSteps([
        { nodeId: FLOWCHART_ROOT_ID },
        { nodeId: targetNodeId }
      ]);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 75px)',
        overflow: 'hidden',
        backgroundColor: '#050812',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.04) 0%, transparent 60%),
          linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 30px 30px, 30px 30px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Floating Action Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        {/* Category shortcuts */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center', fontFamily: 'var(--font-mono)' }}>
            QUICK SHORTCUTS:
          </span>
          <button
            onClick={() => handleJumpToCategory('node-graph-1')}
            className="cyber-btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
          >
            Graphs & Trees
          </button>
          <button
            onClick={() => handleJumpToCategory('node-sorted-1')}
            className="cyber-btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
          >
            Sorted / Binary Search
          </button>
          <button
            onClick={() => handleJumpToCategory('node-subarray-1')}
            className="cyber-btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
          >
            Subarrays & Windows
          </button>
          <button
            onClick={() => handleJumpToCategory('node-dp-1')}
            className="cyber-btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
          >
            DP & Greedy
          </button>
          <button
            onClick={() => handleJumpToCategory('node-strings-1')}
            className="cyber-btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
          >
            Tries & Strings
          </button>
        </div>

        {/* Canvas Controls */}
        <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto', backgroundColor: 'rgba(13, 21, 39, 0.8)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 245, 255, 0.2)' }}>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.4))}
            className="cyber-btn-secondary"
            style={{ padding: '6px 8px' }}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.7))}
            className="cyber-btn-secondary"
            style={{ padding: '6px 8px' }}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="cyber-btn-secondary"
            style={{ padding: '6px 8px' }}
            title="Reset Zoom"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={handleReset}
            className="cyber-btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px' }}
          >
            <RotateCcw size={14} /> Reset Flow
          </button>
        </div>
      </div>

      {/* Main Flowchart Stream Container */}
      <div
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          display: 'flex',
          alignItems: 'center',
          padding: '100px 60px 40px 60px',
          gap: '40px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {steps.map((step, idx) => {
          const node = FLOWCHART_NODES[step.nodeId];
          if (!node) return null;

          return (
            <React.Fragment key={`${step.nodeId}-${idx}`}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--neon-cyan)',
                    marginBottom: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}
                >
                  STEP {idx + 1}
                </span>

                <FlowNode
                  node={node}
                  stepNumber={idx + 1}
                  selectedOptionId={step.selectedOptionId}
                  onSelectOption={handleSelectOption}
                  onHoverItem={onHoverItem}
                  onLeaveItem={onLeaveItem}
                />
              </div>

              {/* Connecting animated glowing connector */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '60px'
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
                      boxShadow: '0 0 10px rgba(0, 245, 255, 0.6)'
                    }}
                  />
                  <span style={{ fontSize: '0.65rem', color: 'var(--neon-magenta)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                    BRANCH
                  </span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Hint Footer */}
      <div
        style={{
          padding: '12px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: 'rgba(5, 8, 16, 0.7)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          zIndex: 5
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={14} color="var(--neon-cyan)" />
          <span>Click any option to expand the next decision branch. Terminal options open full LeetCode solutions & interactive simulators.</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-green)' }}>
          Active Level: {steps.length}
        </span>
      </div>
    </div>
  );
};
