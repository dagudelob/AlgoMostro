# ⚡ AlgoMonster CyberFlow // Interactive DSA Navigator & Flowchart

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

**AlgoMonster CyberFlow** is an interactive, high-contrast visualizer and decision tree web application designed to master algorithmic patterns and data structures for coding interviews, based on the [AlgoMonster Flowchart](https://algo.monster/flowchart) methodology.

---

## 🌟 Key Features

### 1. 🧭 Interactive Decision Flowchart (Dual Mode)
- **Dynamic Branching Canvas**: A zoomable, pannable interactive decision tree. Clicking options (*Yes*, *No*, *Depends*) dynamically reveals and illuminates the subsequent branches with glowing neon connectors.
- **Diagnostic Wizard Mode ("Find My Algorithm")**: A step-by-step diagnostic assistant that asks targeted questions about your problem constraints and guides you straight to the optimal pattern with celebratory feedback.
- **Hierarchical Tree View**: Collapsible accordion view representing the full decision taxonomy.

### 2. 🎮 16 Live Interactive Visualizers (8 DS + 8 Algorithms)
Equipped with **Play / Pause / Step / Reset / Custom Input** controls:

| Type | Modules | Interactive Simulations |
| :--- | :--- | :--- |
| **Data Structures** | **Arrays** | Contiguous memory visualization, $O(1)$ index access, and $O(N)$ shift cost on insertion/deletion. |
| | **Linked Lists** | Singly & doubly linked nodes with animated `next` pointers, head/tail operations, and `NULL` terminator. |
| | **Trees (BST)** | SVG binary search tree with In-Order traversal and logarithmic $O(\log N)$ search paths. |
| | **Graphs** | Graph vertices with weighted edges, live adjacency list $O(V+E)$ and adjacency matrix $O(V^2)$ toggle. |
| | **Heaps** | Min-Heap dual representation (Binary Tree + Array indexing) with **Bubble-Up** and **Sift-Down** animations. |
| | **Tries** | Prefix tree matching character-by-character in $O(L)$ time with word and prefix validation. |
| | **Stacks** | LIFO container with Push/Pop operations and a live **Balanced Parentheses Validator** demo. |
| | **Queues** | FIFO pipeline with $O(1)$ `FRONT` dequeue and `REAR` enqueue operations. |
| **Algorithms** | **Sliding Window** | Dynamic $[L, R]$ window expanding and contracting over continuous subarrays in $O(N)$. |
| | **Two Pointers** | Converging pointers over sorted arrays (*Two Sum II / 3Sum*) in $O(N)$ time and $O(1)$ memory. |
| | **BFS** | Breadth-First ripple wave exploration on a 2D grid/maze guaranteeing the shortest path. |
| | **DFS & Backtracking** | Depth-first maze traversal with real-time **Recursion Call Stack** tracking. |
| | **Dynamic Programming** | Step-by-step memoization/tabulation grid for *Coin Change* with recurrence relations. |
| | **Binary Search** | Logarithmic $O(\log N)$ interval halving with $L$, $MID$, and $R$ pointers. |
| | **Greedy** | *Interval Scheduling* selecting the earliest ending non-overlapping intervals in $O(N \log N)$. |
| | **Prefix Sum** | Cumulative sum array precomputation for instant $O(1)$ range sum queries $P[R+1] - P[L]$. |

### 3. ✨ Hover Previews & Mini Animations
Hovering over any algorithm term or flowchart node triggers a floating cyber tooltip with live animated loops, concise definitions, and time/space complexity badges.

### 4. 📚 LeetCode & AlgoMonster Problem Catalog
Every terminal flowchart leaf connects directly to real-world interview problems (e.g., *Course Schedule*, *Trapping Rain Water*, *Koko Eating Bananas*, *Word Break*, *3Sum*):
- Complete, optimized solutions in **Python** and **TypeScript**.
- One-click clipboard copy.
- Key algorithmic insights explaining *why* the pattern is chosen.

---

## 🚀 Quick Start & Deployment

### Option A: Run Anywhere with Docker (Recommended)
No local dependencies required (Docker & Docker Compose are sufficient):

```bash
# 1. Clone the repository
git clone https://github.com/dagudelob/AlgoMostro.git
cd AlgoMostro

# 2. Build and launch the container
docker compose up --build
```
The application will be accessible at: **`http://localhost:8080`**

---

### Option B: Run Locally with Node.js / NPM

**Prerequisites**: Node.js 18+ and NPM.

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build production bundle
npm run build
```
The dev server will be accessible at: **`http://localhost:5173`**

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 18, Vite 8, TypeScript.
- **Styling**: Cyber / High-Contrast Custom CSS System (Custom variables, glassmorphism, neon glow filters, responsive layout).
- **Icons**: Lucide React.
- **Visual Engines**: Interactive SVG & HTML5 Canvas.
- **Containerization**: Multi-stage Docker build with Nginx Alpine serving static assets with gzip compression.

```
AlgoMostro/
├── Dockerfile                  # Multi-stage container definition
├── docker-compose.yml          # Single-command execution config
├── nginx.conf                  # Production SPA reverse proxy & caching
├── Flowchart.md                # AlgoMonster decision tree source
├── src/
│   ├── types/                  # TypeScript interfaces (Flowchart, Visualizer, Complexities)
│   ├── data/                   # Data sources (Flowchart graph, 8 DS, 8 Algorithms, Problem catalog)
│   ├── components/
│   │   ├── common/             # Navbar, Modal, HoverPreviewCard, ComplexityBadge
│   │   ├── flowchart/          # FlowchartCanvas, FlowNode, WizardMode, TreeListView
│   │   ├── visualizers/        # VisualizerHub, MiniVisualizer + 16 DS/Algo components
│   │   └── details/            # ProblemDetailModal, CodeSnippet
│   └── App.tsx                 # Root router and global state
```

---

## 📖 Attribution & Methodology

This project is built based on the algorithmic decision tree methodology pioneered by [AlgoMonster](https://algo.monster/flowchart).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
