import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Plus, Trash2 } from 'lucide-react';

export const QueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([10, 20, 30, 40]);
  const [newVal, setNewVal] = useState<string>('50');
  const [message, setMessage] = useState('Queue (FIFO - First In, First Out). Elements enter from the Rear and leave from the Front in O(1).');

  const handleEnqueue = () => {
    const val = parseInt(newVal);
    if (isNaN(val)) return;
    if (queue.length >= 7) {
      setMessage('Queue capacity reached (max 7 elements for this visualizer).');
      return;
    }
    setQueue([...queue, val]);
    setMessage(`Enqueue(${val}) -> Element added at the end (REAR) in O(1) time.`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty. Cannot perform Dequeue.');
      return;
    }
    const val = queue[0];
    setQueue(queue.slice(1));
    setMessage(`Dequeue() -> [${val}] extracted from the front (FRONT) in O(1) time.`);
  };

  const handleReset = () => {
    setQueue([10, 20, 30, 40]);
    setMessage('Queue reset.');
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
          gap: '20px',
          minHeight: '180px',
          justifyContent: 'center'
        }}
      >
        {/* Horizontal Pipeline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Dequeue Exit Indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--neon-green)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              FRONT (Exit)
            </span>
            <ArrowRight size={20} color="var(--neon-green)" />
          </div>

          {/* Queue Pipe Container */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              padding: '12px 16px',
              borderTop: '2px solid var(--neon-cyan)',
              borderBottom: '2px solid var(--neon-cyan)',
              backgroundColor: 'rgba(0, 245, 255, 0.03)',
              borderRadius: '4px',
              minWidth: '280px',
              justifyContent: 'flex-start'
            }}
          >
            {queue.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === queue.length - 1;

              return (
                <div
                  key={idx}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '6px',
                    backgroundColor: isFront
                      ? 'rgba(57, 255, 20, 0.3)'
                      : isRear
                      ? 'rgba(255, 0, 127, 0.3)'
                      : 'rgba(16, 28, 54, 0.9)',
                    border: `1px solid ${
                      isFront
                        ? 'var(--neon-green)'
                        : isRear
                        ? 'var(--neon-magenta)'
                        : 'rgba(0, 245, 255, 0.3)'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: isFront ? '#39ff14' : isRear ? 'var(--neon-magenta)' : '#fff',
                    fontSize: '1rem',
                    boxShadow: isFront
                      ? '0 0 10px rgba(57, 255, 20, 0.4)'
                      : isRear
                      ? '0 0 10px rgba(255, 0, 127, 0.4)'
                      : 'none'
                  }}
                >
                  {val}
                </div>
              );
            })}

            {queue.length === 0 && (
              <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', padding: '10px' }}>
                [ Queue Empty ]
              </div>
            )}
          </div>

          {/* Enqueue Entrance Indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--neon-magenta)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              REAR (Entry)
            </span>
            <ArrowRight size={20} color="var(--neon-magenta)" />
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
          <Trash2 size={14} /> Dequeue (Front) O(1)
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
