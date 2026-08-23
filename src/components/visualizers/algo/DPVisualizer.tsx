import React, { useState, useRef, useEffect } from 'react';
import { PlaybackController, type SimulationSpeed } from '../../common/PlaybackController';
import { VariableWatcher, type WatcherVariable } from '../../common/VariableWatcher';

interface DPState {
  currentAmount: number;
  dpTable: (number | string)[];
  message: string;
}

export const DPVisualizer: React.FC = () => {
  const coins = [1, 2, 5];
  const targetAmount = 7;

  const initialState: DPState = {
    currentAmount: 0,
    dpTable: [0, '∞', '∞', '∞', '∞', '∞', '∞', '∞'],
    message: 'Dynamic Programming (1D Tabulation - Coin Change). Computes minimum coins for each amount i from 0 to 7.'
  };

  const [history, setHistory] = useState<DPState[]>([initialState]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulationSpeed>(1);

  const currentState = history[historyIdx] || initialState;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepForward = () => {
    if (currentState.currentAmount >= targetAmount) {
      setIsPlaying(false);
      return;
    }

    const nextAmt = currentState.currentAmount + 1;
    const currentTable = [...currentState.dpTable];
    let minCoins = Infinity;
    let chosenCoin = null;

    for (const c of coins) {
      if (nextAmt - c >= 0) {
        const prevVal = currentTable[nextAmt - c];
        if (typeof prevVal === 'number') {
          const cand = prevVal + 1;
          if (cand < minCoins) {
            minCoins = cand;
            chosenCoin = c;
          }
        }
      }
    }

    currentTable[nextAmt] = minCoins === Infinity ? '∞' : minCoins;

    const nextState: DPState = {
      currentAmount: nextAmt,
      dpTable: currentTable,
      message: `Computing dp[${nextAmt}]: min(dp[${nextAmt} - c] + 1) using coin ${chosenCoin} -> dp[${nextAmt}] = ${minCoins}.`
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
    let curAmt = currentState.currentAmount;
    let curTable = [...currentState.dpTable];
    const fullHist = [...history.slice(0, historyIdx + 1)];

    while (curAmt < targetAmount) {
      curAmt++;
      let minCoins = Infinity;
      for (const c of coins) {
        if (curAmt - c >= 0) {
          const prevVal = curTable[curAmt - c];
          if (typeof prevVal === 'number') {
            minCoins = Math.min(minCoins, prevVal + 1);
          }
        }
      }
      curTable[curAmt] = minCoins === Infinity ? '∞' : minCoins;
      fullHist.push({
        currentAmount: curAmt,
        dpTable: [...curTable],
        message: `Fast-Forward: dp[${curAmt}] calculated as ${curTable[curAmt]}`
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
      if (currentState.currentAmount >= targetAmount) {
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

  // Variables for Debugger Inspector
  const watcherVars: WatcherVariable[] = [
    { name: 'currentAmount (i)', value: currentState.currentAmount, type: 'number', scope: 'Tabulation Index', isModified: true },
    { name: 'targetAmount', value: targetAmount, type: 'number', scope: 'Constant' },
    { name: 'dp[currentAmount]', value: currentState.dpTable[currentState.currentAmount], type: 'number', scope: 'Memo/State', isModified: true },
    { name: 'coins (Denominations)', value: coins, type: 'array', scope: 'Input' },
    { name: 'fullDpTable', value: currentState.dpTable, type: 'array', scope: 'DP Cache' }
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
        {/* Recurrence Banner */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="cyber-badge badge-yellow">Coins: [1, 2, 5]</span>
          <span className="cyber-badge badge-magenta">Target Amount: {targetAmount}</span>
          <span className="cyber-badge badge-cyan">Formula: dp[i] = min(dp[i - c] + 1)</span>
        </div>

        {/* DP Array */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {currentState.dpTable.map((val, idx) => {
            const isCurrent = idx === currentState.currentAmount;
            const isDone = typeof val === 'number';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: isCurrent ? 'var(--neon-magenta)' : 'var(--text-dim)',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}
                >
                  amt={idx}
                </span>

                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '8px',
                    backgroundColor: isCurrent
                      ? 'rgba(255, 0, 127, 0.3)'
                      : isDone
                      ? 'rgba(0, 245, 255, 0.15)'
                      : 'rgba(16, 28, 54, 0.6)',
                    border: `2px solid ${
                      isCurrent
                        ? 'var(--neon-magenta)'
                        : isDone
                        ? 'var(--neon-cyan)'
                        : 'rgba(255, 255, 255, 0.1)'
                    }`,
                    boxShadow: isCurrent ? '0 0 16px rgba(255, 0, 127, 0.6)' : isDone ? '0 0 8px rgba(0, 245, 255, 0.2)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: isCurrent ? '#fff' : isDone ? 'var(--neon-cyan)' : 'var(--text-dim)',
                    transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{val}</span>
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  dp[{idx}]
                </span>
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
          if (currentState.currentAmount >= targetAmount) handleReset();
          setIsPlaying(!isPlaying);
        }}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onFastForward={handleFastForward}
        onReset={handleReset}
        canStepBackward={historyIdx > 0}
        canStepForward={currentState.currentAmount < targetAmount}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      {/* Debugger Variable Inspector */}
      <VariableWatcher
        variables={watcherVars}
        stepIndex={historyIdx + 1}
        totalSteps={targetAmount + 1}
      />
    </div>
  );
};
