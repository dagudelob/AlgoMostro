import type { FlowchartNode } from '../types/flowchart';

export const FLOWCHART_ROOT_ID = 'root';

export const FLOWCHART_NODES: Record<string, FlowchartNode> = {
  'root': {
    id: 'root',
    question: '¿Qué tipo de problema o estructura principal describe el enunciado?',
    subtitle: 'Elige la naturaleza fundamental del input o del dominio del problema',
    category: 'general',
    tags: ['Entrada', 'Inicio', 'Diagnóstico'],
    options: [
      { id: 'opt-graph', label: '1. Grafo o Árbol', nextNodeId: 'node-graph-1' },
      { id: 'opt-sorted', label: '2. Input Ordenado / Búsqueda Monótona', nextNodeId: 'node-sorted-1' },
      { id: 'opt-kth', label: '3. K-ésimo elemento más grande / pequeño', nextNodeId: 'node-kth-1' },
      { id: 'opt-linked-list', label: '4. Lista Enlazada (Linked List)', nextNodeId: 'node-ll-1' },
      { id: 'opt-lookup', label: '5. Búsqueda rápida, frecuencias o agrupación', nextNodeId: 'node-lookup-1' },
      { id: 'opt-intervals', label: '6. Intervalos de tiempo o rangos', nextNodeId: 'node-intervals-1' },
      { id: 'opt-string-dict', label: '7. Cadenas / Diccionarios / Prefijos', nextNodeId: 'node-strings-1' },
      { id: 'opt-subarray', label: '8. Subarray o Subcadena contigua', nextNodeId: 'node-subarray-1' },
      { id: 'opt-ways-opt', label: '9. Contar formas o Maximizar/Minimizar', nextNodeId: 'node-dp-1' },
      { id: 'opt-simulation', label: '10. Simulación / Bitmask / Diseño', nextNodeId: 'node-sim-1' }
    ]
  },

  // 1. GRAFOS Y ARBOLES
  'node-graph-1': {
    id: 'node-graph-1',
    question: '¿La estructura es específicamente un Árbol (sin ciclos, jerárquico)?',
    subtitle: 'Un árbol es un grafo acíclico y conexo con N nodos y N-1 aristas',
    category: 'graph',
    options: [
      { id: 'opt-tree-yes', label: 'Sí, es un Árbol', nextNodeId: 'node-tree-options' },
      { id: 'opt-tree-no', label: 'No, es un Grafo general', nextNodeId: 'node-graph-general' }
    ]
  },

  'node-tree-options': {
    id: 'node-tree-options',
    question: '¿Qué objetivo se busca en el Árbol?',
    subtitle: 'Identifica la propiedad o métrica a calcular en el árbol',
    category: 'tree',
    options: [
      { id: 'opt-tree-count', label: 'Contar o generar árboles / Tree DP', algorithmResultId: 'tree-dp' },
      { id: 'opt-tree-level', label: 'Recorrido por niveles / Distancia más corta', algorithmResultId: 'tree-bfs' },
      { id: 'opt-tree-dfs', label: 'Ancestros (LCA) / Altura / Validación BST', algorithmResultId: 'tree-dfs' }
    ]
  },

  'node-graph-general': {
    id: 'node-graph-general',
    question: '¿Qué tipo de grafo y problema tienes?',
    subtitle: 'Dependencias, caminos más cortos, o conectividad',
    category: 'graph',
    options: [
      { id: 'opt-dag', label: '¿Grafo Dirigido con Dependencias / Prerrequisitos (DAG)?', algorithmResultId: 'topological-sort' },
      { id: 'opt-shortest', label: '¿Problema de Camino Más Corto (Shortest Path)?', nextNodeId: 'node-graph-shortest' },
      { id: 'opt-connectivity', label: '¿Conectividad / Componentes Conexas / Detección de Ciclos?', algorithmResultId: 'union-find' },
      { id: 'opt-small-grid', label: '¿Matriz 2D / Laberinto / Backtracking con N pequeño?', algorithmResultId: 'graph-bfs' }
    ]
  },

  'node-graph-shortest': {
    id: 'node-graph-shortest',
    question: '¿El grafo tiene pesos/costos en las aristas (Weighted)?',
    subtitle: 'La presencia de pesos cambia el algoritmo óptimo',
    category: 'graph',
    options: [
      { id: 'opt-dijkstra', label: 'Sí, las aristas tienen pesos >= 0', algorithmResultId: 'dijkstra' },
      { id: 'opt-bfs-unweighted', label: 'No, todas las aristas tienen peso 1 / uniforme', algorithmResultId: 'graph-bfs' }
    ]
  },

  // 2. SORTED INPUT / MONOTONIC
  'node-sorted-1': {
    id: 'node-sorted-1',
    question: '¿El input está ordenado o la condición de respuesta es monótona?',
    subtitle: 'Búsqueda de valores específicos o consultas dinámicas de rango',
    category: 'binary_search',
    options: [
      { id: 'opt-bs-single', label: 'Buscar valor / Condición monótona en O(log N)', algorithmResultId: 'binary-search' },
      { id: 'opt-two-pointers-sorted', label: 'Buscar pares o sumas en array ordenado (Two Sum II)', algorithmResultId: 'two-pointers' },
      { id: 'opt-range-dynamic', label: 'Consultas de rango con actualizaciones dinámicas', nextNodeId: 'node-segment-tree' }
    ]
  },

  'node-segment-tree': {
    id: 'node-segment-tree',
    question: '¿Se requiere actualizar elementos individuales y consultar rangos en O(log N)?',
    category: 'binary_search',
    options: [
      { id: 'opt-fenwick', label: 'Sí, usar Segment Tree o Fenwick Tree (Binary Indexed Tree)', algorithmResultId: 'prefix-sum' },
      { id: 'opt-bs-static', label: 'Solo consultas estáticas -> Prefix Sum', algorithmResultId: 'prefix-sum' }
    ]
  },

  // 3. KTH ELEMENT
  'node-kth-1': {
    id: 'node-kth-1',
    question: '¿Buscar el k-ésimo elemento extremo o top-K elementos más frecuentes?',
    subtitle: 'Gestión eficiente de prioridades sin ordenar todo el conjunto',
    category: 'heap',
    options: [
      { id: 'opt-heap-topk', label: 'Usar Min-Heap / Max-Heap o QuickSelect en O(N log K)', algorithmResultId: 'heap-topk' }
    ]
  },

  // 4. LINKED LISTS
  'node-ll-1': {
    id: 'node-ll-1',
    question: '¿Qué operación se requiere en la Lista Enlazada?',
    subtitle: 'Detección de ciclos, combinación de listas, o inversión',
    category: 'linked_list',
    options: [
      { id: 'opt-ll-cycle', label: 'Punteros Rápido y Lento (Detección de Ciclos / Punto Medio)', algorithmResultId: 'two-pointers' },
      { id: 'opt-ll-merge', label: 'Unir K listas ordenadas (Merge K Sorted Lists)', algorithmResultId: 'heap-topk' },
      { id: 'opt-ll-manip', label: 'Inversión in-place de punteros next / prev', algorithmResultId: 'two-pointers' }
    ]
  },

  // 5. HASH TABLE / LOOKUP
  'node-lookup-1': {
    id: 'node-lookup-1',
    question: '¿Necesitas consultas instantáneas O(1), frecuencias o agrupar anagramas?',
    category: 'general',
    options: [
      { id: 'opt-hash-map', label: 'Hash Table / Frequency Map / HashSet', algorithmResultId: 'prefix-sum' }
    ]
  },

  // 6. INTERVALS
  'node-intervals-1': {
    id: 'node-intervals-1',
    question: '¿Problema con intervalos de tiempo [start, end] o programación de tareas?',
    subtitle: 'Fusión de solapamientos, cantidad de salas de reunión, o eliminación mínima',
    category: 'greedy',
    options: [
      { id: 'opt-intervals-greedy', label: 'Ordenar por Start/End + Interval Scan Voraz (Greedy)', algorithmResultId: 'greedy-intervals' }
    ]
  },

  // 7. STRINGS & DICTIONARY
  'node-strings-1': {
    id: 'node-strings-1',
    question: '¿Se busca coincidencia de prefijos, palabras en diccionario o validación?',
    category: 'array_string',
    options: [
      { id: 'opt-trie-match', label: 'Trie / Prefix Tree / Búsqueda de Prefijos en O(L)', algorithmResultId: 'trie-patterns' },
      { id: 'opt-word-break', label: 'Partir cadena según diccionario (Word Break) -> Trie + DP', algorithmResultId: 'trie-patterns' }
    ]
  },

  // 8. SUBARRAY O SUBCADENA
  'node-subarray-1': {
    id: 'node-subarray-1',
    question: '¿Qué propiedad buscas en el subarray o subcadena contigua?',
    subtitle: 'Suma de elementos, caracteres únicos en ventana, o límites mayores/menores',
    category: 'array_string',
    options: [
      { id: 'opt-sub-window', label: 'Mantener ventana válida (Longest Substring / Min Subarray)', algorithmResultId: 'sliding-window' },
      { id: 'opt-sub-sum', label: 'Suma acumulada o Subarray Sum Equals K', algorithmResultId: 'prefix-sum' },
      { id: 'opt-sub-monotonic', label: 'Siguiente elemento mayor o menor / Trapping Rain Water', algorithmResultId: 'monotonic-stack' }
    ]
  },

  // 9. DP / OPTIMIZACION
  'node-dp-1': {
    id: 'node-dp-1',
    question: '¿Contar total de maneras, o maximizar/minimizar con elecciones dependientes?',
    subtitle: 'Subproblemas superpuestos y decisiones encadenadas',
    category: 'dp',
    options: [
      { id: 'opt-dp-classic', label: 'Programación Dinámica (1D / 2D / Knapsack / Coin Change)', algorithmResultId: 'dp-general' },
      { id: 'opt-greedy-choice', label: 'Elección voraz local demostrable (Greedy / Intervalos)', algorithmResultId: 'greedy-intervals' }
    ]
  },

  // 10. SIMULACION / BITMASK
  'node-sim-1': {
    id: 'node-sim-1',
    question: '¿Problema de estado de subconjunto pequeño (N <= 20) o simulación?',
    category: 'general',
    options: [
      { id: 'opt-bitmask', label: 'Bitmask DP (N <= 20)', algorithmResultId: 'dp-general' },
      { id: 'opt-simulation-basic', label: 'Simulación directa con estructuras auxiliares', algorithmResultId: 'prefix-sum' }
    ]
  }
};
