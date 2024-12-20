import React from 'react';

interface ClickEffectProps {
  x: number;
  y: number;
  show: boolean;
  value: number;
}

export const ClickEffect: React.FC<ClickEffectProps> = ({ x, y, show, value }) => {
  if (!show) return null;

  return (
    <div
      className="absolute pointer-events-none text-yellow-400 font-bold"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        animation: 'float-up 0.5s ease-out forwards'
      }}
    >
      +{Math.floor(value)}
    </div>
  );
};