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
    pythonSnippet: `# Python Dynamic Array (List) Operations
class DynamicArray:
    def __init__(self):
        self.data: list[int] = [10, 20, 30, 40]

    def access(self, index: int) -> int:
        # Instant random access O(1)
        return self.data[index]

    def insert_at(self, index: int, value: int) -> None:
        # Element shifting required O(N)
        self.data.insert(index, value)

    def append(self, value: int) -> None:
        # Amortized O(1) append
        self.data.append(value)

arr = DynamicArray()
print(f"Val at index 2: {arr.access(2)}")  # 30
arr.insert_at(1, 15)  # [10, 15, 20, 30, 40]`,
    tsSnippet: `// TypeScript Array Operations
class DynamicArray {
  private data: number[] = [10, 20, 30, 40];

  // Instant random access O(1)
  public access(index: number): number {
    return this.data[index];
  }

  // Element shifting required O(N)
  public insertAt(index: number, value: number): void {
    this.data.splice(index, 0, value);
  }

  // Amortized O(1) append
  public push(value: number): void {
    this.data.push(value);
  }
}

const arr = new DynamicArray();
console.log(arr.access(2)); // 30
arr.insertAt(1, 15); // [10, 15, 20, 30, 40]`
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
      'Undo/redo histories and browser navigation stacks',
      'Chaining hash tables for collision resolution'
    ],
    pythonSnippet: `from typing import Optional

class ListNode:
    def __init__(self, val: int = 0, next: Optional['ListNode'] = None):
        self.val = val
        self.next = next

class SinglyLinkedList:
    def __init__(self):
        self.head: Optional[ListNode] = None

    def prepend(self, val: int) -> None:
        # Insert at head O(1)
        new_node = ListNode(val, self.head)
        self.head = new_node

    def search(self, target: int) -> bool:
        # Linear traversal O(N)
        curr = self.head
        while curr:
            if curr.val == target:
                return True
            curr = curr.next
        return False`,
    tsSnippet: `class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class SinglyLinkedList {
  head: ListNode | null = null;

  // Insert at head O(1)
  prepend(val: number): void {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
  }

  // Linear traversal O(N)
  search(target: number): boolean {
    let curr = this.head;
    while (curr !== null) {
      if (curr.val === target) return true;
      curr = curr.next;
    }
    return false;
  }
}`
  },
  {
    id: 'ds-tree',
    name: 'Trees & BST',
    category: 'data_structure',
    type: 'tree',
    description: 'Hierarchical node structure where a Binary Search Tree maintains left < root < right property.',
    iconName: 'Network',
    timeComplexity: {
      access: 'O(log N)',
      search: 'O(log N)',
      insertion: 'O(log N)',
      deletion: 'O(log N)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'O(log N) search and insertion when balanced',
      'Natural representation for hierarchies, file systems, and syntax trees',
      'In-order traversal produces sorted order'
    ],
    cons: [
      'Can degenerate to a linked list O(N) if unbalanced',
      'More complex rebalancing algorithms (AVL / Red-Black)'
    ],
    useCases: [
      'Database B-Tree and LSM indexing',
      'Expression parsing and Abstract Syntax Trees (AST)',
      'Hierarchical organizational charts and DOM trees'
    ],
    pythonSnippet: `from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0):
        self.val = val
        self.left: Optional[TreeNode] = None
        self.right: Optional[TreeNode] = None

class BST:
    def insert(self, root: Optional[TreeNode], val: int) -> TreeNode:
        # O(log N) insertion in balanced BST
        if not root:
            return TreeNode(val)
        if val < root.val:
            root.left = self.insert(root.left, val)
        else:
            root.right = self.insert(root.right, val)
        return root

    def inorder(self, root: Optional[TreeNode]) -> list[int]:
        # Returns sorted sequence O(N)
        if not root:
            return []
        return self.inorder(root.left) + [root.val] + self.inorder(root.right)`,
    tsSnippet: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

class BST {
  // O(log N) insertion in balanced BST
  insert(root: TreeNode | null, val: number): TreeNode {
    if (!root) return new TreeNode(val);
    if (val < root.val) {
      root.left = this.insert(root.left, val);
    } else {
      root.right = this.insert(root.right, val);
    }
    return root;
  }

  // In-order traversal yields sorted array O(N)
  inorder(root: TreeNode | null): number[] {
    if (!root) return [];
    return [...this.inorder(root.left), root.val, ...this.inorder(root.right)];
  }
}`
  },
  {
    id: 'ds-graph',
    name: 'Graphs',
    category: 'data_structure',
    type: 'graph',
    description: 'A network of vertices connected by directed or undirected edges, represented via Adjacency List or Matrix.',
    iconName: 'Share2',
    timeComplexity: {
      access: 'O(V + E)',
      search: 'O(V + E)',
      insertion: 'O(1)',
      deletion: 'O(E)',
    },
    spaceComplexity: 'O(V + E)',
    pros: [
      'Models complex interconnected networks (social graphs, maps, dependencies)',
      'Flexible edge weighting and directionality'
    ],
    cons: [
      'High space complexity for dense graphs in adjacency matrix O(V^2)',
      'Requires visited sets to avoid infinite cycles'
    ],
    useCases: [
      'GPS navigation and route planning (Dijkstra / A*)',
      'Dependency resolution and build order (Topological Sort)',
      'Social network friend recommendations'
    ],
    pythonSnippet: `from collections import defaultdict, deque

class Graph:
    def __init__(self):
        # Adjacency List O(V + E) space
        self.adj: dict[int, list[int]] = defaultdict(list)

    def add_edge(self, u: int, v: int) -> None:
        self.adj[u].append(v)
        self.adj[v].append(u)

    def bfs_shortest_path(self, start: int, target: int) -> int:
        queue = deque([(start, 0)])
        visited = {start}

        while queue:
            node, dist = queue.popleft()
            if node == target:
                return dist
            for neighbor in self.adj[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, dist + 1))
        return -1`,
    tsSnippet: `class Graph {
  // Adjacency list representation
  private adj: Map<number, number[]> = new Map();

  addEdge(u: number, v: number): void {
    if (!this.adj.has(u)) this.adj.set(u, []);
    if (!this.adj.has(v)) this.adj.set(v, []);
    this.adj.get(u)!.push(v);
    this.adj.get(v)!.push(u);
  }

  bfs(start: number): number[] {
    const visited = new Set<number>([start]);
    const queue: number[] = [start];
    const order: number[] = [];

    while (queue.length > 0) {
      const node = queue.shift()!;
      order.push(node);
      for (const neighbor of this.adj.get(node) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return order;
  }
}`
  },
  {
    id: 'ds-heap',
    name: 'Heaps & Priority Queues',
    category: 'data_structure',
    type: 'heap',
    description: 'A complete binary tree stored in an array where the root is always the minimum (or maximum) element.',
    iconName: 'Triangle',
    timeComplexity: {
      access: 'O(1) [Peek]',
      search: 'O(N)',
      insertion: 'O(log N)',
      deletion: 'O(log N)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'O(1) instant access to minimum/maximum element',
      'O(log N) insertion and extraction maintaining heap order',
      'Efficient O(N) heap construction (heapify)'
    ],
    cons: [
      'Searching for an arbitrary element requires linear O(N) scan',
      'Not sorted throughout; only parent-child relationship is guaranteed'
    ],
    useCases: [
      'Top-K frequent items & Kth largest queries',
      'Dijkstra\'s shortest path & Prim\'s Minimum Spanning Tree',
      'Event-driven simulation engines & CPU task schedulers'
    ],
    pythonSnippet: `import heapq

class MinPriorityQueue:
    def __init__(self):
        self.heap: list[int] = []

    def push(self, val: int) -> None:
        # Sift up in O(log N)
        heapq.heappush(self.heap, val)

    def pop_min(self) -> int:
        # Sift down root in O(log N)
        return heapq.heappop(self.heap)

    def peek(self) -> int:
        # Instant access O(1)
        return self.heap[0]

pq = MinPriorityQueue()
for num in [20, 5, 15, 3, 8]:
    pq.push(num)

print(pq.pop_min())  # 3
print(pq.pop_min())  # 5`,
    tsSnippet: `class MinHeap {
  private heap: number[] = [];

  // O(log N) insert with bubble-up
  push(val: number): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  // O(log N) extract min with sift-down
  popMin(): number | undefined {
    if (this.heap.length <= 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.siftDown(0);
    return min;
  }

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[parentIdx]) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }

  private siftDown(idx: number): void {
    const len = this.heap.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      if (left < len && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < len && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}`
  },
  {
    id: 'ds-trie',
    name: 'Tries (Prefix Trees)',
    category: 'data_structure',
    type: 'trie',
    description: 'Tree data structure where edges represent characters, allowing prefix matching and dictionary search in O(L) time.',
    iconName: 'ListTree',
    timeComplexity: {
      access: 'O(L)',
      search: 'O(L)',
      insertion: 'O(L)',
      deletion: 'O(L)',
    },
    spaceComplexity: 'O(Total Characters * Alphabet Size)',
    pros: [
      'O(L) search time where L is word length, completely independent of total words N',
      'Instant prefix validation for autocomplete and spellchecking',
      'Shared prefixes reduce redundant storage'
    ],
    cons: [
      'High memory footprint from pointer references per node',
      'Cache locality is suboptimal due to pointer jumping'
    ],
    useCases: [
      'Search engine autocomplete and query suggestion',
      'IP routing tables (Longest Prefix Match)',
      'Boggle & Scrabble word validation solvers'
    ],
    pythonSnippet: `class TrieNode:
    def __init__(self):
        self.children: dict[str, TrieNode] = {}
        self.is_end_of_word: bool = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        # Insert in O(L) where L = len(word)
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def starts_with(self, prefix: str) -> bool:
        # Prefix lookup in O(L)
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`,
    tsSnippet: `class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
}

class Trie {
  root = new TrieNode();

  // Insert in O(L) where L = word.length
  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  // Prefix check in O(L)
  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }
}`
  },
  {
    id: 'ds-stack',
    name: 'Stacks (LIFO)',
    category: 'data_structure',
    type: 'stack',
    description: 'Last-In First-Out (LIFO) collection where elements are pushed and popped from the top in O(1) time.',
    iconName: 'Layers',
    timeComplexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) [Push]',
      deletion: 'O(1) [Pop]',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Strict O(1) push and pop guarantees',
      'Simple memory management and minimal pointer overhead',
      'Naturally models nested syntax and backtracking'
    ],
    cons: [
      'No random access to middle elements without popping',
      'Fixed stack size can lead to Stack Overflow'
    ],
    useCases: [
      'Parentheses matching & arithmetic expression evaluation',
      'Monotonic Stack (Next Greater Element)',
      'Call stack recursion & browser history back button'
    ],
    pythonSnippet: `class Stack:
    def __init__(self):
        self.items: list[int] = []

    def push(self, val: int) -> None:
        # O(1) Push to top
        self.items.append(val)

    def pop(self) -> int:
        # O(1) Pop from top (LIFO)
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Stack is empty")

    def peek(self) -> int:
        return self.items[-1]

    def is_empty(self) -> bool:
        return len(self.items) == 0

# Valid Parentheses Example O(N)
def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
    tsSnippet: `class Stack<T> {
  private items: T[] = [];

  // O(1) Push
  push(item: T): void {
    this.items.push(item);
  }

  // O(1) Pop
  pop(): T | undefined {
    return this.items.pop();
  }

  // O(1) Peek
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Valid Parentheses O(N)
function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`
  },
  {
    id: 'ds-queue',
    name: 'Queues (FIFO)',
    category: 'data_structure',
    type: 'queue',
    description: 'First-In First-Out (FIFO) collection where elements are enqueued at the back and dequeued from the front.',
    iconName: 'ArrowRightLeft',
    timeComplexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) [Enqueue]',
      deletion: 'O(1) [Dequeue]',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Strict O(1) enqueue and dequeue operations',
      'Preserves arrival ordering without priority distortion',
      'Core component for level-order graph and tree traversal'
    ],
    cons: [
      'Naive array-based shift takes O(N); requires ring buffer or doubly linked list',
      'No random access to middle elements'
    ],
    useCases: [
      'Breadth-First Search (BFS) shortest path queues',
      'Message brokers (Kafka, RabbitMQ) and task buffers',
      'Printer spoolers & web server request rate limiters'
    ],
    pythonSnippet: `from collections import deque

class FIFOQueue:
    def __init__(self):
        # deque provides O(1) append and popleft
        self.queue = deque()

    def enqueue(self, val: int) -> None:
        # O(1) insert at rear
        self.queue.append(val)

    def dequeue(self) -> int:
        # O(1) remove from front
        if self.queue:
            return self.queue.popleft()
        raise IndexError("Queue is empty")

    def peek(self) -> int:
        return self.queue[0]

q = FIFOQueue()
q.enqueue(10)
q.enqueue(20)
print(q.dequeue())  # 10 (First In First Out)`,
    tsSnippet: `class FIFOQueue<T> {
  private queue: T[] = [];

  // O(1) Enqueue
  enqueue(item: T): void {
    this.queue.push(item);
  }

  // Dequeue in O(1) with pointer or Array.shift()
  dequeue(): T | undefined {
    return this.queue.shift();
  }

  peek(): T | undefined {
    return this.queue[0];
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}`
  }
];
