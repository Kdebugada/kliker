import React from 'react';
import { UpgradeButton } from './UpgradeButton';
import { Coins } from 'lucide-react';

interface UpgradesSectionProps {
  score: number;
  tapPower: number;
  tapPowerCost: number;
  energyLevel: number;
  energyCost: number;
  energyRegenLevel: number;
  energyRegenCost: number;
  passiveIncomeLevel: number;
  passiveIncomeCost: number;
  upgradeTapPower: () => void;
  upgradeEnergy: () => void;
  upgradeEnergyRegen: () => void;
  upgradePassiveIncome: () => void;
}

export const UpgradesSection: React.FC<UpgradesSectionProps> = ({
  score,
  tapPower,
  tapPowerCost,
  energyLevel,
  energyCost,
  energyRegenLevel,
  energyRegenCost,
  passiveIncomeLevel,
  passiveIncomeCost,
  upgradeTapPower,
  upgradeEnergy,
  upgradeEnergyRegen,
  upgradePassiveIncome,
}) => {
  return (
    <div className="bg-black/30 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Улучшения</h2>
        <div className="flex items-center gap-1 ml-auto">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="font-medium">{Math.max(0, Math.floor(score || 0))}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UpgradeButton
          type="tap"
          cost={Math.max(0, Math.floor(tapPowerCost))}
          level={Math.max(1, Math.floor(tapPower))}
          canAfford={score >= tapPowerCost}
          onClick={upgradeTapPower}
        />
        <UpgradeButton
          type="energy"
          cost={Math.max(0, Math.floor(energyCost))}
          level={Math.max(1, Math.floor(energyLevel))}
          canAfford={score >= energyCost}
          onClick={upgradeEnergy}
        />
        <UpgradeButton
          type="regen"
          cost={Math.max(0, Math.floor(energyRegenCost))}
          level={Math.max(1, Math.floor(energyRegenLevel))}
          canAfford={score >= energyRegenCost}
          onClick={upgradeEnergyRegen}
        />
        <UpgradeButton
          type="passive"
          cost={Math.max(0, Math.floor(passiveIncomeCost))}
          level={Math.max(0, Math.floor(passiveIncomeLevel))}
          canAfford={score >= passiveIncomeCost}
          onClick={upgradePassiveIncome}
        />
      </div>
    </div>
  );
};