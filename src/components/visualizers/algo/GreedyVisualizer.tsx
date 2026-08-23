import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface Interval {
  id: number;
  start: number;
  end: number;
  label: string;
}

export const GreedyVisualizer: React.FC = () => {
  // Interval Scheduling problem
  const initialIntervals: Interval[] = [
    { id: 1, start: 1, end: 3, label: 'Task A [1..3]' },
    { id: 2, start: 2, end: 5, label: 'Task B [2..5]' },
    { id: 3, start: 4, end: 7, label: 'Task C [4..7]' },
    { id: 4, start: 1, end: 8, label: 'Task D [1..8]' },
    { id: 5, start: 6, end: 9, label: 'Task E [6..9]' },
    { id: 6, start: 8, end: 10, label: 'Task F [8..10]' }
  ];

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rejectedIds, setRejectedIds] = useState<number[]>([]);
  const [activeIntervalId, setActiveIntervalId] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('Greedy Interval Scheduling. Sort by finish time and greedily select non-overlapping intervals in O(N log N).');

  const runGreedy = async () => {
    setIsRunning(true);
    setSelectedIds([]);
    setRejectedIds([]);

    // Sort by end time
    const sorted = [...initialIntervals].sort((a, b) => a.end - b.end);
    const chosen: number[] = [];
    const rejected: number[] = [];
    let lastEnd = -Infinity;

    setMessage('Step 1: Sort all tasks by finish time (earliest end time first)...');
    await new Promise((r) => setTimeout(r, 700));

    for (const item of sorted) {
      setActiveIntervalId(item.id);
      setMessage(`Inspecting ${item.label}: Start = ${item.start}, End = ${item.end}...`);
      await new Promise((r) => setTimeout(r, 700));

      if (item.start >= lastEnd) {
        chosen.push(item.id);
        lastEnd = item.end;
        setSelectedIds([...chosen]);
        setMessage(`Selected ${item.label}! Does not overlap with previous end time (${lastEnd}).`);
      } else {
        rejected.push(item.id);
        setRejectedIds([...rejected]);
        setMessage(`Rejected ${item.label}! Overlaps with previous active interval ending at ${lastEnd}.`);
      }
      await new Promise((r) => setTimeout(r, 600));
    }

    setActiveIntervalId(null);
    setIsRunning(false);
    setMessage(`Greedy selection complete! Maximized non-overlapping tasks = ${chosen.length}.`);
  };

  const handleReset = () => {
    setSelectedIds([]);
    setRejectedIds([]);
    setActiveIntervalId(null);
    setIsRunning(false);
    setMessage('Interval scheduling reset.');
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
          gap: '16px'
        }}
      >
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Timeline Axis [0 to 10]
        </span>

        {/* Intervals Axis View */}
        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {initialIntervals.map((item) => {
            const isChosen = selectedIds.includes(item.id);
            const isRejected = rejectedIds.includes(item.id);
            const isActive = activeIntervalId === item.id;

            // percentage positioning across 0 to 10 scale
            const leftPct = (item.start / 10) * 100;
            const widthPct = ((item.end - item.start) / 10) * 100;

            let bg = 'rgba(16, 28, 54, 0.8)';
            let borderColor = 'rgba(0, 245, 255, 0.3)';
            let color = '#c9e6ff';

            if (isChosen) {
              bg = 'rgba(57, 255, 20, 0.3)';
              borderColor = 'var(--neon-green)';
              color = '#39ff14';
            } else if (isRejected) {
              bg = 'rgba(255, 0, 127, 0.15)';
              borderColor = 'rgba(255, 0, 127, 0.4)';
              color = 'rgba(255, 0, 127, 0.7)';
            } else if (isActive) {
              bg = 'rgba(255, 214, 10, 0.3)';
              borderColor = 'var(--neon-yellow)';
              color = '#ffd60a';
            }

            return (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  height: '32px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: '26px',
                    backgroundColor: bg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: color,
                    boxShadow: isChosen ? '0 0 10px rgba(57, 255, 20, 0.4)' : isActive ? '0 0 10px rgba(255, 214, 10, 0.4)' : 'none',
                    transition: 'all 0.25s'
                  }}
                >
                  {item.label}
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

      {/* Control Panel */}
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
          onClick={runGreedy}
          disabled={isRunning}
          className="cyber-btn"
          style={{ padding: '7px 16px', fontSize: '0.8rem' }}
        >
          <Play size={14} /> Run Greedy Scheduling O(N log N)
        </button>

        <button
          onClick={handleReset}
          disabled={isRunning}
          className="cyber-btn-secondary"
          style={{ padding: '7px 12px', fontSize: '0.8rem', marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
