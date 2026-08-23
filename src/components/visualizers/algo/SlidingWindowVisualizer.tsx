import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export const SlidingWindowVisualizer: React.FC = () => {
  const array = [2, 1, 5, 1, 3, 2, 8, 4];
  const targetK = 3; // Window of size 3

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(2);
  const [currSum, setCurrSum] = useState<number>(8); // 2 + 1 + 5
  const [maxSum, setMaxSum] = useState<number>(8);
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [message, setMessage] = useState('Sliding Window de tamaño K=3. Suma inicial [2 + 1 + 5 = 8].');

  const maxSteps = array.length - targetK;

  const nextStep = (currentStep: number) => {
    if (currentStep >= maxSteps) {
      setIsPlaying(false);
      setMessage(`¡Ventana completada! La suma máxima encontrada es ${maxSum}.`);
      return;
    }
    const nextS = currentStep + 1;
    const nextL = nextS;
    const nextR = nextS + targetK - 1;
    
    // Window shift formula: sum = sum - arr[L-1] + arr[R]
    const subVal = array[currentStep];
    const addVal = array[nextR];
    const newS = currSum - subVal + addVal;
    const newMax = Math.max(maxSum, newS);

    setLeft(nextL);
    setRight(nextR);
    setCurrSum(newS);
    setMaxSum(newMax);
    setStep(nextS);
    setMessage(`Desplazando ventana: resta arr[${currentStep}]=${subVal}, suma arr[${nextR}]=${addVal}. Nueva suma: ${newS} (Max: ${newMax}).`);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (step >= maxSteps) {
        handleReset();
      }
      setIsPlaying(true);
      runLoop(step);
    }
  };

  const runLoop = async (startStep: number) => {
    let s = startStep;
    while (s < maxSteps) {
      await new Promise((r) => setTimeout(r, 900));
      s++;
      nextStep(s - 1);
    }
    setIsPlaying(false);
  };

  const handleReset = () => {
    setLeft(0);
    setRight(2);
    setCurrSum(8);
    setMaxSum(8);
    setStep(0);
    setIsPlaying(false);
    setMessage('Ventana deslizante restablecida a la posición inicial.');
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
          gap: '24px'
        }}
      >
        {/* Array and Window Bracket */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {/* Pointers Banner */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <span className="cyber-badge badge-green">L = {left}</span>
            <span className="cyber-badge badge-magenta">R = {right}</span>
            <span className="cyber-badge badge-yellow">Suma actual = {currSum}</span>
            <span className="cyber-badge badge-cyan">Max Suma = {maxSum}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', position: 'relative', padding: '8px' }}>
            {array.map((val, idx) => {
              const inWindow = idx >= left && idx <= right;
              const isLeftEdge = idx === left;
              const isRightEdge = idx === right;

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
                      color: isLeftEdge ? '#39ff14' : isRightEdge ? '#ff007f' : 'var(--text-dim)',
                      fontWeight: 700,
                      marginBottom: '4px'
                    }}
                  >
                    {isLeftEdge && isRightEdge ? 'L,R' : isLeftEdge ? 'L' : isRightEdge ? 'R' : `[${idx}]`}
                  </span>

                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '8px',
                      backgroundColor: inWindow ? 'rgba(0, 245, 255, 0.2)' : 'rgba(16, 28, 54, 0.6)',
                      border: `2px solid ${inWindow ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.1)'}`,
                      boxShadow: inWindow ? '0 0 16px rgba(0, 245, 255, 0.3)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      color: inWindow ? '#fff' : 'var(--text-dim)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
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
          <span>{isPlaying ? 'Pausar' : 'Play Animación'}</span>
        </button>

        <button
          onClick={() => nextStep(step)}
          disabled={isPlaying || step >= maxSteps}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <SkipForward size={14} /> Paso ({step}/{maxSteps})
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
