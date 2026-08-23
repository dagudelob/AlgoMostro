import type { AlgorithmResult } from '../types/flowchart';

export const ALGORITHM_RESULTS: Record<string, AlgorithmResult> = {
  'tree-dp': {
    id: 'tree-dp',
    name: 'Tree DP / Divide & Conquer',
    category: 'tree',
    tagline: 'Descomposición recursiva y programación dinámica sobre árboles',
    description: 'Calcula respuestas óptimas o cuenta combinaciones combinando los resultados independientes de los subárboles izquierdo y derecho.',
    whyThisPattern: 'Los árboles tienen una estructura recursiva inherente. Al resolver subárboles hijos de forma independiente, podemos agregar las soluciones hacia la raíz.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) donde H es la altura del árbol',
    dataStructures: ['Trees', 'Recursion Stack'],
    algorithms: ['DFS', 'Dynamic Programming'],
    visualizerType: 'tree',
    whenToUse: [
      'Contar árboles de búsqueda binaria estructuralmente únicos',
      'Diámetro o suma máxima de camino en un árbol binario',
      'Problemas de coloreo o cobertura de vértices en árboles'
    ],
    whenToAvoid: [
      'Grafos con ciclos donde se requiere detectar visitados',
      'Recorridos por capas donde BFS es más natural'
    ],
    classicProblems: [
      {
        id: 'lc-96',
        title: 'Unique Binary Search Trees',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 96,
        summary: 'Dado un entero n, retorna el número de árboles de búsqueda binaria estructuralmente únicos que tienen exactamente n nodos con valores únicos de 1 a n.',
        keyInsight: 'Para cada nodo i elegido como raíz, hay i-1 nodos en el subárbol izquierdo y n-i en el derecho. Número total G(n) = sum(G(i-1) * G(n-i)) (Números de Catalan).',
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
    tagline: 'Exploración capa por capa de nodos en un árbol mediante cola FIFO',
    description: 'Procesa todos los nodos en la profundidad K antes de descender a la profundidad K+1, ideal para vistas laterales, niveles y distancias mínimas.',
    whyThisPattern: 'Una cola FIFO almacena la capa actual y permite procesar en lotes (batching) el tamaño de cada nivel `len(queue)`.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(W) donde W es el ancho máximo del árbol',
    dataStructures: ['Trees', 'Queues'],
    algorithms: ['BFS'],
    visualizerType: 'bfs',
    whenToUse: [
      'Recorrido por niveles (Level Order Traversal)',
      'Vista derecha o izquierda de un árbol binario',
      'Calcular la distancia de nivel o nodos más cercanos'
    ],
    whenToAvoid: [
      'Cuando se requiere visitar hojas primero (post-order)',
      'Cuando la memoria para la cola es muy alta en árboles densos'
    ],
    classicProblems: [
      {
        id: 'lc-102',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 102,
        summary: 'Dada la raíz de un árbol binario, retorna el recorrido por niveles de los valores de sus nodos (de izquierda a derecha, nivel por nivel).',
        keyInsight: 'Registrar la longitud actual de la cola antes de cada iteración del bucle exterior para agrupar exactamente los nodos de un mismo nivel.',
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
    tagline: 'Exploración en profundidad y backtracking en árboles',
    description: 'Desciende por los caminos hasta las hojas procesando los nodos de acuerdo al orden deseado (Pre-order, In-order, Post-order).',
    whyThisPattern: 'Aprovecha la pila de llamadas para descender y retornar información del subárbol hacia el ancestro (ej. altura, ancestro común).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    dataStructures: ['Trees', 'Recursion Stack'],
    algorithms: ['DFS'],
    visualizerType: 'dfs',
    whenToUse: [
      'Calcular altura o profundidad máxima de un árbol',
      'Lowest Common Ancestor (LCA)',
      'Validar si un árbol es BST (recorrido In-order estrictamente creciente)'
    ],
    whenToAvoid: [
      'Buscar el camino más corto en un árbol desbalanceado infinito'
    ],
    classicProblems: [
      {
        id: 'lc-236',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 236,
        summary: 'Dado un árbol binario, encuentra el ancestro común más bajo (LCA) de dos nodos dados p y q.',
        keyInsight: 'Si la raíz actual coincide con p o q, retorna la raíz. Busca recursivamente en izquierda y derecha: si ambos retornan no-nulo, la raíz actual es el LCA.',
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
    tagline: 'Ordenamiento lineal de vértices en un Grafo Dirigido Acíclico (DAG)',
    description: 'Establece un orden secuencial respetando dependencias direccionales (u -> v significa que u debe ejecutarse antes que v).',
    whyThisPattern: 'El algoritmo de Kahn cuenta el grado de entrada (in-degree) de cada nodo; aquellos con in-degree = 0 pueden procesarse de inmediato.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    dataStructures: ['Graphs', 'Queues', 'Arrays'],
    algorithms: ['BFS', 'DFS'],
    visualizerType: 'graph',
    whenToUse: [
      'Resolución de dependencias y orden de compilación de paquetes',
      'Planificación de cursos universitarios con prerrequisitos',
      'Detección de dependencias circulares / ciclos en grafos dirigidos'
    ],
    whenToAvoid: [
      'Grafos no dirigidos (no existe concepto de prerrequisito unívoco)'
    ],
    classicProblems: [
      {
        id: 'lc-207',
        title: 'Course Schedule',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 207,
        summary: 'Hay numCourses cursos etiquetados de 0 a numCourses-1. Se da una lista de prerrequisitos [a, b]. Determina si es posible finalizar todos los cursos.',
        keyInsight: 'Construir el in-degree array y la lista de adyacencia. Encolar los cursos con in-degree = 0. Si el conteo de cursos procesados es igual a numCourses, no hay ciclo.',
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
    tagline: 'Camino más corto en grafos ponderados con pesos no negativos',
    description: 'Encuentra las distancias mínimas desde un nodo origen a todos los demás vértices expandiendo siempre la menor distancia tentativa acumulada mediante un Min-Heap.',
    whyThisPattern: 'La cola de prioridad voraz (Min-Heap) garantiza que una vez que un nodo es extraído con la menor distancia, su costo óptimo ya no podrá mejorar con aristas de peso positivo.',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
    dataStructures: ['Heaps', 'Graphs', 'Arrays'],
    algorithms: ['Greedy', 'BFS'],
    visualizerType: 'heap',
    whenToUse: [
      'Rutas GPS y mapas de carreteras con tiempos/distancias positivas',
      'Latencia mínima en redes de telecomunicaciones',
      'Menor costo de transformación con ponderaciones no uniformes'
    ],
    whenToAvoid: [
      'Grafos con aristas de peso negativo (usar Bellman-Ford / SPFA)',
      'Grafos no ponderados donde BFS estándar es más rápido O(V + E)'
    ],
    classicProblems: [
      {
        id: 'lc-743',
        title: 'Network Delay Time',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 743,
        summary: 'Se da una red de n nodos y tiempos de viaje times[i] = [u, v, w]. Se envía una señal desde el nodo k. Retorna el tiempo mínimo para que todos los nodos reciban la señal.',
        keyInsight: 'Ejecutar Dijkstra desde el nodo k. La respuesta es el valor máximo entre las distancias más cortas a todos los nodos alcanzables.',
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
    tagline: 'Camino más corto en grafos no ponderados y matrices 2D',
    description: 'Exploración concéntrica por niveles que garantiza encontrar el camino con la menor cantidad de aristas.',
    whyThisPattern: 'Cada nivel de la cola corresponde a una distancia de exactamente +1 respecto al nodo inicial.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    dataStructures: ['Graphs', 'Queues', 'Hash Tables (Visited)'],
    algorithms: ['BFS'],
    visualizerType: 'bfs',
    whenToUse: [
      'Laberintos y matrices 2D (distancia mínima de inicio a fin)',
      'Transformación de palabras (Word Ladder)',
      'Inundación / propagación en simultáneo (Multi-source BFS)'
    ],
    whenToAvoid: [
      'Grafos con costos o pesos diferentes en las aristas (usar Dijkstra)'
    ],
    classicProblems: [
      {
        id: 'lc-127',
        title: 'Word Ladder',
        difficulty: 'Hard',
        platform: 'LeetCode',
        problemNumber: 127,
        summary: 'Dadas dos palabras beginWord y endWord, y un diccionario wordList, encuentra el número de palabras en la secuencia de transformación más corta cambiando 1 letra a la vez.',
        keyInsight: 'Modelar cada palabra como un nodo y las transformaciones de 1 letra como aristas no ponderadas. BFS halla la secuencia más corta.',
        timeComplexity: 'O(M^2 * N) donde M es la longitud de la palabra',
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
    tagline: 'Gestión dinámica de componentes conexas y relaciones de equivalencia',
    description: 'Mantiene colecciones de conjuntos disjuntos con operaciones casi en tiempo constante para unir componentes y consultar si dos elementos pertenecen al mismo grupo.',
    whyThisPattern: 'Con Path Compression y Union by Rank, la complejidad amortizada es O(alpha(N)) prácticamente O(1).',
    timeComplexity: 'O(alpha(N)) ~= O(1)',
    spaceComplexity: 'O(N)',
    dataStructures: ['Arrays', 'Trees'],
    algorithms: ['Greedy'],
    visualizerType: 'graph',
    whenToUse: [
      'Detectar ciclos en grafos no dirigidos (Kruskal MST)',
      'Contar componentes conexas dinámicamente',
      'Problemas de cuentas de usuarios o amigos conectados en redes'
    ],
    whenToAvoid: [
      'Grafos dirigidos donde la conectividad tiene dirección (usar Kosaraju / Tarjan)',
      'Consultas que requieran el camino real entre dos nodos'
    ],
    classicProblems: [
      {
        id: 'lc-684',
        title: 'Redundant Connection',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 684,
        summary: 'En un grafo no dirigido que comenzó como un árbol y se le agregó una arista extra, encuentra la arista que crea el ciclo.',
        keyInsight: 'Para cada arista (u, v), verificar si find(u) == find(v). Si es verdadero, ya estaban conectados y esta arista crea el ciclo redundante.',
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
    tagline: 'Búsqueda logarítmica O(log N) sobre espacios monótonos',
    description: 'Reduce a la mitad el rango de búsqueda en cada paso comparando el punto medio con el objetivo o evaluando un predicado de viabilidad monótono.',
    whyThisPattern: 'Si una propiedad f(x) cambia de Falso a Verdadero una sola vez, la búsqueda binaria encuentra la transición en O(log N).',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    dataStructures: ['Arrays'],
    algorithms: ['Binary Search'],
    visualizerType: 'binary_search',
    whenToUse: [
      'Búsqueda en arrays ordenados o rotados',
      'Optimización paramétrica: "Encontrar la velocidad mínima / capacidad mínima para lograr X"',
      'Calcular raíces cuadradas o potencias'
    ],
    whenToAvoid: [
      'Colecciones no ordenadas donde no existe predicado monótono'
    ],
    classicProblems: [
      {
        id: 'lc-875',
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 875,
        summary: 'Koko come plátanos a velocidad k/hora. Determina la velocidad mínima k para comer todas las pilas en h horas.',
        keyInsight: 'El rango de velocidades posibles es [1, max(piles)]. A mayor velocidad, menor tiempo requerido (propiedad monótona). Aplicar Binary Search on Answer.',
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
    tagline: 'Mantenimiento eficiente de los K elementos extremos',
    description: 'Utiliza un Min-Heap de tamaño K para retener los K elementos mayores, expulsando el menor cuando el tamaño supera K.',
    whyThisPattern: 'Evita ordenar toda la colección O(N log N), logrando un tiempo O(N log K) con memoria espacial O(K).',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    dataStructures: ['Heaps', 'Arrays'],
    algorithms: ['Greedy'],
    visualizerType: 'heap',
    whenToUse: [
      'K-ésimo elemento más grande o pequeño en un stream continuo',
      'Top K elementos más frecuentes',
      'Combinar K listas ordenadas'
    ],
    whenToAvoid: [
      'Si se requiere ordenar todo el array y N es pequeño (QuickSort / TimSort es más simple)'
    ],
    classicProblems: [
      {
        id: 'lc-215',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 215,
        summary: 'Dado un array de enteros nums y un entero k, retorna el k-ésimo elemento más grande del array.',
        keyInsight: 'Mantener un Min-Heap con los K elementos más grandes encontrados hasta ahora. El tope del heap siempre será el k-ésimo mayor.',
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
  // Ordenamiento O(N log N) o Min-Heap de tamaño K
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
    tagline: 'Dos referencias de índice para barridos lineales en memoria O(1)',
    description: 'Utiliza punteros opuestos que convergen o punteros con velocidades distintas para procesar elementos in-place.',
    whyThisPattern: 'Aprovecha el ordenamiento o las relaciones estructurales para tomar decisiones definitivas sin evaluar combinaciones redundantes O(N^2).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    dataStructures: ['Arrays', 'Linked Lists'],
    algorithms: ['Two Pointers'],
    visualizerType: 'two_pointers',
    whenToUse: [
      'Two Sum en arrays ordenados / 3Sum / 4Sum',
      'Verificar o construir palíndromos',
      'Detección de ciclos en listas enlazadas (Tortoise & Hare)',
      'Partición in-place (ej. Sort Colors)'
    ],
    whenToAvoid: [
      'Arrays desordenados donde no se puede ordenar previamente'
    ],
    classicProblems: [
      {
        id: 'lc-15',
        title: '3Sum',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 15,
        summary: 'Dado un array de enteros nums, retorna todos los tripletes [nums[i], nums[j], nums[k]] tales que i != j != k y nums[i] + nums[j] + nums[k] == 0.',
        keyInsight: 'Ordenar el array. Fijar el primer elemento y usar Two Pointers sobre el resto del array. Saltar duplicados para evitar ternas repetidas.',
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(1) o O(N) por ordenamiento',
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
    tagline: 'Ventana de límites variables para subarreglos y subcadenas contiguas',
    description: 'Mantiene una ventana contigua [L, R] expandiendo R y contrayendo L cuando se viola la condición del problema.',
    whyThisPattern: 'Cada elemento entra y sale de la ventana como máximo una vez, transformando un algoritmo O(N^2) en O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K) (HashMap de frecuencias)',
    dataStructures: ['Arrays', 'Hash Tables'],
    algorithms: ['Sliding Window'],
    visualizerType: 'sliding_window',
    whenToUse: [
      'Subcadena más larga sin caracteres repetidos',
      'Subarray de suma mínima mayor o igual a K',
      'Contar anagramas o permutaciones en una cadena'
    ],
    whenToAvoid: [
      'Subsecuencias no contiguas (usar DP)',
      'Arrays con números negativos donde la suma no es monótona con la expansión (usar Prefix Sum + HashMap)'
    ],
    classicProblems: [
      {
        id: 'lc-3',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 3,
        summary: 'Dada una cadena s, encuentra la longitud de la subcadena más larga sin caracteres repetidos.',
        keyInsight: 'Guardar el último índice visto de cada carácter. Cuando se encuentra un duplicado, mover L al máximo entre L y el índice previo + 1.',
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
    tagline: 'Pila monótona para hallar el siguiente elemento mayor o menor en O(N)',
    description: 'Pila cuyos elementos se mantienen en orden estrictamente creciente o decreciente para resolver problemas de límites y rangos de impacto.',
    whyThisPattern: 'Cada elemento es apilado y desapilado exactamente una vez, lo que permite computar límites izquierdo y derecho para todos los elementos en tiempo lineal.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    dataStructures: ['Stacks', 'Arrays'],
    algorithms: ['Greedy'],
    visualizerType: 'stack',
    whenToUse: [
      'Siguiente elemento mayor (Next Greater Element)',
      'Temperaturas diarias y conteo de días de espera',
      'Trapping Rain Water y Mayor Rectángulo en Histograma'
    ],
    whenToAvoid: [
      'Cuando se requiere procesar elementos no lineales en 2D general'
    ],
    classicProblems: [
      {
        id: 'lc-739',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 739,
        summary: 'Dado un array temperatures, retorna un array answer tal que answer[i] es el número de días que debes esperar después del día i para tener una temperatura más cálida.',
        keyInsight: 'Mantener un stack con índices de temperaturas decrecientes. Cuando llega una temperatura mayor, desapilar y calcular la diferencia de índices.',
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
    tagline: 'Sumas acumuladas para consultas de rangos y subarreglos con suma meta en O(1)',
    description: 'Precomputa sumas acumuladas tal que la suma de cualquier rango [L, R] se obtiene como Prefix[R] - Prefix[L-1].',
    whyThisPattern: 'Permite responder consultas repetidas en O(1) y, combinada con un HashMap de frecuencias, encontrar subarreglos con suma K en O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    dataStructures: ['Arrays', 'Hash Tables'],
    algorithms: ['Prefix Sum'],
    visualizerType: 'prefix_sum',
    whenToUse: [
      'Subarray Sum Equals K (especialmente con números negativos)',
      'Consultas de sumas de rangos 1D y 2D (matrices)',
      'Subarreglos con suma divisible por K'
    ],
    whenToAvoid: [
      'Cuando hay actualizaciones frecuentes de valores en el array (usar Fenwick / Segment Tree)'
    ],
    classicProblems: [
      {
        id: 'lc-560',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 560,
        summary: 'Dado un array de enteros nums y un entero k, retorna el número total de subarreglos cuya suma es igual a k.',
        keyInsight: 'Si la suma acumulada actual es sum, buscamos cuántas veces ha ocurrido una suma previa de (sum - k). Usar un HashMap de conteo de sumas de prefijo.',
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
    tagline: 'Subproblemas superpuestos y subestructura óptima',
    description: 'Resuelve problemas complejos dividiéndolos en subproblemas más pequeños y almacenando sus resultados para evitar recomputaciones redundantes.',
    whyThisPattern: 'Reduce complejidades exponenciales O(2^N) a polinomios O(N * W) o O(N^2).',
    timeComplexity: 'O(N * W) o O(N^2)',
    spaceComplexity: 'O(N) o O(N * W)',
    dataStructures: ['Arrays', 'Hash Tables'],
    algorithms: ['Dynamic Programming'],
    visualizerType: 'dp',
    whenToUse: [
      'Coin Change, House Robber, Longest Increasing Subsequence',
      'Problemas de mochila (0/1 Knapsack, Unbounded Knapsack)',
      'Distancia de edición (Edit Distance) y alineamiento de secuencias'
    ],
    whenToAvoid: [
      'Problemas sin subproblemas repetidos (usar Divide & Conquer directo)'
    ],
    classicProblems: [
      {
        id: 'lc-322',
        title: 'Coin Change',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 322,
        summary: 'Dado un array de monedas de diferentes denominaciones y un monto total de dinero amount, retorna el número mínimo de monedas necesarias para formar dicho monto.',
        keyInsight: 'dp[i] = min(dp[i - coin] + 1) para cada moneda coin <= i. Caso base dp[0] = 0.',
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
    tagline: 'Búsqueda ultra rápida de prefijos y palabras en diccionarios',
    description: 'Árbol n-ario donde cada nodo representa un carácter, permitiendo compartir prefijos comunes y validar palabras en O(L).',
    whyThisPattern: 'La búsqueda de prefijos no depende de la cantidad total de palabras N, solo de la longitud de la cadena consultada L.',
    timeComplexity: 'O(L) por operación',
    spaceComplexity: 'O(N * L * ALPHABET)',
    dataStructures: ['Tries', 'Hash Tables'],
    algorithms: ['DFS'],
    visualizerType: 'trie',
    whenToUse: [
      'Autocompletado de texto y sugerencias',
      'Word Break y Word Search II en matrices',
      'Operaciones de prefijos más largos o XOR máximo'
    ],
    whenToAvoid: [
      'Búsqueda exacta simple donde un HashSet O(1) es suficiente y consume menos memoria'
    ],
    classicProblems: [
      {
        id: 'lc-208',
        title: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 208,
        summary: 'Implementa la estructura de datos Trie con métodos insert(word), search(word) y startsWith(prefix).',
        keyInsight: 'Cada nodo contiene un diccionario/mapa de hijos carácter->TrieNode y un booleano isEnd que marca si termina una palabra válida.',
        timeComplexity: 'O(L) para todas las operaciones',
        spaceComplexity: 'O(Total de caracteres insertados)',
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
    tagline: 'Elecciones locales óptimas sobre intervalos temporales o rangos',
    description: 'Ordena intervalos por hora de inicio o finalización y selecciona vorazmente aquellos que maximizan la cantidad de tareas no superpuestas.',
    whyThisPattern: 'Elegir el intervalo que termina más temprano deja el máximo tiempo libre posible para los intervalos restantes.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1) o O(N)',
    dataStructures: ['Arrays'],
    algorithms: ['Greedy'],
    visualizerType: 'greedy',
    whenToUse: [
      'Merge Intervals y Non-overlapping Intervals',
      'Meeting Rooms II (asignación de salas mínimas)',
      'Jump Game y Gas Station'
    ],
    whenToAvoid: [
      'Problemas donde las decisiones pasadas requieren backtracking o donde la elección local no garantiza el óptimo global'
    ],
    classicProblems: [
      {
        id: 'lc-56',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        platform: 'LeetCode',
        problemNumber: 56,
        summary: 'Dado un array de intervals donde intervals[i] = [start, end], une todos los intervalos superpuestos y retorna un array de intervalos no superpuestos.',
        keyInsight: 'Ordenar los intervalos por start time. Si el start del intervalo actual es <= al end del último intervalo fusionado, expandir el end con max(end1, end2).',
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
