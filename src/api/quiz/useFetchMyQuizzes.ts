import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

interface FetchQuizzesResponse {
  content: {
    id: number;
    question: string;
    type: 'OX' | 'AB' | '객관식';
    hasBeenAttempted: boolean;
    options?: string[];
  }[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

function useFetchMyQuizzes() {
  return useQuery({
    queryKey: ['myQuizzes'], // 고정된 키
    queryFn: async () => {
      const response = await axiosInstance.get('/quiz/my-quizzes?page=0&size=10'); // 기본 API 호출
      console.log('퀴즈가 성공적으로 받아와짐!:', response.data);
      return response.data;
    },
    staleTime: 1000 * 60, // 1분 동안 캐시 데이터 유지 후 다시 가져옴
    retry: 2, // 실패 시 2회 재시도
  });
}

export default useFetchMyQuizzes;
