import type { AlgoItem } from '../types/visualizer';

export const ALGORITHMS: AlgoItem[] = [
  {
    id: 'algo-sliding-window',
    name: 'Sliding Window',
    category: 'algorithm',
    type: 'sliding_window',
    description: 'Técnica sobre arrays o strings contiguos que mantiene una ventana delimitada por punteros [L, R] expandiendo o contrayendo dinámicamente.',
    iconName: 'Maximize2',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(K) o O(1)',
    patterns: [
      'Ventana de tamaño fijo (ej. suma de subconjunto de tamaño K)',
      'Ventana de tamaño dinámico con condición de validez (ej. subcadena con caracteres únicos)',
      'Ventana con conteo de frecuencias (HashMap o Array)'
    ],
    keySignals: [
      'Subarray o substring contiguo',
      'Minimizar o maximizar longitud bajo restricción',
      'Entrada lineal donde el problema se puede resolver expandiendo R y encogiendo L'
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
    description: 'Estrategia que utiliza dos referencias de índice que se mueven hacia el centro (convergentes) o a diferentes velocidades (rápido/lento).',
    iconName: 'MoveHorizontal',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(1)',
    patterns: [
      'Punteros opuestos (izq -> <- der) en arrays ordenados o palíndromos',
      'Puntero rápido y lento (Tortoise & Hare) para ciclos en linked lists o punto medio',
      'Particionamiento in-place (ej. Dutch National Flag, mover ceros al final)'
    ],
    keySignals: [
      'Array ordenado con búsqueda de pares (Two Sum II, 3Sum)',
      'Inversión de secuencias o chequeo simétrico',
      'Detección de ciclos sin memoria adicional O(1)'
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
    description: 'Recorrido por capas de nivel que explora todos los vecinos a distancia 1, luego distancia 2, garantizando el camino más corto en grafos no ponderados.',
    iconName: 'Radio',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    patterns: [
      'Camino más corto en grafos no ponderados o matrices/laberintos',
      'Recorrido por niveles en árboles binarios (Level Order Traversal)',
      'Multi-source BFS (ej. propagación de fuego o podredumbre simultánea)'
    ],
    keySignals: [
      'Encontrar el número MÍNIMO de pasos / turnos / transformaciones',
      'Estructura de árbol o grafo donde se piden capas de profundidad',
      'Requiere una cola FIFO (Queue) para procesar nodos'
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
    description: 'Exploración profunda que sigue cada rama hasta la hoja antes de retroceder (backtrack), usando recursión o pila explícita.',
    iconName: 'CornerDownRight',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E) o O(2^N / N!)',
    },
    spaceComplexity: 'O(H) o O(V)',
    patterns: [
      'Conectividad y componentes conexas (ej. Number of Islands)',
      'Backtracking combinatorio (permutaciones, subconjuntos, N-Queens, Sudoku)',
      'Detección de ciclos y Topological Sort en grafos dirigidos'
    ],
    keySignals: [
      'Generar TODAS las combinaciones o caminos válidos',
      'Problemas en árboles donde se procesan subárboles (Divide & Conquer)',
      'Búsqueda exhaustiva con podas condicionales'
    ],
    snippet: `function numIslands(grid: string[][]): number {
  let count = 0;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // Marcar visitado
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
    description: 'Técnica de optimización que descompone el problema en subproblemas superpuestos y almacena sus soluciones en una tabla (memoization o tabulación).',
    iconName: 'Grid',
    timeComplexity: {
      best: 'O(N) o O(N*W)',
      average: 'O(N^2) o O(N*K)',
      worst: 'O(N*M)',
    },
    spaceComplexity: 'O(N) o O(N*M) optimizable a O(1)/O(M)',
    patterns: [
      '1D DP: Fibonacci, House Robber, Climbing Stairs, Coin Change',
      '2D Grid DP: Unique Paths, Minimum Path Sum',
      'Strings DP: Longest Common Subsequence, Edit Distance',
      'Knapsack (0/1 y no acotado) y Bitmask DP'
    ],
    keySignals: [
      'Contar número total de maneras (Ways to reach...)',
      'Maximizar o minimizar valor con decisiones dependientes',
      'Subestructura óptima y subproblemas repetidos'
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
    description: 'Algoritmo de búsqueda logarítmica que descarta la mitad del espacio de búsqueda en cada paso, aplicable a colecciones ordenadas o funciones monótonas.',
    iconName: 'ScanLine',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(1)',
    patterns: [
      'Búsqueda clásica de elemento en array ordenado',
      'Binary Search on Answer / Monotonic Predicate (ej. Koko Eating Bananas, Capacity To Ship Packages)',
      'Rotated Sorted Array (buscar pivote)'
    ],
    keySignals: [
      'Entrada ordenada o respuesta con propiedad monótona (TTTTFFFF o FFFFFTTT)',
      'Tiempo de ejecución requerido O(log N)',
      'Problemas de "Encontrar el mínimo valor X tal que la condición se cumpla"'
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
    description: 'Estrategia heurística que toma la mejor decisión localmente óptima en cada paso con la esperanza de alcanzar la solución global óptima.',
    iconName: 'Compass',
    timeComplexity: {
      best: 'O(N log N) (con ordenamiento)',
      average: 'O(N log N)',
      worst: 'O(N log N)',
    },
    spaceComplexity: 'O(1) o O(N)',
    patterns: [
      'Interval Scheduling y Non-overlapping Intervals',
      'Gas Station / Jump Game',
      'Huffman Coding, Kruskal / Prim MST, Dijkstra'
    ],
    keySignals: [
      'Ordenar los datos primero por tiempo de inicio o finalización',
      'No se necesita reconsiderar elecciones pasadas (sin backtracking)',
      'Propiedad de elección voraz demostrable matemáticamente'
    ],
    snippet: `function eraseOverlapIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => a[1] - b[1]); // Ordenar por fin
  let count = 0, prevEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      count++; // Eliminar intervalo solapado
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
    description: 'Técnica de precomputación de sumas acumuladas que permite responder consultas de suma de rango en O(1) y resolver problemas con tablas hash.',
    iconName: 'PlusSquare',
    timeComplexity: {
      best: 'O(N) precomputación, O(1) query',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(N) o O(1)',
    patterns: [
      'Range Sum Query 1D y 2D (matrices)',
      'Subarray Sum Equals K (Prefix Sum + HashMap)',
      'Diferencia de arrays para actualizaciones de rango en O(1)'
    ],
    keySignals: [
      'Consultas repetidas de sumas de subarreglos',
      'Buscar subarreglos cuya suma sea múltiplo de K o igual a K',
      'Fórmula clave: Sum(L..R) = Prefix[R] - Prefix[L-1]'
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
