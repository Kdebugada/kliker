import React from 'react';
import { MainGame } from './components/MainGame/MainGame';
import { useGameState } from './hooks/useGameState';
import { calculateEnergyRegeneration, calculatePassiveIncome } from './utils/gameCalculations';
import { initializeTelegram } from './utils/telegram';

function App() {
  const gameState = useGameState();
  const {
    score,
    tapPower,
    energyLevel,
    currentEnergy,
    maxEnergy,
    energyRegenLevel,
    passiveIncomeLevel,
    incrementScore,
    upgradeTapPower,
    upgradeEnergy,
    upgradeEnergyRegen,
    upgradePassiveIncome
  } = gameState;

  React.useEffect(() => {
    initializeTelegram();
  }, []);

  const regenRate = calculateEnergyRegeneration(energyRegenLevel);
  const passiveRate = calculatePassiveIncome(passiveIncomeLevel);

  const upgradeFunctions = {
    upgradeTapPower,
    upgradeEnergy,
    upgradeEnergyRegen,
    upgradePassiveIncome
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <MainGame
        score={score}
        tapPower={tapPower}
        energyLevel={energyLevel}
        currentEnergy={currentEnergy}
        maxEnergy={maxEnergy}
        energyRegenLevel={energyRegenLevel}
        passiveIncomeLevel={passiveIncomeLevel}
        regenRate={regenRate}
        passiveRate={passiveRate}
        handleClick={incrementScore}
        gameState={gameState}
        upgradeFunctions={upgradeFunctions}
      />
    </div>
  );
}

export default App;