import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export const TwoPointersVisualizer: React.FC = () => {
  // Sorted array for Two Sum II
  const sortedArray = [1, 3, 4, 6, 8, 9, 11, 15];
  const target = 14; // 3 + 11 or 6 + 8

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(sortedArray.length - 1);
  const [isFound, setIsFound] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [message, setMessage] = useState(`Two Pointers on sorted array for Target=${target}. L=0, R=${sortedArray.length - 1}.`);

  const stepForward = (curL: number, curR: number) => {
    if (curL >= curR) {
      setIsPlaying(false);
      setMessage(`Pointers met without finding target sum ${target}.`);
      return;
    }

    const sum = sortedArray[curL] + sortedArray[curR];

    if (sum === target) {
      setIsFound(true);
      setIsPlaying(false);
      setMessage(`Match Found! arr[${curL}] (${sortedArray[curL]}) + arr[${curR}] (${sortedArray[curR]}) == ${target}!`);
      return;
    }

    if (sum < target) {
      const nextL = curL + 1;
      setLeft(nextL);
      setMessage(`Sum ${sum} < ${target} -> Increment Left pointer (L = ${nextL}) to increase sum.`);
    } else {
      const nextR = curR - 1;
      setRight(nextR);
      setMessage(`Sum ${sum} > ${target} -> Decrement Right pointer (R = ${nextR}) to decrease sum.`);
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (isFound || left >= right) {
        handleReset();
      }
      setIsPlaying(true);
      runLoop(left, right);
    }
  };

  const runLoop = async (initL: number, initR: number) => {
    let l = initL;
    let r = initR;
    while (l < r) {
      const sum = sortedArray[l] + sortedArray[r];
      if (sum === target) {
        setIsFound(true);
        setIsPlaying(false);
        setMessage(`Match Found! [${sortedArray[l]}] + [${sortedArray[r]}] == ${target}!`);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 850));
      if (sum < target) {
        l++;
        setLeft(l);
      } else {
        r--;
        setRight(r);
      }
    }
    setIsPlaying(false);
  };

  const handleReset = () => {
    setLeft(0);
    setRight(sortedArray.length - 1);
    setIsFound(false);
    setIsPlaying(false);
    setMessage(`Two Pointers reset for target sum ${target}.`);
  };

  const currentSum = sortedArray[left] + sortedArray[right];

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
          <span className="cyber-badge badge-green">Pointer L: arr[{left}] = {sortedArray[left]}</span>
          <span className="cyber-badge badge-magenta">Pointer R: arr[{right}] = {sortedArray[right]}</span>
          <span className="cyber-badge badge-yellow">Target: {target}</span>
          <span className={`cyber-badge ${isFound ? 'badge-green' : 'badge-cyan'}`}>
            Current Sum: {currentSum} {isFound ? '(MATCH!)' : ''}
          </span>
        </div>

        {/* Sorted Array Grid */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {sortedArray.map((val, idx) => {
            const isL = idx === left;
            const isR = idx === right;
            const isMatch = isFound && (isL || isR);

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
          <span>{isPlaying ? 'Pause' : 'Play Convergence'}</span>
        </button>

        <button
          onClick={() => stepForward(left, right)}
          disabled={isPlaying || isFound || left >= right}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <SkipForward size={14} /> Next Step
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
