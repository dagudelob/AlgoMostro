import React, { useState, useRef, useEffect } from 'react';
import { PlaybackController, type SimulationSpeed } from '../../common/PlaybackController';
import { VariableWatcher, type WatcherVariable } from '../../common/VariableWatcher';

interface TwoPointersState {
  left: number;
  right: number;
  isFound: boolean;
  message: string;
}

export const TwoPointersVisualizer: React.FC = () => {
  const sortedArray = [1, 3, 4, 6, 8, 9, 11, 15];
  const [target, setTarget] = useState<number>(14);

  const initialState: TwoPointersState = {
    left: 0,
    right: sortedArray.length - 1,
    isFound: false,
    message: `Two Pointers on sorted array for Target=${target}. L=0, R=${sortedArray.length - 1}.`
  };

  const [history, setHistory] = useState<TwoPointersState[]>([initialState]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulationSpeed>(1);

  const currentState = history[historyIdx] || initialState;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepForward = () => {
    if (currentState.left >= currentState.right || currentState.isFound) {
      setIsPlaying(false);
      return;
    }

    const curL = currentState.left;
    const curR = currentState.right;
    const sum = sortedArray[curL] + sortedArray[curR];

    if (sum === target) {
      const nextState: TwoPointersState = {
        left: curL,
        right: curR,
        isFound: true,
        message: `Match Found! arr[${curL}] (${sortedArray[curL]}) + arr[${curR}] (${sortedArray[curR]}) == ${target}!`
      };
      const newHist = [...history.slice(0, historyIdx + 1), nextState];
      setHistory(newHist);
      setHistoryIdx(newHist.length - 1);
      setIsPlaying(false);
      return;
    }

    let nextL = curL;
    let nextR = curR;
    let msg = '';

    if (sum < target) {
      nextL = curL + 1;
      msg = `Sum ${sum} < ${target} -> Increment Left pointer (L = ${nextL}) to increase sum.`;
    } else {
      nextR = curR - 1;
      msg = `Sum ${sum} > ${target} -> Decrement Right pointer (R = ${nextR}) to decrease sum.`;
    }

    const nextState: TwoPointersState = {
      left: nextL,
      right: nextR,
      isFound: false,
      message: msg
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
    let curL = currentState.left;
    let curR = currentState.right;
    const fullHist = [...history.slice(0, historyIdx + 1)];

    while (curL < curR) {
      const sum = sortedArray[curL] + sortedArray[curR];
      if (sum === target) {
        fullHist.push({
          left: curL,
          right: curR,
          isFound: true,
          message: `Fast-Forward: Target match found [${sortedArray[curL]} + ${sortedArray[curR]} = ${target}]!`
        });
        break;
      }
      if (sum < target) {
        curL++;
      } else {
        curR--;
      }
      fullHist.push({
        left: curL,
        right: curR,
        isFound: false,
        message: `Fast-Forward: Checking pointers [L=${curL}, R=${curR}]`
      });
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
      if (currentState.left >= currentState.right || currentState.isFound) {
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
  }, [isPlaying, historyIdx, speed, target]);

  const currentSum = sortedArray[currentState.left] + sortedArray[currentState.right];

  // Debugger variables
  const watcherVars: WatcherVariable[] = [
    { name: 'left (Index)', value: currentState.left, type: 'pointer', scope: 'Pointers', isModified: true },
    { name: 'right (Index)', value: currentState.right, type: 'pointer', scope: 'Pointers', isModified: true },
    { name: 'nums[left]', value: sortedArray[currentState.left], type: 'number', scope: 'Array Access' },
    { name: 'nums[right]', value: sortedArray[currentState.right], type: 'number', scope: 'Array Access' },
    { name: 'currentSum', value: currentSum, type: 'number', scope: 'Arithmetic', isModified: true },
    { name: 'target', value: target, type: 'number', scope: 'Input' },
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
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Status Badges */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="cyber-badge badge-green">L: arr[{currentState.left}] = {sortedArray[currentState.left]}</span>
          <span className="cyber-badge badge-magenta">R: arr[{currentState.right}] = {sortedArray[currentState.right]}</span>
          <span className="cyber-badge badge-yellow">Target: {target}</span>
          <span className={`cyber-badge ${currentState.isFound ? 'badge-green' : 'badge-cyan'}`}>
            Current Sum = {currentSum} {currentState.isFound ? '(MATCH FOUND!)' : ''}
          </span>
        </div>

        {/* Sorted Array Grid */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {sortedArray.map((val, idx) => {
            const isL = idx === currentState.left;
            const isR = idx === currentState.right;
            const isMatch = currentState.isFound && (isL || isR);

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: isMatch ? '#39ff14' : isL ? 'var(--neon-green)' : isR ? 'var(--neon-magenta)' : 'var(--text-dim)',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}
                >
                  {isMatch ? 'MATCH' : isL ? 'LEFT ->' : isR ? '<- RIGHT' : `[${idx}]`}
                </span>

                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    backgroundColor: isMatch
                      ? 'rgba(57, 255, 20, 0.4)'
                      : isL
                      ? 'rgba(0, 245, 255, 0.3)'
                      : isR
                      ? 'rgba(255, 0, 127, 0.3)'
                      : 'rgba(16, 28, 54, 0.7)',
                    border: `2px solid ${
                      isMatch
                        ? 'var(--neon-green)'
                        : isL
                        ? 'var(--neon-cyan)'
                        : isR
                        ? 'var(--neon-magenta)'
                        : 'rgba(255, 255, 255, 0.08)'
                    }`,
                    boxShadow: isMatch
                      ? '0 0 20px rgba(57, 255, 20, 0.8)'
                      : isL
                      ? '0 0 12px var(--neon-cyan)'
                      : isR
                      ? '0 0 12px var(--neon-magenta)'
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: isMatch ? '#39ff14' : isL || isR ? '#fff' : '#c9d8f0',
                    transform: isL || isR ? 'scale(1.1)' : 'scale(1)',
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

      {/* Playback Controls with 5-Speed Gear Lever & Target Input */}
      <PlaybackController
        isPlaying={isPlaying}
        onPlayToggle={() => {
          if (currentState.isFound || currentState.left >= currentState.right) handleReset();
          setIsPlaying(!isPlaying);
        }}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onFastForward={handleFastForward}
        onReset={handleReset}
        canStepBackward={historyIdx > 0}
        canStepForward={!currentState.isFound && currentState.left < currentState.right}
        speed={speed}
        onSpeedChange={setSpeed}
        customControls={
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Target:</span>
            <input
              type="number"
              value={target}
              onChange={(e) => {
                setTarget(parseInt(e.target.value) || 0);
                handleReset();
              }}
              style={{
                width: '54px',
                padding: '4px 6px',
                background: '#080c14',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                color: '#fff',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem'
              }}
            />
          </div>
        }
      />

      {/* Debugger Variable Inspector */}
      <VariableWatcher
        variables={watcherVars}
        stepIndex={historyIdx + 1}
        totalSteps={sortedArray.length}
      />
    </div>
  );
};
