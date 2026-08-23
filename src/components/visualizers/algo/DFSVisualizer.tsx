import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export const DFSVisualizer: React.FC = () => {
  // Simple 4x4 maze for DFS pathfinding
  const rows = 4;
  const cols = 4;
  const target = '3,3';
  const obstacles = ['1,1', '2,1', '0,3'];

  const [callStack, setCallStack] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('DFS (Depth-First Search & Backtracking). Explores deeply until reaching dead-end or target, backtracking using recursion stack.');

  const runDFS = async () => {
    setIsRunning(true);
    setVisited([]);
    setPath([]);
    setCallStack([]);
    setMessage('Starting recursive DFS from (0,0)...');

    const vis = new Set<string>();
    const currentPath: string[] = [];
    const stack: string[] = [];

    const dfs = async (r: number, c: number): Promise<boolean> => {
      const key = `${r},${c}`;
      if (
        r < 0 ||
        r >= rows ||
        c < 0 ||
        c >= cols ||
        obstacles.includes(key) ||
        vis.has(key)
      ) {
        return false;
      }

      vis.add(key);
      currentPath.push(key);
      stack.push(`dfs(${r},${c})`);
      setActiveCell(key);
      setVisited(Array.from(vis));
      setPath([...currentPath]);
      setCallStack([...stack]);
      setMessage(`Advancing to (${r}, ${c}). Call Stack Depth: ${stack.length}`);
      await new Promise((res) => setTimeout(res, 500));

      if (key === target) {
        setMessage(`Target (3,3) reached! Final Path: ${currentPath.join(' -> ')}.`);
        return true;
      }

      // Explore Right, Down, Left, Up
      const directions = [
        [r, c + 1],
        [r + 1, c],
        [r, c - 1],
        [r - 1, c]
      ];

      for (const [nr, nc] of directions) {
        const found = await dfs(nr, nc);
        if (found) return true;
      }

      // Backtrack
      setMessage(`Dead end from (${r}, ${c}). Backtracking...`);
      currentPath.pop();
      stack.pop();
      setPath([...currentPath]);
      setCallStack([...stack]);
      await new Promise((res) => setTimeout(res, 400));
      return false;
    };

    await dfs(0, 0);
    setIsRunning(false);
  };

  const handleReset = () => {
    setVisited([]);
    setPath([]);
    setCallStack([]);
    setActiveCell(null);
    setIsRunning(false);
    setMessage('DFS reset.');
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        {/* Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
            Exploration Maze Grid
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 50px)`,
              gridTemplateRows: `repeat(${rows}, 50px)`,
              gap: '6px'
            }}
          >
            {Array.from({ length: rows }).map((_, r) =>
              Array.from({ length: cols }).map((_, c) => {
                const key = `${r},${c}`;
                const isObstacle = obstacles.includes(key);
                const isTarget = key === target;
                const isCurrent = activeCell === key;
                const inPath = path.includes(key);
                const isVis = visited.includes(key);

                let bg = 'rgba(16, 28, 54, 0.7)';
                let borderColor = 'rgba(0, 245, 255, 0.2)';
                let textColor = '#c9e6ff';

                if (isObstacle) {
                  bg = '#1c1b22';
                  borderColor = 'rgba(255, 255, 255, 0.1)';
                } else if (inPath) {
                  bg = 'rgba(57, 255, 20, 0.3)';
                  borderColor = 'var(--neon-green)';
                  textColor = '#39ff14';
                } else if (isVis) {
                  bg = 'rgba(255, 0, 127, 0.15)';
                  borderColor = 'rgba(255, 0, 127, 0.4)';
                  textColor = 'rgba(255, 0, 127, 0.8)';
                }

                return (
                  <div
                    key={key}
                    style={{
                      backgroundColor: bg,
                      border: `2px solid ${isCurrent ? 'var(--neon-magenta)' : borderColor}`,
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: textColor,
                      boxShadow: isCurrent ? '0 0 12px var(--neon-magenta)' : inPath ? '0 0 8px rgba(57,255,20,0.4)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isObstacle ? 'BLOCK' : isTarget ? 'TARGET' : key}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Call Stack Window */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Recursion Call Stack:
          </span>
          <div
            style={{
              height: '160px',
              backgroundColor: '#050912',
              border: '1px solid rgba(0, 245, 255, 0.2)',
              borderRadius: '6px',
              padding: '8px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: '4px'
            }}
          >
            {callStack.map((frame, idx) => (
              <div
                key={idx}
                style={{
                  padding: '4px 8px',
                  backgroundColor: idx === callStack.length - 1 ? 'rgba(0, 245, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  borderLeft: `3px solid ${idx === callStack.length - 1 ? 'var(--neon-cyan)' : 'var(--text-dim)'}`,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: idx === callStack.length - 1 ? '#fff' : 'var(--text-muted)'
                }}
              >
                {frame}
              </div>
            ))}
            {callStack.length === 0 && (
              <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                [ Call Stack Empty ]
              </span>
            )}
          </div>
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
          color: '#c9e6ff'
        }}
      >
        &gt; {message}
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
          onClick={runDFS}
          disabled={isRunning}
          className="cyber-btn"
          style={{ padding: '7px 16px', fontSize: '0.8rem' }}
        >
          <Play size={14} /> Run DFS & Backtrack
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
