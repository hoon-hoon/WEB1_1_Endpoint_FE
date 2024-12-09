import { Player, Topic, GameQuiz } from '@/types/GameTypes';
import { create } from 'zustand';

interface GameResult {
  quizContent: string;
  choice: string;
  answer: string;
  explanation: string;
  isCorrect: boolean;
}

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
  rank: number;
  results: GameResult[];

  updateId: (gameId: number) => void;
  updatePlayers: (players: Player[]) => void;
  updateSubject: (subject: Topic) => void;
  updateLevel: (level: string) => void;
  updateQuiz: (quizzes: GameQuiz[]) => void;
  updateQuizCount: (count: number) => void;
  updateInviteCode: (inviteCode: string) => void;
  updateScores: (leaderboard: { userId: number; score: number }[]) => void;
  setIsCorrect: (result: boolean | null) => void;
  clear: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
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
  rank: -1,
  results: [],

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
  clear: () => {
    set(() => ({
      gameId: 0,
      players: [],
      subject: null,
      level: '',
      quiz: null,
      quizCount: 5,
      currentQuestion: 0,
      timeLeft: 10,
      inviteCode: '',
      isCorrect: null,
      rank: -1,
      results: [],
    }));
  },
}));
