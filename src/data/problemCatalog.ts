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
    practiceProblems: [
      {
        id: 'lc-938',
        title: 'Range Sum of BST',
        difficulty: 'Easy',
        problemNumber: 938,
        url: 'https://leetcode.com/problems/range-sum-of-bst/',
        summary: 'Sum all node values in a binary search tree falling within range [low, high].'
      },
      {
        id: 'lc-96',
        title: 'Unique Binary Search Trees',
        difficulty: 'Medium',
        problemNumber: 96,
        url: 'https://leetcode.com/problems/unique-binary-search-trees/',
        summary: 'Count structurally unique BSTs with N nodes using Catalan recurrence.'
      },
      {
        id: 'lc-834',
        title: 'Sum of Distances in Tree',
        difficulty: 'Hard',
        problemNumber: 834,
        url: 'https://leetcode.com/problems/sum-of-distances-in-tree/',
        summary: 'Compute sum of distances from every node to all other nodes via tree re-rooting DP.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-96',
        title: 'Unique Binary Search Trees',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 96,
        url: 'https://leetcode.com/problems/unique-binary-search-trees/',
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
    practiceProblems: [
      {
        id: 'lc-104',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        problemNumber: 104,
        url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        summary: 'Find maximum depth of binary tree level-by-level with a FIFO queue.'
      },
      {
        id: 'lc-102',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        problemNumber: 102,
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        summary: 'Traverse binary tree level by level returning values tier by tier.'
      },
      {
        id: 'lc-297',
        title: 'Serialize and Deserialize Binary Tree',
        difficulty: 'Hard',
        problemNumber: 297,
        url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        summary: 'Design a level-order codec to convert binary tree to string and back.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-102',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 102,
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        summary: 'Given the root of a binary tree, return the level order traversal of its nodes values (left to right, level by level).',
        keyInsight: 'Snapshot the current queue size before iterating the inner loop to isolate nodes strictly within the same depth tier.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        pythonCode: `from collections import deque
from typing import Optional, List

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
  const q: TreeNode[] = [root];
  while (q.length > 0) {
    const level: number[] = [];
    const len = q.length;
    for (let i = 0; i < len; i++) {
      const node = q.shift()!;
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
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
    name: 'Tree Depth-First Search & LCA',
    category: 'tree',
    tagline: 'Recursive tree path exploration and ancestor validation',
    description: 'Explores deeply down subtrees with pre/in/post-order traversals to validate BST properties and compute lowest common ancestors.',
    whyThisPattern: 'Subtrees are independent. Post-order recursion allows returning values from children up to the parent.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) where H is tree height',
    dataStructures: ['Trees', 'Recursion Stack'],
    algorithms: ['DFS'],
    visualizerType: 'tree',
    whenToUse: [
      'Lowest Common Ancestor (LCA) queries',
      'Maximum path sum and diameter of binary tree',
      'BST validation (in-order sorted check)'
    ],
    whenToAvoid: [
      'Level-order outputs where BFS is required'
    ],
    practiceProblems: [
      {
        id: 'lc-226',
        title: 'Invert Binary Tree',
        difficulty: 'Easy',
        problemNumber: 226,
        url: 'https://leetcode.com/problems/invert-binary-tree/',
        summary: 'Invert binary tree by recursively swapping left and right children.'
      },
      {
        id: 'lc-236',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        problemNumber: 236,
        url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        summary: 'Find lowest common ancestor node shared by nodes P and Q.'
      },
      {
        id: 'lc-124',
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        problemNumber: 124,
        url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
        summary: 'Compute maximum path sum through any node sequence in a binary tree.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-236',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 236,
        url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        summary: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q.',
        keyInsight: 'If the current node is p or q, return it. If both left and right recursive calls return non-null, the current node is the LCA.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        pythonCode: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
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
    name: 'Topological Sort (Kahn\'s Algorithm)',
    category: 'graph',
    tagline: 'Linear dependency ordering of Directed Acyclic Graphs (DAG)',
    description: 'Computes a linear sequence of tasks matching prerequisite constraints using in-degree tracking and a queue.',
    whyThisPattern: 'Nodes with in-degree 0 have no outstanding prerequisites and can be processed immediately.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    dataStructures: ['Graphs', 'Queues', 'Arrays'],
    algorithms: ['BFS / Kahn\'s Algorithm'],
    visualizerType: 'graph',
    whenToUse: [
      'Course prerequisite ordering and scheduling',
      'Package build system dependency resolution',
      'Cycle detection in directed graphs'
    ],
    whenToAvoid: [
      'Undirected graphs (topological sort requires directed edges)',
      'Graphs with confirmed cycles (no valid topological order exists)'
    ],
    practiceProblems: [
      {
        id: 'lc-1791',
        title: 'Find Center of Star Graph',
        difficulty: 'Easy',
        problemNumber: 1791,
        url: 'https://leetcode.com/problems/find-center-of-star-graph/',
        summary: 'Find center node connecting to all other N-1 nodes.'
      },
      {
        id: 'lc-207',
        title: 'Course Schedule',
        difficulty: 'Medium',
        problemNumber: 207,
        url: 'https://leetcode.com/problems/course-schedule/',
        summary: 'Detect cycles in prerequisite DAG using in-degrees and Kahn\'s BFS.'
      },
      {
        id: 'lc-269',
        title: 'Alien Dictionary',
        difficulty: 'Hard',
        problemNumber: 269,
        url: 'https://leetcode.com/problems/alien-dictionary/',
        summary: 'Derive unique character alphabetical ordering from sorted alien word list.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-207',
        title: 'Course Schedule',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 207,
        url: 'https://leetcode.com/problems/course-schedule/',
        summary: 'Determine if you can finish all numCourses given a list of prerequisite pairs [a, b].',
        keyInsight: 'Build in-degree array. Enqueue all nodes with in_degree == 0. If processed node count == numCourses, no cycle exists.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
        pythonCode: `from collections import deque, defaultdict
from typing import List

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = defaultdict(list)
        in_degree = [0] * numCourses
        for dest, src in prerequisites:
            adj[src].append(dest)
            in_degree[dest] += 1
        q = deque([i for i in range(numCourses) if in_degree[i] == 0])
        count = 0
        while q:
            node = q.popleft()
            count += 1
            for neighbor in adj[node]:
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
  const q: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) q.push(i);
  }
  let count = 0;
  while (q.length > 0) {
    const node = q.shift()!;
    count++;
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) q.push(neighbor);
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
    name: 'Dijkstra\'s Shortest Path Algorithm',
    category: 'graph',
    tagline: 'Single-source shortest path for non-negative edge weights',
    description: 'Greedily relaxes vertex distances using a min-priority queue, guaranteeing shortest distances in O((V + E) log V).',
    whyThisPattern: 'A Min-Heap guarantees that the node with minimum tentative distance is finalized next.',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
    dataStructures: ['Min-Heap', 'Graphs', 'Distance Map'],
    algorithms: ['Greedy', 'Priority Queue'],
    visualizerType: 'heap',
    whenToUse: [
      'GPS route planning with positive road weights',
      'Network routing latency minimization',
      'Cheapest flight transitions within edge bounds'
    ],
    whenToAvoid: [
      'Graphs with negative edge weights (use Bellman-Ford)',
      'Unweighted graphs (use standard BFS for O(V+E) efficiency)'
    ],
    practiceProblems: [
      {
        id: 'lc-1091',
        title: 'Shortest Path in Binary Matrix',
        difficulty: 'Easy',
        problemNumber: 1091,
        url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
        summary: 'Find shortest 8-directional clear path in a binary grid.'
      },
      {
        id: 'lc-743',
        title: 'Network Delay Time',
        difficulty: 'Medium',
        problemNumber: 743,
        url: 'https://leetcode.com/problems/network-delay-time/',
        summary: 'Find time taken for all nodes to receive signal using Dijkstra.'
      },
      {
        id: 'lc-787',
        title: 'Cheapest Flights Within K Stops',
        difficulty: 'Hard',
        problemNumber: 787,
        url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
        summary: 'Modified Dijkstra / Bellman-Ford bounded by K intermediate stops.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-743',
        title: 'Network Delay Time',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 743,
        url: 'https://leetcode.com/problems/network-delay-time/',
        summary: 'Find how long it will take for all n nodes to receive a signal sent from node k.',
        keyInsight: 'Min-Heap priority queue pops the minimum travel time node. Update distances and return max distance if all nodes visited.',
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V + E)',
        pythonCode: `import heapq
from collections import defaultdict
from typing import List

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = defaultdict(list)
        for u, v, w in times:
            adj[u].append((v, w))
        pq = [(0, k)]
        dist = {}
        while pq:
            d, node = heapq.heappop(pq)
            if node in dist:
                continue
            dist[node] = d
            for neighbor, weight in adj[node]:
                if neighbor not in dist:
                    heapq.heappush(pq, (d + weight, neighbor))
        return max(dist.values()) if len(dist) == n else -1`,
        tsCode: `function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj = new Map<number, [number, number][]>();
  for (const [u, v, w] of times) {
    if (!adj.has(u)) adj.set(u, []);
    adj.get(u)!.push([v, w]);
  }
  const dist = new Map<number, number>();
  const pq: [number, number][] = [[0, k]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift()!;
    if (dist.has(node)) continue;
    dist.set(node, d);
    for (const [neighbor, weight] of adj.get(node) || []) {
      if (!dist.has(neighbor)) pq.push([d + weight, neighbor]);
    }
  }
  if (dist.size !== n) return -1;
  return Math.max(...dist.values());
}`,
        sampleInput: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2',
        sampleOutput: '2'
      }
    ]
  },

  'graph-bfs': {
    id: 'graph-bfs',
    name: 'Graph Breadth-First Search (2D Grid / Unweighted)',
    category: 'graph',
    tagline: 'Shortest path and connected component exploration in O(V + E)',
    description: 'Explores unweighted graphs and 2D matrices in concentric rings, finding the absolute minimum steps between coordinates.',
    whyThisPattern: 'FIFO queue processes nodes in strictly increasing distance order.',
    timeComplexity: 'O(V + E) or O(R * C)',
    spaceComplexity: 'O(V) or O(R * C)',
    dataStructures: ['Queues', '2D Grids', 'Visited Sets'],
    algorithms: ['BFS'],
    visualizerType: 'bfs',
    whenToUse: [
      'Shortest path in unweighted maze or matrix',
      'Word Ladder transformation sequences',
      'Multi-source rotting oranges propagation'
    ],
    whenToAvoid: [
      'Weighted graphs with variable travel costs (use Dijkstra)'
    ],
    practiceProblems: [
      {
        id: 'lc-733',
        title: 'Flood Fill',
        difficulty: 'Easy',
        problemNumber: 733,
        url: 'https://leetcode.com/problems/flood-fill/',
        summary: 'Recolor connected 4-directional pixels with target color.'
      },
      {
        id: 'lc-200',
        title: 'Number of Islands',
        difficulty: 'Medium',
        problemNumber: 200,
        url: 'https://leetcode.com/problems/number-of-islands/',
        summary: 'Count 4-directional connected land components in a grid.'
      },
      {
        id: 'lc-127',
        title: 'Word Ladder',
        difficulty: 'Hard',
        problemNumber: 127,
        url: 'https://leetcode.com/problems/word-ladder/',
        summary: 'Shortest transformation sequence length from beginWord to endWord.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-127',
        title: 'Word Ladder',
        difficulty: 'Hard',
        platform: 'LeetCode',
        problemNumber: 127,
        url: 'https://leetcode.com/problems/word-ladder/',
        summary: 'Find the number of words in the shortest transformation sequence from beginWord to endWord.',
        keyInsight: 'Model words as graph nodes where edges connect words differing by 1 character. BFS guarantees the shortest path.',
        timeComplexity: 'O(M^2 * N)',
        spaceComplexity: 'O(M^2 * N)',
        pythonCode: `from collections import deque
from typing import List

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
  const q: [string, number][] = [[beginWord, 1]];
  const visited = new Set<string>([beginWord]);
  while (q.length > 0) {
    const [word, len] = q.shift()!;
    if (word === endWord) return len;
    for (let i = 0; i < word.length; i++) {
      for (let code = 97; code <= 122; code++) {
        const char = String.fromCharCode(code);
        const next = word.slice(0, i) + char + word.slice(i + 1);
        if (words.has(next) && !visited.has(next)) {
          visited.add(next);
          q.push([next, len + 1]);
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
    name: 'Disjoint Set Union (Union-Find / DSU)',
    category: 'graph',
    tagline: 'Near O(1) dynamic connectivity and cycle detection',
    description: 'Tracks partition of elements into disjoint sets with path compression and union by rank in O(alpha(N)) amortized time.',
    whyThisPattern: 'Path compression flattens tree structure, making subsequent find operations nearly instantaneous.',
    timeComplexity: 'O(alpha(N)) ≈ O(1) per operation',
    spaceComplexity: 'O(N)',
    dataStructures: ['Parent Array', 'Rank Array'],
    algorithms: ['Union by Rank', 'Path Compression'],
    visualizerType: 'graph',
    whenToUse: [
      'Dynamic edge additions & cycle detection in undirected graphs',
      'Kruskal\'s Minimum Spanning Tree (MST)',
      'Number of connected network components'
    ],
    whenToAvoid: [
      'Directed graphs (DSU is designed for symmetric undirected connectivity)',
      'Edge deletion / dynamic splitting operations'
    ],
    practiceProblems: [
      {
        id: 'lc-1971',
        title: 'Find if Path Exists in Graph',
        difficulty: 'Easy',
        problemNumber: 1971,
        url: 'https://leetcode.com/problems/find-if-path-exists-in-graph/',
        summary: 'Determine if valid path connects source and destination using Union-Find.'
      },
      {
        id: 'lc-684',
        title: 'Redundant Connection',
        difficulty: 'Medium',
        problemNumber: 684,
        url: 'https://leetcode.com/problems/redundant-connection/',
        summary: 'Find redundant edge that creates a cycle in a connected graph.'
      },
      {
        id: 'lc-305',
        title: 'Number of Islands II',
        difficulty: 'Hard',
        problemNumber: 305,
        url: 'https://leetcode.com/problems/number-of-islands-ii/',
        summary: 'Count total islands dynamically after each grid land point addition.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-684',
        title: 'Redundant Connection',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 684,
        url: 'https://leetcode.com/problems/redundant-connection/',
        summary: 'Return an edge that can be removed so that the resulting graph is a tree of n nodes.',
        keyInsight: 'Initialize DSU. If find(u) == find(v), adding edge (u, v) creates a cycle; return [u, v].',
        timeComplexity: 'O(N * alpha(N))',
        spaceComplexity: 'O(N)',
        pythonCode: `from typing import List

class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n + 1))
    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]
    def union(self, i: int, j: int) -> bool:
        root_i, root_j = self.find(i), self.find(j)
        if root_i == root_j:
            return False
        self.parent[root_i] = root_j
        return True

class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        dsu = DSU(len(edges))
        for u, v in edges:
            if not dsu.union(u, v):
                return [u, v]
        return []`,
        tsCode: `class DSU {
  parent: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
  }
  find(i: number): number {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i]));
  }
  union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI === rootJ) return false;
    this.parent[rootI] = rootJ;
    return true;
  }
}

function findRedundantConnection(edges: number[][]): number[] {
  const dsu = new DSU(edges.length);
  for (const [u, v] of edges) {
    if (!dsu.union(u, v)) return [u, v];
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
    name: 'Binary Search & Monotonic Predicates',
    category: 'binary_search',
    tagline: 'Logarithmic O(log N) partition over monotonic answer space',
    description: 'Repeatedly bisects search intervals to find a target value or the boundary where a boolean condition changes from False to True.',
    whyThisPattern: 'Monotonicity guarantees that if mid is valid/invalid, half the entire remaining search space can be discarded.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    dataStructures: ['Sorted Arrays'],
    algorithms: ['Binary Search'],
    visualizerType: 'binary_search',
    whenToUse: [
      'Target element search in sorted array',
      'Binary Search on Answer Space (Capacity to ship, Koko Eating Bananas)',
      'Rotated sorted array boundary discovery'
    ],
    whenToAvoid: [
      'Unsorted array without monotonic property (use Linear Scan / Hash Table)'
    ],
    practiceProblems: [
      {
        id: 'lc-704',
        title: 'Binary Search',
        difficulty: 'Easy',
        problemNumber: 704,
        url: 'https://leetcode.com/problems/binary-search/',
        summary: 'Search target integer in sorted array in O(log N) runtime.'
      },
      {
        id: 'lc-875',
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        problemNumber: 875,
        url: 'https://leetcode.com/problems/koko-eating-bananas/',
        summary: 'Find minimum eating speed K within H hours using binary search on answer.'
      },
      {
        id: 'lc-4',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        problemNumber: 4,
        url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
        summary: 'Find median of two sorted arrays in logarithmic O(log(min(M,N))) time.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-875',
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 875,
        url: 'https://leetcode.com/problems/koko-eating-bananas/',
        summary: 'Find the minimum integer k such that Koko can eat all bananas within h hours.',
        keyInsight: 'Feasibility test canEat(k) is monotonic: [F, F, ..., T, T]. Binary search speed k between 1 and max(piles).',
        timeComplexity: 'O(N log(max(piles)))',
        spaceComplexity: 'O(1)',
        pythonCode: `import math
from typing import List

class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        left, right = 1, max(piles)
        res = right
        while left <= right:
            k = left + (right - left) // 2
            hours = sum(math.ceil(p / k) for p in piles)
            if hours <= h:
                res = k
                right = k - 1
            else:
                left = k + 1
        return res`,
        tsCode: `function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);
  let res = right;
  while (left <= right) {
    const k = left + Math.floor((right - left) / 2);
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / k);
    if (hours <= h) {
      res = k;
      right = k - 1;
    } else {
      left = k + 1;
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
    name: 'Heap / Priority Queue (Top-K Pattern)',
    category: 'heap',
    tagline: 'O(N log K) bounded priority queue for extreme elements',
    description: 'Maintains a min-heap of size K while iterating over N elements, keeping the K largest items without full sorting.',
    whyThisPattern: 'A Min-Heap of size K evicts elements smaller than current top in O(log K) per insert.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    dataStructures: ['Min-Heap', 'Priority Queues'],
    algorithms: ['Heapify', 'Sift Down'],
    visualizerType: 'heap',
    whenToUse: [
      'Finding the Kth largest/smallest element in stream',
      'Top K frequent words or numbers',
      'Merging K sorted arrays or lists'
    ],
    whenToAvoid: [
      'When all elements must be sorted (use Quick/Merge Sort in O(N log N))'
    ],
    practiceProblems: [
      {
        id: 'lc-703',
        title: 'Kth Largest Element in a Stream',
        difficulty: 'Easy',
        problemNumber: 703,
        url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
        summary: 'Maintain Kth largest element in dynamic real-time stream using Min-Heap.'
      },
      {
        id: 'lc-215',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        problemNumber: 215,
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        summary: 'Find Kth largest element in array in O(N log K) using bounded Min-Heap.'
      },
      {
        id: 'lc-23',
        title: 'Merge k Sorted Lists',
        difficulty: 'Hard',
        problemNumber: 23,
        url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
        summary: 'Merge K sorted linked lists into one sorted list using Min-Heap in O(N log K).'
      }
    ],
    classicProblems: [
      {
        id: 'lc-215',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 215,
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        summary: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
        keyInsight: 'Maintain a min-heap of size k. If len(heap) > k, pop the smallest. Top of heap is the kth largest.',
        timeComplexity: 'O(N log K)',
        spaceComplexity: 'O(K)',
        pythonCode: `import heapq
from typing import List

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []
        for num in nums:
            heapq.heappush(heap, num)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]`,
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
    name: 'Two Pointers & In-Place Partitioning',
    category: 'array_string',
    tagline: 'Linear O(N) convergence without auxiliary memory',
    description: 'Uses two pointers moving inward, outward, or fast/slow to compare elements and partition arrays in-place.',
    whyThisPattern: 'In sorted or bounded arrays, evaluating pairs from boundaries eliminates redundant inner loops.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    dataStructures: ['Arrays', 'Pointers'],
    algorithms: ['Two Pointers', 'Partitioning'],
    visualizerType: 'two_pointers',
    whenToUse: [
      'Two Sum II in sorted array and 3Sum triplets',
      'Valid Palindrome verification',
      'Trapping Rain Water and Container With Most Water'
    ],
    whenToAvoid: [
      'Unsorted arrays without order invariant (use Hash Map for O(N))'
    ],
    practiceProblems: [
      {
        id: 'lc-125',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        problemNumber: 125,
        url: 'https://leetcode.com/problems/valid-palindrome/',
        summary: 'Check if string is a palindrome using two inward pointers.'
      },
      {
        id: 'lc-15',
        title: '3Sum',
        difficulty: 'Medium',
        problemNumber: 15,
        url: 'https://leetcode.com/problems/3sum/',
        summary: 'Find all unique triplets summing to zero in O(N^2) time and O(1) space.'
      },
      {
        id: 'lc-42',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        problemNumber: 42,
        url: 'https://leetcode.com/problems/trapping-rain-water/',
        summary: 'Calculate trapped rain water using converging left and right maximum height pointers.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-15',
        title: '3Sum',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 15,
        url: 'https://leetcode.com/problems/3sum/',
        summary: 'Find all unique triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.',
        keyInsight: 'Sort array. Fix nums[i] and run two-pointers (L=i+1, R=len-1) to find complementary pairs, skipping duplicates.',
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(1) extra space',
        pythonCode: `from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, len(nums) - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total == 0:
                    res.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]: left += 1
                    while left < right and nums[right] == nums[right - 1]: right -= 1
                    left += 1; right -= 1
                elif total < 0:
                    left += 1
                else:
                    right -= 1
        return res`,
        tsCode: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
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
    tagline: 'Continuous subsegment [L..R] optimization in O(N)',
    description: 'Maintains a valid window by expanding right boundary and shrinking left boundary, avoiding quadratic nested scans.',
    whyThisPattern: 'Subarray properties can be incrementally updated when sliding one element in and out.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K) or O(1)',
    dataStructures: ['Hash Maps', 'Frequency Arrays'],
    algorithms: ['Sliding Window'],
    visualizerType: 'sliding_window',
    whenToUse: [
      'Longest substring without repeating characters',
      'Minimum window substring containing pattern',
      'Subarray with max sum of fixed size K'
    ],
    whenToAvoid: [
      'Non-contiguous subsequences (use Dynamic Programming)'
    ],
    practiceProblems: [
      {
        id: 'lc-643',
        title: 'Maximum Average Subarray I',
        difficulty: 'Easy',
        problemNumber: 643,
        url: 'https://leetcode.com/problems/maximum-average-subarray-i/',
        summary: 'Find maximum average of fixed size K contiguous subarray.'
      },
      {
        id: 'lc-3',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        problemNumber: 3,
        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        summary: 'Find length of longest contiguous substring without duplicate characters.'
      },
      {
        id: 'lc-76',
        title: 'Minimum Window Substring',
        difficulty: 'Hard',
        problemNumber: 76,
        url: 'https://leetcode.com/problems/minimum-window-substring/',
        summary: 'Find minimum window substring containing all target characters in O(N).'
      }
    ],
    classicProblems: [
      {
        id: 'lc-3',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 3,
        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        summary: 'Given a string s, find the length of the longest substring without repeating characters.',
        keyInsight: 'Keep a map of last seen indices. When a duplicate is encountered at right, jump left to last_seen[char] + 1.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(min(N, Alphabet))',
        pythonCode: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        left = 0
        max_len = 0
        for right, c in enumerate(s):
            if c in char_map and char_map[c] >= left:
                left = char_map[c] + 1
            char_map[c] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
        tsCode: `function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map.has(c) && map.get(c)! >= left) {
      left = map.get(c)! + 1;
    }
    map.set(c, right);
    maxLen = Math.max(maxLen, right - left + 1);
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
    name: 'Monotonic Stack (Next Greater / Smaller)',
    category: 'array_string',
    tagline: 'Linear O(N) boundary lookup for histogram and temperature problems',
    description: 'Maintains elements in strictly increasing or decreasing order, popping violating elements in O(1) amortized time.',
    whyThisPattern: 'Each element is pushed and popped at most once, providing next greater/smaller boundaries in single linear pass.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    dataStructures: ['Stacks'],
    algorithms: ['Monotonic Stack'],
    visualizerType: 'stack',
    whenToUse: [
      'Next Greater Element / Daily Temperatures',
      'Largest Rectangle in Histogram',
      'Trapping Rain Water with monotonic boundaries'
    ],
    whenToAvoid: [
      'Problems with non-directional arbitrary pair lookups'
    ],
    practiceProblems: [
      {
        id: 'lc-496',
        title: 'Next Greater Element I',
        difficulty: 'Easy',
        problemNumber: 496,
        url: 'https://leetcode.com/problems/next-greater-element-i/',
        summary: 'Find the next greater element to the right in an array in O(N).'
      },
      {
        id: 'lc-739',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        problemNumber: 739,
        url: 'https://leetcode.com/problems/daily-temperatures/',
        summary: 'Calculate days to wait for a warmer temperature using decreasing stack.'
      },
      {
        id: 'lc-84',
        title: 'Largest Rectangle in Histogram',
        difficulty: 'Hard',
        problemNumber: 84,
        url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
        summary: 'Find area of largest rectangle in histogram bars in O(N) amortized time.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-739',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 739,
        url: 'https://leetcode.com/problems/daily-temperatures/',
        summary: 'Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.',
        keyInsight: 'Maintain a decreasing monotonic stack of indices. When encountering a higher temperature, pop indices and calculate day diff.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        pythonCode: `from typing import List

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        res = [0] * len(temperatures)
        stack = []  # indices
        for i, t in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < t:
                prev_idx = stack.pop()
                res[prev_idx] = i - prev_idx
            stack.append(i)
        return res`,
        tsCode: `function dailyTemperatures(temperatures: number[]): number[] {
  const res = new Array(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
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
    name: 'Prefix Sums & Frequency Maps',
    category: 'array_string',
    tagline: 'Instant O(1) range sum queries and frequency matching',
    description: 'Precomputes cumulative sums to evaluate range sums sum(L..R) = P[R+1] - P[L] in constant O(1) time.',
    whyThisPattern: 'Transforms range queries into instant algebraic subtractions.',
    timeComplexity: 'O(N) build, O(1) query',
    spaceComplexity: 'O(N)',
    dataStructures: ['Prefix Array', 'Hash Maps'],
    algorithms: ['Prefix Sums'],
    visualizerType: 'prefix_sum',
    whenToUse: [
      'Static range sum queries in O(1)',
      'Subarray Sum Equals K with prefix frequency hash map',
      'Contiguous array with equal 0s and 1s'
    ],
    whenToAvoid: [
      'Dynamic array with frequent updates (use Segment Tree or Fenwick Tree in O(log N))'
    ],
    practiceProblems: [
      {
        id: 'lc-303',
        title: 'Range Sum Query - Immutable',
        difficulty: 'Easy',
        problemNumber: 303,
        url: 'https://leetcode.com/problems/range-sum-query-immutable/',
        summary: 'Calculate sum of elements between [left, right] in O(1) time.'
      },
      {
        id: 'lc-560',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        problemNumber: 560,
        url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
        summary: 'Find total number of subarrays whose sum equals K in linear time.'
      },
      {
        id: 'lc-1074',
        title: 'Number of Submatrices That Sum to Target',
        difficulty: 'Hard',
        problemNumber: 1074,
        url: 'https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/',
        summary: '2D Prefix Sums to find count of submatrices summing to target.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-560',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 560,
        url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
        summary: 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.',
        keyInsight: 'If current_sum - k exists in prefix map, then a subarray summing to k ended at the current index. Total count += map[current_sum - k].',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        pythonCode: `from collections import defaultdict
from typing import List

class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        prefix_counts = defaultdict(int)
        prefix_counts[0] = 1
        curr_sum = 0
        count = 0
        for num in nums:
            curr_sum += num
            if curr_sum - k in prefix_counts:
                count += prefix_counts[curr_sum - k]
            prefix_counts[curr_sum] += 1
        return count`,
        tsCode: `function subarraySum(nums: number[], k: number): number {
  const map = new Map<number, number>();
  map.set(0, 1);
  let currSum = 0, count = 0;
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
    name: 'Dynamic Programming (1D / 2D Tabulation)',
    category: 'dp',
    tagline: 'Polynomial runtime for combinatorial and optimal choice subproblems',
    description: 'Caches subproblem solutions in state tables (dp[i] or dp[i][j]) to avoid exponential recursive recomputation.',
    whyThisPattern: 'Solves overlapping subproblems in topological evaluation order.',
    timeComplexity: 'O(States * Transitions)',
    spaceComplexity: 'O(States)',
    dataStructures: ['DP Tables', 'Arrays'],
    algorithms: ['Tabulation', 'Memoization'],
    visualizerType: 'dp',
    whenToUse: [
      'Coin Change, Climbing Stairs, House Robber (1D)',
      'Longest Common Subsequence, Edit Distance (2D)',
      '0/1 Knapsack optimization'
    ],
    whenToAvoid: [
      'Problems with greedy choice property (use Greedy in O(N log N))',
      'No overlapping subproblems (use simple Divide and Conquer)'
    ],
    practiceProblems: [
      {
        id: 'lc-70',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        problemNumber: 70,
        url: 'https://leetcode.com/problems/climbing-stairs/',
        summary: 'Count distinct ways to climb N stairs taking 1 or 2 steps.'
      },
      {
        id: 'lc-322',
        title: 'Coin Change',
        difficulty: 'Medium',
        problemNumber: 322,
        url: 'https://leetcode.com/problems/coin-change/',
        summary: 'Compute fewest coins needed to make up given amount.'
      },
      {
        id: 'lc-72',
        title: 'Edit Distance',
        difficulty: 'Hard',
        problemNumber: 72,
        url: 'https://leetcode.com/problems/edit-distance/',
        summary: 'Find minimum operations to convert word1 to word2 using 2D DP.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-322',
        title: 'Coin Change',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 322,
        url: 'https://leetcode.com/problems/coin-change/',
        summary: 'Return the fewest number of coins that you need to make up that amount.',
        keyInsight: 'dp[i] = min(dp[i - c] + 1) for all c in coins where i - c >= 0. Base case dp[0] = 0.',
        timeComplexity: 'O(Amount * len(coins))',
        spaceComplexity: 'O(Amount)',
        pythonCode: `from typing import List

class Solution:
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
      if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
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
    name: 'Trie (Prefix Tree) & Word Segmentation',
    category: 'array_string',
    tagline: 'O(L) prefix search and dictionary pattern matching',
    description: 'Tree data structure where edges represent characters, allowing dictionary queries and prefix lookups in O(L) time.',
    whyThisPattern: 'Prefix sharing compresses dictionary words and allows early branch pruning.',
    timeComplexity: 'O(L) per word operation',
    spaceComplexity: 'O(Total Characters * Alphabet Size)',
    dataStructures: ['Tries', 'Hash Maps'],
    algorithms: ['Prefix Traversal'],
    visualizerType: 'trie',
    whenToUse: [
      'Prefix search, autocomplete, and dictionary lookups',
      'Word Break segmentation with dictionary',
      'Boggle grid word search with DFS pruning'
    ],
    whenToAvoid: [
      'Exact full string match only without prefixes (use Hash Set in O(1) average)'
    ],
    practiceProblems: [
      {
        id: 'lc-14',
        title: 'Longest Common Prefix',
        difficulty: 'Easy',
        problemNumber: 14,
        url: 'https://leetcode.com/problems/longest-common-prefix/',
        summary: 'Find longest common prefix string among array of strings.'
      },
      {
        id: 'lc-208',
        title: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        problemNumber: 208,
        url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
        summary: 'Implement insert, search, and startsWith methods in a Trie.'
      },
      {
        id: 'lc-212',
        title: 'Word Search II',
        difficulty: 'Hard',
        problemNumber: 212,
        url: 'https://leetcode.com/problems/word-search-ii/',
        summary: 'Find all dictionary words on a 2D board using Trie + DFS.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-208',
        title: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 208,
        url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
        summary: 'Implement a trie with insert, search, and startsWith methods.',
        keyInsight: 'Each TrieNode contains a dictionary of children and an is_end boolean flag.',
        timeComplexity: 'O(L) per operation',
        spaceComplexity: 'O(N * L)',
        pythonCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word: str) -> None:
        node = self.root
        for c in word:
            if c not in node.children: node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True
    def search(self, word: str) -> bool:
        node = self.root
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end
    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True`,
        tsCode: `class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

class Trie {
  root = new TrieNode();
  insert(word: string): void {
    let node = this.root;
    for (const c of word) {
      if (!node.children.has(c)) node.children.set(c, new TrieNode());
      node = node.children.get(c)!;
    }
    node.isEnd = true;
  }
  search(word: string): boolean {
    let node = this.root;
    for (const c of word) {
      if (!node.children.has(c)) return false;
      node = node.children.get(c)!;
    }
    return node.isEnd;
  }
  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const c of prefix) {
      if (!node.children.has(c)) return false;
      node = node.children.get(c)!;
    }
    return true;
  }
}`,
        sampleInput: '["Trie","insert","search","startsWith"], [[],["apple"],["apple"],["app"]]',
        sampleOutput: '[null, null, true, true]'
      }
    ]
  },

  'greedy-intervals': {
    id: 'greedy-intervals',
    name: 'Greedy Interval Scheduling & Scanning',
    category: 'greedy',
    tagline: 'O(N log N) sorting + single scan for non-overlapping selection',
    description: 'Sorts intervals by start or finish time, making locally optimal non-overlapping choices without backtracking.',
    whyThisPattern: 'Picking the interval that ends earliest leaves maximum possible room for remaining compatible intervals.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1) or O(N)',
    dataStructures: ['Interval Arrays'],
    algorithms: ['Greedy', 'Sorting'],
    visualizerType: 'greedy',
    whenToUse: [
      'Non-overlapping interval scheduling & interval merging',
      'Minimum meeting rooms required',
      'Jump Game minimum reach'
    ],
    whenToAvoid: [
      'When decisions have non-local downstream dependencies (use DP)'
    ],
    practiceProblems: [
      {
        id: 'lc-121',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        problemNumber: 121,
        url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        summary: 'Maximize profit tracking lowest buying price in a single pass.'
      },
      {
        id: 'lc-56',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        problemNumber: 56,
        url: 'https://leetcode.com/problems/merge-intervals/',
        summary: 'Merge all overlapping intervals after sorting by start time.'
      },
      {
        id: 'lc-135',
        title: 'Candy',
        difficulty: 'Hard',
        problemNumber: 135,
        url: 'https://leetcode.com/problems/candy/',
        summary: 'Distribute minimum candies to children with two greedy scans.'
      }
    ],
    classicProblems: [
      {
        id: 'lc-56',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 56,
        url: 'https://leetcode.com/problems/merge-intervals/',
        summary: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
        keyInsight: 'Sort intervals by start time. If current.start <= prev.end, merge: prev.end = max(prev.end, current.end).',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        pythonCode: `from typing import List

class Solution:
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
