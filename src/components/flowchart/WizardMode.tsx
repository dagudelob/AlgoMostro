import React, { useState } from 'react';
import { FLOWCHART_NODES, FLOWCHART_ROOT_ID } from '../../data/flowchartData';
import { ALGORITHM_RESULTS } from '../../data/problemCatalog';
import { Sparkles, ArrowLeft, RotateCcw, CheckCircle2, BookOpen } from 'lucide-react';
import type { AlgorithmResult, FlowchartOption } from '../../types/flowchart';
import confetti from 'canvas-confetti';

interface WizardModeProps {
  onOpenResultModal: (result: AlgorithmResult) => void;
}

export const WizardMode: React.FC<WizardModeProps> = ({ onOpenResultModal }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>(FLOWCHART_ROOT_ID);
  const [history, setHistory] = useState<{ nodeId: string; optionLabel: string }[]>([]);
  const [finalResult, setFinalResult] = useState<AlgorithmResult | null>(null);

  const currentNode = FLOWCHART_NODES[currentNodeId];

  const handleSelectOption = (opt: FlowchartOption) => {
    if (opt.algorithmResultId && ALGORITHM_RESULTS[opt.algorithmResultId]) {
      const res = ALGORITHM_RESULTS[opt.algorithmResultId];
      setFinalResult(res);
      setHistory([...history, { nodeId: currentNodeId, optionLabel: opt.label }]);
      
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f5ff', '#ff007f', '#39ff14', '#ffd60a']
      });
    } else if (opt.nextNodeId && FLOWCHART_NODES[opt.nextNodeId]) {
      setHistory([...history, { nodeId: currentNodeId, optionLabel: opt.label }]);
      setCurrentNodeId(opt.nextNodeId);
    }
  };

  const handleBack = () => {
    if (finalResult) {
      setFinalResult(null);
      return;
    }
    if (history.length === 0) return;
    const lastStep = history[history.length - 1];
    setCurrentNodeId(lastStep.nodeId);
    setHistory(history.slice(0, -1));
  };

  const handleReset = () => {
    setCurrentNodeId(FLOWCHART_ROOT_ID);
    setHistory([]);
    setFinalResult(null);
  };

  return (
    <div
      className="cyber-card"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Wizard Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={22} color="var(--neon-cyan)" />
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
              Asistente de Diagnóstico Paso a Paso
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Responde las preguntas de tu ejercicio para deducir el algoritmo óptimo
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {history.length > 0 && (
            <button
              onClick={handleBack}
              className="cyber-btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', gap: '4px' }}
            >
              <ArrowLeft size={13} /> Volver
            </button>
          )}
          <button
            onClick={handleReset}
            className="cyber-btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', gap: '4px' }}
          >
            <RotateCcw size={13} /> Reiniciar
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      {history.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
            Camino recorrido:
          </span>
          {history.map((h, i) => (
            <React.Fragment key={i}>
              <span className="cyber-badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                {h.optionLabel}
              </span>
              {i < history.length - 1 && <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Main Question Box OR Final Result */}
      {!finalResult && currentNode && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'rgba(0, 245, 255, 0.04)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <span className="cyber-badge badge-magenta" style={{ marginBottom: '10px', display: 'inline-block' }}>
              PASO {history.length + 1} • {currentNode.category.toUpperCase()}
            </span>
            <h3 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 700, marginBottom: '8px', lineHeight: '1.4' }}>
              {currentNode.question}
            </h3>
            {currentNode.subtitle && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {currentNode.subtitle}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
            {currentNode.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(16, 28, 54, 0.8)',
                  border: '1px solid rgba(0, 245, 255, 0.25)',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 245, 255, 0.18)';
                  e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(16, 28, 54, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                }}
              >
                <span>{opt.label}</span>
                <span style={{ color: 'var(--neon-cyan)', fontSize: '1.1rem' }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Diagnosed Final Result Card */}
      {finalResult && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 127, 0.1))',
            border: '2px solid var(--neon-cyan)',
            borderRadius: 'var(--radius-lg)',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={28} color="#39ff14" />
            <div>
              <span className="cyber-badge badge-green" style={{ fontSize: '0.75rem' }}>
                DIAGNÓSTICO COMPLETADO
              </span>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 800, marginTop: '4px' }}>
                {finalResult.name}
              </h2>
            </div>
          </div>

          <p style={{ color: '#e0eaff', fontSize: '0.95rem', lineHeight: '1.5' }}>
            {finalResult.description}
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="cyber-badge badge-cyan">Tiempo: {finalResult.timeComplexity}</span>
            <span className="cyber-badge badge-magenta">Espacio: {finalResult.spaceComplexity}</span>
            <span className="cyber-badge badge-purple">DS: {finalResult.dataStructures.join(', ')}</span>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenResultModal(finalResult)}
              className="cyber-btn"
              style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <BookOpen size={16} /> Ver Ejercicio & Código Completo
            </button>
            <button
              onClick={handleReset}
              className="cyber-btn-secondary"
              style={{ padding: '10px 16px', fontSize: '0.9rem' }}
            >
              Diagnosticar Otro Problema
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
