import React, { useState } from 'react';
import { DATA_STRUCTURES } from '../../data/dataStructuresData';
import { ALGORITHMS } from '../../data/algorithmsData';
import { SyntaxHighlighter } from '../common/SyntaxHighlighter';
import { ComplexityBadge } from '../common/ComplexityBadge';
import { 
  Database, 
  Cpu
} from 'lucide-react';

// 8 Data Structure visualizers
import { ArrayVisualizer } from './ds/ArrayVisualizer';
import { LinkedListVisualizer } from './ds/LinkedListVisualizer';
import { TreeVisualizer } from './ds/TreeVisualizer';
import { GraphVisualizer } from './ds/GraphVisualizer';
import { HeapVisualizer } from './ds/HeapVisualizer';
import { TrieVisualizer } from './ds/TrieVisualizer';
import { StackVisualizer } from './ds/StackVisualizer';
import { QueueVisualizer } from './ds/QueueVisualizer';

// 8 Algorithm visualizers
import { SlidingWindowVisualizer } from './algo/SlidingWindowVisualizer';
import { TwoPointersVisualizer } from './algo/TwoPointersVisualizer';
import { BFSVisualizer } from './algo/BFSVisualizer';
import { DFSVisualizer } from './algo/DFSVisualizer';
import { DPVisualizer } from './algo/DPVisualizer';
import { BinarySearchVisualizer } from './algo/BinarySearchVisualizer';
import { GreedyVisualizer } from './algo/GreedyVisualizer';
import { PrefixSumVisualizer } from './algo/PrefixSumVisualizer';

interface VisualizerHubProps {
  initialType?: string;
}

export const VisualizerHub: React.FC<VisualizerHubProps> = ({ initialType = 'array' }) => {
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [tabCategory, setTabCategory] = useState<'ds' | 'algo'>('ds');

  const currentDS = DATA_STRUCTURES.find(d => d.type === selectedType);
  const currentAlgo = ALGORITHMS.find(a => a.type === selectedType);

  const renderActiveVisualizer = () => {
    switch (selectedType) {
      // DS
      case 'array': return <ArrayVisualizer />;
      case 'linked_list': return <LinkedListVisualizer />;
      case 'tree': return <TreeVisualizer />;
      case 'graph': return <GraphVisualizer />;
      case 'heap': return <HeapVisualizer />;
      case 'trie': return <TrieVisualizer />;
      case 'stack': return <StackVisualizer />;
      case 'queue': return <QueueVisualizer />;
      // Algorithms
      case 'sliding_window': return <SlidingWindowVisualizer />;
      case 'two_pointers': return <TwoPointersVisualizer />;
      case 'bfs': return <BFSVisualizer />;
      case 'dfs': return <DFSVisualizer />;
      case 'dp': return <DPVisualizer />;
      case 'binary_search': return <BinarySearchVisualizer />;
      case 'greedy': return <GreedyVisualizer />;
      case 'prefix_sum': return <PrefixSumVisualizer />;
      default: return <ArrayVisualizer />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Category Toggle Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button
          onClick={() => {
            setTabCategory('ds');
            setSelectedType('array');
          }}
          className={`cyber-tab ${tabCategory === 'ds' ? 'active' : ''}`}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: tabCategory === 'ds' ? 'rgba(0, 245, 255, 0.2)' : 'rgba(13, 21, 39, 0.6)',
            color: tabCategory === 'ds' ? 'var(--neon-cyan)' : 'var(--text-muted)',
            boxShadow: tabCategory === 'ds' ? '0 0 15px rgba(0, 245, 255, 0.3)' : 'none'
          }}
        >
          <Database size={16} /> 8 Data Structures
        </button>

        <button
          onClick={() => {
            setTabCategory('algo');
            setSelectedType('sliding_window');
          }}
          className={`cyber-tab ${tabCategory === 'algo' ? 'active' : ''}`}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: tabCategory === 'algo' ? 'rgba(255, 0, 127, 0.2)' : 'rgba(13, 21, 39, 0.6)',
            color: tabCategory === 'algo' ? 'var(--neon-magenta)' : 'var(--text-muted)',
            boxShadow: tabCategory === 'algo' ? '0 0 15px rgba(255, 0, 127, 0.3)' : 'none'
          }}
        >
          <Cpu size={16} /> 8 Essential Algorithms
        </button>
      </div>

      {/* Modules Selector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
        {tabCategory === 'ds' ? (
          DATA_STRUCTURES.map(ds => {
            const isSelected = selectedType === ds.type;
            return (
              <button
                key={ds.id}
                onClick={() => setSelectedType(ds.type)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'rgba(0, 245, 255, 0.25)' : 'rgba(13, 21, 39, 0.7)',
                  border: `1px solid ${isSelected ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                  color: isSelected ? '#fff' : '#c9d8f0',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 12px rgba(0, 245, 255, 0.4)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {ds.name}
              </button>
            );
          })
        ) : (
          ALGORITHMS.map(algo => {
            const isSelected = selectedType === algo.type;
            return (
              <button
                key={algo.id}
                onClick={() => setSelectedType(algo.type)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'rgba(255, 0, 127, 0.25)' : 'rgba(13, 21, 39, 0.7)',
                  border: `1px solid ${isSelected ? 'var(--neon-magenta)' : 'rgba(255, 255, 255, 0.08)'}`,
                  color: isSelected ? '#fff' : '#c9d8f0',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 12px rgba(255, 0, 127, 0.4)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {algo.name}
              </button>
            );
          })
        )}
      </div>

      {/* Main Visualizer Stage */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
        {/* Left Interactive Canvas Container */}
        <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(0, 245, 255, 0.25)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
              {currentDS?.name || currentAlgo?.name}
            </h3>
            <span className={`cyber-badge ${tabCategory === 'ds' ? 'badge-cyan' : 'badge-magenta'}`}>
              {tabCategory === 'ds' ? 'DATA STRUCTURE' : 'ALGORITHMIC PATTERN'}
            </span>
          </div>

          {renderActiveVisualizer()}
        </div>

        {/* Right Info & Code Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Description & Complexity Card */}
          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
              CORE OVERVIEW
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 14px 0' }}>
              {currentDS?.description || currentAlgo?.description}
            </p>

            {/* Complexity badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {currentDS && (
                <>
                  <ComplexityBadge complexity={currentDS.timeComplexity.access} label="Access" />
                  <ComplexityBadge complexity={currentDS.timeComplexity.search} label="Search" />
                  <ComplexityBadge complexity={currentDS.spaceComplexity} label="Space" />
                </>
              )}
              {currentAlgo && (
                <>
                  <ComplexityBadge complexity={currentAlgo.timeComplexity.average} label="Avg Time" />
                  <ComplexityBadge complexity={currentAlgo.spaceComplexity} label="Space" />
                </>
              )}
            </div>
          </div>

          {/* Pros / Cons / Patterns */}
          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: 'var(--neon-magenta)', fontFamily: 'var(--font-mono)' }}>
              {currentAlgo ? 'KEY PATTERNS & SIGNALS' : 'OPTIMAL USE CASES'}
            </h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {currentDS?.useCases.map((u, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{u}</li>
              ))}
              {currentAlgo?.keySignals.map((s, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Reference Implementation with Full IDE / Pylance Syntax Highlighting */}
          <SyntaxHighlighter
            pythonCode={currentDS?.pythonSnippet || currentAlgo?.pythonSnippet || ''}
            tsCode={currentDS?.tsSnippet || currentAlgo?.tsSnippet || ''}
            title={`${currentDS?.name || currentAlgo?.name} Implementation`}
          />
        </div>
      </div>
    </div>
  );
};
