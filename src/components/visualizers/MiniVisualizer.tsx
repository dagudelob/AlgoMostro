import React, { useEffect, useState } from 'react';
import type { VisualizerType } from '../../types/flowchart';

interface MiniVisualizerProps {
  type: VisualizerType;
}

export const MiniVisualizer: React.FC<MiniVisualizerProps> = ({ type }) => {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTicker((prev) => (prev + 1) % 100);
    }, 700);
    return () => clearInterval(timer);
  }, []);

  // Mini animation rendering based on type
  switch (type) {
    case 'array': {
      const activeIdx = ticker % 5;
      return (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
          {[10, 25, 42, 88, 99].map((val, i) => (
            <div
              key={i}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                backgroundColor: i === activeIdx ? 'rgba(0, 245, 255, 0.4)' : 'rgba(16, 28, 54, 0.8)',
                border: `1px solid ${i === activeIdx ? 'var(--neon-cyan)' : 'rgba(0, 245, 255, 0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: i === activeIdx ? '#fff' : '#8b949e',
                boxShadow: i === activeIdx ? '0 0 8px #00f5ff' : 'none',
                transform: i === activeIdx ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.3s'
              }}
            >
              {val}
            </div>
          ))}
        </div>
      );
    }

    case 'linked_list': {
      const activeIdx = ticker % 3;
      return (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
          {[10, 25, 42].map((val, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '4px',
                  backgroundColor: i === activeIdx ? 'rgba(57, 255, 20, 0.4)' : 'rgba(16, 28, 54, 0.8)',
                  border: `1px solid ${i === activeIdx ? 'var(--neon-green)' : 'rgba(0, 245, 255, 0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: i === activeIdx ? '#39ff14' : '#8b949e',
                  boxShadow: i === activeIdx ? '0 0 8px #39ff14' : 'none'
                }}
              >
                {val}
              </div>
              {i < 2 && <span style={{ color: 'var(--neon-cyan)', fontSize: '0.65rem' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      );
    }

    case 'sliding_window': {
      const left = ticker % 3;
      const right = left + 2;
      return (
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
          {[2, 1, 5, 1, 3, 2].map((val, i) => {
            const inWindow = i >= left && i <= right;
            return (
              <div
                key={i}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  backgroundColor: inWindow ? 'rgba(255, 0, 127, 0.35)' : 'rgba(16, 28, 54, 0.6)',
                  border: `1px solid ${inWindow ? 'var(--neon-magenta)' : 'rgba(255, 255, 255, 0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: inWindow ? '#fff' : '#54627b',
                  boxShadow: inWindow ? '0 0 6px rgba(255, 0, 127, 0.5)' : 'none'
                }}
              >
                {val}
              </div>
            );
          })}
        </div>
      );
    }

    case 'two_pointers': {
      const l = ticker % 2;
      const r = 4 - (ticker % 2);
      return (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
          {[1, 3, 6, 8, 11].map((val, i) => {
            const isL = i === l;
            const isR = i === r;
            return (
              <div
                key={i}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '4px',
                  backgroundColor: isL
                    ? 'rgba(57, 255, 20, 0.35)'
                    : isR
                    ? 'rgba(255, 0, 127, 0.35)'
                    : 'rgba(16, 28, 54, 0.6)',
                  border: `1px solid ${isL ? 'var(--neon-green)' : isR ? 'var(--neon-magenta)' : 'rgba(255, 255, 255, 0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: isL ? '#39ff14' : isR ? '#ff007f' : '#8b949e',
                  boxShadow: isL ? '0 0 8px #39ff14' : isR ? '0 0 8px #ff007f' : 'none'
                }}
              >
                {val}
              </div>
            );
          })}
        </div>
      );
    }

    case 'tree':
    case 'graph':
    case 'bfs':
    case 'dfs': {
      const activePulse = ticker % 4;
      return (
        <svg viewBox="0 0 100 40" style={{ width: '100px', height: '40px' }}>
          <line x1="20" y1="20" x2="50" y2="10" stroke="rgba(0, 245, 255, 0.4)" strokeWidth="1.5" />
          <line x1="50" y1="10" x2="80" y2="20" stroke="rgba(0, 245, 255, 0.4)" strokeWidth="1.5" />
          <line x1="50" y1="10" x2="50" y2="32" stroke="rgba(0, 245, 255, 0.4)" strokeWidth="1.5" />
          {[
            { cx: 50, cy: 10, i: 0 },
            { cx: 20, cy: 20, i: 1 },
            { cx: 80, cy: 20, i: 2 },
            { cx: 50, cy: 32, i: 3 }
          ].map((n) => (
            <circle
              key={n.i}
              cx={n.cx}
              cy={n.cy}
              r={n.i === activePulse ? 7 : 5}
              fill={n.i === activePulse ? 'rgba(0, 245, 255, 0.6)' : 'rgba(16, 28, 54, 0.9)'}
              stroke={n.i === activePulse ? 'var(--neon-cyan)' : 'rgba(0, 245, 255, 0.4)'}
              strokeWidth={1.5}
            />
          ))}
        </svg>
      );
    }

    case 'stack': {
      const topIdx = (ticker % 3) + 1;
      return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px', alignItems: 'center', height: '40px', justifyContent: 'center' }}>
          {[1, 2, 3].map((val, i) => (
            <div
              key={val}
              style={{
                width: '45px',
                height: '9px',
                borderRadius: '2px',
                backgroundColor: i + 1 === topIdx ? 'rgba(255, 0, 127, 0.5)' : 'rgba(0, 245, 255, 0.2)',
                border: `1px solid ${i + 1 === topIdx ? 'var(--neon-magenta)' : 'rgba(0, 245, 255, 0.3)'}`,
                boxShadow: i + 1 === topIdx ? '0 0 6px #ff007f' : 'none'
              }}
            />
          ))}
        </div>
      );
    }

    case 'binary_search': {
      const mid = (ticker % 3) + 1;
      return (
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
          {[2, 5, 8, 12, 16].map((val, i) => (
            <div
              key={i}
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '4px',
                backgroundColor: i === mid ? 'rgba(255, 0, 127, 0.4)' : 'rgba(16, 28, 54, 0.6)',
                border: `1px solid ${i === mid ? 'var(--neon-magenta)' : 'rgba(0, 245, 255, 0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                fontFamily: 'var(--font-mono)',
                color: i === mid ? '#fff' : '#8b949e',
                boxShadow: i === mid ? '0 0 8px #ff007f' : 'none'
              }}
            >
              {val}
            </div>
          ))}
        </div>
      );
    }

    default: {
      return (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
          <div className="animate-pulse-glow" style={{ width: '80px', height: '14px', borderRadius: '4px', background: 'linear-gradient(90deg, rgba(0,245,255,0.4), rgba(255,0,127,0.4))' }} />
        </div>
      );
    }
  }
};
