import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export const BinarySearchVisualizer: React.FC = () => {
  const array = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];
  const [target, setTarget] = useState<number>(23);

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(array.length - 1);
  const [mid, setMid] = useState<number | null>(Math.floor((0 + array.length - 1) / 2));
  const [foundIdx, setFoundIdx] = useState<number | null>(null);
  const [stepCount, setStepCount] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [message, setMessage] = useState(`Binary Search O(log N) for target=${target}. L=0, R=${array.length - 1}, MID=${Math.floor((0 + array.length - 1) / 2)}.`);

  const stepForward = (curL: number, curR: number, count: number) => {
    if (curL > curR) {
      setIsPlaying(false);
      setMessage(`Element ${target} not found after ${count} steps O(log N).`);
      return;
    }

    const curMid = curL + Math.floor((curR - curL) / 2);
    setMid(curMid);
    setStepCount(count + 1);

    if (array[curMid] === target) {
      setFoundIdx(curMid);
      setIsPlaying(false);
      setMessage(`Found! array[${curMid}] == ${target} in only ${count} logarithmic steps.`);
      return;
    }

    if (array[curMid] < target) {
      const nextL = curMid + 1;
      setLeft(nextL);
      setMessage(`array[${curMid}] (${array[curMid]}) < ${target} -> Discarding left half. New Left = ${nextL}.`);
    } else {
      const nextR = curMid - 1;
      setRight(nextR);
      setMessage(`array[${curMid}] (${array[curMid]}) > ${target} -> Discarding right half. New Right = ${nextR}.`);
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (foundIdx !== null || left > right) {
        handleReset();
      }
      setIsPlaying(true);
      runLoop(left, right, stepCount);
    }
  };

  const runLoop = async (initL: number, initR: number, initCount: number) => {
    let l = initL;
    let r = initR;
    let cnt = initCount;
    while (l <= r) {
      const m = l + Math.floor((r - l) / 2);
      setMid(m);
      if (array[m] === target) {
        setFoundIdx(m);
        setIsPlaying(false);
        setMessage(`Found! array[${m}] == ${target} on step ${cnt}!`);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 850));
      cnt++;
      setStepCount(cnt);
      if (array[m] < target) {
        l = m + 1;
        setLeft(l);
      } else {
        r = m - 1;
        setRight(r);
      }
    }
    setIsPlaying(false);
  };

  const handleReset = () => {
    setLeft(0);
    setRight(array.length - 1);
    setMid(Math.floor((0 + array.length - 1) / 2));
    setFoundIdx(null);
    setStepCount(1);
    setIsPlaying(false);
    setMessage(`Binary Search reset for target=${target}.`);
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
        {/* Pointers Banner */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="cyber-badge badge-green">L = {left}</span>
          <span className="cyber-badge badge-magenta">MID = {mid} ({mid !== null ? array[mid] : '-'})</span>
          <span className="cyber-badge badge-yellow">R = {right}</span>
          <span className="cyber-badge badge-cyan">Step: {stepCount} of ~{Math.ceil(Math.log2(array.length))} max</span>
        </div>

        {/* Array Grid */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {array.map((val, idx) => {
            const isL = idx === left;
            const isR = idx === right;
            const isM = idx === mid;
            const isFound = foundIdx === idx;
            const isEliminated = idx < left || idx > right;

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
          &gt; {message}
        </div>
      </div>

      {/* Control Player */}
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
        <button
          onClick={handlePlayToggle}
          className="cyber-btn"
          style={{ padding: '7px 16px', fontSize: '0.8rem' }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'Pause' : 'Play Binary Search'}</span>
        </button>

        <button
          onClick={() => stepForward(left, right, stepCount)}
          disabled={isPlaying || foundIdx !== null || left > right}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <SkipForward size={14} /> Next Division
        </button>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="number"
            value={target}
            onChange={(e) => {
              setTarget(parseInt(e.target.value) || 0);
            }}
            placeholder="Target"
            style={{
              width: '60px',
              padding: '6px 8px',
              background: '#080c14',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#fff',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          />
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
