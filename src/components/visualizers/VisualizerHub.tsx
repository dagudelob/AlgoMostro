import React, { useState } from 'react';
import { DATA_STRUCTURES } from '../../data/dataStructuresData';
import { ALGORITHMS } from '../../data/algorithmsData';
import { ComplexityBadge } from '../common/ComplexityBadge';

// DS Visualizers
import { ArrayVisualizer } from './ds/ArrayVisualizer';
import { LinkedListVisualizer } from './ds/LinkedListVisualizer';
import { TreeVisualizer } from './ds/TreeVisualizer';
import { GraphVisualizer } from './ds/GraphVisualizer';
import { HeapVisualizer } from './ds/HeapVisualizer';
import { TrieVisualizer } from './ds/TrieVisualizer';
import { StackVisualizer } from './ds/StackVisualizer';
import { QueueVisualizer } from './ds/QueueVisualizer';

// Algo Visualizers
import { SlidingWindowVisualizer } from './algo/SlidingWindowVisualizer';
import { TwoPointersVisualizer } from './algo/TwoPointersVisualizer';
import { BFSVisualizer } from './algo/BFSVisualizer';
import { DFSVisualizer } from './algo/DFSVisualizer';
import { DPVisualizer } from './algo/DPVisualizer';
import { BinarySearchVisualizer } from './algo/BinarySearchVisualizer';
import { GreedyVisualizer } from './algo/GreedyVisualizer';
import { PrefixSumVisualizer } from './algo/PrefixSumVisualizer';

import type { VisualizerType } from '../../types/flowchart';
import { CodeSnippet } from '../details/CodeSnippet';
import { Database, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface VisualizerHubProps {
  initialType?: VisualizerType;
}

export const VisualizerHub: React.FC<VisualizerHubProps> = ({ initialType = 'sliding_window' }) => {
  const [selectedCategory, setSelectedCategory] = useState<'algorithms' | 'data_structures'>('algorithms');
  const [selectedType, setSelectedType] = useState<VisualizerType>(initialType);

  const currentDS = DATA_STRUCTURES.find((d) => d.type === selectedType);
  const currentAlgo = ALGORITHMS.find((a) => a.type === selectedType);

  const renderVisualizer = () => {
    switch (selectedType) {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '12px' }}>
        <button
          onClick={() => {
            setSelectedCategory('algorithms');
            setSelectedType('sliding_window');
          }}
          className={selectedCategory === 'algorithms' ? 'cyber-btn' : 'cyber-btn-secondary'}
          style={{ padding: '8px 18px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Cpu size={16} /> 8 Algoritmos Esenciales
        </button>

        <button
          onClick={() => {
            setSelectedCategory('data_structures');
            setSelectedType('array');
          }}
          className={selectedCategory === 'data_structures' ? 'cyber-btn' : 'cyber-btn-secondary'}
          style={{ padding: '8px 18px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Database size={16} /> 8 Estructuras de Datos
        </button>
      </div>

      {/* Pill Selector */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
        {selectedCategory === 'algorithms'
          ? ALGORITHMS.map((algo) => {
              const isSelected = selectedType === algo.type;
              return (
                <button
                  key={algo.id}
                  onClick={() => setSelectedType(algo.type)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${isSelected ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.08)'}`,
                    backgroundColor: isSelected ? 'rgba(0, 245, 255, 0.15)' : 'rgba(16, 28, 54, 0.6)',
                    color: isSelected ? '#00f5ff' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? '0 0 12px rgba(0, 245, 255, 0.3)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {algo.name}
                </button>
              );
            })
          : DATA_STRUCTURES.map((ds) => {
              const isSelected = selectedType === ds.type;
              return (
                <button
                  key={ds.id}
                  onClick={() => setSelectedType(ds.type)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${isSelected ? 'var(--neon-green)' : 'rgba(255,255,255,0.08)'}`,
                    backgroundColor: isSelected ? 'rgba(57, 255, 20, 0.15)' : 'rgba(16, 28, 54, 0.6)',
                    color: isSelected ? '#39ff14' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? '0 0 12px rgba(57, 255, 20, 0.3)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {ds.name}
                </button>
              );
            })}
      </div>

      {/* Detail Header & Complexities */}
      <div
        className="cyber-card"
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Sparkles size={18} color="#00f5ff" />
              <h2 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>
                {currentAlgo ? currentAlgo.name : currentDS ? currentDS.name : ''}
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px', lineHeight: '1.5' }}>
              {currentAlgo ? currentAlgo.description : currentDS ? currentDS.description : ''}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {currentAlgo && (
              <>
                <ComplexityBadge type="time" value={currentAlgo.timeComplexity.average} size="md" />
                <ComplexityBadge type="space" value={currentAlgo.spaceComplexity} size="md" />
              </>
            )}
            {currentDS && (
              <>
                <ComplexityBadge type="time" value={`Acceso: ${currentDS.timeComplexity.access}`} size="md" />
                <ComplexityBadge type="space" value={currentDS.spaceComplexity} size="md" />
              </>
            )}
          </div>
        </div>

        {/* Live Simulator View */}
        <div style={{ marginTop: '8px' }}>
          {renderVisualizer()}
        </div>

        {/* Key Signals & Snippet */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginTop: '12px' }}>
          {/* Key Insights / Use cases */}
          <div style={{ background: '#080d18', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 245, 255, 0.15)' }}>
            <h4 style={{ color: 'var(--neon-cyan)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
              {currentAlgo ? 'PATRONES Y SEÑALES CLAVE' : 'CASOS DE USO ÓPTIMOS'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
              {(currentAlgo ? currentAlgo.keySignals : currentDS ? currentDS.useCases : []).map((signal, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                  <CheckCircle2 size={14} color="#39ff14" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reference Snippet */}
          <div>
            <CodeSnippet
              pythonCode={currentAlgo ? currentAlgo.snippet : currentDS ? currentDS.snippet : ''}
              tsCode={currentAlgo ? currentAlgo.snippet : currentDS ? currentDS.snippet : ''}
              title="Template de Código"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
