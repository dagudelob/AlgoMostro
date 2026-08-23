import type { DSItem } from '../types/visualizer';

export const DATA_STRUCTURES: DSItem[] = [
  {
    id: 'ds-array',
    name: 'Arrays',
    category: 'data_structure',
    type: 'array',
    description: 'A contiguous memory block storing elements of the same type with instantaneous index-based access.',
    iconName: 'LayoutGrid',
    timeComplexity: {
      access: 'O(1)',
      search: 'O(N)',
      insertion: 'O(N)',
      deletion: 'O(N)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Instantaneous O(1) random index access',
      'Superior CPU cache locality and spatial locality',
      'Minimal memory overhead with no extra pointers'
    ],
    cons: [
      'Fixed capacity in static arrays',
      'Costly O(N) insertion and deletion due to element shifting'
    ],
    useCases: [
      'Binary search over sorted collections',
      'Frequency tables and direct-address buckets',
      'High-throughput sequential memory buffers'
    ],
    snippet: `// O(1) Access and O(N) Insertion
const arr = [10, 20, 30, 40];
const val = arr[2]; // 30 -> O(1)
arr.splice(1, 0, 15); // Insert 15 at index 1 -> O(N)`
  },
  {
    id: 'ds-linked-list',
    name: 'Linked Lists',
    category: 'data_structure',
    type: 'linked_list',
    description: 'A linear sequence of node elements where each node stores a value and a pointer/reference to the next node.',
    iconName: 'GitCommitHorizontal',
    timeComplexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1)*',
      deletion: 'O(1)*',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'O(1) insertion/deletion given a pointer to the target node',
      'Dynamic size allocation without requiring contiguous memory reallocation'
    ],
    cons: [
      'No random index access (sequential O(N) traversal required)',
      'Memory overhead from storing next/prev pointer addresses'
    ],
    useCases: [
      'Queue and LRU Cache implementations (Doubly Linked List)',
      'Floyd cycle detection algorithm (Tortoise & Hare)',
      'In-place list reversal and partition problems'
    ],
    snippet: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) { this.val = val; }
}`
  },
  {
    id: 'ds-tree',
    name: 'Trees (BST / Binary Tree)',
    category: 'data_structure',
    type: 'tree',
    description: 'A hierarchical, non-linear data structure consisting of a root node connected to child subtrees.',
    iconName: 'Network',
    timeComplexity: {
      access: 'O(log N)',
      search: 'O(log N)',
      insertion: 'O(log N)',
      deletion: 'O(log N)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Efficient O(log N) search, insertion, and deletion when balanced',
      'Naturally keeps elements sorted (Binary Search Tree)',
      'Clean recursive decomposition (Divide and Conquer)'
    ],
    cons: [
      'Can degenerate into a skewed linked list O(N) if unbalanced',
      'Complex rotation logic in self-balancing trees (AVL, Red-Black)'
    ],
    useCases: [
      'Hierarchical file systems and DOM trees',
      'Abstract Syntax Trees (AST) in compilers',
      'Database indexing (B-Trees / BSTs)'
    ],
    snippet: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) { this.val = val; }
}`
  },
  {
    id: 'ds-graph',
    name: 'Graphs',
    category: 'data_structure',
    type: 'graph',
    description: 'A collection of vertices (nodes) interconnected by edges, which can be directed or undirected, weighted or unweighted.',
    iconName: 'Share2',
    timeComplexity: {
      access: 'O(V + E)',
      search: 'O(V + E)',
      insertion: 'O(1)',
      deletion: 'O(V + E)',
    },
    spaceComplexity: 'O(V + E)',
    pros: [
      'Models arbitrary real-world network and relational topologies',
      'Supports shortest-path and global connectivity algorithms'
    ],
    cons: [
      'Dense matrix representation consumes O(V^2) memory',
      'Cycle detection and visited state tracking require extra memory'
    ],
    useCases: [
      'Social networks and knowledge graphs',
      'GPS mapping and route optimization (Dijkstra, A*)',
      'Package dependency resolution (Topological Sort)'
    ],
    snippet: `// Adjacency List
const adjList = new Map<number, number[]>();
adjList.set(1, [2, 3]);
adjList.set(2, [4]);`
  },
  {
    id: 'ds-heap',
    name: 'Heaps (Priority Queue)',
    category: 'data_structure',
    type: 'heap',
    description: 'A complete binary tree satisfying the Heap property (the parent node is always smaller/greater than its children).',
    iconName: 'Layers',
    timeComplexity: {
      access: 'O(1) (peek)',
      search: 'O(N)',
      insertion: 'O(log N)',
      deletion: 'O(log N) (pop)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Instantaneous O(1) peek access to the extreme element (min/max)',
      'Logarithmic O(log N) push and pop operations',
      'Stored compactly in a flat 1D array without pointers'
    ],
    cons: [
      'Arbitrary value search is slow O(N)',
      'Provides partial priority ordering, not full sorting'
    ],
    useCases: [
      'Finding the K-th largest/smallest elements (Top-K)',
      'Dijkstra and Prim graph pathfinding',
      'Merging K sorted streams/lists'
    ],
    snippet: `// Min-Heap indexing: parent(i) = floor((i-1)/2)
// left(i) = 2i + 1, right(i) = 2i + 2
const minHeap = [2, 5, 8, 12, 10]; // Root is always minHeap[0]`
  },
  {
    id: 'ds-trie',
    name: 'Tries (Prefix Trees)',
    category: 'data_structure',
    type: 'trie',
    description: 'A specialized search tree where each node represents a character, allowing strings with shared prefixes to share common paths.',
    iconName: 'FolderTree',
    timeComplexity: {
      access: 'O(L) (key length)',
      search: 'O(L)',
      insertion: 'O(L)',
      deletion: 'O(L)',
    },
    spaceComplexity: 'O(ALPHABET * L * N)',
    pros: [
      'Prefix search speed depends only on word length L, not dataset size N',
      'Eliminates duplicate storage for common prefixes'
    ],
    cons: [
      'High pointer memory footprint if the dictionary has sparse prefixes'
    ],
    useCases: [
      'Search engine autocomplete and query suggestions',
      'Spell checkers and IP routing tables',
      'Word puzzle board games (Boggle, Word Search II)'
    ],
    snippet: `class TrieNode {
  children = new Map<string, TrieNode>();
  isWord = false;
}`
  },
  {
    id: 'ds-stack',
    name: 'Stacks (LIFO)',
    category: 'data_structure',
    type: 'stack',
    description: 'A Last-In, First-Out collection where the last element inserted is the first element removed.',
    iconName: 'Server',
    timeComplexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) (push)',
      deletion: 'O(1) (pop)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Ultra-fast O(1) Push and Pop operations',
      'Natural structure for state tracking, expression parsing, and recursion'
    ],
    cons: [
      'Access is strictly restricted to the TOP element'
    ],
    useCases: [
      'Parentheses matching and syntax validation',
      'Monotonic Stack (Next Greater Element, Trapping Rain Water)',
      'Undo/Redo buffers and Call Stack execution'
    ],
    snippet: `const stack: number[] = [];
stack.push(10); // O(1)
const top = stack.pop(); // 10 -> O(1)`
  },
  {
    id: 'ds-queue',
    name: 'Queues (FIFO & Deque)',
    category: 'data_structure',
    type: 'queue',
    description: 'A First-In, First-Out structure where items are enqueued at the rear and dequeued from the front.',
    iconName: 'ArrowRightLeft',
    timeComplexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) (enqueue)',
      deletion: 'O(1) (dequeue)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Guaranteed O(1) enqueue and dequeue operations',
      'Maintains strict temporal arrival order'
    ],
    cons: [
      'Native JS Array.shift() is O(N); requires a circular buffer or Doubly Linked List for true O(1)'
    ],
    useCases: [
      'Breadth-First Search (BFS) level-order traversal',
      'Monotonic Deque (Sliding Window Maximum)',
      'Asynchronous task scheduling and rate limiters'
    ],
    snippet: `// Conceptual FIFO Queue
const queue = [1, 2, 3];
queue.push(4); // Enqueue
const item = queue.shift(); // Dequeue -> 1`
  }
];
