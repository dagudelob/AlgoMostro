import React, { useState } from 'react';
import { RotateCcw, Search, Layers } from 'lucide-react';

export const TreeVisualizer: React.FC = () => {
  // Tree with initial values: 50, 30, 70, 20, 40, 60, 80
  const nodes = [
    { val: 50, x: 250, y: 40 },
    { val: 30, x: 140, y: 110, pVal: 50 },
    { val: 70, x: 360, y: 110, pVal: 50 },
    { val: 20, x: 80, y: 180, pVal: 30 },
    { val: 40, x: 190, y: 180, pVal: 30 },
    { val: 60, x: 310, y: 180, pVal: 70 },
    { val: 80, x: 420, y: 180, pVal: 70 }
  ];

  const [activeVal, setActiveVal] = useState<number | null>(null);
  const [visitedVals, setVisitedVals] = useState<number[]>([]);
  const [message, setMessage] = useState('Árbol Binario de Búsqueda (BST). Subárbol izquierdo < Raíz < Subárbol derecho.');
  const [newVal, setNewVal] = useState('65');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInOrder = async () => {
    setIsProcessing(true);
    setVisitedVals([]);
    setMessage('Ejecutando recorrido In-Order (Izquierda -> Raíz -> Derecha). Visita los nodos ordenados de menor a mayor.');
    const order = [20, 30, 40, 50, 60, 70, 80];
    const visited: number[] = [];
    for (const v of order) {
      setActiveVal(v);
      visited.push(v);
      setVisitedVals([...visited]);
      setMessage(`Visitando nodo [${v}]...`);
      await new Promise((r) => setTimeout(r, 600));
    }
    setActiveVal(null);
    setMessage(`¡In-Order completado: [${order.join(', ')}]!`);
    setIsProcessing(false);
  };

  const handleSearch = async () => {
    const target = parseInt(newVal);
    if (isNaN(target)) return;
    setIsProcessing(true);
    setVisitedVals([]);
    setMessage(`Buscando ${target} en BST en tiempo O(log N)...`);

    let curr: number | undefined = 50;
    const path: number[] = [];

    while (curr !== undefined) {
      setActiveVal(curr);
      path.push(curr);
      setVisitedVals([...path]);
      await new Promise((r) => setTimeout(r, 700));

      if (curr === target) {
        setMessage(`¡Encontrado ${target}! Camino recorrido: ${path.join(' -> ')} en ${path.length} pasos.`);
        setIsProcessing(false);
        return;
      }

      if (target < curr) {
        setMessage(`${target} < ${curr} -> Descendiendo al subárbol izquierdo.`);
        if (curr === 50) curr = 30;
        else if (curr === 30) curr = 20;
        else if (curr === 70) curr = 60;
        else curr = undefined;
      } else {
        setMessage(`${target} > ${curr} -> Descendiendo al subárbol derecho.`);
        if (curr === 50) curr = 70;
        else if (curr === 30) curr = 40;
        else if (curr === 70) curr = 80;
        else curr = undefined;
      }
    }

    setActiveVal(null);
    setMessage(`El valor ${target} no existe en el BST tras ${path.length} comparaciones O(log N).`);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setActiveVal(null);
    setVisitedVals([]);
    setMessage('BST restablecido.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* SVG Canvas */}
      <div
        style={{
          background: '#070c18',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <svg viewBox="0 0 500 240" style={{ width: '100%', maxWidth: '500px', height: '240px' }}>
          {/* Branch Edges */}
          {nodes.map((node) => {
            if (!node.pVal) return null;
            const parent = nodes.find((n) => n.val === node.pVal);
            if (!parent) return null;
            const isEdgeActive = visitedVals.includes(node.val) && visitedVals.includes(parent.val);
            return (
              <line
                key={`edge-${node.val}`}
                x1={parent.x}
                y1={parent.y}
                x2={node.x}
                y2={node.y}
                stroke={isEdgeActive ? 'var(--neon-cyan)' : 'rgba(0, 245, 255, 0.25)'}
                strokeWidth={isEdgeActive ? 3 : 2}
                strokeDasharray={isEdgeActive ? 'none' : '4 2'}
              />
            );
          })}

          {/* Tree Nodes */}
          {nodes.map((node) => {
            const isActive = activeVal === node.val;
            const isVisited = visitedVals.includes(node.val);

            return (
              <g key={node.val} style={{ cursor: 'pointer' }}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={20}
                  fill={isActive ? 'rgba(0, 245, 255, 0.4)' : isVisited ? 'rgba(57, 255, 20, 0.2)' : 'rgba(16, 28, 54, 0.9)'}
                  stroke={isActive ? 'var(--neon-cyan)' : isVisited ? 'var(--neon-green)' : 'rgba(0, 245, 255, 0.4)'}
                  strokeWidth={isActive ? 3 : 2}
                  filter={isActive ? 'drop-shadow(0 0 8px #00f5ff)' : 'none'}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={isActive ? '#fff' : isVisited ? '#39ff14' : '#e0eaff'}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  {node.val}
                </text>
              </g>
            );
          })}
        </svg>

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
            marginTop: '8px'
          }}
        >
          &gt; {message}
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(13, 21, 39, 0.6)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          alignItems: 'center'
        }}
      >
        <button
          onClick={handleInOrder}
          disabled={isProcessing}
          className="cyber-btn"
          style={{ padding: '7px 14px', fontSize: '0.8rem' }}
        >
          <Layers size={14} /> Recorrido In-Order O(N)
        </button>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="number"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            placeholder="Buscar"
            style={{
              width: '65px',
              padding: '6px 8px',
              background: '#080c14',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#fff',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          />
          <button
            onClick={handleSearch}
            disabled={isProcessing}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            <Search size={14} /> Buscar O(log N)
          </button>
        </div>

        <button
          onClick={handleReset}
          disabled={isProcessing}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
