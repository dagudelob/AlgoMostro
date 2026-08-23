import type { FlowchartNode } from '../types/flowchart';

export const FLOWCHART_ROOT_ID = 'root';

export const FLOWCHART_NODES: Record<string, FlowchartNode> = {
  'root': {
    id: 'root',
    question: 'What is the primary data structure or problem type described?',
    subtitle: 'Identify the fundamental nature of the input or problem domain',
    category: 'general',
    tags: ['Input', 'Start', 'Diagnostics'],
    options: [
      { id: 'opt-graph', label: '1. Graph or Tree Structure', nextNodeId: 'node-graph-1' },
      { id: 'opt-sorted', label: '2. Sorted Input / Monotonic Predicate', nextNodeId: 'node-sorted-1' },
      { id: 'opt-kth', label: '3. Kth Largest / Smallest Element', nextNodeId: 'node-kth-1' },
      { id: 'opt-linked-list', label: '4. Linked List', nextNodeId: 'node-ll-1' },
      { id: 'opt-lookup', label: '5. Fast Lookup, Frequencies, or Grouping', nextNodeId: 'node-lookup-1' },
      { id: 'opt-intervals', label: '6. Intervals / Time Ranges', nextNodeId: 'node-intervals-1' },
      { id: 'opt-string-dict', label: '7. Strings / Dictionaries / Prefixes', nextNodeId: 'node-strings-1' },
      { id: 'opt-subarray', label: '8. Contiguous Subarray or Substring', nextNodeId: 'node-subarray-1' },
      { id: 'opt-ways-opt', label: '9. Count Number of Ways / Maximize or Minimize', nextNodeId: 'node-dp-1' },
      { id: 'opt-simulation', label: '10. Simulation / Bitmask / Object Design', nextNodeId: 'node-sim-1' }
    ]
  },

  // 1. GRAPHS AND TREES
  'node-graph-1': {
    id: 'node-graph-1',
    question: 'Is the structure specifically a Tree (acyclic, hierarchical)?',
    subtitle: 'A tree is a connected acyclic graph with N nodes and N-1 edges',
    category: 'graph',
    options: [
      { id: 'opt-tree-yes', label: 'Yes, it is a Tree', nextNodeId: 'node-tree-options' },
      { id: 'opt-tree-no', label: 'No, it is a General Graph', nextNodeId: 'node-graph-general' }
    ]
  },

  'node-tree-options': {
    id: 'node-tree-options',
    question: 'What is the goal or query on the Tree?',
    subtitle: 'Identify the property or metric you need to compute',
    category: 'tree',
    options: [
      { id: 'opt-tree-count', label: 'Count or generate unique trees / Tree DP', algorithmResultId: 'tree-dp' },
      { id: 'opt-tree-level', label: 'Level-order traversal / Shortest level distance', algorithmResultId: 'tree-bfs' },
      { id: 'opt-tree-dfs', label: 'Ancestors (LCA) / Max Depth / BST Validation', algorithmResultId: 'tree-dfs' }
    ]
  },

  'node-graph-general': {
    id: 'node-graph-general',
    question: 'What type of graph problem are you solving?',
    subtitle: 'Dependencies, shortest path, or connectivity',
    category: 'graph',
    options: [
      { id: 'opt-dag', label: 'Directed Acyclic Graph (DAG) with prerequisites / dependencies?', algorithmResultId: 'topological-sort' },
      { id: 'opt-shortest', label: 'Shortest Path problem?', nextNodeId: 'node-graph-shortest' },
      { id: 'opt-connectivity', label: 'Connectivity / Connected Components / Cycle Detection?', algorithmResultId: 'union-find' },
      { id: 'opt-small-grid', label: '2D Grid / Maze / Small constraints?', algorithmResultId: 'graph-bfs' }
    ]
  },

  'node-graph-shortest': {
    id: 'node-graph-shortest',
    question: 'Does the graph have edge weights/costs (Weighted)?',
    subtitle: 'Edge weights dictate whether Dijkstra or BFS is optimal',
    category: 'graph',
    options: [
      { id: 'opt-dijkstra', label: 'Yes, edges have weights >= 0', algorithmResultId: 'dijkstra' },
      { id: 'opt-bfs-unweighted', label: 'No, unweighted / uniform step cost 1', algorithmResultId: 'graph-bfs' }
    ]
  },

  // 2. SORTED INPUT / MONOTONIC
  'node-sorted-1': {
    id: 'node-sorted-1',
    question: 'Is the input sorted or does the answer satisfy a monotonic predicate?',
    subtitle: 'Logarithmic search or dynamic range queries',
    category: 'binary_search',
    options: [
      { id: 'opt-bs-single', label: 'Search value / Monotonic answer in O(log N)', algorithmResultId: 'binary-search' },
      { id: 'opt-two-pointers-sorted', label: 'Find pairs or sums in sorted array (Two Sum II)', algorithmResultId: 'two-pointers' },
      { id: 'opt-range-dynamic', label: 'Range queries with point/range updates', nextNodeId: 'node-segment-tree' }
    ]
  },

  'node-segment-tree': {
    id: 'node-segment-tree',
    question: 'Do you need dynamic element updates and range queries in O(log N)?',
    category: 'binary_search',
    options: [
      { id: 'opt-fenwick', label: 'Yes, Segment Tree / Fenwick Tree (Binary Indexed Tree)', algorithmResultId: 'prefix-sum' },
      { id: 'opt-bs-static', label: 'Static queries only -> Prefix Sum', algorithmResultId: 'prefix-sum' }
    ]
  },

  // 3. KTH ELEMENT
  'node-kth-1': {
    id: 'node-kth-1',
    question: 'Are you finding the Kth extreme element or Top-K frequent items?',
    subtitle: 'Efficient priority management without full O(N log N) sorting',
    category: 'heap',
    options: [
      { id: 'opt-heap-topk', label: 'Use Min-Heap / Max-Heap or QuickSelect in O(N log K)', algorithmResultId: 'heap-topk' }
    ]
  },

  // 4. LINKED LISTS
  'node-ll-1': {
    id: 'node-ll-1',
    question: 'What operation is required on the Linked List?',
    subtitle: 'Cycle detection, merging lists, or pointer manipulation',
    category: 'linked_list',
    options: [
      { id: 'opt-ll-cycle', label: 'Fast & Slow Pointers (Cycle Detection / Middle Node)', algorithmResultId: 'two-pointers' },
      { id: 'opt-ll-merge', label: 'Merge K Sorted Lists', algorithmResultId: 'heap-topk' },
      { id: 'opt-ll-manip', label: 'In-place pointer reversal (next / prev)', algorithmResultId: 'two-pointers' }
    ]
  },

  // 5. HASH TABLE / LOOKUP
  'node-lookup-1': {
    id: 'node-lookup-1',
    question: 'Do you need O(1) lookups, frequency counting, or anagram grouping?',
    category: 'general',
    options: [
      { id: 'opt-hash-map', label: 'Hash Table / Frequency Map / HashSet', algorithmResultId: 'prefix-sum' }
    ]
  },

  // 6. INTERVALS
  'node-intervals-1': {
    id: 'node-intervals-1',
    question: 'Is this an interval scheduling or range overlap problem [start, end]?',
    subtitle: 'Merging intervals, minimum meeting rooms, or non-overlapping selection',
    category: 'greedy',
    options: [
      { id: 'opt-intervals-greedy', label: 'Sort by Start/End + Greedy Interval Scan', algorithmResultId: 'greedy-intervals' }
    ]
  },

  // 7. STRINGS & DICTIONARY
  'node-strings-1': {
    id: 'node-strings-1',
    question: 'Are you matching prefixes, searching dictionary words, or segmenting strings?',
    category: 'array_string',
    options: [
      { id: 'opt-trie-match', label: 'Trie / Prefix Tree / Prefix Search in O(L)', algorithmResultId: 'trie-patterns' },
      { id: 'opt-word-break', label: 'Segment string with dictionary (Word Break) -> Trie + DP', algorithmResultId: 'trie-patterns' }
    ]
  },

  // 8. SUBARRAY OR SUBSTRING
  'node-subarray-1': {
    id: 'node-subarray-1',
    question: 'What property are you analyzing on the contiguous subarray/substring?',
    subtitle: 'Sum of elements, unique characters in window, or nearest greater bounds',
    category: 'array_string',
    options: [
      { id: 'opt-sub-window', label: 'Maintain a valid window (Longest Substring / Min Subarray)', algorithmResultId: 'sliding-window' },
      { id: 'opt-sub-sum', label: 'Cumulative sum or Subarray Sum Equals K', algorithmResultId: 'prefix-sum' },
      { id: 'opt-sub-monotonic', label: 'Nearest greater/smaller bounds / Trapping Rain Water', algorithmResultId: 'monotonic-stack' }
    ]
  },

  // 9. DP / OPTIMIZATION
  'node-dp-1': {
    id: 'node-dp-1',
    question: 'Are you counting the total number of ways, or optimizing dependent decisions?',
    subtitle: 'Overlapping subproblems and optimal substructure',
    category: 'dp',
    options: [
      { id: 'opt-dp-classic', label: 'Dynamic Programming (1D / 2D / Knapsack / Coin Change)', algorithmResultId: 'dp-general' },
      { id: 'opt-greedy-choice', label: 'Provably optimal local greedy choice', algorithmResultId: 'greedy-intervals' }
    ]
  },

  // 10. SIMULATION / BITMASK
  'node-sim-1': {
    id: 'node-sim-1',
    question: 'Is this a small subset state problem (N <= 20) or system design?',
    category: 'general',
    options: [
      { id: 'opt-bitmask', label: 'Bitmask DP (N <= 20)', algorithmResultId: 'dp-general' },
      { id: 'opt-simulation-basic', label: 'Direct Simulation with auxiliary data structures', algorithmResultId: 'prefix-sum' }
    ]
  }
};
