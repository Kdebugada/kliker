import { supabase } from '../config/supabase';

export interface LeaderboardEntry {
  id: string;
  username: string;
  income_per_second: number;
  last_updated: string;
}

export const LeaderboardService = {
  subscribeToLeaderboard: (callback: (data: LeaderboardEntry[]) => void) => {
    const subscription = supabase
      .channel('leaderboard_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaderboard'
        },
        async () => {
          const { data, error } = await supabase
            .from('leaderboard')
            .select('*')
            .order('income_per_second', { ascending: false })
            .limit(20);

          if (!error && data) {
            callback(data);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },

  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('income_per_second', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      return [];
    }
  },

  updateScore: async (username: string, incomePerSecond: number): Promise<void> => {
    if (!username || typeof incomePerSecond !== 'number') {
      throw new Error('Invalid parameters');
    }

    try {
      const { error } = await supabase
        .from('leaderboard')
        .upsert(
          {
            username,
            income_per_second: incomePerSecond,
            last_updated: new Date().toISOString()
          },
          {
            onConflict: 'username'
          }
        );

      if (error) throw error;
    } catch (error) {
      console.error('Failed to update score:', error);
      throw error;
    }
  },

  removeEntry: async (username: string): Promise<void> => {
    if (!username) {
      throw new Error('Username is required');
    }

    try {
      const { error } = await supabase
        .from('leaderboard')
        .delete()
        .eq('username', username);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to remove entry:', error);
      throw error;
    }
  }
};