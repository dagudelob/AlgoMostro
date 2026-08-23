import React, { useState, useRef, useEffect } from 'react';
import { PlaybackController, type SimulationSpeed } from '../../common/PlaybackController';
import { VariableWatcher, type WatcherVariable } from '../../common/VariableWatcher';

interface BSState {
  left: number;
  right: number;
  mid: number | null;
  foundIdx: number | null;
  stepCount: number;
  message: string;
}

export const BinarySearchVisualizer: React.FC = () => {
  const array = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];
  const [target, setTarget] = useState<number>(23);

  const initialMid = Math.floor((0 + array.length - 1) / 2);
  const initialState: BSState = {
    left: 0,
    right: array.length - 1,
    mid: initialMid,
    foundIdx: null,
    stepCount: 1,
    message: `Binary Search O(log N) for target=${target}. L=0, R=${array.length - 1}, MID=${initialMid}.`
  };

  const [history, setHistory] = useState<BSState[]>([initialState]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulationSpeed>(1);

  const currentState = history[historyIdx] || initialState;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepForward = () => {
    if (currentState.left > currentState.right || currentState.foundIdx !== null) {
      setIsPlaying(false);
      return;
    }

    const curL = currentState.left;
    const curR = currentState.right;
    const curMid = curL + Math.floor((curR - curL) / 2);
    const count = currentState.stepCount;

    if (array[curMid] === target) {
      const nextState: BSState = {
        left: curL,
        right: curR,
        mid: curMid,
        foundIdx: curMid,
        stepCount: count,
        message: `Found! array[${curMid}] == ${target} in ${count} logarithmic steps O(log N).`
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

    if (array[curMid] < target) {
      nextL = curMid + 1;
      msg = `array[${curMid}] (${array[curMid]}) < ${target} -> Discard left half. New Left = ${nextL}.`;
    } else {
      nextR = curMid - 1;
      msg = `array[${curMid}] (${array[curMid]}) > ${target} -> Discard right half. New Right = ${nextR}.`;
    }

    const nextMid = nextL <= nextR ? nextL + Math.floor((nextR - nextL) / 2) : null;
    const nextState: BSState = {
      left: nextL,
      right: nextR,
      mid: nextMid,
      foundIdx: null,
      stepCount: count + 1,
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
    let cnt = currentState.stepCount;
    const fullHist = [...history.slice(0, historyIdx + 1)];

    while (curL <= curR) {
      const m = curL + Math.floor((curR - curL) / 2);
      if (array[m] === target) {
        fullHist.push({
          left: curL,
          right: curR,
          mid: m,
          foundIdx: m,
          stepCount: cnt,
          message: `Fast-Forward: Element found at array[${m}] = ${target}!`
        });
        break;
      }
      if (array[m] < target) {
        curL = m + 1;
      } else {
        curR = m - 1;
      }
      cnt++;
      const nextM = curL <= curR ? curL + Math.floor((curR - curL) / 2) : null;
      fullHist.push({
        left: curL,
        right: curR,
        mid: nextM,
        foundIdx: null,
        stepCount: cnt,
        message: `Fast-Forward: Halving search space to [${curL}..${curR}]`
      });
    }

    setHistory(fullHist);
    setHistoryIdx(fullHist.length - 1);
    setIsPlaying(false);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const resetMid = Math.floor((0 + array.length - 1) / 2);
    setHistory([{
      left: 0,
      right: array.length - 1,
      mid: resetMid,
      foundIdx: null,
      stepCount: 1,
      message: `Binary Search reset for target=${target}.`
    }]);
    setHistoryIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      if (currentState.left > currentState.right || currentState.foundIdx !== null) {
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

  // Variables for Debugger Inspector
  const searchSpaceRemaining = Math.max(0, currentState.right - currentState.left + 1);
  const watcherVars: WatcherVariable[] = [
    { name: 'left (Pointer)', value: currentState.left, type: 'pointer', scope: 'Bounds', isModified: true },
    { name: 'mid (Pointer)', value: currentState.mid !== null ? currentState.mid : 'null', type: 'pointer', scope: 'Bisect', isModified: true },
    { name: 'right (Pointer)', value: currentState.right, type: 'pointer', scope: 'Bounds', isModified: true },
    { name: 'arr[mid]', value: currentState.mid !== null ? array[currentState.mid] : 'N/A', type: 'number', scope: 'Value' },
    { name: 'target', value: target, type: 'number', scope: 'Query' },
    { name: 'remainingElements', value: searchSpaceRemaining, type: 'number', scope: 'Complexity Metric' },
    { name: 'foundIdx', value: currentState.foundIdx !== null ? currentState.foundIdx : 'null', type: 'pointer', scope: 'Result' }
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
        {/* Pointers Banner */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="cyber-badge badge-green">L = {currentState.left}</span>
          <span className="cyber-badge badge-magenta">MID = {currentState.mid !== null ? currentState.mid : '-'} ({currentState.mid !== null ? array[currentState.mid] : '-'})</span>
          <span className="cyber-badge badge-yellow">R = {currentState.right}</span>
          <span className="cyber-badge badge-cyan">Step {currentState.stepCount} of ~{Math.ceil(Math.log2(array.length))} max</span>
        </div>

        {/* Array Grid */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {array.map((val, idx) => {
            const isL = idx === currentState.left;
            const isR = idx === currentState.right;
            const isM = idx === currentState.mid;
            const isFound = currentState.foundIdx === idx;
            const isEliminated = idx < currentState.left || idx > currentState.right;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: isEliminated ? 0.3 : 1,
                  transition: 'all 0.25s'
                }}
              >
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: isFound ? '#39ff14' : isM ? 'var(--neon-magenta)' : isL ? 'var(--neon-green)' : isR ? 'var(--neon-yellow)' : 'var(--text-dim)',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}
                >
                  {isFound ? 'FOUND!' : isM ? 'MID' : isL ? 'L' : isR ? 'R' : `[${idx}]`}
                </span>

                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '8px',
                    backgroundColor: isFound
                      ? 'rgba(57, 255, 20, 0.4)'
                      : isM
                      ? 'rgba(255, 0, 127, 0.35)'
                      : !isEliminated
                      ? 'rgba(0, 245, 255, 0.15)'
                      : 'rgba(16, 28, 54, 0.4)',
                    border: `2px solid ${
                      isFound
                        ? 'var(--neon-green)'
                        : isM
                        ? 'var(--neon-magenta)'
                        : !isEliminated
                        ? 'rgba(0, 245, 255, 0.3)'
                        : 'rgba(255, 255, 255, 0.05)'
                    }`,
                    boxShadow: isFound
                      ? '0 0 20px rgba(57, 255, 20, 0.8)'
                      : isM
                      ? '0 0 14px rgba(255, 0, 127, 0.6)'
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: isFound ? '#39ff14' : isM ? '#fff' : '#c9d8f0',
                    transform: isM || isFound ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.25s'
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
          if (currentState.foundIdx !== null || currentState.left > currentState.right) handleReset();
          setIsPlaying(!isPlaying);
        }}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onFastForward={handleFastForward}
        onReset={handleReset}
        canStepBackward={historyIdx > 0}
        canStepForward={currentState.foundIdx === null && currentState.left <= currentState.right}
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
        totalSteps={Math.ceil(Math.log2(array.length))}
      />
    </div>
  );
};
