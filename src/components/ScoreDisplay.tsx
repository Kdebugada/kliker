import React from 'react';
import { Coins } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => (
  <div className="flex items-center justify-between mb-8 bg-black/30 p-4 rounded-xl">
    <h1 className="text-2xl font-bold">Кликер двоек</h1>
    <div className="flex items-center gap-2">
      <Coins className="w-6 h-6 text-yellow-400" />
      <span className="text-xl font-bold">{Math.max(0, Math.floor(score || 0))}</span>
    </div>
  </div>
);