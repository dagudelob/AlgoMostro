import React, { useState } from 'react';
import { Play, RotateCcw, Share2 } from 'lucide-react';

interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  u: number;
  v: number;
  weight?: number;
}

export const GraphVisualizer: React.FC = () => {
  const nodes: GraphNode[] = [
    { id: 0, label: '0', x: 80, y: 70 },
    { id: 1, label: '1', x: 230, y: 50 },
    { id: 2, label: '2', x: 380, y: 70 },
    { id: 3, label: '3', x: 120, y: 180 },
    { id: 4, label: '4', x: 320, y: 180 }
  ];

  const edges: GraphEdge[] = [
    { u: 0, v: 1, weight: 4 },
    { u: 0, v: 3, weight: 2 },
    { u: 1, v: 2, weight: 6 },
    { u: 1, v: 4, weight: 3 },
    { u: 3, v: 4, weight: 7 },
    { u: 2, v: 4, weight: 1 }
  ];

  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [activeEdge, setActiveEdge] = useState<GraphEdge | null>(null);
  const [message, setMessage] = useState('Grafo ponderado G=(V, E) con 5 vértices y 6 aristas.');
  const [isTraversing, setIsTraversing] = useState(false);
  const [viewMode, setViewMode] = useState<'graph' | 'adjList' | 'matrix'>('graph');

  const handleBFS = async () => {
    setIsTraversing(true);
    setVisitedNodes([]);
    setMessage('Iniciando recorrido BFS desde el vértice 0...');
    const queue: number[] = [0];
    const visited = new Set<number>([0]);
    setVisitedNodes([0]);

    while (queue.length > 0) {
      const u = queue.shift()!;
      setActiveNode(u);
      setMessage(`Procesando vértice ${u}. Explorando aristas adyacentes...`);
      await new Promise((r) => setTimeout(r, 650));

      const neighbors = edges
        .filter((e) => e.u === u || e.v === u)
        .map((e) => (e.u === u ? e.v : e.u));

      for (const v of neighbors) {
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
          setVisitedNodes(Array.from(visited));
          setActiveEdge({ u, v });
          setMessage(`Descubriendo vértice vecino ${v} a través de la arista (${u}-${v}).`);
          await new Promise((r) => setTimeout(r, 650));
        }
      }
    }
    setActiveNode(null);
    setActiveEdge(null);
    setMessage('¡Recorrido de grafo completado en tiempo O(V + E)!');
    setIsTraversing(false);
  };

  const handleReset = () => {
    setActiveNode(null);
    setVisitedNodes([]);
    setActiveEdge(null);
    setMessage('Grafo restablecido.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* View Mode Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setViewMode('graph')}
          className={viewMode === 'graph' ? 'cyber-btn' : 'cyber-btn-secondary'}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          <Share2 size={14} /> Vista Gráfica
        </button>
        <button
          onClick={() => setViewMode('adjList')}
          className={viewMode === 'adjList' ? 'cyber-btn' : 'cyber-btn-secondary'}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          Lista de Adyacencia O(V+E)
        </button>
        <button
          onClick={() => setViewMode('matrix')}
          className={viewMode === 'matrix' ? 'cyber-btn' : 'cyber-btn-secondary'}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          Matriz de Adyacencia O(V²)
        </button>
      </div>

      {/* Main Visualizer Area */}
      <div
        style={{
          background: '#070c18',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '260px',
          justifyContent: 'center'
        }}
      >
        {viewMode === 'graph' && (
          <svg viewBox="0 0 460 230" style={{ width: '100%', maxWidth: '460px', height: '230px' }}>
            {/* Edges */}
            {edges.map((e, idx) => {
              const uNode = nodes.find((n) => n.id === e.u)!;
              const vNode = nodes.find((n) => n.id === e.v)!;
              const isEdgeHighlighted =
                activeEdge &&
                ((activeEdge.u === e.u && activeEdge.v === e.v) ||
                  (activeEdge.u === e.v && activeEdge.v === e.u));

              const midX = (uNode.x + vNode.x) / 2;
              const midY = (uNode.y + vNode.y) / 2;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={uNode.x}
                    y1={uNode.y}
                    x2={vNode.x}
                    y2={vNode.y}
                    stroke={isEdgeHighlighted ? 'var(--neon-magenta)' : 'rgba(0, 245, 255, 0.3)'}
                    strokeWidth={isEdgeHighlighted ? 3 : 2}
                  />
                  {/* Weight tag */}
                  <circle cx={midX} cy={midY} r={10} fill="#080c14" stroke="rgba(0, 245, 255, 0.4)" strokeWidth={1} />
                  <text
                    x={midX}
                    y={midY + 4}
                    textAnchor="middle"
                    fill="var(--neon-cyan)"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    fontWeight="700"
                  >
                    {e.weight}
                  </text>
                </g>
              );
            })}

            {/* Vertices */}
            {nodes.map((n) => {
              const isActive = activeNode === n.id;
              const isVisited = visitedNodes.includes(n.id);

              return (
                <g key={`node-${n.id}`} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={22}
                    fill={isActive ? 'rgba(0, 245, 255, 0.4)' : isVisited ? 'rgba(57, 255, 20, 0.25)' : 'rgba(16, 28, 54, 0.9)'}
                    stroke={isActive ? 'var(--neon-cyan)' : isVisited ? 'var(--neon-green)' : 'rgba(0, 245, 255, 0.4)'}
                    strokeWidth={isActive ? 3 : 2}
                    filter={isActive ? 'drop-shadow(0 0 10px #00f5ff)' : 'none'}
                  />
                  <text
                    x={n.x}
                    y={n.y + 5}
                    textAnchor="middle"
                    fill={isActive ? '#fff' : isVisited ? '#39ff14' : '#e0eaff'}
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        {viewMode === 'adjList' && (
          <div style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <div style={{ color: 'var(--neon-cyan)', marginBottom: '8px', fontWeight: 600 }}>
              &gt; Map&lt;Vertex, List&lt;[Neighbor, Weight]&gt;&gt;
            </div>
            {nodes.map((n) => {
              const neighbors = edges
                .filter((e) => e.u === n.id || e.v === n.id)
                .map((e) => {
                  const target = e.u === n.id ? e.v : e.u;
                  return `[V${target}, peso:${e.weight}]`;
                });
              return (
                <div key={n.id} style={{ display: 'flex', gap: '8px', padding: '4px 0' }}>
                  <span style={{ color: '#ff007f', fontWeight: 700 }}>Nodo {n.id} :</span>
                  <span style={{ color: '#c9e6ff' }}>{neighbors.join(' -> ')}</span>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'matrix' && (
          <div style={{ width: '100%', overflowX: 'auto', textAlign: 'center' }}>
            <table style={{ margin: '0 auto', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '6px 12px', color: 'var(--text-muted)' }}>-</th>
                  {nodes.map((n) => (
                    <th key={n.id} style={{ padding: '6px 12px', color: 'var(--neon-cyan)' }}>V{n.id}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nodes.map((row) => (
                  <tr key={row.id}>
                    <td style={{ padding: '6px 12px', color: 'var(--neon-cyan)', fontWeight: 700 }}>V{row.id}</td>
                    {nodes.map((col) => {
                      const edge = edges.find(
                        (e) => (e.u === row.id && e.v === col.id) || (e.u === col.id && e.v === row.id)
                      );
                      const isConnected = !!edge;
                      return (
                        <td
                          key={col.id}
                          style={{
                            padding: '6px 12px',
                            border: '1px solid rgba(0, 245, 255, 0.1)',
                            backgroundColor: isConnected ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                            color: isConnected ? '#39ff14' : 'var(--text-dim)'
                          }}
                        >
                          {isConnected ? edge.weight : 0}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Message Banner */}
        <div
          style={{
            width: '100%',
            padding: '10px 16px',
            backgroundColor: 'rgba(0, 245, 255, 0.05)',
            borderLeft: '3px solid var(--neon-cyan)',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#c9e6ff',
            marginTop: '12px'
          }}
        >
          &gt; {message}
        </div>
      </div>

      {/* Action Controls */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          background: 'rgba(13, 21, 39, 0.6)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          alignItems: 'center'
        }}
      >
        <button
          onClick={handleBFS}
          disabled={isTraversing}
          className="cyber-btn"
          style={{ padding: '7px 14px', fontSize: '0.8rem' }}
        >
          <Play size={14} /> Explorar Grafo con BFS O(V+E)
        </button>

        <button
          onClick={handleReset}
          disabled={isTraversing}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
