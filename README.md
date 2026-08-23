# 🌌 AlgoMonster CyberFlow // Interactive DSA Decision Engine & Learning Wiki

[![License: MIT](https://img.shields.io/badge/License-MIT-00f5ff.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-ff007f.svg)](https://www.docker.com/)
[![React 19](https://img.shields.io/badge/React-19.0-39ff14.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-ffd60a.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-00f5ff.svg)](https://vitejs.dev/)

An open-source, interactive visualizer, decision flowchart, and learning wiki designed for mastering **Data Structures & Algorithms (DSA)** for technical coding interviews.

---

## 📖 Table of Contents
1. [Attribution & Educational Purpose](#-attribution--educational-purpose)
2. [Key Features & Capabilities](#-key-features--capabilities)
3. [Structured Progressive Learning Path](#-structured-progressive-learning-path)
4. [Algorithm Decision Matrix ("When to Use What")](#-algorithm-decision-matrix-when-to-use-what)
5. [Technology Stack](#-technology-stack)
6. [Quick Start & Deployment (Docker & Local)](#-quick-start--deployment)
7. [Repository Architecture](#-repository-architecture)
8. [License](#-license)

---

## 🤝 Attribution & Educational Purpose

> [!NOTE]
> This project is an independent, open-source collaborative educational resource built for students, software engineers, and interview candidates.
> 
> The decision hierarchy and categorization methodology are inspired by the renowned [AlgoMonster Flowchart](https://algo.monster/flowchart). We express our gratitude to the **AlgoMonster** team for pioneering structured algorithmic thinking.
>
> All code implementations, interactive React simulators, step-by-step debuggers, and visual components in this repository were independently designed and developed for open learning under the **MIT License**.

---

## ✨ Key Features & Capabilities

### 🧭 1. Top-to-Bottom Interactive Decision Flowchart
- **Vertical Stream Navigation**: Visual step-by-step decision hierarchy (`STEP 1` $\downarrow$ `STEP 2` $\downarrow$ `STEP 3`) with glowing downward connectors.
- **Dynamic Category Filtering**: Instant focus on *Graphs/Trees*, *Binary Search*, *Subarrays & Strings*, *Dynamic Programming*, *Heaps*, or *Intervals*.

### 🕹️ 2. Live Interactive Simulators with 5-Speed Gearbox & Debugger
- **16 Total Visualizers**: 8 Data Structures + 8 Essential Algorithmic Patterns.
- **5-Speed Transmission**: Stepped selector (`0.25x Super Slow`, `0.5x Slow`, `1x Normal`, `2x Fast`, `4x Turbo`).
- **Full Execution Controls**:
  - ⏪ **Step Back**: Reverts one algorithmic step using state snapshot history.
  - ▶️ **Play / ⏸️ Pause**: Real-time animation at the selected speed multiplier.
  - ⏩ **Step Forward**: Advances by 1 step.
  - ⏭️ **Fast Forward**: Jumps instantly to the final result state.
  - 🔄 **Reset**: Restores starting memory / pointers.
- **Live Debugger Variable Watcher**: Inspects active variables (`L`, `R`, `mid`, `currentSum`, `visitedCount`, `callStack`, `queue`) with real-time modification highlights, type badges, and memory scopes.

### 🎨 3. Native IDE Syntax Highlighting (Pylance / VS Code Dark+ Theme)
- High-fidelity syntax tokenization with line numbers and one-click copy for **Python 3** and **TypeScript** solutions to classic LeetCode interview problems.

### 📚 4. Comprehensive Learning Wiki & Big-O Reference
- **Big-O Complexity Cheat Sheet**: Runtime and space thresholds based on input size ($N \le 10^{18}$, $N \le 10^7$, $N \le 5000$, $N \le 20$).
- **Algorithm Decision Matrix**: Searchable signals $\rightarrow$ recommended patterns.
- **Technical Glossary**: 30+ fundamental terms (Amortized Time, Optimal Substructure, Monotonicity, Union-Find, Bitmasking).

---

## 🎓 Structured Progressive Learning Path

The application is structured in progressive order of mastery:

```
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 1: Fundamental Data Structures                       │
│  Arrays • Linked Lists • Stacks • Queues • Trees • Heaps    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 2: Core Algorithmic Techniques                       │
│  Two Pointers • Sliding Window • Binary Search • BFS • DFS  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 3: Dynamic Programming & Advanced Strategies         │
│  Memoization • 1D/2D Tabulation • State Compression/Bitmask │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 4: Computational Complexity & Big-O Analysis         │
│  Time Complexity • Space Bounds • Master Theorem • Limits   │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ Algorithm Decision Matrix ("When to Use What")

| Problem Signal / Constraint | Recommended Pattern | Time Complexity | Classic LeetCode Problem |
| :--- | :--- | :--- | :--- |
| **Sorted input** or monotonic answer predicate | **Binary Search** | $O(\log N)$ | [LC #704](https://leetcode.com/problems/binary-search/) / [LC #875](https://leetcode.com/problems/koko-eating-bananas/) |
| **Contiguous subarray** with sum or length bound | **Sliding Window** | $O(N)$ | [LC #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) / [LC #209](https://leetcode.com/problems/minimum-size-subarray-sum/) |
| **Sorted pair sums**, palindromes, in-place partition | **Two Pointers** | $O(N)$ | [LC #167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) / [LC #15](https://leetcode.com/problems/3sum/) |
| **Shortest path** (unweighted) or tree level-order | **Breadth-First Search (BFS)** | $O(V + E)$ | [LC #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) / [LC #200](https://leetcode.com/problems/number-of-islands/) |
| **Shortest path** in weighted graph ($\ge 0$) | **Dijkstra's Algorithm** | $O(E \log V)$ | [LC #743](https://leetcode.com/problems/network-delay-time/) |
| **Exhaustive paths**, permutations, tree LCA | **Depth-First Search (DFS)** | $O(V + E)$ | [LC #79](https://leetcode.com/problems/word-search/) / [LC #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) |
| **Top-K elements** or merging K sorted streams | **Min/Max-Heap** | $O(N \log K)$ | [LC #215](https://leetcode.com/problems/kth-largest-element-in-an-array/) / [LC #23](https://leetcode.com/problems/merge-k-sorted-lists/) |
| **Nearest greater/smaller** boundary elements | **Monotonic Stack** | $O(N)$ | [LC #739](https://leetcode.com/problems/daily-temperatures/) / [LC #84](https://leetcode.com/problems/largest-rectangle-in-histogram/) |
| **Overlapping subproblems** & optimal substructure | **Dynamic Programming** | $O(\text{States} \times \text{Trans})$ | [LC #322](https://leetcode.com/problems/coin-change/) / [LC #300](https://leetcode.com/problems/longest-increasing-subsequence/) |
| **Static range sums** in $O(1)$ time | **Prefix Sums Array** | $O(1)$ query | [LC #303](https://leetcode.com/problems/range-sum-query-immutable/) / [LC #560](https://leetcode.com/problems/subarray-sum-equals-k/) |
| **Disjoint sets** & network connectivity | **Union-Find (DSU)** | $O(\alpha(N))$ | [LC #547](https://leetcode.com/problems/number-of-provinces/) / [LC #684](https://leetcode.com/problems/redundant-connection/) |

---

## 🛠️ Technology Stack

- **Frontend Core**: [React 19](https://react.dev/) + [TypeScript 5.9](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8.2](https://vitejs.dev/) (lightning-fast HMR & optimized production bundling)
- **Styling**: Vanilla CSS3 Custom Cyberpunk Design System (Dark mode, glassmorphism, responsive grid, zero heavy UI dependencies)
- **Icons & Effects**: [Lucide React](https://lucide.dev/) + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Containerization**: [Docker](https://www.docker.com/) (Multi-stage build) + [Nginx Alpine](https://nginx.org/)

---

## 🚀 Quick Start & Deployment

### Option A: Run with Docker Compose (Recommended)

Ensure Docker is installed, then run:

```bash
# Clone the repository
git clone https://github.com/dagudelob/AlgoMostro.git
cd AlgoMostro

# Build and launch container
docker compose up --build
```
> The application will be accessible at: **`http://localhost:8081`**

### Option B: Local Node.js Development

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build production bundle
npm run build
```
> The development server will run at: **`http://localhost:5173`**

---

## 📂 Repository Architecture

```
AlgoMostro/
├── Dockerfile                  # Multi-stage production build (Node 22 + Nginx)
├── docker-compose.yml          # Container configuration (Port 8081:80)
├── nginx.conf                  # Production SPA routing & asset caching
├── index.html                  # HTML5 entry point & metadata
├── src/
│   ├── main.tsx                # React root bootstrap
│   ├── App.tsx                 # App layout & active view routing
│   ├── index.css               # Cyberpunk design system & CSS tokens
│   ├── types/                  # Strict TypeScript interfaces
│   │   ├── flowchart.ts        # Decision tree & problem catalog types
│   │   └── visualizer.ts       # Visualizer & memory state models
│   ├── data/
│   │   ├── flowchartData.ts    # Complete decision tree graph
│   │   ├── problemCatalog.ts   # Solutions, key insights & complexities
│   │   ├── dataStructuresData.ts # 8 Data Structure definitions
│   │   ├── algorithmsData.ts   # 8 Core Algorithm taxonomies
│   │   └── wikiData.ts         # Curriculum, Big-O tables & Glossary
│   └── components/
│       ├── common/             # Reusable UI primitives
│       │   ├── Navbar.tsx      # Sticky header & global search
│       │   ├── PlaybackController.tsx # 5-Speed gear shift & controls
│       │   ├── VariableWatcher.tsx    # Live debugger inspector
│       │   ├── SyntaxHighlighter.tsx  # Pylance/VS Code code viewer
│       │   └── ComplexityBadge.tsx    # Big-O status chips
│       ├── flowchart/          # Decision tree components
│       │   ├── FlowchartCanvas.tsx    # Vertical top-to-bottom canvas
│       │   ├── WizardMode.tsx         # Diagnostic questionnaire
│       │   └── TreeListView.tsx       # Hierarchical taxonomy list
│       ├── visualizers/        # 16 Interactive visualizers
│       │   ├── ds/             # Array, LinkedList, Tree, Graph, Heap, Trie, Stack, Queue
│       │   └── algo/           # SlidingWindow, TwoPointers, BFS, DFS, DP, BinarySearch, etc.
│       └── wiki/               # Learning Wiki & Knowledge Base
│           └── WikiView.tsx    # Curriculum roadmap, decision matrix, Big-O table & glossary
└── README.md
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](file:///home/dagudelo/code/Study/AlgoMostro/LICENSE) for more details.

**Author**: David Agudelo ([@dagudelob](https://github.com/dagudelob))  
**Repository**: [https://github.com/dagudelob/AlgoMostro](https://github.com/dagudelob/AlgoMostro)
