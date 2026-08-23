import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export const SlidingWindowVisualizer: React.FC = () => {
  const array = [2, 1, 5, 2, 8, 1, 4, 3];
  const windowK = 3;

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(2);
  const [currentSum, setCurrentSum] = useState<number>(8); // 2 + 1 + 5
  const [maxSum, setMaxSum] = useState<number>(8);
  const [bestWindow, setBestWindow] = useState<[number, number]>([0, 2]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [message, setMessage] = useState('Sliding Window of fixed size K=3. Calculate maximum subarray sum in O(N).');

  const stepForward = (curL: number, curR: number, curSum: number, curMax: number, curBest: [number, number]) => {
    if (curR >= array.length - 1) {
      setIsPlaying(false);
      setMessage(`Window reached the end! Global maximum sum = ${curMax} on window [${curBest[0]}..${curBest[1]}].`);
      return;
    }

    const nextL = curL + 1;
    const nextR = curR + 1;
    // Window shift formula: NextSum = CurSum - array[prevL] + array[nextR]
    const nextSum = curSum - array[curL] + array[nextR];
    const isNewMax = nextSum > curMax;
    const nextMax = isNewMax ? nextSum : curMax;
    const nextBest: [number, number] = isNewMax ? [nextL, nextR] : curBest;

    setLeft(nextL);
    setRight(nextR);
    setCurrentSum(nextSum);
    setMaxSum(nextMax);
    setBestWindow(nextBest);

    setMessage(
      `Slide window: subtract array[${curL}] (${array[curL]}), add array[${nextR}] (${array[nextR]}) -> Current Sum = ${nextSum}. ${
        isNewMax ? `New Maximum Record (${nextSum})!` : ''
      }`
    );
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (right >= array.length - 1) {
        handleReset();
      }
      setIsPlaying(true);
      runLoop(left, right, currentSum, maxSum, bestWindow);
    }
  };

  const runLoop = async (initL: number, initR: number, initSum: number, initMax: number, initBest: [number, number]) => {
    let l = initL;
    let r = initR;
    let sum = initSum;
    let mx = initMax;
    let best = initBest;

    while (r < array.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const nextL = l + 1;
      const nextR = r + 1;
      const nextSum = sum - array[l] + array[nextR];
      const isNewMax = nextSum > mx;
      mx = isNewMax ? nextSum : mx;
      best = isNewMax ? [nextL, nextR] : best;
      l = nextL;
      r = nextR;
      sum = nextSum;

      setLeft(l);
      setRight(r);
      setCurrentSum(sum);
      setMaxSum(mx);
      setBestWindow(best);
      setMessage(
        `Sliding: -${array[l - 1]} +${array[r]} -> Sum = ${sum} (Max = ${mx})`
      );
    }
    setIsPlaying(false);
    setMessage(`Complete! Maximum sum = ${mx} on range [${best[0]}..${best[1]}].`);
  };

  const handleReset = () => {
    setLeft(0);
    setRight(windowK - 1);
    const initialSum = array.slice(0, windowK).reduce((a, b) => a + b, 0);
    setCurrentSum(initialSum);
    setMaxSum(initialSum);
    setBestWindow([0, windowK - 1]);
    setIsPlaying(false);
    setMessage('Sliding Window reset.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Visual Canvas */}
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
        {/* Stats Indicators */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="cyber-badge badge-cyan">Window Size K: {windowK}</span>
          <span className="cyber-badge badge-yellow">Current Sum: {currentSum}</span>
          <span className="cyber-badge badge-green">Max Sum Record: {maxSum}</span>
          <span className="cyber-badge badge-magenta">Active Pointers: [L={left}, R={right}]</span>
        </div>

        {/* Array Grid with Sliding Frame */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
          {array.map((val, idx) => {
            const inWindow = idx >= left && idx <= right;
            const isL = idx === left;
            const isR = idx === right;

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
                    transition: 'all 0.25s'
                  }}
                >
                  {val}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Message */}
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
          <span>{isPlaying ? 'Pause' : 'Play Slide'}</span>
        </button>

        <button
          onClick={() => stepForward(left, right, currentSum, maxSum, bestWindow)}
          disabled={isPlaying || right >= array.length - 1}
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
