import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

async function deleteRandomMatch() {
  await axiosInstance.delete(`/matching/unsubscribe`);
}

function useDeleteRandom() {
  const { mutate, isError } = useMutation({
    mutationKey: ['deleteRandom'],
    mutationFn: deleteRandomMatch,
    onError: (error) => {
      console.error('랜덤 매칭 종료 실패: ', error);
    },
  });
  return { mutate, isError };
}

export { useDeleteRandom };
