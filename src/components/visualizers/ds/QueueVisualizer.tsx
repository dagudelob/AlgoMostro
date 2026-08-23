import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, ArrowRight } from 'lucide-react';

export const QueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([10, 20, 30, 40]);
  const [newVal, setNewVal] = useState<string>('50');
  const [message, setMessage] = useState('Queue (FIFO - First In, First Out). Los elementos entran por el Rear y salen por el Front en O(1).');

  const handleEnqueue = () => {
    const val = parseInt(newVal);
    if (isNaN(val)) return;
    if (queue.length >= 7) {
      setMessage('Cola llena (máx 7 elementos para esta visualización).');
      return;
    }
    setQueue([...queue, val]);
    setMessage(`Enqueue(${val}) -> Elemento añadido al final (REAR) en tiempo O(1).`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage('Cola vacía. No se puede hacer Dequeue.');
      return;
    }
    const val = queue[0];
    setQueue(queue.slice(1));
    setMessage(`Dequeue() -> [${val}] extraído del frente (FRONT) en tiempo O(1).`);
  };

  const handleReset = () => {
    setQueue([10, 20, 30, 40]);
    setMessage('Cola restablecida.');
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
        {/* Horizontal Pipe */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="cyber-badge badge-green">SALIDA (FRONT)</span>
            <ArrowRight size={18} color="#39ff14" style={{ marginTop: '4px' }} />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '6px',
              padding: '10px 16px',
              borderTop: '2px solid var(--neon-cyan)',
              borderBottom: '2px solid var(--neon-cyan)',
              backgroundColor: 'rgba(0, 245, 255, 0.03)',
              minHeight: '60px',
              alignItems: 'center'
            }}
          >
            {queue.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === queue.length - 1;

              return (
                <div
                  key={idx}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '6px',
                    backgroundColor: isFront ? 'rgba(57, 255, 20, 0.25)' : isRear ? 'rgba(255, 0, 127, 0.25)' : 'rgba(16, 28, 54, 0.9)',
                    border: `2px solid ${isFront ? 'var(--neon-green)' : isRear ? 'var(--neon-magenta)' : 'rgba(0, 245, 255, 0.3)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: isFront ? '#39ff14' : isRear ? '#ff007f' : '#fff',
                    boxShadow: isFront ? '0 0 10px rgba(57, 255, 20, 0.4)' : isRear ? '0 0 10px rgba(255, 0, 127, 0.4)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {val}
                </div>
              );
            })}
            {queue.length === 0 && (
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                [ Cola Vacía ]
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="cyber-badge badge-magenta">ENTRADA (REAR)</span>
            <ArrowRight size={18} color="#ff007f" style={{ marginTop: '4px' }} />
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
          <input
            type="number"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            placeholder="Val"
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
          <button
            onClick={handleEnqueue}
            className="cyber-btn"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
          >
            <Plus size={14} /> Enqueue O(1)
          </button>
        </div>

        <button
          onClick={handleDequeue}
          className="cyber-btn-magenta"
          style={{ padding: '7px 14px', fontSize: '0.8rem' }}
        >
          <Trash2 size={14} /> Dequeue O(1)
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
