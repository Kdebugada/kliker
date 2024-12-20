export const INITIAL_GAME_CONFIG = {
  score: 0,
  tapPower: 1,
  tapPowerCost: 10,
  energyLevel: 1,
  energyCost: 15,
  currentEnergy: 1000,
  maxEnergy: 1000,
  energyRegenLevel: 1,
  energyRegenCost: 20,
  passiveIncomeLevel: 0,
  passiveIncomeCost: 50,
  lastUpdated: Date.now()
};

export const ENERGY_REGEN_BASE_RATE = 5; // Base regeneration rate per second
export const ENERGY_UPDATE_INTERVAL = 1000; // Update energy every second
export const ENERGY_REGEN_MULTIPLIER = 1.2; // Multiplier for energy regeneration upgrades
export const PASSIVE_INCOME_BASE = 0.5; // Base passive income per second
export const PASSIVE_INCOME_MULTIPLIER = 1.5; // Multiplier for passive income upgrades