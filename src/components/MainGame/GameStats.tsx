import React, { useState } from 'react';
import { Clock, MousePointer, Battery, Coins } from 'lucide-react';
import { LeaderboardButton } from '../LeaderboardButton';
import { LeaderboardModal } from '../Leaderboard/LeaderboardModal';

interface GameStatsProps {
  tapPower: number;
  energyLevel: number;
  regenRate: number;
  passiveRate: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
  tapPower,
  energyLevel,
  regenRate,
  passiveRate
}) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const hourlyPassiveIncome = passiveRate * 3600;
  const tapIncome = tapPower * energyLevel;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <LeaderboardButton onClick={() => setShowLeaderboard(true)} />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/30 p-3 rounded-lg flex items-center gap-2">
          <MousePointer className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">За клик</p>
            <p className="text-lg font-bold">{tapIncome} двоек</p>
          </div>
        </div>

        {passiveRate > 0 && (
          <div className="bg-black/30 p-3 rounded-lg flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Пассивный доход</p>
              <p className="text-lg font-bold">{passiveRate.toFixed(1)}/сек</p>
            </div>
          </div>
        )}

        <div className="bg-black/30 p-3 rounded-lg flex items-center gap-2">
          <Battery className="w-5 h-5 text-green-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Восстановление энергии</p>
            <p className="text-lg font-bold">{regenRate.toFixed(1)}/сек</p>
          </div>
        </div>

        {passiveRate > 0 && (
          <div className="bg-black/30 p-3 rounded-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Доход в час</p>
              <p className="text-lg font-bold">{Math.floor(hourlyPassiveIncome)} двоек</p>
            </div>
          </div>
        )}
      </div>

      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        currentIncomePerSecond={passiveRate}
      />
    </div>
  );
};