import {
  ENERGY_REGEN_BASE_RATE,
  ENERGY_REGEN_MULTIPLIER,
  PASSIVE_INCOME_BASE,
  PASSIVE_INCOME_MULTIPLIER
} from '../config/gameConfig';

export const calculateEnergyRegeneration = (regenLevel: number): number => {
  return ENERGY_REGEN_BASE_RATE * Math.pow(ENERGY_REGEN_MULTIPLIER, regenLevel - 1);
};

export const calculatePassiveIncome = (passiveLevel: number): number => {
  if (passiveLevel === 0) return 0;
  return PASSIVE_INCOME_BASE * Math.pow(PASSIVE_INCOME_MULTIPLIER, passiveLevel - 1);
};