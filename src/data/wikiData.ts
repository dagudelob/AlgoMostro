export interface WikiArticle {
  id: string;
  category: 'data_structures' | 'algorithms' | 'dynamic_programming' | 'complexity' | 'decision_matrix' | 'glossary';
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  timeComplexity?: string;
  spaceComplexity?: string;
  summary: string;
  whenToUse: string[];
  keySignals: string[];
  commonPitfalls: string[];
  exampleSnippet?: string;
  relatedVisualizer?: string;
}

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  example: string;
  relatedPattern?: string;
}

export interface ComplexityGuideItem {
  notation: string;
  name: string;
  nLimit: string;
  typicalAlgorithms: string[];
  color: string;
}

export const BIG_O_CHEATSHEET: ComplexityGuideItem[] = [
  {
    notation: 'O(1)',
    name: 'Constant Time',
    nLimit: 'Any N (10^18+)',
    typicalAlgorithms: ['Hash Map lookup', 'Array index access', 'Push/Pop to stack', 'Bitwise operations', 'Math formulas'],
    color: '#39ff14'
  },
  {
    notation: 'O(log N)',
    name: 'Logarithmic Time',
    nLimit: 'N <= 10^18',
    typicalAlgorithms: ['Binary Search', 'Balanced BST search', 'Greatest Common Divisor (Euclidean)', 'Matrix Exponentiation'],
    color: '#00f5ff'
  },
  {
    notation: 'O(N)',
    name: 'Linear Time',
    nLimit: 'N <= 10^7',
    typicalAlgorithms: ['Two Pointers', 'Sliding Window', 'Prefix Sums', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Kadane\'s Algorithm'],
    color: '#38bdf8'
  },
  {
    notation: 'O(N log N)',
    name: 'Linearithmic Time',
    nLimit: 'N <= 10^5 - 10^6',
    typicalAlgorithms: ['Merge Sort', 'Quick Sort', 'Heap Operations (N inserts)', 'Dijkstra with Priority Queue', 'Interval Scanning after Sort'],
    color: '#ffd60a'
  },
  {
    notation: 'O(N^2)',
    name: 'Quadratic Time',
    nLimit: 'N <= 5,000',
    typicalAlgorithms: ['Nested loops', '2D Dynamic Programming (LCS, Edit Distance)', 'Bubble / Insertion Sort', 'All-pairs comparisons'],
    color: '#ff9e00'
  },
  {
    notation: 'O(2^N)',
    name: 'Exponential Time',
    nLimit: 'N <= 20 - 25',
    typicalAlgorithms: ['Subset Generation', 'Naive Recursion (Fibonacci)', 'Travelling Salesperson (Brute Force)', '0/1 Knapsack (Brute Force)'],
    color: '#ff007f'
  },
  {
    notation: 'O(N!)',
    name: 'Factorial Time',
    nLimit: 'N <= 10 - 12',
    typicalAlgorithms: ['Permutations of Array', 'Brute Force N-Queens', 'Exact graph matching'],
    color: '#ff3366'
  }
];

export const ALGORITHM_DECISION_RULES = [
  {
    signal: 'Array is sorted OR problem asks for minimum/maximum feasible value',
    recommendation: 'Binary Search O(log N)',
    why: 'Monotonic property allows eliminating half of search space per step.',
    exampleLC: 'LC #704 (Binary Search), LC #875 (Koko Eating Bananas)'
  },
  {
    signal: 'Contiguous subarray with sum, minimum length, or at most K distinct elements',
    recommendation: 'Sliding Window O(N)',
    why: 'Expands right pointer to satisfy constraint, shrinks left pointer to optimize.',
    exampleLC: 'LC #3 (Longest Substring Without Repeating Characters), LC #209 (Min Subarray Sum)'
  },
  {
    signal: 'Sorted array pair sums, palindrome verification, or in-place element reversal',
    recommendation: 'Two Pointers O(N)',
    why: 'Converging or equidistant pointers prune search space in linear time without extra memory.',
    exampleLC: 'LC #167 (Two Sum II), LC #15 (3Sum), LC #11 (Container With Most Water)'
  },
  {
    signal: 'Shortest path in unweighted graph/grid OR level-by-level tree traversal',
    recommendation: 'Breadth-First Search (BFS) O(V + E)',
    why: 'FIFO queue processes nodes in strictly increasing distance wavefronts.',
    exampleLC: 'LC #102 (Binary Tree Level Order Traversal), LC #200 (Number of Islands)'
  },
  {
    signal: 'Exhaustive exploration, connected components, tree ancestor queries, or backtracking permutations',
    recommendation: 'Depth-First Search (DFS) / Backtracking',
    why: 'Recursion stack explores deeply along branches with backtracking state restoration.',
    exampleLC: 'LC #79 (Word Search), LC #46 (Permutations), LC #236 (Lowest Common Ancestor)'
  },
  {
    signal: 'Shortest path in weighted graph with non-negative edge costs',
    recommendation: 'Dijkstra\'s Algorithm O(E log V)',
    why: 'Min-Heap priority queue always relaxes the lowest tentative distance node next.',
    exampleLC: 'LC #743 (Network Delay Time), LC #787 (Cheapest Flights Within K Stops)'
  },
  {
    signal: 'Top-K frequent elements, Kth largest, or merging K sorted streams',
    recommendation: 'Min-Heap / Max-Heap O(N log K)',
    why: 'Keeps heap bound to size K, discarding lower priority elements in O(log K) per insert.',
    exampleLC: 'LC #215 (Kth Largest Element), LC #23 (Merge k Sorted Lists)'
  },
  {
    signal: 'Fast string prefix queries, autocomplete dictionary, or IP routing tables',
    recommendation: 'Trie (Prefix Tree) O(L)',
    why: 'Shared prefix branches avoid redundant string comparisons in O(L) where L is word length.',
    exampleLC: 'LC #208 (Implement Trie), LC #211 (Design Add and Search Words)'
  },
  {
    signal: 'Optimal substructure with overlapping subproblems (count ways, min cost, unbounded choices)',
    recommendation: 'Dynamic Programming (Tabulation / Memoization)',
    why: 'Breaks complex problem into subproblems and caches results to avoid exponential recomputation.',
    exampleLC: 'LC #322 (Coin Change), LC #300 (Longest Increasing Subsequence), LC #198 (House Robber)'
  },
  {
    signal: 'Nearest greater or smaller element on the left/right of each array element',
    recommendation: 'Monotonic Stack O(N)',
    why: 'Maintains an invariant of strictly increasing or decreasing elements in O(N) total push/pop.',
    exampleLC: 'LC #739 (Daily Temperatures), LC #84 (Largest Rectangle in Histogram)'
  },
  {
    signal: 'Dynamic connectivity, disjoint network components, or Kruskal\'s MST',
    recommendation: 'Disjoint Set Union (Union-Find) O(alpha(N))',
    why: 'Near O(1) amortized path compression and union by rank for cycle detection & cluster merge.',
    exampleLC: 'LC #547 (Number of Provinces), LC #684 (Redundant Connection)'
  },
  {
    signal: 'Range sum queries on static array in O(1) time',
    recommendation: 'Prefix Sums Array P[R+1] - P[L]',
    why: 'Precomputes cumulative sums in O(N), enabling instant O(1) range subtraction.',
    exampleLC: 'LC #303 (Range Sum Query), LC #560 (Subarray Sum Equals K)'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Amortized Time Complexity',
    category: 'Complexity',
    definition: 'The average time taken per operation over a worst-case sequence of operations. For example, dynamic array resizing takes O(N) occasionally, but averages O(1) amortized across all appends.',
    example: 'Dynamic Array (Vector/List) push_back() is amortized O(1).'
  },
  {
    term: 'Monotonicity',
    category: 'Algorithms',
    definition: 'A mathematical property where a sequence or function is entirely non-increasing or non-decreasing. Essential for Binary Search and Monotonic Stacks.',
    example: 'In Binary Search, predicate condition is [F, F, F, T, T, T].'
  },
  {
    term: 'Optimal Substructure',
    category: 'Dynamic Programming',
    definition: 'A problem exhibits optimal substructure if an optimal solution to the overall problem contains within it optimal solutions to subproblems.',
    example: 'Shortest path from A to C via B contains shortest path from A to B.'
  },
  {
    term: 'Overlapping Subproblems',
    category: 'Dynamic Programming',
    definition: 'A situation where a recursive algorithm revisits the exact same subproblem multiple times rather than generating new subproblems.',
    example: 'Computing fib(5) requires fib(3) computed in multiple recursive branches.'
  },
  {
    term: 'Two Pointers Technique',
    category: 'Algorithms',
    definition: 'An algorithmic technique using two index variables that move toward each other, in the same direction, or at different speeds to solve searching/partitioning in O(N).',
    example: 'Left and Right pointers moving inward in Two Sum II.'
  },
  {
    term: 'Sliding Window',
    category: 'Algorithms',
    definition: 'A sub-array or sub-string technique that maintains a continuous window of elements, expanding the right boundary and contracting the left boundary to meet criteria in O(N).',
    example: 'Longest substring without repeating characters using a frequency map.'
  },
  {
    term: 'Backtracking',
    category: 'Algorithms',
    definition: 'An algorithmic paradigm for finding all (or some) solutions by incrementally building candidates and abandoning ("backtracking") a candidate as soon as it cannot lead to a valid solution.',
    example: 'N-Queens, Sudoku Solver, Permutations.'
  },
  {
    term: 'Topological Sort',
    category: 'Graphs',
    definition: 'A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u comes before v in the ordering.',
    example: 'Course Schedule prerequisites using Kahn\'s Algorithm (indegree queue).'
  },
  {
    term: 'Union-Find (DSU)',
    category: 'Data Structures',
    definition: 'A data structure that tracks a set of elements partitioned into disjoint subsets, supporting Find (with path compression) and Union (by rank/size) in inverse Ackermann O(alpha(N)) time.',
    example: 'Connected components in network graph, Kruskal\'s Minimum Spanning Tree.'
  },
  {
    term: 'Monotonic Stack',
    category: 'Data Structures',
    definition: 'A stack whose elements are always strictly increasing or decreasing. Popping violating elements yields the next greater or smaller element in O(1) amortized time.',
    example: 'Finding the next warmer day in Daily Temperatures (LeetCode 739).'
  },
  {
    term: 'Prefix Sum',
    category: 'Algorithms',
    definition: 'An array where each index i stores the cumulative sum of elements from index 0 to i-1. Enables range sum queries in O(1) time: sum(L..R) = P[R+1] - P[L].',
    example: 'Subarray sum equals K combined with a hash map of prefix frequencies.'
  },
  {
    term: 'Bitmasking',
    category: 'Dynamic Programming',
    definition: 'Using the individual bits of an integer to represent a boolean set of items (e.g. integer 5 = 101_2 represents subset {0, 2}). Allows O(1) set operations via bitwise operators.',
    example: 'Travelling Salesperson DP over N <= 20 cities using state (mask, current_city).'
  }
];

export const WIKI_MODULES = [
  {
    id: 'module-ds',
    title: '1. Fundamental Data Structures',
    description: 'Master the 8 core building blocks: memory layouts, pointers, nodes, and algorithmic guarantees.',
    articles: [
      {
        id: 'art-arrays',
        title: 'Arrays & Dynamic Vectors',
        timeComplexity: 'Access O(1), Search O(N)',
        spaceComplexity: 'O(N)',
        summary: 'Contiguous blocks of memory providing O(1) random index access. Dynamic arrays resize geometrically (typically 2x factor) yielding amortized O(1) appends.',
        keyTakeaway: 'Use when random access is primary requirement or elements are indexed contiguously.'
      },
      {
        id: 'art-linked-lists',
        title: 'Linked Lists (Singly & Doubly)',
        timeComplexity: 'Insert/Delete at pointer O(1), Access O(N)',
        spaceComplexity: 'O(N)',
        summary: 'Nodes containing values and explicit pointer references. Doubly linked lists combined with HashMaps enable O(1) LRU eviction caches.',
        keyTakeaway: 'Fast insertion and deletion without shifting elements in memory.'
      },
      {
        id: 'art-trees',
        title: 'Trees & Binary Search Trees (BST)',
        timeComplexity: 'Search/Insert O(log N) balanced, O(N) worst',
        spaceComplexity: 'O(N)',
        summary: 'Hierarchical node structures. BST invariant: left sub-tree values < root < right sub-tree values. In-order traversal of BST yields strictly sorted sequence.',
        keyTakeaway: 'Natural data model for hierarchical data, search trees, and recursive divide-and-conquer.'
      },
      {
        id: 'art-heaps',
        title: 'Heaps & Priority Queues',
        timeComplexity: 'Peek O(1), Insert/Extract O(log N)',
        spaceComplexity: 'O(N)',
        summary: 'Complete binary tree implemented in a flat array. Min-Heap guarantees root is the minimum element. Essential for Top-K queries and Dijkstra.',
        keyTakeaway: 'Best structure when constantly needing the maximum or minimum element dynamically.'
      },
      {
        id: 'art-tries',
        title: 'Tries (Prefix Trees)',
        timeComplexity: 'Insert/Search O(L) where L = word length',
        spaceComplexity: 'O(Total characters * Alphabet Size)',
        summary: 'Tree-based data structure used to store associative arrays where keys are usually strings. Nodes share common prefixes.',
        keyTakeaway: 'Instant word search, prefix matching, and dictionary validation.'
      },
      {
        id: 'art-stacks-queues',
        title: 'Stacks (LIFO) & Queues (FIFO)',
        timeComplexity: 'Push/Pop/Enqueue/Dequeue O(1)',
        spaceComplexity: 'O(N)',
        summary: 'Stacks follow Last-In First-Out (used in DFS and parsing). Queues follow First-In First-Out (used in BFS wavefront exploration).',
        keyTakeaway: 'Core structures powering recursive calls and graph traversals.'
      }
    ]
  },
  {
    id: 'module-algo',
    title: '2. Core Algorithmic Techniques',
    description: 'The fundamental patterns covering 80%+ of all technical coding interviews.',
    articles: [
      {
        id: 'art-two-pointers',
        title: 'Two Pointers Pattern',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        summary: 'Using two pointers (opposite ends or fast/slow) to reduce an O(N^2) brute force search into a single linear O(N) pass.',
        keyTakeaway: 'Applies to sorted arrays, palindrome checking, and in-place partitioning.'
      },
      {
        id: 'art-sliding-window',
        title: 'Sliding Window Pattern',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(K) or O(1)',
        summary: 'Maintaining a dynamic window over a contiguous sequence. Expands right pointer until condition is met, contracts left pointer to optimize.',
        keyTakeaway: 'Optimal for contiguous subarrays/substrings with length or sum constraints.'
      },
      {
        id: 'art-binary-search',
        title: 'Binary Search & Monotonic Predicates',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        summary: 'Repeatedly dividing search space in half. Works on sorted arrays and optimization problems with a monotonic boolean predicate.',
        keyTakeaway: 'When finding min/max feasible value, binary search on the answer space.'
      },
      {
        id: 'art-bfs-dfs',
        title: 'Graph Traversals: BFS vs DFS',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        summary: 'BFS explores level-by-level with a FIFO queue (shortest path). DFS explores deep down branches with recursion/stack (backtracking, connected components).',
        keyTakeaway: 'Choose BFS for shortest path in unweighted graphs; choose DFS for exhaustive path search.'
      }
    ]
  },
  {
    id: 'module-dp',
    title: '3. Dynamic Programming & Advanced Strategies',
    description: 'Transform exponential recursion into polynomial runtime via memoization and tabulation.',
    articles: [
      {
        id: 'art-dp-foundations',
        title: 'DP: Memoization vs Tabulation',
        timeComplexity: 'O(States * Transitions)',
        spaceComplexity: 'O(States)',
        summary: 'Top-down (recursion + memo table) vs Bottom-up (iterative array table). Always define: 1) State definition, 2) Recurrence relation, 3) Base cases, 4) Evaluation order.',
        keyTakeaway: 'Tabulation avoids recursion call-stack overhead and allows space optimization (rolling array).'
      },
      {
        id: 'art-bitmask-dp',
        title: 'Bitmask DP & State Compression',
        timeComplexity: 'O(2^N * N)',
        spaceComplexity: 'O(2^N)',
        summary: 'Represents subset state of items as an integer bitmask. Used in NP-hard problems where N <= 20 (Traveling Salesman, Minimum Hamiltonian Path).',
        keyTakeaway: 'Use when subset combinations must be tracked explicitly.'
      }
    ]
  },
  {
    id: 'module-complexity',
    title: '4. Computational Complexity (Time & Space)',
    description: 'Mathematical foundations of Big-O, Big-Theta, Big-Omega, and memory profiling.',
    articles: [
      {
        id: 'art-big-o',
        title: 'Asymptotic Analysis & Big-O Notation',
        timeComplexity: 'Theoretical Metric',
        spaceComplexity: 'Memory Scaling',
        summary: 'Measures how runtime and auxiliary memory scale as input size N grows toward infinity. Ignores constant factors and lower-order terms.',
        keyTakeaway: 'Interviewers evaluate your solution based on asymptotic optimality.'
      },
      {
        id: 'art-space-complexity',
        title: 'Auxiliary Memory vs Call-Stack Space',
        timeComplexity: 'N/A',
        spaceComplexity: 'O(1) to O(N)',
        summary: 'Space complexity includes both allocated data structures (HashMaps, arrays) and recursion stack frames in DFS (depth of recursion tree).',
        keyTakeaway: 'A recursive tree of depth H consumes O(H) auxiliary stack memory.'
      }
    ]
  }
];
