import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface Interval {
  id: number;
  start: number;
  end: number;
  selected?: boolean;
  rejected?: boolean;
}

export const GreedyVisualizer: React.FC = () => {
  // Intervals to schedule
  const initialIntervals: Interval[] = [
    { id: 1, start: 1, end: 3 },
    { id: 2, start: 2, end: 5 },
    { id: 3, start: 3, end: 6 },
    { id: 4, start: 5, end: 7 },
    { id: 5, start: 6, end: 8 },
    { id: 6, start: 8, end: 10 }
  ];

  const [intervals, setIntervals] = useState<Interval[]>(initialIntervals);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [lastEnd, setLastEnd] = useState<number>(-1);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [message, setMessage] = useState('Estrategia Voraz (Greedy): Programación de Intervalos. Ordenar por tiempo de finalización y tomar vorazmente el que termine más temprano.');

  const stepForward = (idx: number, prevEnd: number, count: number) => {
    if (idx >= intervals.length) {
      setIsPlaying(false);
      setMessage(`¡Algoritmo Greedy finalizado! Se seleccionaron ${count} intervalos compatibles máximos.`);
      return;
    }

    const current = intervals[idx];
    const newIntervals = [...intervals];

    if (current.start >= prevEnd) {
      newIntervals[idx] = { ...current, selected: true };
      const newCount = count + 1;
      const newEnd = current.end;
      setIntervals(newIntervals);
      setCurrentIdx(idx + 1);
      setLastEnd(newEnd);
      setSelectedCount(newCount);
      setMessage(`Intervalo [${current.start}, ${current.end}] es compatible (start ${current.start} >= último end ${prevEnd === -1 ? 0 : prevEnd}). ¡Seleccionado vorazmente!`);
    } else {
      newIntervals[idx] = { ...current, rejected: true };
      setIntervals(newIntervals);
      setCurrentIdx(idx + 1);
      setMessage(`Intervalo [${current.start}, ${current.end}] se solapa con el anterior (start ${current.start} < end ${prevEnd}). Rechazado.`);
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentIdx >= intervals.length) {
        handleReset();
      }
      setIsPlaying(true);
      runLoop(currentIdx, lastEnd, selectedCount);
    }
  };

  const runLoop = async (initIdx: number, initEnd: number, initCount: number) => {
    let idx = initIdx;
    let end = initEnd;
    let cnt = initCount;
    const workingList = [...intervals];

    while (idx < workingList.length) {
      await new Promise((r) => setTimeout(r, 850));
      const curr = workingList[idx];
      if (curr.start >= end) {
        workingList[idx] = { ...curr, selected: true };
        end = curr.end;
        cnt++;
      } else {
        workingList[idx] = { ...curr, rejected: true };
      }
      setIntervals([...workingList]);
      idx++;
      setCurrentIdx(idx);
      setLastEnd(end);
      setSelectedCount(cnt);
    }
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIntervals(initialIntervals);
    setCurrentIdx(0);
    setLastEnd(-1);
    setSelectedCount(0);
    setIsPlaying(false);
    setMessage('Intervalos restablecidos y ordenados por end time.');
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
        {/* Banner */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="cyber-badge badge-green">Seleccionados: {selectedCount}</span>
          <span className="cyber-badge badge-magenta">Último Fin: {lastEnd === -1 ? 'None' : lastEnd}</span>
          <span className="cyber-badge badge-cyan">Complejidad: O(N log N)</span>
        </div>

        {/* Timeline Visualization */}
        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {intervals.map((item, idx) => {
            const isCurrent = idx === currentIdx;
            const leftPct = (item.start / 11) * 100;
            const widthPct = ((item.end - item.start) / 11) * 100;

            let bgColor = 'rgba(16, 28, 54, 0.8)';
            let borderColor = 'rgba(0, 245, 255, 0.3)';
            let textColor = '#c9e6ff';

            if (item.selected) {
              bgColor = 'rgba(57, 255, 20, 0.3)';
              borderColor = 'var(--neon-green)';
              textColor = '#39ff14';
            } else if (item.rejected) {
              bgColor = 'rgba(255, 0, 127, 0.15)';
              borderColor = 'rgba(255, 0, 127, 0.3)';
              textColor = 'rgba(255, 0, 127, 0.6)';
            } else if (isCurrent) {
              borderColor = 'var(--neon-cyan)';
            }

            return (
              <div key={item.id} style={{ position: 'relative', height: '34px', width: '100%', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: '100%',
                    backgroundColor: bgColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: textColor,
                    boxShadow: item.selected ? '0 0 10px rgba(57, 255, 20, 0.5)' : isCurrent ? '0 0 8px #00f5ff' : 'none',
                    transition: 'all 0.25s'
                  }}
                >
                  [{item.start}, {item.end}] {item.selected ? '✓' : item.rejected ? '✗' : ''}
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
          <span>{isPlaying ? 'Pausar' : 'Play Greedy Scan'}</span>
        </button>

        <button
          onClick={() => stepForward(currentIdx, lastEnd, selectedCount)}
          disabled={isPlaying || currentIdx >= intervals.length}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <SkipForward size={14} /> Siguiente Intervalo ({currentIdx}/{intervals.length})
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
