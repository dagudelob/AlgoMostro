import type { AlgoItem } from '../types/visualizer';

export const ALGORITHMS: AlgoItem[] = [
  {
    id: 'algo-sliding-window',
    name: 'Sliding Window',
    category: 'algorithm',
    type: 'sliding_window',
    description: 'An algorithmic pattern maintaining a contiguous window [L, R] over arrays or strings, expanding or shrinking dynamically.',
    iconName: 'Maximize2',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(K) or O(1)',
    patterns: [
      'Fixed-size window (e.g. max sum of size K)',
      'Dynamic-size window with validity condition (e.g. longest substring with unique chars)',
      'Window with frequency counters (HashMap or Array)'
    ],
    keySignals: [
      'Contiguous subarray or substring problem',
      'Minimizing or maximizing window length under a constraint',
      'Linear input where expanding R and shrinking L eliminates redundant computations'
    ],
    snippet: `function minSubArrayLen(target: number, nums: number[]): number {
  let l = 0, sum = 0, minLen = Infinity;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      minLen = Math.min(minLen, r - l + 1);
      sum -= nums[l++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`
  },
  {
    id: 'algo-two-pointers',
    name: 'Two Pointers',
    category: 'algorithm',
    type: 'two_pointers',
    description: 'A technique utilizing two index pointers moving towards each other (converging) or at different speeds (fast/slow).',
    iconName: 'MoveHorizontal',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(1)',
    patterns: [
      'Opposite directional pointers (left -> <- right) in sorted arrays or palindrome checks',
      'Fast & slow pointers (Tortoise & Hare) for linked list cycles or midpoints',
      'In-place partitioning (e.g. Dutch National Flag, move zeros)'
    ],
    keySignals: [
      'Sorted array with target pair search (Two Sum II, 3Sum)',
      'Sequence reversal or symmetric verification',
      'Cycle detection in O(1) auxiliary space'
    ],
    snippet: `function twoSumSorted(numbers: number[], target: number): number[] {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum < target) l++;
    else r--;
  }
  return [];
}`
  },
  {
    id: 'algo-bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'algorithm',
    type: 'bfs',
    description: 'A level-by-level exploration discovering all neighbors at distance 1, then distance 2, guaranteeing the shortest path in unweighted graphs.',
    iconName: 'Radio',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    patterns: [
      'Shortest path in unweighted graphs or 2D grid mazes',
      'Binary tree level-order traversal',
      'Multi-source BFS (e.g. simultaneous fire or rot spread)'
    ],
    keySignals: [
      'Finding the MINIMUM number of steps / transformations / moves',
      'Tree or graph level-by-level inspection',
      'Requires a FIFO Queue to process frontier nodes'
    ],
    snippet: `function bfsShortestPath(graph: number[][], start: number, target: number): number {
  const queue: [number, number][] = [[start, 0]];
  const visited = new Set<number>([start]);
  while (queue.length > 0) {
    const [curr, dist] = queue.shift()!;
    if (curr === target) return dist;
    for (const neighbor of graph[curr]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}`
  },
  {
    id: 'algo-dfs',
    name: 'Depth-First Search (DFS & Backtracking)',
    category: 'algorithm',
    type: 'dfs',
    description: 'A deep exploration strategy that traverses as far as possible down each branch before backtracking, utilizing recursion or an explicit stack.',
    iconName: 'CornerDownRight',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E) or O(2^N / N!)',
    },
    spaceComplexity: 'O(H) or O(V)',
    patterns: [
      'Connectivity and connected components (e.g. Number of Islands)',
      'Combinatorial backtracking (permutations, subsets, N-Queens, Sudoku)',
      'Cycle detection and Topological Sort in directed graphs'
    ],
    keySignals: [
      'Generate ALL valid combinations or path permutations',
      'Tree problems where subtrees are processed recursively (Divide & Conquer)',
      'Exhaustive search with pruning conditions'
    ],
    snippet: `function numIslands(grid: string[][]): number {
  let count = 0;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // Mark visited
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}`
  },
  {
    id: 'algo-dp',
    name: 'Dynamic Programming (DP)',
    category: 'algorithm',
    type: 'dp',
    description: 'An optimization method that breaks complex problems down into overlapping subproblems and caches their solutions (memoization or tabulation).',
    iconName: 'Grid',
    timeComplexity: {
      best: 'O(N) or O(N*W)',
      average: 'O(N^2) or O(N*K)',
      worst: 'O(N*M)',
    },
    spaceComplexity: 'O(N) or O(N*M) optimizable to O(1)/O(M)',
    patterns: [
      '1D DP: Fibonacci, House Robber, Climbing Stairs, Coin Change',
      '2D Grid DP: Unique Paths, Minimum Path Sum',
      'Strings DP: Longest Common Subsequence, Edit Distance',
      'Knapsack (0/1 and unbounded) and Bitmask DP'
    ],
    keySignals: [
      'Counting the total number of ways (Ways to reach...)',
      'Maximizing or minimizing a value with sequential decisions',
      'Optimal substructure and repeating subproblems'
    ],
    snippet: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`
  },
  {
    id: 'algo-binary-search',
    name: 'Binary Search',
    category: 'algorithm',
    type: 'binary_search',
    description: 'A logarithmic search algorithm that halves the search space at each step, applicable to sorted arrays or monotonic predicate functions.',
    iconName: 'ScanLine',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(1)',
    patterns: [
      'Classic sorted array element search',
      'Binary Search on Answer / Monotonic Predicate (e.g. Koko Eating Bananas, Capacity To Ship Packages)',
      'Rotated Sorted Array (find pivot point)'
    ],
    keySignals: [
      'Sorted input or monotonic answer space (TTTTFFFF or FFFFFTTT)',
      'Required runtime complexity of O(log N)',
      '"Find the minimum X such that condition is satisfied"'
    ],
    snippet: `function binarySearch(nums: number[], target: number): number {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}`
  },
  {
    id: 'algo-greedy',
    name: 'Greedy Algorithms',
    category: 'algorithm',
    type: 'greedy',
    description: 'A heuristic paradigm that makes the locally optimal choice at each stage with the goal of reaching a globally optimal solution.',
    iconName: 'Compass',
    timeComplexity: {
      best: 'O(N log N) (with sorting)',
      average: 'O(N log N)',
      worst: 'O(N log N)',
    },
    spaceComplexity: 'O(1) or O(N)',
    patterns: [
      'Interval Scheduling & Non-overlapping Intervals',
      'Gas Station / Jump Game',
      'Huffman Coding, Kruskal/Prim MST, Dijkstra'
    ],
    keySignals: [
      'Sort elements first by start or end time',
      'No need to revisit past choices (no backtracking required)',
      'Greedy choice property is mathematically provable'
    ],
    snippet: `function eraseOverlapIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => a[1] - b[1]); // Sort by end time
  let count = 0, prevEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      count++; // Remove overlapping interval
    }
  }
  return count;
}`
  },
  {
    id: 'algo-prefix-sum',
    name: 'Prefix Sum',
    category: 'algorithm',
    type: 'prefix_sum',
    description: 'A cumulative sum precomputation technique allowing O(1) range sum queries and O(N) subarray sum matching with HashMaps.',
    iconName: 'PlusSquare',
    timeComplexity: {
      best: 'O(N) precomputation, O(1) query',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(N) or O(1)',
    patterns: [
      'Range Sum Query 1D & 2D (matrices)',
      'Subarray Sum Equals K (Prefix Sum + HashMap)',
      'Difference array for O(1) range interval updates'
    ],
    keySignals: [
      'Repeated range sum queries on static arrays',
      'Count contiguous subarrays with sum equal to or divisible by K',
      'Core identity: Sum(L..R) = Prefix[R+1] - Prefix[L]'
    ],
    snippet: `function subarraySum(nums: number[], k: number): number {
  const map = new Map<number, number>([[0, 1]]);
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    if (map.has(sum - k)) count += map.get(sum - k)!;
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}`
  }
];
