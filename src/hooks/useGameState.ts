import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';
import { INITIAL_GAME_CONFIG, ENERGY_UPDATE_INTERVAL } from '../config/gameConfig';
import { calculateEnergyRegeneration, calculatePassiveIncome } from '../utils/gameCalculations';

const ensureValidNumber = (value: number, defaultValue: number = 0): number => {
  return isNaN(value) || !isFinite(value) ? defaultValue : value;
};

export const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    const savedState = StorageService.loadState();
    if (savedState) {
      const timeDiff = (Date.now() - savedState.lastUpdated) / 1000;
      const regenRate = calculateEnergyRegeneration(savedState.energyRegenLevel);
      const passiveRate = calculatePassiveIncome(savedState.passiveIncomeLevel);
      
      const regeneratedEnergy = timeDiff * regenRate;
      const passiveIncome = timeDiff * passiveRate;
      
      const validatedState = {
        ...INITIAL_GAME_CONFIG,
        ...savedState,
        score: Math.max(0, ensureValidNumber(savedState.score + passiveIncome, 0)),
        tapPower: Math.max(1, ensureValidNumber(savedState.tapPower, 1)),
        tapPowerCost: Math.max(10, ensureValidNumber(savedState.tapPowerCost, 10)),
        energyLevel: Math.max(1, ensureValidNumber(savedState.energyLevel, 1)),
        energyCost: Math.max(15, ensureValidNumber(savedState.energyCost, 15)),
        currentEnergy: ensureValidNumber(
          Math.min(
            savedState.maxEnergy,
            savedState.currentEnergy + regeneratedEnergy
          ),
          1000
        ),
        maxEnergy: Math.max(1000, ensureValidNumber(savedState.maxEnergy, 1000)),
        energyRegenLevel: Math.max(1, ensureValidNumber(savedState.energyRegenLevel, 1)),
        energyRegenCost: Math.max(20, ensureValidNumber(savedState.energyRegenCost, 20)),
        passiveIncomeLevel: Math.max(0, ensureValidNumber(savedState.passiveIncomeLevel, 0)),
        passiveIncomeCost: Math.max(50, ensureValidNumber(savedState.passiveIncomeCost, 50)),
        lastUpdated: Date.now()
      };

      return validatedState;
    }
    return INITIAL_GAME_CONFIG;
  });

  useEffect(() => {
    const serializedState = {
      ...gameState,
      lastUpdated: Date.now()
    };
    StorageService.saveState(serializedState);
  }, [gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const regenRate = calculateEnergyRegeneration(prev.energyRegenLevel);
        const passiveRate = calculatePassiveIncome(prev.passiveIncomeLevel);
        
        return {
          ...prev,
          score: Math.max(0, prev.score + (passiveRate / (1000 / ENERGY_UPDATE_INTERVAL))),
          currentEnergy: Math.min(
            prev.maxEnergy,
            prev.currentEnergy + (regenRate / (1000 / ENERGY_UPDATE_INTERVAL))
          ),
          lastUpdated: Date.now()
        };
      });
    }, ENERGY_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const incrementScore = useCallback(() => {
    setGameState(prev => {
      const energyCost = Math.floor(prev.tapPower * prev.energyLevel);
      if (prev.currentEnergy < energyCost) return prev;

      return {
        ...prev,
        score: Math.max(0, prev.score + energyCost),
        currentEnergy: Math.max(0, prev.currentEnergy - energyCost)
      };
    });
  }, []);

  const upgradeTapPower = useCallback(() => {
    setGameState(prev => {
      if (prev.score < prev.tapPowerCost) return prev;
      return {
        ...prev,
        score: Math.max(0, prev.score - prev.tapPowerCost),
        tapPower: prev.tapPower + 1,
        tapPowerCost: Math.floor(prev.tapPowerCost * 1.5)
      };
    });
  }, []);

  const upgradeEnergy = useCallback(() => {
    setGameState(prev => {
      if (prev.score < prev.energyCost) return prev;
      return {
        ...prev,
        score: Math.max(0, prev.score - prev.energyCost),
        energyLevel: prev.energyLevel + 1,
        maxEnergy: prev.maxEnergy + 100,
        currentEnergy: Math.min(prev.maxEnergy + 100, prev.currentEnergy + 100),
        energyCost: Math.floor(prev.energyCost * 1.8)
      };
    });
  }, []);

  const upgradeEnergyRegen = useCallback(() => {
    setGameState(prev => {
      if (prev.score < prev.energyRegenCost) return prev;
      return {
        ...prev,
        score: Math.max(0, prev.score - prev.energyRegenCost),
        energyRegenLevel: prev.energyRegenLevel + 1,
        energyRegenCost: Math.floor(prev.energyRegenCost * 2)
      };
    });
  }, []);

  const upgradePassiveIncome = useCallback(() => {
    setGameState(prev => {
      if (prev.score < prev.passiveIncomeCost) return prev;
      return {
        ...prev,
        score: Math.max(0, prev.score - prev.passiveIncomeCost),
        passiveIncomeLevel: prev.passiveIncomeLevel + 1,
        passiveIncomeCost: Math.floor(prev.passiveIncomeCost * 2.5)
      };
    });
  }, []);

  return {
    ...gameState,
    incrementScore,
    upgradeTapPower,
    upgradeEnergy,
    upgradeEnergyRegen,
    upgradePassiveIncome
  };
};