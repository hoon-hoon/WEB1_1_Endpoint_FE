import { useInfiniteQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import { BaseQuizAPI } from '@/types';
import { useRef } from 'react';

interface FetchQuizzesParams {
  page: number;
  size: number;
  category?: string;
}

interface FetchQuizzesResponse {
  quizzes: BaseQuizAPI[];
  hasNext: boolean;
  page: number;
  category?: string;
}

const fetchQuizzes = async ({
  page,
  size,
  category,
}: FetchQuizzesParams): Promise<FetchQuizzesResponse> => {
  try {
    const params: Record<string, any> = { page, size };
    if (category) params.category = category;

    const response = await axiosInstance.get('/quiz/my/feed', { params });

    const { slice, category: responseCategory } = response.data.result;

    return {
      quizzes: slice.quizzes,
      hasNext: slice.hasNext,
      page,
      category: responseCategory,
    };
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
};

const useQuizFeed = () => {
  // let category: string | undefined;
  const categoryRef = useRef<string | undefined>(undefined);

  return useInfiniteQuery({
    queryKey: ['quizFeed'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchQuizzes({
        page: pageParam,
        size: 5,
        category: categoryRef.current,
      });

      if (!categoryRef.current && response.category) {
        categoryRef.current = response.category;
      }
      return response;
    },
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

export default useQuizFeed;
