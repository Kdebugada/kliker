import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ScoreDisplay } from '../ScoreDisplay';
import { EnergyBar } from '../EnergyBar';
import { ClickableImage } from '../ClickableImage';
import { ClickEffect } from '../ClickEffect';
import { Modal } from '../UI/Modal';
import { UpgradesSection } from '../UpgradesSection/UpgradesSection';
import { GameStats } from './GameStats';

interface MainGameProps {
  score: number;
  tapPower: number;
  energyLevel: number;
  currentEnergy: number;
  maxEnergy: number;
  energyRegenLevel: number;
  passiveIncomeLevel: number;
  regenRate: number;
  passiveRate: number;
  handleClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  gameState: any; // Add proper type
  upgradeFunctions: {
    upgradeTapPower: () => void;
    upgradeEnergy: () => void;
    upgradeEnergyRegen: () => void;
    upgradePassiveIncome: () => void;
  };
}

export const MainGame: React.FC<MainGameProps> = ({
  score,
  tapPower,
  energyLevel,
  currentEnergy,
  maxEnergy,
  energyRegenLevel,
  passiveIncomeLevel,
  regenRate,
  passiveRate,
  handleClick,
  gameState,
  upgradeFunctions
}) => {
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [clickEffect, setClickEffect] = useState({ x: 0, y: 0, show: false, value: 0 });

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const energyCost = tapPower * energyLevel;
    if (currentEnergy < energyCost) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    handleClick(e);
    setClickEffect({ x, y, show: true, value: energyCost });
    
    setTimeout(() => {
      setClickEffect(prev => ({ ...prev, show: false }));
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ScoreDisplay score={score} />
      
      <div className="mb-6">
        <EnergyBar currentEnergy={currentEnergy} maxEnergy={maxEnergy} />
      </div>

      <button
        onClick={() => setShowUpgrades(true)}
        className="w-full mb-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
      >
        <Settings className="w-5 h-5" />
        <span>Прокачка</span>
      </button>

      <Modal isOpen={showUpgrades} onClose={() => setShowUpgrades(false)} title="Улучшения">
        <UpgradesSection
          score={score}
          {...gameState}
          {...upgradeFunctions}
        />
      </Modal>

      <div className="relative flex justify-center">
        <ClickableImage onClick={handleImageClick} />
        {clickEffect.show && (
          <ClickEffect {...clickEffect} />
        )}
      </div>

      <GameStats
        tapPower={tapPower}
        energyLevel={energyLevel}
        regenRate={regenRate}
        passiveRate={passiveRate}
      />
    </div>
  );
};