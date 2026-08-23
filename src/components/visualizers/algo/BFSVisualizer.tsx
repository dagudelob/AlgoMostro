import React, { useState, useRef, useEffect } from 'react';
import { PlaybackController, type SimulationSpeed } from '../../common/PlaybackController';
import { VariableWatcher, type WatcherVariable } from '../../common/VariableWatcher';

interface BFSState {
  visited: { [key: string]: number };
  queue: [number, number, number][]; // [r, c, dist]
  activeCell: string | null;
  isFound: boolean;
  message: string;
}

export const BFSVisualizer: React.FC = () => {
  const rows = 4;
  const cols = 5;
  const start = [0, 0];
  const target = [3, 4];
  const obstacles = ['1,1', '1,2', '2,2'];

  const initialState: BFSState = {
    visited: { '0,0': 0 },
    queue: [[0, 0, 0]],
    activeCell: '(0,0)',
    isFound: false,
    message: 'BFS (Breadth-First Search) on 2D grid. Explores in concentric wavefronts guaranteeing shortest path.'
  };

  const [history, setHistory] = useState<BFSState[]>([initialState]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulationSpeed>(1);

  const currentState = history[historyIdx] || initialState;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepForward = () => {
    if (currentState.queue.length === 0 || currentState.isFound) {
      setIsPlaying(false);
      return;
    }

    const currentQ = [...currentState.queue];
    const [r, c, dist] = currentQ.shift()!;
    const vis = { ...currentState.visited };

    if (r === target[0] && c === target[1]) {
      const finalState: BFSState = {
        visited: vis,
        queue: currentQ,
        activeCell: `(${r},${c})`,
        isFound: true,
        message: `Target reached at (${r}, ${c})! Shortest distance = ${dist} steps.`
      };
      const newHist = [...history.slice(0, historyIdx + 1), finalState];
      setHistory(newHist);
      setHistoryIdx(newHist.length - 1);
      setIsPlaying(false);
      return;
    }

    // 4 Directions
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
        currentQ.push([nr, nc, dist + 1]);
      }
    }

    const nextState: BFSState = {
      visited: vis,
      queue: currentQ,
      activeCell: `(${r},${c})`,
      isFound: false,
      message: `Processed (${r}, ${c}) at dist=${dist}. Enqueued valid unvisited neighbors.`
    };

    const newHist = [...history.slice(0, historyIdx + 1), nextState];
    setHistory(newHist);
    setHistoryIdx(newHist.length - 1);
  };

  const stepBackward = () => {
    if (historyIdx > 0) {
      setIsPlaying(false);
      setHistoryIdx(historyIdx - 1);
    }
  };

  const handleFastForward = () => {
    let cur = { ...currentState };
    const fullHist = [...history.slice(0, historyIdx + 1)];

    while (cur.queue.length > 0 && !cur.isFound) {
      const q = [...cur.queue];
      const [r, c, dist] = q.shift()!;
      const vis = { ...cur.visited };

      if (r === target[0] && c === target[1]) {
        fullHist.push({
          visited: vis,
          queue: q,
          activeCell: `(${r},${c})`,
          isFound: true,
          message: `Fast-Forward: Target found at (${r}, ${c}) with distance ${dist}!`
        });
        break;
      }

      const dirs = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]];
      for (const [nr, nc] of dirs) {
        const nKey = `${nr},${nc}`;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !obstacles.includes(nKey) && vis[nKey] === undefined) {
          vis[nKey] = dist + 1;
          q.push([nr, nc, dist + 1]);
        }
      }

      cur = {
        visited: vis,
        queue: q,
        activeCell: `(${r},${c})`,
        isFound: false,
        message: `Fast-Forward: Visited (${r},${c})`
      };
      fullHist.push(cur);
    }

    setHistory(fullHist);
    setHistoryIdx(fullHist.length - 1);
    setIsPlaying(false);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHistory([initialState]);
    setHistoryIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      if (currentState.queue.length === 0 || currentState.isFound) {
        setIsPlaying(false);
        return;
      }
      const delay = Math.round(700 / speed);
      timerRef.current = setTimeout(() => {
        stepForward();
      }, delay);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, historyIdx, speed]);

  const watcherVars: WatcherVariable[] = [
    { name: 'activeCell', value: currentState.activeCell, type: 'pointer', scope: 'Current Wave', isModified: true },
    { name: 'queue (FIFO)', value: currentState.queue.map(([r, c, d]) => `(${r},${c},d=${d})`), type: 'array', scope: 'Frontier', isModified: true },
    { name: 'visitedCount', value: Object.keys(currentState.visited).length, type: 'number', scope: 'State' },
    { name: 'targetLocation', value: `(${target[0]}, ${target[1]})`, type: 'string', scope: 'Goal' },
    { name: 'isFound', value: currentState.isFound, type: 'boolean', scope: 'Status' }
  ];

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
            FIFO BFS Queue:
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {currentState.queue.slice(0, 6).map(([qr, qc, qd], idx) => (
              <span key={idx} className="cyber-badge badge-cyan">({qr},{qc},d={qd})</span>
            ))}
            {currentState.queue.length > 6 && <span style={{ color: 'var(--text-dim)' }}>+{currentState.queue.length - 6} more</span>}
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
              const isVis = currentState.visited[key] !== undefined;
              const isActive = currentState.activeCell === `(${r},${c})`;

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
              } else if (isTarget && currentState.isFound) {
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
                    <span style={{ fontSize: '0.65rem', color: '#555' }}>BLOCK</span>
                  ) : isStart ? (
                    <span>START</span>
                  ) : isTarget ? (
                    <span style={{ color: currentState.isFound ? '#39ff14' : '#ffb703' }}>TARGET</span>
                  ) : isVis ? (
                    <span style={{ fontSize: '0.9rem' }}>d={currentState.visited[key]}</span>
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
          &gt; {currentState.message}
        </div>
      </div>

      {/* Playback Controls with 5-Speed Gear Lever */}
      <PlaybackController
        isPlaying={isPlaying}
        onPlayToggle={() => {
          if (currentState.isFound || currentState.queue.length === 0) handleReset();
          setIsPlaying(!isPlaying);
        }}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onFastForward={handleFastForward}
        onReset={handleReset}
        canStepBackward={historyIdx > 0}
        canStepForward={!currentState.isFound && currentState.queue.length > 0}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      {/* Debugger Variable Inspector */}
      <VariableWatcher
        variables={watcherVars}
        stepIndex={historyIdx + 1}
      />
    </div>
  );
};
