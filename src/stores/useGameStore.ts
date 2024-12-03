import { Player, Topic, GameQuiz } from '@/types/GameTypes';
import { create } from 'zustand';

export type GameStore = {
  gameId: number;
  players: Player[];
  subject: Topic | null;
  level: string;
  quiz: GameQuiz[] | null;
  quizCount: number;
  currentQuestion: number;
  timeLeft: number;
  inviteCode: string;
  isCorrect: boolean | null;

  updateId: (gameId: number) => void;
  updatePlayers: (players: Player[]) => void;
  updateSubject: (subject: Topic) => void;
  updateLevel: (level: string) => void;
  updateQuiz: (quizzes: GameQuiz[]) => void;
  updateQuizCount: (count: number) => void;
  updateInviteCode: (inviteCode: string) => void;
  updateScores: (leaderboard: { userId: number; score: number }[]) => void;
  setIsCorrect: (result: boolean | null) => void;
  getMyRank: (playerId: number) => { rank: number; score: number };
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameId: 0,
  players: [],
  subject: null,
  level: '',
  quiz: null,
  quizCount: 5,
  currentQuestion: 0,
  timeLeft: 10,
  inviteCode: '',
  earnedScore: 0,
  isCorrect: null,

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

  updateScores: (leaderboard: { userId: number; score: number }[]) => {
    set((state) => ({
      players: state.players.map((player) => {
        const updatedPlayer = leaderboard.find((entry) => entry.userId === player.id);
        return updatedPlayer ? { ...player, score: updatedPlayer.score } : player; // 점수가 업데이트되지 않으면 기존 상태 유지
      }),
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

  updateQuiz: (quizzes: GameQuiz[]) => {
    set(() => ({
      quiz: quizzes,
    }));
  },
  updateQuizCount: (count: number) => {
    set(() => ({
      quizCount: count,
    }));
  },

  updateInviteCode: (inviteCode) => {
    set(() => ({
      inviteCode,
    }));
  },

  setIsCorrect: (correct: boolean | null) => {
    set(() => ({
      isCorrect: correct,
    }));
  },

  // 플레이어의 순위 계산
  getMyRank: (playerId) => {
    const players = get().players;
    const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
    const rank = sortedPlayers.findIndex((player) => player.id === playerId) + 1;
    const score = players.find((player) => player.id === playerId)?.score || 0;

    return { rank, score };
  },
}));
