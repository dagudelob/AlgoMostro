import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw } from 'lucide-react';

export const HeapVisualizer: React.FC = () => {
  // Min-Heap array
  const [heap, setHeap] = useState<number[]>([4, 10, 15, 20, 25, 30, 45]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [message, setMessage] = useState('Min-Heap (Priority Queue). La raíz en heap[0] siempre contiene el elemento menor.');
  const [newVal, setNewVal] = useState<string>('3');

  // Node positions for binary tree mapping
  const treeCoords = [
    { x: 250, y: 40 },  // 0
    { x: 140, y: 100 }, // 1
    { x: 360, y: 100 }, // 2
    { x: 80, y: 160 },  // 3
    { x: 190, y: 160 }, // 4
    { x: 310, y: 160 }, // 5
    { x: 420, y: 160 }  // 6
  ];

  const handleInsert = async () => {
    const val = parseInt(newVal);
    if (isNaN(val)) return;
    if (heap.length >= 7) {
      setMessage('Límite del visualizador alcanzado (máx 7 nodos).');
      return;
    }

    setMessage(`Insertando ${val} al final del array. Ejecutando Bubble-Up O(log N)...`);
    const newHeap = [...heap, val];
    let curr = newHeap.length - 1;
    setHeap([...newHeap]);
    setActiveIdx(curr);
    await new Promise((r) => setTimeout(r, 600));

    // Bubble Up
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      if (newHeap[curr] < newHeap[parent]) {
        setMessage(`Swap: hijo [${newHeap[curr]}] < padre [${newHeap[parent]}]. Intercambiando posiciones.`);
        const temp = newHeap[curr];
        newHeap[curr] = newHeap[parent];
        newHeap[parent] = temp;
        setHeap([...newHeap]);
        curr = parent;
        setActiveIdx(curr);
        await new Promise((r) => setTimeout(r, 600));
      } else {
        break;
      }
    }
    setActiveIdx(null);
    setMessage(`¡Elemento ${val} insertado y propiedad de Min-Heap restablecida!`);
  };

  const handleExtractMin = async () => {
    if (heap.length === 0) return;
    const minVal = heap[0];
    if (heap.length === 1) {
      setHeap([]);
      setMessage(`Extraído el valor mínimo: ${minVal}. El heap está vacío.`);
      return;
    }

    setMessage(`Extrayendo valor mínimo heap[0] = ${minVal}. Moviendo el último elemento a la raíz y ejecutando Sift-Down O(log N)...`);
    const newHeap = [...heap];
    const last = newHeap.pop()!;
    newHeap[0] = last;
    setHeap([...newHeap]);
    let curr = 0;
    setActiveIdx(0);
    await new Promise((r) => setTimeout(r, 600));

    // Sift Down
    while (true) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      let smallest = curr;

      if (left < newHeap.length && newHeap[left] < newHeap[smallest]) {
        smallest = left;
      }
      if (right < newHeap.length && newHeap[right] < newHeap[smallest]) {
        smallest = right;
      }

      if (smallest !== curr) {
        setMessage(`Sift-down: intercambiando nodo ${newHeap[curr]} con el menor hijo ${newHeap[smallest]}.`);
        const temp = newHeap[curr];
        newHeap[curr] = newHeap[smallest];
        newHeap[smallest] = temp;
        setHeap([...newHeap]);
        curr = smallest;
        setActiveIdx(curr);
        await new Promise((r) => setTimeout(r, 600));
      } else {
        break;
      }
    }
    setActiveIdx(null);
    setMessage(`¡Mínimo extraído (${minVal}) y heap reorganizado en O(log N)!`);
  };

  const handleReset = () => {
    setHeap([4, 10, 15, 20, 25, 30, 45]);
    setActiveIdx(null);
    setMessage('Min-Heap restablecido a estado inicial.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Canvas */}
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
        {/* Binary Tree View */}
        <svg viewBox="0 0 500 200" style={{ width: '100%', maxWidth: '500px', height: '200px' }}>
          {/* Edges */}
          {heap.map((_, idx) => {
            if (idx === 0) return null;
            const parent = Math.floor((idx - 1) / 2);
            if (parent >= treeCoords.length || idx >= treeCoords.length) return null;
            const pCoord = treeCoords[parent];
            const cCoord = treeCoords[idx];

            return (
              <line
                key={`heap-edge-${idx}`}
                x1={pCoord.x}
                y1={pCoord.y}
                x2={cCoord.x}
                y2={cCoord.y}
                stroke="rgba(0, 245, 255, 0.3)"
                strokeWidth={2}
              />
            );
          })}

          {/* Heap Nodes */}
          {heap.map((val, idx) => {
            if (idx >= treeCoords.length) return null;
            const coord = treeCoords[idx];
            const isActive = activeIdx === idx;
            const isMin = idx === 0;

            return (
              <g key={`heap-node-${idx}`}>
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={18}
                  fill={isActive ? 'rgba(255, 0, 127, 0.4)' : isMin ? 'rgba(57, 255, 20, 0.3)' : 'rgba(16, 28, 54, 0.9)'}
                  stroke={isActive ? 'var(--neon-magenta)' : isMin ? 'var(--neon-green)' : 'rgba(0, 245, 255, 0.4)'}
                  strokeWidth={isActive || isMin ? 3 : 2}
                  filter={isActive ? 'drop-shadow(0 0 8px #ff007f)' : 'none'}
                />
                <text
                  x={coord.x}
                  y={coord.y + 5}
                  textAnchor="middle"
                  fill={isActive ? '#fff' : isMin ? '#39ff14' : '#e0eaff'}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  {val}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Array representation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
            Representación en Array Contiguo (parent = floor((i-1)/2), left = 2i+1, right = 2i+2)
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {heap.map((val, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    [{idx}]
                  </span>
                  <div
                    style={{
                      width: '42px',
                      height: '36px',
                      borderRadius: '6px',
                      backgroundColor: isActive ? 'rgba(255, 0, 127, 0.25)' : 'rgba(16, 28, 54, 0.8)',
                      border: `1px solid ${isActive ? 'var(--neon-magenta)' : 'rgba(0, 245, 255, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      color: isActive ? 'var(--neon-magenta)' : idx === 0 ? 'var(--neon-green)' : '#fff'
                    }}
                  >
                    {val}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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

      {/* Control Panel */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(13, 21, 39, 0.6)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="number"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            placeholder="Val"
            style={{
              width: '60px',
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
            onClick={handleInsert}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            <Plus size={14} /> Insertar (Bubble Up) O(log N)
          </button>
        </div>

        <button
          onClick={handleExtractMin}
          className="cyber-btn-magenta"
          style={{ padding: '7px 14px', fontSize: '0.8rem' }}
        >
          <Trash2 size={14} /> Extraer Min (Sift Down) O(log N)
        </button>

        <button
          onClick={handleReset}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
