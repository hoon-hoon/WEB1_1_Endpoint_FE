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

export type User = {
  id: number;
  name: string;
  imgPath: string;
  rating: number;
};

export type Player = {
  user: User;
  guest: boolean;
  waiting: boolean;
  role: 'HOST' | 'PLAYER';
  status: 'JOINED' | 'LEFT';
  host: boolean;
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
  gameId: number;
  players: Player[];
  currentQuestion: number;
  timeLeft: number;
  inviteCode: string;
  updateId: (gameId: number) => void;
  updatePlayers: (members: Player[]) => void;
  updateScore: (memberId: number, increment: number) => void;
  updateInviteCode: (inviteCode: string) => void;
  getMyRank: (memberId: number) => { rank: Rank; score: number };
}
