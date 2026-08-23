import type { FlowchartNode } from '../types/flowchart';

export const FLOWCHART_ROOT_ID = 'root';
export const FLOWCHART_ALGO_SHOWDOWN_ROOT_ID = 'root-algo-vs-algo';

// ==========================================
// TREE 1: Problem Structure & Classification
// ==========================================
export const FLOWCHART_NODES: Record<string, FlowchartNode> = {
  'root': {
    id: 'root',
    question: 'What is the primary input structure or problem classification?',
    subtitle: 'Identify the fundamental nature of the input data or core question constraint',
    category: 'general',
    tags: ['Start', 'Classification', 'Decision Tree'],
    options: [
      { id: 'opt-graph', label: '1. Graph or Tree Structure', nextNodeId: 'node-graph-1' },
      { id: 'opt-sorted', label: '2. Sorted Input / Monotonic Predicate', nextNodeId: 'node-sorted-1' },
      { id: 'opt-kth', label: '3. Kth Largest / Smallest Element', nextNodeId: 'node-kth-1' },
      { id: 'opt-linked-list', label: '4. Linked List Operations', nextNodeId: 'node-ll-1' },
      { id: 'opt-lookup', label: '5. Fast Lookup, Frequencies, or Grouping', nextNodeId: 'node-lookup-1' },
      { id: 'opt-intervals', label: '6. Intervals & Overlapping Time Ranges', nextNodeId: 'node-intervals-1' },
      { id: 'opt-partition', label: '7. In-Place Array Partitioning', nextNodeId: 'node-partition-1' },
      { id: 'opt-string-dict', label: '8. Strings, Dictionaries & Prefixes', nextNodeId: 'node-strings-1' },
      { id: 'opt-subarray', label: '9. Contiguous Subarray or Substring', nextNodeId: 'node-subarray-1' },
      { id: 'opt-ways-opt', label: '10. Count Number of Ways / Maximize / Minimize', nextNodeId: 'node-dp-1' }
    ]
  },

  // 1. GRAPHS AND TREES
  'node-graph-1': {
    id: 'node-graph-1',
    question: 'Is the structure specifically a Tree (connected, acyclic)?',
    subtitle: 'A tree has N nodes and exactly N-1 edges without cycles',
    category: 'graph',
    options: [
      { id: 'opt-tree-yes', label: 'Yes, it is a Tree (Hierarchical)', nextNodeId: 'node-tree-options' },
      { id: 'opt-tree-no', label: 'No, it is a General Graph / Network Grid', nextNodeId: 'node-graph-general' }
    ]
  },

  'node-tree-options': {
    id: 'node-tree-options',
    question: 'What is the required operation or query on the Tree?',
    subtitle: 'Identify the tree exploration strategy',
    category: 'tree',
    options: [
      { id: 'opt-tree-count', label: 'Count or generate unique BST structures -> Tree DP', algorithmResultId: 'tree-dp' },
      { id: 'opt-tree-level', label: 'Level-order traversal / Shortest depth answer -> Tree BFS', algorithmResultId: 'tree-bfs' },
      { id: 'opt-tree-dfs', label: 'Ancestors (LCA) / Max Depth / BST Validation -> Tree DFS', algorithmResultId: 'tree-dfs' }
    ]
  },

  'node-graph-general': {
    id: 'node-graph-general',
    question: 'What type of graph problem are you solving?',
    subtitle: 'Identify prerequisites, shortest paths, or connectivity',
    category: 'graph',
    options: [
      { id: 'opt-dag', label: 'Directed Acyclic Graph (DAG) prerequisites -> Topological Sort', algorithmResultId: 'topological-sort' },
      { id: 'opt-shortest', label: 'Shortest Path query?', nextNodeId: 'node-graph-shortest' },
      { id: 'opt-connectivity', label: 'Connectivity / Disjoint Sets / Cycle Detection -> Union-Find', algorithmResultId: 'union-find' },
      { id: 'opt-small-grid', label: '2D Grid / Connected Islands / Maze Exploration -> Grid BFS', algorithmResultId: 'graph-bfs' }
    ]
  },

  'node-graph-shortest': {
    id: 'node-graph-shortest',
    question: 'Does the graph have edge weights/costs (Weighted)?',
    subtitle: 'Edge costs dictate whether Dijkstra or standard BFS is optimal',
    category: 'graph',
    options: [
      { id: 'opt-dijkstra', label: 'Yes, edges have positive weights (>= 0) -> Dijkstra\'s Algorithm', algorithmResultId: 'dijkstra' },
      { id: 'opt-bfs-unweighted', label: 'No, unweighted / uniform step cost 1 -> Standard BFS', algorithmResultId: 'graph-bfs' }
    ]
  },

  // 2. SORTED INPUT / MONOTONIC
  'node-sorted-1': {
    id: 'node-sorted-1',
    question: 'What is the goal on the sorted input or monotonic condition?',
    subtitle: 'Logarithmic search, pair matching, or dynamic range aggregations',
    category: 'binary_search',
    options: [
      { id: 'opt-bs-single', label: 'Search value / Monotonic answer predicate -> Binary Search O(log N)', algorithmResultId: 'binary-search' },
      { id: 'opt-two-pointers-sorted', label: 'Find pairs or triplets (Two Sum II, 3Sum) -> Two Pointers O(N)', algorithmResultId: 'two-pointers' }
    ]
  },

  // 3. KTH ELEMENT
  'node-kth-1': {
    id: 'node-kth-1',
    question: 'Are you tracking the Kth extreme element or Top-K frequent items?',
    subtitle: 'Priority queues enable O(N log K) efficiency without full sorting',
    category: 'heap',
    options: [
      { id: 'opt-heap-topk', label: 'Maintain Min-Heap of size K (Top-K / Kth Largest)', algorithmResultId: 'heap-topk' }
    ]
  },

  // 4. LINKED LISTS
  'node-ll-1': {
    id: 'node-ll-1',
    question: 'What operation is required on the Linked List?',
    subtitle: 'Cycle detection, merging, or in-place pointer reversal',
    category: 'linked_list',
    options: [
      { id: 'opt-ll-cycle', label: 'Fast & Slow Pointers (Cycle Detection / Middle Node)', algorithmResultId: 'two-pointers' },
      { id: 'opt-ll-merge', label: 'Merge K Sorted Lists -> Min-Heap / Priority Queue', algorithmResultId: 'heap-topk' },
      { id: 'opt-ll-manip', label: 'In-place pointer reversal & reordering', algorithmResultId: 'two-pointers' }
    ]
  },

  // 5. HASH TABLE / LOOKUP
  'node-lookup-1': {
    id: 'node-lookup-1',
    question: 'Do you need instantaneous O(1) key lookup, counting, or anagram grouping?',
    category: 'general',
    options: [
      { id: 'opt-hash-map', label: 'Hash Table / Frequency Map / HashSet Lookups in O(1)', algorithmResultId: 'prefix-sum' }
    ]
  },

  // 6. INTERVALS
  'node-intervals-1': {
    id: 'node-intervals-1',
    question: 'Is this an interval scheduling or overlapping range problem [start, end]?',
    subtitle: 'Merging intervals, minimum meeting rooms, or non-overlapping selection',
    category: 'greedy',
    options: [
      { id: 'opt-intervals-greedy', label: 'Sort by Start/End + Greedy Interval Scan in O(N log N)', algorithmResultId: 'greedy-intervals' }
    ]
  },

  // 7. IN-PLACE PARTITIONING
  'node-partition-1': {
    id: 'node-partition-1',
    question: 'Do you need to partition elements in-place in O(1) space?',
    subtitle: 'Dutch National Flag, zero moving, or pivot partitioning',
    category: 'array_string',
    options: [
      { id: 'opt-two-pointers-partition', label: 'Two Pointers / 3-Way Partitioning (Sort Colors)', algorithmResultId: 'two-pointers' }
    ]
  },

  // 8. STRINGS & DICTIONARY
  'node-strings-1': {
    id: 'node-strings-1',
    question: 'What string or dictionary query are you performing?',
    category: 'array_string',
    options: [
      { id: 'opt-trie-match', label: 'Prefix search / Word dictionary matching in O(L) -> Trie', algorithmResultId: 'trie-patterns' },
      { id: 'opt-word-break', label: 'String segmentation with dictionary (Word Break) -> Trie + DP', algorithmResultId: 'trie-patterns' }
    ]
  },

  // 9. SUBARRAY OR SUBSTRING
  'node-subarray-1': {
    id: 'node-subarray-1',
    question: 'What property are you analyzing on the contiguous subarray/substring?',
    subtitle: 'Window conditions, running sums, or nearest boundary bounds',
    category: 'array_string',
    options: [
      { id: 'opt-sub-window', label: 'Maintain a dynamic valid window [L, R] -> Sliding Window', algorithmResultId: 'sliding-window' },
      { id: 'opt-sub-sum', label: 'Cumulative sum / Subarray Sum Equals K -> Prefix Sums + HashMap', algorithmResultId: 'prefix-sum' },
      { id: 'opt-sub-monotonic', label: 'Nearest greater/smaller bounds -> Monotonic Stack', algorithmResultId: 'monotonic-stack' }
    ]
  },

  // 10. DP / OPTIMIZATION
  'node-dp-1': {
    id: 'node-dp-1',
    question: 'Are you counting total ways, or optimizing dependent choices?',
    subtitle: 'Overlapping subproblems and optimal substructure',
    category: 'dp',
    options: [
      { id: 'opt-dp-classic', label: 'Dynamic Programming (1D / 2D Tabulation / Coin Change)', algorithmResultId: 'dp-general' },
      { id: 'opt-greedy-choice', label: 'Provably optimal local choice -> Greedy Algorithms', algorithmResultId: 'greedy-intervals' }
    ]
  }
};

// ==========================================
// TREE 2: Algorithm Tradeoff & Showdown Tree ("When to Use What")
// ==========================================
export const FLOWCHART_ALGO_SHOWDOWN_NODES: Record<string, FlowchartNode> = {
  'root-algo-vs-algo': {
    id: 'root-algo-vs-algo',
    question: 'Which algorithmic tradeoff do you need to evaluate?',
    subtitle: 'Directly compare competing algorithms to select the optimal time and space complexity',
    category: 'general',
    tags: ['Tradeoffs', 'Showdown', 'Decision Matrix'],
    options: [
      { id: 'comp-bfs-dfs', label: '1. BFS vs DFS: Shortest Path vs Deep Backtracking', nextNodeId: 'comp-node-bfs-dfs' },
      { id: 'comp-window-pointers', label: '2. Sliding Window vs Two Pointers: Subarray vs Pairs', nextNodeId: 'comp-node-window-pointers' },
      { id: 'comp-dp-greedy', label: '3. Dynamic Programming vs Greedy: Global Substructure vs Local Choice', nextNodeId: 'comp-node-dp-greedy' },
      { id: 'comp-binary-heap', label: '4. Binary Search vs Heap: Monotonic Predicate vs Streaming Top-K', nextNodeId: 'comp-node-binary-heap' },
      { id: 'comp-stack-dp', label: '5. Monotonic Stack vs DP: Boundary Neighbors vs Combinatorics', nextNodeId: 'comp-node-stack-dp' }
    ]
  },

  'comp-node-bfs-dfs': {
    id: 'comp-node-bfs-dfs',
    question: 'Is your primary goal the shortest path / minimum distance, or exhaustive path exploration?',
    subtitle: 'BFS uses FIFO queue for concentric rings; DFS uses recursion stack for deep branches',
    category: 'graph',
    options: [
      { id: 'opt-choose-bfs', label: 'Shortest path in unweighted graph / Level-order tree -> Choose BFS O(V + E)', algorithmResultId: 'graph-bfs' },
      { id: 'opt-choose-dfs', label: 'Find all solutions, permutations, or tree LCA -> Choose DFS / Backtracking', algorithmResultId: 'tree-dfs' }
    ]
  },

  'comp-node-window-pointers': {
    id: 'comp-node-window-pointers',
    question: 'Is the problem about a contiguous subsegment, or finding pairs/triplets in a sorted array?',
    subtitle: 'Sliding Window maintains [L..R] span; Two Pointers move from opposite ends',
    category: 'array_string',
    options: [
      { id: 'opt-choose-window', label: 'Contiguous subarray with sum / length bound -> Choose Sliding Window O(N)', algorithmResultId: 'sliding-window' },
      { id: 'opt-choose-pointers', label: 'Two Sum II, 3Sum, Palindrome, or in-place reversal -> Choose Two Pointers O(N)', algorithmResultId: 'two-pointers' }
    ]
  },

  'comp-node-dp-greedy': {
    id: 'comp-node-dp-greedy',
    question: 'Does each local choice permanently fix the outcome, or must you combine multiple subproblem states?',
    subtitle: 'Greedy never reconsiders choices; DP memoizes subproblems for global optimality',
    category: 'dp',
    options: [
      { id: 'opt-choose-greedy', label: 'Locally optimal choice is mathematically proven globally optimal (Intervals) -> Choose Greedy', algorithmResultId: 'greedy-intervals' },
      { id: 'opt-choose-dp', label: 'Decisions depend on subproblem results (Coin Change, Knapsack) -> Choose Dynamic Programming', algorithmResultId: 'dp-general' }
    ]
  },

  'comp-node-binary-heap': {
    id: 'comp-node-binary-heap',
    question: 'Do you have a fixed sorted array / monotonic test, or a dynamic streaming collection for Top-K?',
    category: 'binary_search',
    options: [
      { id: 'opt-choose-bs', label: 'Monotonic predicate (T/F boundary) or sorted array -> Choose Binary Search O(log N)', algorithmResultId: 'binary-search' },
      { id: 'opt-choose-heap', label: 'Continuous stream or dynamic Kth largest without full sort -> Choose Min/Max-Heap O(N log K)', algorithmResultId: 'heap-topk' }
    ]
  },

  'comp-node-stack-dp': {
    id: 'comp-node-stack-dp',
    question: 'Are you searching for nearest greater/smaller boundary elements, or computing optimal decision states?',
    category: 'array_string',
    options: [
      { id: 'opt-choose-stack', label: 'Next Warmer Temperature / Largest Rectangle in Histogram -> Choose Monotonic Stack O(N)', algorithmResultId: 'monotonic-stack' },
      { id: 'opt-choose-dp2', label: 'Longest Increasing Subsequence / Edit Distance -> Choose Dynamic Programming', algorithmResultId: 'dp-general' }
    ]
  }
};
