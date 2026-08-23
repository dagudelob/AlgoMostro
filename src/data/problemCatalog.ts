import type { AlgorithmResult } from '../types/flowchart';

export const ALGORITHM_RESULTS: Record<string, AlgorithmResult> = {
  'tree-dp': {
    id: 'tree-dp',
    name: 'Tree DP / Divide & Conquer',
    category: 'tree',
    tagline: 'Recursive decomposition and dynamic programming over tree topologies',
    description: 'Computes optimal answers or counts structural combinations by independently aggregating results from left and right subtrees.',
    whyThisPattern: 'Trees possess an inherently recursive structure. By solving independent child subtrees, we can aggregate solutions upwards to the root.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) where H is tree height',
    dataStructures: ['Trees', 'Recursion Stack'],
    algorithms: ['DFS', 'Dynamic Programming'],
    visualizerType: 'tree',
    whenToUse: [
      'Counting structurally unique binary search trees',
      'Computing tree diameter or maximum path sum',
      'Tree vertex cover and coloring optimizations'
    ],
    whenToAvoid: [
      'General cyclic graphs where visited state cycles exist',
      'Level-order breadth evaluations where BFS is more natural'
    ],
    classicProblems: [
      {
        id: 'lc-96',
        title: 'Unique Binary Search Trees',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 96,
        summary: 'Given an integer n, return the number of structurally unique BSTs with exactly n nodes having unique values from 1 to n.',
        keyInsight: 'Choosing root i leaves i-1 nodes in the left subtree and n-i in the right. Total G(n) = sum(G(i-1) * G(n-i)) (Catalan numbers).',
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(N)',
        pythonCode: `class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[0], dp[1] = 1, 1
        for nodes in range(2, n + 1):
            for root in range(1, nodes + 1):
                dp[nodes] += dp[root - 1] * dp[nodes - root]
        return dp[n]`,
        tsCode: `function numTrees(n: number): number {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let nodes = 2; nodes <= n; nodes++) {
    for (let root = 1; root <= nodes; root++) {
      dp[nodes] += dp[root - 1] * dp[nodes - root];
    }
  }
  return dp[n];
}`,
        sampleInput: 'n = 3',
        sampleOutput: '5'
      }
    ]
  },

  'tree-bfs': {
    id: 'tree-bfs',
    name: 'Tree Breadth-First Search (Level Order)',
    category: 'tree',
    tagline: 'Layer-by-layer traversal using a FIFO queue',
    description: 'Processes all nodes at depth K before descending to depth K+1, ideal for side views, level aggregations, and shortest distances.',
    whyThisPattern: 'A FIFO queue buffers the current depth level and allows batch processing based on queue length `len(queue)`.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(W) where W is maximum tree width',
    dataStructures: ['Trees', 'Queues'],
    algorithms: ['BFS'],
    visualizerType: 'bfs',
    whenToUse: [
      'Binary tree level order traversal',
      'Right/left side views of a binary tree',
      'Finding the minimum depth or nearest target node'
    ],
    whenToAvoid: [
      'When post-order child-to-parent aggregation is needed (use DFS)',
      'When queue memory overhead is excessive in dense trees'
    ],
    classicProblems: [
      {
        id: 'lc-102',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 102,
        summary: 'Given the root of a binary tree, return the level order traversal of its nodes values (left to right, level by level).',
        keyInsight: 'Snapshot the current queue size before iterating the inner loop to isolate nodes strictly within the same depth tier.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        pythonCode: `from collections import deque

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        res = []
        q = deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level)
        return res`,
        tsCode: `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(currentLevel);
  }
  return res;
}`,
        sampleInput: 'root = [3,9,20,null,null,15,7]',
        sampleOutput: '[[3],[9,20],[15,7]]'
      }
    ]
  },

  'tree-dfs': {
    id: 'tree-dfs',
    name: 'Tree Depth-First Search (Pre / In / Post)',
    category: 'tree',
    tagline: 'Deep recursive traversal and backtracking in trees',
    description: 'Traverses downwards along each branch to leaf nodes, executing operations in Pre-order, In-order, or Post-order.',
    whyThisPattern: 'Leverages the call stack to descend and propagate subtree summaries back up to parent nodes (e.g. height, ancestor match).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    dataStructures: ['Trees', 'Recursion Stack'],
    algorithms: ['DFS'],
    visualizerType: 'dfs',
    whenToUse: [
      'Computing tree height or maximum depth',
      'Lowest Common Ancestor (LCA)',
      'Validating BST properties (In-order traversal is strictly increasing)'
    ],
    whenToAvoid: [
      'Finding the shortest path in skewed or infinite trees'
    ],
    classicProblems: [
      {
        id: 'lc-236',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 236,
        summary: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q.',
        keyInsight: 'If the current node matches p or q, return it. Recursively search left and right subtrees: if both return non-null, the current root is the LCA.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        pythonCode: `class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        if not root or root == p or root == q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        return left if left else right`,
        tsCode: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ? left : right;
}`,
        sampleInput: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
        sampleOutput: '3'
      }
    ]
  },

  'topological-sort': {
    id: 'topological-sort',
    name: 'Topological Sort (Kahn / DFS)',
    category: 'graph',
    tagline: 'Linear ordering of vertices in a Directed Acyclic Graph (DAG)',
    description: 'Produces a valid execution sequence respecting directional prerequisites (u -> v implies u must execute before v).',
    whyThisPattern: "Kahn's algorithm tracks vertex in-degrees; nodes with in-degree = 0 have all prerequisites satisfied and can be processed immediately.",
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    dataStructures: ['Graphs', 'Queues', 'Arrays'],
    algorithms: ['BFS', 'DFS'],
    visualizerType: 'graph',
    whenToUse: [
      'Dependency resolution and build order in package managers',
      'Course schedule planning with prerequisites',
      'Detecting circular dependencies and cycles in directed graphs'
    ],
    whenToAvoid: [
      'Undirected graphs where prerequisite directionality is undefined'
    ],
    classicProblems: [
      {
        id: 'lc-207',
        title: 'Course Schedule',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 207,
        summary: 'There are numCourses courses labeled 0 to numCourses-1 with prerequisites [a, b]. Return true if you can finish all courses.',
        keyInsight: 'Build in-degree array and adjacency list. Enqueue courses with in-degree 0. If processed courses count equals numCourses, no cycle exists.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
        pythonCode: `from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses
        for dest, src in prerequisites:
            adj[src].append(dest)
            in_degree[dest] += 1
            
        q = deque([i for i in range(numCourses) if in_degree[i] == 0])
        count = 0
        while q:
            curr = q.popleft()
            count += 1
            for neighbor in adj[curr]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    q.append(neighbor)
        return count == numCourses`,
        tsCode: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree: number[] = new Array(numCourses).fill(0);
  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let count = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    count++;
    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return count === numCourses;
}`,
        sampleInput: 'numCourses = 2, prerequisites = [[1,0]]',
        sampleOutput: 'true'
      }
    ]
  },

  'dijkstra': {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'graph',
    tagline: 'Single-source shortest path in graphs with non-negative edge weights',
    description: 'Finds shortest distances from a source node by greedily expanding the tentative minimum distance vertex using a Min-Heap.',
    whyThisPattern: 'The greedy priority queue guarantees that once a node is popped with minimal tentative distance, its shortest path is permanently finalized.',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
    dataStructures: ['Heaps', 'Graphs', 'Arrays'],
    algorithms: ['Greedy', 'BFS'],
    visualizerType: 'heap',
    whenToUse: [
      'GPS navigation and road networks with positive road travel times',
      'Minimum latency routing in telecommunication networks',
      'Non-uniform positive edge weight shortest path queries'
    ],
    whenToAvoid: [
      'Graphs with negative edge weights (use Bellman-Ford / SPFA)',
      'Unweighted graphs where standard BFS is faster at O(V + E)'
    ],
    classicProblems: [
      {
        id: 'lc-743',
        title: 'Network Delay Time',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 743,
        summary: 'Given a network of n nodes and travel times times[i] = [u, v, w], signal sent from node k. Return minimum time for all nodes to receive the signal.',
        keyInsight: 'Run Dijkstra from source k. The result is the maximum value among all shortest paths if all nodes are reachable.',
        timeComplexity: 'O(E log V)',
        spaceComplexity: 'O(V + E)',
        pythonCode: `import heapq

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = {i: [] for i in range(1, n + 1)}
        for u, v, w in times:
            adj[u].append((v, w))
            
        min_heap = [(0, k)] # (cost, node)
        dist = {}
        while min_heap:
            w, u = heapq.heappop(min_heap)
            if u in dist:
                continue
            dist[u] = w
            for v, weight in adj[u]:
                if v not in dist:
                    heapq.heappush(min_heap, (w + weight, v))
                    
        return max(dist.values()) if len(dist) == n else -1`,
        tsCode: `function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj: Map<number, [number, number][]> = new Map();
  for (let i = 1; i <= n; i++) adj.set(i, []);
  for (const [u, v, w] of times) adj.get(u)!.push([v, w]);
  
  const dist: number[] = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const pq: [number, number][] = [[0, k]]; // [cost, node]
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift()!;
    if (d > dist[u]) continue;
    for (const [v, w] of adj.get(u)!) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}`,
        sampleInput: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2',
        sampleOutput: '2'
      }
    ]
  },

  'graph-bfs': {
    id: 'graph-bfs',
    name: 'Graph Breadth-First Search (Shortest Path)',
    category: 'graph',
    tagline: 'Shortest path in unweighted graphs and 2D matrices',
    description: 'Frontier layer expansion guaranteeing the path with the fewest edges.',
    whyThisPattern: 'Each queue level represents a distance offset of exactly +1 edge relative to the starting source.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    dataStructures: ['Graphs', 'Queues', 'Hash Tables (Visited)'],
    algorithms: ['BFS'],
    visualizerType: 'bfs',
    whenToUse: [
      '2D grid mazes (minimum steps from start to destination)',
      'Word transformation sequences (Word Ladder)',
      'Simultaneous multi-source wave flooding'
    ],
    whenToAvoid: [
      'Graphs with non-uniform edge weights (use Dijkstra)'
    ],
    classicProblems: [
      {
        id: 'lc-127',
        title: 'Word Ladder',
        difficulty: 'Hard',
        platform: 'LeetCode',
        problemNumber: 127,
        summary: 'Given beginWord, endWord, and wordList dictionary, find the number of words in the shortest transformation sequence changing 1 letter at a time.',
        keyInsight: 'Model words as vertices and 1-letter transformations as unweighted edges. BFS directly discovers the shortest sequence.',
        timeComplexity: 'O(M^2 * N) where M is word length',
        spaceComplexity: 'O(M^2 * N)',
        pythonCode: `from collections import deque

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        words = set(wordList)
        if endWord not in words:
            return 0
        q = deque([(beginWord, 1)])
        visited = {beginWord}
        while q:
            word, length = q.popleft()
            if word == endWord:
                return length
            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    next_word = word[:i] + c + word[i+1:]
                    if next_word in words and next_word not in visited:
                        visited.add(next_word)
                        q.append((next_word, length + 1))
        return 0`,
        tsCode: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  const queue: [string, number][] = [[beginWord, 1]];
  const visited = new Set<string>([beginWord]);
  
  while (queue.length > 0) {
    const [word, len] = queue.shift()!;
    if (word === endWord) return len;
    for (let i = 0; i < word.length; i++) {
      for (let code = 97; code <= 122; code++) {
        const char = String.fromCharCode(code);
        const nextWord = word.slice(0, i) + char + word.slice(i + 1);
        if (words.has(nextWord) && !visited.has(nextWord)) {
          visited.add(nextWord);
          queue.push([nextWord, len + 1]);
        }
      }
    }
  }
  return 0;
}`,
        sampleInput: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        sampleOutput: '5'
      }
    ]
  },

  'union-find': {
    id: 'union-find',
    name: 'Disjoint Set Union (Union-Find)',
    category: 'graph',
    tagline: 'Dynamic connectivity and equivalence relations',
    description: 'Maintains disjoint sets with near-constant time operations to union components and query group membership.',
    whyThisPattern: 'Path compression and union by rank reduce amortized time complexity to O(alpha(N)) which is practically O(1).',
    timeComplexity: 'O(alpha(N)) ~= O(1)',
    spaceComplexity: 'O(N)',
    dataStructures: ['Arrays', 'Trees'],
    algorithms: ['Greedy'],
    visualizerType: 'graph',
    whenToUse: [
      'Cycle detection in undirected graphs (Kruskal MST)',
      'Dynamic connected component counting',
      'Friend circles and network account clustering'
    ],
    whenToAvoid: [
      'Directed graphs where edge direction matters (use Kosaraju / Tarjan)',
      'Queries requiring the full path reconstruction between nodes'
    ],
    classicProblems: [
      {
        id: 'lc-684',
        title: 'Redundant Connection',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 684,
        summary: 'In an undirected graph that started as a tree with one extra edge added, find the edge creating the cycle.',
        keyInsight: 'For each edge (u, v), check if find(u) == find(v). If true, they were already connected and this edge forms the cycle.',
        timeComplexity: 'O(N * alpha(N))',
        spaceComplexity: 'O(N)',
        pythonCode: `class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        parent = list(range(len(edges) + 1))
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        for u, v in edges:
            root_u, root_v = find(u), find(v)
            if root_u == root_v:
                return [u, v]
            parent[root_u] = root_v
        return []`,
        tsCode: `function findRedundantConnection(edges: number[][]): number[] {
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  for (const [u, v] of edges) {
    const rootU = find(u);
    const rootV = find(v);
    if (rootU === rootV) return [u, v];
    parent[rootU] = rootV;
  }
  return [];
}`,
        sampleInput: 'edges = [[1,2],[1,3],[2,3]]',
        sampleOutput: '[2,3]'
      }
    ]
  },

  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search / Search on Answer',
    category: 'binary_search',
    tagline: 'Logarithmic O(log N) search over monotonic solution spaces',
    description: 'Halves the search space at each iteration by comparing the midpoint against the target or testing a monotonic feasibility predicate.',
    whyThisPattern: 'If a property f(x) flips from False to True exactly once, binary search pinpoints the transition in O(log N).',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    dataStructures: ['Arrays'],
    algorithms: ['Binary Search'],
    visualizerType: 'binary_search',
    whenToUse: [
      'Searching in sorted or rotated arrays',
      'Parametric optimization: "Find the minimum speed / capacity to achieve X"',
      'Computing square roots or power calculations'
    ],
    whenToAvoid: [
      'Unsorted collections where no monotonic invariant exists'
    ],
    classicProblems: [
      {
        id: 'lc-875',
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 875,
        summary: 'Koko eats bananas at speed k per hour. Determine minimum integer k to finish all piles within h hours.',
        keyInsight: 'Speed range is [1, max(piles)]. Higher speed monotonically decreases hours needed. Apply Binary Search on Answer.',
        timeComplexity: 'O(N log(max(piles)))',
        spaceComplexity: 'O(1)',
        pythonCode: `import math

class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        l, r = 1, max(piles)
        res = r
        while l <= r:
            k = (l + r) // 2
            hours = sum(math.ceil(p / k) for p in piles)
            if hours <= h:
                res = k
                r = k - 1
            else:
                l = k + 1
        return res`,
        tsCode: `function minEatingSpeed(piles: number[], h: number): number {
  let l = 1, r = Math.max(...piles);
  let res = r;
  while (l <= r) {
    const k = Math.floor((l + r) / 2);
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / k);
    if (hours <= h) {
      res = k;
      r = k - 1;
    } else {
      l = k + 1;
    }
  }
  return res;
}`,
        sampleInput: 'piles = [3,6,7,11], h = 8',
        sampleOutput: '4'
      }
    ]
  },

  'heap-topk': {
    id: 'heap-topk',
    name: 'Heap / Priority Queue (Top-K)',
    category: 'heap',
    tagline: 'Efficiently tracking K extreme elements',
    description: 'Maintains a Min-Heap of size K to retain the top K largest elements, evicting the smallest whenever size exceeds K.',
    whyThisPattern: 'Avoids full O(N log N) sorting, achieving O(N log K) time and O(K) space.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    dataStructures: ['Heaps', 'Arrays'],
    algorithms: ['Greedy'],
    visualizerType: 'heap',
    whenToUse: [
      'Kth largest or smallest element in a continuous data stream',
      'Top K frequent elements',
      'Merging K sorted lists'
    ],
    whenToAvoid: [
      'When all elements must be sorted and N is small (QuickSort/TimSort is simpler)'
    ],
    classicProblems: [
      {
        id: 'lc-215',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 215,
        summary: 'Given an integer array nums and integer k, return the kth largest element in the array.',
        keyInsight: 'Maintain a Min-Heap of size K. The heap top always stores the Kth largest element encountered so far.',
        timeComplexity: 'O(N log K)',
        spaceComplexity: 'O(K)',
        pythonCode: `import heapq

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        min_heap = []
        for num in nums:
            heapq.heappush(min_heap, num)
            if len(min_heap) > k:
                heapq.heappop(min_heap)
        return min_heap[0]`,
        tsCode: `function findKthLargest(nums: number[], k: number): number {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}`,
        sampleInput: 'nums = [3,2,1,5,6,4], k = 2',
        sampleOutput: '5'
      }
    ]
  },

  'two-pointers': {
    id: 'two-pointers',
    name: 'Two Pointers (Opposite & Fast/Slow)',
    category: 'array_string',
    tagline: 'Dual index references for linear scans in O(1) space',
    description: 'Utilizes converging pointers or different speed pointers to process items in-place.',
    whyThisPattern: 'Exploits sorted order or structural invariants to make definitive decisions without O(N^2) quadratic evaluations.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    dataStructures: ['Arrays', 'Linked Lists'],
    algorithms: ['Two Pointers'],
    visualizerType: 'two_pointers',
    whenToUse: [
      'Two Sum on sorted arrays / 3Sum / 4Sum',
      'Palindrome verification and two-way checks',
      'Linked list cycle detection (Tortoise & Hare)',
      'In-place array partitioning (e.g. Sort Colors)'
    ],
    whenToAvoid: [
      'Unsorted arrays where sorting is prohibited'
    ],
    classicProblems: [
      {
        id: 'lc-15',
        title: '3Sum',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 15,
        summary: 'Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.',
        keyInsight: 'Sort the array. Fix the first element and run Two Pointers on the remaining range. Skip duplicate values to ensure unique triplets.',
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(1) or O(N) for sorting',
        pythonCode: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i-1]:
                continue
            l, r = i + 1, len(nums) - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s == 0:
                    res.append([nums[i], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l+1]: l += 1
                    while l < r and nums[r] == nums[r-1]: r -= 1
                    l += 1; r -= 1
                elif s < 0:
                    l += 1
                else:
                    r -= 1
        return res`,
        tsCode: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return res;
}`,
        sampleInput: 'nums = [-1,0,1,2,-1,-4]',
        sampleOutput: '[[-1,-1,2],[-1,0,1]]'
      }
    ]
  },

  'sliding-window': {
    id: 'sliding-window',
    name: 'Sliding Window',
    category: 'array_string',
    tagline: 'Variable boundary window for contiguous subarrays and substrings',
    description: 'Maintains a contiguous window [L, R] by expanding R and contracting L when constraints are violated.',
    whyThisPattern: 'Each element enters and exits the window at most once, transforming O(N^2) brute force into O(N) linear time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K) (frequency map)',
    dataStructures: ['Arrays', 'Hash Tables'],
    algorithms: ['Sliding Window'],
    visualizerType: 'sliding_window',
    whenToUse: [
      'Longest substring without repeating characters',
      'Minimum size subarray with sum >= K',
      'Finding all anagrams or permutations in a string'
    ],
    whenToAvoid: [
      'Non-contiguous subsequences (use DP)',
      'Arrays with negative numbers where expansion is not monotonic (use Prefix Sum + HashMap)'
    ],
    classicProblems: [
      {
        id: 'lc-3',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 3,
        summary: 'Given a string s, find the length of the longest substring without repeating characters.',
        keyInsight: 'Track the last seen index of each character. When a duplicate is encountered within the current window, jump L forward.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(min(N, M))',
        pythonCode: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_seen = {}
        max_len = 0
        l = 0
        for r, char in enumerate(s):
            if char in last_seen and last_seen[char] >= l:
                l = last_seen[char] + 1
            last_seen[char] = r
            max_len = max(max_len, r - l + 1)
        return max_len`,
        tsCode: `function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let maxLen = 0;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    const char = s[r];
    if (lastSeen.has(char) && lastSeen.get(char)! >= l) {
      l = lastSeen.get(char)! + 1;
    }
    lastSeen.set(char, r);
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return maxLen;
}`,
        sampleInput: 's = "abcabcbb"',
        sampleOutput: '3'
      }
    ]
  },

  'monotonic-stack': {
    id: 'monotonic-stack',
    name: 'Monotonic Stack',
    category: 'array_string',
    tagline: 'Monotonic stack for next greater/smaller element queries in O(N)',
    description: 'A stack whose elements are maintained in strictly increasing or decreasing order to resolve nearest boundary problems.',
    whyThisPattern: 'Each element is pushed and popped at most once, allowing boundary calculations for all elements in linear time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    dataStructures: ['Stacks', 'Arrays'],
    algorithms: ['Greedy'],
    visualizerType: 'stack',
    whenToUse: [
      'Next Greater Element / Daily Temperatures',
      'Largest Rectangle in Histogram',
      'Trapping Rain Water'
    ],
    whenToAvoid: [
      'Non-linear 2D arbitrary geometry problems'
    ],
    classicProblems: [
      {
        id: 'lc-739',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 739,
        summary: 'Given an array of temperatures, return an array answer where answer[i] is the number of days you must wait for a warmer temperature.',
        keyInsight: 'Maintain a decreasing monotonic stack of indices. When encountering a warmer temperature, pop and compute the index difference.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        pythonCode: `class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        res = [0] * len(temperatures)
        stack = [] # indices
        for i, temp in enumerate(temperatures):
            while stack and temp > temperatures[stack[-1]]:
                prev_idx = stack.pop()
                res[prev_idx] = i - prev_idx
            stack.append(i)
        return res`,
        tsCode: `function dailyTemperatures(temperatures: number[]): number[] {
  const res = new Array(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIdx = stack.pop()!;
      res[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return res;
}`,
        sampleInput: 'temperatures = [73,74,75,71,69,72,76,73]',
        sampleOutput: '[1,1,4,2,1,1,0,0]'
      }
    ]
  },

  'prefix-sum': {
    id: 'prefix-sum',
    name: 'Prefix Sums & HashMap',
    category: 'array_string',
    tagline: 'Cumulative sums for instant O(1) range queries and target sum matching',
    description: 'Precomputes cumulative sums such that any subarray sum [L, R] is computed as Prefix[R+1] - Prefix[L].',
    whyThisPattern: 'Answers range queries in O(1) time and, when combined with a frequency HashMap, finds target sum subarrays in O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    dataStructures: ['Arrays', 'Hash Tables'],
    algorithms: ['Prefix Sum'],
    visualizerType: 'prefix_sum',
    whenToUse: [
      'Subarray Sum Equals K (handles positive, zero, and negative values)',
      'Static 1D and 2D matrix range sum queries',
      'Subarrays with sums divisible by K'
    ],
    whenToAvoid: [
      'Frequent array point updates (use Segment Tree or Fenwick Tree)'
    ],
    classicProblems: [
      {
        id: 'lc-560',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 560,
        summary: 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.',
        keyInsight: 'If current cumulative sum is currSum, check how many times (currSum - k) occurred previously using a prefix frequency HashMap.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        pythonCode: `class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        count = 0
        curr_sum = 0
        prefix_counts = {0: 1}
        for num in nums:
            curr_sum += num
            if curr_sum - k in prefix_counts:
                count += prefix_counts[curr_sum - k]
            prefix_counts[curr_sum] = prefix_counts.get(curr_sum, 0) + 1
        return count`,
        tsCode: `function subarraySum(nums: number[], k: number): number {
  const map = new Map<number, number>([[0, 1]]);
  let currSum = 0;
  let count = 0;
  for (const num of nums) {
    currSum += num;
    if (map.has(currSum - k)) {
      count += map.get(currSum - k)!;
    }
    map.set(currSum, (map.get(currSum) || 0) + 1);
  }
  return count;
}`,
        sampleInput: 'nums = [1,1,1], k = 2',
        sampleOutput: '2'
      }
    ]
  },

  'dp-general': {
    id: 'dp-general',
    name: 'Dynamic Programming (1D / 2D / Knapsack)',
    category: 'dp',
    tagline: 'Overlapping subproblems and optimal substructure',
    description: 'Solves complex problems by caching solutions to simpler subproblems to avoid exponential recalculations.',
    whyThisPattern: 'Reduces exponential O(2^N) brute force search spaces down to polynomial O(N * W) or O(N^2) complexity.',
    timeComplexity: 'O(N * W) or O(N^2)',
    spaceComplexity: 'O(N) or O(N * W)',
    dataStructures: ['Arrays', 'Hash Tables'],
    algorithms: ['Dynamic Programming'],
    visualizerType: 'dp',
    whenToUse: [
      'Coin Change, House Robber, Longest Increasing Subsequence',
      'Knapsack problems (0/1 and unbounded knapsack)',
      'Edit Distance and sequence alignment'
    ],
    whenToAvoid: [
      'Problems lacking overlapping subproblems (use standard Divide and Conquer)'
    ],
    classicProblems: [
      {
        id: 'lc-322',
        title: 'Coin Change',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 322,
        summary: 'Given an array of coin denominations and total amount, return the fewest number of coins needed to make up that amount.',
        keyInsight: 'dp[i] = min(dp[i - coin] + 1) for each coin <= i. Base case dp[0] = 0.',
        timeComplexity: 'O(amount * len(coins))',
        spaceComplexity: 'O(amount)',
        pythonCode: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if i - c >= 0:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1`,
        tsCode: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (i - c >= 0) {
        dp[i] = Math.min(dp[i], dp[i - c] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
        sampleInput: 'coins = [1,2,5], amount = 11',
        sampleOutput: '3'
      }
    ]
  },

  'trie-patterns': {
    id: 'trie-patterns',
    name: 'Trie / Prefix Tree Matching',
    category: 'array_string',
    tagline: 'Ultra-fast prefix queries and dictionary word matching',
    description: 'An N-ary character tree where common prefixes share the same path, enabling prefix verification in O(L) time.',
    whyThisPattern: 'Prefix searches do not scale with the dictionary size N, only with the query length L.',
    timeComplexity: 'O(L) per operation',
    spaceComplexity: 'O(N * L * ALPHABET)',
    dataStructures: ['Tries', 'Hash Tables'],
    algorithms: ['DFS'],
    visualizerType: 'trie',
    whenToUse: [
      'Search engine autocomplete and text suggestions',
      'Word Break and Word Search II in 2D grids',
      'Longest common prefix and bitwise maximum XOR queries'
    ],
    whenToAvoid: [
      'Simple exact lookup where HashSet O(1) suffices with less memory overhead'
    ],
    classicProblems: [
      {
        id: 'lc-208',
        title: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 208,
        summary: 'Implement a Trie with insert(word), search(word), and startsWith(prefix) methods.',
        keyInsight: 'Each node contains a children map (char -> TrieNode) and a boolean isEnd marking completed dictionary words.',
        timeComplexity: 'O(L) for all operations',
        spaceComplexity: 'O(Total inserted characters)',
        pythonCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for c in word:
            if c not in curr.children: return False
            curr = curr.children[c]
        return curr.is_end

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for c in prefix:
            if c not in curr.children: return False
            curr = curr.children[c]
        return True`,
        tsCode: `class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

class Trie {
  root = new TrieNode();

  insert(word: string): void {
    let curr = this.root;
    for (const char of word) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }
      curr = curr.children.get(char)!;
    }
    curr.isEnd = true;
  }

  search(word: string): boolean {
    let curr = this.root;
    for (const char of word) {
      if (!curr.children.has(char)) return false;
      curr = curr.children.get(char)!;
    }
    return curr.isEnd;
  }

  startsWith(prefix: string): boolean {
    let curr = this.root;
    for (const char of prefix) {
      if (!curr.children.has(char)) return false;
      curr = curr.children.get(char)!;
    }
    return true;
  }
}`,
        sampleInput: 'insert("apple"), search("apple"), startsWith("app")',
        sampleOutput: 'true, true'
      }
    ]
  },

  'greedy-intervals': {
    id: 'greedy-intervals',
    name: 'Greedy & Interval Scheduling',
    category: 'greedy',
    tagline: 'Locally optimal choices over time ranges and intervals',
    description: 'Sorts intervals by finish time and greedily selects non-overlapping intervals to maximize total completed tasks.',
    whyThisPattern: 'Selecting the interval with the earliest finish time leaves the maximum remaining time available for subsequent intervals.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1) or O(N)',
    dataStructures: ['Arrays'],
    algorithms: ['Greedy'],
    visualizerType: 'greedy',
    whenToUse: [
      'Merge Intervals and Non-overlapping Intervals',
      'Meeting Rooms II (minimum rooms allocation)',
      'Jump Game and Gas Station'
    ],
    whenToAvoid: [
      'Problems where locally optimal choices do not lead to a provable global optimum'
    ],
    classicProblems: [
      {
        id: 'lc-56',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 56,
        summary: 'Given an array of intervals [start, end], merge all overlapping intervals and return non-overlapping intervals covering all input.',
        keyInsight: 'Sort by start time. If the current start is <= previous merged end, extend end to max(end1, end2).',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        pythonCode: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = []
        for interval in intervals:
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[-1][1] = max(merged[-1][1], interval[1])
        return merged`,
        tsCode: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];
  for (const interval of intervals) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
    }
  }
  return merged;
}`,
        sampleInput: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        sampleOutput: '[[1,6],[8,10],[15,18]]'
      }
    ]
  }
};
