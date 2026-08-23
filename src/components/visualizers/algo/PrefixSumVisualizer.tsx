import React, { useState } from 'react';
import { RotateCcw, Search } from 'lucide-react';

export const PrefixSumVisualizer: React.FC = () => {
  const originalArray = [3, 1, 4, 1, 5, 9, 2, 6];
  // Prefix sum: P[0] = 0, P[1] = 3, P[2] = 4, P[3] = 8, P[4] = 9, P[5] = 14, P[6] = 23, P[7] = 25, P[8] = 31
  const prefixArray = [0, 3, 4, 8, 9, 14, 23, 25, 31];

  const [queryL, setQueryL] = useState<number>(2);
  const [queryR, setQueryR] = useState<number>(5);
  const [message, setMessage] = useState('Prefix Sum. Answers range sum queries sum(L..R) in O(1) time using P[R+1] - P[L].');

  const handleQuery = () => {
    if (queryL < 0 || queryR >= originalArray.length || queryL > queryR) {
      setMessage('Invalid query range. Ensure 0 <= L <= R < N.');
      return;
    }

    // Formula: sum(L..R) = prefix[R+1] - prefix[L]
    const pR = prefixArray[queryR + 1];
    const pL = prefixArray[queryL];
    const sum = pR - pL;
    setMessage(`Instant query O(1): sum(arr[${queryL}..${queryR}]) = Prefix[${queryR + 1}] (${pR}) - Prefix[${queryL}] (${pL}) = ${sum}!`);
  };

  const handleReset = () => {
    setQueryL(2);
    setQueryR(5);
    setMessage('Prefix Sum reset.');
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
        {/* Original Array */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
            Original Array nums[i]:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {originalArray.map((val, idx) => {
              const inRange = idx >= queryL && idx <= queryR;
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: inRange ? 'var(--neon-magenta)' : 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    [{idx}]
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '6px',
                      backgroundColor: inRange ? 'rgba(255, 0, 127, 0.25)' : 'rgba(16, 28, 54, 0.7)',
                      border: `1px solid ${inRange ? 'var(--neon-magenta)' : 'rgba(0, 245, 255, 0.25)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: inRange ? '#fff' : '#c9d8f0',
                      boxShadow: inRange ? '0 0 10px rgba(255, 0, 127, 0.4)' : 'none'
                    }}
                  >
                    {val}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prefix Sum Array */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
            Prefix Sum Array Prefix[i] = Prefix[i-1] + nums[i-1]:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {prefixArray.map((val, idx) => {
              const isPL = idx === queryL;
              const isPR = idx === queryR + 1;

              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: isPR ? 'var(--neon-green)' : isPL ? 'var(--neon-yellow)' : 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {isPR ? `P[${idx}](R+1)` : isPL ? `P[${idx}](L)` : `P[${idx}]`}
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '6px',
                      backgroundColor: isPR
                        ? 'rgba(57, 255, 20, 0.25)'
                        : isPL
                        ? 'rgba(255, 214, 10, 0.25)'
                        : 'rgba(0, 245, 255, 0.08)',
                      border: `1px solid ${
                        isPR ? 'var(--neon-green)' : isPL ? 'var(--neon-yellow)' : 'rgba(0, 245, 255, 0.3)'
                      }`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: isPR ? '#39ff14' : isPL ? '#ffd60a' : 'var(--neon-cyan)',
                      boxShadow: isPR ? '0 0 12px rgba(57, 255, 20, 0.5)' : isPL ? '0 0 12px rgba(255, 214, 10, 0.5)' : 'none'
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
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(13, 21, 39, 0.6)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Range:</span>
          <input
            type="number"
            value={queryL}
            onChange={(e) => setQueryL(parseInt(e.target.value) || 0)}
            placeholder="L"
            min="0"
            max={originalArray.length - 1}
            style={{
              width: '50px',
              padding: '6px 8px',
              background: '#080c14',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#fff',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          />
          <span style={{ color: 'var(--text-dim)' }}>to</span>
          <input
            type="number"
            value={queryR}
            onChange={(e) => setQueryR(parseInt(e.target.value) || 0)}
            placeholder="R"
            min="0"
            max={originalArray.length - 1}
            style={{
              width: '50px',
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
            onClick={handleQuery}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            <Search size={14} /> Query Sum O(1)
          </button>
        </div>

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
