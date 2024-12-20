import { useState, useEffect } from 'react';
import { LeaderboardService } from '../services/leaderboard';

export const useLeaderboard = (currentIncomePerSecond: number) => {
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('username') || '';
  });
  const [leaderboard, setLeaderboard] = useState<Array<{
    id: string;
    username: string;
    incomePerSecond: number;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateUsername = async (newUsername: string) => {
    try {
      setError(null);
      if (username) {
        await LeaderboardService.removeEntry(username);
      }
      setUsername(newUsername);
      localStorage.setItem('username', newUsername);
      await LeaderboardService.updateScore(newUsername, currentIncomePerSecond);
      await fetchLeaderboard(); // Fetch immediately after updating
    } catch (error) {
      setError('Failed to update username. Please try again.');
      console.error('Failed to update username:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const data = await LeaderboardService.getLeaderboard();
      setLeaderboard(data.map(entry => ({
        id: entry.id,
        username: entry.username,
        incomePerSecond: entry.income_per_second
      })));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      setError('Failed to fetch leaderboard');
    }
  };

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | undefined;

    const setupRealtimeSubscription = () => {
      unsubscribe = LeaderboardService.subscribeToLeaderboard((data) => {
        if (isMounted) {
          setLeaderboard(data.map(entry => ({
            id: entry.id,
            username: entry.username,
            incomePerSecond: entry.income_per_second
          })));
          setIsLoading(false);
        }
      });
    };

    const updateScore = async () => {
      if (!username) return;
      try {
        await LeaderboardService.updateScore(username, currentIncomePerSecond);
      } catch (error) {
        console.error('Failed to update score:', error);
      }
    };

    // Initial fetch
    fetchLeaderboard();

    // Setup real-time subscription
    setupRealtimeSubscription();

    // Update score periodically
    const scoreInterval = setInterval(updateScore, 5000);

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
      clearInterval(scoreInterval);
    };
  }, [username, currentIncomePerSecond]);

  return {
    username,
    setUsername: updateUsername,
    leaderboard,
    isLoading,
    error
  };
};