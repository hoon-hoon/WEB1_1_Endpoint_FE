import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { Topic, Player } from '@/types/GameTypes';

interface CreateGameInput {
  subject: string;
  level: string;
  quizCount: number;
}

export interface CreateGameResponse {
  responseCode: string;
  result: {
    id: number;
    subject: Topic;
    level: string;
    quizCount: number;
    players: Player[];
    inviteCode: string;
  };
  timeStamp: string;
}

async function createGame(requestData: CreateGameInput) {
  const response = await axiosInstance.post('/game/private', requestData);
  return response.data;
}

function useCreateGame() {
  const { mutate } = useMutation({
    mutationKey: ['createGame'],
    mutationFn: (requestData: CreateGameInput) => createGame(requestData),
    onError: (error) => {
      alert(`방 생성에 실패했습니다 ${error}.`);
    },
  });
  return { mutate };
}

export default useCreateGame;
