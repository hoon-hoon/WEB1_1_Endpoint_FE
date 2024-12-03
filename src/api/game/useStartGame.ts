import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

async function startGame(gameId: number) {
  await axiosInstance.post(`/game/private/start?gameId=${gameId}`);
}

function useStartGame() {
  const { mutate, isError } = useMutation({
    mutationKey: ['startGame'],
    mutationFn: (gameId: number) => startGame(gameId),
    onError: (error) => {
      console.error('게임 시작 실패:', error);
    },
  });

  return { mutate, isError };
}

export default useStartGame;
