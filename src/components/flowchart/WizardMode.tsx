import React, { useState } from 'react';
import { FLOWCHART_NODES, FLOWCHART_ROOT_ID } from '../../data/flowchartData';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';
import { Sparkles, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WizardModeProps {
  onSelectResult: (resultId: string) => void;
  onHoverItem?: (term: string, event: React.MouseEvent) => void;
  onLeaveItem?: () => void;
}

export const WizardMode: React.FC<WizardModeProps> = ({
  onSelectResult,
  onHoverItem,
  onLeaveItem
}) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>(FLOWCHART_ROOT_ID);
  const [history, setHistory] = useState<string[]>([]);
  const [completedResultId, setCompletedResultId] = useState<string | null>(null);

  const currentNode = FLOWCHART_NODES[currentNodeId];

  const handleSelectOption = (
    _optionId: string, 
    nextNodeId?: string, 
    algorithmResultId?: string
  ) => {
    if (algorithmResultId) {
      setCompletedResultId(algorithmResultId);
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not loaded
      }
      return;
    }

    if (nextNodeId && FLOWCHART_NODES[nextNodeId]) {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentNodeId(nextNodeId);
    }
  };

  const handleBack = () => {
    if (completedResultId) {
      setCompletedResultId(null);
      return;
    }
    if (history.length > 0) {
      const prevNodeId = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentNodeId(prevNodeId);
    }
  };

  const handleReset = () => {
    setCurrentNodeId(FLOWCHART_ROOT_ID);
    setHistory([]);
    setCompletedResultId(null);
  };

  const completedResult = completedResultId ? ALGORITHM_RESULTS[completedResultId] : null;

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '40px auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Wizard Header */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 0, 127, 0.15)',
            border: '1px solid var(--neon-magenta)',
            color: 'var(--neon-magenta)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '12px'
          }}
        >
          <Sparkles size={14} />
          <span>ALGORITHM DIAGNOSTIC WIZARD</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', margin: '0 0 8px 0', color: '#fff' }}>
          Find Your Algorithm
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Answer simple questions about your interview problem constraints to find the optimal pattern.
        </p>
      </div>

      {/* Main Wizard Card */}
      {!completedResult ? (
        <div
          style={{
            backgroundColor: '#090f20',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '30px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 245, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Question Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="cyber-badge badge-cyan">QUESTION {history.length + 1}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              Category: {currentNode?.category.toUpperCase()}
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 8px 0', color: '#fff', lineHeight: 1.4 }}>
              {currentNode?.question}
            </h3>
            {currentNode?.subtitle && (
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {currentNode.subtitle}
              </p>
            )}
          </div>

          {/* Option Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentNode?.options.map((opt) => {
              const isTerminal = !!opt.algorithmResultId;
              const result = opt.algorithmResultId ? ALGORITHM_RESULTS[opt.algorithmResultId] : null;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id, opt.nextNodeId, opt.algorithmResultId)}
                  onMouseEnter={(e) => {
                    if (result && onHoverItem) {
                      onHoverItem(result.visualizerType || result.name, e);
                    }
                  }}
                  onMouseLeave={() => {
                    if (onLeaveItem) onLeaveItem();
                  }}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isTerminal ? 'rgba(255, 0, 127, 0.08)' : 'rgba(16, 28, 54, 0.7)',
                    border: `1px solid ${isTerminal ? 'rgba(255, 0, 127, 0.4)' : 'rgba(0, 245, 255, 0.2)'}`,
                    color: '#fff',
                    textAlign: 'left',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{opt.label}</span>
                  <ArrowRight size={16} color={isTerminal ? 'var(--neon-magenta)' : 'var(--neon-cyan)'} />
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', marginTop: '10px' }}>
            <button
              onClick={handleBack}
              disabled={history.length === 0}
              className="cyber-btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', gap: '6px' }}
            >
              <ArrowLeft size={14} /> Back
            </button>

            <button
              onClick={handleReset}
              className="cyber-btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', gap: '6px' }}
            >
              <RotateCcw size={14} /> Restart Wizard
            </button>
          </div>
        </div>
      ) : (
        /* Result celebration card */
        <div
          style={{
            backgroundColor: '#090f20',
            border: '2px solid var(--neon-green)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            boxShadow: '0 10px 40px rgba(57, 255, 20, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '20px'
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(57, 255, 20, 0.2)',
              border: '2px solid var(--neon-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)'
            }}
          >
            <Award size={32} color="var(--neon-green)" />
          </div>

          <div>
            <span className="cyber-badge badge-green" style={{ marginBottom: '8px', display: 'inline-block' }}>
              RECOMMENDED PATTERN IDENTIFIED
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', margin: '6px 0' }}>
              {completedResult.name}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>
              {completedResult.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="cyber-badge badge-cyan">Time: {completedResult.timeComplexity}</span>
            <span className="cyber-badge badge-magenta">Space: {completedResult.spaceComplexity}</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button
              onClick={() => onSelectResult(completedResult.id)}
              className="cyber-btn"
              style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px' }}
            >
              <CheckCircle2 size={16} /> Open Solution & Simulator
            </button>

            <button
              onClick={handleReset}
              className="cyber-btn-secondary"
              style={{ padding: '10px 16px', fontSize: '0.9rem' }}
            >
              <RotateCcw size={16} /> Diagnose Another Problem
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
