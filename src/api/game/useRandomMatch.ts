import axiosInstance from '../axiosInstance';
import { useQuery, useMutation } from '@tanstack/react-query';

async function fetchRandomMatch() {
  const response = await axiosInstance.get('/api/matching/subscribe');
  return response.data;
}

async function deleteRandomMatch() {
  await axiosInstance.delete(`/api/matching/unsubscribe`);
}
function useRandomMatch() {
  return useQuery({
    queryKey: ['randomMatch'],
    queryFn: fetchRandomMatch,
    staleTime: 5000, // 5초 동안 캐시된 데이터 사용
    refetchOnWindowFocus: true, // 창으로 돌아올 때 데이터 다시 가져오기
  });
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

export { useRandomMatch, useDeleteRandom };
