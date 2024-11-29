import { create } from 'zustand';
import { Rank, GameStore } from '@/types/GameTypes';

export const useGameStore = create<GameStore>((set, get) => ({
  socket: null,
  gameId: '',
  players: [
    { id: 1, name: 'Player 1', avatar: '/placeholder.svg', score: 0 },
    { id: 2, name: 'Player 2', avatar: '/placeholder.svg', score: 0 },
    { id: 3, name: 'Player 3', avatar: '/placeholder.svg', score: 0 },
    { id: 4, name: 'Player 4', avatar: '/placeholder.svg', score: 0 },
    { id: 5, name: 'Player 5', avatar: '/placeholder.svg', score: 0 },
  ],
  currentQuestion: 0,
  timeLeft: 10,

  updateId: (gameId: string) => {
    set(() => ({
      gameId,
    }));
  },
  updateScore: (playerId, increment) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, score: player.score + increment } : player,
      ),
    }));
  },
  getMyRank: (playerId: number) => {
    const players = get().players;
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const rank = (sortedPlayers.findIndex((player) => player.id === playerId) + 1) as Rank;
    const score = players.find((player) => player.id === playerId)?.score || 0;

    return { rank, score };
  },
}));
