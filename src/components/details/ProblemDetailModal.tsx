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
  Sparkles,
  ExternalLink,
  BookOpen
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

  const currentProblem = result.classicProblems?.[0];

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
      default: return <div>No simulator mapped.</div>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={result.name} maxWidth="1050px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header Badges and Meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span className="cyber-badge badge-magenta" style={{ marginRight: '8px' }}>
              {result.category.toUpperCase()}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {result.tagline}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <ComplexityBadge complexity={result.timeComplexity} label="Time" />
            <ComplexityBadge complexity={result.spaceComplexity} label="Space" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '10px' }}>
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
            <BookOpen size={15} /> Overview & Theory
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

            {/* When to Use & When to Avoid */}
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

            {/* Curated LeetCode Practice Problems: Easy (Green), Medium (Yellow), Hard (Red) */}
            {result.practiceProblems && result.practiceProblems.length > 0 && (
              <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(0, 245, 255, 0.25)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ExternalLink size={16} color="var(--neon-cyan)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      CURATED LEETCODE PRACTICE PROBLEMS (EASY / MEDIUM / HARD)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    Direct LeetCode Links
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                  {result.practiceProblems.map((prob) => {
                    let diffColor = '#39ff14'; // Easy = Green
                    let diffBg = 'rgba(57, 255, 20, 0.1)';
                    let borderGlow = 'rgba(57, 255, 20, 0.35)';

                    if (prob.difficulty === 'Medium') {
                      diffColor = '#ffd60a'; // Medium = Yellow
                      diffBg = 'rgba(255, 214, 10, 0.1)';
                      borderGlow = 'rgba(255, 214, 10, 0.35)';
                    } else if (prob.difficulty === 'Hard') {
                      diffColor = '#ff3366'; // Hard = Red
                      diffBg = 'rgba(255, 51, 102, 0.12)';
                      borderGlow = 'rgba(255, 51, 102, 0.4)';
                    }

                    return (
                      <a
                        key={prob.id}
                        href={prob.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: diffBg,
                          border: `1.5px solid ${borderGlow}`,
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 4px 15px ${borderGlow}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            #{prob.problemNumber}
                          </span>
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              color: diffColor,
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              padding: '2px 8px',
                              borderRadius: '3px',
                              border: `1px solid ${diffColor}`,
                              letterSpacing: '0.5px'
                            }}
                          >
                            {prob.difficulty.toUpperCase()}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                            {prob.title}
                          </span>
                          <ExternalLink size={13} color="var(--text-muted)" />
                        </div>

                        <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                          {prob.summary}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-yellow)', fontSize: '0.8rem', backgroundColor: 'rgba(255, 214, 10, 0.08)', padding: '8px 12px', borderRadius: '4px' }}>
                <Lightbulb size={16} />
                <span><strong>Key Insight:</strong> {currentProblem.keyInsight}</span>
              </div>
            </div>

            {/* Pylance / IDE Code Viewer */}
            <SyntaxHighlighter
              pythonCode={currentProblem.pythonCode}
              tsCode={currentProblem.tsCode}
              title={`LeetCode #${currentProblem.problemNumber || ''} Solution`}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
