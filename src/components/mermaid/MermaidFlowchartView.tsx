import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Download, 
  PlayCircle,
  Sparkles,
  Layers,
  FileCode2,
  BookOpen
} from 'lucide-react';

interface MermaidFlowchartViewProps {
  onSelectResult?: (resultId: string) => void;
  onOpenVisualizer?: (type: string) => void;
}

type DiagramMode = 'master' | 'arrays' | 'graphs' | 'dp' | 'specialized';

const MERMAID_DIAGRAMS_EN: Record<DiagramMode, { title: string; subtitle: string; code: string }> = {
  master: {
    title: 'Master AlgoMonster Decision Tree (Mermaid)',
    subtitle: 'Comprehensive architectural decision graph covering all 4 algorithmic pillars',
    code: `graph TD
    %% Root Node
    START(["❓ What type of problem are you solving?"])

    %% 4 Pillars
    START --> ARRAY_BRANCH["🟩 Arrays & Strings<br/>(Contiguous, Monotonic, Subarrays)"]
    START --> GRAPH_BRANCH["🟦 Graphs & Trees<br/>(Shortest Path, DAG, DSU, Trie)"]
    START --> OPT_BRANCH["🟧 Optimization & DP<br/>(Min-Max, Subproblems, Backtracking)"]
    START --> STRUCT_BRANCH["🟪 Specialized Structures<br/>(Heaps, Sweep-Line Intervals)"]

    %% --- BRANCH 1: ARRAYS & STRINGS ---
    ARRAY_BRANCH --> Q_SORTED{"Is array SORTED<br/>or Monotonic?"}
    Q_SORTED -- Yes --> ALGO_BS["🎯 Binary Search<br/><i>O(log N)</i>"]
    Q_SORTED -- No --> Q_SUBARRAY{"Contiguous Subarrays<br/>or Ranges?"}
    
    Q_SUBARRAY -- Fixed/Dynamic Window --> ALGO_SW["🪟 Sliding Window<br/><i>O(N)</i>"]
    Q_SUBARRAY -- Range Sums/Products --> ALGO_PS["📊 Prefix Sum<br/><i>O(N)</i>"]
    Q_SUBARRAY -- Converging Ends --> ALGO_TP["👉👈 Two Pointers<br/><i>O(N)</i>"]
    
    ARRAY_BRANCH --> Q_STACK{"Next greater/smaller<br/>element in O(N)?"}
    Q_STACK -- Yes --> ALGO_MS["📚 Monotonic Stack<br/><i>O(N)</i>"]

    %% --- BRANCH 2: GRAPHS & TREES ---
    GRAPH_BRANCH --> Q_SHORTEST{"Shortest Path<br/>or Minimum Steps?"}
    Q_SHORTEST -- Unweighted / 2D Grid --> ALGO_BFS["🌊 BFS (Breadth-First)<br/><i>O(V + E)</i>"]
    Q_SHORTEST -- Positive Weights --> ALGO_DIJKSTRA["⚖️ Dijkstra Algorithm<br/><i>O((V+E) log V)</i>"]
    
    GRAPH_BRANCH --> Q_CONNECTIVITY{"Graph Structure<br/>& Relations?"}
    Q_CONNECTIVITY -- Dependencies / DAG --> ALGO_TOPO["📋 Topological Sort<br/><i>O(V + E)</i>"]
    Q_CONNECTIVITY -- Connected Components --> ALGO_UF["🪢 Union-Find (DSU)<br/><i>O(α(N))</i>"]
    Q_CONNECTIVITY -- String Prefixes --> ALGO_TRIE["🌲 Trie (Prefix Tree)<br/><i>O(L)</i>"]

    %% --- BRANCH 3: OPTIMIZATION & COMBINATORICS ---
    OPT_BRANCH --> Q_GOAL{"Optimal value/count<br/>or ALL valid states?"}
    Q_GOAL -- Optimal / Min-Max / Subproblems --> ALGO_DP["🧱 Dynamic Programming<br/><i>O(States × Transitions)</i>"]
    Q_GOAL -- Enumerate Permutations/Subsets --> ALGO_BT["🔙 Backtracking (DFS)<br/><i>O(2^N) / O(N!)</i>"]

    %% --- BRANCH 4: SPECIALIZED STRUCTURES ---
    STRUCT_BRANCH --> Q_SPEC{"Data Access Pattern?"}
    Q_SPEC -- Top K / Min / Max Elements --> ALGO_HEAP["👑 Heap / Priority Queue<br/><i>O(N log K)</i>"]
    Q_SPEC -- Overlapping Intervals / Time --> ALGO_INT["📅 Interval Sweep Line<br/><i>O(N log N)</i>"]

    %% Node Styles
    classDef root fill:#0f172a,stroke:#00f5ff,stroke-width:4px,color:#00f5ff,font-size:18px;
    classDef category fill:#1e293b,stroke:#8b949e,stroke-width:2.5px,color:#f0f6fc,font-size:16px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algoArray fill:#064e3b,stroke:#10b981,stroke-width:2.5px,color:#a7f3d0,font-size:16px;
    classDef algoGraph fill:#1e1b4b,stroke:#6366f1,stroke-width:2.5px,color:#c7d2fe,font-size:16px;
    classDef algoDP fill:#451a03,stroke:#f59e0b,stroke-width:2.5px,color:#fde68a,font-size:16px;
    classDef algoSpec fill:#3b0764,stroke:#a855f7,stroke-width:2.5px,color:#e9d5ff,font-size:16px;

    class START root;
    class ARRAY_BRANCH,GRAPH_BRANCH,OPT_BRANCH,STRUCT_BRANCH category;
    class Q_SORTED,Q_SUBARRAY,Q_STACK,Q_SHORTEST,Q_CONNECTIVITY,Q_GOAL,Q_SPEC decision;
    class ALGO_BS,ALGO_SW,ALGO_PS,ALGO_TP,ALGO_MS algoArray;
    class ALGO_BFS,ALGO_DIJKSTRA,ALGO_TOPO,ALGO_UF,ALGO_TRIE algoGraph;
    class ALGO_DP,ALGO_BT algoDP;
    class ALGO_HEAP,ALGO_INT algoSpec;`
  },

  arrays: {
    title: 'Arrays & Strings Decision Subgraph',
    subtitle: 'Step-by-step resolution for monotonic inputs, sliding windows, and ranges',
    code: `graph TD
    A["🟩 Arrays & Strings"] --> B{"Is Input Sorted or Monotonic?"}
    B -- Yes --> C["🎯 Binary Search<br/><i>O(log N)</i>"]
    B -- No --> D{"Contiguous Subarray or Range?"}
    
    D -- Continuous Dynamic Window --> E["🪟 Sliding Window<br/><i>O(N)</i>"]
    D -- Range Sum = K / Lookup --> F["📊 Prefix Sum + HashMap<br/><i>O(N)</i>"]
    D -- Converging Ends (Sorted Pairs) --> G["👉👈 Two Pointers<br/><i>O(N)</i>"]
    D -- Next Greater / Smaller Element --> H["📚 Monotonic Stack<br/><i>O(N)</i>"]

    classDef root fill:#064e3b,stroke:#10b981,stroke-width:3px,color:#a7f3d0,font-size:17px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algo fill:#0f172a,stroke:#00f5ff,stroke-width:2.5px,color:#38bdf8,font-size:16px;
    class A root;
    class B,D decision;
    class C,E,F,G,H algo;`
  },

  graphs: {
    title: 'Graphs & Trees Decision Subgraph',
    subtitle: 'Routing BFS, Dijkstra, Topological Sort, Union-Find, and Trie',
    code: `graph TD
    A["🟦 Graphs & Trees / 2D Grids"] --> B{"Primary Objective?"}
    
    B -- Shortest Path (Unweighted / Uniform) --> C["🌊 BFS (Breadth-First Search)<br/><i>O(V + E)</i>"]
    B -- Shortest Path (Positive Weighted) --> D["⚖️ Dijkstra Algorithm<br/><i>O((V+E) log V)</i>"]
    B -- Task Dependencies / Prereqs (DAG) --> E["📋 Topological Sort (Kahn / DFS)<br/><i>O(V + E)</i>"]
    B -- Cycle Detection / Connected Groups --> F["🪢 Union-Find (DSU)<br/><i>O(α(N))</i>"]
    B -- String Prefix Lookup / Dictionary --> G["🌲 Trie (Prefix Tree)<br/><i>O(L)</i>"]

    classDef root fill:#1e1b4b,stroke:#6366f1,stroke-width:3px,color:#c7d2fe,font-size:17px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algo fill:#0f172a,stroke:#ff007f,stroke-width:2.5px,color:#ff70a6,font-size:16px;
    class A root;
    class B decision;
    class C,D,E,F,G algo;`
  },

  dp: {
    title: 'Optimization & Combinatorics (DP vs Backtracking)',
    subtitle: 'Deciding between Dynamic Programming and State Space Backtracking',
    code: `graph TD
    A["🟧 Optimization & Combinatorics"] --> B{"What does the problem ask for?"}
    
    B -- Optimal Min/Max Value or Count --> C["🧱 Dynamic Programming (DP)<br/><i>O(States × Transitions)</i>"]
    B -- Enumerate ALL Valid Combinations --> D["🔙 Backtracking (DFS Tree)<br/><i>O(2^N) / O(N!)</i>"]
    
    C --> C1["Overlapping Subproblems + Optimal Substructure"]
    D --> D1["Permutations, Subsets, N-Queens, Sudoku"]

    classDef root fill:#451a03,stroke:#f59e0b,stroke-width:3px,color:#fde68a,font-size:17px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algo fill:#0f172a,stroke:#39ff14,stroke-width:2.5px,color:#a7f3d0,font-size:16px;
    class A root;
    class B decision;
    class C,D,C1,D1 algo;`
  },

  specialized: {
    title: 'Specialized Structures (Heaps & Intervals)',
    subtitle: 'Priority Queues, Top-K elements, and Interval Sweep-Line algorithms',
    code: `graph TD
    A["🟪 Specialized Structures"] --> B{"Pattern of Data & Queries?"}
    
    B -- Top K Frequent / Streaming Median --> C["👑 Heap / Priority Queue<br/><i>O(N log K)</i>"]
    B -- Event Overlap / Meeting Rooms --> D["📅 Interval Sweep-Line<br/><i>O(N log N)</i>"]
    
    C --> C1["Min-Heap for Top K Largest / Max-Heap for Smallest"]
    D --> D1["Sort by Start Time + Greedy / Priority Queue Active End Time"]

    classDef root fill:#3b0764,stroke:#a855f7,stroke-width:3px,color:#e9d5ff,font-size:17px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algo fill:#0f172a,stroke:#b5179e,stroke-width:2.5px,color:#e9d5ff,font-size:16px;
    class A root;
    class B decision;
    class C,D,C1,D1 algo;`
  }
};

const MERMAID_DIAGRAMS_ES: Record<DiagramMode, { title: string; subtitle: string; code: string }> = {
  master: {
    title: 'Diagrama Maestro de Decisión AlgoMonster (Mermaid)',
    subtitle: 'Grafo arquitectónico completo que abarca los 4 pilares algorítmicos',
    code: `graph TD
    %% Inicio / Nodo Raíz
    START(["❓ ¿Qué tipo de problema estás resolviendo?"])

    %% Categorías Principales
    START --> ARRAY_BRANCH["🟩 Arreglos o Cadenas<br/>(Arrays / Strings)"]
    START --> GRAPH_BRANCH["🟦 Grafos y Árboles<br/>(Graphs / Trees / Grids)"]
    START --> OPT_BRANCH["🟧 Optimización y Combinatoria<br/>(DP / Backtracking)"]
    START --> STRUCT_BRANCH["🟪 Estructuras Especializadas<br/>(Heaps / Intervalos)"]

    %% --- RAMA 1: ARREGLOS Y CADENAS ---
    ARRAY_BRANCH --> Q_SORTED{"¿El arreglo está ORDENADO<br/>o es Monótono?"}
    Q_SORTED -- Sí --> ALGO_BS["🎯 Búsqueda Binaria<br/>(Binary Search)<br/><i>O(log N)</i>"]
    Q_SORTED -- No --> Q_SUBARRAY{"¿Buscas Subarreglos Contiguos<br/>o Rangos?"}
    
    Q_SUBARRAY -- Ventana Fija/Variable --> ALGO_SW["🪟 Ventana Deslizante<br/>(Sliding Window)<br/><i>O(N)</i>"]
    Q_SUBARRAY -- Suma/Producto en Rangos --> ALGO_PS["📊 Suma de Prefijos<br/>(Prefix Sum)<br/><i>O(N)</i>"]
    Q_SUBARRAY -- Pares desde Extremos --> ALGO_TP["👉👈 Dos Punteros<br/>(Two Pointers)<br/><i>O(N)</i>"]
    
    ARRAY_BRANCH --> Q_STACK{"¿Buscas el siguiente<br/>elemento mayor/menor?"}
    Q_STACK -- Sí --> ALGO_MS["📚 Pila Monótona<br/>(Monotonic Stack)<br/><i>O(N)</i>"]

    %% --- RAMA 2: GRAFOS Y ÁRBOLES ---
    GRAPH_BRANCH --> Q_SHORTEST{"¿Buscas el Camino Más Corto<br/>o Distancia Mínima?"}
    Q_SHORTEST -- Sin Pesos / Grilla 2D --> ALGO_BFS["🌊 BFS (Búsqueda en Anchura)<br/><i>O(V + E)</i>"]
    Q_SHORTEST -- Pesos Positivos --> ALGO_DIJKSTRA["⚖️ Algoritmo de Dijkstra<br/><i>O((V+E) log V)</i>"]
    
    GRAPH_BRANCH --> Q_CONNECTIVITY{"¿Estructura del Grafo / Relación?"}
    Q_CONNECTIVITY -- Dependencias / Tareas --> ALGO_TOPO["📋 Ordenamiento Topológico<br/>(Kahn / DFS)<br/><i>O(V + E)</i>"]
    Q_CONNECTIVITY -- Componentes Conexas / Grupos --> ALGO_UF["🪢 Union-Find (DSU)<br/><i>O(α(N))</i>"]
    Q_CONNECTIVITY -- Prefijos de Cadenas --> ALGO_TRIE["🌲 Trie (Árbol de Prefijos)<br/><i>O(L)</i>"]

    %% --- RAMA 3: OPTIMIZACIÓN Y COMBINATORIA ---
    OPT_BRANCH --> Q_GOAL{"¿Calculas valor óptimo/conteo<br/>o TODAS las soluciones?"}
    Q_GOAL -- Valor Óptimo / Min-Max / Subproblemas --> ALGO_DP["🧱 Programación Dinámica<br/>(DP)<br/><i>O(Estados × Transiciones)</i>"]
    Q_GOAL -- Listar Permutaciones / Subconjuntos --> ALGO_BT["🔙 Backtracking (DFS)<br/><i>O(2^N) / O(N!)</i>"]

    %% --- RAMA 4: ESTRUCTURAS ESPECIALIZADAS ---
    STRUCT_BRANCH --> Q_SPEC{"¿Patrón de los Datos?"}
    Q_SPEC -- Elementos Top K / Mínimo / Máximo --> ALGO_HEAP["👑 Heap / Priority Queue<br/><i>O(N log K)</i>"]
    Q_SPEC -- Intervalos / Eventos de Tiempo --> ALGO_INT["📅 Intervalos / Sweep Line<br/><i>O(N log N)</i>"]

    %% Estilos de Nodos
    classDef root fill:#0f172a,stroke:#00f5ff,stroke-width:4px,color:#00f5ff,font-size:18px;
    classDef category fill:#1e293b,stroke:#8b949e,stroke-width:2.5px,color:#f8fafc,font-size:16px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algoArray fill:#064e3b,stroke:#10b981,stroke-width:2.5px,color:#a7f3d0,font-size:16px;
    classDef algoGraph fill:#1e1b4b,stroke:#6366f1,stroke-width:2.5px,color:#c7d2fe,font-size:16px;
    classDef algoDP fill:#451a03,stroke:#f59e0b,stroke-width:2.5px,color:#fde68a,font-size:16px;
    classDef algoSpec fill:#3b0764,stroke:#a855f7,stroke-width:2.5px,color:#e9d5ff,font-size:16px;

    class START root;
    class ARRAY_BRANCH,GRAPH_BRANCH,OPT_BRANCH,STRUCT_BRANCH category;
    class Q_SORTED,Q_SUBARRAY,Q_STACK,Q_SHORTEST,Q_CONNECTIVITY,Q_GOAL,Q_SPEC decision;
    class ALGO_BS,ALGO_SW,ALGO_PS,ALGO_TP,ALGO_MS algoArray;
    class ALGO_BFS,ALGO_DIJKSTRA,ALGO_TOPO,ALGO_UF,ALGO_TRIE algoGraph;
    class ALGO_DP,ALGO_BT algoDP;
    class ALGO_HEAP,ALGO_INT algoSpec;`
  },

  arrays: {
    title: 'Sub-Diagrama: Arreglos y Cadenas',
    subtitle: 'Resolución paso a paso para entradas monótonas, ventanas deslizantes y rangos',
    code: `graph TD
    A["🟩 Arreglos y Cadenas"] --> B{"¿Entrada Ordenada?"}
    B -- Sí --> C["🎯 Búsqueda Binaria<br/><i>O(log N)</i>"]
    B -- No --> D{"¿Subarreglo / Subcadena?"}
    
    D -- Ventana Continua --> E["🪟 Sliding Window<br/><i>O(N)</i>"]
    D -- Suma de Subarreglo = K --> F["📊 Prefix Sum + HashMap<br/><i>O(N)</i>"]
    D -- Pares desde Extremos --> G["👉👈 Two Pointers<br/><i>O(N)</i>"]
    D -- Siguiente Mayor / Menor --> H["📚 Monotonic Stack<br/><i>O(N)</i>"]

    classDef root fill:#064e3b,stroke:#10b981,stroke-width:3px,color:#a7f3d0,font-size:17px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algo fill:#0f172a,stroke:#00f5ff,stroke-width:2.5px,color:#38bdf8,font-size:16px;
    class A root;
    class B,D decision;
    class C,E,F,G,H algo;`
  },

  graphs: {
    title: 'Sub-Diagrama: Grafos y Árboles',
    subtitle: 'Rutas óptimas: BFS, Dijkstra, Ordenamiento Topológico, Union-Find y Trie',
    code: `graph TD
    A["🟦 Grafos / Árboles / Grillas 2D"] --> B{"¿Objetivo del Problema?"}
    
    B -- Camino Más Corto (Sin Pesos) --> C["🌊 BFS (Breadth-First Search)<br/><i>O(V + E)</i>"]
    B -- Camino Más Corto (Pesos Positivos) --> D["⚖️ Algoritmo de Dijkstra<br/><i>O((V+E) log V)</i>"]
    B -- Prerrequisitos / Orden de Tareas (DAG) --> E["📋 Orden Topológico (Kahn / DFS)<br/><i>O(V + E)</i>"]
    B -- Detección de Ciclos / Grupos Conexos --> F["🪢 Union-Find (DSU)<br/><i>O(α(N))</i>"]
    B -- Búsqueda de Prefijos de Cadenas --> G["🌲 Trie (Árbol de Prefijos)<br/><i>O(L)</i>"]

    classDef root fill:#1e1b4b,stroke:#6366f1,stroke-width:3px,color:#c7d2fe,font-size:17px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algo fill:#0f172a,stroke:#ff007f,stroke-width:2.5px,color:#ff70a6,font-size:16px;
    class A root;
    class B decision;
    class C,D,E,F,G algo;`
  },

  dp: {
    title: 'Sub-Diagrama: Optimización y DP / Backtracking',
    subtitle: 'Diferenciación entre Programación Dinámica y Búsqueda Exhaustiva con Backtracking',
    code: `graph TD
    A["🟧 Optimización y Combinatoria"] --> B{"¿Qué solicita el enunciado?"}
    
    B -- Valor Mínimo, Máximo o Conteo Total --> C["🧱 Programación Dinámica (DP)<br/><i>O(Estados × Transiciones)</i>"]
    B -- Listar TODAS las soluciones posibles --> D["🔙 Backtracking (DFS Tree)<br/><i>O(2^N) / O(N!)</i>"]
    
    C --> C1["Subproblemas Solapados + Subestructura Óptima"]
    D --> D1["Permutaciones, Combinaciones, N-Queens, Sudoku"]

    classDef root fill:#451a03,stroke:#f59e0b,stroke-width:3px,color:#fde68a,font-size:17px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algo fill:#0f172a,stroke:#39ff14,stroke-width:2.5px,color:#a7f3d0,font-size:16px;
    class A root;
    class B decision;
    class C,D,C1,D1 algo;`
  },

  specialized: {
    title: 'Sub-Diagrama: Estructuras Especializadas (Heaps e Intervalos)',
    subtitle: 'Colas de Prioridad, elementos Top-K y barrido de eventos de tiempo',
    code: `graph TD
    A["🟪 Estructuras Especializadas"] --> B{"¿Patrón de los Datos y Consultas?"}
    
    B -- Elementos Top K / Mediana en Flujo --> C["👑 Heap / Priority Queue<br/><i>O(N log K)</i>"]
    B -- Intervalos / Traslape de Eventos --> D["📅 Intervalos / Sweep Line<br/><i>O(N log N)</i>"]
    
    C --> C1["Min-Heap para K Mayores / Max-Heap para Menores"]
    D --> D1["Ordenar por Inicio + Greedy / Priority Queue Fin Activo"]

    classDef root fill:#3b0764,stroke:#a855f7,stroke-width:3px,color:#e9d5ff,font-size:17px;
    classDef decision fill:#090e1c,stroke:#ffd60a,stroke-width:2px,color:#fff,font-size:15px;
    classDef algo fill:#0f172a,stroke:#b5179e,stroke-width:2.5px,color:#e9d5ff,font-size:16px;
    class A root;
    class B decision;
    class C,D,C1,D1 algo;`
  }
};

const CHEAT_SHEET_DATA_EN = [
  { algo: 'Binary Search', cat: 'Array / String', time: 'O(log N)', space: 'O(1)', signal: 'Sorted array, monotonic function search range', visualizer: 'binary_search' },
  { algo: 'Sliding Window', cat: 'Array / String', time: 'O(N)', space: 'O(1) / O(K)', signal: 'Contiguous subarray with max/min condition, substring', visualizer: 'sliding_window' },
  { algo: 'Prefix Sum', cat: 'Array / String', time: 'O(N)', space: 'O(N)', signal: 'Range sum queries, subarray sum equals K (with HashMap)', visualizer: 'prefix_sum' },
  { algo: 'Two Pointers', cat: 'Array / String', time: 'O(N)', space: 'O(1)', signal: 'Sorted pair sum, in-place palindrome, three sum', visualizer: 'two_pointers' },
  { algo: 'Monotonic Stack', cat: 'Array / String', time: 'O(N)', space: 'O(N)', signal: 'Next greater/smaller element, largest rectangle in histogram', visualizer: 'stack' },
  { algo: 'BFS (Breadth-First)', cat: 'Graphs / Trees', time: 'O(V + E)', space: 'O(V)', signal: 'Shortest path unweighted, level-order traversal, 2D matrix infection', visualizer: 'bfs' },
  { algo: 'Dijkstra', cat: 'Graphs / Trees', time: 'O((V+E) log V)', space: 'O(V)', signal: 'Shortest path on positive weighted graph with priority queue', visualizer: 'graph' },
  { algo: 'Topological Sort', cat: 'Graphs / Trees', time: 'O(V + E)', space: 'O(V)', signal: 'Course schedule, task dependencies, cycle detection in DAG', visualizer: 'graph' },
  { algo: 'Union-Find (DSU)', cat: 'Graphs / Trees', time: 'O(α(N)) ≈ O(1)', space: 'O(N)', signal: 'Dynamic connected components, redundant connection, Kruskal MST', visualizer: 'graph' },
  { algo: 'Trie (Prefix Tree)', cat: 'Graphs / Trees', time: 'O(L)', space: 'O(N · L)', signal: 'Autocomplete, dictionary prefix lookup, word search II', visualizer: 'trie' },
  { algo: 'Dynamic Programming', cat: 'Optimization', time: 'O(States × Trans)', space: 'O(States)', signal: 'Max/min value, count total ways, 0/1 Knapsack, LCS, LIS', visualizer: 'dp' },
  { algo: 'Backtracking (DFS)', cat: 'Combinatorics', time: 'O(2^N) / O(N!)', space: 'O(N)', signal: 'Generate all valid subsets, permutations, N-Queens, Sudoku solver', visualizer: 'dfs' },
  { algo: 'Heap / Priority Queue', cat: 'Specialized', time: 'O(N log K)', space: 'O(K)', signal: 'Top K frequent elements, merge K sorted lists, median of stream', visualizer: 'heap' },
  { algo: 'Intervals / Sweep Line', cat: 'Specialized', time: 'O(N log N)', space: 'O(N)', signal: 'Meeting rooms, non-overlapping intervals, interval insertions', visualizer: 'greedy' }
];

const CHEAT_SHEET_DATA_ES = [
  { algo: 'Búsqueda Binaria', cat: 'Arreglo / Cadena', time: 'O(log N)', space: 'O(1)', signal: 'Arreglos ordenados, funciones monótonas', visualizer: 'binary_search' },
  { algo: 'Ventana Deslizante', cat: 'Arreglo / Cadena', time: 'O(N)', space: 'O(1) / O(K)', signal: 'Subarreglos contiguos de tamaño fijo o condicional', visualizer: 'sliding_window' },
  { algo: 'Suma de Prefijos', cat: 'Arreglo / Cadena', time: 'O(N)', space: 'O(N)', signal: 'Consultas de suma acumulada en rangos, suma = K', visualizer: 'prefix_sum' },
  { algo: 'Dos Punteros', cat: 'Arreglo / Cadena', time: 'O(N)', space: 'O(1)', signal: 'Pares convergentes, inversión in-place, Two Sum ordenado', visualizer: 'two_pointers' },
  { algo: 'Pila Monótona', cat: 'Arreglo / Cadena', time: 'O(N)', space: 'O(N)', signal: 'Siguiente elemento mayor o menor, histogramas', visualizer: 'stack' },
  { algo: 'BFS (Anchura)', cat: 'Grafos / Árboles', time: 'O(V + E)', space: 'O(V)', signal: 'Camino más corto sin pesos, recorrido por niveles', visualizer: 'bfs' },
  { algo: 'Dijkstra', cat: 'Grafos / Árboles', time: 'O((V+E) log V)', space: 'O(V)', signal: 'Camino más corto con pesos no negativos', visualizer: 'graph' },
  { algo: 'Orden Topológico', cat: 'Grafos / Árboles', time: 'O(V + E)', space: 'O(V)', signal: 'Orden de dependencias en DAGs (Course Schedule)', visualizer: 'graph' },
  { algo: 'Union-Find (DSU)', cat: 'Grafos / Árboles', time: 'O(α(N)) ≈ O(1)', space: 'O(N)', signal: 'Componentes conexas dinámicas, detección de ciclos', visualizer: 'graph' },
  { algo: 'Trie (Prefijos)', cat: 'Grafos / Árboles', time: 'O(L)', space: 'O(N · L)', signal: 'Autocompletado, búsqueda de prefijos de texto', visualizer: 'trie' },
  { algo: 'Programación Dinámica', cat: 'Optimización', time: 'O(Estados × Trans)', space: 'O(Estados)', signal: 'Valor óptimo, subproblemas solapados (Knapsack, LCS)', visualizer: 'dp' },
  { algo: 'Backtracking (DFS)', cat: 'Combinatoria', time: 'O(2^N) / O(N!)', space: 'O(N)', signal: 'Generación de subconjuntos, permutaciones, N-Queens', visualizer: 'dfs' },
  { algo: 'Heap / Priority Queue', cat: 'Especializadas', time: 'O(N log K)', space: 'O(K)', signal: 'Top K elementos más frecuentes, mediana en flujo', visualizer: 'heap' },
  { algo: 'Intervalos / Sweep Line', cat: 'Especializadas', time: 'O(N log N)', space: 'O(N)', signal: 'Traslape de eventos, superposición de rangos', visualizer: 'greedy' }
];

export const MermaidFlowchartView: React.FC<MermaidFlowchartViewProps> = ({
  onSelectResult: _onSelectResult,
  onOpenVisualizer
}) => {
  const { lang, t } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<DiagramMode>('master');
  const [zoom, setZoom] = useState<number>(1.35); // Generous default zoom so diagram is big and clearly readable
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  const currentDiagrams = lang === 'es' ? MERMAID_DIAGRAMS_ES : MERMAID_DIAGRAMS_EN;
  const currentCheatSheet = lang === 'es' ? CHEAT_SHEET_DATA_ES : CHEAT_SHEET_DATA_EN;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 16,
      flowchart: {
        curve: 'basis',
        nodeSpacing: 50,
        rankSpacing: 60,
        padding: 20,
        htmlLabels: true,
        useMaxWidth: false
      },
      themeVariables: {
        darkMode: true,
        background: '#090f20',
        primaryColor: '#0f172a',
        primaryTextColor: '#00f5ff',
        primaryBorderColor: '#00f5ff',
        lineColor: '#00f5ff',
        secondaryColor: '#1e1b4b',
        tertiaryColor: '#451a03',
        fontSize: '16px'
      }
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const diagramCode = currentDiagrams[selectedMode].code;
        const uniqueId = `mermaid-${selectedMode}-${lang}-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, diagramCode);
        
        // Ensure SVG does not clamp to tiny box
        const enhancedSvg = svg
          .replace(/<svg\s+id="[^"]*"/, '<svg style="max-width: none !important; min-width: 1000px; display: block;"');
        
        setSvgContent(enhancedSvg);
      } catch (error) {
        console.error('Mermaid render error:', error);
      }
    };
    renderDiagram();
  }, [selectedMode, lang]);

  const handleCopyMermaid = async () => {
    try {
      await navigator.clipboard.writeText(currentDiagrams[selectedMode].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownloadSVG = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algomonster-${selectedMode}-flowchart.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '14px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(13, 21, 39, 0.95), rgba(4, 7, 14, 0.98))',
          border: '1px solid rgba(0, 245, 255, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 245, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--neon-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
            <Layers size={15} />
            <span>{t('mermaid.banner.badge')}</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', margin: '0 0 6px 0', color: '#fff' }}>
            {currentDiagrams[selectedMode].title}
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px' }}>
            {currentDiagrams[selectedMode].subtitle}
          </p>
        </div>

        {/* Action Controls: Copy, Download, Fullscreen */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={handleCopyMermaid}
            className="cyber-btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {copied ? <Check size={14} color="#39ff14" /> : <Copy size={14} />}
            <span>{copied ? t('mermaid.copied') : t('mermaid.copy')}</span>
          </button>

          <button
            onClick={handleDownloadSVG}
            className="cyber-btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            <span>{t('mermaid.export')}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="cyber-btn"
            style={{ padding: '7px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isFullscreen ? t('mermaid.exit_fullscreen') : t('mermaid.fullscreen')}</span>
          </button>
        </div>
      </div>

      {/* Sub-Graph Selector Tabs */}
      <div className="horizontal-touch-scroll" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(0, 245, 255, 0.15)', paddingBottom: '10px' }}>
        <button
          onClick={() => { setSelectedMode('master'); setZoom(1.35); }}
          className={`cyber-tab ${selectedMode === 'master' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'master' ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'master' ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: selectedMode === 'master' ? 'var(--neon-cyan)' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <Sparkles size={14} /> {t('mermaid.tab.master')}
        </button>

        <button
          onClick={() => { setSelectedMode('arrays'); setZoom(1.35); }}
          className={`cyber-tab ${selectedMode === 'arrays' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'arrays' ? 'rgba(57, 255, 20, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'arrays' ? 'var(--neon-green)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: selectedMode === 'arrays' ? 'var(--neon-green)' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          {t('mermaid.tab.arrays')}
        </button>

        <button
          onClick={() => { setSelectedMode('graphs'); setZoom(1.35); }}
          className={`cyber-tab ${selectedMode === 'graphs' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'graphs' ? 'rgba(0, 180, 216, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'graphs' ? '#00b4d8' : 'rgba(255, 255, 255, 0.1)'}`,
            color: selectedMode === 'graphs' ? '#00b4d8' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          {t('mermaid.tab.graphs')}
        </button>

        <button
          onClick={() => { setSelectedMode('dp'); setZoom(1.35); }}
          className={`cyber-tab ${selectedMode === 'dp' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'dp' ? 'rgba(255, 0, 127, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'dp' ? 'var(--neon-magenta)' : 'rgba(255, 255, 0, 0.1)'}`,
            color: selectedMode === 'dp' ? 'var(--neon-magenta)' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          {t('mermaid.tab.dp')}
        </button>

        <button
          onClick={() => { setSelectedMode('specialized'); setZoom(1.35); }}
          className={`cyber-tab ${selectedMode === 'specialized' ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: selectedMode === 'specialized' ? 'rgba(181, 23, 158, 0.2)' : 'transparent',
            border: `1px solid ${selectedMode === 'specialized' ? '#d946ef' : 'rgba(255, 255, 255, 0.1)'}`,
            color: selectedMode === 'specialized' ? '#d946ef' : 'var(--text-muted)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          {t('mermaid.tab.specialized')}
        </button>
      </div>

      {/* Mermaid Canvas Stage with High-Res Zoom Controls */}
      <div
        style={{
          position: isFullscreen ? 'fixed' : 'relative',
          inset: isFullscreen ? 0 : 'auto',
          zIndex: isFullscreen ? 9999 : 1,
          backgroundColor: '#090f20',
          border: '1px solid rgba(0, 245, 255, 0.3)',
          borderRadius: isFullscreen ? 0 : 'var(--radius-lg)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 245, 255, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: isFullscreen ? '100vh' : '750px',
          transition: 'all 0.25s ease'
        }}
      >
        {/* Floating Zoom & Canvas Toolbar */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(13, 21, 39, 0.9)',
            backdropFilter: 'blur(8px)',
            padding: '5px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <button
            onClick={() => setZoom(z => Math.max(0.6, z - 0.2))}
            title="Zoom Out"
            style={{ background: 'transparent', border: 'none', color: '#c9d8f0', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            <ZoomOut size={16} />
          </button>
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', padding: '0 6px', minWidth: '46px', textAlign: 'center', fontWeight: 600 }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(3.0, z + 0.2))}
            title="Zoom In"
            style={{ background: 'transparent', border: 'none', color: '#c9d8f0', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => setZoom(1.35)}
            title="Reset Zoom"
            style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', marginLeft: '4px' }}
          >
            <RotateCcw size={14} />
          </button>
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="cyber-btn"
              style={{ padding: '4px 10px', fontSize: '0.72rem', marginLeft: '6px' }}
            >
              Exit
            </button>
          )}
        </div>

        {/* Scrollable & Scalable SVG Container */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '40px',
            cursor: 'grab'
          }}
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              transition: 'transform 0.15s ease-out',
              minWidth: '100%',
              minHeight: '100%'
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      </div>

      {/* Section 2: Summary Matrix of All Algorithms & Complexities */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCode2 size={18} color="var(--neon-cyan)" />
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
            {t('mermaid.matrix.title')}
          </h3>
        </div>

        <div
          className="responsive-code-container"
          style={{
            backgroundColor: '#090f20',
            border: '1px solid rgba(0, 245, 255, 0.25)',
            borderRadius: 'var(--radius-lg)',
            overflowX: 'auto'
          }}
        >
          <div style={{ minWidth: '780px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1fr 1fr 2.5fr 1fr', padding: '12px 16px', backgroundColor: '#0d1527', borderBottom: '1px solid rgba(0, 245, 255, 0.2)', fontSize: '0.75rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              <span>ALGORITHM / ALGORITMO</span>
              <span>CATEGORY</span>
              <span>TIME</span>
              <span>SPACE</span>
              <span>KEY INTERVIEW SIGNALS / CASOS DE USO</span>
              <span>SIMULATOR</span>
            </div>

            {currentCheatSheet.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1.2fr 1fr 1fr 2.5fr 1fr',
                  padding: '12px 16px',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  backgroundColor: idx % 2 === 0 ? 'rgba(16, 28, 54, 0.3)' : 'transparent',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem'
                }}
              >
                <span style={{ color: '#fff', fontWeight: 700 }}>
                  {row.algo}
                </span>
                <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                  {row.cat}
                </span>
                <span style={{ color: 'var(--neon-green)', fontWeight: 600 }}>
                  {row.time}
                </span>
                <span style={{ color: 'var(--neon-magenta)', fontWeight: 600 }}>
                  {row.space}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>
                  {row.signal}
                </span>
                <div>
                  {onOpenVisualizer && (
                    <button
                      onClick={() => onOpenVisualizer(row.visualizer)}
                      className="cyber-btn"
                      style={{ padding: '4px 8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <PlayCircle size={12} />
                      <span>Sim</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Quick Interview Guide Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} color="var(--neon-magenta)" />
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
            {t('mermaid.guide.title')}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: 'var(--neon-cyan)' }}>
              {lang === 'es' ? '¿El arreglo está ORDENADO o es monótono?' : 'Is the array SORTED or monotonic?'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {lang === 'es'
                ? '➡️ Piensa inmediatamente en Búsqueda Binaria (O(log N)) o técnica de Dos Punteros (O(N)).'
                : '➡️ Think immediately of Binary Search (O(log N)) or Two Pointers technique (O(N)).'}
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(57, 255, 20, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: 'var(--neon-green)' }}>
              {lang === 'es' ? '¿Piden subarreglo contiguo que maximice/minimice una condición?' : 'Looking for contiguous subarray with a condition?'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {lang === 'es'
                ? '➡️ Piensa en Ventana Deslizante (Sliding Window) para evitar evaluar los O(N^2) subarreglos.'
                : '➡️ Think of Sliding Window to avoid checking all O(N^2) subarrays.'}
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(255, 0, 127, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: 'var(--neon-magenta)' }}>
              {lang === 'es' ? '¿Piden el número total de formas o el valor óptimo?' : 'Asking for total number of ways or optimal min/max?'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {lang === 'es'
                ? '➡️ Usar Programación Dinámica (DP) mediante memorización o tabulación de subproblemas.'
                : '➡️ Use Dynamic Programming (DP) with memoization or tabulation over subproblems.'}
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(255, 214, 10, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: 'var(--neon-yellow)' }}>
              {lang === 'es' ? '¿Piden mostrar TODAS las posibles combinaciones o permutaciones?' : 'Need to generate ALL valid combinations or paths?'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {lang === 'es'
                ? '➡️ Usar Backtracking (DFS) recorriendo el árbol de decisiones y podando ramas inválidas.'
                : '➡️ Use Backtracking (DFS) traversing the state decision tree with early pruning.'}
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(0, 180, 216, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: '#00b4d8' }}>
              {lang === 'es' ? '¿Encontrar el camino más corto en un laberinto o grafo?' : 'Find the shortest path in a grid or graph?'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {lang === 'es'
                ? '➡️ Usar BFS si cada paso cuesta 1 (sin pesos), o Dijkstra si los pasos tienen pesos positivos.'
                : '➡️ Use BFS if unweighted/uniform cost, or Dijkstra if edge weights are non-negative.'}
            </p>
          </div>

          <div style={{ backgroundColor: '#090f20', border: '1px solid rgba(181, 23, 158, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.92rem', color: '#d946ef' }}>
              {lang === 'es' ? '¿Consultas continuas de los Top-K o mediana en tiempo real?' : 'Need continuous Top-K elements or streaming median?'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {lang === 'es'
                ? '➡️ Mantener un Min/Max Heap (Priority Queue) acotado a tamaño K para inserciones en O(log K).'
                : '➡️ Maintain a bounded Min/Max Heap of size K with O(log K) push/pop operations.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
