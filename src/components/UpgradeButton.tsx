import React from 'react';
import { Zap, MousePointer, Battery } from 'lucide-react';

interface UpgradeButtonProps {
  type: 'tap' | 'energy' | 'regen';
  cost: number;
  level: number;
  canAfford: boolean;
  onClick: () => void;
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  type,
  cost,
  level,
  canAfford,
  onClick
}) => {
  const getIcon = () => {
    switch (type) {
      case 'tap':
        return <MousePointer className="w-5 h-5" />;
      case 'energy':
        return <Battery className="w-5 h-5" />;
      case 'regen':
        return <Zap className="w-5 h-5" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'tap':
        return 'Улучшить тап';
      case 'energy':
        return 'Улучшить энергию';
      case 'regen':
        return 'Ускорить восстановление';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex-1 min-w-[200px] max-w-[250px] flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
        canAfford
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-gray-600 cursor-not-allowed opacity-50'
      }`}
      disabled={!canAfford}
    >
      {getIcon()}
      <div className="flex flex-col items-start">
        <span className="text-sm whitespace-nowrap">{getTitle()}</span>
        <span className="text-xs opacity-75 whitespace-nowrap">
          Уровень: {level} • Цена: {Math.floor(cost)}
        </span>
      </div>
    </button>
  );
};