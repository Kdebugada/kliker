export interface GameState {
  score: number;
  tapPower: number;
  tapPowerCost: number;
  energyLevel: number;
  energyCost: number;
  currentEnergy: number;
  maxEnergy: number;
  energyRegenLevel: number;
  energyRegenCost: number;
  passiveIncomeLevel: number;
  passiveIncomeCost: number;
  lastUpdated: number;
}

const STORAGE_KEY = 'clickerGameState';

export const StorageService = {
  saveState: (state: GameState): void => {
    try {
      const serializedState = JSON.stringify({
        ...state,
        lastUpdated: Date.now()
      });
      window.localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (err) {
      console.error('Failed to save state:', err);
    }
  },

  loadState: (): GameState | null => {
    try {
      const serializedState = window.localStorage.getItem(STORAGE_KEY);
      if (!serializedState) return null;
      return JSON.parse(serializedState);
    } catch (err) {
      console.error('Failed to load state:', err);
      return null;
    }
  }
};