import React from 'react';
import { Trophy } from 'lucide-react';

interface LeaderboardButtonProps {
  onClick: () => void;
}

export const LeaderboardButton: React.FC<LeaderboardButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
  >
    <Trophy className="w-5 h-5" />
    <span>Топ</span>
  </button>
);