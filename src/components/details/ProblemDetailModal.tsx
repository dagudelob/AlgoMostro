import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { ComplexityBadge } from '../common/ComplexityBadge';
import { CodeSnippet } from './CodeSnippet';
import { Sparkles, CheckCircle2, AlertTriangle, Play, BookOpen } from 'lucide-react';
import type { AlgorithmResult } from '../../types/flowchart';

// Visualizers
import { ArrayVisualizer } from '../visualizers/ds/ArrayVisualizer';
import { LinkedListVisualizer } from '../visualizers/ds/LinkedListVisualizer';
import { TreeVisualizer } from '../visualizers/ds/TreeVisualizer';
import { GraphVisualizer } from '../visualizers/ds/GraphVisualizer';
import { HeapVisualizer } from '../visualizers/ds/HeapVisualizer';
import { TrieVisualizer } from '../visualizers/ds/TrieVisualizer';
import { StackVisualizer } from '../visualizers/ds/StackVisualizer';
import { QueueVisualizer } from '../visualizers/ds/QueueVisualizer';
import { SlidingWindowVisualizer } from '../visualizers/algo/SlidingWindowVisualizer';
import { TwoPointersVisualizer } from '../visualizers/algo/TwoPointersVisualizer';
import { BFSVisualizer } from '../visualizers/algo/BFSVisualizer';
import { DFSVisualizer } from '../visualizers/algo/DFSVisualizer';
import { DPVisualizer } from '../visualizers/algo/DPVisualizer';
import { BinarySearchVisualizer } from '../visualizers/algo/BinarySearchVisualizer';
import { GreedyVisualizer } from '../visualizers/algo/GreedyVisualizer';
import { PrefixSumVisualizer } from '../visualizers/algo/PrefixSumVisualizer';

interface ProblemDetailModalProps {
  algorithmResult: AlgorithmResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  algorithmResult,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'simulator'>('problem');

  if (!algorithmResult) return null;

  const classic = algorithmResult.classicProblems[0];

  const renderSimulator = () => {
    switch (algorithmResult.visualizerType) {
      case 'array': return <ArrayVisualizer />;
      case 'linked_list': return <LinkedListVisualizer />;
      case 'tree': return <TreeVisualizer />;
      case 'graph': return <GraphVisualizer />;
      case 'heap': return <HeapVisualizer />;
      case 'trie': return <TrieVisualizer />;
      case 'stack': return <StackVisualizer />;
      case 'queue': return <QueueVisualizer />;
      case 'sliding_window': return <SlidingWindowVisualizer />;
      case 'two_pointers': return <TwoPointersVisualizer />;
      case 'bfs': return <BFSVisualizer />;
      case 'dfs': return <DFSVisualizer />;
      case 'dp': return <DPVisualizer />;
      case 'binary_search': return <BinarySearchVisualizer />;
      case 'greedy': return <GreedyVisualizer />;
      case 'prefix_sum': return <PrefixSumVisualizer />;
      default: return <SlidingWindowVisualizer />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="1000px"
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={20} color="#00f5ff" />
          <span>{algorithmResult.name}</span>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Navigation Tabs in Modal */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '10px' }}>
          <button
            onClick={() => setActiveTab('problem')}
            className={activeTab === 'problem' ? 'cyber-btn' : 'cyber-btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            <BookOpen size={14} /> Solución & Ejercicio LeetCode
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={activeTab === 'simulator' ? 'cyber-btn' : 'cyber-btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            <Play size={14} /> Simulador Interactivo en Vivo
          </button>
        </div>

        {activeTab === 'problem' && (
          <>
            {/* Header Description & Complexities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontSize: '1rem', color: '#e0eaff', lineHeight: '1.5' }}>
                {algorithmResult.description}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <ComplexityBadge type="time" value={algorithmResult.timeComplexity} size="md" />
                <ComplexityBadge type="space" value={algorithmResult.spaceComplexity} size="md" />
                <span className="cyber-badge badge-purple">
                  DS: {algorithmResult.dataStructures.join(', ')}
                </span>
                <span className="cyber-badge badge-yellow">
                  Patrón: {algorithmResult.algorithms.join(', ')}
                </span>
              </div>
            </div>

            {/* Why This Pattern */}
            <div
              style={{
                backgroundColor: 'rgba(0, 245, 255, 0.05)',
                borderLeft: '4px solid var(--neon-cyan)',
                borderRadius: '0 8px 8px 0',
                padding: '14px 18px'
              }}
            >
              <h4 style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '6px' }}>
                ¿POR QUÉ SE ELIGE ESTE PATRÓN EN EL FLOWCHART?
              </h4>
              <p style={{ color: '#c9e6ff', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {algorithmResult.whyThisPattern}
              </p>
            </div>

            {/* When to Use / When to Avoid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#080d18', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(57, 255, 20, 0.2)' }}>
                <h4 style={{ color: '#39ff14', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} /> CUÁNDO USARLO
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {algorithmResult.whenToUse.map((w, idx) => (
                    <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>• {w}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#080d18', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 0, 127, 0.2)' }}>
                <h4 style={{ color: '#ff007f', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={14} /> CUÁNDO EVITARLO
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {algorithmResult.whenToAvoid.map((w, idx) => (
                    <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>• {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Classic Problem Card */}
            {classic && (
              <div style={{ background: 'rgba(13, 21, 39, 0.8)', border: '1px solid rgba(0, 245, 255, 0.25)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="cyber-badge badge-cyan">{classic.platform} #{classic.problemNumber}</span>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>{classic.title}</h3>
                  </div>
                  <span className={`cyber-badge ${classic.difficulty === 'Easy' ? 'badge-green' : classic.difficulty === 'Medium' ? 'badge-yellow' : 'badge-magenta'}`}>
                    {classic.difficulty}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px', lineHeight: '1.5' }}>
                  {classic.summary}
                </p>

                {/* Key Insight */}
                <div style={{ background: '#060a12', padding: '10px 14px', borderRadius: '6px', borderLeft: '3px solid #ffb703', marginBottom: '12px' }}>
                  <span style={{ color: '#ffb703', fontWeight: 700, fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>INSIGHT CLAVE: </span>
                  <span style={{ color: '#e0eaff', fontSize: '0.8rem' }}>{classic.keyInsight}</span>
                </div>

                {/* Code Solution with Python & TypeScript */}
                <CodeSnippet
                  pythonCode={classic.pythonCode}
                  tsCode={classic.tsCode}
                  title={`${classic.title} - Implementación Óptima`}
                />
              </div>
            )}
          </>
        )}

        {activeTab === 'simulator' && (
          <div>
            {renderSimulator()}
          </div>
        )}
      </div>
    </Modal>
  );
};
