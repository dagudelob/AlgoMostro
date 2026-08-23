import type { AlgoItem } from '../types/visualizer';

export const ALGORITHMS: AlgoItem[] = [
  {
    id: 'algo-sliding-window',
    name: 'Sliding Window',
    category: 'algorithm',
    type: 'sliding_window',
    description: 'Maintains a continuous subsegment [L..R] over an array or string, adjusting pointers in O(N) linear time to find optimal subarrays.',
    iconName: 'Maximize2',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(K) or O(1)',
    patterns: [
      'Fixed window size K (Max sum of subarray of size K)',
      'Dynamic window size with condition (Smallest subarray with sum >= S)',
      'Substring with at most K distinct characters'
    ],
    keySignals: [
      'Problem mentions contiguous subarray or substring',
      'Targeting min/max length satisfying a condition',
      'Requires linear O(N) optimization over O(N^2) brute force'
    ],
    pythonSnippet: `from typing import List

def max_sub_array_of_size_k(k: int, arr: List[int]) -> int:
    # Sliding Window of fixed size K in O(N) time and O(1) space
    max_sum = 0
    window_sum = 0
    window_start = 0

    for window_end in range(len(arr)):
        window_sum += arr[window_end]  # Add next element

        # Slide window once size K is reached
        if window_end >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[window_start]  # Subtract outgoing element
            window_start += 1  # Slide window forward

    return max_sum

# Test Run
print(max_sub_array_of_size_k(3, [2, 1, 5, 2, 8, 1, 4, 3]))  # 15 ([5, 2, 8])`,
    tsSnippet: `function maxSubArrayOfSizeK(k: number, arr: number[]): number {
  // Sliding Window of fixed size K in O(N)
  let maxSum = 0;
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // Add incoming element

    // Slide window once we reach size K
    if (windowEnd >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[windowStart]; // Subtract outgoing element
      windowStart++; // Slide forward
    }
  }

  return maxSum;
}`
  },
  {
    id: 'algo-two-pointers',
    name: 'Two Pointers',
    category: 'algorithm',
    type: 'two_pointers',
    description: 'Uses two converging, diverging, or fast/slow pointers to process elements in a single pass without extra memory allocation.',
    iconName: 'ArrowLeftRight',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(1)',
    patterns: [
      'Opposite-direction converging (Two Sum II in sorted array)',
      'Fast & slow runner (Cycle detection in linked list)',
      'In-place 3-way partitioning (Dutch National Flag / Sort Colors)'
    ],
    keySignals: [
      'Input array is sorted or can be sorted',
      'Searching for pairs/triplets with target sum',
      'Requires in-place O(1) auxiliary space'
    ],
    pythonSnippet: `from typing import List, Optional

def two_sum_sorted(nums: List[int], target: int) -> Optional[List[int]]:
    # Converging Two Pointers in O(N) time and O(1) space
    left, right = 0, len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum

    return None

# Test Run
print(two_sum_sorted([1, 3, 4, 6, 8, 9, 11, 15], 14))  # [1, 6] (3 + 11 = 14)`,
    tsSnippet: `function twoSumSorted(nums: number[], target: number): [number, number] | null {
  // Converging Two Pointers in O(N) time, O(1) space
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const currentSum = nums[left] + nums[right];
    if (currentSum === target) {
      return [left, right];
    } else if (currentSum < target) {
      left++; // Increase sum
    } else {
      right--; // Decrease sum
    }
  }

  return null;
}`
  },
  {
    id: 'algo-bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'algorithm',
    type: 'bfs',
    description: 'Graph and tree exploration algorithm that visits vertices level by level using a FIFO queue, guaranteeing shortest paths on unweighted graphs.',
    iconName: 'Waves',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    patterns: [
      'Level-order tree traversal (Print tree level by level)',
      'Shortest path on unweighted grid / maze',
      'Multi-source BFS (Rotting Oranges)'
    ],
    keySignals: [
      'Finding the minimum steps/distance to reach target',
      'Layered tree output required',
      'Uniform step cost across grid or graph'
    ],
    pythonSnippet: `from collections import deque
from typing import List, Tuple

def shortest_path_grid(grid: List[List[int]], start: Tuple[int, int], target: Tuple[int, int]) -> int:
    # BFS Level-by-level shortest path in O(R * C)
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start[0], start[1], 0)])  # (r, c, distance)
    visited = {start}

    while queue:
        r, c, dist = queue.popleft()
        if (r, c) == target:
            return dist

        for dr, dc in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited and grid[nr][nc] == 0:
                visited.add((nr, nc))
                queue.append((nr, nc, dist + 1))

    return -1  # Target unreachable`,
    tsSnippet: `function shortestPathBFS(grid: number[][], start: [number, number], target: [number, number]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue: [number, number, number][] = [[start[0], start[1], 0]];
  const visited = new Set<string>([\`\${start[0]},\${start[1]}\`]);

  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift()!;
    if (r === target[0] && c === target[1]) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      const key = \`\${nr},\${nc}\`;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(key) && grid[nr][nc] === 0) {
        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  return -1;
}`
  },
  {
    id: 'algo-dfs',
    name: 'Depth-First Search (DFS) & Backtracking',
    category: 'algorithm',
    type: 'dfs',
    description: 'Explores deeply along branches using recursion or a stack, backtracking upon reaching dead ends. Ideal for exhaustive path search.',
    iconName: 'CornerDownRight',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V) [Call Stack]',
    patterns: [
      'Connected components & island counting',
      'Tree depth, ancestor LCA, and path validation',
      'Backtracking permutations, subsets, and puzzle solving (Sudoku/N-Queens)'
    ],
    keySignals: [
      'Must explore all combinations or permutations',
      'Recursive tree validation (BST property)',
      'Cycle detection in directed graphs'
    ],
    pythonSnippet: `from typing import List

def num_islands_dfs(grid: List[List[str]]) -> int:
    # DFS Connected Components in O(R * C)
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    island_count = 0

    def dfs(r: int, c: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'  # Mark visited in-place
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                island_count += 1
                dfs(r, c)

    return island_count`,
    tsSnippet: `function numIslands(grid: string[][]): number {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // Mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
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
    description: 'Solves complex optimization problems by breaking them down into subproblems and caching results via memoization or tabulation.',
    iconName: 'Boxes',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N * W)',
      worst: 'O(N^2)',
    },
    spaceComplexity: 'O(N) to O(N * W)',
    patterns: [
      '1D Tabulation (Coin Change, Climbing Stairs)',
      '2D Matrix DP (Longest Common Subsequence, Edit Distance)',
      '0/1 Knapsack & Unbounded Knapsack'
    ],
    keySignals: [
      'Problem asks to maximize, minimize, or count total valid ways',
      'Future decisions depend on results of previous sub-decisions',
      'Exhibits overlapping subproblems and optimal substructure'
    ],
    pythonSnippet: `from typing import List

def coin_change_dp(coins: List[int], amount: int) -> int:
    # 1D Tabulation DP in O(Amount * len(coins)) time and O(Amount) space
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # Base case: 0 coins needed for 0 amount

    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

# Test Run
print(coin_change_dp([1, 2, 5], 7))  # 2 (5 + 2 = 7)`,
    tsSnippet: `function coinChange(coins: number[], amount: number): number {
  // 1D Tabulation DP in O(Amount * coins.length) time, O(Amount) space
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // Base case

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
    description: 'Divides search intervals in half on sorted arrays or monotonic answer predicates, achieving logarithmic O(log N) runtime.',
    iconName: 'Search',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(1)',
    patterns: [
      'Classic sorted value search (Find target in sorted array)',
      'Binary Search on Answer Space (Koko Eating Bananas, Capacity to Ship Packages)',
      'First/Last occurrence boundary search (Search in Rotated Sorted Array)'
    ],
    keySignals: [
      'Input array is sorted',
      'Problem asks to find minimum or maximum value that satisfies a feasibility test',
      'Need better runtime than linear O(N)'
    ],
    pythonSnippet: `from typing import List

def binary_search(nums: List[int], target: int) -> int:
    # Binary Search in O(log N) time and O(1) space
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2  # Prevents integer overflow
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half

    return -1

# Test Run
print(binary_search([2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91], 23))  # 5`,
    tsSnippet: `function binarySearch(nums: number[], target: number): number {
  // Binary Search in O(log N) time, O(1) space
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1; // Discard left half
    } else {
      right = mid - 1; // Discard right half
    }
  }

  return -1;
}`
  },
  {
    id: 'algo-greedy',
    name: 'Greedy Algorithms',
    category: 'algorithm',
    type: 'greedy',
    description: 'Constructs a solution by making the locally optimal choice at each step without backtracking, proven to yield the global optimum.',
    iconName: 'Zap',
    timeComplexity: {
      best: 'O(N log N)',
      average: 'O(N log N)',
      worst: 'O(N log N)',
    },
    spaceComplexity: 'O(1) to O(N)',
    patterns: [
      'Interval Scheduling (Max non-overlapping intervals)',
      'Jump Game (Reachable maximum boundary tracking)',
      'Huffman Coding & Fractional Knapsack'
    ],
    keySignals: [
      'Problem involves interval ranges with [start, end]',
      'Local optimal decision never needs to be revised later',
      'Sorting by end-time simplifies decisions'
    ],
    pythonSnippet: `from typing import List

def erase_overlap_intervals(intervals: List[List[int]]) -> int:
    # Greedy Interval Scheduling in O(N log N)
    if not intervals:
        return 0

    # Sort intervals by finish time
    intervals.sort(key=lambda x: x[1])

    non_overlapping_count = 0
    last_end = float('-inf')

    for start, end in intervals:
        if start >= last_end:
            non_overlapping_count += 1
            last_end = end

    return len(intervals) - non_overlapping_count  # Removals required

# Test Run
print(erase_overlap_intervals([[1, 3], [2, 5], [4, 7], [1, 8], [6, 9], [8, 10]]))  # 2`,
    tsSnippet: `function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  // Sort by finish time O(N log N)
  intervals.sort((a, b) => a[1] - b[1]);

  let nonOverlapping = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      nonOverlapping++;
      lastEnd = end;
    }
  }

  return intervals.length - nonOverlapping;
}`
  },
  {
    id: 'algo-prefix-sum',
    name: 'Prefix Sums',
    category: 'algorithm',
    type: 'prefix_sum',
    description: 'Precomputes cumulative sums in an array in O(N), allowing range sum queries sum(L..R) in instantaneous O(1) time.',
    iconName: 'Calculator',
    timeComplexity: {
      best: 'O(N) build, O(1) query',
      average: 'O(N) build, O(1) query',
      worst: 'O(N) build, O(1) query',
    },
    spaceComplexity: 'O(N)',
    patterns: [
      'Range sum queries: sum(L..R) = P[R+1] - P[L]',
      'Subarray Sum Equals K (Combined with HashMap of prefix frequencies)',
      '2D Prefix Sums for Submatrix sum queries'
    ],
    keySignals: [
      'Multiple queries asking for sum of sub-arrays',
      'Finding count of subarrays whose sum equals K',
      'Need instant O(1) subtraction over precomputed prefixes'
    ],
    pythonSnippet: `from typing import List

class NumArrayPrefixSum:
    def __init__(self, nums: List[int]):
        # Build prefix array P[i] = P[i-1] + nums[i-1] in O(N)
        self.prefix: List[int] = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sum_range(self, left: int, right: int) -> int:
        # Instant query in O(1)
        return self.prefix[right + 1] - self.prefix[left]

# Test Run
num_arr = NumArrayPrefixSum([3, 1, 4, 1, 5, 9, 2, 6])
print(num_arr.sum_range(2, 5))  # 4 + 1 + 5 + 9 = 19`,
    tsSnippet: `class NumArrayPrefixSum {
  private prefix: number[];

  constructor(nums: number[]) {
    // Build prefix array in O(N)
    this.prefix = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  // Instant query in O(1)
  sumRange(left: number, right: number): number {
    return this.prefix[right + 1] - this.prefix[left];
  }
}`
  }
];
