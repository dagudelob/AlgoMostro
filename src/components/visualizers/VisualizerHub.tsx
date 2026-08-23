import React, { useState } from 'react';
import { DATA_STRUCTURES } from '../../data/dataStructuresData';
import { ALGORITHMS } from '../../data/algorithmsData';
import { SyntaxHighlighter } from '../common/SyntaxHighlighter';
import { ComplexityBadge } from '../common/ComplexityBadge';
import { 
  Database, 
  Cpu,
  Columns2,
  Rows3
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

type HubLayout = 'split' | 'stacked';

export const VisualizerHub: React.FC<VisualizerHubProps> = ({ initialType = 'array' }) => {
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [tabCategory, setTabCategory] = useState<'ds' | 'algo'>('ds');
  const [layoutMode, setLayoutMode] = useState<HubLayout>('split');

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
    <div style={{ maxWidth: '1480px', margin: '16px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header: Category Toggle & Layout Mode Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        {/* Category Switcher Tabs */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              setTabCategory('ds');
              setSelectedType('array');
            }}
            className={`cyber-tab ${tabCategory === 'ds' ? 'active' : ''}`}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '0.9rem',
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
            <Database size={15} /> 8 Data Structures
          </button>

          <button
            onClick={() => {
              setTabCategory('algo');
              setSelectedType('sliding_window');
            }}
            className={`cyber-tab ${tabCategory === 'algo' ? 'active' : ''}`}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '0.9rem',
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
            <Cpu size={15} /> 8 Essential Algorithms
          </button>
        </div>

        {/* View Layout Mode Toggle: Side-by-Side vs Stacked Wide */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#090f20', padding: '3px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            onClick={() => setLayoutMode('split')}
            title="Side-by-Side Split View"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: layoutMode === 'split' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: layoutMode === 'split' ? 'var(--neon-cyan)' : 'var(--text-muted)'
            }}
          >
            <Columns2 size={13} />
            <span>Split View</span>
          </button>

          <button
            onClick={() => setLayoutMode('stacked')}
            title="Stacked Wide Code View"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: layoutMode === 'stacked' ? 'rgba(255, 0, 127, 0.2)' : 'transparent',
              color: layoutMode === 'stacked' ? 'var(--neon-magenta)' : 'var(--text-muted)'
            }}
          >
            <Rows3 size={13} />
            <span>Wide Code View</span>
          </button>
        </div>
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
                  padding: '9px 12px',
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
                  padding: '9px 12px',
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
      {layoutMode === 'split' ? (
        /* Split View: Balanced 1.1fr : 1fr grid with ample code width */
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
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
            <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
                  CORE OVERVIEW & COMPLEXITY
                </h4>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
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

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {currentDS?.description || currentAlgo?.description}
              </p>
            </div>

            {/* Reference Implementation with Full IDE / Pylance Syntax Highlighting & Fullscreen Toggle */}
            <SyntaxHighlighter
              pythonCode={currentDS?.pythonSnippet || currentAlgo?.pythonSnippet || ''}
              tsCode={currentDS?.tsSnippet || currentAlgo?.tsSnippet || ''}
              title={`${currentDS?.name || currentAlgo?.name} Implementation`}
            />
          </div>
        </div>
      ) : (
        /* Stacked Wide Mode: Full Width Canvas + Full Width Code Editor */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Full Width Interactive Canvas */}
          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(0, 245, 255, 0.25)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>
                  {currentDS?.name || currentAlgo?.name}
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {currentDS?.description || currentAlgo?.description}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
                <span className={`cyber-badge ${tabCategory === 'ds' ? 'badge-cyan' : 'badge-magenta'}`} style={{ marginLeft: '8px' }}>
                  {tabCategory === 'ds' ? 'DATA STRUCTURE' : 'ALGORITHMIC PATTERN'}
                </span>
              </div>
            </div>

            {renderActiveVisualizer()}
          </div>

          {/* Bottom Full-Width Code Editor */}
          <div style={{ width: '100%' }}>
            <SyntaxHighlighter
              pythonCode={currentDS?.pythonSnippet || currentAlgo?.pythonSnippet || ''}
              tsCode={currentDS?.tsSnippet || currentAlgo?.tsSnippet || ''}
              title={`${currentDS?.name || currentAlgo?.name} Implementation (Full Width)`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
