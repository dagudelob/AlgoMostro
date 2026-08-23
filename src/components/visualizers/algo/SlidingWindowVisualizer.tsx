import React, { useState, useRef, useEffect } from 'react';
import { PlaybackController, type SimulationSpeed } from '../../common/PlaybackController';
import { VariableWatcher, type WatcherVariable } from '../../common/VariableWatcher';

interface WindowState {
  left: number;
  right: number;
  currentSum: number;
  maxSum: number;
  bestWindow: [number, number];
  message: string;
}

export const SlidingWindowVisualizer: React.FC = () => {
  const array = [2, 1, 5, 2, 8, 1, 4, 3];
  const windowK = 3;

  const initialSum = array.slice(0, windowK).reduce((a, b) => a + b, 0);

  const initialState: WindowState = {
    left: 0,
    right: windowK - 1,
    currentSum: initialSum,
    maxSum: initialSum,
    bestWindow: [0, windowK - 1],
    message: `Sliding Window of fixed size K=${windowK}. Calculating maximum subarray sum in O(N).`
  };

  const [history, setHistory] = useState<WindowState[]>([initialState]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulationSpeed>(1);

  const currentState = history[historyIdx] || initialState;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepForward = () => {
    if (currentState.right >= array.length - 1) {
      setIsPlaying(false);
      return;
    }

    const nextL = currentState.left + 1;
    const nextR = currentState.right + 1;
    const nextSum = currentState.currentSum - array[currentState.left] + array[nextR];
    const isNewMax = nextSum > currentState.maxSum;
    const nextMax = isNewMax ? nextSum : currentState.maxSum;
    const nextBest: [number, number] = isNewMax ? [nextL, nextR] : currentState.bestWindow;

    const nextState: WindowState = {
      left: nextL,
      right: nextR,
      currentSum: nextSum,
      maxSum: nextMax,
      bestWindow: nextBest,
      message: `Slide: -arr[${currentState.left}] (${array[currentState.left]}), +arr[${nextR}] (${array[nextR]}) -> Current Sum = ${nextSum}. ${
        isNewMax ? `New Max Record (${nextSum})!` : ''
      }`
    };

    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(nextState);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  };

  const stepBackward = () => {
    if (historyIdx > 0) {
      setIsPlaying(false);
      setHistoryIdx(historyIdx - 1);
    }
  };

  const handleFastForward = () => {
    let cur = { ...currentState };
    const fullHistory = [...history.slice(0, historyIdx + 1)];

    while (cur.right < array.length - 1) {
      const nextL = cur.left + 1;
      const nextR = cur.right + 1;
      const nextSum = cur.currentSum - array[cur.left] + array[nextR];
      const isNewMax = nextSum > cur.maxSum;
      const nextMax = isNewMax ? nextSum : cur.maxSum;
      const nextBest: [number, number] = isNewMax ? [nextL, nextR] : cur.bestWindow;

      cur = {
        left: nextL,
        right: nextR,
        currentSum: nextSum,
        maxSum: nextMax,
        bestWindow: nextBest,
        message: `Fast-Forward -> Final max sum ${nextMax} on window [${nextBest[0]}..${nextBest[1]}].`
      };
      fullHistory.push(cur);
    }

    setHistory(fullHistory);
    setHistoryIdx(fullHistory.length - 1);
    setIsPlaying(false);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHistory([initialState]);
    setHistoryIdx(0);
    setIsPlaying(false);
  };

  // Play loop driven by speed
  useEffect(() => {
    if (isPlaying) {
      if (currentState.right >= array.length - 1) {
        setIsPlaying(false);
        return;
      }
      const delay = Math.round(900 / speed);
      timerRef.current = setTimeout(() => {
        stepForward();
      }, delay);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, historyIdx, speed]);

  // Variables for Debugger Watcher
  const watcherVars: WatcherVariable[] = [
    { name: 'L (Left Pointer)', value: currentState.left, type: 'pointer', scope: 'Window', isModified: true },
    { name: 'R (Right Pointer)', value: currentState.right, type: 'pointer', scope: 'Window', isModified: true },
    { name: 'windowK', value: windowK, type: 'number', scope: 'Constant' },
    { name: 'currentSum', value: currentState.currentSum, type: 'number', scope: 'Accumulator', isModified: true },
    { name: 'maxSum (Global)', value: currentState.maxSum, type: 'number', scope: 'State' },
    { name: 'bestWindow [L, R]', value: `[${currentState.bestWindow[0]}, ${currentState.bestWindow[1]}]`, type: 'array', scope: 'Result' },
    { name: 'activeElements', value: array.slice(currentState.left, currentState.right + 1), type: 'array', scope: 'Window' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Canvas */}
      <div
        style={{
          background: '#070c18',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Status Indicators */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="cyber-badge badge-cyan">Window Size K = {windowK}</span>
          <span className="cyber-badge badge-yellow">Current Sum = {currentState.currentSum}</span>
          <span className="cyber-badge badge-green">Max Sum Record = {currentState.maxSum}</span>
          <span className="cyber-badge badge-magenta">Active Pointers: [L={currentState.left}, R={currentState.right}]</span>
        </div>

        {/* Array Grid with Sliding Frame */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
          {array.map((val, idx) => {
            const inWindow = idx >= currentState.left && idx <= currentState.right;
            const isL = idx === currentState.left;
            const isR = idx === currentState.right;

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: isL ? 'var(--neon-green)' : isR ? 'var(--neon-magenta)' : 'var(--text-dim)',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}
                >
                  {isL && isR ? 'L=R' : isL ? 'L' : isR ? 'R' : `[${idx}]`}
                </span>

                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    backgroundColor: inWindow ? 'rgba(0, 245, 255, 0.2)' : 'rgba(16, 28, 54, 0.6)',
                    border: `2px solid ${
                      isL || isR
                        ? 'var(--neon-magenta)'
                        : inWindow
                        ? 'var(--neon-cyan)'
                        : 'rgba(255, 255, 255, 0.08)'
                    }`,
                    boxShadow: inWindow ? '0 0 12px rgba(0, 245, 255, 0.4)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: inWindow ? '#fff' : 'var(--text-dim)',
                    transform: inWindow ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.2s'
                  }}
                >
                  {val}
                </div>
              </div>
            );
          })}
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
          if (currentState.right >= array.length - 1) handleReset();
          setIsPlaying(!isPlaying);
        }}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onFastForward={handleFastForward}
        onReset={handleReset}
        canStepBackward={historyIdx > 0}
        canStepForward={currentState.right < array.length - 1}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      {/* Debugger Variable Inspector */}
      <VariableWatcher
        variables={watcherVars}
        stepIndex={historyIdx + 1}
        totalSteps={array.length - windowK + 1}
      />
    </div>
  );
};
