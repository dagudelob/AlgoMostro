import React, { useState } from 'react';
import type { AlgorithmResult } from '../../types/flowchart';
import { Modal } from '../common/Modal';
import { SyntaxHighlighter } from '../common/SyntaxHighlighter';
import { ComplexityBadge } from '../common/ComplexityBadge';
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Code,
  Sparkles
} from 'lucide-react';

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
  isOpen: boolean;
  onClose: () => void;
  result: AlgorithmResult | null;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  isOpen,
  onClose,
  result
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'code'>('overview');

  if (!result) return null;

  const currentProblem = result.classicProblems[0];

  const renderVisualizer = () => {
    switch (result.visualizerType) {
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
      default: return <BFSVisualizer />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={result.name} maxWidth="900px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header Tags & Complexities */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {result.dataStructures.map(ds => (
                <span key={ds} className="cyber-badge badge-cyan">{ds}</span>
              ))}
              {result.algorithms.map(algo => (
                <span key={algo} className="cyber-badge badge-magenta">{algo}</span>
              ))}
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {result.tagline}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <ComplexityBadge complexity={result.timeComplexity} label="Time" />
            <ComplexityBadge complexity={result.spaceComplexity} label="Space" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '8px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`cyber-tab ${activeTab === 'overview' ? 'active' : ''}`}
            style={{
              padding: '6px 14px',
              borderRadius: '4px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'overview' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
              color: activeTab === 'overview' ? 'var(--neon-cyan)' : 'var(--text-muted)'
            }}
          >
            <Lightbulb size={15} /> Overview & Theory
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`cyber-tab ${activeTab === 'simulator' ? 'active' : ''}`}
            style={{
              padding: '6px 14px',
              borderRadius: '4px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'simulator' ? 'rgba(255, 0, 127, 0.2)' : 'transparent',
              color: activeTab === 'simulator' ? 'var(--neon-magenta)' : 'var(--text-muted)'
            }}
          >
            <Sparkles size={15} /> Live Interactive Simulator
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`cyber-tab ${activeTab === 'code' ? 'active' : ''}`}
            style={{
              padding: '6px 14px',
              borderRadius: '4px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'code' ? 'rgba(57, 255, 20, 0.2)' : 'transparent',
              color: activeTab === 'code' ? 'var(--neon-green)' : 'var(--text-muted)'
            }}
          >
            <Code size={15} /> LeetCode Solution & Code
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(13, 21, 39, 0.6)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--neon-cyan)' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
                WHY CHOOSE THIS PATTERN IN THE FLOWCHART?
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#c9e6ff', lineHeight: 1.5 }}>
                {result.whyThisPattern}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(57, 255, 20, 0.05)', border: '1px solid rgba(57, 255, 20, 0.2)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <CheckCircle2 size={16} color="var(--neon-green)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neon-green)' }}>WHEN TO USE</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {result.whenToUse.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 0, 127, 0.05)', border: '1px solid rgba(255, 0, 127, 0.2)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <XCircle size={16} color="var(--neon-magenta)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neon-magenta)' }}>WHEN TO AVOID</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {result.whenToAvoid.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Simulator */}
        {activeTab === 'simulator' && (
          <div>
            {renderVisualizer()}
          </div>
        )}

        {/* Tab 3: Code & Problem with Native IDE Highlighting */}
        {activeTab === 'code' && currentProblem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Problem card */}
            <div style={{ backgroundColor: 'rgba(13, 21, 39, 0.7)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="cyber-badge badge-green">#{currentProblem.problemNumber || 'LC'}</span>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>{currentProblem.title}</h4>
                </div>
                <span className="cyber-badge badge-yellow">{currentProblem.difficulty}</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                {currentProblem.summary}
              </p>

              <div style={{ backgroundColor: '#070a14', padding: '10px', borderRadius: '4px', fontSize: '0.8rem', color: '#a0c4ff', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--neon-cyan)', fontWeight: 700 }}>KEY INSIGHT: </span>
                {currentProblem.keyInsight}
              </div>
            </div>

            {/* Native IDE Syntax Highlighting Code Box */}
            <SyntaxHighlighter
              pythonCode={currentProblem.pythonCode}
              tsCode={currentProblem.tsCode}
              title={`Solution for ${currentProblem.title}`}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
