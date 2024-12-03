import { Player, Topic } from '@/types/GameTypes';
import { create } from 'zustand';

export type GameStore = {
  gameId: number;
  players: Player[];
  subject: Topic | null;
  level: string;
  quizCount: number;
  currentQuestion: number;
  timeLeft: number;
  inviteCode: string;

  updateId: (gameId: number) => void;
  updatePlayers: (players: Player[]) => void;
  updateSubject: (subject: Topic) => void;
  updateLevel: (level: string) => void;
  updateQuizCount: (count: number) => void;
  updateScore: (playerId: number, increment: number) => void;
  updateInviteCode: (inviteCode: string) => void;
  getMyRank: (playerId: number) => { rank: number; score: number };
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameId: 0,
  players: [],
  subject: null,
  level: '',
  quizCount: 5,
  currentQuestion: 0,
  timeLeft: 10,
  inviteCode: '',

  updateId: (gameId) => {
    set(() => ({
      gameId,
    }));
  },

  // 플레이어 목록 업데이트
  updatePlayers: (players) => {
    set(() => ({
      players,
    }));
  },

  updateSubject: (subject: Topic) => {
    set(() => ({
      subject,
    }));
  },

  updateLevel: (level: string) => {
    set(() => ({
      level,
    }));
  },

  updateQuizCount: (count: number) => {
    set(() => ({
      quizCount: count,
    }));
  },

  // 점수 업데이트
  updateScore: (playerId, increment) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.user.id === playerId
          ? { ...player, score: (player.score || 0) + increment }
          : player,
      ),
    }));
  },

  updateInviteCode: (inviteCode) => {
    set(() => ({
      inviteCode,
    }));
  },

  // 플레이어의 순위 계산
  getMyRank: (playerId) => {
    const players = get().players;
    const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
    const rank = sortedPlayers.findIndex((player) => player.user.id === playerId) + 1;
    const score = players.find((player) => player.user.id === playerId)?.score || 0;

    return { rank, score };
  },
}));
