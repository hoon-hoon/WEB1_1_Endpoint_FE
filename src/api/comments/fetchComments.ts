import { useQuery } from '@tanstack/react-query';
import { Comment } from '@/types';
import axiosInstance from '../axiosInstance';

const fetchCommentsAPI = async (quizId: number): Promise<Comment[]> => {
  const response = await axiosInstance.get(`/quiz/comments`, { params: { quizId } });
  return response.data.result;
};

const useFetchComments = (quizId: number) => {
  const {
    data: comments = [],
    isLoading: loading,
    error,
    refetch: fetchComments,
  } = useQuery({
    queryKey: ['comments', quizId],
    queryFn: () => fetchCommentsAPI(quizId),
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    comments,
    loading,
    fetchComments,
    error,
  };
};

export default useFetchComments;
