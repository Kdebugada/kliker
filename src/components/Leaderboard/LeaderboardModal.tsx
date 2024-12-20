import React, { useState } from 'react';
import { Modal } from '../UI/Modal';
import { Trophy, Crown, Edit2 } from 'lucide-react';
import { useLeaderboard } from '../../hooks/useLeaderboard';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIncomePerSecond: number;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentIncomePerSecond
}) => {
  const { leaderboard, username, setUsername, isLoading } = useLeaderboard(currentIncomePerSecond);
  const [newUsername, setNewUsername] = useState('');
  const [isEditing, setIsEditing] = useState(!username);
  const [error, setError] = useState('');

  const handleSubmitUsername = () => {
    const trimmedUsername = newUsername.trim();
    if (trimmedUsername.length < 3) {
      setError('Никнейм должен содержать минимум 3 символа');
      return;
    }
    if (leaderboard.some(player => player.username === trimmedUsername && player.username !== username)) {
      setError('Такой никнейм уже занят');
      return;
    }
    setError('');
    setUsername(trimmedUsername);
    setIsEditing(false);
    setNewUsername('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitUsername();
    }
  };

  if (isEditing) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Введите ваш никнейм">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Ваш никнейм"
              value={newUsername}
              className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              onChange={(e) => {
                setNewUsername(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              maxLength={20}
              minLength={3}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              От 3 до 20 символов
            </p>
            <button
              onClick={handleSubmitUsername}
              disabled={!newUsername.trim() || newUsername.length < 3}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Таблица лидеров">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-400">
            Ваш никнейм: <span className="text-white">{username}</span>
          </div>
          <button
            onClick={() => {
              setIsEditing(true);
              setNewUsername(username);
            }}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Изменить
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Загрузка...</div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-2">
              {leaderboard.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    player.username === username
                      ? 'bg-blue-600/20 border border-blue-500/50'
                      : 'bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-[2rem]">
                    {index === 0 ? (
                      <Crown className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <span className="text-gray-400 w-5 text-center">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 font-medium">{player.username}</div>
                  <div className="text-right">
                    <span className="text-green-400">{player.incomePerSecond.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm"> /сек</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};