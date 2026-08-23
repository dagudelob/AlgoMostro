import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export const TwoPointersVisualizer: React.FC = () => {
  const array = [1, 3, 4, 6, 8, 9, 11, 15];
  const target = 14; // Solution is 3 + 11 (indices 1 and 6) or 6 + 8 (indices 3 and 4)

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(array.length - 1);
  const [found, setFound] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [message, setMessage] = useState(`Two Pointers sobre array ordenado. Buscando dos números con suma = ${target}.`);

  const stepForward = (currL: number, currR: number) => {
    if (currL >= currR) {
      setIsPlaying(false);
      setMessage('Punteros se cruzaron. No existe par que sume el objetivo.');
      return;
    }

    const sum = array[currL] + array[currR];
    if (sum === target) {
      setFound(true);
      setIsPlaying(false);
      setMessage(`¡Par encontrado! array[${currL}] (${array[currL]}) + array[${currR}] (${array[currR]}) = ${target} en tiempo O(N) y O(1) memoria.`);
      return;
    }

    if (sum < target) {
      const nextL = currL + 1;
      setLeft(nextL);
      setMessage(`Suma actual ${array[currL]} + ${array[currR]} = ${sum} < ${target}. Aumentando Left a [${nextL}] para incrementar la suma.`);
    } else {
      const nextR = currR - 1;
      setRight(nextR);
      setMessage(`Suma actual ${array[currL]} + ${array[currR]} = ${sum} > ${target}. Disminuyendo Right a [${nextR}] para reducir la suma.`);
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (found || left >= right) {
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
      const sum = array[l] + array[r];
      if (sum === target) {
        setFound(true);
        setIsPlaying(false);
        setMessage(`¡Par encontrado! array[${l}] (${array[l]}) + array[${r}] (${array[r]}) = ${target}!`);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 800));
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
    setRight(array.length - 1);
    setFound(false);
    setIsPlaying(false);
    setMessage(`Two Pointers restablecido. Buscando suma = ${target}.`);
  };

  const currentSum = array[left] + array[right];

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
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="cyber-badge badge-green">Left = [{left}] ({array[left]})</span>
          <span className="cyber-badge badge-magenta">Right = [{right}] ({array[right]})</span>
          <span className="cyber-badge badge-yellow">Suma = {currentSum}</span>
          <span className="cyber-badge badge-cyan">Objetivo = {target}</span>
        </div>

        {/* Array Grid */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {array.map((val, idx) => {
            const isL = idx === left;
            const isR = idx === right;
            const isMatch = found && (isL || isR);

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
                    color: isMatch ? '#39ff14' : isL ? 'var(--neon-green)' : isR ? 'var(--neon-magenta)' : 'var(--text-dim)',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}
                >
                  {isL && isR ? 'L,R' : isL ? 'LEFT' : isR ? 'RIGHT' : `[${idx}]`}
                </span>

                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    backgroundColor: isMatch
                      ? 'rgba(57, 255, 20, 0.35)'
                      : isL
                      ? 'rgba(57, 255, 20, 0.2)'
                      : isR
                      ? 'rgba(255, 0, 127, 0.2)'
                      : 'rgba(16, 28, 54, 0.7)',
                    border: `2px solid ${
                      isMatch
                        ? 'var(--neon-green)'
                        : isL
                        ? 'var(--neon-green)'
                        : isR
                        ? 'var(--neon-magenta)'
                        : 'rgba(0, 245, 255, 0.2)'
                    }`,
                    boxShadow: isMatch
                      ? '0 0 20px rgba(57, 255, 20, 0.8)'
                      : isL
                      ? '0 0 12px rgba(57, 255, 20, 0.4)'
                      : isR
                      ? '0 0 12px rgba(255, 0, 127, 0.4)'
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: isMatch ? '#39ff14' : isL ? '#fff' : isR ? '#fff' : '#c9d8f0',
                    transform: isL || isR ? 'scale(1.08)' : 'scale(1)',
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
          <span>{isPlaying ? 'Pausar' : 'Play Two Pointers'}</span>
        </button>

        <button
          onClick={() => stepForward(left, right)}
          disabled={isPlaying || found || left >= right}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <SkipForward size={14} /> Siguiente Paso
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
