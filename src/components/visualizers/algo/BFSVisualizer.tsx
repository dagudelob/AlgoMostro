import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export const BFSVisualizer: React.FC = () => {
  // 5x5 Grid for BFS shortest path
  const rows = 4;
  const cols = 5;
  const start = [0, 0];
  const target = [3, 4];

  const obstacles = ['1,1', '1,2', '2,2'];

  const [visited, setVisited] = useState<{ [key: string]: number }>({ '0,0': 0 });
  const [queue, setQueue] = useState<string[]>(['(0,0)']);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [isFound, setIsFound] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('BFS (Breadth-First Search) en cuadrícula. Explora por ondas concéntricas garantizando el camino más corto.');

  const runBFS = async () => {
    setIsRunning(true);
    setIsFound(false);
    const vis: { [key: string]: number } = { '0,0': 0 };
    const q: [number, number, number][] = [[0, 0, 0]]; // [r, c, dist]
    setVisited({ '0,0': 0 });
    setQueue(['(0,0)']);

    while (q.length > 0) {
      const [r, c, dist] = q.shift()!;
      const key = `${r},${c}`;
      setActiveCell(key);
      setMessage(`Procesando celda (${r}, ${c}) a distancia ${dist}...`);
      await new Promise((res) => setTimeout(res, 450));

      if (r === target[0] && c === target[1]) {
        setIsFound(true);
        setMessage(`¡Meta alcanzada en (${r}, ${c})! Distancia más corta garantizada = ${dist} pasos.`);
        setIsRunning(false);
        return;
      }

      // 4 Directions: Up, Down, Left, Right
      const dirs = [
        [r + 1, c],
        [r - 1, c],
        [r, c + 1],
        [r, c - 1]
      ];

      for (const [nr, nc] of dirs) {
        const nKey = `${nr},${nc}`;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          !obstacles.includes(nKey) &&
          vis[nKey] === undefined
        ) {
          vis[nKey] = dist + 1;
          q.push([nr, nc, dist + 1]);
        }
      }

      setVisited({ ...vis });
      setQueue(q.map(([qr, qc]) => `(${qr},${qc})`));
    }

    setIsRunning(false);
    setMessage('Búsqueda completada.');
  };

  const handleReset = () => {
    setVisited({ '0,0': 0 });
    setQueue(['(0,0)']);
    setActiveCell(null);
    setIsFound(false);
    setIsRunning(false);
    setMessage('BFS restablecido a celda inicial (0,0).');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Canvas */}
      <div
        style={{
          background: '#070c18',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {/* Queue Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Cola FIFO BFS:
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {queue.slice(0, 7).map((item, idx) => (
              <span key={idx} className="cyber-badge badge-cyan">{item}</span>
            ))}
            {queue.length > 7 && <span style={{ color: 'var(--text-dim)' }}>+{queue.length - 7} más</span>}
          </div>
        </div>

        {/* 2D Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 54px)`,
            gridTemplateRows: `repeat(${rows}, 54px)`,
            gap: '6px'
          }}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const key = `${r},${c}`;
              const isStart = r === start[0] && c === start[1];
              const isTarget = r === target[0] && c === target[1];
              const isObstacle = obstacles.includes(key);
              const isVis = visited[key] !== undefined;
              const isActive = activeCell === key;

              let bg = 'rgba(16, 28, 54, 0.7)';
              let borderColor = 'rgba(0, 245, 255, 0.2)';
              let textColor = '#fff';

              if (isObstacle) {
                bg = '#1c1b22';
                borderColor = 'rgba(255, 255, 255, 0.1)';
              } else if (isActive) {
                bg = 'rgba(255, 0, 127, 0.4)';
                borderColor = 'var(--neon-magenta)';
              } else if (isStart) {
                bg = 'rgba(0, 245, 255, 0.3)';
                borderColor = 'var(--neon-cyan)';
              } else if (isTarget && isFound) {
                bg = 'rgba(57, 255, 20, 0.4)';
                borderColor = 'var(--neon-green)';
              } else if (isVis) {
                bg = 'rgba(0, 245, 255, 0.12)';
                borderColor = 'rgba(0, 245, 255, 0.4)';
                textColor = 'var(--neon-cyan)';
              }

              return (
                <div
                  key={key}
                  style={{
                    backgroundColor: bg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: textColor,
                    boxShadow: isActive ? '0 0 12px var(--neon-magenta)' : isStart ? '0 0 10px var(--neon-cyan)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {isObstacle ? (
                    <span style={{ fontSize: '0.65rem', color: '#555' }}>BLOQ</span>
                  ) : isStart ? (
                    <span>INICIO</span>
                  ) : isTarget ? (
                    <span style={{ color: isFound ? '#39ff14' : '#ffb703' }}>META</span>
                  ) : isVis ? (
                    <span style={{ fontSize: '0.9rem' }}>d={visited[key]}</span>
                  ) : (
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>{r},{c}</span>
                  )}
                </div>
              );
            })
          )}
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
            color: '#c9e6ff'
          }}
        >
          &gt; {message}
        </div>
      </div>

      {/* Control Panel */}
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
          onClick={runBFS}
          disabled={isRunning}
          className="cyber-btn"
          style={{ padding: '7px 16px', fontSize: '0.8rem' }}
        >
          <Play size={14} /> Ejecutar BFS O(V+E)
        </button>

        <button
          onClick={handleReset}
          disabled={isRunning}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
