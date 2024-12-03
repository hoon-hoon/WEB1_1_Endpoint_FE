import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import { getStompClient } from './getStompClient';

type StompState = {
  client: Client;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  subscribeToGame: (gameId: number) => void;
};

export const useStompStore = create<StompState>((set, get) => ({
  client: getStompClient(),
  isConnected: false,

  connect: () => {
    const { client, isConnected } = get();
    if (isConnected) return;

    client.onConnect = () => {
      console.log('STOMP 연결 성공');
      set({ isConnected: true });
    };

    client.activate();
  },

  disconnect: () => {
    const { client, isConnected } = get();
    if (!isConnected) return;

    client.deactivate();
    set({ isConnected: false });
  },

  subscribeToGame: (gameId: number) => {
    const { client, isConnected } = get();
    if (!isConnected) {
      console.warn('STOMP 연결이 활성화되지 않았습니다.');
      return;
    }

    client.subscribe(`/topic/game/${gameId}`, (message) => {
      console.log('게임 메시지 수신:', message.body);
    });

    client.subscribe(`/user/queue/quiz-grade`, (message) => {
      console.log('퀴즈 점수 메시지 수신:', message.body);
    });
  },
}));
