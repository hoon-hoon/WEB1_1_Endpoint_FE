import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import { getStompClient } from './getStompClient';
import { useGameStore } from '@/stores/useGameStore';
import { GameQuiz } from '@/types/GameTypes';

type StompState = {
  client: Client;
  isConnected: boolean;
  isLoading: boolean;
  connect: (gameId: number) => void;
  connectPromise: (gameId: number) => Promise<void>;
  disconnect: () => void;
  setIsLoading: (loading: boolean) => void;
  subscribeToGame: (Client: Client, gameId: number) => void;
  submitAnswer: (gameId: number, quizId: number, answer: string) => void;
  initiateGame: (gameId: number) => void;
  joinGame: (gameId: number) => Promise<void>;
  kickPlayer: (gameId: number, targetUserId: number) => void;
  endGame: (gameId: number) => void;
  exitGame: (gameId: number) => void;
};

type BroadCastMessage =
  | 'GAME_ROOM'
  | 'ANSWER_SUBMITTED'
  | 'QUIZ_TRANSMITTED'
  | 'SCORE_BOARD'
  | 'GAME_END'
  | 'ERROR';

type PrivateMessage = 'ANSWER_SUBMITTED' | string;

export const useStompStore = create<StompState>((set, get) => ({
  client: getStompClient(),
  isConnected: false,
  isLoading: false,

  connect: (gameId: number) => {
    const { client, isConnected, subscribeToGame } = get();
    if (isConnected) return;

    client.onConnect = () => {
      console.log('STOMP 연결 성공');
      set({ isConnected: true });
      subscribeToGame(client, gameId); // 연결 성공 후 구독
    };

    client.onDisconnect = () => {
      console.log('STOMP 연결 종료');
      set({ isConnected: false });
    };

    client.activate();
  },

  connectPromise: (gameId: number) => {
    return new Promise<void>((resolve, reject) => {
      const { client, isConnected, subscribeToGame } = get();
      if (isConnected) {
        console.log('이미 연결되어 있습니다.');
        resolve();
        return;
      }

      client.onConnect = () => {
        console.log('STOMP 연결 성공');
        set({ isConnected: true });
        subscribeToGame(client, gameId); // 연결 후 구독
        resolve(); // 연결 성공 시 resolve
      };

      client.onDisconnect = () => {
        console.log('STOMP 연결 종료');
        set({ isConnected: false });
      };

      client.onStompError = (frame) => {
        console.error('STOMP 연결 오류', frame);
        set({ isConnected: false });
        reject(new Error('STOMP 연결 오류')); // 연결 실패 시 reject
      };

      client.activate();
    });
  },

  disconnect: () => {
    const { isConnected, client } = get();
    if (!isConnected) return;

    client.deactivate();
    set({ isConnected: false });
  },

  subscribeToGame: (client: Client, gameId: number) => {
    const updatePlayers = useGameStore.getState().updatePlayers;
    const updateQuiz = useGameStore.getState().updateQuiz;
    const setIsCorrect = useGameStore.getState().setIsCorrect;
    const updateScores = useGameStore.getState().updateScores;
    client.subscribe(`/topic/game/${gameId}`, (message) => {
      const response = JSON.parse(message.body);
      const responseType: BroadCastMessage = response.type;
      console.log(response);
      switch (responseType) {
        case 'GAME_ROOM':
          console.log(response.payload.players);
          updatePlayers(response.payload.players);
          break;
        case 'QUIZ_TRANSMITTED':
          set({ isLoading: true });
          console.log(response.payload.quiz);
          updateQuiz(response.payload.quiz as GameQuiz[]);
          break;
        case 'SCORE_BOARD':
          const { leaderboard } = response.payload;
          updateScores(leaderboard);
          break;
        default:
          console.log('알 수 없는 메시지 유형:', response.type);
      }
    });

    client.subscribe('/user/queue/quiz-grade', (message) => {
      const response = JSON.parse(message.body);
      const responseType: PrivateMessage = response.type;

      switch (responseType) {
        case 'ANSWER_SUBMITTED':
          const isCorrect = response.payload.correct;
          setIsCorrect(isCorrect);
          break;
        case 'KICKED':
          set({ isLoading: true });
          updateQuiz(response.payload.quiz as GameQuiz[]);
          break;
        case 'GAME_RESULT':
          console.log(response.payload.rank);
          useGameStore.setState({
            rank: response.payload.rank,
            results: response.payload.results,
          });
          break;
        case 'ERROR':
          console.log('에러 메시지', response);
          break;
        default:
          console.log('알 수 없는 메시지 유형:', response.type);
      }
    });
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  initiateGame: (gameId: number) => {
    const { client, isConnected } = get();
    if (!isConnected) {
      console.warn('STOMP 연결이 활성화되지 않았습니다.');
      return;
    }
    client.publish({
      destination: `/start/${gameId}`,
    });
  },

  joinGame: (gameId: number) => {
    return new Promise<void>((resolve, reject) => {
      const { client, isConnected } = get();
      if (!isConnected) {
        console.warn('STOMP 연결이 활성화되지 않았습니다.');
        reject(new Error('STOMP 연결 실패'));
        return;
      }

      console.log('게임 조인 요청 보냄');
      try {
        client.publish({
          destination: `/app/join/${gameId}`,
        });
        resolve(); // 조인 성공 시 resolve
      } catch (error) {
        console.error('게임 조인 요청 실패:', error);
        reject(error); // 조인 실패 시 reject
      }
    });
  },

  submitAnswer: (gameId: number, quizId: number, answer: string) => {
    const { client, isConnected } = get();
    if (!isConnected) {
      console.warn('STOMP 연결이 활성화되지 않아 정답을 제출할 수 없습니다.');
      return;
    }
    const payload = {
      quizId,
      answer,
      submissionTime: Date.now(),
    };
    client.publish({
      destination: `/app/submit/${gameId}`,
      body: JSON.stringify(payload),
    });
  },

  endGame: (gameId: number) => {
    const { client, isConnected } = get();
    if (!isConnected) {
      console.warn('STOMP 연결이 활성화되지 않아 정답을 제출할 수 없습니다.');
      return;
    }
    client.publish({
      destination: `/app/end/${gameId}`,
    });
  },

  kickPlayer: (gameId: number, targetUserId: number) => {
    const { client, isConnected } = get();
    if (!isConnected) {
      console.warn('STOMP 연결이 활성화되지 않았습니다.');
      return;
    }
    client.publish({
      destination: `/app/kick/${gameId}`,
      body: JSON.stringify({ targetUserId }),
    });
    console.log(`유저 ${targetUserId} 강퇴 요청 전송`);
  },

  exitGame: (gameId: number) => {
    const { client, isConnected } = get();
    if (!isConnected) {
      console.warn('STOMP 연결이 활성화되지 않았습니다.');
      return;
    }
    client.publish({
      destination: `/app/quit/${gameId}`,
    });
    client.deactivate();
  },
}));
