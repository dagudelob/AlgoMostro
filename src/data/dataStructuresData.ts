import type { DSItem } from '../types/visualizer';

export const DATA_STRUCTURES: DSItem[] = [
  {
    id: 'ds-array',
    name: 'Arrays',
    category: 'data_structure',
    type: 'array',
    description: 'Bloque contiguo de memoria que almacena elementos del mismo tipo con acceso instantáneo por índice.',
    iconName: 'LayoutGrid',
    timeComplexity: {
      access: 'O(1)',
      search: 'O(N)',
      insertion: 'O(N)',
      deletion: 'O(N)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Acceso por índice instantáneo O(1)',
      'Excelente localidad de caché espacial',
      'Uso eficiente de memoria sin punteros adicionales'
    ],
    cons: [
      'Tamaño fijo en memoria contigua (en arrays estáticos)',
      'Inserción y borrado costoso O(N) por desplazamiento'
    ],
    useCases: [
      'Búsqueda binaria sobre elementos ordenados',
      'Tablas de frecuencia y buckets',
      'Buffers secuenciales de memoria'
    ],
    snippet: `// Acceso O(1) e inserción O(N)
const arr = [10, 20, 30, 40];
const val = arr[2]; // 30 -> O(1)
arr.splice(1, 0, 15); // Inserta 15 en index 1 -> O(N)`
  },
  {
    id: 'ds-linked-list',
    name: 'Linked Lists',
    category: 'data_structure',
    type: 'linked_list',
    description: 'Secuencia lineal de nodos donde cada nodo almacena un valor y una referencia (puntero) al siguiente nodo.',
    iconName: 'GitCommitHorizontal',
    timeComplexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1)*',
      deletion: 'O(1)*',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Inserción/eliminación O(1) si ya se tiene el puntero al nodo',
      'Tamaño dinámico sin necesidad de realocación de bloque continuo'
    ],
    cons: [
      'No permite acceso directo por índice (búsqueda O(N))',
      'Overhead de memoria por almacenar punteros (next/prev)'
    ],
    useCases: [
      'Implementación de colas y LRU Cache (Doubly Linked List)',
      'Algoritmo de Floyd de detección de ciclos (Tortoise & Hare)',
      'Inversión in-place de secuencias'
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
    description: 'Estructura jerárquica no lineal compuesta por una raíz y subárboles de nodos hijos.',
    iconName: 'Network',
    timeComplexity: {
      access: 'O(log N)',
      search: 'O(log N)',
      insertion: 'O(log N)',
      deletion: 'O(log N)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Búsqueda, inserción y eliminación eficiente en O(log N) balanceado',
      'Mantiene los elementos naturalmente ordenados (BST)',
      'Estructura recursiva natural'
    ],
    cons: [
      'Se puede degradar a O(N) si el árbol no está balanceado',
      'Complejidad de rotaciones en árboles auto-balanceados (AVL / Red-Black)'
    ],
    useCases: [
      'Sistemas de archivos y jerarquías organizacionales',
      'Árboles de sintaxis abstracta (AST) en compiladores',
      'Índices de bases de datos relacionales (B-Trees / BST)'
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
    description: 'Colección de vértices (nodos) conectados por aristas (edges), dirigidas o no dirigidas, con o sin peso.',
    iconName: 'Share2',
    timeComplexity: {
      access: 'O(V + E)',
      search: 'O(V + E)',
      insertion: 'O(1)',
      deletion: 'O(V + E)',
    },
    spaceComplexity: 'O(V + E)',
    pros: [
      'Modela cualquier tipo de relación en red del mundo real',
      'Soporta algoritmos fundamentales de caminos mínimos y conectividad'
    ],
    cons: [
      'Consumo de memoria O(V^2) en representaciones de matriz densa',
      'Detección de ciclos y estados visitados requiere memoria adicional'
    ],
    useCases: [
      'Redes sociales y grafos de conocimiento',
      'Sistemas de navegación GPS y rutas (Dijkstra, A*)',
      'Orden de compilación de dependencias (Topological Sort)'
    ],
    snippet: `// Lista de adyacencia
const adjList = new Map<number, number[]>();
adjList.set(1, [2, 3]);
adjList.set(2, [4]);`
  },
  {
    id: 'ds-heap',
    name: 'Heaps (Priority Queue)',
    category: 'data_structure',
    type: 'heap',
    description: 'Árbol binario completo que satisface la propiedad de Heap (el nodo padre es siempre menor o igual, o mayor o igual que sus hijos).',
    iconName: 'Layers',
    timeComplexity: {
      access: 'O(1) (peek)',
      search: 'O(N)',
      insertion: 'O(log N)',
      deletion: 'O(log N) (pop)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Acceso instantáneo O(1) al elemento mínimo o máximo',
      'Inserción y extracción logarítmica O(log N)',
      'Se puede almacenar eficientemente en un array contiguo'
    ],
    cons: [
      'Búsqueda de elementos arbitrarios es lenta O(N)',
      'No mantiene orden total, solo orden de prioridad en la raíz'
    ],
    useCases: [
      'Encontrar el k-ésimo elemento más grande o pequeño (Top-K)',
      'Algoritmo de Dijkstra y Prim',
      'Merge de K listas ordenadas'
    ],
    snippet: `// Min-Heap: parent(i) = floor((i-1)/2)
// left(i) = 2i + 1, right(i) = 2i + 2
const heap = [2, 5, 8, 12, 10]; // Raíz siempre en heap[0]`
  },
  {
    id: 'ds-trie',
    name: 'Tries (Prefix Trees)',
    category: 'data_structure',
    type: 'trie',
    description: 'Árbol de búsqueda donde cada nodo representa un carácter de una cadena, compartiendo prefijos comunes.',
    iconName: 'FolderTree',
    timeComplexity: {
      access: 'O(L) (longitud palabra)',
      search: 'O(L)',
      insertion: 'O(L)',
      deletion: 'O(L)',
    },
    spaceComplexity: 'O(ALFABETO * L * N)',
    pros: [
      'Búsqueda y prefijo ultra rápido independiente del número de palabras (solo depende de la longitud L)',
      'Compresión de prefijos idénticos'
    ],
    cons: [
      'Gran consumo de punteros en memoria si el vocabulario es muy disperso'
    ],
    useCases: [
      'Sistemas de autocompletado y sugerencia de búsqueda',
      'Correctores ortográficos y diccionarios de palabras',
      'Problemas de juegos de palabras (Boggle, Word Search II)'
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
    description: 'Estructura Last-In, First-Out donde el último elemento agregado es el primero en ser procesado.',
    iconName: 'Server',
    timeComplexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) (push)',
      deletion: 'O(1) (pop)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Push y Pop súper rápidos en O(1)',
      'Estructura ideal para tracking de estados y llamadas recursivas'
    ],
    cons: [
      'Acceso limitado solo al tope del Stack'
    ],
    useCases: [
      'Validación de paréntesis y etiquetas HTML',
      'Monotonic Stack (siguiente elemento mayor/menor, Trapping Rain Water)',
      'Deshacer/Rehacer (Undo/Redo) y Call Stack del motor de JS'
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
    description: 'Estructura First-In, First-Out donde el primer elemento insertado es el primero en ser atendido.',
    iconName: 'ArrowRightLeft',
    timeComplexity: {
      access: 'O(N)',
      search: 'O(N)',
      insertion: 'O(1) (enqueue)',
      deletion: 'O(1) (dequeue)',
    },
    spaceComplexity: 'O(N)',
    pros: [
      'Encolado y desencolado garantizado en O(1)',
      'Mantiene el orden temporal estricto de llegada'
    ],
    cons: [
      'En arrays normales de JS, shift() es O(N); se requiere Deque o puntero circular'
    ],
    useCases: [
      'Recorrido por niveles en BFS (Breadth-First Search)',
      'Monotonic Deque (Sliding Window Maximum)',
      'Colas de tareas asíncronas y rate limiters'
    ],
    snippet: `// Queue conceptual FIFO
const queue = [1, 2, 3];
queue.push(4); // Enqueue
const item = queue.shift(); // Dequeue -> 1`
  }
];
