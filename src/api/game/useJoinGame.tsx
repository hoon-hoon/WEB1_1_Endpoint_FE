import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

async function joinGame(inviteCode: string) {
  const response = await axiosInstance.post(`/game/private/join?code=${inviteCode}`);
  return response.data;
}

function useJoinGame() {
  const { mutate, isError } = useMutation({
    mutationKey: ['joinGame'],
    mutationFn: (inviteCode: string) => joinGame(inviteCode),
    onError: (error) => {
      console.error('방 참여 실패:', error);
    },
  });

  return { mutate, isError };
}

export default useJoinGame;
