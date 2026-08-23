import React, { useState, useRef, useEffect } from 'react';
import { PlaybackController, type SimulationSpeed } from '../../common/PlaybackController';
import { VariableWatcher, type WatcherVariable } from '../../common/VariableWatcher';

interface DFSState {
  visited: string[];
  path: string[];
  callStack: string[];
  activeCell: string | null;
  isFound: boolean;
  message: string;
}

export const DFSVisualizer: React.FC = () => {
  const rows = 4;
  const cols = 4;
  const target = '3,3';
  const obstacles = ['1,1', '2,1', '0,3'];

  // Precompute full DFS path steps for interactive step-back / step-forward
  const precomputeDFSSteps = (): DFSState[] => {
    const steps: DFSState[] = [{
      visited: ['0,0'],
      path: ['0,0'],
      callStack: ['dfs(0,0)'],
      activeCell: '0,0',
      isFound: false,
      message: 'DFS start at (0,0)...'
    }];

    const vis = new Set<string>(['0,0']);
    const curPath: string[] = ['0,0'];
    const curStack: string[] = ['dfs(0,0)'];

    const dfs = (r: number, c: number): boolean => {
      const key = `${r},${c}`;
      if (key === target) {
        steps.push({
          visited: Array.from(vis),
          path: [...curPath],
          callStack: [...curStack],
          activeCell: key,
          isFound: true,
          message: `Target (3,3) reached! Complete path: ${curPath.join(' -> ')}.`
        });
        return true;
      }

      const dirs = [[r, c + 1], [r + 1, c], [r, c - 1], [r - 1, c]];
      for (const [nr, nc] of dirs) {
        const nKey = `${nr},${nc}`;
        if (
          nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          !obstacles.includes(nKey) &&
          !vis.has(nKey)
        ) {
          vis.add(nKey);
          curPath.push(nKey);
          curStack.push(`dfs(${nr},${nc})`);
          steps.push({
            visited: Array.from(vis),
            path: [...curPath],
            callStack: [...curStack],
            activeCell: nKey,
            isFound: false,
            message: `Advancing to (${nr}, ${nc}). Stack depth: ${curStack.length}`
          });

          if (dfs(nr, nc)) return true;

          // Backtrack step
          curPath.pop();
          curStack.pop();
          steps.push({
            visited: Array.from(vis),
            path: [...curPath],
            callStack: [...curStack],
            activeCell: key,
            isFound: false,
            message: `Dead end at (${nr}, ${nc}). Backtracking to (${r}, ${c})...`
          });
        }
      }
      return false;
    };

    dfs(0, 0);
    return steps;
  };

  const allSteps = useRef<DFSState[]>(precomputeDFSSteps());
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulationSpeed>(1);

  const currentState = allSteps.current[stepIdx] || allSteps.current[0];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepForward = () => {
    if (stepIdx < allSteps.current.length - 1) {
      setStepIdx(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const stepBackward = () => {
    if (stepIdx > 0) {
      setIsPlaying(false);
      setStepIdx(prev => prev - 1);
    }
  };

  const handleFastForward = () => {
    setStepIdx(allSteps.current.length - 1);
    setIsPlaying(false);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      if (stepIdx >= allSteps.current.length - 1) {
        setIsPlaying(false);
        return;
      }
      const delay = Math.round(750 / speed);
      timerRef.current = setTimeout(() => {
        setStepIdx(prev => prev + 1);
      }, delay);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, stepIdx, speed]);

  const watcherVars: WatcherVariable[] = [
    { name: 'activeCell', value: currentState.activeCell, type: 'pointer', scope: 'Current Scope', isModified: true },
    { name: 'recursionDepth', value: currentState.callStack.length, type: 'number', scope: 'Stack' },
    { name: 'currentPath', value: currentState.path, type: 'array', scope: 'Backtracking State', isModified: true },
    { name: 'visitedCount', value: currentState.visited.length, type: 'number', scope: 'Set' },
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        {/* Maze Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
            Maze Exploration
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
                const isCurrent = currentState.activeCell === key;
                const inPath = currentState.path.includes(key);
                const isVis = currentState.visited.includes(key);

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
            {currentState.callStack.map((frame, idx) => (
              <div
                key={idx}
                style={{
                  padding: '4px 8px',
                  backgroundColor: idx === currentState.callStack.length - 1 ? 'rgba(0, 245, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  borderLeft: `3px solid ${idx === currentState.callStack.length - 1 ? 'var(--neon-cyan)' : 'var(--text-dim)'}`,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: idx === currentState.callStack.length - 1 ? '#fff' : 'var(--text-muted)'
                }}
              >
                {frame}
              </div>
            ))}
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
        &gt; {currentState.message}
      </div>

      {/* Playback Controls with 5-Speed Gear Lever */}
      <PlaybackController
        isPlaying={isPlaying}
        onPlayToggle={() => {
          if (stepIdx >= allSteps.current.length - 1) handleReset();
          setIsPlaying(!isPlaying);
        }}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onFastForward={handleFastForward}
        onReset={handleReset}
        canStepBackward={stepIdx > 0}
        canStepForward={stepIdx < allSteps.current.length - 1}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      {/* Debugger Variable Inspector */}
      <VariableWatcher
        variables={watcherVars}
        callStack={currentState.callStack}
        stepIndex={stepIdx + 1}
        totalSteps={allSteps.current.length}
      />
    </div>
  );
};
