import React from 'react';
import { Battery } from 'lucide-react';

interface EnergyBarProps {
  currentEnergy: number;
  maxEnergy: number;
}

export const EnergyBar: React.FC<EnergyBarProps> = ({ currentEnergy, maxEnergy }) => {
  const percentage = (currentEnergy / maxEnergy) * 100;
  
  return (
    <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg">
      <Battery className="w-5 h-5 text-blue-400" />
      <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium">
        {Math.floor(currentEnergy)}/{maxEnergy}
      </span>
    </div>
  );
};