import type { FlowchartNode } from '../types/flowchart';

export const FLOWCHART_ROOT_ID = 'root';

export const FLOWCHART_NODES: Record<string, FlowchartNode> = {
  'root': {
    id: 'root',
    question: 'What is the primary data structure or problem classification?',
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
      { id: 'opt-ways-opt', label: '10. Count Number of Ways / Maximize / Minimize', nextNodeId: 'node-dp-1' },
      { id: 'opt-bitmask', label: '11. Subset State (N <= 20) / Bit Manipulation', nextNodeId: 'node-bit-1' },
      { id: 'opt-design', label: '12. Object Design with Fast Operations (LRU / LFU)', nextNodeId: 'node-design-1' }
    ]
  },

  // 1. GRAPHS AND TREES
  'node-graph-1': {
    id: 'node-graph-1',
    question: 'Is the structure specifically a Tree (connected, acyclic)?',
    subtitle: 'A tree has N nodes and exactly N-1 edges without cycles',
    category: 'graph',
    options: [
      { id: 'opt-tree-yes', label: 'Yes, it is a Tree', nextNodeId: 'node-tree-options' },
      { id: 'opt-tree-no', label: 'No, it is a General Graph / Network', nextNodeId: 'node-graph-general' }
    ]
  },

  'node-tree-options': {
    id: 'node-tree-options',
    question: 'What is the required operation or query on the Tree?',
    subtitle: 'Identify the tree exploration strategy',
    category: 'tree',
    options: [
      { id: 'opt-tree-count', label: 'Count or generate unique BST structures / Tree DP', algorithmResultId: 'tree-dp' },
      { id: 'opt-tree-level', label: 'Level-order traversal / Shortest depth answer', algorithmResultId: 'tree-bfs' },
      { id: 'opt-tree-dfs', label: 'Ancestors (LCA) / Max Depth / BST Validation (Pre/In/Post)', algorithmResultId: 'tree-dfs' }
    ]
  },

  'node-graph-general': {
    id: 'node-graph-general',
    question: 'What type of graph problem are you solving?',
    subtitle: 'Identify prerequisites, shortest paths, or connectivity',
    category: 'graph',
    options: [
      { id: 'opt-dag', label: 'Directed Acyclic Graph (DAG) with prerequisites -> Topological Sort', algorithmResultId: 'topological-sort' },
      { id: 'opt-shortest', label: 'Shortest Path / Minimum steps query?', nextNodeId: 'node-graph-shortest' },
      { id: 'opt-connectivity', label: 'Connectivity / Disjoint Sets / Cycle Detection?', algorithmResultId: 'union-find' },
      { id: 'opt-small-grid', label: '2D Matrix Grid / Connected Islands / Maze Exploration?', algorithmResultId: 'graph-bfs' }
    ]
  },

  'node-graph-shortest': {
    id: 'node-graph-shortest',
    question: 'Does the graph have edge weights/costs (Weighted)?',
    subtitle: 'Edge costs dictate whether Dijkstra or standard BFS is optimal',
    category: 'graph',
    options: [
      { id: 'opt-dijkstra', label: 'Yes, edges have positive weights (>= 0) -> Dijkstra\'s Algorithm', algorithmResultId: 'dijkstra' },
      { id: 'opt-bfs-unweighted', label: 'No, unweighted / uniform step cost 1 -> BFS', algorithmResultId: 'graph-bfs' }
    ]
  },

  // 2. SORTED INPUT / MONOTONIC
  'node-sorted-1': {
    id: 'node-sorted-1',
    question: 'What is the goal on the sorted input or monotonic condition?',
    subtitle: 'Logarithmic search, pair matching, or dynamic range aggregations',
    category: 'binary_search',
    options: [
      { id: 'opt-bs-single', label: 'Search value / Monotonic answer predicate in O(log N)', algorithmResultId: 'binary-search' },
      { id: 'opt-two-pointers-sorted', label: 'Find pairs or triplets (Two Sum II, 3Sum) in O(N)', algorithmResultId: 'two-pointers' },
      { id: 'opt-range-dynamic', label: 'Dynamic range sum/order queries with updates', nextNodeId: 'node-segment-tree' }
    ]
  },

  'node-segment-tree': {
    id: 'node-segment-tree',
    question: 'Do you require dynamic element updates and range queries in O(log N)?',
    category: 'binary_search',
    options: [
      { id: 'opt-fenwick', label: 'Yes, Fenwick Tree (BIT) / Segment Tree in O(log N)', algorithmResultId: 'prefix-sum' },
      { id: 'opt-bs-static', label: 'Static array queries only -> Prefix Sum in O(1)', algorithmResultId: 'prefix-sum' }
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
      { id: 'opt-ll-merge', label: 'Merge K Sorted Lists -> Min-Heap / Divide & Conquer', algorithmResultId: 'heap-topk' },
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
    question: 'Do you need to partition or segregate elements in-place in O(1) space?',
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
    question: 'Are you counting the total number of ways, or optimizing dependent decisions?',
    subtitle: 'Overlapping subproblems and optimal substructure',
    category: 'dp',
    options: [
      { id: 'opt-dp-classic', label: 'Dynamic Programming (1D / 2D Tabulation / Coin Change)', algorithmResultId: 'dp-general' },
      { id: 'opt-greedy-choice', label: 'Provably optimal local choice -> Greedy Algorithms', algorithmResultId: 'greedy-intervals' }
    ]
  },

  // 11. BITMASK & BIT MANIPULATION
  'node-bit-1': {
    id: 'node-bit-1',
    question: 'Is this a small subset state (N <= 20) or bitwise property query?',
    category: 'general',
    options: [
      { id: 'opt-bitmask-dp', label: 'Bitmask DP (N <= 20 state compression)', algorithmResultId: 'dp-general' },
      { id: 'opt-bitwise-tricks', label: 'Bitwise XOR / Single Number / Bit Counting in O(1) space', algorithmResultId: 'binary-search' }
    ]
  },

  // 12. OBJECT DESIGN
  'node-design-1': {
    id: 'node-design-1',
    question: 'What operational time guarantees are required for the custom data structure?',
    subtitle: 'LRU Cache, LFU Cache, or Min Stack',
    category: 'design',
    options: [
      { id: 'opt-lru-design', label: 'O(1) Get & Put with Eviction -> Doubly Linked List + HashMap (LRU Cache)', algorithmResultId: 'two-pointers' },
      { id: 'opt-min-stack', label: 'O(1) Push, Pop & GetMin -> Stack with Auxiliary Minimum Stack', algorithmResultId: 'monotonic-stack' }
    ]
  }
};
