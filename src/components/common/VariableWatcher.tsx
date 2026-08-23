import React from 'react';
import { Activity } from 'lucide-react';

export interface WatcherVariable {
  name: string;
  value: string | number | boolean | Array<unknown> | Record<string, unknown> | null | undefined;
  type: 'number' | 'string' | 'boolean' | 'array' | 'object' | 'pointer' | 'set';
  scope?: string;
  isModified?: boolean;
}

interface VariableWatcherProps {
  variables: WatcherVariable[];
  callStack?: string[];
  stepIndex?: number;
  totalSteps?: number;
}

export const VariableWatcher: React.FC<VariableWatcherProps> = ({
  variables,
  callStack,
  stepIndex,
  totalSteps
}) => {
  const formatValue = (val: WatcherVariable['value'], type: WatcherVariable['type']) => {
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    if (type === 'boolean') return val ? 'true' : 'false';
    if (Array.isArray(val)) {
      if (val.length === 0) return '[]';
      return `[ ${val.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(', ')} ]`;
    }
    if (typeof val === 'object') {
      return JSON.stringify(val);
    }
    return String(val);
  };

  const getTypeColor = (type: WatcherVariable['type']) => {
    switch (type) {
      case 'number': return '#b5cea8';
      case 'string': return '#ce9178';
      case 'boolean': return '#569cd6';
      case 'pointer': return '#ff007f';
      case 'array': return '#4ec9b0';
      case 'set': return '#dcdcaa';
      default: return '#9cdcfe';
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#080c16',
        border: '1px solid rgba(0, 245, 255, 0.25)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Debugger Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 14px',
          backgroundColor: '#0d1527',
          borderBottom: '1px solid rgba(0, 245, 255, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity size={14} color="var(--neon-green)" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
            DEBUGGER // VARIABLE INSPECTOR
          </span>
        </div>

        {stepIndex !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="cyber-badge badge-cyan" style={{ fontSize: '0.65rem' }}>
              Step {stepIndex} {totalSteps ? `of ${totalSteps}` : ''}
            </span>
          </div>
        )}
      </div>

      {/* Variables Table */}
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 2fr', fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '4px' }}>
          <span>NAME</span>
          <span>TYPE / SCOPE</span>
          <span>VALUE</span>
        </div>

        {variables.map((v, idx) => {
          const typeColor = getTypeColor(v.type);
          const formatted = formatValue(v.value, v.type);

          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 2fr',
                alignItems: 'center',
                padding: '4px 6px',
                borderRadius: '4px',
                backgroundColor: v.isModified ? 'rgba(0, 245, 255, 0.12)' : 'transparent',
                borderLeft: v.isModified ? '2px solid var(--neon-cyan)' : '2px solid transparent',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem'
              }}
            >
              {/* Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#9cdcfe', fontWeight: 600 }}>{v.name}</span>
              </div>

              {/* Type & Scope */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: typeColor, fontSize: '0.7rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '1px 4px', borderRadius: '3px' }}>
                  {v.type}
                </span>
                {v.scope && (
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.65rem' }}>({v.scope})</span>
                )}
              </div>

              {/* Value */}
              <div
                style={{
                  color: typeColor,
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                title={formatted}
              >
                {formatted}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Call Stack Section */}
      {callStack && callStack.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '8px 14px', backgroundColor: 'rgba(5, 8, 16, 0.5)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
            CALL STACK ({callStack.length}):
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {callStack.map((frame, i) => (
              <span key={i} className="cyber-badge badge-magenta" style={{ fontSize: '0.68rem' }}>
                {frame}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
