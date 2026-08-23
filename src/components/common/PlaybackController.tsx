import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  StepBack, 
  StepForward, 
  FastForward, 
  Gauge
} from 'lucide-react';

export type SimulationSpeed = 0.25 | 0.5 | 1 | 2 | 4;

interface PlaybackControllerProps {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onStepForward: () => void;
  onStepBackward?: () => void;
  onFastForward?: () => void;
  onReset: () => void;
  canStepBackward?: boolean;
  canStepForward?: boolean;
  speed: SimulationSpeed;
  onSpeedChange: (newSpeed: SimulationSpeed) => void;
  customControls?: React.ReactNode;
}

export const PlaybackController: React.FC<PlaybackControllerProps> = ({
  isPlaying,
  onPlayToggle,
  onStepForward,
  onStepBackward,
  onFastForward,
  onReset,
  canStepBackward = true,
  canStepForward = true,
  speed,
  onSpeedChange,
  customControls
}) => {
  const speeds: { label: string; value: SimulationSpeed }[] = [
    { label: '0.25x', value: 0.25 },
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '4x', value: 4 }
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#090e1c',
        border: '1px solid rgba(0, 245, 255, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 18px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Playback Buttons Group */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Step Back */}
        {onStepBackward && (
          <button
            onClick={onStepBackward}
            disabled={isPlaying || !canStepBackward}
            className="cyber-btn-secondary"
            title="Step Backward (⏪ 1 Step)"
            style={{
              padding: '7px 10px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              opacity: isPlaying || !canStepBackward ? 0.4 : 1
            }}
          >
            <StepBack size={15} />
            <span>Step Back</span>
          </button>
        )}

        {/* Play / Pause Toggle */}
        <button
          onClick={onPlayToggle}
          className={isPlaying ? 'cyber-btn-magenta' : 'cyber-btn'}
          style={{
            padding: '7px 16px',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minWidth: '96px',
            justifyContent: 'center'
          }}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        {/* Step Forward */}
        <button
          onClick={onStepForward}
          disabled={isPlaying || !canStepForward}
          className="cyber-btn-secondary"
          title="Step Forward (⏩ 1 Step)"
          style={{
            padding: '7px 10px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            opacity: isPlaying || !canStepForward ? 0.4 : 1
          }}
        >
          <span>Step</span>
          <StepForward size={15} />
        </button>

        {/* Fast Forward */}
        {onFastForward && (
          <button
            onClick={onFastForward}
            disabled={!canStepForward}
            className="cyber-btn-secondary"
            title="Fast Forward (⏭️ Jump Ahead)"
            style={{
              padding: '7px 10px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <FastForward size={15} color="var(--neon-yellow)" />
            <span>Fast</span>
          </button>
        )}

        {/* Reset */}
        <button
          onClick={onReset}
          className="cyber-btn-secondary"
          title="Reset Simulation"
          style={{
            padding: '7px 10px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Custom Inputs / Controls from specific visualizers */}
      {customControls && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {customControls}
        </div>
      )}

      {/* 5-Speed Gear Shift Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(13, 21, 39, 0.8)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--neon-cyan)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <Gauge size={14} />
          <span style={{ fontWeight: 600 }}>SPEED:</span>
        </div>

        <div style={{ display: 'flex', gap: '3px' }}>
          {speeds.map((s) => {
            const isActive = speed === s.value;
            return (
              <button
                key={s.value}
                onClick={() => onSpeedChange(s.value)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '3px',
                  border: `1px solid ${isActive ? 'var(--neon-cyan)' : 'transparent'}`,
                  backgroundColor: isActive ? 'rgba(0, 245, 255, 0.25)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 0 8px rgba(0, 245, 255, 0.4)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
