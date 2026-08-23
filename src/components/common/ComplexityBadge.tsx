import React from 'react';
import { Clock, Cpu } from 'lucide-react';

interface ComplexityBadgeProps {
  type: 'time' | 'space';
  value: string;
  size?: 'sm' | 'md';
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ type, value, size = 'sm' }) => {
  const isO1 = value.includes('O(1)') || value.includes('O(alpha');
  const isLogN = value.includes('log');
  const isLinear = value.includes('O(N)') || value.includes('O(V + E)');
  const isQuadratic = value.includes('N^2') || value.includes('O(V * E)') || value.includes('N * W');

  let colorClass = 'badge-cyan';
  if (isO1) colorClass = 'badge-green';
  else if (isLogN) colorClass = 'badge-cyan';
  else if (isLinear) colorClass = 'badge-yellow';
  else if (isQuadratic) colorClass = 'badge-magenta';

  const icon = type === 'time' ? <Clock size={size === 'sm' ? 12 : 14} /> : <Cpu size={size === 'sm' ? 12 : 14} />;
  const label = type === 'time' ? 'Time' : 'Space';

  return (
    <span className={`cyber-badge ${colorClass}`} style={{ fontSize: size === 'sm' ? '0.7rem' : '0.8rem' }}>
      {icon}
      <span>{label}: {value}</span>
    </span>
  );
};
