export type Player = {
  id: number;
  name: string;
  avatar: string;
  score: number;
};

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
};

export type ScoreUpdateMessage = {
  playerId: number;
  increment: number;
};

export type Rank = 1 | 2 | 3 | 4 | 5 | null;

export interface SocketStore {
  players: Player[];
  currentQuestion: number;
  timeLeft: number;
  updateScore: (playerId: number, increment: number) => void;
  getMyRank: (playerId: number) => { rank: Rank; score: number };
}
