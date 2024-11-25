import { create } from 'zustand';
/*
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000/api/socket';
*/

type Player = {
  id: number;
  name: string;
  avatar: string;
  score: number;
};

interface SocketStore {
  players: Player[];
  currentQuestion: number;
  timeLeft: number;
  updateScore: (playerId: number, increment: number) => void;
  getMyRank: (playerId: number) => { rank: number; score: number };
}

export const useGameStore = create<SocketStore>((set, get) => ({
  socket: null,
  players: [
    { id: 1, name: 'Player 1', avatar: '/placeholder.svg', score: 0 },
    { id: 2, name: 'Player 2', avatar: '/placeholder.svg', score: 0 },
    { id: 3, name: 'Player 3', avatar: '/placeholder.svg', score: 0 },
    { id: 4, name: 'Player 4', avatar: '/placeholder.svg', score: 0 },
    { id: 5, name: 'Player 5', avatar: '/placeholder.svg', score: 0 },
  ],
  currentQuestion: 0,
  timeLeft: 10,
  /*
  connect: () => {
    const socket = io(SOCKET_SERVER_URL);
    set({ socket });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('scoreUpdate', ({ playerId, increment }: { playerId: number; increment: number }) => {
      console.log('Score update received from server:', { playerId, increment });
      get().updateScore(playerId, increment);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      set({ socket: null });
    });
  },
  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
    }
    set({ socket: null });
  },
  */
  updateScore: (playerId, increment) => {
    /*
    const socket = get().socket;
    if (socket) {
      socket.emit('answerCorrect', { playerId, increment });
    }
      */
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, score: player.score + increment } : player,
      ),
    }));
  },
  getMyRank: (playerId: number) => {
    const players = get().players;
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const rank = sortedPlayers.findIndex((player) => player.id === playerId) + 1;
    const score = players.find((player) => player.id === playerId)?.score || 0;

    return { rank, score };
  },
}));
