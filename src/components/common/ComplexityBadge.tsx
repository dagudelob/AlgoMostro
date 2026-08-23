import React from 'react';
import { Clock, Cpu } from 'lucide-react';

interface ComplexityBadgeProps {
  type?: 'time' | 'space';
  complexity?: string;
  value?: string;
  label?: string;
  size?: 'sm' | 'md';
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ 
  type = 'time', 
  complexity,
  value, 
  label,
  size = 'sm' 
}) => {
  const displayVal = complexity || value || 'O(1)';
  const displayLabel = label || (type === 'time' ? 'Time' : 'Space');

  const isO1 = displayVal.includes('O(1)') || displayVal.includes('O(alpha');
  const isLogN = displayVal.includes('log');
  const isLinear = displayVal.includes('O(N)') || displayVal.includes('O(V + E)') || displayVal.includes('O(L)');
  const isQuadratic = displayVal.includes('N^2') || displayVal.includes('O(V * E)') || displayVal.includes('N * W');

  let colorClass = 'badge-cyan';
  if (isO1) colorClass = 'badge-green';
  else if (isLogN) colorClass = 'badge-cyan';
  else if (isLinear) colorClass = 'badge-yellow';
  else if (isQuadratic) colorClass = 'badge-magenta';

  const icon = type === 'time' ? <Clock size={size === 'sm' ? 12 : 14} /> : <Cpu size={size === 'sm' ? 12 : 14} />;

  return (
    <span className={`cyber-badge ${colorClass}`} style={{ fontSize: size === 'sm' ? '0.7rem' : '0.8rem' }}>
      {icon}
      <span>{displayLabel}: {displayVal}</span>
    </span>
  );
};
