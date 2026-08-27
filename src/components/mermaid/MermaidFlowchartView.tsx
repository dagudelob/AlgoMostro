import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Download, 
  PlayCircle,
  Sparkles,
  Layers,
  FileCode2,
  BookOpen
} from 'lucide-react';

interface MermaidFlowchartViewProps {
  onSelectResult?: (resultId: string) => void;
  onOpenVisualizer?: (type: string) => void;
}

type DiagramMode = 'master' | 'arrays' | 'graphs' | 'dp' | 'specialized';

const MERMAID_DIAGRAMS: Record<DiagramMode, { title: string; subtitle: string; code: string }> = {
  master: {
    title: 'Master AlgoMonster Decision Tree (Mermaid)',
    subtitle: 'Comprehensive architectural decision graph covering all 4 algorithmic pillars',
    code: `graph TD
    %% Root Node
    START(["❓ What type of problem are you solving? / ¿Qué tipo de problema resuelves?"])

    %% 4 Pillars
    START --> ARRAY_BRANCH["🟩 Arrays & Strings<br/>(Arreglos o Cadenas)"]
    START --> GRAPH_BRANCH["🟦 Graphs & Trees<br/>(Grafos, Árboles, Grillas)"]
    START --> OPT_BRANCH["🟧 Optimization & DP<br/>(Optimización y Combinatoria)"]
    START --> STRUCT_BRANCH["🟪 Specialized Structures<br/>(Heaps & Intervals)"]

    %% --- BRANCH 1: ARRAYS & STRINGS ---
    ARRAY_BRANCH --> Q_SORTED{"Is array SORTED<br/>or monotonic?"}
    Q_SORTED -- Yes / Sí --> ALGO_BS["🎯 Binary Search<br/><i>O(log N)</i>"]
    Q_SORTED -- No --> Q_SUBARRAY{"Contiguous Subarrays<br/>or Ranges?"}
    
    Q_SUBARRAY -- Fixed/Dynamic Window --> ALGO_SW["🪟 Sliding Window<br/><i>O(N)</i>"]
    Q_SUBARRAY -- Range Sums/Products --> ALGO_PS["📊 Prefix Sum<br/><i>O(N)</i>"]
    Q_SUBARRAY -- Converging Ends --> ALGO_TP["👉👈 Two Pointers<br/><i>O(N)</i>"]
    
    ARRAY_BRANCH --> Q_STACK{"Next greater/smaller<br/>element in O(N)?"}
    Q_STACK -- Yes / Sí --> ALGO_MS["📚 Monotonic Stack<br/><i>O(N)</i>"]

    %% --- BRANCH 2: GRAPHS & TREES ---
    GRAPH_BRANCH --> Q_SHORTEST{"Shortest Path<br/>or Minimum Steps?"}
    Q_SHORTEST -- Unweighted / 2D Grid --> ALGO_BFS["🌊 BFS (Breadth-First)<br/><i>O(V + E)</i>"]
    Q_SHORTEST -- Positive Weights --> ALGO_DIJKSTRA["⚖️ Dijkstra Algorithm<br/><i>O((V+E) log V)</i>"]
    
    GRAPH_BRANCH --> Q_CONNECTIVITY{"Graph Structure<br/>& Relations?"}
    Q_CONNECTIVITY -- Dependencies / DAG --> ALGO_TOPO["📋 Topological Sort<br/><i>O(V + E)</i>"]
    Q_CONNECTIVITY -- Connected Components --> ALGO_UF["🪢 Union-Find (DSU)<br/><i>O(α(N))</i>"]
    Q_CONNECTIVITY -- String Prefixes --> ALGO_TRIE["🌲 Trie (Prefix Tree)<br/><i>O(L)</i>"]

    %% --- BRANCH 3: OPTIMIZATION & COMBINATORICS ---
    OPT_BRANCH --> Q_GOAL{"Optimal value/count<br/>or ALL valid states?"}
    Q_GOAL -- Optimal / Min-Max / Subproblems --> ALGO_DP["🧱 Dynamic Programming<br/><i>O(States × Transitions)</i>"]
    Q_GOAL -- Enumerate Permutations/Subsets --> ALGO_BT["🔙 Backtracking (DFS)<br/><i>O(2^N) / O(N!)</i>"]

    %% --- BRANCH 4: SPECIALIZED STRUCTURES ---
    STRUCT_BRANCH --> Q_SPEC{"Data Access Pattern?"}
    Q_SPEC -- Top K / Min / Max Elements --> ALGO_HEAP["👑 Heap / Priority Queue<br/><i>O(N log K)</i>"]
    Q_SPEC -- Overlapping Intervals / Time --> ALGO_INT["📅 Interval Sweep Line<br/><i>O(N log N)</i>"]

    %% Node Styles
    classDef root fill:#0f172a,stroke:#00f5ff,stroke-width:3px,color:#00f5ff;
    classDef category fill:#1e293b,stroke:#8b949e,stroke-width:2px,color:#f0f6fc;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:1.5px,color:#fff;
    classDef algoArray fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#a7f3d0;
    classDef algoGraph fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#c7d2fe;
    classDef algoDP fill:#451a03,stroke:#f59e0b,stroke-width:2px,color:#fde68a;
    classDef algoSpec fill:#3b0764,stroke:#a855f7,stroke-width:2px,color:#e9d5ff;

    class START root;
    class ARRAY_BRANCH,GRAPH_BRANCH,OPT_BRANCH,STRUCT_BRANCH category;
    class Q_SORTED,Q_SUBARRAY,Q_STACK,Q_SHORTEST,Q_CONNECTIVITY,Q_GOAL,Q_SPEC decision;
    class ALGO_BS,ALGO_SW,ALGO_PS,ALGO_TP,ALGO_MS algoArray;
    class ALGO_BFS,ALGO_DIJKSTRA,ALGO_TOPO,ALGO_UF,ALGO_TRIE algoGraph;
    class ALGO_DP,ALGO_BT algoDP;
    class ALGO_HEAP,ALGO_INT algoSpec;`
  },

  arrays: {
    title: 'Arrays & Strings Decision Subgraph',
    subtitle: 'Step-by-step resolution for monotonic inputs, sliding windows, and ranges',
    code: `graph TD
    A["🟩 Arrays & Strings (Arreglos y Cadenas)"] --> B{"Is Input Sorted or Monotonic?"}
    B -- Yes --> C["🎯 Binary Search<br/><i>O(log N)</i>"]
    B -- No --> D{"Contiguous Subarray or Range?"}
    
    D -- Continuous Dynamic Window --> E["🪟 Sliding Window<br/><i>O(N)</i>"]
    D -- Range Sum = K / Lookup --> F["📊 Prefix Sum + HashMap<br/><i>O(N)</i>"]
    D -- Converging Ends (Sorted Pairs) --> G["👉👈 Two Pointers<br/><i>O(N)</i>"]
    D -- Next Greater / Smaller Element --> H["📚 Monotonic Stack<br/><i>O(N)</i>"]

    classDef root fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#a7f3d0;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:1.5px,color:#fff;
    classDef algo fill:#0f172a,stroke:#00f5ff,stroke-width:2px,color:#38bdf8;
    class A root;
    class B,D decision;
    class C,E,F,G,H algo;`
  },

  graphs: {
    title: 'Graphs & Trees Decision Subgraph',
    subtitle: 'Routing BFS, Dijkstra, Topological Sort, Union-Find, and Trie',
    code: `graph TD
    A["🟦 Graphs & Trees / 2D Grids"] --> B{"Primary Objective?"}
    
    B -- Shortest Path (Unweighted / Uniform) --> C["🌊 BFS (Breadth-First Search)<br/><i>O(V + E)</i>"]
    B -- Shortest Path (Positive Weighted) --> D["⚖️ Dijkstra Algorithm<br/><i>O((V+E) log V)</i>"]
    B -- Task Dependencies / Prereqs (DAG) --> E["📋 Topological Sort (Kahn / DFS)<br/><i>O(V + E)</i>"]
    B -- Cycle Detection / Connected Groups --> F["🪢 Union-Find (DSU)<br/><i>O(α(N))</i>"]
    B -- String Prefix Lookup / Dictionary --> G["🌲 Trie (Prefix Tree)<br/><i>O(L)</i>"]

    classDef root fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#c7d2fe;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:1.5px,color:#fff;
    classDef algo fill:#0f172a,stroke:#ff007f,stroke-width:2px,color:#ff70a6;
    class A root;
    class B decision;
    class C,D,E,F,G algo;`
  },

  dp: {
    title: 'Optimization & Combinatorics (DP vs Backtracking)',
    subtitle: 'Deciding between Dynamic Programming and State Space Backtracking',
    code: `graph TD
    A["🟧 Optimization & Combinatorics"] --> B{"What does the problem ask for?"}
    
    B -- Optimal Min/Max Value or Count --> C["🧱 Dynamic Programming (DP)<br/><i>O(States × Transitions)</i>"]
    B -- Enumerate ALL Valid Combinations --> D["🔙 Backtracking (DFS Tree)<br/><i>O(2^N) / O(N!)</i>"]
    
    C --> C1["Overlapping Subproblems + Optimal Substructure"]
    D --> D1["Permutations, Subsets, N-Queens, Sudoku"]

    classDef root fill:#451a03,stroke:#f59e0b,stroke-width:2px,color:#fde68a;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:1.5px,color:#fff;
    classDef algo fill:#0f172a,stroke:#39ff14,stroke-width:2px,color:#a7f3d0;
    class A root;
    class B decision;
    class C,D,C1,D1 algo;`
  },

  specialized: {
    title: 'Specialized Structures (Heaps & Intervals)',
    subtitle: 'Priority Queues, Top-K elements, and Interval Sweep-Line algorithms',
    code: `graph TD
    A["🟪 Specialized Structures"] --> B{"Pattern of Data & Queries?"}
    
    B -- Top K Frequent / Streaming Median --> C["👑 Heap / Priority Queue<br/><i>O(N log K)</i>"]
    B -- Event Overlap / Meeting Rooms --> D["📅 Interval Sweep-Line<br/><i>O(N log N)</i>"]
    
    C --> C1["Min-Heap for Top K Largest / Max-Heap for Smallest"]
    D --> D1["Sort by Start Time + Greedy / Priority Queue Active End Time"]

    classDef root fill:#3b0764,stroke:#a855f7,stroke-width:2px,color:#e9d5ff;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:1.5px,color:#fff;
    classDef algo fill:#0f172a,stroke:#b5179e,stroke-width:2px,color:#e9d5ff;
    class A root;
    class B decision;
    class C,D,C1,D1 algo;`
  }
};

const CHEAT_SHEET_DATA = [
  { algo: 'Binary Search', cat: 'Array / String', time: 'O(log N)', space: 'O(1)', signal: 'Sorted array, monotonic function search range', visualizer: 'binary_search' },
  { algo: 'Sliding Window', cat: 'Array / String', time: 'O(N)', space: 'O(1) / O(K)', signal: 'Contiguous subarray with max/min condition, substring', visualizer: 'sliding_window' },
  { algo: 'Prefix Sum', cat: 'Array / String', time: 'O(N)', space: 'O(N)', signal: 'Range sum queries, subarray sum equals K (with HashMap)', visualizer: 'prefix_sum' },
  { algo: 'Two Pointers', cat: 'Array / String', time: 'O(N)', space: 'O(1)', signal: 'Sorted pair sum, in-place palindrome, three sum', visualizer: 'two_pointers' },
  { algo: 'Monotonic Stack', cat: 'Array / String', time: 'O(N)', space: 'O(N)', signal: 'Next greater/smaller element, largest rectangle in histogram', visualizer: 'stack' },
  { algo: 'BFS (Breadth-First)', cat: 'Graphs / Trees', time: 'O(V + E)', space: 'O(V)', signal: 'Shortest path unweighted, level-order traversal, 2D matrix infection', visualizer: 'bfs' },
  { algo: 'Dijkstra', cat: 'Graphs / Trees', time: 'O((V+E) log V)', space: 'O(V)', signal: 'Shortest path on positive weighted graph with priority queue', visualizer: 'graph' },
  { algo: 'Topological Sort', cat: 'Graphs / Trees', time: 'O(V + E)', space: 'O(V)', signal: 'Course schedule, task dependencies, cycle detection in DAG', visualizer: 'graph' },
  { algo: 'Union-Find (DSU)', cat: 'Graphs / Trees', time: 'O(α(N)) ≈ O(1)', space: 'O(N)', signal: 'Dynamic connected components, redundant connection, Kruskal MST', visualizer: 'graph' },
  { algo: 'Trie (Prefix Tree)', cat: 'Graphs / Trees', time: 'O(L)', space: 'O(N · L)', signal: 'Autocomplete, dictionary prefix lookup, word search II', visualizer: 'trie' },
  { algo: 'Dynamic Programming', cat: 'Optimization', time: 'O(States × Trans)', space: 'O(States)', signal: 'Max/min value, count total ways, 0/1 Knapsack, LCS, LIS', visualizer: 'dp' },
  { algo: 'Backtracking (DFS)', cat: 'Combinatorics', time: 'O(2^N) / O(N!)', space: 'O(N)', signal: 'Generate all valid subsets, permutations, N-Queens, Sudoku solver', visualizer: 'dfs' },
  { algo: 'Heap / Priority Queue', cat: 'Specialized', time: 'O(N log K)', space: 'O(K)', signal: 'Top K frequent elements, merge K sorted lists, median of stream', visualizer: 'heap' },
  { algo: 'Intervals / Sweep Line', cat: 'Specialized', time: 'O(N log N)', space: 'O(N)', signal: 'Meeting rooms, non-overlapping intervals, interval insertions', visualizer: 'greedy' }
];

export const MermaidFlowchartView: React.FC<MermaidFlowchartViewProps> = ({
  onSelectResult: _onSelectResult,
  onOpenVisualizer
}) => {
  const [selectedMode, setSelectedMode] = useState<DiagramMode>('master');
  const [zoom, setZoom] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
      themeVariables: {
        darkMode: true,
        background: '#090f20',
        primaryColor: '#0f172a',
        primaryTextColor: '#00f5ff',
        primaryBorderColor: '#00f5ff',
        lineColor: '#00f5ff',
        secondaryColor: '#1e1b4b',
        tertiaryColor: '#451a03'
      }
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const diagramCode = MERMAID_DIAGRAMS[selectedMode].code;
        const uniqueId = `mermaid-${selectedMode}-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, diagramCode);
        setSvgContent(svg);
      } catch (error) {
        console.error('Mermaid render error:', error);
      }
    };
    renderDiagram();
  }, [selectedMode]);

  const handleCopyMermaid = async () => {
    try {
      await navigator.clipboard.writeText(MERMAID_DIAGRAMS[selectedMode].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownloadSVG = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algomonster-${selectedMode}-flowchart.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '14px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(13, 21, 39, 0.95), rgba(4, 7, 14, 0.98))',
          border: '1px solid rgba(0, 245, 255, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 245, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--neon-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
            <Layers size={15} />
            <span>INTERACTIVE MERMAID.JS DECISION ARCHITECTURE</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', margin: '0 0 6px 0', color: '#fff' }}>
            {MERMAID_DIAGRAMS[selectedMode].title}
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px' }}>
            {MERMAID_DIAGRAMS[selectedMode].subtitle}
          </p>
        </div>

        {/* Action Controls: Copy, Download, Fullscreen */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={handleCopyMermaid}
            className="cyber-btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {copied ? <Check size={14} color="#39ff14" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy Mermaid Code'}</span>
          </button>

          <button
            onClick={handleDownloadSVG}
            className="cyber-btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            <span>Export SVG</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="cyber-btn"
            style={{ padding: '7px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Graph Selector Tabs */}
      <div className="horizontal-touch-scroll" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '10px' }}>
        <button
          onClick={() => { setSelectedMode('master'); setZoom(1); }}
          className={`cyber-tab ${selectedMode === 'master' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'master' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'master' ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: selectedMode === 'master' ? 'var(--neon-cyan)' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <Sparkles size={14} /> 🌟 Full Master Flowchart
        </button>

        <button
          onClick={() => { setSelectedMode('arrays'); setZoom(1); }}
          className={`cyber-tab ${selectedMode === 'arrays' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'arrays' ? 'rgba(57, 255, 20, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'arrays' ? 'var(--neon-green)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: selectedMode === 'arrays' ? 'var(--neon-green)' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          🟩 1. Arrays & Strings
        </button>

        <button
          onClick={() => { setSelectedMode('graphs'); setZoom(1); }}
          className={`cyber-tab ${selectedMode === 'graphs' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'graphs' ? 'rgba(0, 180, 216, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'graphs' ? '#00b4d8' : 'rgba(255, 255, 255, 0.1)'}`,
            color: selectedMode === 'graphs' ? '#00b4d8' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          🟦 2. Graphs & Trees
        </button>

        <button
          onClick={() => { setSelectedMode('dp'); setZoom(1); }}
          className={`cyber-tab ${selectedMode === 'dp' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'dp' ? 'rgba(255, 0, 127, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'dp' ? 'var(--neon-magenta)' : 'rgba(255, 255, 0, 0.1)'}`,
            color: selectedMode === 'dp' ? 'var(--neon-magenta)' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          🟧 3. DP & Combinatorics
        </button>

        <button
          onClick={() => { setSelectedMode('specialized'); setZoom(1); }}
          className={`cyber-tab ${selectedMode === 'specialized' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'specialized' ? 'rgba(181, 23, 158, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'specialized' ? '#d946ef' : 'rgba(255, 255, 255, 0.1)'}`,
            color: selectedMode === 'specialized' ? '#d946ef' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          🟪 4. Heaps & Intervals
        </button>
      </div>

      {/* Mermaid Canvas Stage with Zoom Controls */}
      <div
        style={{
          position: isFullscreen ? 'fixed' : 'relative',
          inset: isFullscreen ? 0 : 'auto',
          zIndex: isFullscreen ? 9999 : 1,
          backgroundColor: '#090f20',
          border: '1px solid rgba(0, 245, 255, 0.3)',
          borderRadius: isFullscreen ? 0 : 'var(--radius-lg)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 245, 255, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: isFullscreen ? '100vh' : '650px',
          transition: 'all 0.25s ease'
        }}
      >
        {/* Floating Zoom & Canvas Toolbar */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(13, 21, 39, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <button
            onClick={() => setZoom(z => Math.max(0.4, z - 0.15))}
            title="Zoom Out"
            style={{ background: 'transparent', border: 'none', color: '#c9d8f0', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            <ZoomOut size={16} />
          </button>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', padding: '0 4px', minWidth: '42px', textAlign: 'center' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(2.5, z + 0.15))}
            title="Zoom In"
            style={{ background: 'transparent', border: 'none', color: '#c9d8f0', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => setZoom(1)}
            title="Reset Zoom"
            style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', marginLeft: '4px' }}
          >
            <RotateCcw size={14} />
          </button>
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="cyber-btn"
              style={{ padding: '4px 10px', fontSize: '0.72rem', marginLeft: '6px' }}
            >
              Exit
            </button>
          )}
        </div>

        {/* Scrollable & Scalable SVG Container */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
            cursor: 'grab'
          }}
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.15s ease-out'
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      </div>

      {/* Section 2: Summary Matrix of All Algorithms & Complexities */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCode2 size={18} color="var(--neon-cyan)" />
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
            Algorithmic Master Matrix & Complexity Reference
          </h3>
        </div>

        <div
          className="responsive-code-container"
          style={{
            backgroundColor: '#090f20',
            border: '1px solid rgba(0, 245, 255, 0.25)',
            borderRadius: 'var(--radius-lg)',
            overflowX: 'auto'
          }}
        >
          <div style={{ minWidth: '780px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1fr 1fr 2.5fr 1fr', padding: '12px 16px', backgroundColor: '#0d1527', borderBottom: '1px solid rgba(0, 245, 255, 0.2)', fontSize: '0.75rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              <span>ALGORITHM</span>
              <span>CATEGORY</span>
              <span>TIME</span>
              <span>SPACE</span>
              <span>KEY INTERVIEW SIGNALS</span>
              <span>SIMULATOR</span>
            </div>

            {CHEAT_SHEET_DATA.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1.2fr 1fr 1fr 2.5fr 1fr',
                  padding: '12px 16px',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  backgroundColor: idx % 2 === 0 ? 'rgba(16, 28, 54, 0.3)' : 'transparent',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem'
                }}
              >
                <span style={{ color: '#fff', fontWeight: 700 }}>
                  {row.algo}
                </span>
                <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                  {row.cat}
                </span>
                <span style={{ color: 'var(--neon-green)', fontWeight: 600 }}>
                  {row.time}
                </span>
                <span style={{ color: 'var(--neon-magenta)', fontWeight: 600 }}>
                  {row.space}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>
                  {row.signal}
                </span>
                <div>
                  {onOpenVisualizer && (
                    <button
                      onClick={() => onOpenVisualizer(row.visualizer)}
                      className="cyber-btn"
                      style={{ padding: '4px 8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <PlayCircle size={12} />
                      <span>Sim</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Quick Interview Guide Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} color="var(--neon-magenta)" />
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
            Guía Rápida de Decisión durante la Entrevista
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: 'var(--neon-cyan)' }}>
              ¿El arreglo está ORDENADO o es monótono?
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ➡️ Piensa inmediatamente en <strong>Búsqueda Binaria</strong> ($O(\log N)$) o técnica de <strong>Dos Punteros</strong> ($O(N)$).
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(57, 255, 20, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: 'var(--neon-green)' }}>
              ¿Piden subarreglo contiguo que maximice/minimice una condición?
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ➡️ Piensa en <strong>Ventana Deslizante (Sliding Window)</strong> para evitar evaluar todos los $O(N^2)$ subarreglos.
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(255, 0, 127, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: 'var(--neon-magenta)' }}>
              ¿Piden el número total de formas o el valor óptimo?
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ➡️ Usar <strong>Programación Dinámica (DP)</strong> mediante memorización o tabulación de subproblemas.
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(255, 214, 10, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: 'var(--neon-yellow)' }}>
              ¿Piden mostrar TODAS las posibles combinaciones o permutaciones?
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ➡️ Usar <strong>Backtracking (DFS)</strong> recorriendo el árbol de decisiones y podando ramas inválidas.
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(0, 180, 216, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: '#00b4d8' }}>
              ¿Encontrar el camino más corto en un laberinto o grafo?
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ➡️ Usar <strong>BFS</strong> si cada paso cuesta 1 (sin pesos), o <strong>Dijkstra</strong> si los pasos tienen costos positivos variables.
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(181, 23, 158, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: '#d946ef' }}>
              ¿Consultas continuas de los Top-K o mediana en tiempo real?
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ➡️ Mantener un <strong>Min/Max Heap (Priority Queue)</strong> acotado a tamaño $K$ para inserciones en $O(\log K)$.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
