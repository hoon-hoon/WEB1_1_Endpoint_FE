import { useInfiniteQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

const PAGE_SIZE = 10;

async function fetchMyQuizzes({ pageParam = 0 }) {
  const response = await axiosInstance.get(`/quiz/my-quizzes?page=${pageParam}&size=${PAGE_SIZE}`);
  return {
    data: response.data.result.content,
    nextPage: pageParam + 1,
    isLast: response.data.result.last, // 마지막 페이지인지 여부
  };
}

function useFetchMyQuizzes() {
  return useInfiniteQuery({
    queryKey: ['myQuizzes'],
    queryFn: fetchMyQuizzes,
    getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
    initialPageParam: 0,
  });
}

export default useFetchMyQuizzes;
