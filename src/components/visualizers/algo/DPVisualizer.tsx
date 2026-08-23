import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export const DPVisualizer: React.FC = () => {
  const coins = [1, 2, 5];
  const targetAmount = 7;

  // dp table from 0 to 7
  const [dpTable, setDpTable] = useState<(number | string)[]>([0, '∞', '∞', '∞', '∞', '∞', '∞', '∞']);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('Dynamic Programming (1D Tabulation - Coin Change). Computes minimum coins for each amount i from 0 to 7.');

  const stepForward = (currAmt: number) => {
    if (currAmt >= targetAmount) {
      setIsPlaying(false);
      setMessage(`DP complete! For amount ${targetAmount}, minimum coins required is dp[${targetAmount}] = ${dpTable[targetAmount]}.`);
      return;
    }

    const nextAmt = currAmt + 1;
    const currentTable = [...dpTable];
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
    setDpTable(currentTable);
    setCurrentAmount(nextAmt);
    setMessage(`Computing dp[${nextAmt}]: min(dp[${nextAmt} - c] + 1) using coin ${chosenCoin} -> dp[${nextAmt}] = ${minCoins}.`);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentAmount >= targetAmount) {
        handleReset();
      }
      setIsPlaying(true);
      runLoop(currentAmount);
    }
  };

  const runLoop = async (startAmt: number) => {
    let a = startAmt;
    while (a < targetAmount) {
      await new Promise((r) => setTimeout(r, 850));
      a++;
      stepForward(a - 1);
    }
    setIsPlaying(false);
  };

  const handleReset = () => {
    setDpTable([0, '∞', '∞', '∞', '∞', '∞', '∞', '∞']);
    setCurrentAmount(0);
    setIsPlaying(false);
    setMessage('DP table reset to base case dp[0] = 0.');
  };

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
          <span className="cyber-badge badge-yellow">Available Coins: [1, 2, 5]</span>
          <span className="cyber-badge badge-magenta">Target Amount: {targetAmount}</span>
          <span className="cyber-badge badge-cyan">Formula: dp[i] = min(dp[i - c] + 1)</span>
        </div>

        {/* DP Array */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {dpTable.map((val, idx) => {
            const isCurrent = idx === currentAmount;
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
                    transition: 'all 0.25s'
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
          &gt; {message}
        </div>
      </div>

      {/* Control Player */}
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
          onClick={handlePlayToggle}
          className="cyber-btn"
          style={{ padding: '7px 16px', fontSize: '0.8rem' }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'Pause' : 'Play DP Tabulation'}</span>
        </button>

        <button
          onClick={() => stepForward(currentAmount)}
          disabled={isPlaying || currentAmount >= targetAmount}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <SkipForward size={14} /> Next Cell ({currentAmount}/{targetAmount})
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
