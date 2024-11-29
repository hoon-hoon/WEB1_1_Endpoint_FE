export type Topic =
  | '알고리즘'
  | '프로그래밍 언어'
  | '네트워크'
  | '운영체제'
  | '웹 개발'
  | '모바일 개발'
  | '데브옵스/인프라'
  | '데이터베이스'
  | '소프트웨어 공학';

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

export interface GameStore {
  gameId: string;
  players: Player[];
  currentQuestion: number;
  timeLeft: number;
  updateId: (gameId: string) => void;
  updateScore: (playerId: number, increment: number) => void;
  getMyRank: (playerId: number) => { rank: Rank; score: number };
}
